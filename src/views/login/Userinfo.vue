<script setup>
// import TheWelcome from '@/components/Wx.vue';
import { ref, computed, reactive,defineComponent } from "vue";
const formState = reactive({
  layout: "horizontal",
  identity: "2",
  no: "",
  name: "",
});

</script>

<template>
  <!-- 用户注册资料 -->
  <main>
    <div class="container-userinfo">
      <div class="h2">用户注册资料</div>
      <div class="userinfo-item">
        <div class="l-item clear">
          <div class="t-title f-fl">登录账号：</div>
          <a-form-item class="f-fl">
            <a-input
              v-model:value="formState.no"
              style="width: 303px"
              placeholder="请输入手机号"
            />
          </a-form-item>
        </div>
        <div class="l-item clear">
          <div class="t-title f-fl">姓名：</div>
          <a-form-item class="f-fl">
            <a-input
              v-model:value="formState.name"
              style="width: 203px"
              placeholder="请姓名"
            />
          </a-form-item>
        </div>
        <div class="l-item clear l-identity" >
          <div class="t-title f-fl">身份：</div>
          <div class="">
           <a-radio-group name="identity" v-model:value="formState.identity">
            <a-radio value="1">A</a-radio>
            <a-radio value="2">B</a-radio>
            <a-radio value="3">C</a-radio>
            <a-radio value="4">D</a-radio>
          </a-radio-group>
          </div>
        </div>
        <div class="l-item clear">
           <div class="t-title f-fl">省份：</div>
           <a-form-item class="f-fl">
            <a-select
                v-model:value="value2"
                style="width: 120px; margin-right: 10px"
              >
                <a-select-option value="lucy">Lucy</a-select-option>
              </a-select>
          </a-form-item>
        </div>
        <div class="l-item clear">
           <div class="t-title f-fl">城市：</div>
           <a-form-item class="f-fl">
            <a-select
                v-model:value="value2"
                style="width: 120px; margin-right: 10px"
              >
                <a-select-option value="lucy">Lucy</a-select-option>
              </a-select>
          </a-form-item>
        </div>
        <div class="l-item clear">
           <div class="t-title f-fl">高校：</div>
           <a-form-item class="f-fl">
            <a-select
                v-model:value="value2"
                style="width: 120px; margin-right: 10px"
              >
                <a-select-option value="lucy">Lucy</a-select-option>
              </a-select>
          </a-form-item>
        </div>
        <div class="l-item clear">
           <div class="t-title f-fl">院系：</div>
           <a-form-item class="f-fl">
            <a-select
                v-model:value="value2"
                style="width: 120px; margin-right: 10px"
              >
                <a-select-option value="lucy">Lucy</a-select-option>
              </a-select>
          </a-form-item>
        </div>
        <div class="l-item clear">
           <div class="t-title f-fl">所处阶段：</div>
           <a-form-item class="f-fl">
            <a-select
                v-model:value="value2"
                style="width: 120px; margin-right: 10px"
              >
                <a-select-option value="lucy">Lucy</a-select-option>
              </a-select>
          </a-form-item>
        </div>
        <div class="l-item clear">
           <div class="t-title f-fl">入学年份：</div>
           <a-form-item class="f-fl">
            <a-select
                v-model:value="value2"
                style="width: 120px; margin-right: 10px"
              >
                <a-select-option value="lucy">Lucy</a-select-option>
              </a-select>
              <a-select
                v-model:value="value2"
                style="width: 120px; margin-right: 10px"
              >
                <a-select-option value="lucy">Lucy</a-select-option>
              </a-select>
          </a-form-item>
        </div>
        <div class="l-item clear">
           <div class="t-title f-fl">毕业年份：</div>
           <a-form-item class="f-fl">
            <a-select
                v-model:value="value2"
                style="width: 120px; margin-right: 10px"
              >
                <a-select-option value="lucy">Lucy</a-select-option>
              </a-select>
              <a-select
                v-model:value="value2"
                style="width: 120px; margin-right: 10px"
              >
                <a-select-option value="lucy">Lucy</a-select-option>
              </a-select>
          </a-form-item>
        </div>
      <div class="l-item clear">
           <div class="t-title f-fl">请选择导师：</div>
           <a-form-item class="f-fl">
            <a-select
                v-model:value="value2"
                style="width: 120px; margin-right: 10px"
              >
                <a-select-option value="lucy">Lucy</a-select-option>
              </a-select>
          </a-form-item>
        </div>
      </div>
    </div>
  </main>
</template>
<style lang="scss">
.container-userinfo{
  width: 980px;
  margin: 30px auto;
  background-color: #fff;
  .h2{
    padding-left: 50px;
    height: 40px;
    line-height: 40px;
    text-align: left;
    margin-bottom: 30px;
    background-color: hsla(160, 100%, 37%, 0.2);
  }
  .l-item {
    width: 500px;
  }
  .t-title{
    width: 150px;
    text-align: right;
  }
  .l-identity{
    margin-bottom: 20px;
  }
}
#app{
  background-color: #fff !important;
  background-image: none; 
}
</style>