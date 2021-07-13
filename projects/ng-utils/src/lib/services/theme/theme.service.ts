import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { mergeObject } from '../../functions';
import { handleTry } from '../../functions/handle-try';
import {
  Colors,
  colorScheme,
  Palettes,
} from '../../interfaces/colors.interface';
import { BodyService } from '../body.service';
import { ColorsService } from './colors.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  active: 'dark' | 'light' | string;
  disableSystemBasedColorShift: boolean = false;
  /**
   * @description EN: this scheme is used to change theme based on system.
   * @description PT: este scheme é usado para altera o theme baseado no sistema.
   */
  scheme = { dark: 'dark', light: 'light' };
  private styleElement: HTMLStyleElement;
  private themes: {
    [key: string]: {
      className: string;
      colorScheme: colorScheme;
      style: string;
      colors: Colors;
    };
  } = {};

  changeTheme = new Subject();

  constructor(
    private bodyService: BodyService,
    private httpClient: HttpClient,
    private colorService: ColorsService
  ) {
    this.styleElement = document.createElement('style');
    this.bodyService.head.appendChild(this.styleElement);

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (event) => {
        if (!this.disableSystemBasedColorShift) {
          this.change(event.matches ? this.scheme.dark : this.scheme.light);
        }
      });
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
    if (this.colorService.palettes) {
      this.create(this.colorService.palettes);
    }

    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      this.change(this.scheme.dark);
    } else {
      this.change(this.scheme.light);
    }
  }

  async loadJson(path: string) {
    const [data] = await handleTry<any>(this.httpClient.get(path));
    if (data) {
      this.create(data);
    }
  }

  getColors(): Colors {
    const theme = this.active;
    return this.colorService.palettes[theme];
  }

  update(theme: string, colors: Colors, colorScheme?: colorScheme) {
    if (this.themes[theme]) {
      if (!colorScheme) {
        colorScheme = this.themes[theme].colorScheme;
      }
      mergeObject(this.themes[theme].colors, colors);
      this.createOne(theme, colorScheme, this.themes[theme].colors);
      this.change(theme);
    }
  }

  create(palettes: Palettes) {
    this.colorService.palettes = palettes;

    Object.keys(palettes).forEach((key) => {
      let colorScheme = palettes[key].colorScheme;
      if (!colorScheme) {
        if (key === 'dark') {
          colorScheme = 'dark';
        } else if (key === 'light') {
          colorScheme = 'light';
        } else {
          colorScheme = 'no-preference';
        }
      }

      this.createStyles(key, colorScheme, palettes[key]);
    });
    if (!this.active) {
      this.active = Object.keys(this.themes)[0];
      this.change(this.active);
    }
  }

  createOne(theme: string, colorScheme: colorScheme, colors: Colors) {
    this.colorService.palettes[theme] = colors;
    this.createStyles(theme, colorScheme, colors);
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
      this.changeTheme.next(theme);
    }
  }

  private createStyles(
    theme: string,
    colorScheme: colorScheme,
    colors: Colors
  ) {
    const colorsKeys = Object.keys(colors);
    let style = `color-scheme: ${colorScheme};`;

    style += colorsKeys
      .map((colorKey) => {
        const _colors = colors[colorKey];
        if (typeof _colors === 'string') {
          if (colorKey === 'colorScheme') {
            return '';
          }
          return `--color-${colorKey}: ${_colors};`;
        } else {
          return Object.keys(_colors)
            .map((color) => {
              if (color === 'default') {
                return `--color-${colorKey}: ${_colors[color]};`;
              }
              return `--color-${colorKey}-${color}: ${_colors[color]};`;
            })
            .join('');
        }
      })
      .join('');

    this.themes[theme] = {
      style: `:root {${style}}`,
      colorScheme,
      className: `theme-${theme}`,
      colors,
    };
  }
}
