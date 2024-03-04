<script setup>
// import TheWelcome from '@/components/Wx.vue';
import { ref, computed, reactive, defineComponent, onMounted } from "vue";
import { isLogged, getAmount, getCredit } from "../../services/user";
import { getOrderDetail } from "../../services/order";
import router from '../../router';
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons-vue";

import { copy } from "@/utils";
const data = reactive({
  order: 0,
  amount: 0,
  credit: 0
});
const isShow = ref(true);
const getOrder = async function () {
  try {
    const res = await getOrderDetail();
    if (res?.code == 0) {
      data.order = res?.data?.points;
    }
  } catch (err) {}
};
const getAmounts = async function () {
  try {
    const res = await getAmount();
    if (res?.code == 0) {
      data.amount = res?.data;
    }
  } catch (err) {}
};
const getCredits = async function () {
  try {
    const res = await getCredit();
    if (res?.code == 0) {
      data.credit = res?.data;
    }
  } catch (err) {}
};
onMounted(() => {
  getAmounts();
  getCredits();
  getOrder();
})
</script>

<template>
  <!-- 邀请好友 -->
  <main>
    <div class="invite-wrap">
      <a-card title="我的资产包" style="width: 100%">
        <EyeOutlined
          v-if="isShow"
          @click="
            () => {
              isShow = false;
            }
          "
        />
        <EyeInvisibleOutlined
          v-if="!isShow"
          @click="
            () => {
              isShow = true;
            }
          "
        />
        <div class="clearfloat">
          <ul class="salary-list">
            <li>
              <p class="salary-title">可用信用额度（元）</p>
              <p class="salary-value">{{ isShow ? data.credit : "*****" }}</p>
            </li>
            <!-- <li>
              <p class="salary-title">可开票金额（元）</p>
              <p class="salary-value">{{ isShow ? data.freeze : "*****" }}</p>
            </li> -->
            <li>
              <p class="salary-title">账户余额（元）</p>
              <p class="salary-value">{{ isShow ? data.amount: "*****" }}</p>
              <a-button
                type="primary"
                style="margin-left:55px"
                @click="() => {
                  router.push({ path: `/user/prestore`});
                }"
              >
                申请预存
              </a-button>
              <!-- <a-button
                type="primary"
                style="margin-left:55px"
                @click="() => {
                  router.push({ path: `/user/userinfo`, query: { selectedKeys: 10 }});
                }"
              >
                预存记录
              </a-button> -->
            </li>
            <li>
              <p class="salary-title">我的积分</p>
              <p class="salary-value">
                {{ isShow ? data.order : "*****" }}
              </p>
            </li>
          </ul>
          <!-- <a-button type="primary" :class="{ 'disabled': data.withdraw == 0, 'btn': true }">立即提现</a-button> -->
        </div>
      </a-card>
    </div>
  </main>
</template>
<style lang="scss" scoped>
.other-way-item {
  margin-bottom: 36px;
  font-size: 16px;
  // color: #fff!important;
}
.other-way-item .btn {
  display: inline-block;
  min-width: 130px;
  height: 42px;
  line-height: 42px;
  background-color: #1677ff !important;
  margin: 18px 0 0 14px;
  font-size: 18px;
  color: #fff!important;
  text-align: center;
}
.other-way-item .btn.hover:hover {
  background-color: #1677ff !important;
  color: #FFF;
}
.other-way-item .btn.invite-link {
  padding: 0 20px;
}
.invite-rules p {
  font-size: 16px;
  color: #262626;
  line-height: 30px;
}
.invite-wrap {
  .ant-card {
    position: relative;
    margin-bottom: 15px;
    .anticon {
      font-size: 20px;
      position: absolute;
      cursor: pointer;
      left: 120px;
      top: 18px;
    }
  }
}
/* 菜单栏 */
.salary-list {
  float: left;
  width: 800px;
  height: 135px;
  // padding-left: 43px;
  display: flex;
  flex-wrap: nowrap;
}
.salary-list li {
  height: 100%;
  margin-right: 13px;
  padding: 20px 0 39px;
}
.salary-list li {
  width: 200px;
}
.salary-list li p.salary-title {
  float: left;
  width: 100%;
  line-height: 19px;
  margin: 12px 0;
  font-size: 18px;
  color: #262626;
  text-align: center;
}
.salary-list li p.salary-value {
  float: left;
  width: 100%;
  line-height: 16px;
  margin-top: 16px;
  font-size: 22px;
  color: #8c8c8c;
  text-align: center;
}
.salary-list ~ .btn {
  float: left;
  width: 138px;
  // line-height: 46px;
  height: 46px;
  // background-color: #e0f6ed;
  margin: 41px 16px 0 0;
  font-size: 18px;
  // color: #56beb2;
  text-align: center;
  font-weight: 500;
}
.salary-list ~ .btn.disabled {
  background-color: #d9d9d9;
  color: #595959;
}
// .salary-list ~ .btn:hover {
//   // background-color: #56beb2;
//   color: #fff;
//   cursor: pointer;
// }
.salary-list ~ .btn.disabled:hover {
  background-color: #d9d9d9;
  color: #595959;
}
</style>