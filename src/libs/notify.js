import { ref } from 'vue'

export const show = ref(false);
export const message = ref('');

export function notify(msg, timeout=3000) {
  show.value = true;
  message.value = msg;
  setTimeout(() => show.value = false, timeout);
}

export function dismiss() {
    show.value = false;
}