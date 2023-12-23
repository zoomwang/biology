<script setup>
import {
  ref,
  computed,
  reactive,
  defineComponent,
  watch,
  defineEmits,
} from "vue";
import {
  CalendarTwoTone,
  DeleteTwoTone,
  PlusSquareTwoTone,
  QuestionCircleTwoTone,
  EnvironmentOutlined
} from "@ant-design/icons-vue";
// import { isLogged } from "../../services/user";
import { Form, Modal } from "ant-design-vue";
const emit = defineEmits(["submit", "next"]);

const useForm = Form.useForm;
const containerRef = ref();
const bottom = ref(10);
const addressList = [{
  id: '1',
  name: "广州办事处"
},{
  id: '2',
  name: "深圳办事处"
},{
  id: '3',
  name: "上海办事处"
}]
const selectAdd = (item) => {
  // console.log('add=', add);
  Modal.confirm({
    closable: true,
    cancelText: "重新选择",
    content: `是否和经理确认，样品邮寄到${item.name}？`,
    onOk: () => {
      formState.defaultAddress = item.id;
    }
  })
}
const formState = reactive({
  layout: "horizontal",
  type: 0,
  magnetism: 0,
  // identity: "2",
  // no: "",
  // name: "",
  group: [
    {
      // num: 2,
      // no: "122222",
      sampleNum: 1,
      sampleNo: [],
      time: 1,
      addition: [],
    },
  ],
  fee: 0,
  defaultAddress: "1",
});

const headers = {
  authorization: "authorization-text",
};
const cost = ref(0);
const handleChange = (info) => {
  if (info.file.status !== "uploading") {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === "done") {
    message.success(`${info.file.name} file uploaded successfully`);
  } else if (info.file.status === "error") {
    message.error(`${info.file.name} file upload failed.`);
  }
};
const addItem = () => {
  formState.group.push({
    sampleNum: 1,
    sampleNo: [],
    time: 1,
    addition: [],
  });
};
const deleteItem = (idx) => {
  const group = formState.group;
  if (group.length <= 1) return;
  group.splice(idx, 1);
  formState.group = group;
};
const labelCol = {
  span: 3,
};
let sampleNo = ref([[1]]);

const readme = ref([
  "啊看黄金时代卡是多久啊",
  "啊看黄金时代卡是多久啊",
  "啊看黄金时代卡是多久啊",
  "啊看黄金时代卡是多久啊",
]);
const activeKey = ref(["2", "3"]);
watch(formState, async (newdata, olddata) => {
  console.log("newdata==", newdata);
  const sample = [];
  newdata.group.forEach((item, index) => {
    sample[index] = new Array(item.sampleNum - 0);
  });
  sampleNo.value = sample;
  // sampleNo.value = new Array(newdata.sampleNum - 0);
});

const canNext = () => {
  validate()
    .then(() => {
      // debugger
      emit("next");
    })
    .catch((error) => {
      console.log("error", error);
    });
};


const { resetFields, validate, validateInfos } = useForm(
  formState,
  reactive({
    type: [
      {
        required: true,
        message: "请选择",
      },
    ],
    magnetism: [
      {
        required: true,
        message: "请输入",
      },
    ],
    group: [],
  })
);
</script>

