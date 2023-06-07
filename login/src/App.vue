<script setup>
import { ref, onMounted } from 'vue';
import { signIn } from './auth.js';

const lang_idx = ref(0);

const login_texts = ['登入', 'Login'];
const login_hints = [
  '使用你的組織帳號登入',
  "Login with your organization's account",
];

function getLanguageIndex() {
  const lang_idx = localStorage.getItem('language') ?? '0';
  return parseInt(lang_idx, 10);
}

function setLanguageIndex(idx) {
  lang_idx.value = idx;
  localStorage.setItem('language', idx);
}

onMounted(() => {
  lang_idx.value = getLanguageIndex();
});
</script>

<template>
  <v-layout full-height>
    <v-container
      class="d-flex flex-column justify-center align-center"
    >
      <div>
        <v-icon
          icon="mdi-draw-pen"
          size="128"
          color="brown"
        />
      </div>
      <div>
        <h2>
          Azure OpenAI for Word
        </h2>
      </div>
      <div class="mt-5">
        <v-btn
          color="blue"
          @click="signIn"
        >
          {{ login_texts[lang_idx] }}
        </v-btn>
      </div>
      <div class="mt-5 text-caption text-grey">
        {{ login_hints[lang_idx] }}
      </div>
      <div class="mt-16">
        <v-btn-toggle
          v-model="lang_idx"
          selected-class="selected-lang"
          color="blue"
          :mandatory="true"
          variant="plain"
        >
          <v-btn @click="setLanguageIndex(0)">中文</v-btn>
          <v-btn @click="setLanguageIndex(1)">English</v-btn>
        </v-btn-toggle>
      </div>
    </v-container>
  </v-layout>
</template>

<style scoped>
.selected-lang {
  font-weight: bold;
}
</style>