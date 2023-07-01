import { useAuthStore } from '~/stores/useAuthStore';

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();

  if (!auth.user?.email_verified_at) {
    return navigateTo('/verify-email');
  }
});
