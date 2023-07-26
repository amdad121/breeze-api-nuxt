<script lang="ts" setup>
definePageMeta({
  middleware: ['guest'],
  layout: 'guest',
})

interface Form {
  token: string
  email: string
  password: string
  password_confirmation: string
}

const route = useRoute()

if (!route.query.email) {
  navigateTo('/')
}

const form = ref<Form>({
  token: route.params?.token as string,
  email: route.query?.email as string,
  password: '',
  password_confirmation: '',
})

interface Errors {
  email?: string
  password?: string
  password_confirmation?: string
}

const processing = ref<boolean>(false)
const errors = ref<Errors>({})

const { resetPassword } = useAuthStore()

const handleResetPassword = async () => {
  processing.value = true
  errors.value = {}

  const { data, error } = await resetPassword(form.value)

  errors.value = error.value?.data?.errors || {}
  processing.value = false

  if (!error.value && data.value?.status) {
    return navigateTo('/login?reset=' + btoa(data.value?.status))
  }
}
</script>

<template>
  <div>
    <Head>
      <title>Reset Password</title>
    </Head>

    <form @submit.prevent="handleResetPassword()">
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
          autocomplete="new-password"
        />

        <InputError class="mt-2" :message="errors?.password?.[0]" />
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

        <InputError class="mt-2" :message="errors?.password_confirmation?.[0]" />
      </div>

      <div class="flex items-center justify-end mt-4">
        <PrimaryButton :class="{ 'opacity-25': processing }" :disabled="processing">
          Reset Password
        </PrimaryButton>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
