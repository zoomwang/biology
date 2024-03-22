<script setup>
import { ref, defineProps } from "vue";
import { notification } from "ant-design-vue";
import $localStorage from "../hooks/localStorage";

const props = defineProps(['onSuccess', 'fileList'])
const header = {
  Authorization: $localStorage.getItem('access_token')
};
const fileList = ref([{
  name: '附件1', url: props.fileList
}]);
const handleChange = (info) => {
  const fileMaxSize = 1024*1024*100
  let resFileList = [...info.fileList];

  // 1. Limit the number of uploaded files
  //    Only to show two recent uploaded files, and old ones will be replaced by the new
  resFileList = resFileList.slice(-2);

  // 2. read from response and show file link
  resFileList = resFileList.map((file) => {
    if (file.response) {
      // Component will show file.url as link
      file.url = file.response.url;
    }
    if (file.size > fileMaxSize) {
      notification.error({
        description: "上传文件大小超出100M限制",
      });
      return;
    }
    return file;
  });
  fileList.value = resFileList;
  if(typeof props.onSuccess == 'function'){
    props.onSuccess(fileList?.value[0]?.response?.data?.url); 
  } 
};
</script>

<template>
  <!-- <a-form-item class="f-fl"> -->
    <a-upload
      action="/sys/file/upload"
      :multiple="true"
      :file-list="fileList"
      @change="handleChange"
      :headers="header"
      accept=".doc,.docx,.xml,.pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    >
      <a-button>
        <upload-outlined></upload-outlined>
        上传文件
      </a-button>
    </a-upload>
  <!-- </a-form-item> -->
</template>
<style lang="scss" scoped>
</style>
