<script setup>
import FoldableSection from '@/components/FoldableSection.vue';
import SecretInput from './SecretInput.vue';
import {
  max_tokens,
  mode,
  api_key,
  api_endpoint,
  api_deployment,
  api_version,
} from '@/libs/settings.js';
</script>

<template>
  <FoldableSection title="設定" :default_expanded="false">
    <v-card flat>
      <v-card-text>
        <v-text-field
          label="單次回應 token 數上限"
          v-model="max_tokens"
          type="number"
          min="0"
          variant="underlined"
        />

        <div>
          <v-label class="text-caption" text="回應模式" />
        </div>
        <div>
          <v-btn-toggle
            v-model="mode"
            :mandatory="true"
            color="blue"
            variant="outlined"
            divided
          >
            <v-btn>精確</v-btn>
            <v-btn>創意</v-btn>
          </v-btn-toggle>
        </div>

        <SecretInput
          class="mt-3"
          label="API 金鑰"
          v-model="api_key"
        />
        <SecretInput
          label="API 端點"
          v-model="api_endpoint"
        />
        <SecretInput
          label="部署模型名稱"
          v-model="api_deployment"
        />
        <SecretInput
          label="部署模型版本 (日期)"
          v-model="api_version"
        />
      </v-card-text>
    </v-card>
  </FoldableSection>
</template>