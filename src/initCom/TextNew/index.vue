<template>
  <div class="Text" :style="styleAttr">
    {{ text }}
    <slot name="inner"></slot>
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
const text = computed(() => {
  return useSchema.cmsData?.data[`text_${props.gridId}`]
    ? useSchema.cmsData?.data[`text_${props.gridId}`]
    : configInfo.value.text;
});
const styleAttr: any = computed(() => {
  return getstyleAttrList();
  // return {
  //   position: getAttr("position"),
  //   display: getAttr("display"),
  //   fontSize: getAttr("fontSize"),
  //   color: getAttr("color"),
  //   background: getAttr("bgcSrc"),
  //   backgroundColor: getAttr("backgroundColor"),
  //   lineHeight: getAttr("lineHeight"),
  //   letterSpacing: getAttr("letterSpacing"),
  //   opacity: getAttr("opacity"),
  //   borderWidth: getAttr("borderWidth"),
  //   borderStyle: getAttr("borderStyle"),
  //   borderRadius: getAttr("borderRadius"),
  //   borderColor: getAttr("borderColor"),
  //   fontWeight: getAttr("fontWeight"),
  //   textAlign: getAttr("textAlign"),
  //   alignItems: getAttr("alignItems"),
  //   justifyContent: getAttr("justifyContent"),
  //   backgroundRepeat: getAttr("backgroundRepeat"),
  //   backgroundSize: getAttr("backgroundSize"),
  //   backgroundPositionX: getAttr("backgroundPositionX"),
  //   backgroundPositionY: getAttr("backgroundPositionY"),
  //   paddingTop: getAttr("paddingTop"),
  //   paddingRight: getAttr("paddingRight"),
  //   paddingBottom: getAttr("paddingBottom"),
  //   paddingLeft: getAttr("paddingLeft"),
  //   marginTop: getAttr("marginTop"),
  //   marginRight: getAttr("marginRight"),
  //   marginBottom: getAttr("marginBottom"),
  //   marginLeft: getAttr("marginLeft"),
  // };
});
let styleAttrList = [
  "position",
  "display",
  "fontSize",
  "color",
  "overflowY",
  "background",
  "backgroundColor",
  "lineHeight",
  "letterSpacing",
  "opacity",
  "borderWidth",
  "borderStyle",
  // "borderRadius",
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius",
  "borderColor",
  "fontWeight",
  "textAlign",
  "alignItems",
  "justifyContent",
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
  "fontSize",
  "lineHeight",
  "letterSpacing",
  "borderWidth",
  // "borderRadius",
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius",
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
.Text {
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
