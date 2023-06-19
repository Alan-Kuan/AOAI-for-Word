<script setup>
import { useI18n } from 'vue-i18n';
import FoldableSection from '@/components/FoldableSection.vue';

const { t } = useI18n({
  inheritLocale: true,
  useScope: 'local',
});

const version = import.meta.env.VITE_ADDIN_VERSION;
const release_month = import.meta.env.VITE_ADDIN_RELEASE_MONTH;
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
        <br />
        {{ t('release_month') }}: {{ release_month }}
      </v-card-text>
    </v-card>
  </FoldableSection>
</template>

<i18n lang="yaml">
zh:
  title: 關於
  desc: 此為台灣微軟技術中心所做的展示應用，而非 Microsoft 365 Copilot。
  version: 當前版本
  release_month: 發布月份
en:
  title: About
  desc: This is a demo by MTC Taiwan, and it's not the Microsoft 365 Copilot.
  version: current version
  release_month: release month
</i18n>