<script setup>
// import TheWelcome from '@/components/Wx.vue';
import { ref, computed, reactive, defineComponent, watch, onUpdated, onMounted, defineProps } from "vue";
// import { isLogged } from "../../services/user";
// import { DollarCircleTwoTone } from "@ant-design/icons-vue";
// import payment from "@/assets/order/payment.png";
import Pay from "../components/Pay.vue";
import CreditPay from "../components/CreditPay.vue";
import { getCredit, getAmount } from "@/services/user";
import { payAmount, payCredit } from "@/services/order";
import { getOrderInfo, addOrder, getCouponList, getOrderCostCalc, updateOrder } from "@/services/process";
import { notification } from "ant-design-vue";

const formState = reactive({
  layout: "horizontal",
  prestore: 0,
  payType: "1",
  couponId: ""
});
// let cost = ref(0);
let props = defineProps(["orderId", "cost", "orderData", "successCall"]);
const prop = reactive({
  cost: {},
});

const costDetail = reactive({
  value: []
});
const total = props.cost['支付金额'];
let payVisible = ref(false);
// let credit = ref(0);
let amount = ref(0);
const bottom = ref(-15);
let orderInfo = ref({});
let isUpdata = ref(false);
let orderId = ref('');
const ticketsInfo = reactive({
  value: []
});


const getOrderCostCalcs = async(data) => {
  try {
    const res = await getOrderCostCalc(data);
    prop.cost = res?.data;
  } catch(err) {};
}

const handleChange = async(id) => {
  const data = Object.assign(formState, props.orderData);
  formState.couponId = id;
  await getOrderCostCalcs(data);
  const res = await updateOrder({
    couponId: id,
    orderId: props.orderId,
  });
  // const res = await addOrder(data);
  if (res?.code == 0) {
    orderId.value = props.orderId;
  }
  // initCost('update');
  updateCost(res.data);
  isUpdata.value = true;
}

const getOrderInfos = async() => {
  try{
    const res = await getOrderInfo(props?.orderId);
    if (res.code == 0) {
      orderInfo = res.data;
    }
  } catch(err) {}
}
const getTicketLists = async() => {
  try{
    const res = await getCouponList({
      pageSize: 9999,
      curPage: 0,
    });
    if (res.code == 0) {
      ticketsInfo.value = res?.data?.list;
    }
  } catch(err) {}
}
const submit = async () => {
  if (formState.payType == 0) {
    // if (total > amount.value) {
    //   notification.error({
    //     message: "注意",
    //     description: "预存金额不足，请前往预存",
    //   });
    //   return;
    // } else {
      // payVisible.value = true;
      const res = await payAmount({
        orderId: props.orderId
      });
      if (res?.code == 0) {
        payVisible.value = true;
      }
    // }
  }
  if (formState.payType >= 1 && formState.payType <= 3) {
    payVisible.value = true;
  }

  if (formState.payType == 4) {
    // payVisible.value = true;
    const res = await payCredit({
      orderId: props.orderId
    });
    if (res?.code == 0) {
      payVisible.value = true;
    }
  }
}

const getUserCredit = async () => {
try {
    const res = await getCredit();
    if (res?.code == 0) {
      credit = res?.data
    }
  } catch (err) {}
}
const getUserAmount = async () => {
  try {
    const res = await getAmount();
    if (res?.code == 0) {
      amount.value = res?.data;
    }
  } catch (err) {}
}

const initCost = (type) => {
  const arr = [];
  for(var key in (!type ? props.cost : prop.cost)) {
    const obj = {
      label: key,
      value: !type ? props.cost[key] : prop.cost[key]
    }
    arr.push(obj);
  }
  costDetail.value = arr;
}

