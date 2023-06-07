<script setup>
import { useI18n } from 'vue-i18n'
import { curr_completion_tokens, curr_prompt_tokens, total_tokens } from '@/libs/token_usage';

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
});
</script>

<template>
  <v-card flat>
    <v-card-text>
      <v-row class="text-caption">
        {{ t('curr_prompt_tokens') }}: {{ curr_prompt_tokens }}
      </v-row>
      <v-row class="text-caption">
        {{ t('curr_completion_tokens') }}: {{ curr_completion_tokens }}
      </v-row>
      <v-row class="text-caption">
        {{ t('total_tokens') }}: {{ total_tokens }}
      </v-row>
    </v-card-text>
  </v-card>
</template>

<i18n lang="yaml">
zh:
  curr_prompt_tokens: 本次請求提詞 token 數
  curr_completion_tokens: 本次請求生成 token 數
  total_tokens: 目前累計耗用 token 數
en:
  curr_prompt_tokens: Just Used Tokens in Prompt
  curr_completion_tokens: Just Used Tokens in Completion
  total_tokens: Total Accumulated Used Tokens
</i18n>