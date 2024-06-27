<script lang="jsx">
import { reactive, ref } from "vue";
import Options from "./options.vue";
import Editor from "@/components/Editor.vue";
import { QUESTION_TYPES, VALUE_MODE_TYPES } from "@/utils/const";

export default {
  props: {
    type: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const labelCol = { style: { width: "5em" } };
    const labelAutoWidthCol = {
      style: { width: "auto", minWidth: "auto !important" },
    };
    const wrapperCol = { span: 24 };
    const formState = reactive({
      name: "xxx",
      required: false,
      rel: {
        key: undefined,
        value: undefined,
      },
      options: [],
      valueMode: VALUE_MODE_TYPES.PLACEHOLDER,
    });

    const rules = {
      required: { required: true, message: "必填项" },
    };

    const renderOptions = ({ showKeys = "" } = {}) => {
      return (
        <a-form-item name="options" label="选项">
          <Options show-keys={showKeys}></Options>
        </a-form-item>
      );
    };

    const renderPrice = () => {
      return (
        <a-form-item name="price" label="价格">
          <a-input-number
            style="width: 100%"
            min={0}
            v-model:value={formState.price}
          />
        </a-form-item>
      );
    };

    const renderBase = () => {
      const nameJsx = (
        <a-form-item name="name" label="问题名称" rules={[rules.required]}>
          <a-input v-model:value={formState.name} />
        </a-form-item>
      );
      const requiredJsx = (
        <a-form-item name="required" label="是否必填">
          <a-checkbox v-model:checked={formState.required} />
        </a-form-item>
      );

      const relKey = (
        <a-form-item name="rel.key">
          <a-select
            v-model:value={formState.rel.key}
            placeholder="清选择前置条件问题"
          >
            <a-select-option value="shanghai">Zone one</a-select-option>
            <a-select-option value="beijing">Zone two</a-select-option>
          </a-select>
        </a-form-item>
      );
      const relValue = (
        <a-form-item name="rel.value">
          <a-select
            v-model:value={formState.rel.value}
            placeholder="清选择前置条件的问题选中值"
          >
            <a-select-option value="shanghai">Zone one</a-select-option>
            <a-select-option value="beijing">Zone two</a-select-option>
          </a-select>
        </a-form-item>
      );
      const relJsx = (
        <a-form-item label="依赖配置">
          <a-row gutter={8}>
            <a-col span={12}>{relKey}</a-col>
            <a-col span={12}>{relValue}</a-col>
          </a-row>
        </a-form-item>
      );

      const descJsx = (
        <a-form-item name="desc" label="描述">
          <a-textarea
            v-model:value={formState.desc}
            placeholder="请输入"
            auto-size={{ minRows: 2, maxRows: 6 }}
            show-count
            maxlength={512}
          />
        </a-form-item>
      );
      return [nameJsx, requiredJsx, relJsx, descJsx];
    };

    const renderRadio = () => {
      return renderOptions({ showKeys: "price,isPriceMode" });
    };
    const renderCheckbox = () => {
      return renderOptions({ showKeys: "price,checked,required,isPriceMode" });
    };
    const renderText = () => {
      const valueTypeJsx = (
        <a-form-item label="属性类型" name="valueType">
          <a-select
            v-model:value={formState.valueType}
            placeholder="清选择属性类型"
            style="width: 100%"
          >
            <a-select-option value="字符">字符</a-select-option>
            <a-select-option value="整型">整型</a-select-option>
            <a-select-option value="小数">小数</a-select-option>
          </a-select>
        </a-form-item>
      );

      const minJsx = (
        <a-form-item label="min" name="min" label-col={labelAutoWidthCol}>
          <a-input-number
            v-model:value={formState.min}
            min={0}
            max={formState.max}
            style="width: 100%"
          />
        </a-form-item>
      );
      const maxJsx = (
        <a-form-item label="max" name="min" label-col={labelAutoWidthCol}>
          <a-input-number
            v-model:value={formState.max}
            min={formState.min}
            style="width: 100%"
          />
        </a-form-item>
      );

      return [
        renderPrice(),
        <a-row gutter={8}>
          <a-col span={12}>{valueTypeJsx}</a-col>
          <a-col span={6}>{minJsx}</a-col>
          <a-col span={6}>{maxJsx}</a-col>
        </a-row>,
      ];
    };
    const renderTextarea = () => {};
    const renderRange = () => {};
    const renderSelect = () => {
      return renderOptions();
    };
    const renderFileUpload = () => {};
    const renderRichText = () => {
      const oldValueMode = formState.valueMode;
      const valueModeJsx = (
        <a-radio-group
          style="margin-bottom: 16px"
          v-model:value={formState.valueMode}
          options={VALUE_MODE_TYPES.toObjectArray()}
          onChange={() => {
            formState[formState.valueMode] = formState[oldValueMode];
            formState[oldValueMode] = "";
          }}
        />
      );
      const editorJsx = (
        <Editor v-model:value={formState[formState.valueMode]}></Editor>
      );
      return [valueModeJsx, editorJsx];
    };

    const renderControlMap = {
      [QUESTION_TYPES.RADIO]: renderRadio,
      [QUESTION_TYPES.CHECKBOX]: renderCheckbox,
      [QUESTION_TYPES.TEXT]: renderText,
      [QUESTION_TYPES.TEXTAREA]: renderTextarea,
      [QUESTION_TYPES.RANGE]: renderRange,
      [QUESTION_TYPES.SELECT]: renderSelect,
      [QUESTION_TYPES.FILE]: renderFileUpload,
      [QUESTION_TYPES.RICH_TEXT]: renderRichText,
    };

    const render = () => {
      const baseJsx = renderBase();
      const controlJsx = renderControlMap[props.type]();
      return (
        <a-form model={formState} label-col={labelCol} wrapper-col={wrapperCol}>
          <div>
            {JSON.stringify(formState)}
            type:{props.type}
            {baseJsx}
            {controlJsx}
          </div>
        </a-form>
      );
    };
    return () => render();
  },
};
</script>
