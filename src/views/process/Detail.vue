<script setup>
import { ref, computed, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getProjectInfo } from "@/services/process";

const route = useRoute();
const router = useRouter();
const data = reactive({
  value: []
});

const update = async() => {
  const res = await getProjectInfo(route.query.id);
  if (res?.code == 0) {
    const arr = [];
    for(var key in res?.data?.data) {
      const obj = {
        label: key,
        value: res?.data?.data[key]
      }
      arr.push(obj);
    }
    data.value = arr
  }
}

onMounted(() => {
  update();
})
</script>

<template>
<div class="detail project-detail">
  <!-- 用户注册资料 -->
  <a-card :title="item.label" style="width: 100%;margin-bottom: 10px; font-weight: bold" v-for="(item) in data.value" :key="item">
    <p v-if="item.label != '项目图片'">
      <pre width="100" style="white-space:pre-wrap;text-indent: -7ch;">
        {{item.value}}
      </pre>
    </p>
    <img v-else :src="item.value" width="150" />
  </a-card>
  </div>
</template>
<style lang="scss" scoped>

.detail{
  margin-top: 15px;
  position: relative;
  left: -15px;
}
.user-wrap{
  margin-bottom: 0!important;
  .content{
    flex: 1;
    // margin-left: 15px;
    background: #fff;
  }
}
.user-menu {
  width: 150px;
  height: 100%;
  padding: 10px 0;
  // margin-left: 40px;
  .ant-menu-item {
    padding-left: 0!important;
    padding-right: 0!important;
    text-align: center;
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    border-radius: 0!important;
  }
  h2{
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    margin-bottom: 0;
  }
}
</style>