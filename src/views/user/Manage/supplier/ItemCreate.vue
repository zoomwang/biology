<script setup>
import { ref, reactive, onMounted, onUpdated } from "vue";
import {
  supplierItemDetailAdd,
  supplierItemDetailEdit,
  supplierItemList,
} from "../../../../services/supplier";
const props = defineProps(['detail', 'successCallBack', "isCreate"]);
import { message } from "ant-design-vue";
const formRef = ref();
const labelCol = { span: 5 };
const wrapperCol = { span: 24 };
const formState = reactive({
  id: "",
  deviceType:  '',
  costprice: 0,
  remark: '',
  deleted: 0,
  document: '',
  uploadDocument: '',
  supplierItemId: '',
  supplierId: props?.detail?.supplierId
});
const param = reactive({
  pageSize: 999,
  curPage: 1,
  param: {
    status: "-1",
    itemname: ""
  }
});
const menus = ref([]);
const getSupplierItemList = async () => {
  try {
    const res = await supplierItemList(param);
    if (res?.code == 0) menus.value = res?.data?.list;
  } catch (err) {}
};

const rules = {
  deviceType: [
    { required: true, message: '请输入设备类型', trigger: 'change' },
  ],
  costprice: [{ required: false, message: '请输入对接分值', trigger: 'change' }],
};
const onSubmit = () => {
  formRef.value
    .validate()
    .then(async() => {
       try {
         if (props.isCreate) {
          const res = await supplierItemDetailAdd(formState);
          if (res?.code == 0) {
            message.success("新建成功");
            props.successCallBack();
          }
         } else {
           const res = await supplierItemDetailEdit(formState);
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
  console.log(formRef)
  formRef.value.resetFields();
  Object.assign(formState, props?.detail)
});

onMounted(() => {
  console.log(formRef)
  formRef.value.resetFields();
  getSupplierItemList();
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
    <a-form-item ref="name" label="测试项目大类" name="supplierItemId">
      <a-select v-model:value="formState.supplierItemId">
        <a-select-option v-for="item in menus" :key="item.id" :value="item.id">{{ item.itemname }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item ref="name" label="设备类型" name="deviceType">
      <a-input v-model:value="formState.deviceType" />
    </a-form-item>
    <a-form-item label="成本价" name="costprice">
      <a-input type="number" v-model:value="formState.costprice" />
    </a-form-item>
    <a-form-item label="状态" name="deleted">
      <a-select v-model:value="formState.deleted">
        <a-select-option  :value="0">已上架</a-select-option>
        <a-select-option  :value="1">已下架</a-select-option>
      </a-select>    
    </a-form-item>
    <a-form-item label="备注" name="remark">
      <a-textarea v-model:value="formState.remark" />
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
