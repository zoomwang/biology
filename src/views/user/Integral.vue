<script setup>
// import TheWelcome from '@/components/Wx.vue';
import { ref, computed, reactive, defineComponent } from "vue";
import { identity } from "./config";
import areaData from "../../public/area.js";
import { onMounted } from "vue";
import $localStorage from "@/hooks/localStorage";
</script>

<template>
  <!-- <a-card title="用户注册资料" :bordered="false"> -->
  <div class="userinfo intergral d-form">
    <ul class="exchange-navbar clearfloat">
      <li class="exchange-navbar-item fl">
        <h1>
          <i id="TotalCoupon" money="0.00">0</i
          ><i id="CouponDecimal" money="0.00">.00</i
          ><span class="addDan"> 分</span>
        </h1>
        <h2 style="white-space: nowrap; margin-top: 8px">我的积分</h2>
      </li>
      <li class="exchange-navbar-item fl">
        <h1>
          <i id="TotalCanCush" money="0.00">0</i
          ><i id="CanCushDecimal" money="0.00">.00</i
          ><span class="addDan"> 分</span>
        </h1>
        <h2 style="white-space: nowrap; margin-top: 8px">
          即将过期积分（2024.08.31过期）
        </h2>
      </li>
      <li class="point-tips fr">
        查看积分规则
      </li>
      <li></li>
    </ul>
  </div>
</template>
<style lang="scss">
.userinfo {
}
</style>
