<script setup>
import { ref, computed, reactive, defineComponent, watch } from "vue";
import { useStorage } from "@/hooks/useStorage";
import $localStorage from "@/hooks/localStorage";
import Menu from "./components/menu.vue";
import banner from "../../assets/home_benner.png";
const key = useStorage("menu");
const state = reactive({
  mode: "inline",
  theme: "light",
  selectedKeys: ["userData"],
  openKeys: ["userData"],
});
const menuType = ref($localStorage.getItem("menu"));
watch(key, async (newdata, olddata) => {
  menuType.value = newdata;
});
</script>

<template>
  <!-- 用户注册资料 -->
  <main class="d-flex home-wrap" style="position: relative">
    <div style="position: relative; width: 1280px; left: -40px">
      <img :src="banner" width="1280" height="250" />
      <div data-v-5c81cf27="" class="bannerBottom">
        <div data-v-5c81cf27="" class="bannerBottomWrap">
          <div data-v-5c81cf27="" class="banner_bottom_once">
            <img
              data-v-5c81cf27=""
              src="data:image/png;base64,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"
              alt=""
            />
            <div data-v-5c81cf27="" class="banner_bottom_once_content">
              <div data-v-5c81cf27="" class="once_contentText">
                同步辐射
                <img
                  data-v-5c81cf27=""
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAgCAYAAACcuBHKAAAAAXNSR0IArs4c6QAAALNJREFUWEft1sEJwCAMBdD+lXSCTtaO1gF0phYPQo8/yQ9IqWeTPBKIYlvgYAHD9iPmFOhO1FrvEdR7p2PYUdMJSykHgDMDQiNG8SyICZEFMSMyIC6EGuJGKCEhhAoSRiggEkQUIkNEIFKEF/I9xHutA9hbaxfziMk64QUMpAQRAUgQUUAYoQCEECqAG6EEuBBqgBmRATAhsgAmxPzyWzYhsy1NCDah555kY3oKv2N+xOzGAynkayE+GLMDAAAAAElFTkSuQmCC"
                  alt=""
                  style="
                    width: 17px;
                    height: 13px;
                    color: rgb(51, 51, 51);
                    opacity: 0.3;
                    margin-left: 21px;
                  "
                />
              </div>
              <div data-v-5c81cf27="" class="context_bottom">够快够便宜</div>
            </div>
          </div>
          <div data-v-5c81cf27="" class="banner_bottom_once">
            <img
              data-v-5c81cf27=""
              src="data:image/png;base64,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"
              alt=""
            />
            <div data-v-5c81cf27="" class="banner_bottom_once_content">
              <div data-v-5c81cf27="" class="once_contentText">
                科研合伙人
                <img
                  data-v-5c81cf27=""
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAgCAYAAACcuBHKAAAAAXNSR0IArs4c6QAAALNJREFUWEft1sEJwCAMBdD+lXSCTtaO1gF0phYPQo8/yQ9IqWeTPBKIYlvgYAHD9iPmFOhO1FrvEdR7p2PYUdMJSykHgDMDQiNG8SyICZEFMSMyIC6EGuJGKCEhhAoSRiggEkQUIkNEIFKEF/I9xHutA9hbaxfziMk64QUMpAQRAUgQUUAYoQCEECqAG6EEuBBqgBmRATAhsgAmxPzyWzYhsy1NCDah555kY3oKv2N+xOzGAynkayE+GLMDAAAAAElFTkSuQmCC"
                  alt=""
                  style="
                    width: 17px;
                    height: 13px;
                    color: rgb(51, 51, 51);
                    opacity: 0.3;
                    margin-left: 21px;
                  "
                />
              </div>
              <div data-v-5c81cf27="" class="context_bottom">
                高校兼职招贤纳士
              </div>
            </div>
          </div>
          <div data-v-5c81cf27="" class="banner_bottom_once">
            <img
              data-v-5c81cf27=""
              src="data:image/png;base64,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"
              alt=""
            />
            <div data-v-5c81cf27="" class="banner_bottom_once_content">
              <div data-v-5c81cf27="" class="once_contentText">
                预存优惠
                <img
                  data-v-5c81cf27=""
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAgCAYAAACcuBHKAAAAAXNSR0IArs4c6QAAALNJREFUWEft1sEJwCAMBdD+lXSCTtaO1gF0phYPQo8/yQ9IqWeTPBKIYlvgYAHD9iPmFOhO1FrvEdR7p2PYUdMJSykHgDMDQiNG8SyICZEFMSMyIC6EGuJGKCEhhAoSRiggEkQUIkNEIFKEF/I9xHutA9hbaxfziMk64QUMpAQRAUgQUUAYoQCEECqAG6EEuBBqgBmRATAhsgAmxPzyWzYhsy1NCDah555kY3oKv2N+xOzGAynkayE+GLMDAAAAAElFTkSuQmCC"
                  alt=""
                  style="
                    width: 17px;
                    height: 13px;
                    color: rgb(51, 51, 51);
                    opacity: 0.3;
                    margin-left: 21px;
                  "
                />
              </div>
              <div data-v-5c81cf27="" class="context_bottom">
                返利灵活最高14%
              </div>
            </div>
          </div>
          <div data-v-5c81cf27="" class="banner_bottom_once">
            <img
              data-v-5c81cf27=""
              src="data:image/png;base64,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"
              alt=""
            />
            <div data-v-5c81cf27="" class="banner_bottom_once_content">
              <div data-v-5c81cf27="" class="once_contentText">
                电镜云现场
                <img
                  data-v-5c81cf27=""
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAgCAYAAACcuBHKAAAAAXNSR0IArs4c6QAAALNJREFUWEft1sEJwCAMBdD+lXSCTtaO1gF0phYPQo8/yQ9IqWeTPBKIYlvgYAHD9iPmFOhO1FrvEdR7p2PYUdMJSykHgDMDQiNG8SyICZEFMSMyIC6EGuJGKCEhhAoSRiggEkQUIkNEIFKEF/I9xHutA9hbaxfziMk64QUMpAQRAUgQUUAYoQCEECqAG6EEuBBqgBmRATAhsgAmxPzyWzYhsy1NCDah555kY3oKv2N+xOzGAynkayE+GLMDAAAAAElFTkSuQmCC"
                  alt=""
                  style="
                    width: 17px;
                    height: 13px;
                    color: rgb(51, 51, 51);
                    opacity: 0.3;
                    margin-left: 21px;
                  "
                />
              </div>
              <div data-v-5c81cf27="" class="context_bottom">最快可约当日</div>
            </div>
          </div>
        </div>
      </div>

      <div data-v-5c81cf27="" class="OnlineTest">
        <span data-v-5c81cf27="" class="OnlineTestTitle">线上测试流程</span>
        <div data-v-5c81cf27="" class="OnlineTestContext">
          多测试领域 满足多元化需求
        </div>
        <div data-v-5c81cf27="" class="OnlineTestWrap">
          <div data-v-5c81cf27="" class="OnlineTestBody">
            <div data-v-5c81cf27="" class="OnlineTestOnce fl">
              <div
                data-v-5c81cf27=""
                class="fl"
                style="display: inline-block; width: 162px; height: 226px"
              >
                <img
                  data-v-5c81cf27=""
                  class="OnlineTestOnceIMG"
                  src="https://www.ceshihui.cn/assets/icon-%E7%99%BB%E5%BD%95-05214294.png"
                  alt=""
                  style="width: 118px; height: 134px"
                />
                <div data-v-5c81cf27="" class="OnlineTestOnceTitle">
                  登录/注册
                </div>
                <div data-v-5c81cf27="" style="margin-top: 16px">
                  <div data-v-5c81cf27="" class="OnlineTestOnceText">
                    注册账号
                  </div>
                  <div data-v-5c81cf27="" class="OnlineTestOnceText">
                    随时随地的预约实验
                  </div>
                </div>
              </div>
              <img
                data-v-5c81cf27=""
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAjCAYAAABl/XGVAAAAAXNSR0IArs4c6QAAA1xJREFUSEu9l8trE1EUxs+knSY+SjEqaCuKz0ULLhrFlRj/AXeJIvgqVVC0XReFThQUoyJo8Ul3orXVjdZVbRXRItJRq6aVGtPUvGomMY/JZCaZe+/INJ3UVNE2yTi7gRl+3O+c+53vUFDwKBQwDgqgHQAcAEy7AkAphd8U/0blf2UYgxV2GPzmVRXLEWfgKpeTmk8JwtZaMDAUKR4x82cOpiiU5RZbKX+hq5z71jYuWVi1JcHLb88+GmL95lWye8UGBHYgpZ4yB7MpFZYG1thhq28219CXF5soQ0pSlJSEb9/snzj58XNUMNZk5OftVgxU8bJOwSxHhmjTesl0ffe20U21FXVGmgJMFAhEMMTT5O1oUDhwoc/jEcGDRsCGipVVhVH1jIuuBt7UebAx0bCGLihPJInhe5zEuCQ66ng4/sQfrZLd298hsNvmLSsFoFD1zAhdbeZNnbt+h6nkdIaAP0JIUsRXLveNnQ6Gq0UAL5qvrHOCqUCEp2UVyCA7EWm69iLkg5Ugs6G5d+ucYbmmBZiWNRxOyc1nHrx55o+KsnsyhaDn37LOC6YVMyURCEQITkjo/MmHLieSlmamZGWs+G/XoyiYCpWxAn4OQ1JU+gc9sSOdL32TOVl7MTDMH02gaJgmaziOgUviQDAmH7r09OugX6iUR1wuDD12FVhgdSXBNFl5Ue1WLPMiZlruDXcsADGr9tRsWcsCU6FZpMlKegc+Ro7dfR+Kzpa1bDBN1skYVjt23MelD7Z1f2PpjZuzbMgxVceywjRZEwKB4A8i/Uij461drnvVwGefMzuxLjAVmpEVGJ9E8rAv1XiqK/rFfWVDVjeYCvRxCLwc2re/5/UDL1j1g+VOhuVhH6/vybSaxQXceuL+pzu61Ez1zqluTGCvL54+0HZXp27U7hkvkd7+Dzres7yDpLGjpWv4qi4OosqW80YlEIoLTRf7Jl7p4o1510/jgcHxxGHdXF+bZ7yEzjsHgk4uZCj/PJuZ1EqYE7KHT/e8GdBlUhdmkGTTtRcT+mQQNV0FIoQkSk9Xc8uNUQEdbe8uOTfOJOIb9q1jG+voFXomYgBbd4WlYZ2xY099s3mxzln/1y3m3N7VlmWLjBYuhYYuPmbflX+LUYfPf9vP8quEvpvnT77JQ9K2wZyZAAAAAElFTkSuQmCC"
                alt=""
                class="block fl OnlineTestPoint"
                style="margin: 47px 0px 0px 10px"
              />
            </div>
          </div>
          <div data-v-5c81cf27="" class="OnlineTestBody">
            <div data-v-5c81cf27="" class="OnlineTestOnce fl">
              <div
                data-v-5c81cf27=""
                class="fl"
                style="display: inline-block; width: 162px; height: 226px"
              >
                <img
                  data-v-5c81cf27=""
                  class="OnlineTestOnceIMG"
                  src="https://www.ceshihui.cn/assets/icon-%E5%8A%A0%E5%85%A5%E4%BC%9A%E5%91%98-5177ce2e.png"
                  alt=""
                  style="width: 118px; height: 134px"
                />
                <div data-v-5c81cf27="" class="OnlineTestOnceTitle">
                  加入会员
                </div>
                <div data-v-5c81cf27="" style="margin-top: 16px">
                  <div data-v-5c81cf27="" class="OnlineTestOnceText">
                    完善信息
                  </div>
                  <div data-v-5c81cf27="" class="OnlineTestOnceText">
                    会员权益丰富多彩
                  </div>
                </div>
              </div>
              <img
                data-v-5c81cf27=""
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAjCAYAAABl/XGVAAAAAXNSR0IArs4c6QAAA1xJREFUSEu9l8trE1EUxs+knSY+SjEqaCuKz0ULLhrFlRj/AXeJIvgqVVC0XReFThQUoyJo8Ul3orXVjdZVbRXRItJRq6aVGtPUvGomMY/JZCaZe+/INJ3UVNE2yTi7gRl+3O+c+53vUFDwKBQwDgqgHQAcAEy7AkAphd8U/0blf2UYgxV2GPzmVRXLEWfgKpeTmk8JwtZaMDAUKR4x82cOpiiU5RZbKX+hq5z71jYuWVi1JcHLb88+GmL95lWye8UGBHYgpZ4yB7MpFZYG1thhq28219CXF5soQ0pSlJSEb9/snzj58XNUMNZk5OftVgxU8bJOwSxHhmjTesl0ffe20U21FXVGmgJMFAhEMMTT5O1oUDhwoc/jEcGDRsCGipVVhVH1jIuuBt7UebAx0bCGLihPJInhe5zEuCQ66ng4/sQfrZLd298hsNvmLSsFoFD1zAhdbeZNnbt+h6nkdIaAP0JIUsRXLveNnQ6Gq0UAL5qvrHOCqUCEp2UVyCA7EWm69iLkg5Ugs6G5d+ucYbmmBZiWNRxOyc1nHrx55o+KsnsyhaDn37LOC6YVMyURCEQITkjo/MmHLieSlmamZGWs+G/XoyiYCpWxAn4OQ1JU+gc9sSOdL32TOVl7MTDMH02gaJgmaziOgUviQDAmH7r09OugX6iUR1wuDD12FVhgdSXBNFl5Ue1WLPMiZlruDXcsADGr9tRsWcsCU6FZpMlKegc+Ro7dfR+Kzpa1bDBN1skYVjt23MelD7Z1f2PpjZuzbMgxVceywjRZEwKB4A8i/Uij461drnvVwGefMzuxLjAVmpEVGJ9E8rAv1XiqK/rFfWVDVjeYCvRxCLwc2re/5/UDL1j1g+VOhuVhH6/vybSaxQXceuL+pzu61Ez1zqluTGCvL54+0HZXp27U7hkvkd7+Dzres7yDpLGjpWv4qi4OosqW80YlEIoLTRf7Jl7p4o1510/jgcHxxGHdXF+bZ7yEzjsHgk4uZCj/PJuZ1EqYE7KHT/e8GdBlUhdmkGTTtRcT+mQQNV0FIoQkSk9Xc8uNUQEdbe8uOTfOJOIb9q1jG+voFXomYgBbd4WlYZ2xY099s3mxzln/1y3m3N7VlmWLjBYuhYYuPmbflX+LUYfPf9vP8quEvpvnT77JQ9K2wZyZAAAAAElFTkSuQmCC"
                alt=""
                class="block fl OnlineTestPoint"
                style="margin: 47px 0px 0px 10px"
              />
            </div>
          </div>
          <div data-v-5c81cf27="" class="OnlineTestBody">
            <div data-v-5c81cf27="" class="OnlineTestOnce fl">
              <div
                data-v-5c81cf27=""
                class="fl"
                style="display: inline-block; width: 162px; height: 226px"
              >
                <img
                  data-v-5c81cf27=""
                  class="OnlineTestOnceIMG"
                  src="https://www.ceshihui.cn/assets/icon-%E9%80%89%E6%8B%A9%E9%A1%B9%E7%9B%AE-30110401.png"
                  alt=""
                  style="width: 118px; height: 134px"
                />
                <div data-v-5c81cf27="" class="OnlineTestOnceTitle">
                  选择项目
                </div>
                <div data-v-5c81cf27="" style="margin-top: 16px">
                  <div data-v-5c81cf27="" class="OnlineTestOnceText">
                    千种实验项目
                  </div>
                  <div data-v-5c81cf27="" class="OnlineTestOnceText">
                    科研服务多样化
                  </div>
                </div>
              </div>
              <img
                data-v-5c81cf27=""
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAjCAYAAABl/XGVAAAAAXNSR0IArs4c6QAAA1xJREFUSEu9l8trE1EUxs+knSY+SjEqaCuKz0ULLhrFlRj/AXeJIvgqVVC0XReFThQUoyJo8Ul3orXVjdZVbRXRItJRq6aVGtPUvGomMY/JZCaZe+/INJ3UVNE2yTi7gRl+3O+c+53vUFDwKBQwDgqgHQAcAEy7AkAphd8U/0blf2UYgxV2GPzmVRXLEWfgKpeTmk8JwtZaMDAUKR4x82cOpiiU5RZbKX+hq5z71jYuWVi1JcHLb88+GmL95lWye8UGBHYgpZ4yB7MpFZYG1thhq28219CXF5soQ0pSlJSEb9/snzj58XNUMNZk5OftVgxU8bJOwSxHhmjTesl0ffe20U21FXVGmgJMFAhEMMTT5O1oUDhwoc/jEcGDRsCGipVVhVH1jIuuBt7UebAx0bCGLihPJInhe5zEuCQ66ng4/sQfrZLd298hsNvmLSsFoFD1zAhdbeZNnbt+h6nkdIaAP0JIUsRXLveNnQ6Gq0UAL5qvrHOCqUCEp2UVyCA7EWm69iLkg5Ugs6G5d+ucYbmmBZiWNRxOyc1nHrx55o+KsnsyhaDn37LOC6YVMyURCEQITkjo/MmHLieSlmamZGWs+G/XoyiYCpWxAn4OQ1JU+gc9sSOdL32TOVl7MTDMH02gaJgmaziOgUviQDAmH7r09OugX6iUR1wuDD12FVhgdSXBNFl5Ue1WLPMiZlruDXcsADGr9tRsWcsCU6FZpMlKegc+Ro7dfR+Kzpa1bDBN1skYVjt23MelD7Z1f2PpjZuzbMgxVceywjRZEwKB4A8i/Uij461drnvVwGefMzuxLjAVmpEVGJ9E8rAv1XiqK/rFfWVDVjeYCvRxCLwc2re/5/UDL1j1g+VOhuVhH6/vybSaxQXceuL+pzu61Ez1zqluTGCvL54+0HZXp27U7hkvkd7+Dzres7yDpLGjpWv4qi4OosqW80YlEIoLTRf7Jl7p4o1510/jgcHxxGHdXF+bZ7yEzjsHgk4uZCj/PJuZ1EqYE7KHT/e8GdBlUhdmkGTTtRcT+mQQNV0FIoQkSk9Xc8uNUQEdbe8uOTfOJOIb9q1jG+voFXomYgBbd4WlYZ2xY099s3mxzln/1y3m3N7VlmWLjBYuhYYuPmbflX+LUYfPf9vP8quEvpvnT77JQ9K2wZyZAAAAAElFTkSuQmCC"
                alt=""
                class="block fl OnlineTestPoint"
                style="margin: 47px 0px 0px 10px"
              />
            </div>
          </div>
          <div data-v-5c81cf27="" class="OnlineTestBody">
            <div data-v-5c81cf27="" class="OnlineTestOnce fl">
              <div
                data-v-5c81cf27=""
                class="fl"
                style="display: inline-block; width: 162px; height: 226px"
              >
                <img
                  data-v-5c81cf27=""
                  class="OnlineTestOnceIMG"
                  src="https://www.ceshihui.cn/assets/icon-%E9%A2%84%E7%BA%A6%E5%AE%9E%E9%AA%8C-a873c069.png"
                  alt=""
                  style="width: 118px; height: 134px"
                />
                <div data-v-5c81cf27="" class="OnlineTestOnceTitle">
                  预约实验
                </div>
                <div data-v-5c81cf27="" style="margin-top: 16px">
                  <div data-v-5c81cf27="" class="OnlineTestOnceText">
                    专属顾问服务
                  </div>
                  <div data-v-5c81cf27="" class="OnlineTestOnceText">
                    敲定实验要求
                  </div>
                </div>
              </div>
              <img
                data-v-5c81cf27=""
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAjCAYAAABl/XGVAAAAAXNSR0IArs4c6QAAA1xJREFUSEu9l8trE1EUxs+knSY+SjEqaCuKz0ULLhrFlRj/AXeJIvgqVVC0XReFThQUoyJo8Ul3orXVjdZVbRXRItJRq6aVGtPUvGomMY/JZCaZe+/INJ3UVNE2yTi7gRl+3O+c+53vUFDwKBQwDgqgHQAcAEy7AkAphd8U/0blf2UYgxV2GPzmVRXLEWfgKpeTmk8JwtZaMDAUKR4x82cOpiiU5RZbKX+hq5z71jYuWVi1JcHLb88+GmL95lWye8UGBHYgpZ4yB7MpFZYG1thhq28219CXF5soQ0pSlJSEb9/snzj58XNUMNZk5OftVgxU8bJOwSxHhmjTesl0ffe20U21FXVGmgJMFAhEMMTT5O1oUDhwoc/jEcGDRsCGipVVhVH1jIuuBt7UebAx0bCGLihPJInhe5zEuCQ66ng4/sQfrZLd298hsNvmLSsFoFD1zAhdbeZNnbt+h6nkdIaAP0JIUsRXLveNnQ6Gq0UAL5qvrHOCqUCEp2UVyCA7EWm69iLkg5Ugs6G5d+ucYbmmBZiWNRxOyc1nHrx55o+KsnsyhaDn37LOC6YVMyURCEQITkjo/MmHLieSlmamZGWs+G/XoyiYCpWxAn4OQ1JU+gc9sSOdL32TOVl7MTDMH02gaJgmaziOgUviQDAmH7r09OugX6iUR1wuDD12FVhgdSXBNFl5Ue1WLPMiZlruDXcsADGr9tRsWcsCU6FZpMlKegc+Ro7dfR+Kzpa1bDBN1skYVjt23MelD7Z1f2PpjZuzbMgxVceywjRZEwKB4A8i/Uij461drnvVwGefMzuxLjAVmpEVGJ9E8rAv1XiqK/rFfWVDVjeYCvRxCLwc2re/5/UDL1j1g+VOhuVhH6/vybSaxQXceuL+pzu61Ez1zqluTGCvL54+0HZXp27U7hkvkd7+Dzres7yDpLGjpWv4qi4OosqW80YlEIoLTRf7Jl7p4o1510/jgcHxxGHdXF+bZ7yEzjsHgk4uZCj/PJuZ1EqYE7KHT/e8GdBlUhdmkGTTtRcT+mQQNV0FIoQkSk9Xc8uNUQEdbe8uOTfOJOIb9q1jG+voFXomYgBbd4WlYZ2xY099s3mxzln/1y3m3N7VlmWLjBYuhYYuPmbflX+LUYfPf9vP8quEvpvnT77JQ9K2wZyZAAAAAElFTkSuQmCC"
                alt=""
                class="block fl OnlineTestPoint"
                style="margin: 47px 0px 0px 10px"
              />
            </div>
          </div>
          <div data-v-5c81cf27="" class="OnlineTestBody">
            <div data-v-5c81cf27="" class="OnlineTestOnce fl">
              <div
                data-v-5c81cf27=""
                class="fl"
                style="display: inline-block; width: 162px; height: 226px"
              >
                <img
                  data-v-5c81cf27=""
                  class="OnlineTestOnceIMG"
                  src="https://www.ceshihui.cn/assets/icon-%E5%87%BA%E5%85%B7%E7%BB%93%E6%9E%9C-5d6d34d6.png"
                  alt=""
                  style="width: 118px; height: 134px"
                />
                <div data-v-5c81cf27="" class="OnlineTestOnceTitle">
                  出具结果
                </div>
                <div data-v-5c81cf27="" style="margin-top: 16px">
                  <div data-v-5c81cf27="" class="OnlineTestOnceText">
                    线上下载结果
                  </div>
                  <div data-v-5c81cf27="" class="OnlineTestOnceText">
                    享无理由复测
                  </div>
                </div>
              </div>
              <img
                data-v-5c81cf27=""
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAjCAYAAABl/XGVAAAAAXNSR0IArs4c6QAAA1xJREFUSEu9l8trE1EUxs+knSY+SjEqaCuKz0ULLhrFlRj/AXeJIvgqVVC0XReFThQUoyJo8Ul3orXVjdZVbRXRItJRq6aVGtPUvGomMY/JZCaZe+/INJ3UVNE2yTi7gRl+3O+c+53vUFDwKBQwDgqgHQAcAEy7AkAphd8U/0blf2UYgxV2GPzmVRXLEWfgKpeTmk8JwtZaMDAUKR4x82cOpiiU5RZbKX+hq5z71jYuWVi1JcHLb88+GmL95lWye8UGBHYgpZ4yB7MpFZYG1thhq28219CXF5soQ0pSlJSEb9/snzj58XNUMNZk5OftVgxU8bJOwSxHhmjTesl0ffe20U21FXVGmgJMFAhEMMTT5O1oUDhwoc/jEcGDRsCGipVVhVH1jIuuBt7UebAx0bCGLihPJInhe5zEuCQ66ng4/sQfrZLd298hsNvmLSsFoFD1zAhdbeZNnbt+h6nkdIaAP0JIUsRXLveNnQ6Gq0UAL5qvrHOCqUCEp2UVyCA7EWm69iLkg5Ugs6G5d+ucYbmmBZiWNRxOyc1nHrx55o+KsnsyhaDn37LOC6YVMyURCEQITkjo/MmHLieSlmamZGWs+G/XoyiYCpWxAn4OQ1JU+gc9sSOdL32TOVl7MTDMH02gaJgmaziOgUviQDAmH7r09OugX6iUR1wuDD12FVhgdSXBNFl5Ue1WLPMiZlruDXcsADGr9tRsWcsCU6FZpMlKegc+Ro7dfR+Kzpa1bDBN1skYVjt23MelD7Z1f2PpjZuzbMgxVceywjRZEwKB4A8i/Uij461drnvVwGefMzuxLjAVmpEVGJ9E8rAv1XiqK/rFfWVDVjeYCvRxCLwc2re/5/UDL1j1g+VOhuVhH6/vybSaxQXceuL+pzu61Ez1zqluTGCvL54+0HZXp27U7hkvkd7+Dzres7yDpLGjpWv4qi4OosqW80YlEIoLTRf7Jl7p4o1510/jgcHxxGHdXF+bZ7yEzjsHgk4uZCj/PJuZ1EqYE7KHT/e8GdBlUhdmkGTTtRcT+mQQNV0FIoQkSk9Xc8uNUQEdbe8uOTfOJOIb9q1jG+voFXomYgBbd4WlYZ2xY099s3mxzln/1y3m3N7VlmWLjBYuhYYuPmbflX+LUYfPf9vP8quEvpvnT77JQ9K2wZyZAAAAAElFTkSuQmCC"
                alt=""
                class="block fl OnlineTestPoint"
                style="margin: 47px 0px 0px 10px"
              />
            </div>
          </div>
          <div data-v-5c81cf27="" class="OnlineTestBody">
            <div data-v-5c81cf27="" class="OnlineTestOnce fl">
              <div
                data-v-5c81cf27=""
                class="fl"
                style="display: inline-block; width: 162px; height: 226px"
              >
                <img
                  data-v-5c81cf27=""
                  class="OnlineTestOnceIMG"
                  src="https://www.ceshihui.cn/assets/icon-%E5%BC%80%E7%A5%A8-16093bd2.png"
                  alt=""
                  style="width: 118px; height: 134px"
                />
                <div data-v-5c81cf27="" class="OnlineTestOnceTitle">
                  线上开票
                </div>
                <div data-v-5c81cf27="" style="margin-top: 16px">
                  <div data-v-5c81cf27="" class="OnlineTestOnceText">
                    网站申请开票
                  </div>
                  <div data-v-5c81cf27="" class="OnlineTestOnceText">
                    电子资料一键下载
                  </div>
                </div>
              </div>
              <img
                data-v-5c81cf27=""
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAjCAYAAABl/XGVAAAAAXNSR0IArs4c6QAAA1xJREFUSEu9l8trE1EUxs+knSY+SjEqaCuKz0ULLhrFlRj/AXeJIvgqVVC0XReFThQUoyJo8Ul3orXVjdZVbRXRItJRq6aVGtPUvGomMY/JZCaZe+/INJ3UVNE2yTi7gRl+3O+c+53vUFDwKBQwDgqgHQAcAEy7AkAphd8U/0blf2UYgxV2GPzmVRXLEWfgKpeTmk8JwtZaMDAUKR4x82cOpiiU5RZbKX+hq5z71jYuWVi1JcHLb88+GmL95lWye8UGBHYgpZ4yB7MpFZYG1thhq28219CXF5soQ0pSlJSEb9/snzj58XNUMNZk5OftVgxU8bJOwSxHhmjTesl0ffe20U21FXVGmgJMFAhEMMTT5O1oUDhwoc/jEcGDRsCGipVVhVH1jIuuBt7UebAx0bCGLihPJInhe5zEuCQ66ng4/sQfrZLd298hsNvmLSsFoFD1zAhdbeZNnbt+h6nkdIaAP0JIUsRXLveNnQ6Gq0UAL5qvrHOCqUCEp2UVyCA7EWm69iLkg5Ugs6G5d+ucYbmmBZiWNRxOyc1nHrx55o+KsnsyhaDn37LOC6YVMyURCEQITkjo/MmHLieSlmamZGWs+G/XoyiYCpWxAn4OQ1JU+gc9sSOdL32TOVl7MTDMH02gaJgmaziOgUviQDAmH7r09OugX6iUR1wuDD12FVhgdSXBNFl5Ue1WLPMiZlruDXcsADGr9tRsWcsCU6FZpMlKegc+Ro7dfR+Kzpa1bDBN1skYVjt23MelD7Z1f2PpjZuzbMgxVceywjRZEwKB4A8i/Uij461drnvVwGefMzuxLjAVmpEVGJ9E8rAv1XiqK/rFfWVDVjeYCvRxCLwc2re/5/UDL1j1g+VOhuVhH6/vybSaxQXceuL+pzu61Ez1zqluTGCvL54+0HZXp27U7hkvkd7+Dzres7yDpLGjpWv4qi4OosqW80YlEIoLTRf7Jl7p4o1510/jgcHxxGHdXF+bZ7yEzjsHgk4uZCj/PJuZ1EqYE7KHT/e8GdBlUhdmkGTTtRcT+mQQNV0FIoQkSk9Xc8uNUQEdbe8uOTfOJOIb9q1jG+voFXomYgBbd4WlYZ2xY099s3mxzln/1y3m3N7VlmWLjBYuhYYuPmbflX+LUYfPf9vP8quEvpvnT77JQ9K2wZyZAAAAAElFTkSuQmCC"
                alt=""
                class="block fl OnlineTestPoint"
                style="margin: 47px 0px 0px 10px; display: none"
              />
            </div>
          </div>
        </div>
      </div>

      <div data-v-5c81cf27="" class="advantage">
        <div data-v-5c81cf27="" class="advantageWrap">
          <span data-v-5c81cf27="" class="OnlineTestTitle">平台优势</span>
          <div
            data-v-5c81cf27=""
            class="OnlineTestContext"
            style="margin-top: 20px"
          >
            6年专注让测试更简单
          </div>
          <div data-v-5c81cf27="" class="advantageCenter">
            <div
              data-v-5c81cf27=""
              class="advantageCenterOnce"
              style="position: relative"
            >
              <div data-v-5c81cf27="" class="advantageCenterOnceTitle">
                更便宜
              </div>
              <div data-v-5c81cf27="" class="advantageCenterOnceText">
                <span data-v-5c81cf27="">结合互联网以及自营设备优势，</span
                ><span data-v-5c81cf27="">使得测试价格最低50%</span>
              </div>
              <div
                data-v-5c81cf27=""
                class="fl"
                style="
                  width: 178px;
                  height: 163px;
                  position: absolute;
                  top: 0px;
                  left: 235px;
                "
              >
                <img
                  data-v-5c81cf27=""
                  class="advantageCenterOnceIMG"
                  src="https://ceshihui-prod.oss-cn-shanghai.aliyuncs.com/system_img/first_page_good_1.png"
                  alt=""
                  style="width: 178px; height: 163px"
                />
              </div>
            </div>
            <div
              data-v-5c81cf27=""
              class="advantageCenterOnce"
              style="position: relative"
            >
              <div data-v-5c81cf27="" class="advantageCenterOnceTitle">
                更专业
              </div>
              <div data-v-5c81cf27="" class="advantageCenterOnceText">
                <span data-v-5c81cf27="">以严苛的标准和工匠精神，</span
                ><span data-v-5c81cf27="">精心整合优质的测试资源</span>
              </div>
              <div
                data-v-5c81cf27=""
                class="fl"
                style="
                  width: 178px;
                  height: 163px;
                  position: absolute;
                  top: 0px;
                  left: 235px;
                "
              >
                <img
                  data-v-5c81cf27=""
                  class="advantageCenterOnceIMG"
                  src="https://ceshihui-prod.oss-cn-shanghai.aliyuncs.com/system_img/first_page_good_2.png"
                  alt=""
                  style="width: 178px; height: 163px"
                />
              </div>
            </div>
            <div
              data-v-5c81cf27=""
              class="advantageCenterOnce"
              style="position: relative"
            >
              <div data-v-5c81cf27="" class="advantageCenterOnceTitle">
                更快速
              </div>
              <div data-v-5c81cf27="" class="advantageCenterOnceText">
                <span data-v-5c81cf27="">提前沟通,</span
                ><span data-v-5c81cf27="">30%测试可次日完成测试</span>
              </div>
              <div
                data-v-5c81cf27=""
                class="fl"
                style="
                  width: 178px;
                  height: 163px;
                  position: absolute;
                  top: 0px;
                  left: 235px;
                "
              >
                <img
                  data-v-5c81cf27=""
                  class="advantageCenterOnceIMG"
                  src="https://ceshihui-prod.oss-cn-shanghai.aliyuncs.com/system_img/first_page_good_3.png"
                  alt=""
                  style="width: 178px; height: 163px"
                />
              </div>
            </div>
            <div
              data-v-5c81cf27=""
              class="advantageCenterOnce"
              style="position: relative"
            >
              <div data-v-5c81cf27="" class="advantageCenterOnceTitle">
                更灵活
              </div>
              <div data-v-5c81cf27="" class="advantageCenterOnceText">
                <span data-v-5c81cf27=""
                  >可满足符合实际的课题组额外个性化需求</span
                ><span data-v-5c81cf27=""></span>
              </div>
              <div
                data-v-5c81cf27=""
                class="fl"
                style="
                  width: 178px;
                  height: 163px;
                  position: absolute;
                  top: 0px;
                  left: 235px;
                "
              >
                <img
                  data-v-5c81cf27=""
                  class="advantageCenterOnceIMG"
                  src="https://ceshihui-prod.oss-cn-shanghai.aliyuncs.com/system_img/first_page_good_4.png"
                  alt=""
                  style="width: 178px; height: 163px"
                />
              </div>
            </div>
            <div
              data-v-5c81cf27=""
              class="advantageCenterOnce"
              style="position: relative"
            >
              <div data-v-5c81cf27="" class="advantageCenterOnceTitle">
                更靠谱
              </div>
              <div data-v-5c81cf27="" class="advantageCenterOnceText">
                <span data-v-5c81cf27="">常规测试提供复测服务，</span
                ><span data-v-5c81cf27="">客服在线时间24h</span>
              </div>
              <div
                data-v-5c81cf27=""
                class="fl"
                style="
                  width: 178px;
                  height: 163px;
                  position: absolute;
                  top: 0px;
                  left: 235px;
                "
              >
                <img
                  data-v-5c81cf27=""
                  class="advantageCenterOnceIMG"
                  src="https://ceshihui-prod.oss-cn-shanghai.aliyuncs.com/system_img/first_page_good_5.png"
                  alt=""
                  style="width: 178px; height: 163px"
                />
              </div>
            </div>
            <div
              data-v-5c81cf27=""
              class="advantageCenterOnce"
              style="position: relative"
            >
              <div data-v-5c81cf27="" class="advantageCenterOnceTitle">
                更强大
              </div>
              <div data-v-5c81cf27="" class="advantageCenterOnceText">
                <span data-v-5c81cf27="">3000多项业务检测能力，</span
                ><span data-v-5c81cf27="">覆盖50%的现场资源</span>
              </div>
              <div
                data-v-5c81cf27=""
                class="fl"
                style="
                  width: 178px;
                  height: 163px;
                  position: absolute;
                  top: 0px;
                  left: 235px;
                "
              >
                <img
                  data-v-5c81cf27=""
                  class="advantageCenterOnceIMG"
                  src="https://ceshihui-prod.oss-cn-shanghai.aliyuncs.com/system_img/first_page_good_6.png"
                  alt=""
                  style="width: 178px; height: 163px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Menu :type="menuType" />
  </main>
