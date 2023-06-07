<script setup>
import { show, message } from '@/libs/notify.js';
</script>

<template>
  <v-slide-x-reverse-transition>
    <v-alert
      v-model="show"
      style="z-index: 100"
      class="ma-2 text-white"
      min-width="250"
      :text="message"
      type="info"
      color="#555555"
      position="fixed"
      rounded="lg"
      closable
    />
  </v-slide-x-reverse-transition>
</template>