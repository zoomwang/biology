<template>
  <div style="border: 1px solid #ccc" class="editor-wrap">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      :modelValue="valueHtml"
      @onChange="handleChange"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      class="editor-container"
    />
  </div>
</template>
<script setup>
import {
  onBeforeUnmount,
  ref,
  defineModel,
  shallowRef,
  computed,
  watch,
} from "vue";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

const valueHtml = defineModel("value");
const props = defineProps({
  placeholder: String,
});

const mode = "simple";
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
const emit = defineEmits(["change"]);

const toolbarConfig = {};
const editorConfig = computed(() => ({
  placeholder: props.placeholder,
}));

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const handleChange = (editor) => {
  const html = editor.getHtml();
  if (valueHtml.value === html) return;
  emit("change", html);
  emit("update:value", html);
};
</script>    

<style lang="less" scoped>
.editor-wrap {
  display: flex;
  flex-direction: column;
}
.editor-container {
  flex: 1;
  overflow: hidden;
  min-height: 120px;
}
</style>