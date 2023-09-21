<template>
  <div class="grid" :style="styleAttr">
    <slot></slot>
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

const configInfo: any = ref({});
const styleAttr: any = computed(() => {
  return getstyleAttrList();
});

let styleAttrList = [
  "position",
  "display",
  "flex",
  "flexWrap",
  "overflowY",
  "bgcSrc",
  "backgroundColor",
  "opacity",
  "borderWidth",
  "borderStyle",
  "borderRadius",
  "borderColor",
  "backgroundRepeat",
  "backgroundSize",
  "backgroundPositionX",
  "backgroundPositionY",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
];
const pxs = [
  "borderWidth",
  "borderRadius",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
];
const getstyleAttrList = () => {
  let result = {};
  let cmsKeys = useSchema.cmsData?.data
    ? Object.keys(useSchema.cmsData?.data)
    : [];
  styleAttrList.map((item: any) => {
    result[item] = getAttr(item, cmsKeys);
  });
  return result;
};
const getAttr = (attr: any, cmsKeys: any) => {
  let unit = pxs.includes(attr) ? "px" : "";
  let prop = attr + "_" + props.gridId;
  let val = cmsKeys.includes(prop)
    ? useSchema.cmsData?.data[prop] + unit
    : configInfo.value[attr] + unit;
  if (["bgcSrc"].includes(attr)) {
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
.grid {
  position: relative;
  box-sizing: border-box;
}
</style>