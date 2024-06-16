import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavWidthService {
  readonly minWidth: number = 400;
  readonly maxWidth: number = 800;

  get sidenavWidth(): number {
    return parseInt(
      getComputedStyle(document.body).getPropertyValue('--navigation-width'),
      10,
    );
  }

  setSidenavWidth = (width: number): void => {
    const clampedWidth = Math.min(
      Math.max(width, this.minWidth),
      this.maxWidth,
    );
    console.log('max', width, this.sidenavWidth, 'min', Math.max(width, this.sidenavWidth), this.maxWidth);
    console.log('clampedWidth', clampedWidth);
    document.body.style.setProperty('--navigation-width', `${clampedWidth}px`);
  };
}
