export async function uploadImage(image) {
  if (!image) return;

  const formData = new FormData();
  formData.append("file", image);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.url;
    } else {
      console.log("Upload failed!");
    }
  } catch (error) {
    console.error("Lỗi khi upload ảnh:", error);
  }
}
