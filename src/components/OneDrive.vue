<script setup>
import FoldableSection from '@/components/FoldableSection.vue';
import FileList from '@/components/FileList.vue';
import { getContent } from '@/libs/onedrive';

async function onFileSelected(id) {
  const content = await getContent(id);
}
</script>

<template>
  <FoldableSection title="OneDrive" :default_expanded="false">
    <!-- NOTE: tmp -->
    <a href="/login/index.html">login</a>

    <FileList @select="onFileSelected" />
  </FoldableSection>
</template>