<template>
  <div>
    <a-form :model="formData" :labelCol="{ span: 5 }">
      <a-form-item label="实验有问题联系谁?" :rules="[{ required: true, message: '请输入联系人!' }]">
        <a-input v-model:value="formData.contactName" />
      </a-form-item>
      <a-form-item label="联系号码" :rules="[{ required: true, message: '请输入联系号码!' }]">
        <a-input v-model:value="formData.contactsPhone" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { reactive, ref, defineProps, watch } from "vue";
import { getOrderList } from "@/services/process";

const props = defineProps({
  model: {
    type: Object,
    default: () => ({}),
  }
})
const formData = ref({});
watch(() => props.model, (val) => {
  formData.value = val
}, {
  immediate: true
})

</script>