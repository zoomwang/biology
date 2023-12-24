<script setup>
// import TheWelcome from '@/components/Wx.vue';
import { ref, computed, reactive, defineComponent, onUpdated, onMounted, defineProps } from "vue";
// import { isLogged } from "../../services/user";
import { DollarCircleTwoTone } from "@ant-design/icons-vue";
import payment from "@/assets/order/payment.png";
import Pay from "../components/Pay.vue";
import { getCredit, getAmount } from "@/services/user";
import { getOrderInfo } from "@/services/process";
import { notification } from "ant-design-vue";

const formState = reactive({
  layout: "horizontal",
  prestore: 0,
  payType: 0,
});
const props = defineProps(["orderId"]);
let payVisible = ref(false);
const credit = ref(0);
const amount = ref(0);
const bottom = ref(-15);
let orderInfo = ref({});

const getOrderInfos = async() => {
  try{
    const res = await getOrderInfo(props?.orderId);
    if (res.code == 0) {
      orderInfo = res.data;
    }
  } catch(err) {}
}
const submit = () => {
  if (formState.payType == 0) {
    // payVisible.value = true;
    if (orderInfo.fee > amount) {
      notification.error({
        message: "注意",
        description: "预存金额不足，请前往预存",
      });
    }
  }
  if (formState.payType == 1) {
    payVisible.value = true;
  }

  if (formState.payType == 2) {
    notification.success({
      message: "",
      description: "支付成功",
    });
  }
}

const getUserCredit = async () => {
try {
    const res = await getCredit();
    if (res?.code == 0) {
      credit = res?.credit
    }
  } catch (err) {}
}
const getUserAmount = async () => {
  try {
    const res = await getAmount();
    if (res?.code == 0) {
      amount = res?.credit;
    }
  } catch (err) {}
}
onMounted(() => {
  getUserAmount();
  // console.log('props==', props);
  getOrderInfos();
});
</script>

<template>
  <!-- 用户注册资料 -->
  <main>
    <a-card title="待支付详情">
      <div
        class="card-wrap"
        style="width: 300px; text-align: right; float: right"
      >
        <p>订单金额：</p>
        <p>样品回收费：</p>
        <p>安心测服务费：</p>
        <p>运费：</p>
        <p>优惠券：</p>
        <a-divider />
        <p>待支付： <span>￥200.00</span></p>
      </div>
    </a-card>
    <a-card title="支付方式">
      <p
        style="
          font-size: 14px;
          color: rgba(0, 0, 0, 0.85);
          margin-bottom: 16px;
          font-weight: 500;
        "
      >
        预存支付 <span>¥{{amount}}</span>
      </p>
      <a-card title="">
        <div class="payway_list">
          <div class="payway_list_item payway_list_item_disabled">
            <a-radio-group name="prestore" v-model:value="formState.payType">
              <a-radio value="0"
                ><img
                  src="//cdn0.shiyanjia.com/c/images/payment-coupon.png"
                  title="不可选"
                />
                <span style="font-size: 20px">个人预存</span>
                <span
                  v-if="!amount"
                  >您还没有预存，预存可以一次开票、多次使用，省去每次开票的麻烦，现在预存还有优惠哦。<a
                    href="/user/prestore"
                    style="color: #32d693"
                    target="_blank"
                    >我要预存</a
                  ></span
                ></a-radio
              >
              <br />
            </a-radio-group>
          </div>
        </div>
      </a-card>
      <p
        style="
          font-size: 14px;
          color: rgba(0, 0, 0, 0.85);
          margin-bottom: 16px;
          margin-top: 16px;
          font-weight: 500;
        "
      >
        其他方式支付 <span>¥0.00</span>
      </p>
      <a-card title="">
        <div class="payway_list">
          <div class="payway_list_item payway_list_other">
            <a-radio-group name="prestore" v-model:value="formState.payType">
              <a-radio value="1"
                ><img
                  src="//cdn0.shiyanjia.com/c/2023/images/payment/1.png"
                  title="不可选" />
                <span style="font-size: 20px">扫码支付</span>
                <span>支持使用</span><img class="pay_type" width="308px" height="76px" :src="payment" title="不可选"
              /></a-radio>
              <br />
              <a-radio value="2"
                ><img
                  src="//cdn0.shiyanjia.com/c/images/payment-coupon.png"
                  title="不可选" />
                <span style="font-size: 20px">信用支付</span>
                <span
                  style="line-height: 48px; padding-left: 20px"
                >
                  先测试，后付费
                  <img
                    class="credit"
                    id="club_prize_icon"
                    src="//cdn0.shiyanjia.com/c/2023/images/club/prizeIcon.png"
                    alt=""
                  /> </span
              ></a-radio>
            </a-radio-group>
          </div>
        </div>
      </a-card>
    </a-card>
    <a-affix :offset-bottom="bottom" style="padding-top: 10px;padding-bottom: 10px;">
      <div class="d-flex d-pay">
        <div class="cost"></div>
        <a-button
          style="margin-left: 8px; margin-right: 15px;display:block"
          type="primary"
          @click="submit"
          >确认并支付</a-button
        >
      </div>
    </a-affix>
      <!-- 支付弹层 -->
    <a-modal
      class="prestore-modal-wrap"
      v-model:visible="payVisible"
      title="在线支付"
      width="400px"
      :footer="null"
    >
      <Pay v-if="formState.payType == 1" />
    </a-modal>
  </main>
</template>
<style lang="scss" scoped>
.d-pay{
  margin-top: 10px;
  padding: 15px 0 15px 10px;
  background: #fff;
  box-shadow: 3px 3px 4px 3px rgba(0, 0, 0, 0.1);
}
.cost {
  line-height: 32px;
  flex: 1;
  background: #fff;
}
.card-wrap {
  p {
    font-weight: bold;
    span {
      font-size: 24px;
      color: #1890ff !important;
    }
  }
}

.payway_list {
  width: 100%;
}
.payway_list_item {
  position: relative;
  width: 100%;
  height: 48px;
  line-height: 48px;
  padding-left: 16px;
  cursor: pointer;
}
.payway_list_item_active {
  background-color: #eefcf6;
  background-color: rgba(50, 214, 147, 0.08);
  background-repeat: no-repeat;
  background-position: 20px center;
}
.payway_list_item img {
  float: left;
  width: 28px;
  height: 28px;
  margin-top: 10px;
}
.payway_list_item img.pay_type{
  width: 120px;
  height: 32px;
}
.payway_list_item img.credit{
  position: absolute;
  left: 110px;
  top: -14px;
  width: 148px;
  height: 19px;
}
.payway_list_item p {
  float: left;
  line-height: 48px;
  margin-left: 12px;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.65);
}
.payway_list_item span {
  display: block;
  height: 48px;
  line-height: 54px;
  float: left;
  margin-left: 10px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
}
.coupon_box {
  position: relative;
  background: #fff;
  margin-top: 20px;
  padding: 30px 20px 0 0;
  transition: all 0.3s linear;
}
.payway_list_other{
  height: auto;
}
</style>