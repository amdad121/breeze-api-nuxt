import { defineStore } from 'pinia';

type User = {
  id: number;
  name: string;
  email: string;
};

type LoginCredentials = {
  email: string;
  password: string;
};

type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

type ResetCredentials = {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isLoggedIn = computed(() => !!user.value);

  const fetchUser = async () => {
    const { data } = await useApiFetch('/api/user');

    user.value = data.value as User;
  };

  const csrf = () => useApiFetch('/sanctum/csrf-cookie');

  const login = async (loginCredentials: LoginCredentials) => {
    await csrf();

    const loginResponse = await useApiFetch('/login', {
      method: 'post',
      body: loginCredentials,
    });

    await fetchUser();

    return loginResponse;
  };

  const register = async (registerCredentials: RegisterCredentials) => {
    await csrf();

    const registerResponse = await useApiFetch('/register', {
      method: 'post',
      body: registerCredentials,
    });

    await fetchUser();

    return registerResponse;
  };

  const forgotPassword = async (email: string) => {
    await csrf();

    const forgotPasswordResponse = await useApiFetch('/forgot-password', {
      method: 'post',
      body: { email },
    });

    return forgotPasswordResponse;
  };

  const resetPassword = async (resetCredentials: ResetCredentials) => {
    await csrf();

    const forgotPasswordResponse = await useApiFetch('/reset-password', {
      method: 'post',
      body: resetCredentials,
    });

    return forgotPasswordResponse;
  };

  const resendEmailVerification = async () => {
    await csrf();

    const resendEmailVerificationResponse = await useApiFetch(
      '/email/verification-notification',
      {
        method: 'post',
      }
    );

    return resendEmailVerificationResponse;
  };

  const logout = async () => {
    await useApiFetch('logout', { method: 'post' });

    user.value = null;

    navigateTo('/login');
  };

  return {
    user,
    isLoggedIn,
    login,
    register,
    fetchUser,
    logout,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
  };
});
