import {Component} from '@angular/core';
import {MENU_ITEMS} from '../shared/menu/menu-config';
import {IMenuItem} from '../shared/menu/MenuItem';

@Component({
  selector: 'app-pages-menu',
  templateUrl: './nav-pages.component.html',
  styleUrls: ['./nav-pages.component.css'],
})
export class NavPagesComponent {
  public menu: IMenuItem[] = [];

  constructor() {
    for (let i = 0; i < MENU_ITEMS.length; i++) {
      this.menu.push(MENU_ITEMS[i]);
    }
  }
}
