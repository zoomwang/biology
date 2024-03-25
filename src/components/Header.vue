<script setup>
import HeaderContent from "./HeaderContent.vue";
import Logo from "../assets/home_logo.jpg";
import Zheng from "../assets/zhengicon.jpg";
import Zheng1 from "../assets/zhengicon1.jpg";
import Zhengshu from "../assets/zhengshu.jpg";
import Zhengshu1 from "../assets/zhengshu1.jpg";
import { useRoute } from "vue-router";
// import SecondLogo from "../assets/secondLogo.jpg";
// import SecondLogo from "../assets/secondLogo.jpg";
import LoginComponent from "../components/LoginComponent.vue";

defineProps({
  msg: {
    type: String,
    required: true,
  },
});
const route = useRoute();
</script>

<template>
  <!-- <div class="header-title">
  </div> -->
  <div class="header-wrap">
    <div class="header d-flex">
      <div class="logo" style="display: inline-block;">
        <img :src="Logo" style="width: auto; height: 80px;" />
      </div>
      <img :src="Zheng" style="width: auto; height: 50px;margin-top: 15px;" />
      <img :src="Zheng1" style="width: auto; height: 50px;margin-top: 15px;" />

      <!-- <a-popover placement="bottom" style="display: inline-block">
          <template #content>
            <img :src="Zhengshu1" style="width: auto; height: 500px" />
          </template>
          <template #title>
            <span></span>
          </template>
          <img :src="Zheng" style="width: auto; height: 50px;margin-top: 15px;" />
        </a-popover> -->
      <!-- <a-popover placement="bottom" style="display: inline-block">
        <template #content>
          <img :src="Zhengshu" style="width: auto; height: 500px" />
        </template>
        <template #title>
          <span></span>
        </template>
        <img :src="Zheng1" style="width: auto; height: 50px;margin-top: 15px;" />
      </a-popover> -->
      <LoginComponent class="f-fr" style="flex: 1" />
    </div>
  </div>
  <div v-if="!route?.fullPath.includes('home')">
    <div class="bg" >
    <HeaderContent v-if="!route?.fullPath.includes('home')" />
  </div>
  
  </div>
</template>

<style scoped lang="scss">
.header-wrap{
  background: #fff;
}
.bg{
  z-index: 9999;
	width: 100%;
	height: 59px;
	background: #FFF;
	// padding-top: 29px;
	transition: all .8s linear;
	overflow: hidden;
  box-shadow: 3px 3px 4px 0px rgba(0, 0, 0, 0.1);
}
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
  width: 1280px;
  margin: 0 auto;
  padding-top: 26px;
}
.head-link {
  display: inline-block;
}
.header {
  // overflow: hidden;
  .logo {
    // float: left;
    width: 230px;
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
    display: inline-block;
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
