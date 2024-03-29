import type React from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'shared/assets/icons/main-page-icon.svg';
import AboutIcon from 'shared/assets/icons/about-page-icon.svg';
import ProfileIcon from 'shared/assets/icons/profile-page-icon.svg';

export interface SidebarItemType {
  path: string
  text: string
  Icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>
}

export const SidebarItemsList: SidebarItemType[] = [
  {
    path: RoutePath.main,
    Icon: MainIcon,
    text: 'Главная'
  },
  {
    path: RoutePath.about,
    Icon: AboutIcon,
    text: 'О сайте'
  },
  {
    path: RoutePath.profile,
    Icon: ProfileIcon,
    text: 'Профиль'
  }
];
