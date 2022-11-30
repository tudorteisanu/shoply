import { Component, Input, OnInit } from '@angular/core';
import { LinkInterface } from '@/ts/interfaces';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MenuState } from '@/app/store/menu/menu.state';
import { HideMenu } from '@/app/store/menu/menu.action';

@Component({
  selector: 'MobileMenu',
  templateUrl: './mobile-menu.component.html',
})
export class MobileMenuComponent implements OnInit {
  @Input() items: LinkInterface[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {}

  @Select(MenuState.getState)
  show!: Observable<boolean>;

  async hide(): Promise<void> {
    this.store.dispatch(HideMenu);
  }
}
