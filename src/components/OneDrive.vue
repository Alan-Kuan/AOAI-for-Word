<script setup>
import { ref } from 'vue';
import FoldableSection from '@/components/FoldableSection.vue';
import FileList from '@/components/FileList.vue';
import * as openai from '@/libs/openai.js';

const inferencing = ref(false);

async function onSelected(content) {
  const suffix = '我將內容精簡扼要地做了摘要，它描述了';
  const prompt = `${content}\n${suffix}`;

  inferencing.value = true;
  const generated_text = await openai.complete(prompt, 0.5, 1.0);
  inferencing.value = false;

  if (!generated_text) return;

  await Word.run(async ctx => {
      ctx.document.body.insertText(suffix + generated_text, Word.InsertLocation.end);
      await ctx.sync();
    });
}
</script>

<template>
  <FoldableSection title="OneDrive" :default_expanded="false">
    <v-progress-linear
      v-if="inferencing"
      color="blue"
      indeterminate
    />

    <FileList @select="onSelected" />
  </FoldableSection>
</template>