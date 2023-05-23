<script setup>
import { ref, onMounted } from 'vue';
import { getWordFiles } from '@/libs/onedrive';

const loading = ref(true);
const files = ref([]);
const has_next = ref(false);

const emit = defineEmits(['select']);

async function getFiles() {
  loading.value = true;
  const res = await getWordFiles(5);
  files.value = files.value.concat(res.entries);
  has_next.value = res.has_next;
  loading.value = false;
}

onMounted(getFiles);
</script>

<template>
  <v-progress-linear
    v-if="loading"
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

  <v-btn
    v-if="files.length > 0 && has_next"
    class="w-100"
    color="blue"
    variant="text"
    @click="getFiles"
  >
    載入更多
  </v-btn>
</template>