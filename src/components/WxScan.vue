<script setup>
import { ref, computed, defineComponent, reactive } from "vue";
import wx from "../assets/wx.png";

const expired = ref(false);
const wxUrl = ref("");

function getWxUrl() {
  return `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQF47zwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyZkF0dnB3cERkUjQxbXkxZ2hCY0gAAgTyPFBlAwSwBAAA`
}
</script>

<template>
  <div class="erCode">
    <div class="wx-scan">
      <img style="width: 100%;height:100%;" :src="getWxUrl()" />
      <div class="m-mask" v-show="expired">
        <div class="c-white">二维码已失效</div>
        <a-button class="b-reset" type="primary">点击刷新</a-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.erCode{
  .wx-scan{
      position: relative;
      width: 100%;
    height: 100%;
    }
  .m-mask{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.9);
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    .c-white{
       margin-bottom: 10px;
    }
     
  }
}
</style>
