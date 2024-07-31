<template>
    <div class="order-buffet-client-form">
        <FormProvider :form="form">
            <FormConsumer>
                <template #default="{ form }">
                    <div style="white-space: pre">
                        {{ JSON.stringify(form.values, null, 2) }}
                    </div>
                </template>
            </FormConsumer>
            <SchemaField :schema="schema"> </SchemaField>
        </FormProvider>
    </div>
</template>

<script setup lang="jsx">
import { ref, watch, defineModel, defineProps } from "vue";
import { Form, Input, Select, Radio, Checkbox } from "ant-design-vue";
import { createForm } from "@formily/core";
import {
    FormProvider,
    FormConsumer,
    createSchemaField,
    connect,
    mapProps,
} from "@formily/vue";
import { QUESTION_TYPES } from "@/utils/const"
import { NormalUpload, NormalEditor } from "./utils"

const props = defineProps({
    config: {
        type: Array,
        default: () => [],
    }
})

const model = defineModel( { default: {} })

const schema = ref({})

const form = createForm({
    values: model.value,
});
const FormItem = connect(
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


const { SchemaField } = createSchemaField({
    components: {
        Input,
        Select,
        FormItem,
        Radio,
        Checkbox,
        NormalUpload,
        NormalEditor,
    },
});

watch(() => props.config, (config) => {
    console.log('config', config)
    const initialValues = {}
    const properties = (config||[]).reduce((sum, item) => {
        console.log(111, item.id, item.label, item.dep, item.options, item)
        const options = (item.options || []).map(item => ({ ...item, label: item.label, value: item.id }))
        const property = {
            title: item.label + '-' + QUESTION_TYPES.get(item.type),
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
                labelCol: { span: 5 },
            },
            description: item.desc,
            'x-validator': { required: true, message: '必填项' },

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
        if (item.type === QUESTION_TYPES.CHECKBOX) {
            defaultValue = options.filter(item => item.checked).map(item => item.value)
        } else if ([QUESTION_TYPES.RADIO, QUESTION_TYPES.SELECT].includes(item.type)) {
            defaultValue = options.find(item => item.checked)?.value
        }
        console.log('defaultValue', options, item.label, defaultValue)
        if (defaultValue) {
            initialValues[item.id] = defaultValue
        }
        return sum
    }, {})
    schema.value = {
    type: "object",
    properties,
  }
  console.log('initialValues', initialValues, Object.assign(initialValues, model.value))
    const formData = Object.assign(model.value, initialValues, model.value)
        // form.setValues(formData)
        model.value = formData
}, {
    immediate: true,
})

console.log(111, form)

</script>
<style lang="less">
.order-buffet-client-form {
    .ant-form-item-extra {
        white-space: pre-wrap;
    }

    .ant-form-item-label {
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