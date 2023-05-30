<script setup>
const prop = defineProps({
  loading: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
  has_next: { type: Boolean, default: false },
  files: { type: Array, required: true },
  selected: { type: String, required: true },
});

const emit = defineEmits([
  'reload',
  'load_more',
  'update:selected',
]);
</script>

<template>
  <v-progress-linear
    v-if="loading"
    color="#555555"
    indeterminate
  />

  <v-btn
    append-icon="mdi-reload"
    size="small"
    variant="flat"
    @click="$emit('reload')"
  >
    重新整理
  </v-btn>

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

  <v-card
    class="overflow-y-auto"
    height="12rem"
    variant="flat"
  >
    <v-list>
      <v-list-item
        v-for="file in files"
        :key="file.id"
        :value="file.id"
        :title="file.name"
        @click="$emit('update:selected', file.id)"
      >
        <template v-slot:prepend>
          <v-avatar :color="file.id === selected ? 'green' : 'blue'">
            <v-icon color="white">
              {{ file.id === selected ? 'mdi-check' : 'mdi-file-word' }}
            </v-icon>
          </v-avatar>
        </template>
      </v-list-item>
    </v-list>

    <v-btn
      v-if="files.length > 0 && has_next"
      class="w-100"
      color="blue"
      variant="text"
      @click="$emit('load_more')"
    >
      載入更多
    </v-btn>
  </v-card>
</template>