interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
}

interface LoginCredentials {
  email: string;
  password: string;
  remember: boolean;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface ResetCredentials {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isLoggedIn = computed(() => !!user.value);

  const fetchUser = async () => {
    const { data } = await useApiFetch('/api/user');

    user.value = data.value as User;
  };

  const csrf = () => useApiFetch('/sanctum/csrf-cookie');

  const login = async (credentials: LoginCredentials) => {
    await csrf();

    await logout();

    const loginResponse = await useApiFetch('/login', {
      method: 'post',
      body: credentials,
    });

    await fetchUser();

    return loginResponse;
  };

  const register = async (credentials: RegisterCredentials) => {
    await csrf();

    const registerResponse = await useApiFetch('/register', {
      method: 'post',
      body: credentials,
    });

    await fetchUser();

    return registerResponse;
  };

  const forgotPassword = async (email: string) => {
    await csrf();

    return await useApiFetch<{ status: string }>('/forgot-password', {
      method: 'post',
      body: { email },
    });
  };

  const resetPassword = async (credentials: ResetCredentials) => {
    await csrf();

    return await useApiFetch<{ status: string }>('/reset-password', {
      method: 'post',
      body: credentials,
    });
  };

  const resendEmailVerification = async () => {
    await csrf();

    return await useApiFetch<{ status: string }>(
      '/email/verification-notification',
      {
        method: 'post',
      }
    );
  };

  const logout = async () => {
    await useApiFetch('logout', { method: 'post' });

    user.value = null;

    navigateTo('/login');
  };

  return {
    user,
    isLoggedIn,
    fetchUser,
    login,
    register,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  };
});
