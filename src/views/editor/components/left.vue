<template>
  <div class="left_container">
    <div class="left_content">
      <Tab :list="tabList" :tabKey="configTab" @changeTab="changeTab"></Tab>
      <div
        class="gridTag_box"
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
      >
        <div
          class="gridTag_Item"
          v-for="(item, index) in gridTags"
          :key="index"
        >
          <div class="mask" draggable="true" :data-index="index"></div>
          <div class="imgBox">
            <img :src="item.src" alt="" />
          </div>
          <div class="textBox">
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang='ts'>
import _ from "lodash";
import { ref } from "vue";
import { Coin, Setting } from "@element-plus/icons-vue";
import { generateID } from "@/utils/generateID";
import { gridTags } from "@/views/editor/config";
import { useSchemaStore } from "@/store/schema";
const useSchema = useSchemaStore();

let configTab = ref("comConfig");

const tabList = [
  {
    key: "comConfig",
    icon: Setting,
  },
  {
    key: "pageConfig",
    icon: Coin,
  },
];

const changeTab = (val: any) => {
  configTab.value = val;
};

let gridLen = ref(0);
const handleDragStart = (e: any) => {
  gridLen.value = useSchema.grids.length;
  let gridData: any = gridTags[e.target.dataset.index];
  let { width, height, top, left } = gridData.style;
  let grid = {
    id: generateID(),
    comKey: gridData.comKey,
    isLock: false, //是否已锁定
    isPosa: false, // 是否绝对定位
    isSlot: gridData.isSlot, //是否已锁定
    children: [], //子集id集合
    style: {
      width,
      height,
      top,
      left,
    },
    config: _.cloneDeep(gridData.config), //页面配置
    data: _.cloneDeep(gridData.dataSource), //数据来源
  };
  e.dataTransfer.setData("grid", JSON.stringify(grid));
  useSchema.setData("isShowPos", true);
  useSchema.setData("isPosition", "relative");
};
const handleDragEnd = () => {
  if (gridLen.value === useSchema.grids.length) {
    useSchema.setData("isPosition", "relative");
    useSchema.setData("isShowPos", false);
  }
};
</script>
  
<style lang="scss" scoped>
.left_container {
  width: 240px;
  height: 100%;
  z-index: 1;
  flex-shrink: 0;
}
.left_content {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  border-right: 1px solid #e4e7ed;
  .gridTag_box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    height: auto;
    padding: 5%;
    background-color: #f2f6fc;
  }
  .gridTag_Item {
    // display: flex;
    position: relative;
    flex: 0 0 45%;
    // height: 80px;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 4px;
    margin-right: calc(10%);
    margin-bottom: 15px;
    &:nth-child(2n) {
      margin-right: 0;
    }
    &:last-child {
      margin-right: auto;
    }
    .imgBox {
      width: 100%;
      height: 50px;
      padding: 10px 0;
      background-color: #ebeef5;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        display: inline-block;
        max-width: 100%;
        max-height: 100%;
      }
    }
    .textBox {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 30px;
      font-size: 12px;
    }
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
  