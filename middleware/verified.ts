export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = useAuthStore();

  if (!user?.email_verified_at) {
    return navigateTo('/verify-email');
  }
});
