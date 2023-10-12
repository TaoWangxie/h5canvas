<template>
  <div
    :class="{ active: isActive, hover: isHover }"
    class="grid_box"
    ref="gridRef"
    draggable="true"
    :data-index="grid.id"
    data-type="grid"
    :style="getGridStyle(grid)"
    @mousedown.stop="handleMouseDownOnGrid"
    @dragstart.stop="handleDragStart"
    @dragover.stop="handleDragOver"
    @drop.stop="handleDrop"
    @click="gridClick"
  >
    <component
      :style="getGridInnerStyle(grid)"
      :is="grid.comKey"
      :config="gridInnerData(grid.config)"
      :data="grid.data"
      data-type="grid"
    >
      <template v-if="grid.children && grid.children.length">
        <gridItem
          v-for="(item, index) in grid.children"
          :key="index"
          :grid="item"
          @gridClick="childrenGridClick"
        ></gridItem>
      </template>
    </component>
    <template v-if="isActive">
      <div
        v-for="(item, index) in pointList"
        :key="index"
        :class="['point', `point${item}`]"
        :style="{ cursor: cursors[item] }"
        @mousedown.stop="handleMouseDownOnPoint(item, $event)"
        @dblclick="handlePointDoubleclick(item, $event)"
      ></div>
    </template>
    <elementMask v-if="isActive" :grid="grid"></elementMask>
  </div>
</template>

<script setup lang="ts">
import _ from "lodash";
import { ref, computed, watch } from "vue";
import gridItem from "@/views/editor/components/gridItem/index.vue";
import elementMask from "@/views/editor/components/elementMask/index.vue";
import { removeNode, isOwnChildren } from "@/utils/index";
import { useSchemaStore } from "@/store/schema";
const useSchema = useSchemaStore();
interface Props {
  grid: any;
}
const props = withDefaults(defineProps<Props>(), {
  grid: () => [],
});

//特殊处理画布中组件外边距
let filterAttrs = ["marginTop", "marginRight", "marginBottom", "marginLeft"];
const gridInnerData = computed(() => {
  return (config: any) => {
    let data = _.cloneDeep(config);
    filterAttrs.map((attr) => {
      return (data.data[attr] = 0);
    });
    return data;
  };
});
//点击高亮
const isActive = computed(() => {
  return useSchema.currentGrid && props.grid.id === useSchema.currentGrid.id;
});
//悬浮高亮
const isHover = computed(() => {
  return (
    useSchema.enterTargetGrid && props.grid.id === useSchema.enterTargetGrid.id
  );
});
let gridRef: any = ref(null);
watch(
  () => useSchema.currentGrid?.config?.data?.flex,
  (val) => {
    if (val && val != "none") {
      useSchema.SET_SHAP_STYLE({
        width: "auto",
      });
    }
  }
);
watch(
  () => useSchema.currentGrid?.config?.data?.position,
  (val) => {
    if (val === "relative") {
      useSchema.SET_SHAP_STYLE({
        top: 0,
        left: 0,
      });
    } else {
      if (useSchema.currentGrid) {
        let { width, height } = useSchema.currentGrid.style;
        let W = typeof width === "string" || !width ? 200 : width;
        // let H = typeof height === "string" || !height ? 40 : height;
        // let W = width;
        let H = height;
        useSchema.SET_SHAP_STYLE({
          width: W,
          height: H,
        });
      }
    }
  }
);

