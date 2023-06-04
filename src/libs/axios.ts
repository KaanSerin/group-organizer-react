import axios, { AxiosError } from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // Send cookies to the server
  withCredentials: true
});

let authContextUpdater: (() => void) | null = null;
export function registerResetAuthMethod(updater: () => void) {
  authContextUpdater = updater;
}

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      if (authContextUpdater) {
        authContextUpdater();
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
