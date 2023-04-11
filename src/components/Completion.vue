<script setup>
import { ref, onMounted } from 'vue';
import * as openai from '@/libs/openai.js';
import { notify } from '@/libs/notify.js';
import { generate_location, generate_mode } from '@/libs/settings.js';
import { templates } from '@/templates/completion.js';
import FoldableSection from '@/components/FoldableSection.vue';

const selected_template = ref(templates[0]);
const inferencing = ref(false);

onMounted(() => {
  for (let template of templates) {
    template.prompt_prefix = ref(template.default_prompt_prefix);
    template.prompt_suffix = ref(template.default_prompt_suffix);
  }
});

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
    const prefix = selected_template.value.prompt_prefix;
    const suffix = selected_template.value.prompt_suffix;
    const params = selected_template.value.params[generate_mode.value];
    let converted_text = await openai.complete(
      prefix + range.text + suffix,
      params.temperature,
      params.top_p,
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

function onResetDefaultTemplate() {
  selected_template.value.prompt_prefix = selected_template.value.default_prompt_prefix;
  selected_template.value.prompt_suffix = selected_template.value.default_prompt_suffix;
}
</script>

<template>
  <FoldableSection title="文本生成">
    <v-card class="mb-3" flat>
      <v-card-text>
        <v-select
          label="範本"
          v-model="selected_template"
          :items="templates"
          item-title="name"
          variant="underlined"
          return-object
        />

        <v-btn
          class="mb-2"
          prepend-icon="mdi-cached"
          size="small"
          color="red"
          variant="flat"
          @click="onResetDefaultTemplate"
        >
          恢復預設內容
        </v-btn>

        <v-textarea
          label="提詞前綴"
          v-model="selected_template.prompt_prefix"
          rows="3"
          counter
        />
        <v-textarea
          label="提詞後綴"
          v-model="selected_template.prompt_suffix"
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
          生成
        </v-btn>
      </v-card-text>
    </v-card>
  </FoldableSection>
</template>