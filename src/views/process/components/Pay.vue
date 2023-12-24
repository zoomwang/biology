<script setup>
import { ref } from "vue";
import { notification } from "ant-design-vue";
import { jstopdf } from "@/utils/index";

const isPaySuccess = ref(true);

const download = () => {
  jstopdf({
    title: "测试",
    subject: "sadsa",
    id: "download",
    name: "test",
  });
};

const onRefrush = () => {
  setTimeout(() => {
    isPaySuccess.value = false;
  }, 4000);
};
</script>

<template>
  <div class="pay-wrap d-flex" id="cmbPayDialog">
    <div v-show="isPaySuccess">
      <div class="unionPayMoney">
        应付金额<span>￥</span><span class="unionPayMoney_span">1000</span>
      </div>
      <img
        id="cmbPayDialog_img"
        alt="聚合二扫码支付"
        src="https://pay.shiyanjia.com/qrcode.html?data=https%3A%2F%2Fqr.95516.com%2F03080000%2F1004%2F100423120519562994667700"
      />
      <div class="cmbPayDialog_img_smegma_refresh" @click="onRefrush()">
        <img
          class="cmbPayDialog_img_smegma_refresh_icon"
          src="../../../assets/prestore/6.png"
          alt=""
        />点击刷新二维码
      </div>
      <div class="crmbpay_tips">您可以使用以下软件扫描上方二维码付款</div>
      <div class="crmbpay_tips_img_box">
        <div>
          <img class="ali_icon" src="../../../assets/prestore/3.png" alt="" />
          <div class="payment_text" style="margin-left: -8px">支付宝</div>
        </div>
        <div>
          <img class="wx_icon" src="../../../assets/prestore/2.png" alt="" />
          <div class="payment_text" style="margin-left: 30px">微信</div>
        </div>
        <div>
          <img
            class="unionpay_icon"
            src="../../../assets/prestore/9.png"
            alt=""
          />
          <div class="payment_text" style="margin-left: 30px">银联</div>
        </div>
      </div>
    </div>
    <div v-show="!isPaySuccess">
      <a-result status="success" title="支付成功!">
        <template #extra>
          <p>预约单号为：283912823288</p>
          <p>预约金额：2000.00</p>
          <p>预约时间：2023-12-11 10:13</p>
          <p>
            <a-button style="width: 220px" type="primary" @click="download"
              >下载预约单</a-button
            >
          </p>
        </template>
      </a-result>
    </div>
    <div id="download" style="position: absolute; top: -99999px">
      <table border="1px" width="100%">
        <!--border是边框的意思-->

        <tr>
          <td>姓名</td>

          <td>性别</td>

          <td>年龄</td>

          <td>地址</td>
        </tr>

        <tr>
          <td>jack</td>

          <td>boy</td>

          <td>20</td>

          <td>成都</td>
        </tr>

        <tr>
          <td>rose</td>

          <td>girl</td>

          <td>18</td>

          <td>绵阳</td>
        </tr>
      </table>
      <!-- <a-descriptions title="User Info" bordered>
        <a-descriptions-item label="Product">Cloud Database</a-descriptions-item>
        <a-descriptions-item label="Billing Mode">Prepaid</a-descriptions-item>
        <a-descriptions-item label="Automatic Renewal">YES</a-descriptions-item>
        <a-descriptions-item label="Order time">2018-04-24 18:00:00</a-descriptions-item>
        <a-descriptions-item label="Usage Time" :span="2">2019-04-24 18:00:00</a-descriptions-item>
        <a-descriptions-item label="Status" :span="3">
          <a-badge status="processing" text="Running" />
        </a-descriptions-item>
        <a-descriptions-item label="Negotiated Amount">$80.00</a-descriptions-item>
        <a-descriptions-item label="Discount">$20.00</a-descriptions-item>
        <a-descriptions-item label="Official Receipts">$60.00</a-descriptions-item>
        <a-descriptions-item label="Config Info">
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
          <br />
          Storage space: 10 GB
          <br />
          Replication factor: 3
          <br />
          Region: East China 1
          <br />
        </a-descriptions-item>
      </a-descriptions> -->
    </div>
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
  margin-bottom: 4px;
}

#cmbPayDialog .wx_icon {
  width: 27px;
  height: 24px;
  margin-left: 28px;
  margin-bottom: 4px;
}

#cmbPayDialog .unionpay_icon {
  width: 36px;
  height: 24px;
  margin-left: 28px;
  margin-bottom: 4px;
}

#cmbPayDialog .payment_text {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  line-height: 17px;
}
</style>
