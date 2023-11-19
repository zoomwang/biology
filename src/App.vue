<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";
import { onMounted, onBeforeMount } from "vue";
import Header from "../src/components/Header.vue";
import Footer from "../src/components/Footer.vue";
import Wx from "../src/components/Wx.vue";
import { isLogged } from "../src/services/user";
import $localStorage from "./hooks/localStorage";
import router from './router';

const checkIslogged = async function() {
  try {
      const res = await isLogged();
    if (res?.code == 0) {
      $localStorage.setItem("access_token", res?.access_token);
      $localStorage.setItem("isLogin", true);
    } else {
      router.push({name: "login"})
    }
  } catch (err) {}
}

onBeforeMount(async () => {
  // console.log("mounted!");
  console.log("his==", this)
  await checkIslogged();

});
const router = useRouter();
const route = useRoute();
console.log("当前路由：", route);
// router.push({ path: "/home" });
</script>

<template>
  <Header></Header>
  <div class="wrap">
    <RouterView class="wrap-l" />
    <div class="wrap-r" v-if="!route?.fullPath.includes('home')">
    <!-- <div class="wrap-r f-fr" v-if="!route?.fullPath.includes('home')">  -->
      <Wx />
    </div>
  </div>
  <Footer></Footer>
</template>

<style scoped>
#app{
  height: 100%;
}
.wrap-l {
  width: 970px;
  margin: 0 auto;
}
.wrap-r {
  width: 220px;
}
.wrap {
  width: 1280px;
  margin: 0 auto;
  /* padding: 2rem; */
  font-weight: normal;
  overflow: hidden;
  min-height: 500px;
  display: flex;
}
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
