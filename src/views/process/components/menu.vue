<script setup>
// import TheWelcome from '@/components/Wx.vue';
import { ref, computed, reactive, defineComponent } from "vue";
// import { isLogged } from "../../services/user";
defineProps(['type'])
const formState = reactive({
  layout: "horizontal",
  identity: "2",
  no: "",
  name: "",
});

// try {
//   const data = isLogged();
// } catch(err) {
//   alert(err);
// }
</script>

<template>
  <!-- 用户注册资料 -->
  <main>
    <div class="container-menu">
      <div class="bio-list" style="padding: 26px 0px 9px">
        <h2 class="bio-second-level">常规理化项目{{type}}</h2>
        <ul class="bio-products">
          <li>
            <a href="http://www.shiyanjia.com/buffet-537.html"
              >常规理化-水样<img
                style="height: 14px; margin-left: 4px; margin-top: -2px"
                src="//cdn0.shiyanjia.com/c/2022/images/guide/sparkIcon.png"
                alt=""
            /></a>
          </li>
          <li>
            <a href="http://www.shiyanjia.com/buffet-538.html"
              >常规理化-土样/沉积物<img
                style="height: 14px; margin-left: 4px; margin-top: -2px"
                src="//cdn0.shiyanjia.com/c/2022/images/guide/sparkIcon.png"
                alt=""
            /></a>
          </li>
          <li>
            <a
              href="http://www.shiyanjia.com/biology-540.html?position&amp;name=常规理化-植物/蔬果/农作物"
              >常规理化-植物/蔬果/农作物</a
            >
          </li>
          <li>
            <a
              href="http://www.shiyanjia.com/biology-542.html?position&amp;name=常规理化-食品"
              >常规理化-食品</a
            >
          </li>
          <li>
            <a
              href="http://www.shiyanjia.com/biology-539.html?position&amp;name=常规理化-气体"
              >常规理化-气体</a
            >
          </li>
          <li>
            <a
              href="http://www.shiyanjia.com/biology-543.html?position&amp;name=常规理化-肥料/饲料"
              >常规理化-肥料/饲料</a
            >
          </li>
          <li>
            <a
              href="http://www.shiyanjia.com/biology-545.html?position&amp;name=常规理化-岩矿"
              >常规理化-岩矿</a
            >
          </li>
          <li>
            <a
              href="http://www.shiyanjia.com/biology-554.html?position&amp;name=常规理化-垃圾"
              >常规理化-垃圾</a
            >
          </li>
          <li>
            <a href="http://www.shiyanjia.com/buffet-857.html"
              >常规理化-资质项目</a
            >
          </li>
          <li>
            <a
              href="http://www.shiyanjia.com/biology-1023.html?position&amp;name=常规理化-固体废物"
              >常规理化-固体废物</a
            >
          </li>
          <li>
            <a
              href="http://www.shiyanjia.com/biology-1024.html?position&amp;name=常规理化-建材"
              >常规理化-建材</a
            >
          </li>
          <li>
            <a
              href="http://www.shiyanjia.com/biology-1025.html?position&amp;name=常规理化-石油产品"
              >常规理化-石油产品</a
            >
          </li>
          <li>
            <a
              href="http://www.shiyanjia.com/biology-695.html?position&amp;name=常规理化-职业卫生"
              >常规理化-职业卫生</a
            >
          </li>
          <li>
            <a
              href="http://www.shiyanjia.com/biology-586.html?position&amp;name=常规理化-其它"
              >常规理化-其它</a
            >
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>
<style lang="scss" scoped>
.bio-list {
  display: flex;
  flex-wrap: wrap;
  padding: 26px 0 9px;
  border-bottom: 1px solid #D9D9D9;
}
.bio-second-level {
            width: 246px;
            line-height: 28px;
            margin-bottom: 10px;
            padding: 0 31px;
            font-size: 18px;
            color: #262626;
        }
        .bio-products {
            flex: 1;
            display: flex;
            flex-wrap: wrap;
            padding-top: 2px;
        }
        .bio-products li {
            line-height: 25px;
            margin: 0 27px 10px 0;
            font-size: 16px;
        }
        .bio-products li a {
            color: #595959!important;
        }
</style>