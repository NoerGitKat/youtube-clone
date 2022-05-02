function upload(files: File[]) {
  const formData = new FormData();
  formData.append("video", files[0]);
}
export default upload;
