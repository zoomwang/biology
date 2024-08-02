<script setup>
import { ref, reactive, onMounted, onUpdated } from "vue";
import {
  supplierItemAdd,
  supplierItemUpdate
} from "../../../../services/supplier";
const props = defineProps(['detail', 'successCallBack', "isCreate"]);
import { message } from "ant-design-vue";
const formRef = ref();
const labelCol = { span: 3 };
const wrapperCol = { span: 24 };
const formState = reactive({
  id: "",
  itemname:  '',
  itemValues: 0,
});
const rules = {
  itemname: [
    { required: true, message: '请输入项目名称', trigger: 'change' },
  ],
  itemValues: [{ required: false, message: '请输入对接分值', trigger: 'change' }],
};
const onSubmit = () => {
  formRef.value
    .validate()
    .then(async() => {
       try {
         if (props.isCreate) {
          const res = await supplierItemAdd(formState);
          if (res?.code == 0) {
            message.success("新建成功");
            props.successCallBack();
          }
         } else {
           const res = await supplierItemUpdate(formState);
          if (res?.code == 0) {
            message.success("编辑成功");
            props.successCallBack();
          }
         }
          
        } catch (err) {
          debugger
        }
    })
    .catch(error => {
      console.log('error', error);
    });
};

onUpdated(() => {
  Object.assign(formState, props?.detail)
});

onMounted(() => {
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
    <a-form-item ref="itemname" label="项目名称" name="itemname">
      <a-input v-model:value="formState.itemname" />
    </a-form-item>
    <a-form-item label="对接分值" name="itemValues">
      <a-input type="number" v-model:value="formState.itemValues" />
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
