<script setup>
import WritingStyleTrans from '@/components/WritingStyleTrans.vue';
import Notification from '@/components/Notification.vue';
</script>

<template>
  <v-layout>
    <v-app-bar color="#4fd594" elevation="0">
      <v-app-bar-title class="text-white">
        Word OpenAI
      </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <Notification />
      <WritingStyleTrans />
    </v-main>
  </v-layout>
</template>