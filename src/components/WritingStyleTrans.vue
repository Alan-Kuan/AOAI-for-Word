<script setup>
import { ref } from 'vue';
import * as openai from '@/libs/openai.js';
import { notify } from '@/libs/notify.js';
import { mode } from '@/libs/settings.js';
import FoldableSection from '@/components/FoldableSection.vue';

const props = defineProps({
  modifiable: { type: Boolean, default: true },
  temperature_list: { type: Array, default: [0.5, 1] },
  top_p_list: { type: Array, default: [1, 1] },
});

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
    const converted_text = await openai.complete(
      default_prompt.value + selected_text,
      props.temperature_list[mode.value],
      props.top_p_list[mode.value],
    );
    inferencing.value = false;

    if (!converted_text) return;

    Office.context.document.setSelectedDataAsync(converted_text, res => {
      notify(res.error.message);
    });
  });
}
</script>

<template>
  <FoldableSection title="換句話說">
    <v-card class="mb-3" flat>
      <v-card-text>
        <v-textarea
          label="提詞前綴"
          v-model="default_prompt"
          :disabled="!modifiable"
          rows="3"
          counter
        />
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
  </FoldableSection>
</template>