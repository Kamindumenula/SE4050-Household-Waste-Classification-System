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
        padding: "20px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        animation: "fadeIn 0.3s ease"
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "12px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: wasteInfo.badgeBg,
                border: `1px solid ${wasteInfo.badgeBorder}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.7rem",
                overflow: "hidden"
              }}
            >
              {wasteInfo.iconImg ? (
                <img
                  src={wasteInfo.iconImg}
                  alt={wasteInfo.name}
                  style={{ width: "36px", height: "36px", objectFit: "contain" }}
                />
              ) : (
                wasteInfo.icon
              )}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h2 style={{ fontSize: "1.35rem", color: "#ffffff", fontWeight: 700 }}>
                  {wasteInfo.name}
                </h2>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "2px 8px",
                    borderRadius: "20px",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    backgroundColor: wasteInfo.recyclable ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                    color: wasteInfo.recyclable ? "#10b981" : "#ef4444",
                    border: `1px solid ${wasteInfo.recyclable ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)"}`
                  }}
                >
                  {wasteInfo.recyclable ? <CheckCircle2 size={11} /> : <AlertTriangle size={11} />}
                  {wasteInfo.recyclable ? "RECYCLABLE" : "NON-RECYCLABLE"}
                </span>
              </div>
              <p style={{ color: "#94a3b8", fontSize: "0.78rem" }}>
                Model: <strong style={{ color: "#38bdf8" }}>{activeModel.name}</strong>
              </p>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "1.45rem", fontWeight: 800, color: "#10b981" }}>
              {confidencePercent}%
            </div>
            <span style={{ fontSize: "0.68rem", color: "#64748b", textTransform: "uppercase" }}>
              Confidence
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div
          style={{
            width: "100%",
            height: "6px",
            background: "rgba(255, 255, 255, 0.08)",
            borderRadius: "3px",
            overflow: "hidden",
            marginBottom: "14px"
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${confidencePercent}%`,
              background: `linear-gradient(90deg, #10b981, ${wasteInfo.binHex})`,
              borderRadius: "3px",
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
            padding: "12px 14px",
            marginBottom: "12px",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "9px",
              backgroundColor: wasteInfo.binHex,
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            }}
          >
            <Trash2 size={20} />
          </div>
          <div>
            <div style={{ fontSize: "0.72rem", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase" }}>
              Recommended Disposal Bin
            </div>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#f8fafc" }}>
              {wasteInfo.binColor} Bin ({wasteInfo.name})
            </div>
            <p style={{ fontSize: "0.78rem", color: "#cbd5e1", marginTop: "2px" }}>
              {wasteInfo.action}
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "12px" }}>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              padding: "8px 10px",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-color)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#10b981", fontSize: "0.72rem", fontWeight: 600, marginBottom: "4px" }}>
              <Check size={12} /> RECYCLING PREPARATION
            </div>
            <ul style={{ paddingLeft: "12px", fontSize: "0.72rem", color: "#94a3b8", lineHeight: 1.35 }}>
              {wasteInfo.tips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              padding: "8px 10px",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-color)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#38bdf8", fontSize: "0.72rem", fontWeight: 600, marginBottom: "4px" }}>
              <Clock size={12} /> DECOMPOSITION TIME
            </div>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: "#f8fafc", margin: "2px 0" }}>
              {wasteInfo.decomposition}
            </div>
            <p style={{ fontSize: "0.68rem", color: "#64748b" }}>
              Proper segregation diverts recyclable materials from landfills.
            </p>
          </div>
        </div>
      </div>

      {result.imagePreview && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "8px", borderTop: "1px solid var(--border-color)" }}>
          <img
            src={result.imagePreview}
            alt="Scanned item preview"
            style={{ width: "42px", height: "42px", objectFit: "cover", borderRadius: "6px", border: "1px solid var(--border-color)" }}
          />
          <span style={{ fontSize: "0.74rem", color: "#64748b" }}>
            Inference processed in {result.latency || "22ms"}
          </span>
        </div>
      )}
    </div>
  );
}
