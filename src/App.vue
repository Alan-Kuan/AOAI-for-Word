<script setup>
import Notification from '@/components/Notification.vue';
import Settings from '@/components/Settings.vue';
import Completion from '@/components/Completion.vue';
import About from '@/components/About.vue';
import TokenUsage from '@/components/TokenUsage.vue';
</script>

<template>
  <v-layout full-height>
    <v-main>
      <Notification />
      <Settings />
      <Completion />
      <About />
    </v-main>
    <v-footer app>
      <TokenUsage />
    </v-footer>
  </v-layout>
</template>