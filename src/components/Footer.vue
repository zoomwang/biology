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
      —— 易研易测 ——
    </p>
    <p
      style="text-align: center; color: rgba(0, 0, 0, 0.45); line-height: 20px"
    >
      Copyright  All Rights Reserved
      <span style="margin-left: 8px">服务热线：400-831-0631</span>
    </p>
  </div>
</template>

<style scoped>
.login-footer{
  min-width: 1280px;
  margin: 0 auto;
}
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
