<script setup>
import { ref, computed, reactive, onMounted, onUnmounted } from "vue";
// import { useStorage } from "@/hooks/useStorage";
// import $localStorage from "@/hooks/localStorage";
import { useRoute, useRouter } from "vue-router";
import FirstStep from "./components/FirstStep.vue";
import SecondStep from "./components/SecondStep.vue";
import FinalStep from "./components/FinalStep.vue";

const current = ref(0);
const route = useRoute();
const id = route.query.id;
console.log("route=", route);
const next = () => {
  current.value++;
};
// const prev = () => {
//   current.value--;
// };
const save = () => {
  // 接口请求之后保存数据
}
</script>

<template>
  <!-- 用户注册资料 -->
  <main class="order-wrap">
    <a-steps :current="current">
      <a-step>
        <!-- <span slot="title">Finished</span> -->
        <template #title>第一步</template>
        <template #description>
          <span>请注意预约须知</span>
        </template>
      </a-step>
      <a-step title="第二步" description="支付信息" />
      <!-- <a-step title="第三步" description="支付信息" /> -->
    </a-steps>
    <div class="steps-content">
      <FirstStep v-if="current == 0" :id="id" @next="next" @save="save" />
      <!-- <SecondStep v-if="current == 1" :id="id" @next="next" @save="save" /> -->
      <FinalStep v-if="current == 1" :id="id" @next="next" @save="save" />
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