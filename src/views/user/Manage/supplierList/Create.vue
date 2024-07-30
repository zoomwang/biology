<script setup>
import { ref, reactive, onMounted, onUpdated } from "vue";
// import { addSupplier } from "../../../../services/supplier";
const props = defineProps(["detail", "successCallBack", "isCreate"]);
import { message } from "ant-design-vue";
import {
  supplierList,
  supplierItemList,
  supplierPersonAdd,
  supplierPersonUpdate
} from "../../../../services/supplier";
const formRef = ref();
const labelCol = {  style: {
    width: "100px",
  }};
const wrapperCol = { span: 24 };
const data = ref([]);
const data1 = ref([]);
const transferMethod = [
  {
    label: '不确定',
    value: 0
  },
  {
    label: '对公转账',
    value: 1
  },
  {
    label: '对私转账',
    value: 2
  }
];
const payMethod = [
  {
    label: '不确定',
    value: 0
  },
  {
    label: '微信',
    value: 1
  },
  {
    label: '支付宝',
    value: 2
  },
  {
    label: '银行',
    value: 3
  }
]
const status = [
  {
    label: '已上线',
    value: 0
  },
  {
    label: '已下线',
    value: 1
  }
]

const formState = reactive({
  id: "",
  itemname: "",
  itemValues: 0,
});
const rules = {
  telephone: [
    { required: true, message: "请输入供应商电话", trigger: "change" },
  ],
  supplierName: [
    { required: true, message: "请输入供应商姓名", trigger: "change" },
  ],
  company: [
    { required: true, message: "请输入工作单位", trigger: "change" },
  ],
  head: [
    { required: true, message: "请输入对接人", trigger: "change" },
  ],
  address: [
    { required: false, message: "请输入寄样地方", trigger: "change" },
  ],
};
const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      try {
        if (props.isCreate) {
          const res = await supplierPersonAdd(formState);
          if (res?.code == 0) {
            message.success("新建成功");
            props.successCallBack();
          }
         } else {
           const res = await supplierPersonUpdate(formState);
          if (res?.code == 0) {
            message.success("编辑成功");
            props.successCallBack();
          }
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
  Object.assign(formState, props?.detail)
});

onUpdated(() => {
  Object.assign(formState, props?.detail)
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
    <a-form-item label="供应商姓名" name="supplierName">
      <a-input v-model:value="formState.supplierName" />
    </a-form-item>
    <a-form-item label="供应商电话" name="telephone">
      <a-input v-model:value="formState.telephone" />
    </a-form-item>
    <a-form-item label="工作单位" name="company">
      <a-input v-model:value="formState.company" />
    </a-form-item>
    <a-form-item label="对接人" name="head">
      <a-input v-model:value="formState.head" />
    </a-form-item>
    <a-form-item label="寄样地方" name="address">
      <a-input v-model:value="formState.address" />
    </a-form-item>
    <a-form-item label="发票信息" name="invoiceInformation">
      <a-input v-model:value="formState.invoiceInformation" />
    </a-form-item>
    <a-form-item label="转账方式" name="transferMethod">
      <a-select
        style="width: 200px"
        :options="transferMethod"
        v-model:value="formState.transferMethod"
      />    
    </a-form-item>
    <a-form-item label="支付方式" name="payMethod">
      <a-select
        style="width: 200px"
        :options="payMethod"
        v-model:value="formState.payMethod"
      />    
    </a-form-item>
    <a-form-item label="状态" name="status">
      <a-select
        style="width: 200px"
        :options="status"
        v-model:value="formState.status"
      />    
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
