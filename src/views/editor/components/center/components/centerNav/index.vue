<template>
  <div class="nav_container">
    <div class="content">
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
  <previewPage v-model:visible="previewVisible" title="预览"> </previewPage>
</template>

<script setup lang='ts'>
import { ref, getCurrentInstance } from "vue";
import previewPage from "@/views/editor/components/preview/index.vue";
//store管理
import { useSchemaStore } from "@/store/schema";
const useSchema = useSchemaStore();
const btnList: any[] = [
  {
    id: "0",
    name: "撤销",
  },
  {
    id: "1",
    name: "重做",
  },
  {
    id: "2",
    name: "预览",
  },
];
const btnClick = (data: any) => {
  switch (data.id) {
    case "0":
      useSchema.UNDO();
      break;
    case "1":
      useSchema.REDO();
      break;
    case "2":
      preview();
      break;
    default:
      break;
  }
};

let previewVisible: any = ref(false);
const preview = () => {
  previewVisible.value = true;
};
</script>

<style lang="scss" scoped>
.nav_container {
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  border-bottom: 1px solid #ebeef5;
}
.content {
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 0 20px;
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
