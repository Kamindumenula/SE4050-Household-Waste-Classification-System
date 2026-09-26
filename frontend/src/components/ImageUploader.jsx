import React, { useState } from "react";
import { UploadCloud, Image as ImageIcon } from "lucide-react";

export default function ImageUploader({ onSelectImage, isAnalyzing }) {
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState(null);

  const processFile = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
        onSelectImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    processFile(e.target.files?.[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    processFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div className="scanner-container">
      {/* Upload Dropzone: exact same size and border radius as live scanner viewport */}
      <div
        className={`upload-dropzone ${dragOver ? "drag-active" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <input
          id="file-input"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {preview ? (
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#080d1a"
            }}
          >
            <img
              src={preview}
              alt="Uploaded Waste"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                borderRadius: "var(--radius-md)"
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "12px",
                background: "rgba(15, 23, 42, 0.85)",
                backdropFilter: "blur(8px)",
                padding: "5px 14px",
                borderRadius: "20px",
                fontSize: "0.75rem",
                color: "#cbd5e1",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
              }}
            >
              Click or drop a new image to replace
            </div>
          </div>
        ) : (
          <>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "rgba(16, 185, 129, 0.1)",
                color: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "14px",
                boxShadow: "0 0 20px rgba(16, 185, 129, 0.15)"
              }}
            >
              <UploadCloud size={28} />
            </div>
            <h4 style={{ color: "#f8fafc", fontSize: "1.05rem", fontWeight: 700, marginBottom: "6px" }}>
              Drop household waste image here
            </h4>
            <p style={{ color: "#94a3b8", fontSize: "0.82rem", marginBottom: "16px", maxWidth: "290px", lineHeight: 1.4 }}>
              Supports JPG, PNG, WEBP (Click or drag & drop from your computer)
            </p>
            <div
              className="btn btn-secondary"
              style={{ padding: "8px 18px", fontSize: "0.84rem", pointerEvents: "none" }}
            >
              <ImageIcon size={15} /> Browse Device Files
            </div>
          </>
        )}
      </div>

      {/* Matching bottom toolbar height and spacing as CameraScanner */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "14px",
          gap: "10px",
          height: "42px",
          boxSizing: "border-box"
        }}
      >
        <div style={{ fontSize: "0.78rem", color: "#64748b", display: "flex", alignItems: "center", gap: "6px" }}>
          <span>Formats: JPG, PNG, WEBP</span>
          <span>•</span>
          <span>Target: 224×224 RGB</span>
        </div>

        <button
          className="btn btn-primary"
          style={{ height: "42px", padding: "0 22px", fontSize: "0.85rem" }}
          onClick={(e) => {
            e.stopPropagation();
            document.getElementById("file-input")?.click();
          }}
          disabled={isAnalyzing}
        >
          <UploadCloud size={16} />
          {isAnalyzing ? "Classifying..." : "Select & Upload Photo"}
        </button>
      </div>
    </div>
  );
}
