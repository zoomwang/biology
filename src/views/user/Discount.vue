<script setup>
// import TheWelcome from '@/components/Wx.vue';
import { ref, computed, reactive, defineComponent, onMounted } from "vue";
import { getCouponList } from "../../services/process";
const data = [
    {
      status: 0,
      time: "7天",
      description: "ashdjsk",
      money: 100,
      name: "ask的",
      endTime: "2023-1-23"
    },
    {
      status: 1,
      time: "7天",
      description: "ashdjsk",
      money: 200,
      name: "ask的",
      endTime: "2023-1-23"
    },
    {
      status: 2,
      time: "7天",
      description: "ashdjsk",
      money: 300,
      name: "ask的",
      endTime: "2023-1-23"
    },
  ];
const activeKey = ref('0');
const useType = ref(["", "全场通用券", "商品券", "品类券"]);
const listData = reactive({
  discount: [],
});
const getCouponLists = async function (activeKeys) {
  try {
    const key = activeKeys? activeKeys - 0 : activeKey.value - 0;
    const res = await getCouponList();
    if (res?.code == 0) {
      // listData.discount = res?.data;
      listData.discount = data.filter((item) => {
        return item.status == key
      });
      console.log(data.filter((item) => {
        return item.status == key
      }))
    }
  } catch (err) {}
};

onMounted(() => {
  getCouponLists();
});

</script>

<template>
  <!-- 优惠券 -->
  
  <main>
    <a-tabs v-model:activeKey="activeKey" @change="(tab)=> {
        getCouponLists(tab);
      }">
      <a-tab-pane key="0" tab="可使用"></a-tab-pane>
      <a-tab-pane key="1" tab="已使用" force-render></a-tab-pane>
      <a-tab-pane key="2" tab="已失效"></a-tab-pane>
    </a-tabs>
    <a-list :data-source="listData.discount" :grid="{ gutter: 16, column: 2 }">
      <template #renderItem="{ item }">
        <a-list-item>
          <div class="volume-default">
            <div class="coupon-ul-info">
              <div class="coupon-money-height">
                <div class="coupon-money" :class="{ 'used': item.status == 1, 'disabled': item.status == 2 }">
                  <i>￥</i>
                  <span>{{item.money}}</span>
                  <em>{{useType[item.useType]}}</em>
                    </div>
              <div class="coupon-li-info">
                <div class="coupon-info-left" style="margin-top: 10px">
                  <div class="line">{{item.description}}</div></div>
              </div>
              <div class="coupon-time" v-if="item.status == 0">过期时间：{{item.endTime}}有效</div>
              <div class="coupon-time" v-else>{{item.name}}</div>
              </div>
            </div>
          </div>
        </a-list-item>
      </template>
    </a-list>
  </main>
</template>
<style lang="scss">
.volume-default {
    // float: left;
    margin-top: 24px;
    margin-right: 24px;
    width: 380px;
    border-top: 3px solid #1890ff;;
    box-shadow: 0 4px 4px #f2f2f2;
    background: #fff;
    height: 204px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px
}

.volume-default .coupon-ul-info {
    border-top: 0;
    padding: 0 30px
}

.volume-default .coupon-ul-info .coupon-money-height {
    height: 86px;
    padding: 20px 0;
    line-height: 56px;
    border-bottom: 1px dashed #ddd
}

.volume-default .coupon-ul-info .coupon-money-height .coupon-money {
    float: left;
    color: #ff8282;
    font-weight: 700;
    font-size: 40px
}

.volume-default .coupon-ul-info .coupon-money-height .coupon-money i {
    font-size: 24px;
    float: left;
    margin-top: 15px;
    font-weight: 400;
    letter-spacing: -2px
}

.volume-default .coupon-ul-info .coupon-money-height .coupon-money span {
    font-size: 64px;
    float: left;
    font-weight: 400;
    letter-spacing: -2px
}

.volume-default .coupon-ul-info .coupon-money-height .coupon-money em {
    float: left;
    margin-left: 10px;
    line-height: 18px;
    margin-top: 35px;
    font-size: 16px
}

.volume-default .coupon-ul-info .coupon-money-height .coupon-money p {
    font-size: 32px;
    line-height: 32px;
    width: 165px
}

.volume-default .coupon-ul-info .coupon-money-height .coupon-right {
    float: right;
    padding-right: 12px;
    width: 56px;
    height: 56px
}

.volume-default .coupon-li-info {
    margin-top: 10px;
    height: 42px
}

.volume-default .coupon-li-info .coupon-info-left {
    float: left;
    width: 100%;
    font-size: 14px;
    color: #666;
    line-height: 21px;
    max-height: 42px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical
}

