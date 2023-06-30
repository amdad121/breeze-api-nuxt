<script lang="ts" setup>
import { useAuthStore } from '~/stores/useAuthStore';

definePageMeta({
  middleware: ['auth'],
  layout: 'guest',
});

const auth = useAuthStore();

const status = ref(null);
const processing = ref(false);

const handleResendEmailVerification = async () => {
  status.value = null;
  processing.value = true;

  const { data } = await auth.resendEmailVerification();

  status.value = data.value?.status;
  processing.value = false;
};
</script>

<template>
  <div>
    <Head>
      <title>Email Verification</title>
    </Head>

    <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
      Thanks for signing up! Before getting started, could you verify your email
      address by clicking on the link we just emailed to you? If you didn't
      receive the email, we will gladly send you another.
    </div>

    <div
      class="mb-4 font-medium text-sm text-green-700 bg-green-100 px-4 py-2 rounded dark:text-green-400"
      v-if="status"
    >
      A new verification link has been sent to the email address you provided
      during registration.
    </div>

    <form @submit.prevent="handleResendEmailVerification">
      <div class="mt-4 flex items-center justify-between">
        <PrimaryButton
          :class="{ 'opacity-25': processing }"
          :disabled="processing"
        >
          Resend Verification Email
        </PrimaryButton>

        <button
          @click="auth.logout()"
          class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
        >
          Log Out
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
