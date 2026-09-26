export const WASTE_CLASSES = {
  cardboard: {
    id: "cardboard",
    name: "Cardboard",
    icon: "📦",
    binColor: "Blue",
    binHex: "#2563EB",
    badgeBg: "rgba(37, 99, 235, 0.15)",
    badgeBorder: "rgba(37, 99, 235, 0.4)",
    recyclable: true,
    action: "Flatten box, remove plastic tape, keep dry, deposit in Blue Bin.",
    decomposition: "2 months",
    tips: [
      "Remove adhesive tapes and labels.",
      "Flatten completely to maximize container space.",
      "Food-soiled cardboard belongs in general waste."
    ]
  },
  glass: {
    id: "glass",
    name: "Glass",
    icon: "🍾",
    binColor: "Green",
    binHex: "#059669",
    badgeBg: "rgba(5, 150, 105, 0.15)",
    badgeBorder: "rgba(5, 150, 105, 0.4)",
    recyclable: true,
    action: "Rinse thoroughly, remove bottle cap, place in Green Bin.",
    decomposition: "1,000,000+ years",
    tips: [
      "Rinse away liquid and food residues.",
      "Recycle metal/plastic caps separately.",
      "Broken window glass or mirrors cannot go in standard bins."
    ]
  },
  metal: {
    id: "metal",
    name: "Metal / Can",
    icon: "🥫",
    binColor: "Yellow",
    binHex: "#D97706",
    badgeBg: "rgba(217, 119, 6, 0.15)",
    badgeBorder: "rgba(217, 119, 6, 0.4)",
    recyclable: true,
    action: "Rinse food residues, crush cans to save space, Yellow Bin.",
    decomposition: "50 - 200 years",
    tips: [
      "Crush drink cans to save space.",
      "Ensure aerosol cans are completely empty.",
      "Rinse food tins before recycling."
    ]
  },
  paper: {
    id: "paper",
    name: "Paper",
    icon: "📄",
    binColor: "Blue",
    binHex: "#3B82F6",
    badgeBg: "rgba(59, 130, 246, 0.15)",
    badgeBorder: "rgba(59, 130, 246, 0.4)",
    recyclable: true,
    action: "Keep clean and dry, deposit in Blue Bin.",
    decomposition: "2 - 6 weeks",
    tips: [
      "Remove staples and paper clips.",
      "Shredded paper should be grouped together.",
      "Wax-coated paper or soiled napkins go in general trash."
    ]
  },
  plastic: {
    id: "plastic",
    name: "Plastic",
    icon: "🧴",
    binColor: "Orange",
    binHex: "#EA580C",
    badgeBg: "rgba(234, 88, 12, 0.15)",
    badgeBorder: "rgba(234, 88, 12, 0.4)",
    recyclable: true,
    action: "Empty and rinse container, check resin code (#1 PET, #2 HDPE). Orange Bin.",
    decomposition: "450 years",
    tips: [
      "Rinse away detergent, beverage, or shampoo residue.",
      "PET (Code 1) and HDPE (Code 2) bottles are 100% recyclable.",
      "Squash containers to conserve bin volume."
    ]
  },
  trash: {
    id: "trash",
    name: "General Trash",
    icon: "🗑️",
    binColor: "Dark Gray",
    binHex: "#6B7280",
    badgeBg: "rgba(107, 114, 128, 0.15)",
    badgeBorder: "rgba(107, 114, 128, 0.4)",
    recyclable: false,
    action: "Non-recyclable residual waste. Dispose securely in the Gray/Landfill Bin.",
    decomposition: "Variable / Permanent",
    tips: [
      "Multi-material wrappers (crisp/chips bags, snack packets).",
      "Food-soiled packaging, dirty tissues, and greasy cartons.",
      "Dispose in standard general refuse bags."
    ]
  }
};

export const AVAILABLE_MODELS = [
  {
    id: "baseline_cnn",
    name: "Custom CNN",
    author: "Member 1 (Leader)",
    tag: "Trained Baseline",
    latency: "~24ms",
    isTrained: true
  },
  {
    id: "mobilenet_v2",
    name: "MobileNetV2",
    author: "Member 2",
    tag: "Transfer Learning",
    latency: "~18ms",
    isTrained: true
  },
  {
    id: "resnet50",
    name: "ResNet50",
    author: "Member 3",
    tag: "Deep Residuals + GradCAM",
    latency: "~45ms",
    isTrained: false
  },
  {
    id: "efficientnet_b0",
    name: "EfficientNetB0",
    author: "Member 4",
    tag: "Compound Scaling",
    latency: "~38ms",
    isTrained: false
  }
];
