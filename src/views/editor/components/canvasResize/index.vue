<template>
  <div class="canvasResize">
    <span @mousedown="onMouseDown">
      <el-icon :size="18">
        <DCaret />
      </el-icon>
    </span>
  </div>
</template>

<script setup lang='ts'>
import { ref, getCurrentInstance } from "vue";
import { DCaret } from "@element-plus/icons-vue";
import { useSchemaStore } from "@/store/schema";
const useSchema = useSchemaStore();

//改变画布高度大小
const onMouseDown = (e: any) => {
  let startY = e.clientY;
  let h = useSchema.canvasH;
  const move = (e: any) => {
    const diffY = e.clientY - startY;
    let height = h + diffY * 2;
    if (height > 50) {
      useSchema.setData("canvasH", height);
    }
  };
  const up = (e: any) => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };
  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
};
</script>

<style lang="scss" scoped>
.canvasResize {
  position: absolute;
  width: 100%;
  height: 0;
  left: 0;
  bottom: -25px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      cursor: n-resize;
    }
  }
}
</style>
