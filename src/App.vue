<script setup>
import Notification from '@/components/Notification.vue';
import Settings from '@/components/Settings.vue';
import Completion from '@/components/Completion.vue';
import ImageGen from '@/components/ImageGen.vue';
import About from '@/components/About.vue';
import TokenUsage from '@/components/TokenUsage.vue';
</script>

<template>
  <v-layout full-height>
    <v-main>
      <div class="sections">
        <Notification />
        <Settings />
        <Completion />
        <ImageGen />
        <About />
      </div>
    </v-main>
    <v-footer app>
      <TokenUsage />
    </v-footer>
  </v-layout>
</template>

<style scoped>
.sections {
  /* should compensate the space that the footer has taken */
  padding-bottom: 5rem;
}
</style>