<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import i18n from '@/i18n.js';
import * as openai from '@/libs/openai.js';
import { notify } from '@/libs/notify.js';
import { generate_location, generate_mode } from '@/libs/settings.js';
import { getWordFiles, getContent } from '@/libs/onedrive';
import { templates } from '@/templates/completion.js';

import FoldableSection from '@/components/FoldableSection.vue';
import FileList from '@/components/FileList.vue';


const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
});

const selected_template = ref(templates[0]);
const source = ref(0);
const generating = ref(false);

// onedrive
const loading = ref(false);
const error = ref(false);
const has_next = ref(false);
const files = ref([]);
const selected_file_id = ref('');
const query_filename = ref('');


function onResetDefaultTemplate() {
  const locale = i18n.global.locale.value;
  selected_template.value.prompt_prefix =
    selected_template.value[locale].default_prompt_prefix;
  selected_template.value.prompt_suffix = 
    selected_template.value[locale].default_prompt_suffix;
}


async function getFiles(reload=false) {
  loading.value = true;

  const res = await getWordFiles(5, query_filename.value, reload);
  if (reload) files.value = [];
  files.value = files.value.concat(res.entries);
  error.value = res.error;
  has_next.value = res.has_next;

  loading.value = false;
}


async function getSelectedContent() {
  const content = await getContent(selected_file_id.value);
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
        notify(t('message.no_text_selected'));
        return;
      }
      source_text = range.text;
    }
    // from onedrive
    else if (source.value === 1) {
      if (generate_location.value !== 3 && range.isEmpty) {
        notify(t('message.require_selection'));
        return;
      }
      if (!selected_file_id.value) {
        notify(t('message.no_file_selected'));
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


onMounted(() => {
  const locale = i18n.global.locale.value;
  for (let template of templates) {
    template.prompt_prefix = ref(template[locale].default_prompt_prefix);
    template.prompt_suffix = ref(template[locale].default_prompt_suffix);
  }

  getFiles();
});
</script>

<template>
  <FoldableSection :title="t('title')">
    <v-card class="mb-3" flat>
      <v-card-text>
        <v-select
          :label="t('field.template')"
          v-model="selected_template"
          :items="templates"
          :item-title="`${i18n.global.locale.value}.name`"
          variant="underlined"
          return-object
        />

        <div>
          <v-label class="text-caption" :text="t('field.text_source')" />
        </div>
        <div class="mb-3">
          <v-btn-toggle
            v-model="source"
            :mandatory="true"
            color="blue"
            variant="outlined"
            divided
          >
            <v-btn class="text-none">{{ t('button.selection') }}</v-btn>
            <v-btn class="text-none">OneDrive</v-btn>
          </v-btn-toggle>
        </div>

        <div
          v-if="source === 1"
          class="mb-2"
        >
          <v-form @submit.prevent="getFiles(true)">
            <v-text-field
              v-model="query_filename"
              prepend-inner-icon="mdi-magnify"
              density="compact"
              variant="outlined"
            />
          </v-form>
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
          <v-label class="text-caption" :text="t('field.prompt_prefix_suffix')" />
        </div>

        <v-btn
          class="mt-1 mb-2"
          prepend-icon="mdi-cached"
          size="small"
          color="red"
          variant="flat"
          @click="onResetDefaultTemplate"
        >
          {{ t('button.reset') }}
        </v-btn>

        <v-textarea
          :label="t('field.prompt_prefix')"
          v-model="selected_template.prompt_prefix"
          rows="3"
          counter
        />
        <v-textarea
          :label="t('field.prompt_suffix')"
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
          {{ t('button.generate') }}
        </v-btn>
      </v-card-text>
    </v-card>
  </FoldableSection>
</template>

<i18n lang="yaml">
zh:
  title: 文本生成
  field:
    template: 範本
    text_source: 文字來源
    prompt_prefix_suffix: 提詞前綴/後綴
    prompt_prefix: 提詞前綴
    prompt_suffix: 提詞後綴
  button:
    selection: 選取範圍
    reset: 恢復至預設內容
    generate: 生成
  message:
    no_text_selected: 沒有選取任何文字
    no_file_selected: 沒有選擇任何檔案
    require_selection: 選擇的生成位置要求選取範圍
en:
  title: Completion
  field:
    template: Template
    text_source: Text Source
    prompt_prefix_suffix: Prompt Prefix/Suffix
    prompt_prefix: Prompt Prefix
    prompt_suffix: Prompt Suffix
  button:
    selection: Selection
    reset: Reset to Default
    generate: Generate
  message:
    no_text_selected: No text was selected
    no_file_selected: No file was selected
    require_selection: Chosen generation location requires text selection
</i18n>