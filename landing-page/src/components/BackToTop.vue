<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// 捲過一個視窗高度後才出現
const visible = ref(false)

function update() {
  visible.value = window.scrollY > window.innerHeight
}

onMounted(() => {
  update()
  window.addEventListener('scroll', update, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', update))
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out-expo"
    leave-active-class="transition duration-150"
    enter-from-class="translate-y-2 opacity-0"
    leave-to-class="translate-y-2 opacity-0"
  >
    <a
      v-if="visible"
      href="#top"
      aria-label="回到頂端"
      title="回到頂端"
      class="fixed right-5 bottom-5 z-50 grid size-11 place-items-center rounded-full border border-grid bg-chart text-ink no-underline shadow-[0_6px_18px_rgb(0_0_0/0.45)] transition-colors hover:border-mist hover:text-white md:right-8 md:bottom-8"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </a>
  </Transition>
</template>
