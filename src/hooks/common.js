import { ref } from "vue";
import config from "../utils/config";
import { notification, Form } from "ant-design-vue";
import { sendSysCode,  } from "../services/user";
import { getOfficeInfo } from "@/services/process";

export function useSendCode(boo) {
  const isSendCode = ref(false);
  const changeSt = function() {
    if (typeof boo == "booelan") {
      isSendCode.value = boo;
      return;
    } else {
      isSendCode.value = !isSendCode.value;
    }
  }
  return {
    isSendCode,
    changeSt
  };
}

export async function useOfficeInfos() {
  const res = await getOfficeInfo();
  return {
    getValue: () => {
      return res?.data;
    }
  };
}

export function useCountDown(callback) {
  const count = ref(config.timeCount);
  const countDown = function () {
    let se = setInterval(() => {
      if (count.value <= 1) {
        clearInterval(se);
        count.value = config.timeCount;
        typeof callback == 'function' && callback();
        console.log(count)
      }
      --count.value;
    }, 1000);
  }
  return {
    count,
    countDown
  };
}

export function useGetVerifiCode(formState, callback) {
  const pattern = /^1[3456789]\d{1}$/;
  const getVerifiCode = async function() {
    if (!formState?.mobile || pattern.test(formState?.mobile)) {
      notification.error({
        message: "",
        description: "请填写正确的手机号",
      });
      return;
    }
    try {
      const res = await sendSysCode({
        mobile: formState?.mobile
      });
      if (res?.code == 0) {
        typeof callback == 'function' && callback();
      }
    } catch(err) {
      alert(err);
    }
  }
  return {
    getVerifiCode
  };
}