</template>
<style lang="scss">
.user-wrap {
  margin-bottom: 0 !important;
  .content {
    flex: 1;
    // margin-left: 15px;
    background: #fff;
  }
}
.user-menu {
  width: 150px;
  height: 100%;
  padding: 10px 0;
  // margin-left: 40px;
  .ant-menu-item {
    padding-left: 0 !important;
    padding-right: 0 !important;
    text-align: center;
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    border-radius: 0 !important;
  }
  h2 {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    margin-bottom: 0;
  }
}
bannerBottom[data-v-5c81cf27] {
  width: 1280px;
  height: 102px;
  background: #ffffff;
  box-shadow: 0 0 6px 4px #3e87c90a;
  border-radius: 2px;
  margin: 0 auto;
}

.bannerBottomWrap[data-v-5c81cf27] {
  width: 1280px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  overflow: hidden;
}

.banner_bottom_once[data-v-5c81cf27] {
  padding-top: 16px;
  width: 220px;
  height: 102px;
  overflow: hidden;
  float: left;
  cursor: pointer;
}

.banner_bottom_once[data-v-5c81cf27]:hover {
  background-color: #4a82c79d;
}

.banner_bottom_once:hover .once_contentText[data-v-5c81cf27],
.banner_bottom_once:hover .context_bottom[data-v-5c81cf27],
.banner_bottom_once:hover .banner_bottom_once img[data-v-5c81cf27] {
  color: #fff;
}

