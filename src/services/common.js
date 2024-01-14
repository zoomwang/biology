/** 根据用户名关键词搜索用户 */
export const uploadFile = (param) => {
  console.log("param==", param)
  return api.post(` /sys/file/upload`, param);
}
