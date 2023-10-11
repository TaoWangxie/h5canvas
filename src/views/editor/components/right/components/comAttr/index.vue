<template>
  <div class="comAttr" v-if="configInfo">
    <div
      class="attr_line flex"
      v-for="(item, index) in configInfo?.fieldList"
      :key="index"
    >
      <div v-if="isCheckbox" class="checkbox">
        <el-checkbox v-model="item.isCms"></el-checkbox>
      </div>
      <div :class="['attr_item', item.type == 'list' ? '' : 'flex']">
        <div
          class="attr_label"
          :style="{ marginBottom: item.type == 'list' ? '10px' : 0 }"
        >
          {{ item.label }}
        </div>
        <div v-if="item.type === 'array'" class="atrr_inline_box">
          <div
            v-for="(it, i) in item.children"
            :key="i"
            class="atrr_inline_item"
            :style="{ width: it.width, flex: it.width ? 'none' : '' }"
          >
            <AttrItem
              :configInfo="configInfo"
              :data="configInfo.data"
              :field="it"
            ></AttrItem>
          </div>
        </div>
        <div v-else-if="item.type === 'object'" class="atrr_child_box">
          <div
            v-for="(it, i) in item.children"
            :key="i"
            class="atrr_downLine_item"
          >
            <div class="attr_label">{{ it.label }}</div>
            <div class="atrr_value">
              <AttrItem
                :configInfo="configInfo"
                :data="configInfo.data[item.prop]"
                :field="it"
              ></AttrItem>
            </div>
          </div>
        </div>
        <div
          v-else
          class="atrr_value"
          :style="{ width: item.type == 'list' ? '100%' : 0 }"
        >
          <AttrItem
            :configInfo="configInfo"
            :data="configInfo.data"
            :field="item"
          ></AttrItem>
        </div>
      </div>
      <div v-if="isNewProp" class="newProp">
        <el-input v-model="item.newProp" style="flex: 1" clearable />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from "lodash";
import { ref } from "vue";
import AttrItem from "./attrItem/index.vue";

interface Props {
  configInfo: any;
  isCheckbox: boolean;
  isNewProp: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  configInfo: () => {},
  isCheckbox: true,
  isNewProp: false,
});
</script>
<style lang="scss" scoped>
.comAttr {
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  background-color: #f2f6fc;
  .attr_line_title {
    padding-bottom: 10px;
    font-size: 13px;
  }
  .attr_line {
    margin-bottom: 15px;
    box-sizing: border-box;
    &:last-child {
      margin-bottom: 0;
    }
    .checkbox {
      height: 100%;
      padding-right: 10px;
    }
    .newProp {
      width: 150px;
      padding-left: 10px;
    }
    .attr_item {
      align-items: center;
      box-sizing: border-box;
      flex: 1;
      font-size: 13px;
      overflow: hidden;
      .attr_label {
        display: inline-block;
        width: 70px;
      }
      .atrr_value {
        flex: 1;
        width: 0;
      }
    }
  }
  .atrr_inline_box {
    display: flex;
    flex: 1;
  }
  .atrr_inline_item {
    flex: 1;
    margin-right: 5px;
    &:last-child {
      margin-right: 0;
    }
  }
  .atrr_child_box {
    width: 100%;
    border: 1px solid #ebeef5;
    box-sizing: border-box;
    background-color: #fff;
    padding: 10px;
  }
  .atrr_downLine_item {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
.flex {
  display: flex;
}
</style>
