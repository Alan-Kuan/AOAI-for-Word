<script setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import i18n from '@/i18n.js';

import {
  generate_location,
  generate_mode,
  max_tokens,

  api_key,
  api_endpoint_completion,

  loadCredentials,
  saveCredentials,
  cleanCredentials,

  saveLanguageIndex,
  getLanguageIndex,
} from '@/libs/settings.js';

import FoldableSection from '@/components/FoldableSection.vue';

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
});

const selected_lang = ref(0);
const hide_api_key = ref(true);

const locale_select_items = [
  { name: 'zh', text: '中文' },
  { name: 'en', text: 'English' },
];

const gen_loc_select_items = computed(() => {
  const locale = i18n.global.locale.value;
  const items = [
    { title: 'select.replace', value: 0 },
    { title: 'select.continue', value: 1 },
    { title: 'select.next_line', value: 2 },
    { title: 'select.end_of_file', value: 3 },
  ];
  return items.map(item => {
      return {
        title: t(item.title, 1, { locale }),
        value: item.value,
      }
    });
});

const max_token_rules = [
  val => val >= 0 || t('message.no_less_than_0'),
];

function setLanguage(lang, idx) {
  i18n.global.locale.value = lang;
  saveLanguageIndex(idx);
}

onMounted(() => {
    loadCredentials();

    const idx = getLanguageIndex();
    i18n.global.locale.value = locale_select_items[idx].name;
    selected_lang.value = idx;
  });
</script>

<template>
  <FoldableSection :title="t('title')" :default_expanded="false">
    <v-card flat>
      <v-card-text>
        <v-label class="text-caption" :text="t('field.language')" />
        <div class="mb-3">
          <v-btn-toggle
            v-model="selected_lang"
            :mandatory="true"
            color="blue"
            variant="outlined"
            divided
          >
            <v-btn
              v-for="item, idx in locale_select_items"
              :key="item.name"
              class="text-none"
              @click="setLanguage(item.name, idx)"
            >
              {{ item.text }}
            </v-btn>
          </v-btn-toggle>
        </div>

        <v-select
          v-model="generate_location"
          :label="t('field.generation_location')"
          :items="gen_loc_select_items"
          variant="underlined"
        />

        <v-text-field
          :label="t('field.max_token')"
          v-model="max_tokens"
          type="number"
          min="0"
          :rules="max_token_rules"
          variant="underlined"
        />

        <v-label class="text-caption" :text="t('field.response_mode')" />
        <div class="mb-3">
          <v-btn-toggle
            v-model="generate_mode"
            :mandatory="true"
            color="blue"
            variant="outlined"
            divided
          >
            <v-btn class="text-none">{{ t('button.precise') }}</v-btn>
            <v-btn class="text-none">{{ t('button.creative') }}</v-btn>
          </v-btn-toggle>
        </div>

        <v-text-field
          :label="t('field.completion_api_endpoint')"
          v-model="api_endpoint_completion"
          variant="underlined"
        />
        <v-text-field
          :label="t('field.api_key')"
          v-model="api_key"
          variant="underlined"
          :type="hide_api_key ? 'password' : 'text'"
          :append-icon="hide_api_key ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="hide_api_key = !hide_api_key"
        />

        <v-row>
          <v-col>
            <v-btn
              :title="t('tooltip.save')"
              color="blue"
              @click="saveCredentials"
            >
              {{ t('button.save') }}
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              :title="t('tooltip.clear')"
              color="red"
              variant="outlined"
              @click="cleanCredentials"
            >
              {{ t('button.clear') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </FoldableSection>
</template>

<i18n lang="yaml">
zh:
  title: 設定
  field:
    language: 語言
    generation_location: 生成位置
    max_token: 單次回應 token 數上限
    response_mode: 回應模式
    completion_api_endpoint: 「完成」API 端點
    api_key: API 金鑰
  select:
    replace: 取代選取範圍
    continue: 接續選取範圍
    next_line: 插入選取範圍下一行
    end_of_file: 插入檔案結尾
  button:
    precise: 精確
    creative: 創意
    save: 儲存模型連線資訊
    clear: 清除
  tooltip:
    save: 存放於本地儲存空間
    clear: 清除存放的連線資訊
  message:
    no_less_than_0: 不能低於 0
en:
  title: Settings
  field:
    language: Language
    generation_location: Generation Location
    max_token: Max Tokens
    response_mode: Response Mode
    completion_api_endpoint: Completion API Endpoint
    api_key: API Key
  select:
    replace: Replace Selection
    continue: Insert at the End of Selection
    next_line: Insert at Next Line of Selection
    end_of_file: Insert at the End of File
  button:
    precise: Precise
    creative: Creative
    save: Save Credentials
    clear: Clear
  tooltip:
    save: It's saved in local storage
    clear: Clear
  message:
    no_less_than_0: cannot less than 0
</i18n>