<template>
  <div>
    <a-form :model="formData" :labelCol="{ span: 5 }">
      <a-form-item label="寄样运费">
        <a-radio-group v-model:value="formData.freightMode" button-style="solid">
          <a-radio-button :value="0">
            运费到付
            <a-popover placement="topLeft">
              <template #content>
                <p>选择运费到付，订单金额需加收12元快递费。</p>
              </template>
              <template #title>
                <span>提醒</span>
              </template>
              <QuestionCircleTwoTone />
            </a-popover>
          </a-radio-button>
          <a-radio-button :value="1">运费自付</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="寄样地址">
        <div class="address-list f-fl addr_select_box">
          <div v-for="(item, index) in addressList.value" :key="item.id"
            :class="{ default: item.id == formData.officeId, li: true }" @click="selectAdd(item, index)">
            {{ item.name }}
          </div>
        </div>
        <div class="fl addr post_addr_info">
          <div class="addr_title">
            <h1 class="fl">{{ addressList.detail.name }}</h1>
          </div>
          <div class="addr_body" style="position: relative">
            <p>{{ addressList.detail.phone }}</p>
            <div>
              <EnvironmentOutlined />
              <!-- <i class="iconfont com_icon_address"></i> -->
              <!-- <span>广东省广州市海珠区</span>&nbsp; -->
              <a>{{
                addressList.detail.detail_address
              }}</a>
            </div>
            <div class="sci-address-tips" style="display: none">
              请寄顺丰快递！！！
            </div>
          </div>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { reactive, ref, defineProps, watch, onMounted } from "vue";
import {
  QuestionCircleTwoTone,
} from "@ant-design/icons-vue";
import { useOfficeInfos } from "@/hooks/common";
import { Modal } from "ant-design-vue";

const props = defineProps({
  model: {
    type: Object,
    default: () => ({}),
  }
})
const formData = ref({});
watch(() => props.model, (val) => {
  formData.value = val
}, {
  immediate: true
})

const addressList = reactive({
  value: [],
  detail: {
    name: "",
    phone: "",
    detail_address: "",
    user: "",
  },
});

const selectAdd = (item, index) => {
  Modal.confirm({
    closable: true,
    cancelText: "重新选择",
    content: `是否和经理确认，样品邮寄到${item.name}？`,
    onOk: () => {
      formData.value.officeId = item.id;
      addressList.detail = addressList.value[index];
    },
  });
};

onMounted(async () => {
  const getValue = await useOfficeInfos();
  addressList.value = await getValue.getValue();
  const obj = addressList.value.filter((item) => {
    return item.id == formData.value.officeId;
  })[0];
  addressList.detail = obj;
});

</script>

<style lang="less" scoped>
.addr_select_box {
  width: 350px;
  margin: 0 40px 0 0;
  padding: 12px 7px;
  background: rgba(22, 119, 225, 0.4);
  border: 1px solid #5284c9;
}

.addr_select_box .li {
  float: left;
  min-width: 82px;
  line-height: 28px;
  margin-bottom: 5px;
  padding: 0 5px;
  font-size: 14px;
  color: #000;
  text-align: center;
  cursor: pointer;
}

.addr_select_box .li:hover {
  background: #064cac;
  color: #fff;
}

.addr_select_box div.default {
  background: #064cac;
  color: #fff;
}

.addr_select_box div.active {
  line-height: 26px;
  background: #064cac;
  border: 1px solid #064cac;
  color: #fff;
}

.addr {
  width: 320px;
  height: 174px;
  float: left;
  padding: 0 10px;
  background: url("//statics.shiyanjia.com/c/yanlu/images/buffet/addr-bg.png") no-repeat;
  /*border: 1px solid #E8E8E8;*/
}

.addr_title {
  height: 53px;
  line-height: 52px;
  padding: 0 5px;
  border-bottom: 1px solid #e8e8e8;
}

.addr_title h1 {
  line-height: 52px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  font-weight: 500;
}

.addr_title span {
  font-size: 14px;
  color: #1890ff;
  font-weight: 500;
  cursor: pointer;
}

.addr_body p {
  margin: 17px 0 10px;
  line-height: 20px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
}

.addr_body div {
  position: relative;
  // padding-left: 32px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  font-weight: 500;
}

.addr_body div i {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 24px;
}

.addr_body div span {
  color: rgba(0, 0, 0, 0.75);
  font-weight: bold;
}

.addr_body div a {
  color: rgba(0, 0, 0, 0.65) !important;
}

.com_icon_address:before {
  content: "\e621";
}

.new_addr {
  line-height: 24px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  cursor: pointer;
}

.new_addr img {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}
</style>