<script setup>
// import TheWelcome from '@/components/Wx.vue';
import { ref, computed, reactive, defineComponent } from "vue";
import { demandOptions } from "./config";
import { UploadOutlined } from "@ant-design/icons-vue";

const formState = reactive({
  layout: "horizontal",
  identity: "2",
  no: "",
  name: "",
  month: "",
});

const onSubmit = () => {
  console.log(formState);
};
</script>

<template>
  <!-- 用户注册资料 -->
  <main>
    <div class="container-postdemand">
      <div class="h2">发布需求</div>
      <div class="h3">
        快速获得反馈，建议直接扫码添加产品/服务负责人，或拨打服务热线400-831-0631，我们将第一时间为您解答问题。
      </div>
      <div class="postdemand-item">
        <div class="l-item clear">
          <div class="t-title f-fl">需求类别：</div>
          <a-form-item class="f-fl">
            <a-radio-group
              v-model:value="formState.value2"
              :options="demandOptions"
            />
          </a-form-item>
        </div>
        <div class="l-item clear">
          <div class="t-title f-fl">联系人：</div>
          <a-form-item class="f-fl">
            <a-input v-model:value="formState.name" placeholder="请姓名" />
          </a-form-item>
        </div>
        <div class="l-item clear l-identity">
          <div class="t-title f-fl">联系号码：</div>
          <a-form-item class="f-fl">
            <a-input v-model:value="formState.name" placeholder="请姓名" />
          </a-form-item>
        </div>
        <div class="l-item clear">
          <div class="t-title f-fl">电子邮箱：</div>
          <a-form-item class="f-fl">
            <a-input v-model:value="formState.name" placeholder="请姓名" />
          </a-form-item>
        </div>
        <div class="l-item clear">
          <div class="t-title f-fl">样品数量：</div>
          <a-form-item class="f-fl">
            <a-input v-model:value="formState.name" placeholder="请姓名" />
          </a-form-item>
        </div>
        <div class="l-item clear">
          <div class="t-title f-fl">预算范围：</div>
          <a-form-item class="f-fl">
            <a-input v-model:value="formState.name" placeholder="请姓名" />
          </a-form-item>
        </div>
        <div class="l-item clear">
          <div class="t-title f-fl">完成周期：</div>
          <a-form-item class="f-fl">
            <a-input v-model:value="formState.name" placeholder="请姓名" />
          </a-form-item>
        </div>
        <div class="l-item clear">
          <div class="t-title f-fl">添加附件：</div>
          <a-form-item class="f-fl">
            <a-upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              :multiple="true"
              :file-list="fileList"
              @change="handleChange"
            >
              <a-button>
                <upload-outlined></upload-outlined>
                Upload
              </a-button>
            </a-upload>
          </a-form-item>
        </div>
        <div class="l-item clear">
          <div class="t-title f-fl">需求描述：</div>
          <a-form-item class="f-fl">
            <a-textarea
              v-model:value="value"
              placeholder="Basic usage"
              :rows="4"
            />
            <span class="remind">需求尽量详细，以便更精确的匹配到合适的测试项目</span>
          </a-form-item>
        </div>
        <a-button type="primary" class="submit-button f-fl" @click.prevent="onSubmit"
          >提交需求</a-button
        >
      </div>
    </div>
  </main>
</template>
<style lang="scss">
.container-postdemand {
  text-align: center;
  padding-top: 30px;
  .h2 {
    line-height: 29px;
    font-size: 24px;
    font-family: Helvetica;
    color: #1890ff;
    text-align: center;
  }
  .h3 {
    padding: 0 11px 0 16px;
    display: table;
    height: 36px;
    line-height: 36px;
    margin: 32px 0 24px 165px;
    font-size: 14px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #faad14;
    text-align: center;
    border: 1px solid #faad14;
    border-radius: 4px;
  }
  .postdemand-item {
    width: 700px;
    margin: 0 auto;
    .submit-button{
      width: 100px;
      text-align: center;
      height: 40px;
      margin-left: 100px;
    }
    .t-title {
      width: 100px;
      height: 40px;
      line-height: 40px ;
      text-align: right;
    }
    .ant-input{
      height: 40px;
      line-height: 40px;
    }
    .ant-radio-wrapper{
      margin-bottom: 10px;
    }
    .ant-form-item {
      width: 600px;
      text-align: left;
    }
    .remind{
      margin-top: 8px;
      line-height: 17px;
      font-size: 12px;
      color: #FEA000;
    }
  }
}
</style>
