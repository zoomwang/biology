import { ref } from "vue";

export function sendCode(boo) {
  const isSendCode = ref(false);
  if (typeof boo == "booelan") {
    isSendCode.value = boo;
    return;
  } else {
    isSendCode.value = !isSendCode.value;
  }
  return isSendCode;
}

export function useCountDown() {
  const countdown = ref(6);
  sendCode(true);
  let se = setInterval(() => {
    if (countdown.value <= 1) {
      clearInterval(se);
      countdown.value = 6;
      sendCode(false);
      console.log(countdown)
      return countdown;
    }
    --countdown.value;
    return countdown;
  }, 1000);
}
