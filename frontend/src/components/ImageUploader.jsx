import React, { useState } from "react";
import { UploadCloud, Image as ImageIcon } from "lucide-react";

export default function ImageUploader({ onSelectImage, isAnalyzing }) {
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => onSelectImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => onSelectImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" }}>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragOver ? "#10b981" : "rgba(255, 255, 255, 0.15)"}`,
          borderRadius: "var(--radius-lg)",
          padding: "36px 20px",
          textAlign: "center",
          background: dragOver ? "rgba(16, 185, 129, 0.05)" : "rgba(15, 23, 42, 0.4)",
          cursor: "pointer",
          transition: "all 0.25s ease",
          minHeight: "260px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <input
          id="file-input"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "rgba(16, 185, 129, 0.1)",
            color: "#10b981",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "12px"
          }}
        >
          <UploadCloud size={26} />
        </div>
        <h4 style={{ color: "#f8fafc", fontSize: "1rem", marginBottom: "4px" }}>
          Drop household waste image here
        </h4>
        <p style={{ color: "#94a3b8", fontSize: "0.8rem", marginBottom: "14px" }}>
          Supports JPG, PNG, WEBP (Click or drag & drop)
        </p>
        <button
          className="btn btn-secondary"
          style={{ padding: "8px 16px", fontSize: "0.85rem" }}
          onClick={(e) => {
            e.stopPropagation();
            document.getElementById("file-input")?.click();
          }}
          disabled={isAnalyzing}
        >
          <ImageIcon size={15} /> Select Photo
        </button>
      </div>
    </div>
  );
}
