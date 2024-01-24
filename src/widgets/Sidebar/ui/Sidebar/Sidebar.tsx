import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Sidebar.module.scss'
import { useState } from 'react'
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher'
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher'
import { useTranslation } from 'react-i18next'
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'

import MainIcon from 'shared/assets/icons/main-page-icon.svg'
import AboutIcon from 'shared/assets/icons/about-page-icon.svg'

interface SidebarProps {
  className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {
  const { t } = useTranslation()

  const [collapsed, setCollapsed] = useState(false)

  const onToggle = () => {
    setCollapsed((prev) => !prev)
  }

  return (
        <div
          data-testid="sidebar"
          className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
            className
          ])}
        >
          <Button
                data-testid="sidebar-toggle"
                onClick={onToggle}
                className={cls.collapseBtn}
                theme={ButtonTheme.BACKGROUND_INVERTED}
                square
                size={ButtonSize.L}
            >
                {collapsed ? '>' : '<'}
            </Button>
          <div className={cls.items}>
                <AppLink
                  to={RoutePath.main}
                  theme={AppLinkTheme.SECONDARY}
                  className={cls.item}
                >
                  <MainIcon className={cls.icon} />
                  <span className={cls.link}>{t('Главная')}</span>
              </AppLink>
                <AppLink
                  to={RoutePath.about}
                  theme={AppLinkTheme.SECONDARY}
                  className={cls.item}
                >
                  <AboutIcon className={cls.icon} />
                  <span className={cls.link}>{t('О сайте')}</span>
              </AppLink>
            </div>
          <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={cls.lang} short={collapsed} />
            </div>
      </div>
  )
}
