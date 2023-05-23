<script setup>
import { ref, onMounted } from 'vue';
import { getWordFiles } from '@/libs/onedrive';

const files = ref([]);

const emit = defineEmits(['select']);

onMounted(async () => {
  files.value = await getWordFiles();
});
</script>

<template>
  <v-progress-linear
    v-if="files.length === 0"
    color="#555555"
    indeterminate
  />

  <v-list>
    <v-list-item
      v-for="file in files"
      :key="file.id"
      :value="file.id"
      :title="file.name"
      @click="emit('select', file.id)"
    >
      <template v-slot:prepend>
        <v-avatar color="blue">
          <v-icon color="white">mdi-file-word</v-icon>
        </v-avatar>
      </template>
    </v-list-item>
  </v-list>
</template>