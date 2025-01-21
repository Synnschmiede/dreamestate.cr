'use client';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import React, { createContext, useEffect, useState } from 'react';
import { paths } from 'src/routes/paths';
import { api, server_base_api } from 'src/utils/axios';
import { removeTokenFromCookies, setTokenInCookies } from 'src/utils/axios-api.helpers';

export interface IAuth {
  loading: boolean;
  userInfo: {
    token: string;
    name: string | null;
    email: string | null;
    contact_number: string | null;
    profile_pic: string | null;
    role: string | null;
  };
  isLogin: boolean;
  login: (email: string, password: string, onError: (message: string) => void) => void;
  logout: () => void;
}

export const INITIAL_AUTH_STATE = {
  token: '',
  name: '',
  email: '',
  contact_number: '',
  profile_pic: '',
  role: 'USER',
};

export const AuthContext = createContext<IAuth>({
  loading: false,
  userInfo: INITIAL_AUTH_STATE,
  isLogin: false,
  login: () => {},
  logout: () => {},
});

export const isValidToken = (token: string) => {
  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (e) {
    return false;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [userInfo, setUserInfo] = useState<IAuth['userInfo']>(INITIAL_AUTH_STATE);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const auth = localStorage.getItem('auth');
    if (auth) {
      const data = JSON.parse(auth);
      setUserInfo(data);
      api.defaults.headers.common['auth-Token'] = `${data.token}`;
    }
    setLoading(false);
  }, []);

  const handleLogin = async (
    email: string,
    password: string,
    onError: (message: string) => void
  ) => {
    setLoading(true);
    try {
      const res = await server_base_api.post('/auth/login', {
        email: email,
        password: password,
      });

      const userData: IAuth['userInfo'] = {
        token: res.data.data.token,
        name: res.data.data.name,
        email: res.data.data.email,
        contact_number: res.data.data.contact_number,
        profile_pic: res.data.data.profile_pic,
        role: res.data.data.role,
      };

      localStorage.setItem('auth', JSON.stringify({ ...userData, date: new Date() }));
      setTokenInCookies(userData.token);
      setUserInfo(userData);
      setLoading(false);
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      onError(error.response.data.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserInfo(INITIAL_AUTH_STATE);
    delete api.defaults.headers.common['Authorization'];
    removeTokenFromCookies();
    router.push(paths.auth.signIn);
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        userInfo,
        isLogin: isValidToken(userInfo.token || ''),
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
