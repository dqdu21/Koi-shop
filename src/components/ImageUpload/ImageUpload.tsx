import React, { useState } from "react";
import axios from "axios";

interface ImageUploadProps {
  onUpload: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));

      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        setUploadStatus("Uploading...");
        const token = sessionStorage.getItem("token"); // Lấy token từ sessionStorage (hoặc localStorage)

        const response = await axios.post(
          "https://koifarmshop.site/api/media/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`, // Thêm token vào header
            },
          }
        );
        const imageUrl = response.data.url || "";
        setUploadStatus("Upload successful.");
        onUpload(imageUrl); // Truyền URL ảnh về form
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          setUploadStatus("Unauthorized: Please check your authentication token.");
        } else {
          setUploadStatus("Failed to upload image. Please try again.");
        }
        console.error(error);
      }
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-2">Upload Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      {preview && (
        <div className="mb-4">
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded"
          />
        </div>
      )}
      {uploadStatus && <p className="mt-4 text-gray-700">{uploadStatus}</p>}
    </div>
  );
};

export default ImageUpload;
