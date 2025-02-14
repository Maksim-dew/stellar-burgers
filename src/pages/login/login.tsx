import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { LoginUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';
import {
  selectLoginError,
  clearErrors,
  loginUserThunk
} from '../../services/slices/userSlice';

export const Login: FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginErrorText = useSelector(selectLoginError);

  useEffect(() => {
    dispatch(clearErrors());
  }, []);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password
    };
    dispatch(loginUserThunk(userData));
  };

  return (
    <LoginUI
      errorText={loginErrorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
