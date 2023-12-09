<script setup>
import { ref } from "vue";
import router from '../router';
import { onMounted } from "vue";
import { getMainInfo } from "@/services/process";
const dropdown = ref(null);
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
const getMenuInfo = async function () {
  try {
    const res = await getMainInfo();
    if (res?.code == 0) {
      nav.value = res?.data;
    }
  } catch (err) {}
};
const activeKey = ref("index");
const nav = ref([]);
const select = (nav) => {
  activeKey.value = nav;
  router.push({ path: `/process/${nav}` });
};

onMounted(() => {
  getMenuInfo();
});
</script>

<template>
  <div class="header d-flex">
    <a-dropdown ref="dropdown" v-for="item in nav"
        :key="item.key">
      <a
        
        :class="activeKey == item.key ? 'active' : ''"
        @click.prevent="select(item.key)"
      >
        {{item.title}}
      </a>
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
