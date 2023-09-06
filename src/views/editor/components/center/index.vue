<template>
  <div class="center_container">
    <CenterNav></CenterNav>
    <div
      ref="wrapperPannel"
      class="wrapperPannel"
      @mousedown="handleMouseDownOnWrapper"
    >
      <div
        ref="wrapper"
        class="wrapper"
        :style="{
          width: useSchema.canvasW + 'px',
          height: useSchema.canvasH + 'px',
        }"
      >
        <Canvas></Canvas>
      </div>
      <PosBox></PosBox>
    </div>
  </div>
</template>
    
<script setup lang='ts'>
import _ from "lodash";
import { onMounted, ref, VueElement } from "vue";
import CenterNav from "./components/centerNav/index.vue";
import PosBox from "./components/posBox/index.vue";
import Canvas from "@/views/editor/components/canvas/index.vue";
import { isInview, mouseMoveDirection } from "@/utils/index";
import { useSchemaStore } from "@/store/schema";
const useSchema = useSchemaStore();

let wrapperPannel: any | VueElement = ref(null);
let wrapper: any | VueElement = ref(null);

let wrapperMoveState: any = ref({
  isDrag: false,
  startX: 0,
  startY: 0,
  needX: 0,
  needY: 0,
});
let wrapperPannelRect: any = ref(null);
onMounted(() => {
  init();
});

const init = () => {
  wrapperPannel.value.style.display = "block";
  wrapper.value.style.display = "inline-block";
  let viewWidth = wrapperPannel.value.offsetWidth;
  let viewHeight = wrapperPannel.value.offsetHeight;
  wrapperMoveState.value.needX = (viewWidth - wrapper.value.offsetWidth) * 0.5;
  wrapperMoveState.value.needY =
    (viewHeight - wrapper.value.offsetHeight) * 0.5;
  wrapperPannelRect.value = wrapperPannel.value.getBoundingClientRect();
  changeStyle();
};
// wrapper点击
const handleMouseDownOnWrapper = (e) => {
  useSchema.setData("currentGrid", null);
  if (e.target != wrapperPannel.value) {
  } else {
    let viewWidth = wrapperPannel.value.offsetWidth;
    let viewHeight = wrapperPannel.value.offsetHeight;
    wrapperMoveState.value.isDrag = true;
    wrapperMoveState.value.startX = e.clientX;
    wrapperMoveState.value.startY = e.clientY;
    if (wrapperPannel.value) {
      wrapperPannel.value.style.cursor = "grab";
    }
    let direction: any = ["中", "中"];
    const move = (e: any) => {
      //鼠标拖拽方向
      direction = mouseMoveDirection(e);
      //是否在可视区域
      let clientRect = getWrapperBoundingClientRect(wrapper.value);
      let isView = isInview(clientRect, viewHeight, viewWidth);
      if (isView) {
        if (
          (clientRect.bottom < 0 && direction[1] == "下") ||
          (clientRect.top > viewHeight && direction[1] == "上") ||
          (clientRect.right < 0 && direction[0] == "右") ||
          (clientRect.left > viewWidth && direction[0] == "左")
        ) {
          moveFn(e);
        }
      } else {
        moveFn(e);
      }
      e.preventDefault();
    };
    const up = (e: any) => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
      wrapperPannel.value.style.cursor = "default";
      wrapperMoveState.value.isDrag = false;
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  }
  //移动事件
  function moveFn(e) {
    if (wrapperMoveState.value.isDrag) {
      const diffX = e.clientX - wrapperMoveState.value.startX;
      const diffY = e.clientY - wrapperMoveState.value.startY;
      wrapperMoveState.value.needX = wrapperMoveState.value.needX + diffX;
      wrapperMoveState.value.needY = wrapperMoveState.value.needY + diffY;
      wrapperMoveState.value.startX = e.clientX;
      wrapperMoveState.value.startY = e.clientY;
      changeStyle();
    }
  }
  //获取wrapper相对可视区域ClientRect
  function getWrapperBoundingClientRect(wrapper) {
    let wrapperRect = wrapper.getBoundingClientRect();
    return {
      left: wrapperRect.left - wrapperPannelRect.value.left,
      right: wrapperRect.right - wrapperPannelRect.value.left,
      top: wrapperRect.top - wrapperPannelRect.value.top,
      bottom: wrapperRect.bottom - wrapperPannelRect.value.top,
    };
  }
};

//修改画布样式
const changeStyle = () => {
  wrapper.value.style.transform = `translate(${Math.round(
    wrapperMoveState.value.needX
  )}px,${Math.round(wrapperMoveState.value.needY)}px)`;
};
</script>
    
<style lang="scss" scoped>
.center_container {
  flex: 1;
  height: 100vh;
  .wrapperPannel {
    position: relative;
    height: calc(100% - 40px);
    box-sizing: border-box;
    border-bottom: 1px solid #ebeef5;
    background-color: #fafcff;
    overflow: hidden;
    .wrapper {
      box-shadow: 0 0px 15px #ccc;
      border: 4px solid #fff;
      background-color: #fff;
    }
  }
}
</style>
    