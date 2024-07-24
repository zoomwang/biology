<template>
  <div>
    <FormProvider :form="form">
      <SchemaField :schema="schema"> </SchemaField>
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

<script setup>
import { Form, Input, FormItem, Select } from "ant-design-vue";
import { createForm, isVoidField, setValidateLanguage } from "@formily/core";
import {
  FormProvider,
  FormConsumer,
  createSchemaField,
  Field,
  connect,
  mapProps,
} from "@formily/vue";
setValidateLanguage("en");
const form = createForm();

const FormSelect = connect(Select, mapProps({ enum: "options" }));

const { SchemaField } = createSchemaField({
  components: {
    Input,
    Select,
    FormSelect,
    FormItem,
  },
});
const schema = {
  type: "object",
  properties: {
    select: {
      type: "string",
      "x-decorator": "FormItem",
      "x-component": "Select",
      "x-component-props": {
        style: {
          width: "240px",
        },
        options: [
          { label: "显示", value: "visible" },
          { label: "隐藏", value: "none" },
          { label: "隐藏-保留值", value: "hidden" },
        ],
      },
      "x-decorator-props": {
        label: "选择器",
      },
      "x-reactions": {
        target: "input",
        fulfill: {
          state: {
            display: "{{$self.value}}",
          },
        },
      },
    },
    input: {
      type: "string",
      "x-decorator": "FormItem",
      "x-component": "Input",
      "x-component-props": {
        placeholder: "请输入",
        style: "width: 240px;",
      },
      "x-decorator-props": {
        label: "输入框",
      },
    },
    input1: {
      type: "string",
      "x-decorator": "FormItem",
      "x-component": "Input",
      "x-component-props": {
        placeholder: "请输入",
        style: "width: 240px;",
      },
      "x-decorator-props": {
        label: "输入框1",
      },
      'x-reactions':{
          dependencies: ['select', ],
          fulfill: {
            state: {
              display: "{{$deps[0] === 'none' ? 'none' : 'visible'}}",
            },
          },
        }
    },
    input2: {
      type: "string",
      "x-decorator": "FormItem",
      "x-component": "Input",
      "x-component-props": {
        placeholder: "请输入",
        style: "width: 240px;",
      },
      "x-decorator-props": {
        label: "输入框2",
      },
      'x-reactions':{
          dependencies: ['input1'],
          fulfill: {
            state: {
              display: "{{$deps[0] === 'visible' ? 'visible' : 'none'}}",
            },
          },
        }
    },
    

  },
};
</script>
<style>
.header-wrap,
.login-footer,
.bg {
  display: none;
}
</style>
