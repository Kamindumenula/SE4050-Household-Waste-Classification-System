import React from "react";
import { Cpu, BarChart3, CheckCircle2, Clock } from "lucide-react";
import { AVAILABLE_MODELS } from "../wasteData";

export default function ModelSelector({ activeModelId, onSelectModel, compareMode, setCompareMode, backendModels }) {
  return (
    <div className="glass-panel" style={{ padding: "12px 16px", marginBottom: "14px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
          flexWrap: "wrap",
          gap: "8px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Cpu size={16} color="#10b981" />
          <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#f8fafc" }}>
            Select Classifier Model
          </span>
        </div>

        <button
          className={`btn ${compareMode ? "btn-primary" : "btn-secondary"}`}
          style={{ padding: "5px 12px", fontSize: "0.78rem" }}
          onClick={() => setCompareMode(!compareMode)}
        >
          <BarChart3 size={14} />
          {compareMode ? "Comparing All Models" : "Compare & Contrast All"}
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "8px"
        }}
      >
        {AVAILABLE_MODELS.map((model) => {
          const isSelected = activeModelId === model.id && !compareMode;
          const isTrained = backendModels ? backendModels[model.id]?.trained : model.isTrained;

          return (
            <div
              key={model.id}
              onClick={() => {
                onSelectModel(model.id);
                setCompareMode(false);
              }}
              style={{
                padding: "8px 12px",
                borderRadius: "var(--radius-md)",
                border: `1px solid ${isSelected ? "#10b981" : "rgba(255, 255, 255, 0.08)"}`,
                background: isSelected ? "rgba(16, 185, 129, 0.12)" : "rgba(255, 255, 255, 0.02)",
                boxShadow: isSelected ? "0 0 12px rgba(16, 185, 129, 0.18)" : "none",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2px" }}>
                <span style={{ fontWeight: 700, color: isSelected ? "#10b981" : "#f8fafc", fontSize: "0.88rem" }}>
                  {model.name}
                </span>
                <span
                  style={{
                    fontSize: "0.65rem",
                    padding: "1px 6px",
                    borderRadius: "10px",
                    backgroundColor: isTrained ? "rgba(16, 185, 129, 0.2)" : "rgba(255, 255, 255, 0.08)",
                    color: isTrained ? "#10b981" : "#94a3b8",
                    display: "flex",
                    alignItems: "center",
                    gap: "3px"
                  }}
                >
                  {isTrained ? <CheckCircle2 size={9} /> : <Clock size={9} />}
                  {isTrained ? "Trained" : "Pending"}
                </span>
              </div>
              <div style={{ fontSize: "0.72rem", color: "#64748b" }}>
                {model.desc} ({model.latency})
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
