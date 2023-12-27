export const blackList = [
  "/user/prestore",
  "/user/publish-demand",
  "/user/userinfo"
]

// import jsPDF from 'jspdf';
// import html2canvas from "html2canvas";
import html2pdf from 'html2pdf.js';

export const jstopdf = (data) => {
  // // 创建一个新的 jsPDF 实例
  // const pdf = new jsPDF();
  // // 设置文档的页面大小为 A4 纸张
  // pdf.setProperties({
  //   title: data?.title,
  //   subject: data?.subject,
  //   author: data?.author,
  // });
  // // 使用 html2canvas 库将 HTML 页面转换为 canvas 元素
  // html2canvas(document.querySelector(`#${data?.id}`)).then(canvas => {
  //   // 将 canvas 元素转换为图像数据
  //   const imgData = canvas.toDataURL('image/png');
  //   // 将图像数据添加到 PDF 文档中
  //   pdf.addImage(imgData, 'PNG', 0, 0);
  //   // 下载 PDF 文件
  //   pdf.save(`${data?.name}.pdf`);
  // });
  var element = document.getElementById('download');;
       var opt = {
            margin: 12,
            filename: `dowan.pdf`,
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { scale: 2, allowTaint: true },
            pagebreak: { mode: 'avoid-all', after: '.avoidThisRow' },    // 智能分页，防止图片被截断
            enableLinks: true  // 支持文本中放链接，可点击跳转
        };
        html2pdf(element, opt);
  // const doc = new jsPDF();
  // const formEl = document.getElementById('download');
  // // debugger
  // doc.html(formEl).save('test.pdf');
}