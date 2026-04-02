import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user", // id必填，且需要唯一1。
  state: () => {
    return {
      name: "张三",
    };
  },
  actions: {
    updateName(name: string) {
      this.name = name;
    },
  },
});
