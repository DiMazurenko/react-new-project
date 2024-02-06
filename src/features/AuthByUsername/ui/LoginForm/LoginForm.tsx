import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { type AppDispatch } from 'app/providers/StoreProvider';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { getLoginUserName } from 'features/AuthByUsername/model/selectors/getLoginUserName/getLoginUserName';
import { getLoginPassword } from 'features/AuthByUsername/model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from 'features/AuthByUsername/model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from 'features/AuthByUsername/model/selectors/getLoginError/getLoginError';
import { DynamicModuleLoader, type ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

export interface LoginFormProps {
  className?: string
}

const initialReducers: ReducersList = {
  loginForm: loginReducer
};

// eslint-disable-next-line react/display-name
const LoginForm = memo(({ className }: LoginFormProps) => {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();

  const username = useSelector(getLoginUserName);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);

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
		<DynamicModuleLoader
			reducers={initialReducers}
			removeAfterUnmount
		>
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
		</DynamicModuleLoader>

  );
});

export default LoginForm;