const updateCost = (cost) => {
  const arr = [];
  for(var key in cost) {
    const obj = {
      label: key,
      value: cost[key]
    }
    arr.push(obj);
  }
  costDetail.value = arr;
}
onMounted(() => {
  getUserAmount();
  getOrderInfos();
  getTicketLists();
  getUserCredit();
  initCost();
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
        <p>
          优惠券选择:
          <a-select
            ref="select"
            allowClear
            v-model:value="formState.couponId"
            style="width: 120px"
            placeholder="优惠券选择"
            @change="handleChange"
          >
            <a-select-option v-for="item in ticketsInfo.value" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
          </a-select>
        </p>
        <template v-for="item in costDetail.value" :key="item">
          <p v-if="item.label != '支付金额'">{{item.label}}: {{item.value}}</p>
        </template>
        <template v-for="item in costDetail.value" :key="item">
          <p class="wait_pay" v-if="item.label == '支付金额'">待支付： <span>￥{{item.value > 0 ? item.value : 0}}</span></p>
        </template>
        <!-- <p>
          优惠券选择：
            <a-select
              ref="select"
              v-model:value="formState.couponId"
              style="width: 120px"
              placeholder="优惠券选择"
              @change="handleChange"
            >
              <a-select-option v-for="item in ticketsInfo.value" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
            </a-select>
          </p> -->
        <a-divider />
      </div>
    </a-card>
    <a-card title="支付" style="margin-top: 16px;">
      <p
        style="
          font-size: 14px;
          color: rgba(0, 0, 0, 0.85);
          margin-bottom: 16px;
          font-weight: 500;
        "
      >
        支付金额 <span class="amount">￥{{!isUpdata ? (props.cost['支付金额'] > 0 ? props.cost['支付金额'] : 0) : (prop.cost['支付金额'] > 0 ? prop.cost['支付金额'] : 0)}}</span>
      </p>
      <a-card title="支付方式">
        <div class="payway_list">
          <div class="payway_list_item payway_list_other">
            <a-radio-group name="prestore" v-model:value="formState.payType">
              <!-- <a-radio value="1"
                ><img
                  src="//cdn0.shiyanjia.com/c/2023/images/payment/1.png"
                  title="不可选" />
                <span style="font-size: 20px">扫码支付</span>
                <span>支持使用</span><img class="pay_type" width="308px" height="76px" :src="payment" title="不可选"
              /></a-radio> -->
              <a-radio value="1"
                ><img
                style="margin-top: 13px"
                  src="@/assets/order/zhifubao.jpg"
                  title="不可选" />
                <span style="font-size: 20px">支付宝支付</span>
              </a-radio>
              <br />
              <a-radio value="2"
                ><img
                style="margin-top: 13px"
                  src="@/assets/order/wechat.jpg"
                  title="不可选" />
                <span style="font-size: 20px">微信支付</span>
              </a-radio>
              <br />
              <a-radio value="3"
                ><img
                style="margin-top: 13px"
                  src="@/assets/order/wechat.jpg"
                  title="不可选" />
                <span style="font-size: 20px">银联支付</span>
              </a-radio>
              <br />
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
              <a-radio value="4"
                ><img
                  src="@/assets/order/payment-credit.png"
                  title="不可选" />
                <span style="font-size: 20px">信用支付</span>
                <!-- <span
                  style="line-height: 48px; padding-left: 20px"
                >
                  先测试，后付费
                </span> -->
              </a-radio>
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
      class="order-modal-wrap"
      v-model:visible="payVisible"
      title="在线支付"
      width="400px"
      :footer="null"
    >
      <Pay v-if="formState.payType >= 1 && formState.payType <= 3" :props="isUpdata ? prop : props" :orderId="isUpdata ? orderId : props.orderId" :payType="formState.payType" :orderInfo="orderInfo" :successCall="props.successCall" />
      <CreditPay v-if="formState.payType == 4 || formState.payType == 0" :props="isUpdata ? prop : props" :orderId="isUpdata ? orderId : props.orderId" :payType="formState.payType" :orderInfo="orderInfo" />
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
      margin-top:14px;
      font-size: 24px;
      color: #1890ff !important;
      vertical-align: bottom;
    }
  }
  .wait_pay{
    overflow: hidden;
    height: 37px;
    line-height: 37px;;
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
.amount{
  color: #1890ff !important;
  font-size: 16px;
  vertical-align: middle;
  font-weight: bold;
}
</style>