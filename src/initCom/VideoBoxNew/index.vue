<template>
  <div class="videoBox_inner" :style="styleAttr">
    <video
      class="video-background"
      preload="auto"
      loop
      playsinline
      autoplay
      :src="src"
      tabindex="-1"
      muted="muted"
    ></video>
  </div>
</template>

<script setup lang='ts'>
import { ref, watch, computed } from "vue";
import { useSchemaStore } from "@/store/schema";
const useSchema = useSchemaStore();

interface Props {
  config?: any;
  gridId: any;
}
const props = withDefaults(defineProps<Props>(), {
  config: () => {},
  gridId: "",
});

let configInfo: any = ref({});
const src = computed(() => {
  return useSchema.cmsData?.data[`src_${props.gridId}`]
    ? useSchema.cmsData?.data[`src_${props.gridId}`]
    : configInfo.value.src;
});

const styleAttr: any = computed(() => {
  return {
    position: getAttr("position"),
  };
});

const pxs: any = [];
const getAttr = (attr: any) => {
  let unit = pxs.includes(attr) ? "px" : "";
  let val = useSchema.cmsData?.data[attr + "_" + props.gridId]
    ? useSchema.cmsData?.data[attr + "_" + props.gridId] + unit
    : configInfo.value[attr] + unit;
  if (["background"].includes(attr)) {
    return handleBgcSrc(val);
  }
  return val;
};

const handleBgcSrc = (src: string) => {
  return "url(" + src + ")";
};

//watch
watch(
  () => props.config,
  (val) => {
    configInfo.value = val?.data;
  },
  { deep: true, immediate: true }
);
</script>

<style lang="scss" scoped>
.videoBox_inner {
  position: relative;
  /*进行视频裁剪*/
  overflow: hidden;

  display: inline-block;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
.videoBox_inner .video-background {
  position: absolute;
  left: 50%;
  top: 50%;
  /*保证视频内容始终居中*/
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  /*保证视频充满屏幕*/
  object-fit: cover;
  min-height: 800px;
}
</style>