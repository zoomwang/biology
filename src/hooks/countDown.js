import { ref } from "vue";
import config from "../utils/config";

export default {
  setup() {
    const count = ref(config.timeCount)

    function countDown(callback) {
      // 在 JavaScript 中需要 .value
      let se = setInterval(() => {
        if (count.value <= 1) {
          clearInterval(se);
          count.value = config.timeCount;
          console.log(count)
        }
        --count.value;
      }, 1000);
    }

    // 不要忘记同时暴露 increment 函数
    return {
      count,
      countDown
    }
  }
}