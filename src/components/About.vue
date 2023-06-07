<script setup>
import { useI18n } from 'vue-i18n';
import FoldableSection from '@/components/FoldableSection.vue';

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
});

const version = import.meta.env.VITE_ADDIN_VERSION;
</script>

<template>
  <FoldableSection
    :title="t('title')"
    :default_expanded="false"
  >
    <v-card flat>
      <v-card-text>
        {{ t('desc') }}
      </v-card-text>
      <v-card-text>
        {{ t('version') }}: {{ version }}
      </v-card-text>
    </v-card>
  </FoldableSection>
</template>

<i18n lang="yaml">
zh:
  title: 關於
  desc: 此為台灣微軟技術中心所做的展示應用，而非 Microsoft 365 Copilot。
  version: 當前版本
en:
  title: About
  desc: This is a demo by MTC Taiwan, and it's not the Microsoft 365 Copilot.
  version: current version
</i18n>