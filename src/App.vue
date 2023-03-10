<script setup>
import Notification from '@/components/Notification.vue';
import Parameter from '@/components/Parameter.vue';
import WritingStyleTrans from '@/components/WritingStyleTrans.vue';
import TokenUsage from '@/components/TokenUsage.vue';
</script>

<template>
  <v-layout>
    <v-main>
      <Notification />
      <Parameter />
      <WritingStyleTrans />
    </v-main>
    <TokenUsage />
  </v-layout>
</template>