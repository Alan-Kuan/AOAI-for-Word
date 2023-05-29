<script setup>
import { ref, onMounted } from 'vue';
import { getWordFiles, getContent } from '@/libs/onedrive';

const loading = ref(true);
const files = ref([]);
const has_next = ref(false);
const error = ref(false);

async function getFiles(reload=false) {
  loading.value = true;

  const res = await getWordFiles(5, reload);
  if (reload) files.value = [];
  files.value = files.value.concat(res.entries);
  has_next.value = res.has_next;
  error.value = res.error;

  loading.value = false;
}

async function onFileSelected(id) {
  loading.value = true;

  const content = await getContent(id);

  loading.value = false;
}

onMounted(() => getFiles());
</script>

<template>
  <v-progress-linear
    v-if="loading"
    color="#555555"
    indeterminate
  />

  <v-alert
    v-if="error"
    class="mt-2 mx-2"
    text="發生錯誤，請嘗試重新登入"
    type="error"
    border="top"
    border-color="red"
    density="compact"
    variant="outlined"
  />

  <v-btn
    append-icon="mdi-reload"
    size="small"
    variant="flat"
    @click="getFiles(true)"
  >
    重新整理
  </v-btn>

  <v-list>
    <v-list-item
      v-for="file in files"
      :key="file.id"
      :value="file.id"
      :title="file.name"
      @click="onFileSelected(file.id)"
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
    @click="getFiles()"
  >
    載入更多
  </v-btn>
</template>