<script setup>
import { ref, computed, reactive, defineComponent, watch } from "vue";
import { CalendarTwoTone, DeleteTwoTone } from "@ant-design/icons-vue";
// import { isLogged } from "../../services/user";

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
    }],
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
}
const deleteItem = (idx) => {
  const group = formState.group;
  if (group.length <= 1) return;
  group.splice(idx, 1);
  formState.group = group;
}
const labelCol = {
  span: 3,
};
let sampleNo = ref([
  [1]
]);

const readme = ref([
  "啊看黄金时代卡是多久啊",
  "啊看黄金时代卡是多久啊",
  "啊看黄金时代卡是多久啊",
  "啊看黄金时代卡是多久啊",
]);
const activeKey = ref(["2", "3"]);
watch(formState, async (newdata, olddata) => {
  console.log('newdata==', newdata)
  const sample = [];
  newdata.group.forEach((item, index) => {
    sample[index] = new Array(item.sampleNum - 0);
  });
  sampleNo.value = sample;
  // sampleNo.value = new Array(newdata.sampleNum - 0);
});

</script>

<template>
  <!-- 第一步 -->
  <main>
    <a-form :model="formState">
      <div class="first-step">
        <a-collapse v-model:activeKey="activeKey" expand-icon-position="left">
          <a-collapse-panel key="1" header="预约须知">
            <p v-for="(item, index) in readme" :key="index">
              {{ ++index }}.{{ item }}
            </p>
            <template #extra><CalendarTwoTone /></template>
          </a-collapse-panel>
          <a-collapse-panel key="2" header="全局问题" :disabled="false">
            <a-form-item label="拍摄方式">
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
          <a-collapse-panel v-for="(item, index) in formState.group" :header="`第${index+1}组样品数据`" :key="index+3" :disabled="false">
            <template #extra><DeleteTwoTone @click.prevent="deleteItem(index)" /></template>
            <a-form-item label="样品数量">
              <a-input
                type="number"
                v-model:value="formState.group[index].sampleNum"
                placeholder="请输入样品数量"
                :max-length="25"
                style="width: 120px"
              />
            </a-form-item>
            <a-form-item label="样品编号">
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
            <a-form-item label="预约时长">
              <a-input
                type="number"
                v-model:value="formState.group[index].time"
                placeholder="请输入预约时长"
                :max-length="25"
                style="width: 120px"
                step="0.5"
              />
            </a-form-item>
            <a-form-item label="预约时长">
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
          <div style="padding: 20px">
            <a-button type="primary" @click="addItem">增加一组样品</a-button>
          </div>
          <!-- <a-collapse-panel key="3" header="This is panel header 3" disabled>
            <p>{{ text }}</p>
          </a-collapse-panel> -->
        </a-collapse>
      </div>
    </a-form>
    <div
      class="steps-action d-flex"
      ref="fixedName"
    >
    <!-- :class="[state.isFixed ? 'fixed_active' : '']" -->
      <div class="cost">
        合计费用：<a-button type="link">¥{{ cost }}</a-button>
      </div>
      <a-button @click="prev">保存草稿</a-button>
      <a-button
        style="margin-left: 8px; margin-right: 30px"
        type="primary"
        @click="$emit('next')"
        >下一步</a-button
      >
      <!-- <a-button
        v-if="current == 2"
        type="primary"
        style="margin-left: 8px; margin-right: 30px"
        @click="$message.success('Processing complete!')"
      >
        提交
      </a-button> -->
    </div>
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

</style>