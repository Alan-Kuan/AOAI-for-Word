<script setup>
import { ref } from 'vue';

defineProps({
  label: { type: String },
  modelValue: { type: String },
});

defineEmits(['update:modelValue']);

const hide = ref(true);
</script>

<template>
  <v-text-field
    :label="label"
    :value="modelValue"
    :type="hide ? 'password' : 'text'"
    variant="underlined"
    :append-icon="hide ? 'mdi-eye-off' : 'mdi-eye'"
    @input="$emit('update:modelValue', $event.target.value)"
    @click:append="hide = !hide"
  />
</template>