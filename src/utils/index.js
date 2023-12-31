export const blackList = [
  "/user/prestore",
  "/user/publish-demand",
  "/user/userinfo"
]

import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import html2pdf from 'html2pdf.js';
import { notification } from "ant-design-vue";


// export const jstopdf = (data) => {
//   // // 创建一个新的 jsPDF 实例
//   var element = document.getElementById('download');;
//        var opt = {
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
  var element = document.getElementById(elementName)
  html2canvas(element, {
      logging: false
  }).then(function(canvas) {
      var pdf = new jsPDF("p", "mm", "a4") // A4纸，纵向
      var ctx = canvas.getContext("2d")
      var a4w = 190;
      var a4h = 257 // A4大小，210mm x 297mm，四边各保留20mm的边距
      var imgHeight = Math.floor(a4h * canvas.width / a4w) // 按A4显示比例换算一页图像的像素高度
      var renderedHeight = 0

      while (renderedHeight < canvas.height) {
          var page = document.createElement("canvas")
          page.width = canvas.width
          page.height = Math.min(imgHeight, canvas.height - renderedHeight) // 可能内容不足一页

          // 用getImageData剪裁指定区域，并画到前面创建的canvas对象中
          page.getContext("2d").putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0)
          pdf.addImage(page.toDataURL("image/jpeg", 1.0), "JPEG", 10, 10, a4w, Math.min(a4h, a4w * page.height / page.width)) // 添加图像到页面，保留10mm边距

          renderedHeight += imgHeight
          if (renderedHeight < canvas.height) { pdf.addPage() } // 如果后面还有内容，添加一个空页
          // delete page;
      }
      pdf.save(htmlTitle + currentTime)
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
