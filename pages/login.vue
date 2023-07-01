<script lang="ts" setup>
import { useAuthStore } from '~/stores/useAuthStore';

definePageMeta({
  middleware: ['guest'],
  layout: 'guest',
});

interface Form {
  email: string;
  password: string;
  remember: boolean;
}

const form = ref<Form>({
  email: '',
  password: '',
  remember: false,
});

interface Errors {
  email?: string;
  password?: string;
}

const processing = ref<boolean>(false);
const errors = ref<Errors>({});
const status = ref<string | null>(null);

const route = useRoute();

watchEffect(() => {
  if (route.query.reset && route.query.reset?.length > 0) {
    status.value = atob(route.query?.reset as string);
  } else {
    status.value = null;
  }
});

const auth = useAuthStore();

const handleLogin = async () => {
  processing.value = true;
  errors.value = {};

  const { error } = await auth.login(form.value);

  errors.value = error.value?.data?.errors ?? {};
  processing.value = false;

  if (!error.value) {
    navigateTo('/dashboard');
  }
};
</script>

<template>
  <div>
    <Head>
      <title>Log in</title>
    </Head>

    <div
      v-if="status"
      class="mb-4 font-medium text-sm text-green-700 bg-green-100 px-4 py-2 rounded"
    >
      {{ status }}
    </div>

    <form @submit.prevent="handleLogin">
      <div>
        <InputLabel for="email" value="Email" />

        <TextInput
          id="email"
          type="email"
          class="mt-1 block w-full"
          v-model="form.email"
          required
          autofocus
          autocomplete="username"
        />

        <InputError class="mt-2" :message="errors?.email?.[0]" />
      </div>

      <div class="mt-4">
        <InputLabel for="password" value="Password" />

        <TextInput
          id="password"
          type="password"
          class="mt-1 block w-full"
          v-model="form.password"
          required
          autocomplete="current-password"
        />

        <InputError class="mt-2" :message="errors?.password?.[0]" />
      </div>

      <div class="block mt-4">
        <label class="flex items-center">
          <Checkbox name="remember" v-model:checked="form.remember" />
          <span class="ml-2 text-sm text-gray-600 dark:text-gray-400"
            >Remember me</span
          >
        </label>
      </div>

      <div class="flex items-center justify-end mt-4">
        <NuxtLink
          to="/forgot-password"
          class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
        >
          Forgot your password?
        </NuxtLink>

        <PrimaryButton
          class="ml-4"
          :class="{ 'opacity-25': processing }"
          :disabled="processing"
        >
          Log in
        </PrimaryButton>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
