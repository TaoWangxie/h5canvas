<template>
  <div class="right">
    <Drawer :posLeft="false" :dragW="380">
      <div class="right_container">
        <Tab :list="tabList" :tabKey="configTab" @changeTab="changeTab"></Tab>
        <div class="right_content">
          <template v-if="useSchema.currentGrid">
            <div class="title">基础属性</div>
            <BaseAttr></BaseAttr>
            <!-- <div v-if="currentGrid.data" class="title">数据配置</div>
            <ComAttr :configInfo="currentGrid.data"></ComAttr> -->
            <div class="title">
              页面配置
              <el-tooltip
                class="box-item"
                effect="dark"
                content="选择框选中可作为cms配置数据"
                placement="top"
              >
                <el-icon style="margin-left: 2px" :size="16"
                  ><Warning />
                </el-icon>
              </el-tooltip>
              <div
                v-if="
                  useSchema.currentGrid.config.aceCode ||
                  useSchema.currentGrid.config.aceCode === ''
                "
                class="icon_box"
              >
                <el-icon :size="16">
                  <Operation />
                </el-icon>
                <el-switch
                  v-model="isAce"
                  class="mt-2"
                  style="margin-left: 8px"
                  inline-prompt
                  :active-icon="Check"
                  :inactive-icon="Close"
                  @change="switchChange"
                />
              </div>
            </div>
            <div v-if="isAce" class="ace_box">
              <AceEditor
                :visible="isAce"
                :code="useSchema.currentGrid.config.aceCode"
                @updateCode="updateCode"
              ></AceEditor>
            </div>
            <ComAttr
              v-else
              :configInfo="useSchema.currentGrid.config"
            ></ComAttr>
          </template>
          <template v-else> </template>
        </div>
      </div>
    </Drawer>
  </div>
</template>

<script setup lang='ts'>
import _ from "lodash";
import { ref, watch } from "vue";
import {
  Setting,
  Check,
  Close,
  Operation,
  Warning,
} from "@element-plus/icons-vue";
import Drawer from "@/components/Drawer/index.vue";
import Tab from "@/components/Tab/index.vue";
import BaseAttr from "./components/baseAttr/index.vue";
import ComAttr from "./components/comAttr/index.vue";
import AceEditor from "./components/aceEditor/index.vue";
//store管理
import { useSchemaStore } from "@/store/schema";
const useSchema = useSchemaStore();
let configTab = ref("comConfig");
const tabList = [
  {
    key: "comConfig",
    icon: Setting,
  },
];

const changeTab = (val: any) => {
  configTab.value = val;
};

//是否有ace代码配置
let isAce = ref(false);
let oldConfigData = ref(null);
const updateCode = (code: any) => {
  try {
    let obj = eval("(" + code + ")");
    if (typeof obj == "function") {
      obj = obj();
    }
    useSchema.setData("currentGrid", code, "config.aceCode");
    oldConfigData.value = _.cloneDeep(useSchema.currentGrid.config.data);
    useSchema.setData("currentGrid", obj, "config.data");
  } catch (error) {
    // proxy.$message({
    //   message: "代码配置格式不符合，请确保代码符合对象结构",
    //   type: "error",
    // });
  }
};

//切换到配置 还原数据
const switchChange = (val) => {
  if (!val && oldConfigData.value)
    useSchema.setData("currentGrid", oldConfigData.value, "config.data");
};
//初始化data
watch(
  () => useSchema.currentGrid,
  (val) => {
    oldConfigData.value = _.cloneDeep(useSchema.currentGrid?.config?.data);
    isAce.value = false;
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.right {
  display: flex;
  position: relative;
  height: 100%;
}
.right_container {
  width: 100%;
  height: 100%;
  border-left: 1px solid #ebeef5;
  box-sizing: border-box;
}
.right_content {
  overflow-y: auto;
  height: calc(100% - 50px);
  border-bottom: 1px solid #ebeef5;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d4d7de;
    border-radius: 3px;
  }
}
.title {
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 14px;
  border-top: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  &:first-child {
    border-top: 0;
  }
  .icon_box {
    display: flex;
    align-items: center;
    height: 20px;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: #606266;
  }
}
.noData {
  padding: 40px;
  text-align: center;
  font-size: 14px;
  color: #909399;
}
.ace_box {
  width: 100%;
  height: 500px;
  padding: 15px;
  box-sizing: border-box;
  background-color: #fafcff;
}
</style>