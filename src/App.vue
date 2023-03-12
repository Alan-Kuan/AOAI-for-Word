<script setup>
import Notification from '@/components/Notification.vue';
import Settings from '@/components/Settings.vue';
import WritingStyleTrans from '@/components/WritingStyleTrans.vue';
import TokenUsage from '@/components/TokenUsage.vue';
</script>

<template>
  <v-layout>
    <v-main>
      <Notification />
      <Settings />
      <WritingStyleTrans />
    </v-main>
    <TokenUsage />
  </v-layout>
</template>