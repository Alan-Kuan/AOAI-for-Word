<script setup>
import FoldableSection from '@/components/FoldableSection.vue';

const version = import.meta.env.VITE_ADDIN_VERSION;
</script>

<template>
  <FoldableSection title="關於" :default_expanded="false">
    <v-card flat>
      <v-card-text>
        This is a demo by MTC Taipei, and it's not the Microsoft 365 Copilot.
      </v-card-text>
      <v-card-text>
        current version: {{ version }}
      </v-card-text>
    </v-card>
  </FoldableSection>
</template>