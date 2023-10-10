<template>
  <div class="nav_container">
    <div class="content">
      <div class="nav_action_box">
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
      <div class="border_w_box">
        <el-input-number
          v-model="num"
          :min="0"
          :max="4"
          size="small"
          @change="handleChange"
        />
      </div>
    </div>
  </div>
  <previewPage v-model:visible="previewVisible" title="预览"> </previewPage>
</template>

<script setup lang="ts">
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
let num: any = ref(useSchema.broderNum);
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

const handleChange = (val: any) => {
  console.log(val);
  useSchema.setData("broderNum", val);
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
  justify-content: space-between;
  // padding: 0 20px;
  background-color: #fff;
  .nav_action_box {
    display: flex;
    padding: 0 15px;
  }
  .border_w_box {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 15px;
    border-left: 1px solid #eee;
  }
}
.nav_item {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 15px;
  font-size: 13px;
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
