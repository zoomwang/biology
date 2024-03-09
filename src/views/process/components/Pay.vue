<script setup>
import { ref, watch, reactive, onMounted, onUpdated, onUnmounted} from "vue";
// import { notification } from "ant-design-vue";
import { jstopdf, formatTime } from "@/utils/index";
import { payQrcodeOrder, getOrderStatus } from "@/services/order";
import QRCode from 'qrcode';

const isPaySuccess = ref(false);
let interval = ref(null);
let imrUrl = reactive({
  value: ''
});

const props = defineProps(["props", 'payType', 'orderId', 'orderInfo', "successCall"]);
watch(props, async (newdata, olddata) => {
  getQrCode()
})

const download = () => {
  // jstopdf("download", "对账单",timeFormat(new Date(), "YYYY-mm-dd"));
  jstopdf("download", "对账单");
};

const onRefrush = () => {
  setTimeout(() => {
    isPaySuccess.value = true;
    clearInterval(interval.value);
  }, 4000);
};

const getQrCode = async() => {
  const res = await payQrcodeOrder({
    orderId: props.orderId,
    payPlatform: props.payType
  });
  if (res?.code == 0) {
    QRCode.toDataURL(res.data)
    .then(url => {
      imrUrl.value = url;
      console.log(url)
    })
    .catch(err => {
      console.error(err)
    })
  } 
  
}

const roll = () => {
  interval.value = setInterval(async () => {
    const res = await getOrderStatus(props.orderId);
    if (res?.code == 0 && res?.data == 3) {
      isPaySuccess.value = true;
      props.successCall();
      clearInterval(interval.value);
    }
  }, 2000);
}

onMounted(() => {
  getQrCode();
  roll();
  // onRefrush();
})

onUnmounted(() => {
  clearInterval(interval.value);
});
</script>

<template>
  <div class="pay-wrap d-flex" id="cmbPayDialog">
    <div v-show="!isPaySuccess">
      <div class="unionPayMoney">
        应付金额<span>￥</span><span class="unionPayMoney_span">{{props.props.cost['支付金额']}}</span>
      </div>
      <img
        id="cmbPayDialog_img"
        alt="聚合二扫码支付"
        :src="imrUrl.value"
      />
      <div class="cmbPayDialog_img_smegma_refresh" @click="getQrCode()">
        <img
          class="cmbPayDialog_img_smegma_refresh_icon"
          src="../../../assets/prestore/6.png"
          alt=""
        />点击刷新二维码
      </div>
      <div class="crmbpay_tips">您可以使用以下软件扫描上方二维码付款</div>
      <div class="crmbpay_tips_img_box">
        <div v-if="props.payType == 1">
          <img class="ali_icon" src="../../../assets/prestore/3.png" alt="" />
          <div class="payment_text" style="margin-left: 54px">支付宝</div>
        </div>
        <div v-if="props.payType == 2">
          <img class="wx_icon" src="../../../assets/prestore/2.png" alt="" />
          <div class="payment_text" style="margin-left: 54px">微信</div>
        </div>
        <div v-if="props.payType == 3">
          <img
            class="unionpay_icon"
            src="../../../assets/prestore/9.png"
            alt=""
          />
          <div class="payment_text" style="margin-left: 54px">银联</div>
        </div>
      </div>
    </div>
    <div v-show="isPaySuccess">
      <a-result status="success" title="支付成功!">
        <template #extra>
          <p>预约单号为：{{ props.orderId }}</p>
          <p>预约金额：{{ props.props.cost['支付金额'] }}</p>
          <p>预约时间：{{ formatTime(Date.now()) }}</p>
          <p>
            <a-button style="width: 220px" type="primary" @click="download"
              >下载预约单</a-button
            >
          </p>
        </template>
      </a-result>
    </div>
    <div id="download" style="position: absolute; top: -9999px;width:700px">
      <a-descriptions title="预约单" bordered :column="2">
        <a-descriptions-item label="项目名称">{{props?.itemname}}</a-descriptions-item>
        <a-descriptions-item label="订单号">{{props?.orderId}}</a-descriptions-item>
        <a-descriptions-item label="是否需要回收">{{props?.orderInfo?.needRecovery ? '需要': '不需要'}}</a-descriptions-item>
        <a-descriptions-item label="备注">{{props?.orderInfo?.remark}}</a-descriptions-item>
        <a-descriptions-item label="样品信息" v-for="item in props?.orderInfo?.sampleInfo" :key="item">
          样品编号:{{item.numberList.join(',')}}
          <br />
          样品数量:{{item.count}}
          <br />
          {{item.uploadFile ? '对接单:' + item.uploadFile : ''}}
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <!-- <div id="download" style="position: absolute; top: -9999px;width:700px">
      <a-descriptions title="预约单" bordered :column="2">
        <a-descriptions-item label="订单号">{{props?.orderId}}</a-descriptions-item>
        <a-descriptions-item label="运费支付方式">{{['到付', '自付'][props?.orderInfo?.freightMode]}}</a-descriptions-item>
        <a-descriptions-item label="是否需要回收">{{props?.orderInfo?.needRecovery ? '需要': '不需要'}}</a-descriptions-item>
        <a-descriptions-item label="项目名称">{{props?.orderInfo?.itemname}}</a-descriptions-item>
        <a-descriptions-item label="联系人">{{props?.orderInfo?.contactName}}</a-descriptions-item>
        <a-descriptions-item label="联系号码">{{props?.orderInfo?.contactsPhone}}</a-descriptions-item>
        <a-descriptions-item label="实验留言">{{props?.orderInfo?.remark}}</a-descriptions-item>
        <a-descriptions-item label="总费用">
          <p>总金额：{{props?.orderInfo?.costInfo['支付金额']}}</p>
          <p>样品回收费：{{props?.orderInfo?.costInfo['样品回收费']}}</p>
          <p>订单金额：{{props?.orderInfo?.costInfo['订单金额']}}</p>
          <p>运费：{{props?.orderInfo?.costInfo['运费']}}</p>
        </a-descriptions-item>
        <a-descriptions-item label="全局问题" :span="2">
          是否有磁性元素:{{props?.orderInfo?.globalProblem?.hasMagnetism ? '有':'没有'}}
          <br />
          拍摄方式:{{props?.orderInfo?.globalProblem?.shootingMethod ? '现场':'云现场'}}
        </a-descriptions-item>
        <a-descriptions-item label="样品信息" v-for="item in props?.orderInfo?.sampleInfo" :key="item">
          样品数量:{{item.count}}
          <br />
          样品编号:{{item.numberList.join(',')}}
          <br />
          目的:{{item.goal}}
          <br />
          预约市场:{{item.hours}}
        </a-descriptions-item>
      </a-descriptions>
    </div> -->
  </div>
