<script lang="ts" setup>
import { useAuthStore } from '~/stores/useAuthStore';

definePageMeta({
  middleware: ['guest'],
  layout: 'guest',
});

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const processing = ref(false);
const errors = ref([]);

const auth = useAuthStore();

const handleRegister = async () => {
  processing.value = true;
  errors.value = [];

  const { error } = await auth.register(form.value);

  errors.value = error.value?.data?.errors;
  processing.value = false;

  if (!error.value) {
    navigateTo('/dashboard');
  }
};
</script>

<template>
  <div>
    <Head>
      <title>Register</title>
    </Head>

    <form @submit.prevent="handleRegister">
      <div>
        <InputLabel for="name" value="Name" />

        <TextInput
          id="name"
          type="text"
          class="mt-1 block w-full"
          v-model="form.name"
          required
          autofocus
          autocomplete="name"
        />

        <InputError class="mt-2" :messages="errors?.name" />
      </div>

      <div class="mt-4">
        <InputLabel for="email" value="Email" />

        <TextInput
          id="email"
          type="email"
          class="mt-1 block w-full"
          v-model="form.email"
          required
          autocomplete="username"
        />

        <InputError class="mt-2" :messages="errors?.email" />
      </div>

      <div class="mt-4">
        <InputLabel for="password" value="Password" />

        <TextInput
          id="password"
          type="password"
          class="mt-1 block w-full"
          v-model="form.password"
          required
          autocomplete="new-password"
        />

        <InputError class="mt-2" :messages="errors?.password" />
      </div>

      <div class="mt-4">
        <InputLabel for="password_confirmation" value="Confirm Password" />

        <TextInput
          id="password_confirmation"
          type="password"
          class="mt-1 block w-full"
          v-model="form.password_confirmation"
          required
          autocomplete="new-password"
        />

        <InputError class="mt-2" :message="errors?.password_confirmation" />
      </div>

      <div class="flex items-center justify-end mt-4">
        <NuxtLink
          to="/login"
          class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
        >
          Already registered?
        </NuxtLink>

        <PrimaryButton
          class="ml-4"
          :class="{ 'opacity-25': processing }"
          :disabled="processing"
        >
          Register
        </PrimaryButton>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
