<script lang="ts" setup>
import { useAuthStore } from '~/stores/useAuthStore';

definePageMeta({
  middleware: ['guest'],
  layout: 'guest',
});

const route = useRoute();

const form = ref({
  token: route.params?.token,
  email: route.query?.email,
  password: '',
  password_confirmation: '',
});

const processing = ref(false);
const errors = ref([]);

const auth = useAuthStore();

const handleResetPassword = async () => {
  processing.value = true;
  errors.value = [];

  const { data, error } = await auth.resetPassword(form.value);

  errors.value = error.value?.data?.errors;
  processing.value = false;

  if (!error.value) {
    navigateTo('/login?reset=' + btoa(data.value?.status));
  }
};
</script>

<template>
  <div>
    <Head>
      <title>Reset Password</title>
    </Head>

    <form @submit.prevent="handleResetPassword">
      <div>
        <InputLabel for="email" value="Email" />

        <TextInput
          id="email"
          type="email"
          class="mt-1 block w-full"
          v-model="form.email"
          required
          readonly
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

        <InputError class="mt-2" :messages="errors?.password_confirmation" />
      </div>

      <div class="flex items-center justify-end mt-4">
        <PrimaryButton
          :class="{ 'opacity-25': processing }"
          :disabled="processing"
        >
          Reset Password
        </PrimaryButton>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
