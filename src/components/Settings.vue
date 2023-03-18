<script setup>
import FoldableSection from '@/components/FoldableSection.vue';
import SecretInput from './SecretInput.vue';
import {
  generate_location,
  generate_mode,
  max_tokens,
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
        <div>
          <v-label class="text-caption" text="生成位置" />
        </div>
        <div class="mb-3">
          <v-btn-toggle
            v-model="generate_location"
            :mandatory="true"
            color="blue"
            variant="outlined"
            divided
          >
            <v-btn>取代</v-btn>
            <v-btn>接續</v-btn>
            <v-btn>插入下行</v-btn>
          </v-btn-toggle>
        </div>

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
        <div class="mb-3">
          <v-btn-toggle
            v-model="generate_mode"
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