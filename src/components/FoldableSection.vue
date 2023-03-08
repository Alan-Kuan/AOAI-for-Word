<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  title: { type: String, required: true },
  default_expanded: { type: Boolean, default: true },
});

const expanded = ref(true);

onMounted(() => {
  expanded.value = props.default_expanded;
});

function onToggleExpand() {
  expanded.value = !expanded.value;
}
</script>

<template>
  <div class="mb-1">
    <v-sheet
      class="
        w-100 pa-2
        d-flex justify-space-between align-center
        text-white text-h6 font-weight-bold
      "
      color="#4fd594"
      elevation="2"
    >
      <div>{{ title }}</div>
      <v-btn
        :icon="`${expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'}`"
        rounded="circle"
        variant="tonal"
        size="small"
        @click="onToggleExpand"
      />
    </v-sheet>
    <v-expand-transition>
      <div v-show="expanded" class="mt-1">
        <slot></slot>
      </div>
    </v-expand-transition>
  </div>
</template>