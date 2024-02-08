import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SidebarItem.module.scss';
import { useTranslation } from 'react-i18next';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'shared/assets/icons/main-page-icon.svg';
import { type SidebarItemType } from '../../model/items';
import { memo } from 'react';

interface SidebarItemProps {
  item: SidebarItemType
  collapsed: boolean
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation();

  return (
		<AppLink
			to={item.path}
			theme={AppLinkTheme.SECONDARY}
			className={classNames(cls.item, { [cls.collapsed]: collapsed })}
		>
			<item.Icon className={cls.icon}/>
			<span className={cls.link}>{t(item.text)}</span>
		</AppLink>
  );
});
