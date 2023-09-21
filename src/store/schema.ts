import { defineStore } from "pinia";
import { hasOwn, removeNode } from "@/utils/index";

export const useSchemaStore = defineStore({
  id: "creataLayout", // id必填，且需要唯一
  state: () => {
    return {
      canvasEPos: null as any, //鼠标相对于编辑器的位置
      canvasW: 300, //画布宽
      canvasH: 600, //画布高

      grids: [] as any, //画布所有组件
      currentGrid: null as any, //当前组件
      currentGridIndex: null, //当前组件下标
      enterTargetGrid: null as any, //鼠标划入目标元素

      menuShow: false, //右键菜单显隐
      menuTop: 0 as number, //右键菜单位置
      menuLeft: 0 as number, //右键菜单位置
      contextmenuType: "grid",

      cmsData: null as any,

      isShowPos: false as boolean,
      isPosition: "relative" as string,
    };
  },
  actions: {
    setData(key: string, val: any, property?: string) {
      if (property) {
        let target: any = setVal(this[key], property);
        if (target) {
          target[0][target[1]] = val;
        } else {
          console.log("不存在属性");
        }
      } else {
        this[key] = val;
      }
    },
    addList(key: string, val: any, property?: string) {
      if (property) {
        let target: any = setVal(this[key], property);
        if (target) {
          target[0][target[1]].push(val);
        } else {
          console.log("不存在属性");
        }
      } else {
        this[key].push(val);
      }
    },
    deleteList(key: string, index: any, property?: string) {
      if (property) {
        let target: any = setVal(this[key], property);
        if (target) {
          target[0][target[1]].splice(index, 1);
        } else {
          console.log("不存在属性");
        }
      } else {
        this[key].splice(index, 1);
      }
    },
    SET_SHAP_STYLE(payload: any) {
      let { top, left, width, height, rotate } = payload;
      let grid = this.currentGrid;
      if (grid) {
        if (top || top == 0) grid.style.top = top;
        if (left || left == 0) grid.style.left = left;
        if (width) grid.style.width = width;
        if (height) grid.style.height = height;
        if (rotate) grid.style.rotate = rotate;
      }
    },
    //显示menu
    SHOW_CONTEXT_MENU(payload: { top; left }) {
      this.menuTop = payload.top;
      this.menuLeft = payload.left;
      this.menuShow = true;
    },
    //隐藏menu
    HIDE_CONTEXT_MENU() {
      this.menuShow = false;
    },
    //删除组件
    delete() {
      removeNode(this.grids, this.currentGrid.id);
      this.currentGrid = null;
    },
    //锁定
    lock() {
      this.currentGrid.isLock = true;
    },
    //解锁
    unlock() {
      this.currentGrid.isLock = false;
    },
  },
});

const setVal = (state: any, property: string) => {
  if (property.includes(".")) {
    let arr = property.split(".");
    let target = state;
    for (let index = 0; index < arr.length - 1; index++) {
      if (hasOwn(target, arr[index])) {
        target = target[arr[index]];
      } else {
        return null;
      }
    }
    if (hasOwn(target, arr[arr.length - 1])) {
      return [target, arr[arr.length - 1]];
    } else {
      return null;
    }
  } else {
    if (hasOwn(state, property)) {
      return [state, property];
    } else {
      return null;
    }
  }
};
