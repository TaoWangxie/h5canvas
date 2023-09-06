<template>
  <div
    class="contextmenu"
    id="contextmenu"
    v-show="useSchema.menuShow"
    :style="{ top: useSchema.menuTop + 'px', left: useSchema.menuLeft + 'px' }"
  >
    <ul @mouseup="handleMouseUp">
      <template v-if="useSchema.contextmenuType === 'grid'">
        <template v-if="useSchema.currentGrid">
          <template v-for="(item, index) in menuList" :key="index">
            <li
              :hidden="item.key == 'relieve' && !useSchema.currentGrid.parentId"
              @click="menuClick(item.key)"
            >
              <el-button :disabled="isLock(item)" :type="item.type" link>{{
                item.label
              }}</el-button>
            </li>
          </template>
        </template>
      </template>
      <template v-if="useSchema.contextmenuType === 'canvas'">
        <li @click="menuClick('paste')">粘贴</li>
      </template>
    </ul>
  </div>
</template>

<script lang='ts' setup>
import { ref, reactive, computed, onMounted } from "vue";
import { monitorSelfClick } from "@/utils/index";
import { useSchemaStore } from "@/store/schema";
const useSchema = useSchemaStore();

const isLock = computed(() => {
  return (val) => {
    return (
      (val.key == "unlock" && !useSchema.currentGrid.isLock) ||
      (useSchema.currentGrid.isLock && val.key == "lock")
    );
  };
});

//menu配置列表
const menuList = ref([
  {
    key: "lock",
    label: "锁定",
    icon: "lock",
    type: "",
  },
  {
    key: "unlock",
    label: "解锁",
    icon: "unlock",
    type: "",
  },
  {
    key: "delete",
    label: "删除",
    icon: "delete",
    type: "danger",
  },
  {
    key: "copy",
    label: "复制",
    icon: "copy",
    type: "",
  },
]);

monitorSelfClick("contextmenu", async () => {
  useSchema.HIDE_CONTEXT_MENU();
});

//菜单点击menu22
const menuClick = (val) => {
  let arr = ["lock", "unlock", "cut", "copy"];
  switch (val) {
    case "paste":
      useSchema.setData(val, { isMouse: true });
      break;
    case "pasteTop":
      useSchema.setData("paste", { isMouse: true, isTop: true });
      break;
    default:
      useSchema[val]();
      break;
  }
  // !arr.includes(val) && store.commit("editor/RECORD_SNAPSHOT");
};
//鼠标抬起 冒泡
const handleMouseUp = () => {
  useSchema.HIDE_CONTEXT_MENU();
};
</script>

<style lang="scss" scoped>
.contextmenu {
  position: absolute;
  z-index: 1000;

  ul {
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    margin: 5px 0;
    padding: 6px 0;

    li {
      font-size: 14px;
      padding: 0 20px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #606266;
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      cursor: pointer;

      &:hover {
        background-color: #f5f7fa;
      }
      .iconsvg {
        margin-right: 10px;
      }
    }
  }
}
</style>