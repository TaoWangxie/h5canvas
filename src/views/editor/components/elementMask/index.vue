<template>
  <div class="elementMask" :style="getElementStyle()"></div>
  <div class="elementInnerMask" :style="getElementStyle(1)"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DCaret, Rank } from "@element-plus/icons-vue";
import svgIcon from "@/icons/svgIcon.vue";
import { useSchemaStore } from "@/store/schema";
const useSchema = useSchemaStore();
interface Props {
  grid: any;
}
const props = withDefaults(defineProps<Props>(), {
  grid: () => [],
});

const getElementStyle = (type: any) => {
  console.log(props.grid);
  let { width, height } = props.grid.style;
  let {
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
  } = props.grid.config.data;
  let marginW = marginLeft + marginRight;
  let marginH = marginTop + marginBottom;
  let paddingW = paddingLeft + paddingRight;
  let paddingH = paddingTop + paddingBottom;
  console.log(marginW + paddingW);
  console.log(marginH + paddingH);
  let w =
    typeof width === "string"
      ? `calc(100% + ${marginW}px)`
      : width + marginW + "px";
  let h =
    typeof height === "string"
      ? `calc(100% + ${marginH}px)`
      : height + marginH + "px";
  let t = `${-marginTop}px`;
  let l = `${-marginLeft}px`;
  if (!type) {
    return {
      width: w,
      height: h,
      top: t,
      left: l,
      borderLeftWidth: `${marginLeft}px`,
      borderTopWidth: `${marginTop}px`,
      borderRightWidth: `${marginRight}px`,
      borderBottomWidth: `${marginBottom}px`,
    };
  } else {
    return {
      width: typeof width === "string" ? "100%" : width + "px",
      height: typeof height === "string" ? "100%" : height + "px",
      top: 0,
      left: 0,
      borderLeftWidth: `${paddingLeft}px`,
      borderTopWidth: `${paddingTop}px`,
      borderRightWidth: `${paddingRight}px`,
      borderBottomWidth: `${paddingBottom}px`,
    };
  }
};
</script>

<style lang="scss" scoped>
.elementMask {
  box-sizing: border-box;
  position: absolute;
  border-style: solid;
  border-color: rgba(255, 119, 68, 0.4);
}
.elementInnerMask {
  box-sizing: border-box;
  position: absolute;
  border-style: solid;
  border-color: rgba(102, 255, 102, 0.4);
  background-color: rgba(64, 158, 255, 0.4);
}
</style>
