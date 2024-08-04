import Upload from "@/components/Upload.vue"
import Editor from "@/components/Editor.vue"
import { Button } from "ant-design-vue";
import { UploadOutlined } from "@ant-design/icons-vue";
export const NormalUpload = (props, { attrs }) => {
    const { templateFile } = props.data
    const slots = {
        "upload-button": () => (
            <Button>
                <UploadOutlined></UploadOutlined>
                上传文件
            </Button>
        ),
    };
    return <div style="display: flex;align-items: center;" >
        <Upload {...props} {...attrs} style="display: flex;align-items: center;" listType="text"
            maxCount={1} v-slots={slots} >
        </Upload>
        {templateFile &&
            <a style="margin-left: 16px;" href={templateFile} download >模板下载</a>
        }
    </div>
}

export const NormalEditor = (props, { attrs }) => {
    return <div style="display: inline-block;">
        <div>
            <Editor  {...props} {...attrs} style="height: 500px; max-height: 100%;" ></Editor>
        </div>
    </div>
}