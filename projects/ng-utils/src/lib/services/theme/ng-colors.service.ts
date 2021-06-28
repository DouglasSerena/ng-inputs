import { Injectable } from '@angular/core';
import { Palettes } from '../../interfaces/colors.interface';

@Injectable({
  providedIn: 'root',
})
export class NgColorsService {
  private _palettes: Palettes = {};
  get palettes() {
    return this._palettes;
  }
  set palettes(value: Palettes) {
    Object.assign(this._palettes, value);
  }

  constructor() {}
}
