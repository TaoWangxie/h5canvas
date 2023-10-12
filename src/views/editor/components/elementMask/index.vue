<template>
  <div class="elementMask" :style="getElementStyle()"></div>
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

const getElementStyle = () => {
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
      ? `calc(100% + ${marginW + paddingW}px)`
      : width + marginW + paddingW + "px";
  let h =
    typeof height === "string"
      ? `calc(100% + ${marginH + paddingH}px)`
      : height + marginH + paddingH + "px";
  return {
    width: w,
    height: h,
    top: 0,
    left: 0,
  };
};
</script>

<style lang="scss" scoped>
.elementMask {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
