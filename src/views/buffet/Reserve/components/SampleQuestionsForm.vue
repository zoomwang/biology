<template>
  <div class="order-reserve-form-sample-questions-wrap">
    <a-form v-for="form in formData" :model="form" :key="form.id" :labelCol="{ span: 5 }">
      <a-form-item label="样品数量" :rules="{
        required: true,
        message: '请输入',
        trigger: 'change',
      }">
        <a-input type="number" :min="1" v-model:value.number="form.sampleNumber" placeholder="请输入样品数量" :max-length="25"
          style="width: 120px" />
      </a-form-item>
      <a-form-item label="样品编号" :rules="{
        message: '请输入',
        trigger: 'change',
      }">
        <a-input v-for="(item, idx) in form.sampleNumber" :key="idx" placeholder="请输入"
          style="width: 120px; margin-right: 10px; margin-bottom: 10px" v-model:value="form.sampleIds[idx]">
          <template #prefix> {{ idx + 1 }}- </template>
        </a-input>
      </a-form-item>
      <ClientForm :model="form" :config="sampleQuestions"></ClientForm>
    </a-form>
  </div>
</template>

<script setup lang="jsx">
import { ref, defineProps, watch } from "vue";
import ClientForm from "@/components/DynamicQuestion/ClientForm/index.vue";
const props = defineProps({
  model: {
    type: Array,
    default: () => ([]),
  },
  sampleQuestions: {
    typeof: Array,
    default: () => [],
  },
})
const formData = ref([]);
watch(() => props.model, (val) => {
  formData.value = val
}, {
  immediate: true
})

</script>
<style lang="less"></style>