<template>
  <!-- 第一步 -->
  <main id="components-affix-demo-target" ref="containerRef" class="scrollable-container">
    <a-form :model="formState" labelAlign="right">
      <div class="first-step">
        <a-collapse v-model:activeKey="activeKey" expand-icon-position="left">
          <a-collapse-panel key="1" header="预约须知">
            <p v-for="(item, index) in readme" :key="index">
              {{ ++index }}.{{ item }}
            </p>
            <template #extra><CalendarTwoTone /></template>
          </a-collapse-panel>
          <a-collapse-panel key="2" header="全局问题" :disabled="false">
            <a-form-item label="拍摄方式" v-bind="validateInfos.type">
              <a-radio-group
                v-model:value="formState.type"
                button-style="solid"
              >
                <a-radio-button :value="0">云现场</a-radio-button>
                <a-radio-button :value="1">现场</a-radio-button>
              </a-radio-group>
            </a-form-item>
            <a-form-item
              ::label-col="labelCol"
              label="样品是否有磁性(即是否含有铁钴锰等磁性元素)"
              v-bind="validateInfos.magnetism"
            >
              <a-radio-group
                v-model:value="formState.type"
                button-style="solid"
              >
                <a-radio-button :value="0">没有磁性</a-radio-button>
                <a-radio-button :value="1">有磁性</a-radio-button>
              </a-radio-group>
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel
            v-for="(item, index) in formState.group"
            :header="`第${index + 1}组样品数据`"
            :key="index + 3"
            :disabled="false"
          >
            <template #extra
              ><PlusSquareTwoTone
                style="margin-right: 10px"
                @click.stop="addItem" /><DeleteTwoTone
                @click.stop="deleteItem(index)"
            /></template>
            <a-form-item
              label="样品数量"
              :rules="{
                required: true,
                message: '请输入',
                trigger: 'change',
              }"
            >
              <a-input
                type="number"
                v-model:value="formState.group[index].sampleNum"
                placeholder="请输入样品数量"
                :max-length="25"
                style="width: 120px"
              />
            </a-form-item>
            <a-form-item
              label="样品编号"
              :rules="{
                required: true,
                message: '请输入',
                trigger: 'change',
              }"
            >
              <a-input
                v-for="(item, idx) in sampleNo[index]"
                :key="idx"
                placeholder="请输入"
                style="width: 120px; margin-right: 10px; margin-bottom: 10px"
                v-model:value="formState.group[index].sampleNo[idx]"
              >
                <template #prefix> {{ idx + 1 }}- </template>
              </a-input>
            </a-form-item>
            <a-form-item
              label="预约时长"
              :rules="{
                required: true,
                message: '请输入',
                trigger: 'change',
              }"
            >
              <a-input
                type="number"
                v-model:value="formState.group[index].time"
                placeholder="请输入预约时长"
                :max-length="25"
                style="width: 120px"
                step="0.5"
              />
            </a-form-item>
            <a-form-item label="上传文件" class="upload">
              <a-upload
                v-model:file-list="formState.group[index].addition"
                name="file"
                :multiple="true"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                :headers="headers"
                @change="handleChange"
              >
                <a-button>
                  <upload-outlined></upload-outlined>
                  点击上传
                </a-button>
              </a-upload>
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel
            :key="formState.group.length + 2"
            header="寄样地址"
            :disabled="false"
          >
            <a-form-item label="运费" v-bind="validateInfos.fee">
              <a-radio-group v-model:value="formState.fee" button-style="solid">
                <a-radio-button :value="0">
                  运费到付
                  <a-popover placement="topLeft">
                    <template #content>
                      <p>选择运费到付，订单金额需加收12元快递费。</p>
                    </template>
                    <template #title>
                      <span>提醒</span>
                    </template>
                    <QuestionCircleTwoTone />
                  </a-popover>
                </a-radio-button>
                <a-radio-button :value="1">运费自付</a-radio-button>
              </a-radio-group>
            </a-form-item>
            <a-form-item
              ::label-col="labelCol"
              label="寄样地址"
              v-bind="validateInfos.magnetism"
            >
            <div class="address-list f-fl addr_select_box">
              <div v-for="item in addressList" :key="item.id" :class="{'default': item.id == formState.defaultAddress, 'li': true}" @click="selectAdd(item)">
                {{item.name}}
              </div>
            </div>
            <div class="fl addr post_addr_info">
              <div class="addr_title">
                  <h1 class="fl">曾老师</h1>
              </div>
              <div class="addr_body" style="position: relative">
                  <p>15818130780</p>
                  <div>
                    <EnvironmentOutlined />
                      <!-- <i class="iconfont com_icon_address"></i> -->
                      <span>广东省广州市海珠区</span>&nbsp;
                      <a>新港东路68号华域创意园D1-2（非工作时间拒收同城，请提前联系）</a>
                  </div>
                  <div class="sci-address-tips" style=" display: none ">
                      请寄顺丰快递！！！
                  </div>
              </div>
          </div>
            </a-form-item>
          </a-collapse-panel>
          <!-- <div style="padding: 20px">
            <a-button type="primary" @click="addItem">增加一组样品</a-button>
          </div> -->
        </a-collapse>
      </div>
    </a-form>
      <a-affix :offset-bottom="bottom">
        <div class="d-flex">
        <div class="cost">
          合计费用：<a-button type="link">¥{{ cost }}</a-button>
        </div>
        <a-button style="display:block" @click="prev">保存草稿</a-button>
        <a-button
          style="margin-left: 8px; margin-right: 15px;display:block"
          type="primary"
          @click="canNext"
          >下一步</a-button
        >
        </div>
      </a-affix>

      <!-- <a-button
        v-if="current == 2"
        type="primary"
        style="margin-left: 8px; margin-right: 30px"
        @click="$message.success('Processing complete!')"
      >
        提交
      </a-button> -->
    <!-- </div> -->
  </main>
