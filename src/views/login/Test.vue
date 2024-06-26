<template>
  <div>
  <AdminForm style="width: 750px;margin-left: 16px" :type="1"></AdminForm>
  <FormProvider :form="form" v-if="0">
    <Field
      name="name"
      title="Name"
      required
      :decorator="[FormItem]"
      :component="[Input, { placeholder: 'Please Input' }]"
    />
    <Field
      name="password"
      title="Password"
      required
      :decorator="[FormItem]"
      :component="[Input, { type: 'password', placeholder: 'Please Input' }]"
      :reactions="createPasswordEqualValidate('confirm_password')"
    />
    <Field
      name="confirm_password"
      title="Confirm Password"
      required
      :decorator="[FormItem]"
      :component="[Input, { type: 'password', placeholder: 'Please Input' }]"
      :reactions="createPasswordEqualValidate('password')"
    />
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

<script>
import { Form, Input } from 'ant-design-vue'
import { createForm, isVoidField, setValidateLanguage } from '@formily/core'
import {
  FormProvider,
  FormConsumer,
  Field,
  connect,
  mapProps,
} from '@formily/vue'
import AdminForm from '@/components/DynamicQuestion/AdminForm/index.vue'

setValidateLanguage('en')

const FormItem = connect(
  Form.Item,
  mapProps(
    { validateStatus: true, title: 'label', required: true },
    (props, field) => {
      return {
        help: !isVoidField(field)
          ? field.selfErrors.length
            ? field.selfErrors
            : undefined
          : undefined,
        extra: field.description,
      }
    }
  )
)

export default {
  components: {
    FormProvider,
    FormConsumer,
    Field,
  },
  data() {
    const form = createForm({ validateFirst: true })
    const createPasswordEqualValidate = (equalName) => (field) => {
      if (
        form.values.confirm_password &&
        field.value &&
        form.values[equalName] !== field.value
      ) {
        field.selfErrors = ['Password does not match Confirm Password.']
      } else {
        field.selfErrors = []
      }
    }
    return {
      FormItem,
      Input,
      form,
      createPasswordEqualValidate,
    }
  },
}
</script>