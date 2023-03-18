<script setup>
import { ref } from 'vue';
import * as openai from '@/libs/openai.js';
import { notify } from '@/libs/notify.js';
import { generate_location, generate_mode } from '@/libs/settings.js';
import FoldableSection from '@/components/FoldableSection.vue';

const props = defineProps({
  title: { type: String, required: true },
  modifiable: { type: Boolean, default: true },
  default_prompt_prefix: { type: String, default: '' },
  default_prompt_postfix: { type: String, default: '' },
  temperature_list: { type: Array, default: [0.5, 1] },
  top_p_list: { type: Array, default: [1, 1] },
});

const prompt_prefix = ref(props.default_prompt_prefix);
const prompt_postfix = ref(props.default_prompt_postfix);
const inferencing = ref(false);

async function onConvert() {
  await Word.run(async ctx => {
    const range = ctx.document.getSelection();

    range.load({ text: true, isEmpty: true })
    await ctx.sync();

    if (range.isEmpty) {
      notify('沒有選取任何文字');
      return;
    }

    inferencing.value = true;
    let converted_text = await openai.complete(
      prompt_prefix.value + range.text + prompt_postfix.value,
      props.temperature_list[generate_mode.value],
      props.top_p_list[generate_mode.value],
    );
    inferencing.value = false;

    if (!converted_text) return;

    const insert_loc = generate_location.value === 0 ?
                       Word.InsertLocation.replace :
                       Word.InsertLocation.end;
    if (generate_location.value === 2) {
      converted_text = '\n' + converted_text;
    }
    range.insertText(converted_text, insert_loc);
    await ctx.sync();
  });
}
</script>

<template>
  <FoldableSection :title="title">
    <v-card class="mb-3" flat>
      <v-card-text>
        <v-textarea
          label="提詞前綴"
          v-model="prompt_prefix"
          :disabled="!modifiable"
          rows="3"
          counter
        />
        <v-textarea
          label="提詞後綴"
          v-model="prompt_postfix"
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