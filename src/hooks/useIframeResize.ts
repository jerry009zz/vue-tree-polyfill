import { onBeforeUnmount, onMounted, ref } from "vue"

export const useIframeResize = (resizeCallback: () => void) => {
  const iframe = ref<HTMLIFrameElement | undefined>()

  onMounted(() => {
    const $iframe = iframe.value
    if ($iframe?.contentWindow) {
      $iframe.contentWindow.addEventListener('resize', resizeCallback)
    }
  })
  
  onBeforeUnmount(() => {
    const $iframe = iframe.value
    if ($iframe?.contentWindow) {
      $iframe.contentWindow.removeEventListener('resize', resizeCallback)
    }
  })
}
