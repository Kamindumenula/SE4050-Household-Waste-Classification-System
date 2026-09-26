import React from "react";
import { CheckCircle2, AlertTriangle, Trash2, Clock, Check } from "lucide-react";
import { WASTE_CLASSES } from "../wasteData";

export default function ClassificationResult({ result, activeModel }) {
  if (!result) return null;

  const wasteInfo = WASTE_CLASSES[result.classId] || WASTE_CLASSES["trash"];
  const confidencePercent = Math.round((result.confidence || 0.9) * 100);

  return (
    <div
      className="glass-panel"
      style={{
        padding: "24px",
        borderTop: `4px solid ${wasteInfo.binHex}`,
        animation: "fadeIn 0.3s ease"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "16px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: wasteInfo.badgeBg,
              border: `1px solid ${wasteInfo.badgeBorder}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2rem"
            }}
          >
            {wasteInfo.icon}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h2 style={{ fontSize: "1.5rem", color: "#ffffff", fontWeight: 700 }}>
                {wasteInfo.name}
              </h2>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "3px 9px",
                  borderRadius: "20px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  backgroundColor: wasteInfo.recyclable ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                  color: wasteInfo.recyclable ? "#10b981" : "#ef4444",
                  border: `1px solid ${wasteInfo.recyclable ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)"}`
                }}
              >
                {wasteInfo.recyclable ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
                {wasteInfo.recyclable ? "RECYCLABLE" : "NON-RECYCLABLE"}
              </span>
            </div>
            <p style={{ color: "#94a3b8", fontSize: "0.82rem" }}>
              Model: <strong style={{ color: "#38bdf8" }}>{activeModel.name}</strong> ({activeModel.author})
            </p>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#10b981" }}>
            {confidencePercent}%
          </div>
          <span style={{ fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase" }}>
            Confidence
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          width: "100%",
          height: "7px",
          background: "rgba(255, 255, 255, 0.08)",
          borderRadius: "4px",
          overflow: "hidden",
          marginBottom: "18px"
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${confidencePercent}%`,
            background: `linear-gradient(90deg, #10b981, ${wasteInfo.binHex})`,
            borderRadius: "4px",
            transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        />
      </div>

      {/* Bin Recommendation Card */}
      <div
        style={{
          background: "rgba(15, 23, 42, 0.6)",
          border: `1px solid ${wasteInfo.badgeBorder}`,
          borderRadius: "var(--radius-md)",
          padding: "14px 16px",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          gap: "14px"
        }}
      >
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "10px",
            backgroundColor: wasteInfo.binHex,
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}
        >
          <Trash2 size={22} />
        </div>
        <div>
          <div style={{ fontSize: "0.76rem", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase" }}>
            Recommended Disposal Bin
          </div>
          <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#f8fafc" }}>
            {wasteInfo.binColor} Bin ({wasteInfo.name})
          </div>
          <p style={{ fontSize: "0.82rem", color: "#cbd5e1", marginTop: "2px" }}>
            {wasteInfo.action}
          </p>
        </div>
      </div>

      {/* Quick Details */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
        <div
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            padding: "10px 12px",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border-color)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#10b981", fontSize: "0.76rem", fontWeight: 600, marginBottom: "6px" }}>
            <Check size={13} /> RECYCLING PREPARATION
          </div>
          <ul style={{ paddingLeft: "14px", fontSize: "0.76rem", color: "#94a3b8", lineHeight: 1.4 }}>
            {wasteInfo.tips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>

        <div
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            padding: "10px 12px",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border-color)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#38bdf8", fontSize: "0.76rem", fontWeight: 600, marginBottom: "6px" }}>
            <Clock size={13} /> DECOMPOSITION TIME
          </div>
          <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#f8fafc", margin: "4px 0" }}>
            {wasteInfo.decomposition}
          </div>
          <p style={{ fontSize: "0.72rem", color: "#64748b" }}>
            Proper segregation diverts recyclable materials from landfills.
          </p>
        </div>
      </div>

      {result.imagePreview && (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={result.imagePreview}
            alt="Scanned item preview"
            style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px", border: "1px solid var(--border-color)" }}
          />
          <span style={{ fontSize: "0.78rem", color: "#64748b" }}>
            Inference processed in {result.latency || "22ms"}
          </span>
        </div>
      )}
    </div>
  );
}
