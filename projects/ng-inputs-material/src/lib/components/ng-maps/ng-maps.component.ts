import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  Output,
  Provider,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MapboxService } from './mapbox.service';
import { handleTry } from '@douglas-serena/ng-utils';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SkipSelf, AfterViewInit } from '@angular/core';
import { NgConfigService } from '../../config/ng-config.service';
import * as Mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { ControlBase } from '../../shared/base/control-base.template';
import { EventEmitter } from '@angular/core';

const PROVIDER_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgMapsComponent),
  multi: true,
};

@Component({
  selector: 'ng-maps',
  templateUrl: './ng-maps.component.html',
  styleUrls: ['./ng-maps.component.scss'],
  providers: [PROVIDER_VALUE_ACCESSOR],
})
export class NgMapsComponent
  extends ControlBase
  implements OnInit, AfterViewInit
{
  @ViewChild('markerRef') markerRef: ElementRef<HTMLSpanElement>;
  token = this.ngConfigService.maps.token;
  linkScript: HTMLScriptElement;
  linkStyle: HTMLLinkElement;
  geocoder: MapboxGeocoder;
  _marker: Mapboxgl.Marker;
  map: Mapboxgl.Map;
  loading = true;

  @Input() location: [number, number];
  @Input() style = 'mapbox://styles/mapbox/streets-v11';
  @Input() marker: { icon: string; color: string };

  @Output() address = new EventEmitter();

  constructor(
    renderer2: Renderer2,
    private ngConfigService: NgConfigService,
    controlContainer: ControlContainer,
    @SkipSelf() private changeDetectorRef: ChangeDetectorRef,
    private mapboxService: MapboxService
  ) {
    super(controlContainer, renderer2, ngConfigService);

    this.linkScript = document.createElement('script');
    this.linkScript.src =
      'https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.js';

    this.linkStyle = document.createElement('link');
    this.linkStyle.rel = 'stylesheet';
    this.linkStyle.href =
      'https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css';
  }

  ngOnInit() {
    this.superOnInit('maps');
    this.verifyExistLinks();
  }

  async ngAfterViewInit() {
    this.superAfterViewInit();

    if (!this.location) {
      const [data] = await handleTry(this.getLocationNavigator());
      if (data) {
        this.location = data;
      } else {
        this.location = [-47.9499962, -15.749997];
      }
    }

    this.map = new Mapboxgl.Map({
      zoom: 14,
      container: 'map',
      center: this.location,
      style: this.style,
      accessToken: this.token,
    });

    this._marker = new Mapboxgl.Marker({
      element: this.markerRef.nativeElement,
      draggable: true,
    })
      .setLngLat(this.location)
      .addTo(this.map);

    this.geocoder = new MapboxGeocoder({
      accessToken: this.token,
      mapboxgl: Mapboxgl as any,
      marker: false,
    });

    // Add map controls
    this.map.addControl(this.geocoder);

    // EVENTS
    window.onresize = () => this.map.resize();
    this.map.on('load', () => {
      this.loading = false;
      setTimeout(() => {
        this.map.resize();
      });
    });
    this.map.on('click', (event) => this.handleClickMap(event));
    this._marker.on('dragend', () => this.handleDragMarker());
    this.geocoder.on('result', (res) => this.handleResult(res));
  }

  private handleSave(info: any) {
    const address = info?.context.reduce((prev, current) => {
      const label = current.id.split('.')[0];

      if (label === 'region') prev.region = current.text;
      if (label === 'country') prev.country = current.text;
      if (label === 'place') prev.city = current.text;
      if (label === 'locality') prev.locality = current.text;
      if (label === 'postcode') prev.postcode = current.text;

      return prev;
    }, {});

    const data = {
      longitude: info?.center?.[0],
      latitude: info?.center?.[1],
      address: info?.text,
      addressFull: info?.place_name,
      ...address,
    };

    this.address.emit(data);
    this.handleChange({
      longitude: info?.center?.[0],
      latitude: info?.center?.[1],
    });
    this.changeDetectorRef.detectChanges();
  }

  writeValue = (value: any) => {
    if (!!value) {
      if (
        typeof value?.longitude === 'number' &&
        typeof value?.latitude === 'number'
      ) {
        this.location = [value.longitude, value.latitude];
        this.moveTo();
      }
    }
  };

  handleResult(res) {
    this._marker.setLngLat(res.result.center);
    this.handleSave(res.result);
  }

  handleClickMap(event: Mapboxgl.MapMouseEvent & Mapboxgl.EventData) {
    this._marker.setLngLat(event.lngLat);
    this.location = [event.lngLat.lng, event.lngLat.lat];
    this.handleDragMarker();
  }

  handleDragMarker() {
    const lngLat = this._marker.getLngLat();
    this.mapboxService
      .searchLngLat({ lat: lngLat.lat, lng: lngLat.lng })
      .subscribe((result: any) => {
        this.handleSave(result.features[0]);
      });
  }

  async handleMoveByCurrentLocation() {
    const [data, error] = await handleTry(this.getLocationNavigator());
    if (data) {
      this.location = data;
      this.moveTo();
    }
  }

  private getLocationNavigator() {
    return new Promise<[number, number]>((resolve, reject) => {
      try {
        navigator.geolocation?.getCurrentPosition?.(
          (position) =>
            resolve([position.coords.longitude, position.coords.latitude]),
          (error) => reject(error)
        );
      } catch (error) {
        reject(
          "I'm sorry, but geolocation services are not supported by your browser."
        );
      }
    });
  }

  private moveTo(location = this.location) {
    this.map?.flyTo({
      center: location,
      zoom: 14,
      bearing: 1,
      speed: 1.5,
      curve: 1,
      essential: true,
    });
  }

  private verifyExistLinks() {
    if (!document.head.contains(this.linkScript as any)) {
      document.head.appendChild(this.linkScript);
    }
    if (!document.head.contains(this.linkStyle as any)) {
      document.head.appendChild(this.linkStyle);
    }
  }
}
