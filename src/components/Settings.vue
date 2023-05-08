<script setup>
import { ref, onMounted } from 'vue';
import FoldableSection from '@/components/FoldableSection.vue';
import {
  generate_location,
  generate_mode,
  max_tokens,

  api_key,
  api_endpoint,
  api_deployment,
  api_version,

  loadCredentials,
  saveCredentials,
  cleanCredentials
} from '@/libs/settings.js';

const hide_api_key = ref(true);

const max_token_rules = [
  val => val >= 0 || '不能低於 0',
];

onMounted(() => loadCredentials());
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
          :rules="max_token_rules"
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

        <v-text-field
          label="API 金鑰"
          v-model="api_key"
          variant="underlined"
          :type="hide_api_key ? 'password' : 'text'"
          :append-icon="hide_api_key ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="hide_api_key = !hide_api_key"
        />
        <v-text-field
          label="API 端點"
          v-model="api_endpoint"
          variant="underlined"
        />
        <v-text-field
          label="部署模型名稱"
          v-model="api_deployment"
          variant="underlined"
        />
        <v-text-field
          label="部署模型版本 (日期)"
          v-model="api_version"
          variant="underlined"
        />

        <v-row>
          <v-col>
            <v-btn
              title="存放於本地儲存空間"
              color="blue"
              @click="saveCredentials"
            >
              儲存模型連線資訊
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              title="清除存放的連線資訊"
              color="red"
              variant="outlined"
              @click="cleanCredentials"
            >
              清除
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </FoldableSection>
</template>