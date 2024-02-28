<script setup>
// import TheWelcome from '@/components/Wx.vue';
import { ref, computed, reactive, defineComponent, onMounted  } from "vue";
// import { identity } from "./config";
// import areaData from "../../public/area.js";
// import $localStorage from "@/hooks/localStorage";
import { notification } from "ant-design-vue";
import { addOrder, getOrderList, getOrderDetail, orderByJd, orderByFee } from "../../services/order";

const visible = ref(false);
const showModal = () => {
  visible.value = true;
};
const param = reactive({
  pageSize: 10,
  curPage: 1,
})

let orderSum = reactive({
  value: 0,
});
const handleOk = e => {
  visible.value = false;
};
let data = ref([]);
const columns = [
  {
    title: '消耗积分',
    dataIndex: 'points',
    key: 'points',
  },
];

const jingdonPay = async() => {
  if (orderSum.value - 0 < 3000) {
    notification.error({
      description: "积分不足"
    })
  } else {
    try {
    const res = await orderByJd();
    if (res?.code == 0) {
      notification.success({
        description: "申请成功，请耐心等待工作人员联系",
      });
    }
  } catch (err) {}
  }
}

const feePay = async(type) => {
  if (orderSum.value - 0 < 3000) {
    notification.error({
      description: "积分不足"
    })
  } else {
    try {
      const res = await orderByFee({
        type
      });
      if (res?.code == 0) {
        notification.success({
          description: "申请成功，请耐心等待工作人员联系",
        });
      }
    } catch (err) {}
  }
}

const addOrders = async function () {
  try {
    const res = await addOrder();
    if (res?.code == 0) {
      notification.success({
        description: "兑换成功，请耐心等待工作人员联系",
      });
    }
  } catch (err) {}
}

const getOrderDetails = async function () {
  try {
    const res = await getOrderDetail();
    if (res?.code == 0) {
      orderSum.value = res?.data?.points;
    }
  } catch (err) {}
}

const getOrderLists = async function () {
  try {
    const res = await getOrderList();
    if (res?.code == 0) {
      data = res?.data?.list;
    }
  } catch (err) {}
}

  onMounted(() => {
    getOrderDetails();
    getOrderLists();
  })
</script>

<template>
  <!-- <a-card title="用户注册资料" :bordered="false"> -->
  <div class="userinfo intergral d-form">
    <ul class="exchange-navbar clearfloat">
      <li class="exchange-navbar-item fl">
        <h1>
          <i id="TotalCoupon" money="0.00">{{orderSum.value}}</i
          ><i id="CouponDecimal" money="0.00">.00</i
          ><span class="addDan">分</span>
        </h1>
        <h2 style="white-space: nowrap; margin-top: 8px">我的积分</h2>
      </li>
      <li class="fl" >
        <a style="display:block;margin-top:30px" @click="showModal">查看积分规则</a>
        <a-popconfirm
          title="你确定要兑换吗?"
          ok-text="确定"
          cancel-text="取消"
          @confirm="jingdonPay"
        >
          <div style="display: inline-block;margin-top:10px">
            <a-button type="primary" style="margin-right: 10px">兑换京东卡</a-button>
          </div>
        </a-popconfirm>
            
      </li>
      
      <li class="fl" style="margin-left: 20px">
        <span style="display:block;margin-top:30px">兑换测试费</span>
        <div style="display: inline-block">
          <a-popconfirm
            title="你确定要兑换吗?"
            ok-text="确定"
            cancel-text="取消"
            @confirm="feePay(1)"
          >
            <div style="display: inline-block;margin-top:10px">
              <a-button type="primary" style="margin-right: 10px">兑换1000积分</a-button>
            </div>
          </a-popconfirm>
        </div>
        <div style="display: inline-block">
          <a-popconfirm
            title="你确定要兑换吗?"
            ok-text="确定"
            cancel-text="取消"
            @confirm="feePay(2)"
          >
            <div style="display: inline-block;margin-top:10px">
              <a-button type="primary" style="margin-right: 10px">兑换2000积分</a-button>
            </div>
          </a-popconfirm>
        </div>
        <div style="display: inline-block">
          <a-popconfirm
            title="你确定要兑换吗?"
            ok-text="确定"
            cancel-text="取消"
            @confirm="feePay(3)"
          >
            <div style="display: inline-block;margin-top:10px">
              <a-button type="primary" style="margin-right: 10px">兑换3000积分</a-button>
            </div>
          </a-popconfirm>
        </div>
      </li>
    </ul>
    <a-card title="积分兑换记录">
      <a-table :columns="columns" :data-source="data">
        <template #name="{ points }">
          <a>{{ points }}</a>
        </template>
      </a-table>
    </a-card>
    <a-modal v-model:visible="visible" title="【易研易测积分活动宣传单】" @ok="handleOk">
      <p></p>
      <p>🚀 **积分奖励计划** 🚀</p>
      <p>- **一元一积分，福利随意选：** 每当您委托我们完成一项测试订单，便能根据消费金额获赋相应积分。每消费1元，即可获得1积分的奖励。</p>
      <p>- **积分用途丰富：** 积分可以用于抵扣后续检测费用、兑换京东礼品卡，以及各种精美礼物，更多精彩用途，待您探索。</p>
    </a-modal>
  </div>
</template>
<style lang="scss" scoped>
.userinfo {
}

.exchange-navbar {
	width: 100%;
	height: 100px;
	background: #FFF;
}

.exchange-navbar-item {
	width: 200px;
	height: 100%;
	padding: 20px 30px;
}

.exchange-navbar-item h1 {
	line-height: 33px;
	font-size: 28px;
	color: #1677ff;
	font-weight: 500;
  font-style: normal;
  i{
    font-style: normal;
  }
}

.point-tips {
            margin-top: 21px;
            margin-right: 29px;
            display: flex;
            align-items: center;
            cursor: pointer;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #1677ff;
            line-height: 20px;
            text-decoration: underline;
        }

.exchange-navbar-item h1 span {
	font-size: 14px;
}

.exchange-navbar-item h2 {
	line-height: 20px;
	font-size: 14px;
	color: rgba(0, 0, 0, .45);
}
.fl {
	float: left;
}
.fr {
	float: right;
}
</style>
