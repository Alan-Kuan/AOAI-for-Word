<script setup>
import { show, message, dismiss } from '@/libs/notify.js';
</script>

<template>
  <v-snackbar
    v-model="show"
    class="mt-16"
    location="top left"
    transition="slide-x-reverse-transition"
    close-on-content-click
  >
    {{ message }}
    <template v-slot:actions>
      <v-btn
        color="yellow"
        variant="text"
        @click="dismiss"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>