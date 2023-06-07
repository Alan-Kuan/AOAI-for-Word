<script setup>
import { useI18n } from 'vue-i18n';
import { show, message, dismiss } from '@/libs/notify.js';

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
});
</script>

<template>
  <v-snackbar
    v-model="show"
    class="mt-16"
    location="top left"
    transition="slide-x-reverse-transition"
    timeout="-1"
    close-on-content-click
  >
    {{ message }}
    <template v-slot:actions>
      <v-btn
        color="yellow"
        variant="text"
        @click="dismiss"
      >
        {{ t('button.close') }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<i18n lang="yaml">
zh:
  button:
    close: 關閉
en:
  button:
    close: Close
</i18n>