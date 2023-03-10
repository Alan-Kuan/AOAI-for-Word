<script setup>
import { curr_completion_tokens, curr_prompt_tokens, total_tokens } from '@/libs/token_usage';
</script>

<template>
  <v-footer app>
    <v-card flat>
      <v-card-text>
        <v-row>本次請求提詞 token 數: {{ curr_prompt_tokens }}</v-row>
        <v-row>本次請求生成 token 數: {{ curr_completion_tokens }}</v-row>
        <v-row>目前累計耗用 token 數: {{ total_tokens }}</v-row>
      </v-card-text>
    </v-card>
  </v-footer>
</template>