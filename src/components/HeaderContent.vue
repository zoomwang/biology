<script setup>
import { ref } from "vue";
import router from '../router';
import { onMounted } from "vue";
import { getMainInfo, getSubMainInfo } from "@/services/process";
import $localStorage from "@/hooks/localStorage";

const dropdown = ref(null);
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
const activeKey = ref($localStorage.getItem('menu'));
const nav = ref([]);
const subNav = ref([]);
const select = (nav) => {
  activeKey.value = nav;
  router.push({ path: `/process/${nav}` });
  $localStorage.setItem("menu", nav);
};
const mouseOver = async(type) => {
  getSubMenuInfo(type);
};
const getMenuInfo = async function () {
  try {
    const res = await getMainInfo();
    if (res?.code == 0) {
      nav.value = res?.data;
      $localStorage.setItem("mainMenu", JSON.stringify(res?.data));
    }else {
      nav.value = JSON.parse($localStorage.getItem("mainMenu"));
    }
  } catch (err) {
  }
};
const getSubMenuInfo = async function (id) {
  try {
    const res = await getSubMainInfo(id);
    if (res?.code == 0) {
      subNav.value = res?.data?.data;
    }else {
    }
  } catch (err) {
  }
};
const redirct = function (type, id) {
  router.push({ path: `/process/${type}`, hash: `#${id}`});
}

onMounted(() => {
  getMenuInfo();
});
</script>

<template>
  <div class="header d-flex">
    <a-dropdown ref="dropdown" v-for="item in nav"
        :key="item.id" @visibleChange="mouseOver(item.id)">
      <a
        :class="activeKey == item.id ? 'active' : ''"
        @click.prevent="select(item.id)"
      >
        {{item.title}}
      </a>
      <template #overlay>
      <a-menu class="header-menu">
        <a-menu-item v-for="inneritem in subNav" :key="inneritem">
          <a style="color:#000!important;" @click.prevent="redirct(item.id, inneritem.categoryid)">{{inneritem.catename}}</a>
        </a-menu-item>
      </a-menu>
    </template>
    </a-dropdown>
  </div>
</template>

<style scoped lang="scss">
.header {
  .ant-tabs-tab-btn {
    padding: 0 0 8px !important;
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
.header {
  a {
    padding: 0 0 8px;
    margin-right: 40px;
    font-size: 16px;
    color: #424242 !important;
    font-weight: bold;
  }
  a.active {
    position: relative;
    color: #1890ff !important;
    text-shadow: 0 0 0.25px #1890ff;
  }
  a.active:before {
    position: absolute;
    bottom: 0;
    left: 0;
    content: "";
    display: block;
    width: 100%;
    height: 3px;
    background: #1890ff;
  }
  a:last-child {
    margin-right: 0;
  }
}
@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
