import React, { useRef, useState, useEffect } from "react";
import { Camera, RefreshCw, Zap, CircleDot, VideoOff } from "lucide-react";

export default function CameraScanner({ onCapture, isAnalyzing, liveAutoScan, setLiveAutoScan }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState("environment");
  const [cameraError, setCameraError] = useState(null);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [facingMode]);

  const startCamera = async () => {
    stopCamera();
    setCameraError(null);
    try {
      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err) {
      console.warn("Camera access failed:", err);
      setCameraError(err.name === "NotAllowedError" 
        ? "Camera permission denied. Please allow camera permissions in your browser URL bar."
        : "No active camera found or webcam is currently in use by another application.");
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  const captureFrame = () => {
    if (!videoRef.current || !cameraActive) return;

    setFlash(true);
    setTimeout(() => setFlash(false), 200);

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.88);
    onCapture(dataUrl);
  };

  useEffect(() => {
    let interval = null;
    if (liveAutoScan && cameraActive && !isAnalyzing) {
      interval = setInterval(() => {
        captureFrame();
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [liveAutoScan, cameraActive, isAnalyzing]);

  return (
    <div className="scanner-container">
      <div className="scanner-viewport">
        {flash && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#ffffff",
              zIndex: 30,
              opacity: 0.85,
              transition: "opacity 0.2s ease"
            }}
          />
        )}

        {/* Reticle Corners */}
        <div className="reticle-corner reticle-tl" />
        <div className="reticle-corner reticle-tr" />
        <div className="reticle-corner reticle-bl" />
        <div className="reticle-corner reticle-br" />

        {cameraActive && <div className="laser-line" />}

        <video
          ref={videoRef}
          playsInline
          muted
          className="scanner-video"
          style={{ display: cameraActive ? "block" : "none" }}
        />

        {!cameraActive && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
              textAlign: "center",
              background: "#0b1120"
            }}
          >
            <VideoOff size={44} color="#64748b" style={{ marginBottom: "14px" }} />
            <h4 style={{ color: "#f8fafc", marginBottom: "8px" }}>Camera Offline</h4>
            <p style={{ color: "#94a3b8", fontSize: "0.85rem", maxWidth: "340px", marginBottom: "16px" }}>
              {cameraError || "Click below to enable your laptop webcam or phone camera."}
            </p>
            <button className="btn btn-primary" onClick={startCamera}>
              <RefreshCw size={16} /> Enable Camera
            </button>
          </div>
        )}

        <div
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            zIndex: 15,
            display: "flex",
            gap: "8px",
            alignItems: "center"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(15, 23, 42, 0.8)",
              backdropFilter: "blur(8px)",
              padding: "5px 12px",
              borderRadius: "20px",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: cameraActive ? "#10b981" : "#ef4444",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}
          >
            <CircleDot size={12} />
            {cameraActive ? (liveAutoScan ? "LIVE STREAM SCANNING" : "CAMERA ACTIVE") : "OFFLINE"}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "16px",
          gap: "10px",
          flexWrap: "wrap"
        }}
      >
        <button
          className="btn btn-secondary"
          onClick={toggleFacingMode}
          disabled={!cameraActive}
        >
          <RefreshCw size={16} /> Flip View
        </button>

        <button
          className={`btn ${liveAutoScan ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setLiveAutoScan((prev) => !prev)}
          disabled={!cameraActive}
        >
          <Zap size={16} /> {liveAutoScan ? "Auto-Scan ON" : "Auto-Scan OFF"}
        </button>

        <button
          className="btn btn-primary"
          style={{ padding: "11px 24px" }}
          onClick={captureFrame}
          disabled={!cameraActive || isAnalyzing}
        >
          <Camera size={18} />
          {isAnalyzing ? "Classifying..." : "Capture & Scan"}
        </button>
      </div>
    </div>
  );
}
