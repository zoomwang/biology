export const blackList = [
  "/user/prestore",
  "/user/publish-demand",
  "/user/userinfo"
]

import jsPDF from 'jspdf';
import html2canvas from "html2canvas";

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
  const doc = new jsPDF();
  const formEl = document.getElementById('download');
  debugger
  doc.html(formEl).save('test.pdf');
}