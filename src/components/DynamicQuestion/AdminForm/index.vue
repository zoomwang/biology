<script lang="jsx">
import { reactive, ref, watch, computed } from "vue";
import Options from "./options.vue";
import Editor from "@/components/Editor.vue";
import Upload from "@/components/Upload.vue";
import { QUESTION_TYPES, VALUE_MODE_TYPES, VALUE_TYPES } from "@/utils/const";
import { UploadOutlined } from "@ant-design/icons-vue";

export default {
  props: {
    type: {
      type: Number,
      required: true,
    },
    model: {
      type: Object,
    },
    relOptions: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const valueTypeOptions = VALUE_TYPES.toObjectArray();
    const labelCol = { style: { width: "150px" } };
    const labelAutoWidthCol = {
      style: { width: "auto", minWidth: "auto !important" },
    };
    const wrapperCol = { span: 12 };
    const formState = ref({});

    watch(
      () => props.model,
      model => {
        model.valueMode = model.defaultValue
          ? VALUE_MODE_TYPES.DEFAULT_VALUE
          : VALUE_MODE_TYPES.PLACEHOLDER;
        formState.value = model;
      },
      { immediate: true }
    );

    const currentRelIdOptions = computed(() => {
      return props.relOptions.filter(item => item.id !== props.model.id);
    });
    const currentRelValueOptions = computed(() => {
      return (
        currentRelIdOptions.value.find(
          item => item.id === formState.value.dep.depId
        )?.options || []
      );
    });
    watch(
      () => currentRelIdOptions.value,
      options => {
        if (!options.some(option => option.id === formState.value.dep.depId)) {
          formState.value.dep.depId = "";
          formState.value.dep.value = "";
        }
      }
    );
    watch(
      () => currentRelValueOptions.value,
      options => {
        if (!options.some(option => option.id === formState.value.dep.value)) {
          formState.value.dep.value = "";
        }
      }
    );

    const rules = {
      required: { required: true, message: "必填项" },
    };

    const renderOptions = ({ showKeys = "", type="" } = {}) => {
      return (
        <a-form-item name="options" label="选项">
          <Options
            type={type}
            v-model:options={formState.value.options}
            show-keys={showKeys}
          ></Options>
        </a-form-item>
      );
    };

    const renderPrice = () => {
      return (
        <a-form-item name="price" label="价格">
          <a-input-number
            style="width: 100%"
            min={0}
            v-model:value={formState.value.price}
          />
        </a-form-item>
      );
    };

    const renderValueMode = () => {
      const oldValueMode = formState.value.valueMode;
      const valueModeJsx = (
        <a-form-item name="valueMode">
          <a-radio-group
            style="margin-bottom: 16px"
            v-model:value={formState.value.valueMode}
            options={VALUE_MODE_TYPES.toObjectArray()}
            onChange={() => {
              formState.value[formState.value.valueMode] =
                formState.value[oldValueMode];
              formState.value[oldValueMode] = "";
            }}
          />
        </a-form-item>
      );
      return valueModeJsx;
    };

    const renderBase = () => {
      const nameJsx = (
        <a-form-item name="label" label="问题名称" rules={[rules.required]}>
          <a-input v-model:value={formState.value.label} />
        </a-form-item>
      );
      const requiredJsx = (
        <a-form-item name="required" label="是否必填">
          <a-checkbox v-model:checked={formState.value.required} />
        </a-form-item>
      );
      const relKey = (
        <a-form-item name="dep.depId">
          <a-select
            v-model:value={formState.value.dep.depId}
            placeholder="请选择前置条件问题"
            options={currentRelIdOptions.value}
            field-names={{ label: "label", value: "id", options: "children" }}
          ></a-select>
        </a-form-item>
      );
      const relValue = (
        <a-form-item name="dep.value">
          <a-select
            v-model:value={formState.value.dep.value}
            placeholder="请选择前置条件的问题选中值"
            options={currentRelValueOptions.value}
            field-names={{ label: "label", value: "id" }}
          ></a-select>
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
            v-model:value={formState.value.desc}
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
      return renderOptions({ showKeys: "price,checked,isPriceMode", type: QUESTION_TYPES.RADIO });
    };
    const renderCheckbox = () => {
      return renderOptions({ showKeys: "price,checked,required,isPriceMode", type: QUESTION_TYPES.CHECKBOX });
    };
    const renderText = () => {
      const valueTypeJsx = (
        <a-form-item label="属性类型" name="valueType">
          <a-select
            v-model:value={formState.value.valueType}
            placeholder="请选择属性类型"
            style="width: 100%"
            options={valueTypeOptions}
          />
        </a-form-item>
      );

      return [renderPrice(), valueTypeJsx];
    };
    const renderTextarea = () => {
      const valueModeJsx = renderValueMode();
      const textareaJsx = (
        <a-form-item name={formState.value.valueMode}>
          <a-textarea
            v-model:value={formState.value[formState.value.valueMode]}
            placeholder="请输入"
            auto-size={{ minRows: 3, maxRows: 6 }}
            show-count
            maxlength={512}
          />
        </a-form-item>
      );
      const configJsx = (
        <a-form-item label="配置">
          {valueModeJsx}
          {textareaJsx}
        </a-form-item>
      );
      return [renderPrice(), configJsx];
    };
    const renderRange = () => {
      const valueTypeJsx = (
        <a-form-item label="属性类型" name="valueType">
          <a-select
            v-model:value={formState.value.valueType}
            placeholder="请选择属性类型"
            style="width: 100%"
            options={valueTypeOptions}
          />
        </a-form-item>
      );

      const minJsx = (
        <a-form-item label="min" name="min" label-col={labelAutoWidthCol}>
          <a-input-number
            v-model:value={formState.value.minValue}
            min={0}
            max={formState.value.maxValue}
            style="width: 100%"
          />
        </a-form-item>
      );
      const maxJsx = (
        <a-form-item label="max" name="min" label-col={labelAutoWidthCol}>
          <a-input-number
            v-model:value={formState.value.maxValue}
            min={formState.value.minValue}
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
    const renderSelect = () => {
      return renderOptions({ showKeys: "price,isPriceMode" });
    };
    const renderFileUpload = () => {
      const slots = {
        "upload-button": () => (
          <a-button>
            <UploadOutlined></UploadOutlined>
            上传模板
          </a-button>
        ),
      };
      const uploadJsx = (
        <Upload
          v-model:value={formState.value.templateFile}
          listType="text"
          maxCount={1}
          v-slots={slots}
          style="display: flex;item-align: center;"
        ></Upload>
      );
      const acceptExtJsx = (
        <a-input
          placeholder="支持扩展名，小写逗号分隔"
          v-model:value={formState.value.fileAccessExt}
        ></a-input>
      );
      const configJsx = (
        <a-space style="display: flex" align="start">
          {acceptExtJsx}
          {uploadJsx}
        </a-space>
      );
      return [renderPrice(), configJsx];
    };
    const renderRichText = () => {
      const valueModeJsx = renderValueMode();
      const editorJsx = (
        <a-form-item name={formState.value.valueMode}>
          <Editor
            style="height: 420px"
            v-model:value={formState.value[formState.value.valueMode]}
          ></Editor>
        </a-form-item>
      );
      const configJsx = (
        <a-form-item label="配置">
          {valueModeJsx}
          {editorJsx}
        </a-form-item>
      );
      return [renderPrice(), configJsx];
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
        <a-form
          model={formState.value}
          label-col={labelCol}
          wrapper-col={wrapperCol}
        >
          <div>
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
