import React from "react";
import { Cpu, BarChart3, CheckCircle2, Clock } from "lucide-react";
import { AVAILABLE_MODELS } from "../wasteData";

export default function ModelSelector({ activeModelId, onSelectModel, compareMode, setCompareMode, backendModels }) {
  return (
    <div className="glass-panel" style={{ padding: "16px 20px", marginBottom: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
          flexWrap: "wrap",
          gap: "10px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Cpu size={18} color="#10b981" />
          <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#f8fafc" }}>
            Select Classifier Model
          </span>
        </div>

        {/* Toggle Multi-Model Compare */}
        <button
          className={`btn ${compareMode ? "btn-primary" : "btn-secondary"}`}
          style={{ padding: "6px 14px", fontSize: "0.82rem" }}
          onClick={() => setCompareMode(!compareMode)}
        >
          <BarChart3 size={15} />
          {compareMode ? "Comparing All Models" : "Compare & Contrast All"}
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "10px"
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
                padding: "12px 14px",
                borderRadius: "var(--radius-md)",
                border: `1px solid ${isSelected ? "#10b981" : "rgba(255, 255, 255, 0.08)"}`,
                background: isSelected ? "rgba(16, 185, 129, 0.12)" : "rgba(255, 255, 255, 0.02)",
                boxShadow: isSelected ? "0 0 15px rgba(16, 185, 129, 0.2)" : "none",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                <span style={{ fontWeight: 700, color: isSelected ? "#10b981" : "#f8fafc", fontSize: "0.95rem" }}>
                  {model.name}
                </span>
                <span
                  style={{
                    fontSize: "0.68rem",
                    padding: "2px 7px",
                    borderRadius: "10px",
                    backgroundColor: isTrained ? "rgba(16, 185, 129, 0.2)" : "rgba(255, 255, 255, 0.08)",
                    color: isTrained ? "#10b981" : "#94a3b8",
                    display: "flex",
                    alignItems: "center",
                    gap: "3px"
                  }}
                >
                  {isTrained ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                  {isTrained ? "Trained" : "Pending"}
                </span>
              </div>
              <div style={{ fontSize: "0.78rem", color: "#38bdf8", marginBottom: "3px" }}>
                {model.author}
              </div>
              <div style={{ fontSize: "0.74rem", color: "#64748b" }}>
                {model.tag} ({model.latency})
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
