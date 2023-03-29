<script setup>
import { signIn } from './auth.js';
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
          登入
        </v-btn>
      </div>
      <div class="mt-5 text-caption text-grey">
        Microsoft Internal Account Only
      </div>
    </v-container>
  </v-layout>
</template>