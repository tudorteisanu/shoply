import { Component, Input, OnInit } from '@angular/core';
import { LinkInterface } from '@/ts/interfaces';
import { MenuService } from '@/services/menu.service';

@Component({
  selector: 'MobileMenu',
  templateUrl: './mobile-menu.component.html',
})
export class MobileMenuComponent implements OnInit {
  @Input() items: LinkInterface[] = [];

  constructor(private menu: MenuService) {}

  ngOnInit(): void {}

  get show(): boolean {
    return this.menu.show;
  }

  async hide(): Promise<void> {
    this.menu.hide();
  }
}
