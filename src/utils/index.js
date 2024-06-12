export const blackList = [
  "/home/register",
  "/home/find-password",
  "/process/index",
  "/process/1",
  "/login/test"
  // "/user/prestore",
  // "/user/publish-demand",
  // "/user/userinfo"
]

import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import html2pdf from 'html2pdf.js';
import { notification } from "ant-design-vue";


// export const jstopdf = (data) => {
//   // // 创建一个新的 jsPDF 实例
//   let element = document.getElementById('download');;
//        let opt = {
//             margin: 12,
//             filename: `dowan.pdf`,
//             image: { type: 'jpeg', quality: 1 },
//             html2canvas: { scale: 2, allowTaint: true },
//             pagebreak: { mode: 'avoid-all', after: '.avoidThisRow' },    // 智能分页，防止图片被截断
//             enableLinks: true  // 支持文本中放链接，可点击跳转
//         };
//         html2pdf(element, opt);
  
// }

export const jstopdf = (elementName, htmlTitle, currentTime) => {
  let element = document.getElementById(elementName)
  html2canvas(element, {
      logging: false
  }).then(function(canvas) {
      let pdf = new jsPDF("p", "mm", "a4") // A4纸，纵向
      let ctx = canvas.getContext("2d")
      let a4w = 190;
      let a4h = 257 // A4大小，210mm x 297mm，四边各保留20mm的边距
      let imgHeight = Math.floor(a4h * canvas.width / a4w) // 按A4显示比例换算一页图像的像素高度
      let renderedHeight = 0

      while (renderedHeight < canvas.height) {
          let page = document.createElement("canvas")
          page.width = canvas.width
          page.height = Math.min(imgHeight, canvas.height - renderedHeight) // 可能内容不足一页

          // 用getImageData剪裁指定区域，并画到前面创建的canvas对象中
          page.getContext("2d").putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0)
          pdf.addImage(page.toDataURL("image/jpeg", 1.0), "JPEG", 10, 10, a4w, Math.min(a4h, a4w * page.height / page.width)) // 添加图像到页面，保留10mm边距

          renderedHeight += imgHeight
          if (renderedHeight < canvas.height) { pdf.addPage() } // 如果后面还有内容，添加一个空页
          // delete page;
      }
      pdf.save(currentTime ? htmlTitle + currentTime : htmlTitle);
  })
}

export function copy(text) {
  const oinput = document.createElement('textarea');
  oinput.value = text;
  document.body.appendChild(oinput);
  oinput.select(); // 选择对象
  document.execCommand('Copy'); // 执行浏览器复制命令
  document.body.removeChild(oinput);
  notification.success({
    description: "复制成功",
  });
  // alert(lang['复制完成'], 'info');
}

export function formatTime(time, isGetMonth) {
  const date = new Date(time); // 获取当前时间
  const year = date.getUTCFullYear(); // 获取年份
  const month = date.getUTCMonth() + 1; // 获取月份（注意月份是从0开始的）
  const day = date.getUTCDate(); // 获取日期
  const hours = date.getUTCHours(); // 获取小时
  const minutes = date.getUTCMinutes(); // 获取分钟
  const seconds = date.getUTCSeconds(); // 获取秒数
  const formattedDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
  const formatMonth = year + '/' + (month >= 10 ? month : `0${month}`);
  return !isGetMonth ? formattedDate : formatMonth;
}

export function formatLocalTime(time, isGetMonth) {
  const date = new Date(time); // 获取当前时间
  const year = date.getFullYear(); // 获取年份
  const month = date.getMonth() + 1; // 获取月份（注意月份是从0开始的）
  const day = date.getDate(); // 获取日期
  const hours = date.getHours(); // 获取小时
  const minutes = date.getMinutes(); // 获取分钟
  const seconds = date.getSeconds(); // 获取秒数
  const formattedDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
  const formatMonth = year + '/' + (month >= 10 ? month : `0${month}`);
  return !isGetMonth ? formattedDate : formatMonth;
}

export function trimLeft(s){ 
  if(s == null) { 
  return ""; 
  } 
  let whitespace = new String(" \t\n\r"); 
  let str = new String(s); 
  if (whitespace.indexOf(str.charAt(0)) != -1) { 
  let j=0, i = str.length; 
  while (j < i && whitespace.indexOf(str.charAt(j)) != -1){ 
  j++; 
  } 
  str = str.substring(j, i); 
  } 
  return str; 
  } 

