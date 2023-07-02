export default defineNuxtPlugin(async (nuxtApp) => {
  const { isLoggedIn, fetchUser } = useAuthStore();

  if (!isLoggedIn) {
    await fetchUser();
  }
});
