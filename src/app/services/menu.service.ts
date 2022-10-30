import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  show: boolean = false;

  constructor() {}

  toggleMenu(): void {
    this.show = !this.show;
  }

  hide(): void {
    this.show = false;
  }
}
