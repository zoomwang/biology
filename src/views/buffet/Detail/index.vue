<template>
  <div>
    <a-spin :spinning="loading">
      <a-descriptions layout="vertical" bordered v-if="!loading">
        <a-descriptions-item :span="3" label="设备名称">{{
          baseInfo.deviceName
        }}</a-descriptions-item>
        <a-descriptions-item :span="3" label="设备型号">{{
          baseInfo.deviceModel
        }}</a-descriptions-item>
        <a-descriptions-item :span="3" label="测试项目">
          <span v-dompurify-html="detailInfo.testProject"></span>
        </a-descriptions-item>
        <a-descriptions-item :span="3" label="样品要求">
          <span v-dompurify-html="detailInfo.sampleRequirement"></span>
        </a-descriptions-item>
        <a-descriptions-item :span="3" label="结果展示">
          <span v-dompurify-html="detailInfo.resultShow"></span>
        </a-descriptions-item>
        <a-descriptions-item :span="3" label="常见问题" v-if="qaList.length">
          <a-list
            size="small"
            :bordered="false"
            :data-source="qaList"
          >
            <template #renderItem="{ item }">
              <a-list-item>
                <div>
                  <a-space class="">
                    <QuestionCircleOutlined />
                    <h2>{{ item.question }}</h2>
                  </a-space>
                  <div style="margin: 16px 0" v-dompurify-html="item.answer"></div>
                </div>
              </a-list-item>
            </template>
          </a-list>
        </a-descriptions-item>
      </a-descriptions>
      <a-empty v-else />
    </a-spin>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { fetchConfig } from "@/services/buffet-build";
import { computed, onMounted, ref } from "vue";
import { useRequest } from "vue-request";
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
const route = useRoute();
const { orderTypeId } = route.params;
console.log(11, orderTypeId);

const { data, loading, run } = useRequest(
  () => fetchConfig({ orderTypeId }).then(res => res.data),
  {
    manual: true,
  }
);

const baseInfo = computed(() => data.value?.baseInfo || {});
const detailInfo = computed(() => data.value?.detailInfo || {});
const qaList = computed(() => {
  return (detailInfo.value.qaList || []).filter(item => item.question)
});

onMounted(() => {
  run();
});
</script>
