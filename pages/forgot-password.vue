<script lang="ts" setup>
definePageMeta({
  middleware: ['guest'],
  layout: 'guest',
});

interface Errors {
  email?: string;
}

const email = ref<string>('');
const processing = ref<boolean>(false);
const errors = ref<Errors>({});
const status = ref<string | null>(null);

const { forgotPassword } = useAuthStore();

const handleForgotPassword = async () => {
  processing.value = true;
  errors.value = {};
  status.value = null;

  const { data, error } = await forgotPassword(email.value);

  errors.value = error.value?.data?.errors || {};
  status.value = data.value?.status ?? '';
  processing.value = false;
};
</script>

<template>
  <div>
    <Head>
      <title>Forgot Password</title>
    </Head>

    <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
      Forgot your password? No problem. Just let us know your email address and
      we will email you a password reset link that will allow you to choose a
      new one.
    </div>

    <div
      v-if="status"
      class="mb-4 font-medium text-sm text-green-700 bg-green-100 px-4 py-2 rounded dark:text-green-400"
    >
      {{ status }}
    </div>

    <form @submit.prevent="handleForgotPassword()">
      <div>
        <InputLabel for="email" value="Email" />

        <TextInput
          id="email"
          type="email"
          class="mt-1 block w-full"
          v-model="email"
          required
          autofocus
          autocomplete="username"
        />

        <InputError class="mt-2" :message="errors?.email?.[0]" />
      </div>

      <div class="flex items-center justify-end mt-4">
        <PrimaryButton
          :class="{ 'opacity-25': processing }"
          :disabled="processing"
        >
          Email Password Reset Link
        </PrimaryButton>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