</template>
<style lang="scss" scoped>
.cost {
  line-height: 32px;
  flex: 1;
  background: #fff;
}
.first-step {
  .ant-collapse-header-text {
    text-align: left !important;
  }
}

.steps-action {
  padding-top: 24px;
  background: #fff;
}
.d-flex{
  margin-top: 10px;
  padding: 15px 0 15px 10px;
  background: #fff;
  box-shadow: 3px 3px 4px 3px rgba(0, 0, 0, 0.1);
}
.ant-form-item-label{
  &>label{
    width: 81px!important;
  }
}
.upload{
  label{
    width: 81px!important;
  }
}
.addr_select_box{
  width: 350px;
    margin: 0 40px 0 0;
    padding: 12px 7px;
    background: rgba(22, 119, 225, 0.4);
    border: 1px solid #5284c9;
}
.addr_select_box .li {
  float: left;
    min-width: 82px;
    line-height: 28px;
    margin-bottom: 5px;
    padding: 0 5px;
    font-size: 14px;
    color: #000;
    text-align: center;
      cursor: pointer;
}
.addr_select_box .li:hover {
    background: #064cac;
    color: #fff;
}
.addr_select_box div.default {
    background: #064cac;
    color: #fff;
}
.addr_select_box div.active {
    line-height: 26px;
    background: #064cac;
    border: 1px solid #064cac;
    color: #fff;
}
.addr {
    width: 320px;
    height: 174px;
    float: left;
    padding: 0 10px;
      background: url('//statics.shiyanjia.com/c/yanlu/images/buffet/addr-bg.png') no-repeat;
    /*border: 1px solid #E8E8E8;*/
}
.addr_title {
    height: 53px;
    line-height: 52px;
    padding: 0 5px;
    border-bottom: 1px solid #E8E8E8;
}
.addr_title h1 {
    line-height: 52px;
    font-size: 14px;
    color: rgba(0, 0, 0, .65);
    font-weight: 500;
}
.addr_title span {
    font-size: 14px;
    color: #1890FF;
    font-weight: 500;
      cursor: pointer;
}
.addr_body p {
    margin: 17px 0 10px;
    line-height: 20px;
    font-size: 14px;
    color: rgba(0, 0, 0, .65);
}
.addr_body div {
    position: relative;
    // padding-left: 32px;
    font-size: 14px;
    color: rgba(0, 0, 0, .65);
    font-weight: 500;
}
.addr_body div i {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 24px;
}
.addr_body div span {
    color: rgba(0, 0, 0, .75);
    font-weight: bold;
}
.addr_body div a {
    color: rgba(0, 0, 0, .65)!important;
}
.com_icon_address:before {
  content: "\e621";
}
.new_addr {
    line-height: 24px;
    font-size: 14px;
    color: rgba(0, 0, 0, .65);
    cursor: pointer;
}
.new_addr img {
    width: 24px;
    height: 24px;
    margin-right: 10px;
}
</style>