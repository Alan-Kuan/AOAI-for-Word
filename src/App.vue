<script setup>
import Notification from '@/components/Notification.vue';
import Settings from '@/components/Settings.vue';
import Completion from '@/components/Completion.vue';
import TokenUsage from '@/components/TokenUsage.vue';
</script>

<template>
  <v-layout>
    <v-main>
      <Notification />
      <Settings />
      <Completion />
    </v-main>
    <TokenUsage />
  </v-layout>
</template>