</template>
<style lang="scss" scoped>
.pay-wrap {
  flex-direction: column;
  text-align: center;
  p {
    padding-left: 30px;
    text-align: left;
  }
}
#cmbPayDialog {
  height: 400px;
}
#cmbPayDialog .unionPayMoney {
  font-size: 14px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
  line-height: 20px;
  // position: absolute;
  // top: 82px;
  text-align: center;
  width: 100%;
  span {
    color: red;
    font-size: 22px;
  }
}
#cmbPayDialog #cmbPayDialog_img {
  display: block;
  width: 180px;
  height: 180px;
  margin: 0 auto;
  // position: absolute;
  // top: 118px;
  // left: 106px;
}
#cmbPayDialog .cmbPayDialog_img_smegma_refresh {
  cursor: pointer;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  line-height: 20px;
  // position: absolute;
  // top: 296px;
  // left: 138px;
}
#cmbPayDialog .crmbpay_tips {
  margin: 20px 0;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  line-height: 20px;
  // position: absolute;
  // top: 328px;
  text-align: center;
  width: 100%;
}
#cmbPayDialog .crmbpay_tips_img_box {
  margin-bottom: 32px;
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 105px;
  justify-content: flex-start;
  // position: absolute;
  // top: 362px;
}
#cmbPayDialog .cmbPayDialog_img_smegma_refresh_icon {
  width: 14px;
  height: 14px;
  margin: -2px 3px 0 0;
}

#cmbPayDialog .ali_icon {
  width: 24px;
  height: 24px;
  margin-left: 58px;
  margin-bottom: 4px;
}

#cmbPayDialog .wx_icon {
  width: 27px;
  height: 24px;
  margin-left: 58px;
  margin-bottom: 4px;
}

#cmbPayDialog .unionpay_icon {
  width: 36px;
  height: 24px;
  margin-left: 58px;
  margin-bottom: 4px;
}

#cmbPayDialog .payment_text {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  line-height: 17px;
}
</style>
