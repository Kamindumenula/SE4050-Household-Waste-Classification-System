import React, { useState } from "react";
import { UploadCloud, Image as ImageIcon, Sparkles } from "lucide-react";

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

  const samplePresets = [
    { label: "Cardboard", icon: "📦", category: "cardboard" },
    { label: "Glass Jar", icon: "🍾", category: "glass" },
    { label: "Soda Can", icon: "🥫", category: "metal" },
    { label: "Newspaper", icon: "📄", category: "paper" },
    { label: "Plastic Bottle", icon: "🧴", category: "plastic" },
    { label: "Snack Wrapper", icon: "🗑️", category: "trash" }
  ];

  const handleSampleClick = (preset) => {
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(0, 0, 300, 300);

    ctx.font = "70px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(preset.icon, 150, 140);

    ctx.font = "bold 20px Outfit, sans-serif";
    ctx.fillStyle = "#f8fafc";
    ctx.fillText(preset.label, 150, 200);

    ctx.font = "12px Inter, sans-serif";
    ctx.fillStyle = "#94a3b8";
    ctx.fillText("Preset Test Item", 150, 230);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    onSelectImage(dataUrl, preset.category);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
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
          padding: "44px 20px",
          textAlign: "center",
          background: dragOver ? "rgba(16, 185, 129, 0.05)" : "rgba(15, 23, 42, 0.5)",
          cursor: "pointer",
          transition: "all 0.25s ease"
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
            width: "54px",
            height: "54px",
            borderRadius: "50%",
            background: "rgba(16, 185, 129, 0.1)",
            color: "#10b981",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 14px"
          }}
        >
          <UploadCloud size={28} />
        </div>
        <h4 style={{ color: "#f8fafc", fontSize: "1.05rem", marginBottom: "6px" }}>
          Drop household waste image here
        </h4>
        <p style={{ color: "#94a3b8", fontSize: "0.82rem", marginBottom: "16px" }}>
          Supports JPG, PNG, WEBP (Click or drag & drop)
        </p>
        <button
          className="btn btn-secondary"
          onClick={(e) => {
            e.stopPropagation();
            document.getElementById("file-input")?.click();
          }}
          disabled={isAnalyzing}
        >
          <ImageIcon size={16} /> Select Photo
        </button>
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
          <Sparkles size={15} color="#06b6d4" />
          <span style={{ fontSize: "0.8rem", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase" }}>
            Quick Sample Test Items
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: "8px" }}>
          {samplePresets.map((preset) => (
            <button
              key={preset.label}
              className="btn btn-secondary"
              style={{
                padding: "8px 6px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                fontSize: "0.76rem"
              }}
              onClick={() => handleSampleClick(preset)}
              disabled={isAnalyzing}
            >
              <span style={{ fontSize: "1.2rem" }}>{preset.icon}</span>
              <span>{preset.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
