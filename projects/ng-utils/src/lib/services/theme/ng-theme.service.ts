import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { handleTry } from '../../functions';
import { Colors, Palettes } from '../../interfaces/colors.interface';
import { BodyService } from '../body.service';
import { NgColorsService } from './ng-colors.service';

@Injectable({
  providedIn: 'root',
})
export class NgThemeService {
  active: 'dark' | 'light' | string;
  private styleElement: HTMLStyleElement;
  private themes: {
    [key: string]: {
      className: string;
      style: string;
    };
  } = {};

  constructor(
    private bodyService: BodyService,
    private httpClient: HttpClient,
    private ngColorService: NgColorsService
  ) {
    this.styleElement = document.createElement('style');
    this.bodyService.head.appendChild(this.styleElement);
  }

  isDark() {
    return this.active === 'dark';
  }
  isLight() {
    return this.active === 'light';
  }
  isActive(theme: string) {
    return this.active === theme;
  }

  load() {
    if (this.ngColorService.palettes) {
      this.create(this.ngColorService.palettes);
    }
  }

  async loadJson(path: string) {
    const [data] = await handleTry<any>(this.httpClient.get(path));
    if (data) {
      this.create(data);
    }
  }

  create(palettes: Palettes) {
    this.ngColorService.palettes = palettes;
    Object.keys(palettes).forEach((key) =>
      this.createStyles(key, palettes[key])
    );
    if (!this.active) {
      this.active = Object.keys(this.themes)[0];
      this.change(this.active);
    }
  }

  createOne(theme: string, colors: Colors) {
    this.ngColorService.palettes[theme] = colors;
    this.createStyles(theme, colors);
    if (!this.active) {
      this.active = theme;
      this.change(this.active);
    }
  }

  change(theme: string) {
    if (this.themes[theme]) {
      this.bodyService.body.classList.remove(
        this.themes[this.active].className
      );
      this.bodyService.body.classList.add(this.themes[theme].className);

      this.styleElement.innerHTML = this.themes[theme].style;
      this.active = theme;
    }
  }

  private createStyles(theme: string, colors: Colors) {
    const colorsKeys = Object.keys(colors);

    const style = colorsKeys
      .map((colorKey) => {
        const _colors = colors[colorKey];

        let color = `--color-${colorKey}: ${_colors.default};`;

        if (_colors.dark) {
          color += `--color-${colorKey}-dark: ${_colors.dark};`;
        }

        if (_colors.light) {
          color += `--color-${colorKey}-light: ${_colors.light};`;
        }

        return color;
      })
      .join('');

    this.themes[theme] = {
      style: `:root {${style}}`,
      className: `theme-${theme}`,
    };
  }
}
