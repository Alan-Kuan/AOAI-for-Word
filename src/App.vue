<script setup>
import Notification from '@/components/Notification.vue';
import Settings from '@/components/Settings.vue';
import Transform from '@/components/Transform.vue';
import TokenUsage from '@/components/TokenUsage.vue';

const meet_summary_prefix = "這是一篇即時語音的會議記錄。\n";
const meet_summary_postfix = "\n我將會議記錄中的待辦事項條列出來，並做了一段摘要。\n";

</script>

<template>
  <v-layout>
    <v-main>
      <Notification />
      <Settings />
      <Transform
        title="換句話說"
        default_prompt_prefix="請用白話文改寫："
      />
      <Transform
        title="會議摘要"
        :default_prompt_prefix="meet_summary_prefix"
        :default_prompt_postfix="meet_summary_postfix"
      />
    </v-main>
    <TokenUsage />
  </v-layout>
</template>