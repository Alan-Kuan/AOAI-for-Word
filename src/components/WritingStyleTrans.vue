<script setup>
import { ref } from 'vue';
import * as openai from '@/libs/openai.js';
import { notify } from '@/libs/notify.js';
import { generate_location, generate_mode } from '@/libs/settings.js';
import FoldableSection from '@/components/FoldableSection.vue';

const props = defineProps({
  modifiable: { type: Boolean, default: true },
  temperature_list: { type: Array, default: [0.5, 1] },
  top_p_list: { type: Array, default: [1, 1] },
});

const default_prompt = ref('請用白話文改寫：');
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
      default_prompt.value + range.text,
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