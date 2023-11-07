<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="login-footer" style="font-size: 14px; padding-bottom: 30px">
    <p
      style="
        font-weight: bold;
        margin-bottom: 16px;
        text-align: center;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.65);
      "
    >
      —— 科学指南针·中国大型科研服务机构 ——
    </p>
    <p
      style="text-align: center; color: rgba(0, 0, 0, 0.45); line-height: 20px"
    >
      Copyright 杭州研趣信息技术有限公司 All Rights Reserved
      <span style="margin-left: 8px">服务热线：400-831-0631</span>
    </p>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
