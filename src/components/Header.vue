<script setup>
import HeaderContent from "./HeaderContent.vue";
import Logo from "../assets/logo.png";
// import SecondLogo from "../assets/secondLogo.jpg";
import SecondLogo from "../assets/secondLogo.jpg";
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="header-title">
    <!-- <ul class="u-header-title">
        <li class="l-header-title l-phone-num"><a href="">热线: 400-831-0631</a></li>
        <li class="l-header-title"><a href="">进入企业版</a></li>
        <li class="l-header-title"><a href="">我的订单</a></li>
        <li class="l-header-title"><a href="">指南针会员</a></li>
        <li class="l-header-title"><a href="">合作入驻</a></li>
        <li class="l-header-title"><a href="">关于我们</a></li>
        <li class="l-header-title"><a href="">人才招聘</a></li>
        <li class="l-header-title"><a href="">科研文库</a></li>
        <li class="l-header-title"><a href="">公众号合作</a></li>
      </ul>         -->
  </div>
  <div class="header d-flex">
    <div class="logo">
      <img :src="Logo" style="width: 258px; height: auto" />
    </div>
    <!-- <div class="second-logo">
      <img :src="SecondLogo" style="width: 238px;
    height: 60px; "/> 
    </div> -->
    <HeaderContent />
  </div>
</template>

<style scoped lang="scss">
.header-title {
  width: 100%;
  height: 34px;
  background: #2e3130;
  color: #fff;
  .u-header-title {
    overflow: hidden;
    .l-header-title {
      float: left;
      margin: 30px 0;
    }
    .l-phone-num {
      margin-right: 200px;
    }
  }
}
.header {
  width: 1200px;
  margin: 0 auto;
  padding-top: 30px;
}
.head-link {
  display: inline-block;
}
.header {
  // overflow: hidden;
  .logo {
    // float: left;
    width: 258px;
    height: auto;
    margin: 0 24px 0 0;
    img {
      //display: block;
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
  }
  .second-logo {
    // display: inline-block;
    // float: left;
    width: 238px;
    height: 60px;
    img {
      //display: block;
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
  }
}

.header .logo {
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
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
