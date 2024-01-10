<script setup>
// import TheWelcome from '@/components/Wx.vue';
import { ref, computed, reactive, defineComponent, onMounted  } from "vue";
// import { identity } from "./config";
// import areaData from "../../public/area.js";
// import $localStorage from "@/hooks/localStorage";
import { notification } from "ant-design-vue";
import { addOrder, getOrderList, getOrderDetail } from "../../services/order";

const visible = ref(false);
const showModal = () => {
  visible.value = true;
};
const param = reactive({
  pageSize: 10,
  curPage: 1,
})

const orderSum = ref(0);
const handleOk = e => {
  visible.value = false;
};
const data = ref([]);
const columns = [
  {
    title: '消耗积分',
    dataIndex: 'points',
    key: 'points',
  },
];

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
      orderSum = res?.data?.points;
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
          <i id="TotalCoupon" money="0.00">{{orderSum}}</i
          ><i id="CouponDecimal" money="0.00">.00</i
          ><span class="addDan"> 分</span>
        </h1>
        <h2 style="white-space: nowrap; margin-top: 8px">我的积分</h2>
      </li>
      <li class="point-tips fl" @click="showModal">
        查看积分规则
      </li>
      <a-popconfirm
        title="你确定要兑换吗?"
        ok-text="确定"
        cancel-text="取消"
        @confirm="addOrders"
      >
        <li class="point-tips fl">
          <a-button type="primary">兑换</a-button>
        </li>
      </a-popconfirm>
      <li></li>
    </ul>
    <a-card title="积分兑换记录">
      <a-table :columns="columns" :data-source="data">
        <template #name="{ points }">
          <a>{{ points }}</a>
        </template>
      </a-table>
    </a-card>
    <a-modal v-model:visible="visible" title="积分规则" @ok="handleOk">
      <p>将于2022年8月31日23:59:59，清理2021年8月31日（包含8月31日）及之前所有获得并未使用的积分。至此之后，将于每年8月31日23:59:59清除前一年8月31日（包含8月31日）及之前获得并未使用的积分。</p>
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
	width: 250px;
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
