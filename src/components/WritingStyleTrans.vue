<script setup>
import { ref } from 'vue';
import * as openai from '@/libs/openai.js';
import { notify } from '@/libs/notify.js';
import FeatureCard from '@/components/FeatureCard.vue';

const default_prompt = ref('請用白話文改寫：');
const inferencing = ref(false);

function onConvert() {
  Office.context.document.getSelectedDataAsync(Office.CoercionType.Text, async res => {
    if (res.status === Office.AsyncResultStatus.Failed) {
      notify(res.error.message);
      return;
    }

    const selected_text = res.value;

    if (selected_text === '') {
      notify('沒有選取任何文字');
      return;
    }

    inferencing.value = true;
    const converted_text = await openai.complete({
        prompt: default_prompt.value + selected_text,
        max_tokens: 500,
      });
    inferencing.value = false;

    Office.context.document.setSelectedDataAsync(converted_text, res => {
      notify(res.error.message);
    });
  });
}
</script>

<template>
  <FeatureCard title="換句話說">
    <v-textarea label="提詞前綴" v-model="default_prompt" />
    <v-btn
      class="w-100"
      color="blue"
      :loading="inferencing"
      @click="onConvert"
    >
      <v-icon icon="mdi-fountain-pen-tip" />
      轉換
    </v-btn>
  </FeatureCard>
</template>