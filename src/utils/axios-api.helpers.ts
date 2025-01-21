
import Cookies from 'js-cookie';
import { paths } from 'src/routes/paths';

export const setTokenInCookies = (access_token: string | null) => {
  if (!access_token) return
  Cookies?.set("token", access_token)
};

export const getTokenFromCookies = () => {
  return Cookies?.get('token');
};

export const removeTokenFromCookies = () => {
  Cookies?.remove("token");
};


export const getAuthTokenFromLocalStore = (): string | null => {
  const auth = localStorage.getItem("auth");
  if (auth) {
    return JSON.parse(auth).token;
  }
  return null;
};


export const clearUserSessionFromLocalStore = () => {
  // Cleaning the local storage
  removeTokenFromCookies();
  localStorage.clear();
  
  // Redirect to the login page or perform any other required action
  window.alert('Attention: Your session has expired. Please log in again to continue. Thank you!');
  window.location.href = paths.auth.signIn;
};