import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavWidthService {
  readonly minWidth: number = 300;
  readonly maxWidth: number = 800;

  getComputedStyle: any = window.getComputedStyle;

  get sidenavWidth(): number {
    return parseInt(
      this.getComputedStyle(document.body).getPropertyValue('--navigation-width'),
      10,
    );
  }

  setSidenavWidth = (_document: any, width: number): void => {
    const clampedWidth = Math.min(
      Math.max(width, this.minWidth),
      this.maxWidth,
    );
    _document.body.style.setProperty('--navigation-width', `${clampedWidth}px`);
  };
}
