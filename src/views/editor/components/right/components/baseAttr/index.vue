<template>
  <div class="baseAttr">
    <div class="attr_line flex">
      <div class="attr_item">
        <span class="attr_label_inline">宽：</span>
        <template v-if="typeOfNumber(useSchema.currentGrid.style.width)">
          <el-input-number
            v-model="useSchema.currentGrid.style.width"
            :min="0"
            :step="1"
            step-strictly
            :disabled="useSchema.currentGrid.isLock"
            controls-position="right"
            @change="
              (currentValue, oldValue) => {
                handleChange(currentValue, oldValue, 'width');
              }
            "
          />
        </template>
        <template v-else>
          <el-input
            v-model="useSchema.currentGrid.style.width"
            style="flex: 1"
            clearable
          />
        </template>
      </div>
      <div class="attr_item">
        <span class="attr_label_inline">高：</span>
        <template v-if="typeOfNumber(useSchema.currentGrid.style.height)">
          <el-input-number
            v-model="useSchema.currentGrid.style.height"
            :min="0"
            :step="1"
            step-strictly
            :disabled="useSchema.currentGrid.isLock"
            controls-position="right"
            @change="
              (currentValue, oldValue) => {
                handleChange(currentValue, oldValue, 'height');
              }
            "
          />
        </template>
        <template v-else>
          <el-input
            v-model="useSchema.currentGrid.style.height"
            style="flex: 1"
            clearable
          />
        </template>
      </div>
    </div>
    <div class="attr_line flex">
      <div class="attr_item">
        <span class="attr_label_inline">X：</span>
        <el-input-number
          v-model="useSchema.currentGrid.style.left"
          :step="1"
          step-strictly
          :disabled="useSchema.currentGrid.isLock || isPosR"
          controls-position="right"
          @change="
            (currentValue, oldValue) => {
              handleChange(currentValue, oldValue, 'left');
            }
          "
        />
      </div>
      <div class="attr_item">
        <span class="attr_label_inline">Y：</span>
        <el-input-number
          v-model="useSchema.currentGrid.style.top"
          :step="1"
          step-strictly
          :disabled="useSchema.currentGrid.isLock || isPosR"
          controls-position="right"
          @change="
            (currentValue, oldValue) => {
              handleChange(currentValue, oldValue, 'top');
            }
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import _ from "lodash";
import { ref, getCurrentInstance, watch, computed } from "vue";
//store管理
import { useSchemaStore } from "@/store/schema";
const useSchema = useSchemaStore();

const { proxy } = getCurrentInstance() as any;

interface Props {
  tabKey: string;
  list: any[];
}
const props = withDefaults(defineProps<Props>(), {
  tabKey: "",
  list: () => [],
});

const typeOfNumber = computed(() => {
  return (val: any) => typeof val === "number";
});

const isPosR = computed(() => {
  return useSchema.currentGrid?.config.data.position === "relative";
});

const handleChange = (currentValue: any, oldValue: any, type?: string) => {
  useSchema.RECORD_SNAPSHOT();
};
</script>
<style lang="scss" scoped>
.baseAttr {
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  background-color: #f2f6fc;
  .flex {
    display: flex;
  }
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
    .attr_item {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      flex: 1;
      margin-right: 6%;
      font-size: 13px;
      .attr_label {
        display: inline-block;
        width: 120px;
      }
      .attr_label_inline {
        display: inline-block;
        width: 50px;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
<style  lang="scss">
.baseAttr {
  .el-input-number {
    width: auto;
    flex: 1;
  }
  .el-input-number.is-controls-right .el-input__wrapper {
    padding-left: 4px !important;
    padding-right: 25px !important;
  }
  .el-input-number.is-controls-right .el-input-number__decrease {
    width: 20px;
  }
  .el-input-number.is-controls-right .el-input-number__increase {
    width: 20px;
  }
}
</style>