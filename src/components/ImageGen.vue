<script setup>
import FoldableSection from '@/components/FoldableSection.vue';
import { imagen } from '@/libs/openai.js';
</script>

<template>
  <FoldableSection title="圖片生成" :default_expanded="false">
    <v-btn @click="imagen">imagen</v-btn>
  </FoldableSection>
</template>