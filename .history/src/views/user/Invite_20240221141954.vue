<script setup>
// import TheWelcome from '@/components/Wx.vue';
import { ref, computed, reactive, defineComponent, onMounted } from "vue";
import { isLogged } from "../../services/user";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons-vue";
import $localStorage from "../../hooks/localStorage";

import { copy } from "@/utils";
const data = reactive({
  amount: 0,
  // freeze: 20,
  // withdraw: 20,
  // withdrawn: 20,
});
const isShow = ref(true);

const getAmounts = async function () {
  try {
    const res = await getAmount();
    if (res?.code == 0) {
      data.amount = res?.data;
    }
  } catch (err) {}
};

onMounted(() => {
  getAmounts();
})
</script>

<template>
  <!-- 邀请好友 -->
  <main>
    <div class="invite-wrap">
      <a-card title="我的零钱包" style="width: 100%">
        <!-- <template #extra><a href="#">查看明细></a></template> -->
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
              <p class="salary-title">累计（元）</p>
              <p class="salary-value">{{ isShow ? data.amount : "*****" }}</p>
            </li>
            <!-- <li>
              <p class="salary-title">冻结（元）</p>
              <p class="salary-value">{{ isShow ? data.freeze : "*****" }}</p>
            </li>
            <li>
              <p class="salary-title">可提现（元）</p>
              <p class="salary-value">{{ isShow ? data.withdraw : "*****" }}</p>
            </li>
            <li>
              <p class="salary-title">已提现（元）</p>
              <p class="salary-value">
                {{ isShow ? data.withdrawn : "*****" }}
              </p>
            </li> -->
          </ul>
          <!-- <a-button type="primary" :class="{ 'disabled': data.withdraw == 0, 'btn': true }">立即提现</a-button> -->
        </div>
      </a-card>
      <a-card title="邀请返利" style="width: 100%">
        <p>
          当好友注册后下单，您可获得8%奖励，好友可得：<span style="color: red">200元新人券</span>
        </p>
        <div class="other-way-item" style="margin-bottom: 32px">
          <p>邀请方式：将您的专属邀请链接发送给您的好友；</p>
          <a
            href="javascript:;"
            class="btn invite-link"
            style="margin: 14px 0px 0px 0px"
          >
            {{`https://www.test.com/home/login?invitecode=${$localStorage.getItem("phone")}`}}
          </a>
          <a
            id="copyInviteLink"
            href="javascript:;"
            class="btn hover"
            style="margin: 14px 0px 0px 40px"
            @click="() => {
              copy(`https://www.test.com/home/login?invitecode=${$localStorage.getItem('phone')}`)
            }"
            >复制链接</a
          >
        </div>
      </a-card>
      <a-card title="活动规则" style="width: 100%">
      <div class="invite-cont invite-rules" ><p>1.
						自2020年12月01日邀请好友活动规则升级改版，原被邀请好友前2个月内完成订单金额的8%作为返利，由推荐人和被邀请好友平分，各享4%返利；升级后调整为：被邀好友前3个月内下单订单金额的8%作为返利，推荐人可享8%返利。
					</p> <p>2. 通过分享专属链接、专属邀请二维码、专属邀请码（手机号）邀请好友注册，即成为你的推荐用户。</p> <p>3.
						邀请好友下单后，将按好友订单金额的8%作为返利，推荐人获得8%返利，以现金方式返利到推荐人的零钱包中并（订单完成15天后）可提现。用户可在，“个人中心&gt;邀请好友”里查看。
					</p> <p>4. 推荐的好友越多，好友前三个月下单金额越多，获得的返利就越多。</p></div>
    </a-card>
    </div>
  </main>
</template>
<style lang="scss">
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
  width: 652px;
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
.salary-list li:first-child {
  width: 125px;
}
.salary-list li:nth-child(2) {
  width: 125px;
  margin-right: 21px;
}
.salary-list li:nth-child(3) {
  width: 125px;
}
.salary-list li:nth-child(4) {
  width: 125px;
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