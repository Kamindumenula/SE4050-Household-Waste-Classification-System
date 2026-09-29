import React from "react";
import { Cpu, Layers, Sparkles } from "lucide-react";

export default function SkeletonLoader({ mode = "single", previewImage, activeModel }) {
  if (mode === "compare") {
    return (
      <div
        className="glass-panel"
        style={{
          padding: "16px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
          animation: "fadeIn 0.25s ease"
        }}
      >
        <div>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <Layers size={17} color="#10b981" />
                <h3 style={{ fontSize: "1.02rem", color: "#f8fafc", fontWeight: 700, margin: 0 }}>
                  Benchmarking All 4 Models
                </h3>
              </div>
              <p style={{ color: "#94a3b8", fontSize: "0.76rem", margin: 0 }}>
                Running parallel TensorFlow inference on the test image...
              </p>
            </div>

            {previewImage && (
              <img
                src={previewImage}
                alt="Thumbnail"
                style={{ width: "38px", height: "38px", objectFit: "cover", borderRadius: "6px", border: "1px solid var(--border-color)" }}
              />
            )}
          </div>

          {/* Consensus Banner Skeleton */}
          <div
            style={{
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--radius-sm)",
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "14px"
            }}
          >
            <div className="skeleton-shimmer" style={{ width: "32px", height: "32px", borderRadius: "8px" }} />
            <div style={{ flex: 1 }}>
              <div className="skeleton-shimmer" style={{ width: "65%", height: "13px", marginBottom: "6px" }} />
              <div className="skeleton-shimmer" style={{ width: "40%", height: "10px" }} />
            </div>
          </div>

          {/* Table Header Placeholder */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.8fr 1.2fr 1fr 1fr",
              gap: "10px",
              padding: "8px 10px",
              borderBottom: "1px solid var(--border-color)",
              marginBottom: "8px"
            }}
          >
            <div className="skeleton-shimmer" style={{ height: "10px", width: "70%" }} />
            <div className="skeleton-shimmer" style={{ height: "10px", width: "60%" }} />
            <div className="skeleton-shimmer" style={{ height: "10px", width: "50%" }} />
            <div className="skeleton-shimmer" style={{ height: "10px", width: "50%" }} />
          </div>

          {/* 4 Model Row Skeletons */}
          {["Custom CNN", "MobileNetV2", "ResNet50", "EfficientNetB0"].map((name, i) => (
            <div
              key={name}
              style={{
                display: "grid",
                gridTemplateColumns: "1.8fr 1.2fr 1fr 1fr",
                alignItems: "center",
                gap: "10px",
                padding: "10px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.04)"
              }}
            >
              <div>
                <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#f8fafc", marginBottom: "3px" }}>{name}</div>
                <div className="skeleton-shimmer" style={{ width: "80%", height: "8px" }} />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div className="skeleton-shimmer" style={{ width: "18px", height: "18px", borderRadius: "50%" }} />
                <div className="skeleton-shimmer" style={{ width: "60px", height: "14px", borderRadius: "10px" }} />
              </div>

              <div>
                <div className="skeleton-shimmer" style={{ width: "45px", height: "14px", borderRadius: "4px", marginBottom: "3px" }} />
                <div className="skeleton-shimmer" style={{ width: "100%", height: "4px", borderRadius: "2px" }} />
              </div>

              <div>
                <div className="skeleton-shimmer" style={{ width: "55px", height: "14px", borderRadius: "10px" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Live Analyzing Status Pill */}
        <div
          style={{
            marginTop: "16px",
            padding: "8px 12px",
            borderRadius: "var(--radius-sm)",
            background: "rgba(16, 185, 129, 0.08)",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            fontSize: "0.78rem",
            color: "#10b981"
          }}
        >
          <Sparkles size={14} className="animate-spin" />
          <span>Evaluating 4 Neural Network Architectures in Parallel...</span>
        </div>
      </div>
    );
  }

  // Single Model Skeleton
  return (
    <div
      className="glass-panel"
      style={{
        padding: "20px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
        animation: "fadeIn 0.25s ease"
      }}
    >
      <div>
        {/* Top Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div className="skeleton-shimmer" style={{ width: "48px", height: "48px", borderRadius: "12px" }} />
            <div>
              <div className="skeleton-shimmer" style={{ width: "120px", height: "20px", marginBottom: "6px" }} />
              <div className="skeleton-shimmer" style={{ width: "160px", height: "12px" }} />
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div className="skeleton-shimmer" style={{ width: "55px", height: "26px", marginBottom: "4px", marginLeft: "auto" }} />
            <div className="skeleton-shimmer" style={{ width: "45px", height: "10px", marginLeft: "auto" }} />
          </div>
        </div>

        {/* Progress bar shimmer */}
        <div className="skeleton-shimmer" style={{ width: "100%", height: "6px", borderRadius: "3px", marginBottom: "16px" }} />

        {/* Photorealistic Bin Card Skeleton */}
        <div
          style={{
            border: "1px solid var(--border-color)",
            borderRadius: "var(--radius-md)",
            padding: "12px",
            background: "rgba(15, 23, 42, 0.5)",
            display: "flex",
            gap: "14px",
            alignItems: "center",
            marginBottom: "16px"
          }}
        >
          <div className="skeleton-shimmer" style={{ width: "68px", height: "68px", borderRadius: "8px" }} />
          <div style={{ flex: 1 }}>
            <div className="skeleton-shimmer" style={{ width: "50%", height: "14px", marginBottom: "8px" }} />
            <div className="skeleton-shimmer" style={{ width: "85%", height: "11px", marginBottom: "6px" }} />
            <div className="skeleton-shimmer" style={{ width: "40%", height: "10px" }} />
          </div>
        </div>

        {/* Action checklist skeleton */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
          <div className="skeleton-shimmer" style={{ width: "100%", height: "12px" }} />
          <div className="skeleton-shimmer" style={{ width: "90%", height: "12px" }} />
          <div className="skeleton-shimmer" style={{ width: "75%", height: "12px" }} />
        </div>
      </div>

      {/* Analyzing status pill */}
      <div
        style={{
          padding: "8px 12px",
          borderRadius: "var(--radius-sm)",
          background: "rgba(16, 185, 129, 0.08)",
          border: "1px solid rgba(16, 185, 129, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          fontSize: "0.78rem",
          color: "#10b981"
        }}
      >
        <Cpu size={14} />
        <span>Evaluating image with {activeModel?.name || "TensorFlow Model"}...</span>
      </div>
    </div>
  );
}
