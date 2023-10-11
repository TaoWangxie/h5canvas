<template>
  <el-drawer
    :model-value="visible"
    direction="rtl"
    append-to-body
    size="70%"
    :before-close="handleClose"
  >
    <template #header> <div>预览</div> </template>
    <template #default>
      <div class="btnBox">
        <buttonBox
          :btn-list="btnList"
          direction="end"
          @btnClick="btnClick"
        ></buttonBox>
      </div>
      <div class="drawer_container">
        <div class="left">
          <div class="page_box">
            <commonGrid :grids="useSchema.grids"></commonGrid>
          </div>
        </div>
        <div class="right">
          <div class="title">组件配置</div>
          <ComAttr :configInfo="comConfig" :isCheckbox="false"></ComAttr>
          <div class="title">属性配置</div>
          <ComAttr
            :configInfo="useSchema.cmsData"
            :isCheckbox="false"
            :isNewProp="true"
          ></ComAttr>
        </div>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import _ from "lodash";
import { ref, watch, provide } from "vue";
import ComAttr from "../right/components/comAttr/index.vue";
import commonGrid from "./commonGrid.vue";
import buttonBox from "./buttonBox.vue";
//store管理
import { useSchemaStore } from "@/store/schema";
const useSchema = useSchemaStore();
//props
interface Props {
  visible: boolean;
  title?: string;
}
const props = withDefaults(defineProps<Props>(), {
  visible: false,
  title: "页面代码",
});

const btnList = [
  {
    id: "save",
    name: "保存",
  },
];

let comConfig = ref({
  data: {
    index: 0,
    name: "",
    thumbnail: "",
  },
  fieldList: [
    {
      isCms: false,
      label: "组件key",
      newProp: "",
      prop: "name",
      type: "input",
    },
    {
      isCms: false,
      label: "组件名称",
      newProp: "",
      prop: "thumbnail",
      type: "input",
    },
    {
      isCms: false,
      label: "下标",
      newProp: "",
      prop: "index",
      type: "inputNumber",
    },
  ],
});

let dataInfo: any = ref({});
const handleData = () => {
  dataInfo.value = {
    data: {},
    fieldList: [],
    listTypeInfo: {},
  };
  getCmsFn(useSchema.grids);
  useSchema.setData("cmsData", dataInfo.value);
};
const getCmsFn = (trees: any) => {
  let arr = _.cloneDeep(trees);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].config?.fieldList?.length) {
      handleFieldList(arr[i], arr[i].config?.fieldList);
    }
    if (arr[i].children) {
      getCmsFn(arr[i].children);
    }
  }
};
const handleFieldList = (data: any, arr: any) => {
  arr?.map((item) => {
    let prop = _.cloneDeep(item).prop;
    let list = _.cloneDeep(item).list;
    if (item.isCms) {
      if (!item.children) {
        item.newProp = item.prop;
        item.prop = item.prop + "_" + data.id;
        dataInfo.value.data[item.prop] = data.config.data[prop];
        if (item.list) {
          item.list = item.list + "_" + data.id;
          dataInfo.value.listTypeInfo[item.list] =
            data.config.listTypeInfo[list];
        }
        dataInfo.value.fieldList.push(item);
      } else {
        handleFieldList(data, item.children);
      }
    }
  });
};

const btnClick = (val: any) => {
  switch (val.id) {
    case "save":
      saveFn();
      break;
    case "":
      break;
    default:
      break;
  }
};

const typeMap = {
  input: "input",
  radio: "radio",
  select: "select",
  inputNumber: "inputNumber",
  color: "color",
  img: "upload",
};
const saveFn = () => {
  console.log(useSchema.grids);
  console.log(useSchema.cmsData);
  let com = {
    index: comConfig.value.data.index,
    name: comConfig.value.data.name,
    thumbnail: {
      iconUrl: "&#xe6b5;",
      text: comConfig.value.data.thumbnail,
    },
    props: {},
    config: {},
    template: [],
  };
  useSchema.cmsData.fieldList.map((item: any) => {
    com.props[item.newProp] = useSchema.cmsData.data[item.prop];
    let configItem = {
      name: item.label,
      type: typeMap[item.type],
    };
    if (item.list) {
      configItem.dicData = useSchema.cmsData.listTypeInfo[item.list];
    }
    com.config[item.newProp] = configItem;
  });
  console.log(com);
};

const emits = defineEmits(["update:visible"]);
watch(
  () => props.visible,
  (val: boolean) => {
    if (val) {
      handleData();
    } else {
      useSchema.setData("cmsData", null);
    }
  }
);

//关闭弹窗
const handleClose = () => {
  emits("update:visible", false);
};
</script>

<style>
.el-drawer__header {
  margin-bottom: 10px;
  padding-top: 10px;
}
.el-drawer__body {
  background-color: #eee;
  padding: 0;
}
</style>
<style lang="scss" scoped>
.btnBox {
  height: 40px;
  border-top: 1px solid #ebeef5;
  box-sizing: border-box;
  background-color: #fff;
}
.drawer_container {
  display: flex;
  height: calc(100% - 40px);
  border: 1px solid #ebeef5;
}
.left {
  flex: 1;
  width: 0;
  height: 100%;
  padding: 30px 0;
  box-sizing: border-box;
  overflow-y: auto;
  background-color: #fafcff;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #a8abb2;
    border-radius: 3px;
  }
  .page_box {
    width: 300px;
    box-shadow: 0 0px 12px #a8abb2;
    box-sizing: border-box;
    margin: 0 auto;
  }
}
.right {
  width: 420px;
  height: 100%;
  flex-shrink: 0;
  background-color: #fff;
  border-left: 1px solid #ebeef5;
  .title {
    position: relative;
    display: flex;
    align-items: center;
    padding: 10px;
    font-size: 14px;
    border-bottom: 1px solid #ebeef5;
  }
}
</style>