const borderW = (num?: number) => {
  let count = num ? num : 1;
  return useSchema.broderNum * count;
};
//实时赋值样式
const outBox = [
  "position",
  "width",
  "height",
  "top",
  "left",
  "display",
  "flex",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
];
const getGridStyle = (grid) => {
  let { style, config } = grid;
  let { width, height, top, left } = style;
  const result: any = {
    width:
      typeof width == "number"
        ? width + borderW(2) + "px"
        : width.includes("%")
        ? width
        : "auto",
    height:
      typeof height == "number"
        ? height + borderW(2) + "px"
        : height.includes("%")
        ? height
        : "auto",
    top: top + "px",
    left: left + "px",
    borderWidth: useSchema.broderNum + "px",
  };
  outBox.map((attr) => {
    switch (typeof config?.data[attr]) {
      case "number":
        result[attr] = config?.data[attr] + "px";
        break;
      case "string":
        result[attr] = config?.data[attr];
        break;
      default:
        break;
    }
  });
  return result;
};
const getGridInnerStyle = (grid) => {
  let { width, height } = grid.style;
  const result: any = {
    position: "relative",
    width: typeof width == "number" ? width + "px" : "100%",
    height: typeof height == "number" ? height + "px" : "100%",
  };
  return result;
};
// 拖拽开始
const handleDragStart = (e) => {
  if (props.grid.config.data.position === "absolute") {
    e.preventDefault();
  }
  e.dataTransfer.setData("grid", JSON.stringify(useSchema.currentGrid));
};
// 拖拽中
const handleDragOver = (e) => {
  e.preventDefault();
  e.stopPropagation();
  useSchema.setData("enterTargetGrid", props.grid);
};
// 拖拽松开
const handleDrop = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const targetGrid = JSON.parse(e.dataTransfer.getData("grid"));
  if (!props.grid?.isSlot) return useSchema.setData("enterTargetGrid", null);
  if (targetGrid.id === props.grid.id)
    return useSchema.setData("enterTargetGrid", null);
  let isHas = isOwnChildren(targetGrid, props.grid.id);
  if (isHas) return useSchema.setData("enterTargetGrid", null);
  removeNode(useSchema.grids, targetGrid.id);
  if (useSchema.isShowPos) {
    targetGrid.config.data.position = useSchema.isPosition;
  }
  if (useSchema.isPosition === "absolute") {
    targetGrid.style.width = 200;
    let { top, left } = getPosStyle(e);
    targetGrid.style.top = top;
    targetGrid.style.left = left;
  }
  props.grid.children.push(targetGrid);
  useSchema.setData("currentGrid", targetGrid);
  useSchema.setData("enterTargetGrid", null);
  useSchema.setData("isPosition", "relative");
  useSchema.RECORD_SNAPSHOT();
};
const getPosStyle = (e) => {
  const gridInfo = gridRef.value.getBoundingClientRect();
  return {
    top: e.clientY - gridInfo.y - borderW() - 28,
    left: e.clientX - gridInfo.x - borderW() - 108,
  };
};
// 组件点击
let isMove = ref(false);
const handleMouseDownOnGrid = (e: any) => {
  //画布位置信息
  useSchema.HIDE_CONTEXT_MENU();
  useSchema.setData("currentGrid", props.grid);
  useSchema.setData("isPosition", props.grid.config.data.position);

  if (useSchema.currentGrid?.config.data.position === "absolute") {
    const startY = e.clientY;
    const startX = e.clientX;
    let { top, left, width, height } = props.grid.style;
    const startTop = Number(top);
    const startLeft = Number(left);
    const move = (moveEvent) => {
      isMove.value = true;
      const curX = moveEvent.clientX;
      const curY = moveEvent.clientY;
      top = Math.round(curY - startY + startTop);
      left = Math.round(curX - startX + startLeft);
      useSchema.SET_SHAP_STYLE({
        top,
        left,
      });
    };
    const up = () => {
      if (isMove.value) {
        useSchema.RECORD_SNAPSHOT();
      }
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
      isMove.value = false;
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  }
};
// 光标位置
let cursors = ref({
  b: "s-resize",
  l: "w-resize",
  lb: "sw-resize",
  lt: "nw-resize",
  r: "e-resize",
  rb: "se-resize",
  rt: "ne-resize",
  t: "n-resize",
});
// let pointList = ["lt", "t", "rt", "r", "rb", "b", "lb", "l"];
let pointList = ["r", "rb", "b"];
// point点击
const handleMouseDownOnPoint = (point: any, e: any) => {
  e.preventDefault();
  e.stopPropagation();
  let ev = e || window.event;
  let disX = ev.clientX; // 获取鼠标按下时光标x的值
  let disY = ev.clientY; // 获取鼠标按下时光标Y的值
  let disW = gridRef.value.offsetWidth; // 获取拖拽前div的宽
  let disH = gridRef.value.offsetHeight; // 获取拖拽前div的高
  const move = (moveEvent) => {
    isMove.value = true;
    let ev = moveEvent || window.event;
    let width = ev.clientX - disX + disW - borderW(2);
    let height = ev.clientY - disY + disH - borderW(2);
    let params = {};
    switch (point) {
      case "b":
        params = { height };
        break;
      case "r":
        params = { width };
        useSchema.setData("currentGrid", "none", "config.data.flex");
        break;
      default:
        params = { width, height };
        useSchema.setData("currentGrid", "none", "config.data.flex");
        break;
    }
    useSchema.SET_SHAP_STYLE(params);
  };
  const up = () => {
    if (isMove.value) {
      useSchema.RECORD_SNAPSHOT();
    }
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
    isMove.value = false;
  };
  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
};
// point双击 恢复样式自适应状态
const handlePointDoubleclick = (point: any, e: any) => {
  // if (useSchema.currentGrid?.config.data.position === "absolute") return;
  let params: any = {};
  let { height } = useSchema.currentGrid.style;
  switch (point) {
    case "b":
      params = { height: "auto" };
      break;
    case "r":
      params = { width: "auto" };
      break;
    default:
      params = { width: "auto", height: "auto" };
      break;
  }
  useSchema.SET_SHAP_STYLE(params);
  useSchema.RECORD_SNAPSHOT();
};
//=====================边距样式======================
const emits = defineEmits(["gridClick"]);
const childrenGridClick = (point) => {
  emits("gridClick", point);
};
const gridClick = (e) => {
  e.stopPropagation();
  let point = getGridPoint();
  emits("gridClick", point);
};
//获取当前组件位置信息点
const getGridPoint = () => {
  let {
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
  } = props.grid.config.data;
  const canvasInfo = (
    document.getElementById("canvas") as any
  ).getBoundingClientRect();
  const gridInfo = gridRef.value.getBoundingClientRect();
  let pointLT = { x: gridInfo.x - canvasInfo.x, y: gridInfo.y - canvasInfo.y };
  let pointRT = { x: pointLT.x + gridInfo.width, y: pointLT.y };
  let pointLB = { x: pointLT.x, y: pointLT.y + gridInfo.height };
  let pointRB = { x: pointRT.x, y: pointLB.y };
  let marginPoint = {
    out: [
      {
        x: pointLT.x - marginLeft,
        y: pointLT.y - marginTop,
      },
      {
        x: pointRT.x - marginRight,
        y: pointRT.y - marginTop,
      },
      {
        x: pointRB.x + marginRight,
        y: pointRB.y + marginBottom,
      },
      {
        x: pointLB.x - marginLeft,
        y: pointLB.y + marginBottom,
      },
    ],
    inner: [pointLT, pointRT, pointRB, pointLB],
  };
  return marginPoint;
};
</script>

<style lang="scss" scoped>
.grid_box {
  position: relative;
  border-style: solid;
  border-color: #d4d7de;
  // border: 4px solid #d4d7de;
  // padding: 4px;
  box-sizing: border-box;
  background-color: #f5f7fa;
}
.active {
  border-color: #ff44aa;
  .point {
    position: absolute;
    height: 8px;
    width: 8px;
    background-color: #00dd00;
    z-index: 1;
  }
  .pointlt {
    top: -6px;
    left: -6px;
  }
  .pointt {
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
  }
  .pointrt {
    top: -6px;
    right: -6px;
  }
  .pointr {
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
  }
  .pointrb {
    bottom: -6px;
    right: -6px;
  }
  .pointb {
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
  }
  .pointlb {
    bottom: -6px;
    left: -6px;
  }
  .pointl {
    left: -6px;
    top: 50%;
    transform: translateY(-50%);
  }
}
.hover {
  border-color: #00ddaa !important;
}
</style>
