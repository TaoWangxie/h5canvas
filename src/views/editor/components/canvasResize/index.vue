<template>
  <div class="canvasResize">
    <span @mousedown="onMouseDown">
      <el-icon :size="18">
        <Rank />
      </el-icon>
    </span>
  </div>
</template>

<script setup lang='ts'>
import { ref, getCurrentInstance } from "vue";
import { DCaret, Rank } from "@element-plus/icons-vue";
import { useSchemaStore } from "@/store/schema";
const useSchema = useSchemaStore();

//改变画布高度大小
const onMouseDown = (e: any) => {
  let startY = e.clientY;
  let startX = e.clientX;
  let h = useSchema.canvasH;
  let w = useSchema.canvasW;
  console.log(w);
  const move = (e: any) => {
    const diffY = e.clientY - startY;
    const diffX = e.clientX - startX;
    let height = h + diffY;
    let width = w + diffX;
    if (height > 50) {
      useSchema.setData("canvasH", height);
    }
    // if (width > 50) {
    useSchema.setData("canvasW", width);
    // }
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
  width: 20px;
  height: 20px;
  right: -25px;
  bottom: -25px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      cursor: se-resize;
    }
  }
}
</style>
