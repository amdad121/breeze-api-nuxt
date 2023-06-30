<script setup>
defineProps({
  messages: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div v-if="messages.length > 0">
    <template v-for="(message, index) in messages" :key="index">
      <p class="text-sm text-red-600 dark:text-red-400">
        {{ message }}
      </p>
    </template>
  </div>
</template>
