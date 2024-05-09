<script setup>
import { ref, reactive, onMounted, onUpdated } from "vue";
import {
  supplierAdd,
  supplierUpdate
} from "../../../../services/supplier";
const props = defineProps(['detail', 'successCallBack', "isCreate"]);
import { message } from "ant-design-vue";
const formRef = ref();
const labelCol = { span: 3 };
const wrapperCol = { span: 24 };
const formState = reactive({
  deleted: 1,
  id: "",
  supplierName:  '',
  telephone: "",
  company: ""
});
const rules = {
  supplierName: [
    { required: true, message: '请输入供应商名称', trigger: 'change' },
  ],
  telephone: [{ required: false, message: '请输入手机号', trigger: 'change' }],
  company: [{ required: false, message: '请输入公司', trigger: 'change' }],
};
const onSubmit = () => {
  formRef.value
    .validate()
    .then(async() => {
       try {
         if (props.isCreate) {
          const res = await supplierAdd(formState);
          if (res?.code == 0) {
            message.success("新建成功");
            props.successCallBack();
          }
         } else {
           const res = await supplierUpdate(formState);
          if (res?.code == 0) {
            message.success("编辑成功");
            props.successCallBack();
          }
         }
          
        } catch (err) {
          // debugger
        }
    })
    .catch(error => {
      console.log('error', error);
    });
};

onUpdated(() => {
  formState.id = props?.detail?.id;
  formState.itemname = props?.detail?.itemname;
  formState.itemValue = props?.detail?.itemValue;
});

onMounted(() => {
  formState.id = props?.detail?.id;
  formState.itemname = props?.detail?.itemname;
  formState.itemValue = props?.detail?.itemValue;
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
    <a-form-item ref="name" label="供应商名称" name="supplierName">
      <a-input v-model:value="formState.supplierName" />
    </a-form-item>
    <a-form-item label="手机号" name="telephone">
      <a-input type="number" v-model:value="formState.telephone" />
    </a-form-item>
    <a-form-item label="公司名称" name="company">
      <a-input type="number" v-model:value="formState.company" />
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
  p{
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
