<script setup>
import { ref } from 'vue';
import * as openai from '@/libs/openai.js';

const default_prompt = ref('請用白話文改寫：');
const inferencing = ref(false);

function onConvert() {
  Office.context.document.getSelectedDataAsync(Office.CoercionType.Text, async res => {
    if (res.status !== Office.AsyncResultStatus.Failed) {
      inferencing.value = true;
      const selected_text = res.value;
      const converted_text = await openai.complete({
          prompt: default_prompt.value + selected_text,
          max_tokens: 500,
        });
      inferencing.value = false;
      Office.context.document.setSelectedDataAsync(converted_text);
    }
  });
}
</script>

<template>
  <v-card flat>
    <v-card-title>換句話說</v-card-title>
    <v-card-text>
      <v-textarea label="提詞前綴" :model-value="default_prompt" />
      <v-btn
        class="w-100"
        color="blue"
        :loading="inferencing"
        @click="onConvert"
      >
        <v-icon icon="mdi-fountain-pen-tip" />
        轉換
      </v-btn>
    </v-card-text>
  </v-card>
</template>