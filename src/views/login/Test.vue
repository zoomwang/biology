<template>
  <div class="order-buffet-client-form">
    {{ formData }}
    <ClientForm v-model="formData" :config="res.data.sampleQuestions"></ClientForm>
  </div>
</template>

<script setup lang="jsx">
import { Form, Input, FormItem, Select, Radio, Checkbox } from "ant-design-vue";
import { createForm, isVoidField, setValidateLanguage } from "@formily/core";
import {
  FormProvider,
  FormConsumer,
  createSchemaField,
  Field,
  connect,
  mapProps,
} from "@formily/vue";
import { computed, reactive } from "vue";
import Upload from "@/components/Upload.vue"
import Editor from "@/components/Editor.vue"
import { QUESTION_TYPES } from "@/utils/const"
import { UploadOutlined } from "@ant-design/icons-vue";
import res from '@/components/DynamicQuestion/ClientForm/mock.json'
import ClientForm from '@/components/DynamicQuestion/ClientForm/index.vue'
const formData = reactive({aa: 11, "lywq6mqze2lkeyg0cjg": "444",
  "lz48nozbxt5uc3cp8vl": "lz48nozbsq3vufzijts",
  "lywrerwug3g2a8kox88": "lywrerwvfa29mp1ny6e",
  "lywqmp4elu69q6yc8yf": "lywqnahozwkfvo12rph"})
setValidateLanguage("en");
const form = createForm();

const FormItem1 = connect(
  Form.Item,
  mapProps(
    {
      title: 'label',
      description: 'extra',
      required: true,
      validateStatus: true,
    },
    (props, field) => {
      console.log('formItem', props, field)
      return {
        ...props,
        help: field.selfErrors?.length ? field.selfErrors : undefined,
      }
    }
  )
)


const NormalUpload = (props, {attrs}) => {
  console.log(222, props, attrs)
  const {templateFile} = props.data
  const slots = {
        "upload-button": () => (
          <a-button>
            <UploadOutlined></UploadOutlined>
            上传文件
          </a-button>
        ),
      };
  return <div style="display: flex;align-items: center;" >
  <Upload {...props} {...attrs} style="display: flex;align-items: center;" listType="text"
          maxCount={1}  v-slots={slots} >
  </Upload>
  {templateFile && 
  <a style="margin-left: 16px;" href={templateFile} download >模板下载</a>
}
</div>
}

const NormalEditor = (props, {attrs}) => {
  return <div style="display: inline-block;">
    <div>
  <Editor  {...props} {...attrs} style="height: 500px; max-height: 100%;" ></Editor>
    </div>
</div>
}


const { SchemaField } = createSchemaField({
  components: {
    Input,
    Select,
    FormItem: FormItem1,
    Radio,
    Checkbox,
    // Upload,
    NormalUpload,
    NormalEditor,
  },
});


</script>
<style lang="less">
.header-wrap,
.login-footer,
.bg {
  display: none;
}

.ant-form-item-extra {
  white-space: pre-wrap;
}
.order-buffet-client-form {
  .ant-form-item-label{
    label {
      height: auto;
      padding-top: 4px;
      white-space: pre-wrap;
      align-items: baseline
    }
  }
  .ant-form-item-control {
    flex: 1;
  }
}

</style>
