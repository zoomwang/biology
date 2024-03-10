<script setup>
import { useRoute, useRouter } from "vue-router";
import { getOrderDetail } from "@/services/process";
import {
  onMounted,
  reactive
} from "vue";
const route = useRoute();
const router = useRouter();
console.log("当前路由：", route);
let orderDetails = reactive({
  value: {
    pictureUrl: "https://shiyanjia-files.oss-cn-hangzhou.aliyuncs.com/user/2022051118373179932994811.jpg"
  }
});

const id = route.query.id;
const toDetail = () => {
  router.push({name: "detail", query: { id: route.query.id } });
}
const getOrderDetails = async (id) => {
  const res = await getOrderDetail(id);

  if (res?.code == 0) {
    orderDetails.value = res.data;
    debugger
  }
}
onMounted(async () => {
  getOrderDetails(id);
})
</script>

<template>
  <div class="sci-buffet-info-section">
    <h3>仪器图片</h3>
    <img
      :src="orderDetails?.value?.pictureUrl"
      alt=""
    />
    <a @click.stop="toDetail" target="_blank">
      查看项目详情 &gt;
    </a>
  </div>
</template>

<style scoped>
.sci-buffet-info-section {
  width: 220px;
  background: #FFF;
  margin-bottom: 20px;
  padding: 16px 10px 20px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.2)
}

.sci-buffet-info-section h3 {
  position: relative;
  line-height: 25px;
  padding-left: 18px;
  font-size: 18px;
  color: rgba(0, 0, 0, .85);
  font-weight: bold;
}

.sci-buffet-info-section h3::after {
  position: absolute;
  left: 4px;
  top: 4px;
  content: '';
  display: block;
  width: 4px;
  height: 18px;
  background: #56BEB2;
}

.sci-buffet-info-section a {
  display: block;
  width: 200px;
  height: 32px;
  line-height: 32px;
  background: #1677ff;
  font-size: 16px;
  color: #FFF!important;
  text-align: center;
  border-radius: 3px;
}

.sci-buffet-info-section a:hover {
  background: #1677ff!important;
  color: #FFF;
}

.sci-buffet-info-section>img {
  display: block;
  width: 160px;
  height: 160px;
  margin: 17px auto 10px;
}

.sci-buffet-info-section .sci-buffet-avatar {
  display: block;
  width: 110px;
  height: 110px;
  margin: 17px auto 16px;
}

.sci-buffet-info-section .sci-buffet-phone {
  line-height: 22px;
  font-size: 16px;
  color: #56BEB2;
  font-weight: bold;
  text-align: center;
}

.sci-buffet-info-section .sci-buffet-phone img {
  position: relative;
  top: -4px;
  width: 24px;
  height: 21px;
  margin-right: 10px;
}
</style>
