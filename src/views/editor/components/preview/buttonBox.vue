<template>
  <div class="buttonBox">
    <div class="content" :style="{ justifyContent: direction }">
      <div
        id="nav_item"
        class="nav_item"
        v-for="item in btnList"
        :key="item.id"
        @click="btnClick(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
  
<script setup lang='ts'>
import { ref } from "vue";
//props
interface Props {
  btnList: any;
  direction: string;
}
const props = withDefaults(defineProps<Props>(), {
  btnList: () => [],
  direction: "start",
});

const emits = defineEmits(["btnClick"]);
const btnClick = (data: any) => {
  emits("btnClick", data);
};
</script>
<style lang="scss" scoped>
.buttonBox {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.content {
  position: relative;
  height: 100%;
  display: flex;
  padding: 0 10px;
  background-color: #fff;
}
.nav_item {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 15px;
  font-size: 14px;
  user-select: none;
  &:hover {
    cursor: pointer;
    color: #ff44aa;
  }
}
.scaleBox {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  font-size: 13px;
  color: #606266;
}
</style>
  