import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgConfigService } from '../../config/ng-config.service';

@Injectable({
  providedIn: 'root',
})
export class MapboxService {
  url = 'https://api.mapbox.com';
  token = this.ngConfig.global.maps.token;

  constructor(
    private httpClient: HttpClient,
    private ngConfig: NgConfigService
  ) {}

  searchLngLat(
    position: [number, number] | { lat: number; lng: number },
    options?: { language?: string; type?: string }
  ) {
    const lngLat =
      position instanceof Array
        ? { lat: position[0], lng: position[1] }
        : { lat: position.lat, lng: position.lng };
    return this.httpClient.get(
      `${this.url}/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json`,
      {
        params: {
          language: options?.language || navigator.language,
          types: options?.type || 'address',
          access_token: this.token,
        },
      }
    );
  }
}