.banner_bottom_once_content[data-v-5c81cf27] {
  margin-left: 10px;
  height: 70px;
  position: relative;
  top: -72px;
  left: 71px;
}

.OnlineTest[data-v-5c81cf27] {
  width: 1280px;
  text-align: center;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 50px;
}

.OnlineTestTitle[data-v-5c81cf27] {
  font-size: 30px;
  font-weight: 600;
  color: #000;
  display: block;
}

.OnlineTestContext[data-v-5c81cf27] {
  margin-top: 20px;
  margin-bottom: 48px;
  font-size: 14px;
  font-weight: 400;
  color: #666666a6;
}

.OnlineTestWrap[data-v-5c81cf27] {
  width: 1280px;
  height: 250px;
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
}

.OnlineTestBody[data-v-5c81cf27] {
  float: left;
}

.OnlineTestOnce[data-v-5c81cf27] {
  height: 100%;
}

.OnlineTestOnce:hover .OnlineTestOnceIMG[data-v-5c81cf27] {
  scale: 1.15;
}

.OnlineTestOnceTitle[data-v-5c81cf27] {
  font-size: 18px;
  font-weight: 600;
  color: #18191b;
}

.OnlineTestOnceText[data-v-5c81cf27] {
  font-weight: 500;
  color: #8f959e;
}
.advantage-out[data-v-5c81cf27] {
    width: 100%;
    background: #F4F9FF;
    background-image: url(https://ceshihui-prod.oss-cn-shanghai.aliyuncs.com/system_img/first_page_test_route.png);
    margin: 0;
    padding-top: 40px;
    padding-bottom: 40px
}

.HaveConfidenceIn-out[data-v-5c81cf27] {
    width: 100%;
    margin: 0;
    padding-top: 40px;
    padding-bottom: 40px
}

.advantage[data-v-5c81cf27] {
    width: 1280px;
    border-radius: 8px;
    margin: 0 auto;
    margin-top: 50px;
}

.advantageWrap[data-v-5c81cf27] {
    width: 1280px;
    height: 100%;
    margin: 0 auto;
    text-align: center;
    overflow: hidden
}

.advantageCenter[data-v-5c81cf27] {
    width: 1280px;
    margin-top: 48px;
    height: 350px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around
}

.advantageCenterOnce[data-v-5c81cf27] {
    width: 392px;
    height: 163px;
    background: linear-gradient(270deg,#E3EFFC 0%,#FFFFFF 100%);
    border-radius: 2px;
    padding-top: 28px;
    padding-left: 25px;
    text-align: left
}

.advantageCenterOnce:hover .advantageCenterOnceIMG[data-v-5c81cf27] {
    scale: 1.15
}

.advantageCenterOnceIMG[data-v-5c81cf27] {
    animation: moveUpDown-5c81cf27 3s infinite
}

@keyframes moveUpDown-5c81cf27 {
    0% {
        transform: translateY(0)
    }

    50% {
        transform: translateY(-15px)
    }

    to {
        transform: translateY(0)
    }
}

.advantageCenterOnceTitle[data-v-5c81cf27] {
    font-size: 22px;
    font-weight: 600;
    color: #000
}

.advantageCenterOnceText[data-v-5c81cf27] {
    font-size: 14px;
    font-weight: 500;
    color: #8f959e;
    width: 226px;
    height: 40px;
    margin-top: 16px
}

.HaveConfidenceIn[data-v-5c81cf27] {
    width: 100%;
    text-align: center
}

.HaveConfidenceInTitle[data-v-5c81cf27] {
    font-size: 30px;
    font-weight: 600;
    color: #000
}

.HaveConfidenceInContext[data-v-5c81cf27] {
    font-size: 14px;
    font-weight: 400;
    color: #666666a6;
    margin-top: 20px
}

.HaveConfidenceInCenter[data-v-5c81cf27] {
    width: 1280px;
    height: 82px;
    margin: 41px auto 0;
    display: flex;
    justify-content: space-around
}

.HaveConfidenceInCenterTitle[data-v-5c81cf27] {
    width: 160px;
    font-size: 36px;
    font-weight: 700;
    color: #0a1a2cb3;
    line-height: 54px;
    animation: numAnimation-5c81cf27 2s ease-out
}

.HaveConfidenceInCenterContext[data-v-5c81cf27] {
    font-size: 18px;
    font-weight: 500;
    color: #0a1a2cb3;
    margin-top: 5px
}

.HaveConfidenceInBottom[data-v-5c81cf27] {
    width: 1280px;
    margin: 35px auto 0;
    position: relative;
    overflow: hidden
}

.HaveConfidenceInLi[data-v-5c81cf27] {
    width: 144px;
    height: 80px;
    display: block
}

.HaveConfidenceInLi img[data-v-5c81cf27] {
    width: 100%;
    height: 100%
}

.HaveConfidenceInBottom ul[data-v-5c81cf27]:nth-child(1),.HaveConfidenceInBottom ul[data-v-5c81cf27]:nth-child(3) {
    width: 100%;
    display: flex;
    justify-content: space-around
}

.HaveConfidenceInBottom ul:nth-child(1) li[data-v-5c81cf27]:nth-child(9),.HaveConfidenceInBottom ul:nth-child(4) li[data-v-5c81cf27]:nth-child(9) {
    position: absolute;
    left: 1190px
}

.HaveConfidenceInBottom ul:nth-child(1) li[data-v-5c81cf27]:nth-child(10),.HaveConfidenceInBottom ul:nth-child(4) li[data-v-5c81cf27]:nth-child(10) {
    position: absolute;
    left: 1320px
}

.HaveConfidenceInBottom ul[data-v-5c81cf27]:nth-child(2) {
    transform: translate(-50px);
    position: relative
}

.HaveConfidenceInBottom ul:nth-child(2) li[data-v-5c81cf27]:nth-child(9) {
    position: absolute;
    left: 1140px
}

.HaveConfidenceInBottom ul:nth-child(2) li[data-v-5c81cf27]:nth-child(10) {
    position: absolute;
    left: 1320px
}

.HaveConfidenceInBottom ul:nth-child(2) li[data-v-5c81cf27]:nth-child(11) {
    position: absolute;
    left: 1450px
}

.HaveConfidenceInBottom ul:nth-child(2) li[data-v-5c81cf27]:nth-child(11) {
    position: absolute;
    left: 1580px
}

.HaveConfidenceInBottomLeft[data-v-5c81cf27],.HaveConfidenceInBottomRight[data-v-5c81cf27] {
    position: absolute;
    width: 70px;
    height: 100%;
    background-color: #fff;
    opacity: .8;
    top: 0
}

.HaveConfidenceInBottomRight[data-v-5c81cf27] {
    left: 1060px
}

.GoodReputation[data-v-5c81cf27] {
    width: 1280px;
    text-align: center;
    margin: 0 auto;
    height: 100%;
    overflow: hidden
}

.GoodReputationTitle[data-v-5c81cf27] {
    font-size: 30px;
    font-weight: 600;
    color: #000
}

.GoodReputationLI[data-v-5c81cf27] {
    text-align: left;
    width: 341px;
    height: 106px;
    box-shadow: 0 0 10px 10px #ececec33;
    border-radius: 2px;
    margin-left: 24px;
    padding: 16px 14px 17px
}

.GoodReputationLI img[data-v-5c81cf27] {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    vertical-align: text-top
}

.GoodReputationBodyName[data-v-5c81cf27] {
    display: inline-block;
    margin-left: 16px;
    font-size: 14px;
    font-weight: 600;
    color: #18191b
}

.GoodReputationBodyReview[data-v-5c81cf27] {
    display: block;
    margin-left: 52px;
    font-size: 14px;
    font-weight: 400;
    color: #18191b;
    width: 270px;
    height: 40px;
    line-height: 25px;
    padding: 8px;
    background-color: #eeececa9;
    border-radius: 6px;
    position: absolute;
    top: 40px
}

.GoodReputationBodyReview_long[data-v-5c81cf27] {
    display: block;
    margin-left: 52px;
    font-size: 14px;
    font-weight: 400;
    color: #18191b;
    border-radius: 4px;
    width: 270px;
    height: 60px;
    line-height: 24px;
    padding: 8px;
    background-color: #dddddd4b;
    position: absolute;
    top: 40px;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden
}

.GoodReputationBody[data-v-5c81cf27] {
    position: relative
}

.GoodReputationBody ul[data-v-5c81cf27] {
    height: 106px;
    margin-top: 24px
}

.GoodReputationBody ul[data-v-5c81cf27]:nth-child(1),.GoodReputationBody ul[data-v-5c81cf27]:nth-child(3) {
    transform: translate(-80px)
}

.GoodReputationBody ul[data-v-5c81cf27]:nth-child(2) {
    transform: translate(-150px)
}

.GoodReputationBody ul:nth-child(1) li[data-v-5c81cf27]:nth-child(4),.GoodReputationBody ul:nth-child(3) li[data-v-5c81cf27]:nth-child(4) {
    position: absolute;
    top: 0;
    left: 1090px
}

.GoodReputationBody ul:nth-child(2) li[data-v-5c81cf27]:nth-child(4) {
    position: absolute;
    top: 0;
    left: 1090px
}

.WrapBottom[data-v-5c81cf27] {
    width: 100%;
    height: 262px;
    background-image: url(https://ceshihui-prod.oss-cn-shanghai.aliyuncs.com/system_img/first_page_buttom_banner.png);
    margin: 0 auto;
    text-align: center;
    overflow: hidden
}

.WrapBottomTitle[data-v-5c81cf27] {
    font-size: 28px;
    font-weight: 600;
    color: #18191b;
    margin-top: 75px
}

.WrapBottomContent[data-v-5c81cf27] {
    width: 876px;
    height: 50px;
    font-size: 18px;
    font-weight: 700;
    border-radius: 8px;
    margin: 36px auto 0
}

.GoodReputationBody ul[data-v-5c81cf27]:nth-child(1),.GoodReputationBody ul[data-v-5c81cf27]:nth-child(2),.GoodReputationBody ul[data-v-5c81cf27]:nth-child(3) {
    position: relative
}

.GoodReputationBody ul:nth-child(1) .GoodReputationLI[data-v-5c81cf27]:nth-child(5),.GoodReputationBody ul:nth-child(3) .GoodReputationLI[data-v-5c81cf27]:nth-child(5) {
    position: absolute;
    left: 1500px
}

.GoodReputationBody ul:nth-child(2) .GoodReputationLI[data-v-5c81cf27]:nth-child(5) {
    position: absolute;
    left: 1500px
}

@keyframes numAnimation-5c81cf27 {
    0% {
        opacity: 0
    }

    to {
        opacity: 1
    }
}

.animationDemo[data-v-5c81cf27] {
    animation: numAnimation2-5c81cf27 2.5s ease-out
}

@keyframes numAnimation2-5c81cf27 {
    0% {
        opacity: 0
    }

    to {
        opacity: 1
    }
}
</style>
