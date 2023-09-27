<template>
  <div class="sideSet">
    <div
      v-for="(item, index) in list"
      :key="index"
      :class="['sideSet-tab', active(item.key) ? 'active' : '']"
      @click="changeTab(item.key)"
    >
      <svgIcon
        :name="item.icon"
        :color="active(item.key) ? '#ffffff' : '#000000'"
        :size="18"
      ></svgIcon>
    </div>
  </div>
</template>

<script setup lang='ts'>
import svgIcon from "@/icons/svgIcon.vue";
import { ref, computed } from "vue";

interface Props {
  tabKey: string;
  list: any[];
}
const props = withDefaults(defineProps<Props>(), {
  tabKey: "",
  list: () => [],
});

const active = computed(() => {
  return (key: any) => {
    return props.tabKey == key;
  };
});

const emits = defineEmits(["changeTab"]);
const changeTab = (type: any) => {
  emits("changeTab", type);
};
</script>
<style lang="scss" scoped>
.sideSet {
  position: relative;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #f1e8e8;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  .sideSet-tab {
    width: 40px;
    height: 100%;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      cursor: pointer;
      color: #409eff;
    }
    &:active {
      background-color: #f6f7ff;
    }
  }
  .active {
    color: #fff !important;
    background-color: #ff44aa;
  }
  .sideSet-refresh {
    display: flex;
    position: absolute;
    top: 50%;
    right: 5px;
    height: 100%;
    align-items: center;
    transform: translateY(-50%);
    font-size: 18px;

    .left-icon-tab {
      width: 28px;
      height: 28px;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .active-ic {
      color: #fff !important;
      background-color: #409eff;
    }
    .refreshIcon {
      &:hover {
        cursor: pointer;
        color: #409eff;
      }
    }
  }
}
</style>
