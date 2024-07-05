<script setup>
import {
  RouterLink,
  RouterView,
  useRoute,
  useRouter,
} from "vue-router";
import { onMounted, onBeforeMount, onUpdated, watch } from "vue";
import Header from "../src/components/Header.vue";
import Footer from "../src/components/Footer.vue";
import Wx from "../src/components/Wx.vue";
import Machine from "../src/components/Machine.vue";
import { isLogged } from "../src/services/user";
import $localStorage from "@/hooks/localStorage";
import router from "./router";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { blackList } from "@/utils/index.js";
import { ref } from "vue";

const routers = useRouter();
const route = useRoute();
const isNext = ref(false);
const isLoad = ref(false);

const checkIslogged = async function () {
  if (blackList.includes(location?.pathname)) {
    isNext.value = true;
    return;
  } 
  try {
    const res = await isLogged();
    if (res?.code == 0) {
      localStorage.setItem("access_token", res?.data?.access_token);
      $localStorage.setItem("access_token", res?.data?.access_token);
      $localStorage.setItem("isLogin", true);
      isLoad.value = true;
      isNext.value = true;
    } else {
      isNext.value = true;
      // if (!blackList.includes(route?.fullPath)) {
        router.push({ name: "login" });
        isLoad.value = true;
      // }
    }
  } catch (err) {
    isNext.value = true;
    isLoad.value = true;
  }
};

watch(
  () => route.path,
  async(newPath, oldPath) => {
    if (!blackList.includes(newPath) && !isLoad) {
      await checkIslogged();
    }
  },
  { immediate: true }
);

onBeforeMount(async () => {
  await checkIslogged();
});

</script>

<template :locale="zhCN">
  <a-config-provider :locale="zhCN">
    <Header></Header>
    <div class="wrap">
      <RouterView v-if="isNext" class="wrap-l" />
      <div class="wrap-r" v-if="!route?.fullPath.includes('home')">
        <!-- <div class="wrap-r f-fr" v-if="!route?.fullPath.includes('home')">  -->
        <Machine v-if="route?.fullPath.includes('order')" />
        <!-- <Wx /> -->
      </div>
    </div>
    <Footer></Footer>
  </a-config-provider>
</template>

<style scoped>
.user-wrap {
  width: 1280px !important;
}
.wrap-l {
  width: 1280px;
  margin: 0 auto 20px;
}
.wrap-r {
  /* width: 220px; */
}
.wrap {
  width: 1280px;
  margin: 20px auto;
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
