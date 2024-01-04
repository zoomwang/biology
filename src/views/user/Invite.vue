<script setup>
// import TheWelcome from '@/components/Wx.vue';
import { ref, computed, reactive, defineComponent } from "vue";
import { isLogged } from "../../services/user";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons-vue";
const data = reactive({
  total: 100,
  freeze: 20,
  withdraw: 20,
  withdrawn: 20,
});
const isShow = ref(true);
</script>

<template>
  <!-- 邀请好友 -->
  <main>
    <div class="invite-wrap">
      <a-card title="我的零钱包" style="width: 100%">
        <template #extra><a href="#">查看明细></a></template>
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
              <p class="salary-value">{{ isShow ? data.total : "*****" }}</p>
            </li>
            <li>
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
            </li>
          </ul>
          <!-- <a-button type="primary" :class="{ 'disabled': data.withdraw == 0, 'btn': true }">立即提现</a-button> -->
        </div>
      </a-card>
      <a-card title="邀请返利" style="width: 100%">
        <p>
          身边好友同为科研人？当他们注册后下单，您可获得8%奖励，好友可得：200元新人券
        </p>
        <div class="other-way-item" style="margin-bottom: 32px">
          <p>邀请方式：将您的专属邀请链接发送给您的好友；</p>
          <a
            href="javascript:;"
            class="btn invite-link"
            style="margin: 14px 0px 0px 16px"
          >
            {{`https://www.test.com/home/login?invitecode=${localStorage.phone}`}}
          </a>
          <a
            id="copyInviteLink"
            href="javascript:;"
            data-clipboard-text="https://www.shiyanjia.com/register.html?invitecode=15975624649"
            class="btn hover"
            style="margin: 14px 0px 0px 40px"
            >复制链接</a
          >
        </div>
      </a-card>
    </div>
  </main>
</template>
<style lang="scss">
.invite-wrap {
  .ant-card {
    position: relative;
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