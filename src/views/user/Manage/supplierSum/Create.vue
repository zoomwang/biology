<script setup>
import { ref, reactive, onMounted, onUpdated } from "vue";
// import { addSupplier } from "../../../../services/supplier";
const props = defineProps(["detail", "successCallBack", "isCreate"]);
import { message } from "ant-design-vue";
import {
  supplierList,
  supplierItemList,
  supplierPersonList,
  supplierItemDetailAdd
} from "../../../../services/supplier";
const formRef = ref();
const labelCol = { span: 4 };
const wrapperCol = { span: 24 };
const data = ref([]);
const data1 = ref([]);
const formState = reactive({
  id: "",
  // itemname: "",
  itemValues: 0,
});
const rules = {
  supplierItemId: [
    { required: true, message: "请输入供应商姓名", trigger: "change" },
  ],
  supplierId: [
    { required: true, message: "请输入测试项目名称", trigger: "change" },
  ],
  deviceNum: [
    { required: true, message: "请输入设备数量", trigger: "change" },
  ],
  deviceType: [
    { required: true, message: "请输入设备类型", trigger: "change" },
  ],
  costprice: [
    { required: true, message: "请输入成本价", trigger: "change" },
  ],
  maxWeekSampleCapacity: [
    { required: true, message: "请输入截止周容量", trigger: "change" },
  ],
};
async function fake() {
  const data2 = [];
  const res = await supplierPersonList({
    pageSize: 999,
    curPage: 1,
    param: {
      itemname: "",
    },
  });
  if (res?.code == 0) {
    Array.isArray(res?.data.list) &&
      res?.data.list.forEach((item) => {
        data2.push({
          label: item.supplierName,
          value: item.id,
        });
      });
    data.value = data2;
    // callback(data);
  }
  const data3 = [];
  const res1 = await supplierItemList({
    pageSize: 999,
    curPage: 1,
    param: {
      // itemname: "",
    },
  });
  if (res1?.code == 0) {
    Array.isArray(res1?.data.list) &&
      res1?.data.list.forEach((item) => {
        data3.push({
          label: item.itemname,
          value: item.id,
        });
      });
    data1.value = data3;
    // callback(data);
  }
}
const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      try {
        const res = await supplierItemDetailAdd(formState);
        if (res?.code == 0) {
          message.success("新建成功");
          props.successCallBack();
        }
      } catch (err) {
        debugger;
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
};

const filterOption = (inputValue, option) => {
  return option.label.includes(inputValue);
};

onMounted(() => {
  fake();
});
</script>

<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item ref="name" label="供应商姓名" name="supplierId">
      <a-select
        show-search
        :filterOption="filterOption"
        :default-active-first-option="false"
        :options="data"
        v-model:value="formState.supplierId"
      />
    </a-form-item>
    <a-form-item ref="name" label="测试项目" name="supplierItemId">
      <a-select
        show-search
        :filterOption="filterOption"
        :default-active-first-option="false"
        :options="data1"
        v-model:value="formState.supplierItemId"
      />
    </a-form-item>
    <a-form-item ref="deviceType" label="设备类型" name="deviceType">
      <a-input v-model:value="formState.deviceType" />
    </a-form-item>
    <a-form-item ref="deviceNum" label="设备数量" name="deviceNum">
      <a-input v-model:value="formState.deviceNum" />
    </a-form-item>
    <a-form-item ref="costprice" label="成本价" name="costprice">
      <a-input v-model:value="formState.costprice" />
    </a-form-item>
    <a-form-item ref="maxWeekSampleCapacity" label="截止周容量" name="maxWeekSampleCapacity">
      <a-input v-model:value="formState.maxWeekSampleCapacity" />
    </a-form-item>
    <a-form-item ref="remark" label="备注" name="remark">
      <a-input v-model:value="formState.remark" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">提交</a-button>
    </a-form-item>
  </a-form>
</template>
<style lang="scss" scoped>
.pay-wrap {
  flex-direction: column;
  text-align: center;
  p {
    padding-left: 20px;
    text-align: left;
  }
}
#cmbPayDialog {
  height: 400px;
}
#cmbPayDialog .unionPayMoney {
  font-size: 14px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
  line-height: 20px;
  // position: absolute;
  // top: 82px;
  text-align: center;
  width: 100%;
  span {
    color: red;
    font-size: 22px;
  }
}
#cmbPayDialog #cmbPayDialog_img {
  display: block;
  width: 180px;
  height: 180px;
  margin: 0 auto;
  // position: absolute;
  // top: 118px;
  // left: 106px;
}
#cmbPayDialog .cmbPayDialog_img_smegma_refresh {
  cursor: pointer;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  line-height: 20px;
  // position: absolute;
  // top: 296px;
  // left: 138px;
}
#cmbPayDialog .crmbpay_tips {
  margin: 20px 0;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  line-height: 20px;
  // position: absolute;
  // top: 328px;
  text-align: center;
  width: 100%;
}
#cmbPayDialog .crmbpay_tips_img_box {
  margin-bottom: 32px;
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 105px;
  justify-content: flex-start;
  // position: absolute;
  // top: 362px;
}
#cmbPayDialog .cmbPayDialog_img_smegma_refresh_icon {
  width: 14px;
  height: 14px;
  margin: -2px 3px 0 0;
}

#cmbPayDialog .ali_icon {
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
}

#cmbPayDialog .wx_icon {
  width: 27px;
  height: 24px;
  margin-left: 28px;
  margin-bottom: 4px;
}

#cmbPayDialog .unionpay_icon {
  width: 36px;
  height: 24px;
  margin-left: 28px;
  margin-bottom: 4px;
}

#cmbPayDialog .payment_text {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  line-height: 17px;
}
</style>
