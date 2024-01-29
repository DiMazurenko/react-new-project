import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { loginActions } from '../../model/slice/loginSlice';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { type AppDispatch } from 'app/providers/StoreProvider';
import { Text, TextTheme } from 'shared/ui/Text/Text';

export interface LoginFormProps {
  className?: string
}

// eslint-disable-next-line react/display-name
const LoginForm = memo(({ className }: LoginFormProps) => {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();
  const { username, password, isLoading, error } = useSelector(getLoginState);

  const onChangeUserName = useCallback((value: string) => {
    dispatch(loginActions.setUserName(value));
  }, [dispatch]);

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value));
  }, [dispatch]);

  const onLoginClick = useCallback(() => {
    void dispatch(loginByUsername({ username, password }));
  }, [dispatch, password, username]);

  return (
		<div className={classNames(cls.LoginForm, {}, [className])}>
			<Text title={t('Форма авторизации')}/>
			{error && <Text text={t('Вы ввели неверный логин или пароль')} theme={TextTheme.ERROR}/>}
			<Input
				autofocus
				type="text"
				className={cls.input}
				placeholder={t('Введите username')}
				onChange={onChangeUserName}
				value={username}
			/>
			<Input
				type="text"
				className={cls.input}
				placeholder={t('Введите пароль')}
				onChange={onChangePassword}
				value={password}
			/>
			<Button
				className={cls.loginBtn}
				theme={ButtonTheme.OUTLINE}
				onClick={onLoginClick}
				disabled={isLoading}
			>
				{t('Войти')}
			</Button>
		</div>
  );
});

export default LoginForm;
