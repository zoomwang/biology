<script setup>
import { ref, computed, reactive } from "vue";
// import { useStorage } from "@/hooks/useStorage";
// import $localStorage from "@/hooks/localStorage";
import { useRoute, useRouter } from "vue-router";
import FirstStep from "./components/FirstStep.vue";
import SecondStep from "./components/SecondStep.vue";
import FinalStep from "./components/FinalStep.vue";

const current = ref(0);
const route = useRoute();
const id = route.query.id;
console.log('route=', route)
const next = () => {
  current.value++;
};
const prev = () => {
  current.value--;
};
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
      <a-step
        title="第二步"
        sub-title="更多信息"
        description="寄样信息"
      />
      <a-step title="第三步" description="支付信息" />
    </a-steps>
    <div class="steps-content">
      <FirstStep v-if="current == 0" :id="id" />
      <SecondStep v-if="current == 1" :id="id" />
      <FinalStep v-if="current == 2" :id="id" />
    </div>
    <div class="steps-action">
      <a-button v-if="current < 2" type="primary" @click="next"
        >下一步</a-button
      >
      <a-button
        v-if="current ==  2"
        type="primary"
        @click="$message.success('Processing complete!')"
      >
        提交
      </a-button>
      <a-button type v-if="current > 0" style="margin-left: 8px" @click="prev"
        >保存草稿</a-button
      >
    </div>
  </main>
</template>
<style lang="scss" scoped>
.order-wrap{
  padding-top: 15px;
}
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: left;
  // padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
  .ant-collapse-header-text{
    text-align: left!important;
  }
}
</style>