.volume-default .coupon-li-info .coupon-info-left .line {
    float: left;
    width: 100%;
    color: #666;
    line-height: 21px;
    // height: 21px;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // white-space: nowrap
}

.volume-default .coupon-li-info .coupon-info-right {
    float: right;
    width: 100px;
    font-size: 16px;
    position: relative;
    right: -10px
}

.volume-default .coupon-li-info .coupon-info-right a:link,.volume-default .coupon-li-info .coupon-info-right a:visited {
    font-size: 16px;
    text-align: center;
    height: 34px;
    display: block;
    border: 1px solid #ff8282;
    border-radius: 18px;
    line-height: 34px;
    margin-top: 3px;
    color: #f77362
}

.volume-default .coupon-li-info .coupon-info-right a:link:hover,.volume-default .coupon-li-info .coupon-info-right a:visited:hover {
    background: #ff8282;
    color: #fff
}

.volume-default .coupon-time {
    line-height: 21px;
    color: #999
}

.volume-default .coupon-time a:link,.volume-default .coupon-time a:visited {
    color: #999
}

.volume-default.volume-array .coupon-ul-info .coupon-money-height .coupon-money {
    white-space: nowrap
}

.volume-default.volume-array .coupon-ul-info .coupon-money-height .coupon-money i {
    font-size: 64px;
    float: left;
    margin-right: 10px;
    margin-top: 0;
    padding: 0;
    line-height: 56px;
    display: block
}

.volume-default.volume-array .coupon-ul-info .coupon-money-height .coupon-money span {
    font-size: 24px;
    margin: 0;
    line-height: 24px;
    float: none;
    display: block;
    margin-top: 7px;
    margin-right: 10px
}

.volume-default.volume-array .coupon-ul-info .coupon-money-height .coupon-money em {
    font-size: 16px;
    margin: 0;
    float: none;
    line-height: 16px;
    display: block;
    margin-top: 5px;
    padding-left: 0
}

.volume-default.volume-default {
    border-top: 3px solid #1890ff;;
    height: auto;
    background-image: url(//img.iblimg.com/respc-1/resources/v4.0/css/i/couput-collar.png);
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: right -81px;
    border-radius: 0;
    box-shadow: none
}

.volume-default.volume-default .coupon-ul-info {
    position: relative;
    border: 1px solid #ccc;
    border-top: 0;
    height: 203px
}

.volume-default.volume-default .coupon-ul-info .coupon-money-height .coupon-money {
    color: #1890ff
}

.volume-default.volume-default .coupon-ul-info .coupon-money-height .coupon-money.disabled,.volume-default.volume-default .coupon-ul-info .coupon-money-height .coupon-money.used {
    color: #999
}

.volume-default.volume-default .coupon-ul-info .line-icon {
    position: absolute;
    right: -5px;
    bottom: 10px;
    font-size: 0;
    height: 30px
}

.volume-default.volume-default .coupon-li-info .coupon-info-left {
    color: #666;
    font-size: 14px;
    line-height: 21px
}

.volume-default.volume-default .coupon-li-info .coupon-info-right a:link,.volume-default.volume-default .coupon-li-info .coupon-info-right a:visited {
    color: #333;
    border: 1px solid #333
}

.volume-default.volume-default .coupon-li-info .coupon-info-right a:hover,.volume-default.volume-default .coupon-li-info .coupon-info-right a:link:hover,.volume-default.volume-default .coupon-li-info .coupon-info-right a:visited:hover {
    background: #333;
    color: #fff
}

.volume-default.volume-default .coupon-time {
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 210px
}

.volume-default.on {
    background-position: right top
}

.volume-default.on .coupon-right {
    display: none
}

.volume-default.lead-end {
    background-image: url(//img.iblimg.com/respc-1/resources/v4.0/css/i/Leadend-0.png);
    border-top: 3px solid #ddd
}

.volume-default.lead-end .coupon-ul-info .coupon-li-info .coupon-info-left,.volume-default.lead-end .coupon-ul-info .coupon-li-info .coupon-info-left .line,.volume-default.lead-end .coupon-ul-info .coupon-money-height .coupon-money {
    color: #ddd
}

.volume-default.lead-end .coupon-ul-info .coupon-li-info .coupon-info-right {
    display: none
}

.volume-default.lead-end .coupon-ul-info .coupon-time {
    color: #ddd
}

.volume-default.dark {
    border-top: 3px solid #875d54
}

.volume-default.dark .coupon-ul-info .coupon-money-height .coupon-money {
    color: #876053
}

.volume-default.volume-ts {
    border-top: 3px solid #cbc060
}

.volume-default.volume-ts .coupon-ul-info .coupon-money-height .coupon-money p {
    font-size: 24px;
    width: 230px;
    color: #cbc060
}


</style>