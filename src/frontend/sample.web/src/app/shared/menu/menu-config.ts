import {IMenuItem} from './MenuItem';
import {RoutesEnums} from '../../types/enums/RoutesEnum';

export const MENU_ITEMS: IMenuItem[] = [
  {
    title: 'Home',
    link: `/${RoutesEnums.PAGES}/${RoutesEnums.ABOUT}`,
  },
  {
    title: 'Customer',
    link: `/${RoutesEnums.PAGES}/${RoutesEnums.CUSTOMERS}/view`,
  },
];
