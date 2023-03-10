<script setup>
import FoldableSection from '@/components/FoldableSection.vue';
import { max_tokens, mode } from '@/libs/parameter.js';
</script>

<template>
  <FoldableSection title="參數" :default_expanded="false">
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
      </v-card-text>
    </v-card>
  </FoldableSection>
</template>