<script setup>
import { ref, computed, reactive, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import FirstStep from "./components/FirstStep.vue";
import OtherStep from "./components/OtherStep.vue";
import FinalStep from "./components/FinalStep.vue";
import { getOfficeInfo, draftSave, addOrder } from "@/services/process";
import { notification } from "ant-design-vue";

const current = ref(0);
const route = useRoute();
const id = route.query.id;
const type = route.query.type;
console.log("route=", route);
const order = reactive({
  id: '',
});
const next = (data) => {
  current.value++;
};
const update = async(data) => {
  const res = await addOrder(data);
  if (res?.code == 0) {
    order.id = orderId;
  } else {
    order.id = '1212';
  }
}
const save = async (data) => {
  try {
    const res = await draftSave(data);
    if (res.code == 0) {
      notification.success({
        description: "保存草稿成功",
      });
    }
  } catch(err) {}
  // 接口请求之后保存数据
}

</script>

<template>
  <!-- 用户注册资料 -->
  <main class="order-wrap">
    <a-steps :current="current">
      <a-step>
        <template #title>第一步</template>
        <template #description>
          <span>请注意预约须知</span>
        </template>
      </a-step>
      <a-step title="第二步" description="支付信息" />
    </a-steps>
    <div class="steps-content">
      <FirstStep v-if="current == 0 && type == 0" :id="id" :addressList="addressList" @update="update" @next="next" @save="save" />
      <OtherStep v-if="current == 0 && type == 1" :id="id" :addressList="addressList" @update="update" @next="next" @save="save" />
      <FinalStep v-if="current == 1 && order.id" :orderId="order.id" />
    </div>
    
  </main>
</template>
<style lang="scss" scoped>
.fixed_active{
  padding: 20px 0 10px 10px;
  position: fixed;
  bottom: 40px;
  left: 50%;
  margin-left: -593px;
  width: 966px;
  background: #fff;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.2)
}

.order-wrap {
  padding-top: 15px;
  // padding-bottom: 50px;
}
.steps-content {
  margin-top: 16px;
  // border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: left;
  // padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
  .ant-collapse-header-text {
    text-align: left !important;
  }
}
</style>