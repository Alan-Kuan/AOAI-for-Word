<script setup>
import { ref, onMounted } from 'vue';
import * as openai from '@/libs/openai.js';
import { notify } from '@/libs/notify.js';
import { generate_location, generate_mode } from '@/libs/settings.js';
import { getWordFiles, getContent } from '@/libs/onedrive';
import { templates } from '@/templates/completion.js';

import FoldableSection from '@/components/FoldableSection.vue';
import FileList from '@/components/FileList.vue';

const selected_template = ref(templates[0]);
const source = ref(0);
const generating = ref(false);

// onedrive
const loading = ref(false);
const error = ref(false);
const has_next = ref(false);
const files = ref([]);
const selected_file_id = ref('');

async function getFiles(reload=false) {
  loading.value = true;

  const res = await getWordFiles(5, reload);
  if (reload) files.value = [];
  files.value = files.value.concat(res.entries);
  error.value = res.error;
  has_next.value = res.has_next;

  loading.value = false;
}

async function getSelectedContent() {
  loading.value = true;
  const content = await getContent(selected_file_id.value);
  loading.value = false;
  return content;
}

async function onConvert() {
  await Word.run(async ctx => {
    const range = ctx.document.getSelection();

    range.load({ text: true, isEmpty: true })
    await ctx.sync();

    let source_text;

    // from selection
    if (source.value === 0) {
      if (range.isEmpty) {
        notify('沒有選取任何文字');
        return;
      }
      source_text = range.text;
    }
    // from onedrive
    else if (source.value === 1) {
      if (generate_location.value !== 3 && range.isEmpty) {
        notify('選擇的生成位置要求選取範圍');
        return;
      }
      generating.value = true;
      source_text = await getSelectedContent();
    }

    generating.value = true;
    const prefix = selected_template.value.prompt_prefix;
    const suffix = selected_template.value.prompt_suffix;
    const params = selected_template.value.params[generate_mode.value];
    const converted_text = await openai.complete(
      prefix + source_text + suffix,
      params.temperature,
      params.top_p,
    );
    generating.value = false;

    if (!converted_text) return;

    switch (generate_location.value) {
    case 0:  // replace
      range.insertText(converted_text, Word.InsertLocation.replace);
      break;
    case 1:  // continue
      range.insertText(converted_text, Word.InsertLocation.end);
      break;
    case 2:  // next line
      range.insertText('\n' + converted_text, Word.InsertLocation.end);
      break;
    case 3:  // end of file
      ctx.document.body.insertText('\n' + converted_text, Word.InsertLocation.end);
      break;
    }

    await ctx.sync();
  });
}

function onResetDefaultTemplate() {
  selected_template.value.prompt_prefix = selected_template.value.default_prompt_prefix;
  selected_template.value.prompt_suffix = selected_template.value.default_prompt_suffix;
}

onMounted(() => {
  for (let template of templates) {
    template.prompt_prefix = ref(template.default_prompt_prefix);
    template.prompt_suffix = ref(template.default_prompt_suffix);
  }

  getFiles();
});
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

        <div>
          <v-label class="text-caption" text="文字來源" />
        </div>
        <div class="mb-3">
          <v-btn-toggle
            v-model="source"
            :mandatory="true"
            color="blue"
            variant="outlined"
            divided
          >
            <v-btn>選取範圍</v-btn>
            <v-btn class="text-none">OneDrive</v-btn>
          </v-btn-toggle>
        </div>

        <div
          v-if="source === 1"
          class="mb-2"
        >
          <FileList
            :loading="loading"
            :error="error"
            :has_next="has_next"
            :files="files"
            v-model:selected="selected_file_id"
            @reload="getFiles(true)"
            @load_more="getFiles()"
          />
        </div>


        <div>
          <v-label class="text-caption" text="提詞前綴/後綴" />
        </div>

        <v-btn
          class="mt-1 mb-2"
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
          :loading="generating"
          @click="onConvert"
        >
          <v-icon icon="mdi-fountain-pen-tip" />
          生成
        </v-btn>
      </v-card-text>
    </v-card>
  </FoldableSection>
</template>