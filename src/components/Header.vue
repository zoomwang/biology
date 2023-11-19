<script setup>
import HeaderContent from "./HeaderContent.vue";
import Logo from "../assets/logo.png";
import { useRoute } from "vue-router";
// import SecondLogo from "../assets/secondLogo.jpg";
import SecondLogo from "../assets/secondLogo.jpg";
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
  <div class="header d-flex">
    <div class="logo">
      <img :src="Logo" style="width: 258px; height: auto" />
    </div>
    <LoginComponent class="f-fr" style="flex: 1" />
  </div>
  <HeaderContent v-if="!route?.fullPath.includes('home')" />
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
