<script setup>
// import TheWelcome from '@/components/Wx.vue';
import { ref, computed, reactive, defineComponent, watch, onUpdated, onMounted } from "vue";
import { getOrderMenu } from "@/services/process";
import router from '@/router';
const props = defineProps(['type'])
const menuList = ref([]);

const getOrderMenuInfo = async function (type) {
  try {
    const res = await getOrderMenu(type);
    if (res?.code == 0) {
      menuList.value = res?.data?.data;
    }
  } catch (err) {}
};

const order = (id) => {
  router.push({ path: `/process/Order`, query: {
    id,
  }});
}

watch(props, async (newdata, olddata) => {
  getOrderMenuInfo(newdata.type);
})

onMounted(() => {
  getOrderMenuInfo(props.type);
})
</script>

<template>
  <!-- 用户注册资料 -->
  <main>
    <div class="container-menu">
      <div class="bio-list" style="padding: 26px 0px 9px" v-for="item in menuList" :key="item">
        <h2 class="bio-second-level" :id="item.categoryid">{{item.catename}}</h2>
        <ul class="bio-products">
          <li v-for="(innerItem, innerIndex) in item.list" :key="innerItem">
            <a :data-id="innerItem.buffetid" @click="order(innerItem.buffetid)">{{innerItem.itemname}}<img v-if="innerIndex < 1"
                style="height: 14px; margin-left: 4px; margin-top: -2px"
                src="//cdn0.shiyanjia.com/c/2022/images/guide/sparkIcon.png"
                alt=""
            /></a>
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