<template>
  <div
    ref="canvas"
    id="canvas"
    :class="{
      canvas: true,
      hover: useSchema.enterTargetGrid === 0,
    }"
    data-type="canvas"
    @mousedown.stop="handleMouseDownOnCanvas"
    @contextmenu="handleContextMenu"
    @drop.stop="handleDrop"
    @dragover.stop="handleDragOver"
    @dragleave.stop="handleDragleave"
  >
    <gridItem
      v-for="(item, index) in useSchema.grids"
      :key="index"
      :grid="item"
      @gridClick="gridClick"
    >
    </gridItem>
    <canvas
      v-show="isCheckStyle"
      ref="canvasMask"
      id="canvasMask"
      :width="canvas?.offsetWidth"
      :height="canvas?.offsetHeight"
    ></canvas>

    <!-- menu 传送到body 避免缩放影响 -->
    <Teleport to="body">
      <contextMenu></contextMenu>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import _ from "lodash";
import { ref, VueElement, onMounted, nextTick, watch } from "vue";
import gridItem from "@/views/editor/components/gridItem/index.vue";
import contextMenu from "@/views/editor/components/contextMenu/index.vue";
import { removeNode, getEventInCanvasPos } from "@/utils/index";
import { useSchemaStore } from "@/store/schema";
const useSchema = useSchemaStore();
//refs
let canvas: any | VueElement = ref(); //画布
let canvasMask: any = ref(null); //style画布
let context: any = ref(null);
let isCheckStyle: any = ref(false); //
onMounted(() => {
  nextTick(() => {
    /*获取绘图工具*/
    context.value = canvasMask.value.getContext("2d");
  });
});
watch(
  () => isCheckStyle.value,
  (val) => {
    if (!val) {
      context.value.clearRect(
        0,
        0,
        canvas.value?.offsetWidth,
        canvas.value?.offsetWidth
      );
    }
  }
);
const canvasMargin = (point: any) => {
  let { out, inner } = point;
  context.value.beginPath();
  /*填充颜色*/
  context.value.moveTo(out[0].x - 4, out[0].y - 4); // 起点
  context.value.lineTo(out[1].x + 4, out[1].y - 4); // 第一条线
  context.value.lineTo(out[2].x + 4, out[2].y - 4); // 第二条线
  context.value.lineTo(out[3].x - 4, out[3].y - 4); // 第三条线
  context.value.closePath(); // 结束路径，自动闭合
  /*绘画逆时针内部正方形*/
  context.value.moveTo(inner[0].x - 4, inner[0].y - 4); // 起点
  context.value.lineTo(inner[3].x - 4, inner[3].y - 4); // 第三条线
  context.value.lineTo(inner[2].x + 4, inner[2].y - 4); // 第二条线
  context.value.lineTo(inner[1].x + 4, inner[1].y - 4); // 第一条线
  context.value.closePath(); // 结束路径，自动闭合
  context.value.fillStyle = "rgb(255, 140, 0, .4)"; // 紫
  context.value.fill();
  // 结束绘制
  context.value.restore();
};
const canvasPadding = () => {};
const canvasContent = () => {};
const gridClick = (val: any) => {
  // if ((window.event as any)?.ctrlKey) {
  //   isCheckStyle.value = true;
  //   canvasMargin(val);
  // }
};
const handleDrop = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const targetGrid = JSON.parse(e.dataTransfer.getData("grid"));
  removeNode(useSchema.grids, targetGrid.id);
  targetGrid.config.data.position = useSchema.isPosition;
  if (useSchema.isPosition === "absolute") {
    let { top, left } = getPosStyle(e, targetGrid);
    targetGrid.style.width = 200;
    targetGrid.style.top = top;
    targetGrid.style.left = left;
  }
  useSchema.addList("grids", targetGrid);
  useSchema.setData("currentGrid", targetGrid);
  useSchema.setData("enterTargetGrid", null);
  useSchema.setData("isShowPos", false);
  useSchema.RECORD_SNAPSHOT();
};
const getPosStyle = (e, targetGrid) => {
  const canvasInfo = (
    document.getElementById("canvas") as any
  ).getBoundingClientRect();
  return {
    top: e.clientY - canvasInfo.y - 4 - 20,
    left: e.clientX - canvasInfo.x - 4 - 100,
  };
};
const handleDragOver = (e: any) => {
  e.preventDefault();
  e.stopPropagation();
  useSchema.setData("enterTargetGrid", 0);
};
const handleDragleave = (e: any) => {
  e.preventDefault();
  useSchema.setData("enterTargetGrid", 0);
};
// canvas点击
const handleMouseDownOnCanvas = (e) => {
  e.preventDefault();
  e.stopPropagation();
  useSchema.HIDE_CONTEXT_MENU();
  useSchema.setData("currentGrid", 0);
};
//menu菜单点击
const handleContextMenu = (e: any) => {
  e.stopPropagation();
  e.preventDefault();
  e.target.dataset.type &&
    useSchema.setData("contextmenuType", e.target.dataset.type);
  let pos = getEventInCanvasPos(e);
  let top = e.clientY;
  let left = e.clientX + 10;
  useSchema.setData("canvasEPos", pos);
  useSchema.SHOW_CONTEXT_MENU({ top, left });
};
</script>
<style lang="scss" scoped>
.canvas {
  width: 100%;
  height: 100%;
}
.active {
  clear: #ff8c00;
}
.hover {
  border-color: #00ddaa !important;
}
</style>
