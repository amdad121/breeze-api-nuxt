<script lang="ts" setup>
definePageMeta({
  middleware: ['auth', 'verified'],
  layout: false,
})
</script>

<template>
  <div>
    <Head>
      <title>Dashboard</title>
    </Head>

    <NuxtLayout name="auth">
      <template #header>
        <h2 class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Dashboard
        </h2>
      </template>

      <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div class="p-6 text-gray-900 dark:text-gray-100">You're logged in!</div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<style scoped></style>
