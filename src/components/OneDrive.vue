<script setup>
import FoldableSection from '@/components/FoldableSection.vue';
import FileList from '@/components/FileList.vue';
</script>

<template>
  <FoldableSection title="OneDrive" :default_expanded="false">
    <FileList />
  </FoldableSection>
</template>