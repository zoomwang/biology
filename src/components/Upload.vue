<template>
  <div class="clearfix">
    <a-upload
      v-model:file-list="fileList"
      :customRequest="customRequest"
      :list-type="listType"
      :maxCount="maxCount"
      @preview="handlePreview"
      @change="handleChange"
      v-bind="$attrs"
    >
      <template v-if="showUploadBtn">
        <slot name="upload-button">
          <div>
          <plus-outlined />
          <div style="margin-top: 8px">Upload</div>
        </div>
        </slot>
      </template>
    </a-upload>
    <a-modal
      :open="previewVisible"
      :title="previewTitle"
      :footer="null"
      @cancel="handleCancel"
    >
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { PlusOutlined } from "@ant-design/icons-vue";
import { computed, ref, watch } from "vue";
import type {
  UploadProps,
  UploadFile,
  UploadChangeParam,
} from "ant-design-vue";
import { uploadFile } from "@/services/common";

const props = defineProps({
  listType: {
    type: String,
    default: "picture-card",
  },
  maxCount: {
    type: Number,
  },
  onChange: Function,
});


const customRequest = ({ file, onProgress, onSuccess, onError }) => {
  const form = new FormData();
  form.append("file", file);
  uploadFile(form, {
    onUploadProgress: ({ total, loaded }) => {
      onProgress(
        { percent: Math.round((loaded / total) * 100).toFixed(2) },
        file
      );
    },
  })
    .then(({ data: response }) => {
      onSuccess(response, file);
    })
    .catch(onError);

  return {
    abort() {
      console.log("upload progress is aborted.");
    },
  };
};

const fileList = defineModel<UploadFile[]>("fileList", { default: [] });

const modelValue = defineModel<string | string[]>("value");
watch(
  () => modelValue.value,
  value => {
    if (!fileList.value.length && value) {
      fileList.value = (Array.isArray(value) ? value : [value]).map(url => {
        return {
          uid: url,
          name: url,
          url,
          status: "done",
        };
      }) as UploadFile[];
    }
  },
  {
    immediate: true,
  }
);
const showUploadBtn = computed(() => {
  if (!props.maxCount) return true;
  if (props.maxCount === 1) return true;
  if (fileList.value.length < props.maxCount) return true;
  return false;
});

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function getFileListValue(fileList) {
  const modelValue = fileList
    .filter(item => item.status === "done")
    .map(item => item.response?.url || item.url);
  return props.maxCount === 1 ? modelValue[0] : modelValue;
}

function handleChange(info: UploadChangeParam) {
  if (info.file.status === "done") {
    modelValue.value = getFileListValue(info.fileList);
  }
  if (props.onChange) props.onChange(modelValue.value);
}

const previewVisible = ref(false);
const previewImage = ref("");
const previewTitle = ref("");

const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = "";
};
const handlePreview = async (file: UploadProps["fileList"][number]) => {
  if (!file.url && !file.preview) {
    file.preview = (await getBase64(file.originFileObj)) as string;
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value =
    file.name || file.url.substring(file.url.lastIndexOf("/") + 1);
};
</script>
<style scoped>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
