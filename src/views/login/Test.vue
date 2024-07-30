<template>
  <div class="order-buffet-client-form">
    <FormProvider  :form="form">
      <SchemaField :schema="schema1"> </SchemaField>
      <FormConsumer>
        <template #default="{ form }">
          <div style="white-space: pre">
            {{ JSON.stringify(form.values, null, 2) }}
          </div>
        </template>
      </FormConsumer>
    </FormProvider>
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
import { computed } from "vue";
import Upload from "@/components/Upload.vue"
import Editor from "@/components/Editor.vue"
import { QUESTION_TYPES } from "@/utils/const"
import res from './mock.json'
import { UploadOutlined } from "@ant-design/icons-vue";

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





const schema1 = computed(() => {
  const initialValues = {}
  const properties = res.data.sampleQuestions.reduce((sum, item) => {
    console.log(111,item.id, item.label, item.dep, item.options, item)
    const options = (item.options||[]).map(item => ({ ...item, label: item.label, value: item.id }))
    const property = {
      title: item.label + '-'+QUESTION_TYPES.get(item.type),
      type: "string",
      "x-decorator": "FormItem",
      "x-component": {
        [QUESTION_TYPES.TEXT]: 'Input',
        [QUESTION_TYPES.TEXTAREA]: 'Input.TextArea',
        [QUESTION_TYPES.RADIO]: 'Radio.Group',
        [QUESTION_TYPES.CHECKBOX]: 'Checkbox.Group',
        [QUESTION_TYPES.SELECT]: 'Select',
        [QUESTION_TYPES.FILE]: 'NormalUpload',
        [QUESTION_TYPES.RICH_TEXT]: 'NormalEditor',

      }[item.type],
      "x-component-props": {
        style: {
          // width: "240px",
        },
        options: options,
        placeholder: item.placeholder,
        data: item,
      },
      "x-decorator-props": {
        // label: item.label,
        labelCol: {span: 5},
      },
      description: item.desc,
      'x-validator':{ required: true, message: '必填项' },

    }
    if (item.dep.depId && item.dep.value) {
      property["x-reactions"] = {
        dependencies: [item.dep.depId],
        fulfill: {
          state: {
            display: `{{$deps[0] === '${item.dep.value}' ? 'visible' : 'none'}}`,
          },
        }
      }
    }
    sum[item.id] = property

    let defaultValue = item.defaultValue
    if(item.type === QUESTION_TYPES.CHECKBOX) {
      defaultValue = options.filter(item => item.checked).map(item => item.value)
    } else if([QUESTION_TYPES.RADIO, QUESTION_TYPES.SELECT].includes(item.type)) {
      defaultValue = options.find(item => item.checked)?.value
    }
    console.log('defaultValue', options, item.label, defaultValue)
    if(defaultValue) {
      initialValues[item.id] = defaultValue
    }
    return sum
  }, {})
  return {
    type: "object",
    properties,
    initialValues,
  }
})

form.setInitialValues(schema1.value.initialValues)

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
