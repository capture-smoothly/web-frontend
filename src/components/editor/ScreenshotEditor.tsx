"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { hasProSubscription } from "@/lib/subscription";

// Theme gradients
const THEMES = {
  // Original themes
  midnight: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  sunset: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 50%, #c44569 100%)",
  ocean: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
  forest: "linear-gradient(135deg, #11998e 0%, #38ef7d 50%, #b3ff00 100%)",
  lavender: "linear-gradient(135deg, #a8edea 0%, #fed6e3 50%, #fbc2eb 100%)",
  golden: "linear-gradient(135deg, #f6d365 0%, #fda085 50%, #f093fb 100%)",
  coral: "linear-gradient(135deg, #ff9a56 0%, #ff6a88 50%, #ff99ac 100%)",
  sky: "linear-gradient(135deg, #e0f7fa 0%, #80deea 50%, #4dd0e1 100%)",
  slate: "linear-gradient(135deg, #94a3b8 0%, #64748b 50%, #475569 100%)",
  rose: "linear-gradient(135deg, #fecaca 0%, #fda4af 50%, #fb7185 100%)",
  pearl: "linear-gradient(135deg, #ffffff 0%, #f5f5f5 50%, #e5e5e5 100%)",
  carbon: "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #000000 100%)",
  aurora: "linear-gradient(135deg, #00f5a0 0%, #00d9f5 50%, #a18cd1 100%)",
  crimson: "linear-gradient(135deg, #8e0e00 0%, #c71f16 50%, #ff4b2b 100%)",
  emerald: "linear-gradient(135deg, #004d40 0%, #00897b 50%, #26a69a 100%)",
  sapphire: "linear-gradient(135deg, #0c2461 0%, #1e3799 50%, #4a69bd 100%)",
  amethyst: "linear-gradient(135deg, #4a148c 0%, #6a1b9a 50%, #8e24aa 100%)",
  obsidian: "linear-gradient(135deg, #2d3436 0%, #1e272e 50%, #0a0e27 100%)",
  graphite: "linear-gradient(135deg, #485563 0%, #29323c 50%, #1c2431 100%)",
  onyx: "linear-gradient(135deg, #434343 0%, #2c2c2c 50%, #1a1a1a 100%)",
  sunshine: "linear-gradient(135deg, #fde047 0%, #facc15 50%, #eab308 100%)",
  lime: "linear-gradient(135deg, #bef264 0%, #a3e635 50%, #84cc16 100%)",
  fuchsia: "linear-gradient(135deg, #d946ef 0%, #c026d3 50%, #a21caf 100%)",
  bubblegum: "linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)",
  cream: "linear-gradient(135deg, #FBE9D0 0%, #f5d7b1 50%, #f0c89a 100%)",
  tropical: "linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #ffd140 100%)",
  peacock: "linear-gradient(135deg, #00c9ff 0%, #92fe9d 50%, #00f2fe 100%)",
  berry: "linear-gradient(135deg, #8e2de2 0%, #d946ef 50%, #ff6b9d 100%)",
  citrus: "linear-gradient(135deg, #fa8bff 0%, #2bd2ff 50%, #2bff88 100%)",
  candy: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #a18cd1 100%)",
  mango: "linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #48dbfb 100%)",
  unicorn: "linear-gradient(135deg, #a8edea 0%, #fed6e3 50%, #d299c2 100%)",
  chocolate: "linear-gradient(135deg, #3d2817 0%, #5c3d2e 50%, #7d5a50 100%)",
  caramel: "linear-gradient(135deg, #c89f7e 0%, #d4a574 50%, #e8c4a0 100%)",
  bronze: "linear-gradient(135deg, #cd7f32 0%, #d4af37 50%, #ffd700 100%)",

  // Premium Dark Themes - Ultra sophisticated
  noir: "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 40%, #262626 100%)",
  charcoal: "linear-gradient(160deg, #141414 0%, #1f1f1f 50%, #2a2a2a 100%)",
  abyss: "linear-gradient(145deg, #000000 0%, #0a0a0f 50%, #121218 100%)",
  eclipse: "linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #2d2d5a 100%)",

  // Tech/SaaS Inspired - Clean, modern
  linear: "linear-gradient(135deg, #5c6ac4 0%, #8b5cf6 50%, #d946ef 100%)",
  notion: "linear-gradient(135deg, #f7f6f3 0%, #eae6df 50%, #e3ddd4 100%)",
  vercel: "linear-gradient(135deg, #000000 0%, #111111 50%, #171717 100%)",
  stripe: "linear-gradient(135deg, #635bff 0%, #7a73ff 50%, #a5b4fc 100%)",
  figma:
    "linear-gradient(135deg, #f24e1e 0%, #ff7262 30%, #a259ff 70%, #1abcfe 100%)",

  // Luxury/Premium - Elegant and refined
  platinum: "linear-gradient(135deg, #e5e4e2 0%, #c4c4c4 50%, #a8a8a8 100%)",
  titanium: "linear-gradient(145deg, #54585a 0%, #6e7275 50%, #888b8d 100%)",
  champagne: "linear-gradient(135deg, #f7e7ce 0%, #e8d4b8 50%, #d4c4a8 100%)",
  rosegold: "linear-gradient(135deg, #b76e79 0%, #c9a0a0 50%, #e8c4c4 100%)",
  blackgold:
    "linear-gradient(160deg, #0a0a0a 0%, #1a1a1a 40%, #2d2319 70%, #5c4a32 100%)",

  // Professional/Corporate - Clean business look
  mercury: "linear-gradient(135deg, #e8ecef 0%, #d1d9e0 50%, #b8c5cf 100%)",
  corporate: "linear-gradient(135deg, #1e3a5f 0%, #2c5282 50%, #3b7ab8 100%)",
  executive: "linear-gradient(145deg, #1a1a2e 0%, #2d3748 50%, #4a5568 100%)",
  prestige: "linear-gradient(135deg, #2c1810 0%, #4a2c1a 50%, #6b4423 100%)",

  // Ethereal/Soft - Light and airy
  mist: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
  frost: "linear-gradient(145deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)",
  cloud: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #e9d5ff 100%)",
  silk: "linear-gradient(160deg, #fefefe 0%, #f8f8f8 50%, #f0f0f0 100%)",

  // Gradient Mesh Style - Multi-color sophisticated
  cosmos: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
  nebula:
    "linear-gradient(145deg, #1a0530 0%, #2d1b4e 40%, #1e3a5f 70%, #0f4c5c 100%)",
  prism:
    "linear-gradient(135deg, #667eea 0%, #764ba2 30%, #f093fb 60%, #f5576c 100%)",
  hologram:
    "linear-gradient(160deg, #a8edea 0%, #fed6e3 25%, #d299c2 50%, #a8c0ff 75%, #a8edea 100%)",

  // Earth/Nature Premium - Rich and organic
  mahogany: "linear-gradient(135deg, #4a1c1c 0%, #6b2d2d 50%, #8b4040 100%)",
  walnut: "linear-gradient(145deg, #3e2723 0%, #5d4037 50%, #795548 100%)",
  jade: "linear-gradient(135deg, #004d40 0%, #00695c 50%, #00897b 100%)",
  ruby: "linear-gradient(160deg, #6b0f1a 0%, #9b1b30 50%, #c41e3a 100%)",

  // === NEW PREMIUM THEMES (40 more) ===

  // Deep Ocean & Sea - Rich blues and teals
  mariana:
    "linear-gradient(180deg, #0a1628 0%, #0d2137 30%, #0f2847 60%, #1a3a5c 100%)",
  pacific: "linear-gradient(135deg, #003973 0%, #005c97 50%, #0077b6 100%)",
  arctic:
    "linear-gradient(160deg, #1b4965 0%, #2d6a8a 40%, #5fa8d3 80%, #bee9e8 100%)",
  depths:
    "linear-gradient(180deg, #000814 0%, #001d3d 40%, #003566 70%, #004080 100%)",
  tidal:
    "linear-gradient(145deg, #023e8a 0%, #0077b6 30%, #00b4d8 60%, #90e0ef 100%)",

  // Warm Earth & Desert - Sandy, terracotta, warm browns
  sahara:
    "linear-gradient(135deg, #8b7355 0%, #a08060 40%, #c4a77d 70%, #d4b896 100%)",
  terracotta:
    "linear-gradient(160deg, #8b4513 0%, #a0522d 40%, #cd853f 70%, #deb887 100%)",
  clay: "linear-gradient(145deg, #5c4033 0%, #7d5a4a 50%, #a07d65 100%)",
  sandstone:
    "linear-gradient(135deg, #c2956e 0%, #d4a574 30%, #e8c4a0 60%, #f5e6d3 100%)",
  dune: "linear-gradient(180deg, #3d2914 0%, #5c3d1e 30%, #8b6914 60%, #c4a35a 100%)",

  // Deep Forest & Nature - Rich greens
  evergreen:
    "linear-gradient(160deg, #1a2f1a 0%, #2d4a2d 40%, #3d6b3d 70%, #4a8c4a 100%)",
  moss: "linear-gradient(135deg, #2d3b2d 0%, #4a5d4a 40%, #6b8e6b 70%, #8fb88f 100%)",
  fern: "linear-gradient(145deg, #1e3a1e 0%, #2e5a2e 30%, #4a7c4a 60%, #6b9e6b 100%)",
  pine: "linear-gradient(180deg, #0d260d 0%, #1a4d1a 40%, #2e7d32 70%, #43a047 100%)",
  sage: "linear-gradient(135deg, #6b7b5b 0%, #8b9b7b 40%, #a8b89b 70%, #c8d8bb 100%)",

  // Rich Metallics - Gold, copper, silver
  goldbar:
    "linear-gradient(145deg, #85640a 0%, #a67c00 30%, #d4a700 60%, #ffd700 100%)",
  copper:
    "linear-gradient(160deg, #6b3d2e 0%, #8b4513 30%, #b87333 60%, #da8a67 100%)",
  brass: "linear-gradient(135deg, #6b5a2e 0%, #8b7340 50%, #b5a642 100%)",
  steel:
    "linear-gradient(145deg, #434b4d 0%, #626d71 40%, #8a9a9d 70%, #b0c4c8 100%)",
  pewter:
    "linear-gradient(160deg, #5a5a5a 0%, #737373 40%, #919191 70%, #a9a9a9 100%)",

  // Cosmic & Space - Deep space without purple
  void: "linear-gradient(180deg, #000000 0%, #050510 30%, #0a0a1a 60%, #0f0f24 100%)",
  stellar:
    "linear-gradient(160deg, #0a0a0a 0%, #1a1a2e 30%, #232340 60%, #2d2d52 100%)",
  darkstar:
    "linear-gradient(145deg, #0d0d0d 0%, #1a1a1a 20%, #0f1419 50%, #161d24 100%)",
  blackhole:
    "linear-gradient(180deg, #000000 0%, #050505 30%, #0a0a0a 60%, #111111 100%)",
  supernova:
    "linear-gradient(135deg, #1a0a0a 0%, #2d1414 30%, #401f1f 60%, #5c2a2a 100%)",

  // Jewel Tones - Deep, rich gemstones
  garnet:
    "linear-gradient(160deg, #4a0e0e 0%, #6b1414 40%, #8b1c1c 70%, #ab2424 100%)",
  topaz:
    "linear-gradient(145deg, #7a4a00 0%, #996600 40%, #b87800 70%, #d89000 100%)",
  citrine:
    "linear-gradient(135deg, #8b7500 0%, #ab9200 40%, #cbae00 70%, #e8c800 100%)",
  peridot:
    "linear-gradient(160deg, #4a6b00 0%, #5c8500 40%, #6e9f00 70%, #85b900 100%)",
  tourmaline:
    "linear-gradient(145deg, #004040 0%, #005858 30%, #007070 60%, #008888 100%)",

  // Smoke & Mist - Sophisticated grays
  smoke:
    "linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 30%, #404040 60%, #555555 100%)",
  ash: "linear-gradient(145deg, #2a2a2a 0%, #3d3d3d 40%, #505050 70%, #666666 100%)",
  storm:
    "linear-gradient(160deg, #1e2a3a 0%, #2d3e50 40%, #3d5266 70%, #4d667c 100%)",
  thunder:
    "linear-gradient(135deg, #1a1a2e 0%, #2a2a3e 30%, #3a3a4e 60%, #4a4a5e 100%)",
  haze: "linear-gradient(145deg, #4a5568 0%, #5a6578 40%, #6b7588 70%, #7c8598 100%)",

  // Luxury Fabric - Velvet, silk textures
  velvet:
    "linear-gradient(160deg, #2d0a1e 0%, #4a1030 40%, #6b1848 70%, #8b2060 100%)",
  burgundy:
    "linear-gradient(145deg, #3d0c1e 0%, #5a1428 40%, #801e3d 70%, #a62852 100%)",
  wine: "linear-gradient(135deg, #2e1114 0%, #4a1a1f 40%, #722f37 70%, #954048 100%)",
  plum: "linear-gradient(160deg, #2e1a2e 0%, #4a2a4a 40%, #663366 70%, #804080 100%)",
  mulberry:
    "linear-gradient(145deg, #3d1c3d 0%, #5a2e5a 40%, #7a4a7a 70%, #9a6a9a 100%)",

  // Industrial & Urban - Concrete, metal
  concrete:
    "linear-gradient(180deg, #404040 0%, #555555 30%, #6a6a6a 60%, #808080 100%)",
  iron: "linear-gradient(145deg, #2a2a2a 0%, #3d3d3d 30%, #4a4a4a 60%, #5c5c5c 100%)",
  zinc: "linear-gradient(160deg, #4a5568 0%, #5c6b7a 40%, #6e7f8c 70%, #80939e 100%)",
  lead: "linear-gradient(135deg, #3a3a3a 0%, #4d4d4d 40%, #606060 70%, #737373 100%)",
  gunmetal:
    "linear-gradient(145deg, #2a3439 0%, #3d4a50 40%, #536872 70%, #6b8693 100%)",

  // Cosmic Themes - 4-color gradient combinations
  cosmic1:
    "linear-gradient(133deg, #ededed 0%, #eb00eb 33%, #731ec8 67%, #1818dc 100%)",
  cosmic2:
    "linear-gradient(180deg, #f1c6e4 0%, #c329ae 33%, #44058d 67%, #170637 100%)",
  cosmic3:
    "linear-gradient(133deg, #f9d223 0%, #f6a11a 33%, #ef620d 67%, #eb3f06 100%)",
  cosmic4:
    "linear-gradient(133deg, #f0f045 0%, #b8e648 33%, #74e24b 67%, #19d84e 100%)",
  cosmic5:
    "linear-gradient(133deg, #17c8fe 0%, #21aafe 33%, #347ef9 67%, #485cfe 100%)",
  cosmic6:
    "linear-gradient(133deg, #c9fdd9 0%, #e5e4a4 33%, #f4b37f 67%, #f3817c 100%)",
  cosmic7:
    "linear-gradient(133deg, #dae4eb 0%, #e9bfe6 33%, #cc99e8 67%, #9e7ff1 100%)",
  cosmic8:
    "linear-gradient(133deg, #2f2f2f 0%, #262626 33%, #1d1d1d 67%, #0e0e0e 100%)",
  cosmic9:
    "linear-gradient(143deg, #000000 0%, #0e060d 33%, #9d07bb 67%, #5017ee 100%)",
  cosmic10:
    "linear-gradient(180deg, #000000 0%, #000000 33%, #0fffff 67%, #1caeb9 100%)",
  cosmic11:
    "linear-gradient(167deg, #3d44d4 0%, #0d0c18 33%, #000000 67%, #3ba7be 100%)",
  cosmic12:
    "linear-gradient(133deg, #1e0129 0%, #5702a4 33%, #ae55f7 67%, #ddc4ee 100%)",
  cosmic13:
    "linear-gradient(133deg, #181c21 0%, #5c666c 33%, #7e888f 67%, #7e888f 100%)",
  cosmic14:
    "linear-gradient(133deg, #c183b7 0%, #4da7d0 33%, #6711ba 67%, #3306a4 100%)",
  cosmic15:
    "linear-gradient(119deg, #ededed 0%, #fefdfd 33%, #fc9479 67%, #f9523d 100%)",
  cosmic16:
    "linear-gradient(68deg, #f7f7f7 0%, #cc0f8a 33%, #f05000 67%, #ddb9a6 100%)",
  cosmic17: "linear-gradient(68deg, #f7f7f7 0%, #cc0f8a 50%, #f05000 100%)",
  cosmic18: "linear-gradient(68deg, #f7f7f7 0%, #f05000 50%, #ddb9a6 100%)",
  cosmic19:
    "radial-gradient(circle at center, #917054 0%, #d18923 33%, #000000 67%, #242223 100%)",
  cosmic20:
    "radial-gradient(circle at center, #fef3fe 0%, #ce03a9 33%, #fbf1fe 67%, #fcf1fc 100%)",
  cosmic21:
    "radial-gradient(circle at center, #fcfcfc 0%, #f0f0f0 33%, #60a0bc 67%, #479879 100%)",

  // Solid Color Themes
  solid1: "#ffc7ec",
  solid2: "#fe585e",
  solid3: "#f9f8fa",
  solid4: "#dfe1e5",
  solid5: "#151717",
  solid6: "#fe934c",
  solid7: "#ffc93c",
  solid8: "#8ac827",
  solid9: "#40c85f",
  solid10: "#feafad",
  solid11: "#fec3a9",
  solid12: "#ffd6a5",
  solid13: "#fefeb7",
  solid14: "#caffbe",
  solid15: "#37959d",
  solid16: "#1b82c4",
  solid17: "#4366aa",
  solid18: "#684d92",
  solid19: "#ee4c85",
  solid20: "#b3fbde",
  solid21: "#abe0ee",
  solid22: "#9ec3fe",
  solid23: "#bdb2ff",
  solid24: "#ffc5fe",
  solid25: "#ffc7eb",

  // Custom theme
  custom: "#D8FF00",
} as const;

type ThemeType = keyof typeof THEMES;

// Categorized theme lists for organized display
const COSMIC_THEME_KEYS: ThemeType[] = [
  "cosmic2", "cosmic3", "cosmic4", "cosmic5", "cosmic6", "cosmic7",
  "cosmic8", "cosmic9", "cosmic10", "cosmic11", "cosmic12", "cosmic13", "cosmic14",
  "cosmic15", "cosmic16", "cosmic17", "cosmic18", "cosmic19", "cosmic20", "cosmic21",
];

const POPULAR_THEME_KEYS: ThemeType[] = [
  "pearl", "sunset", "rose", "forest", "lavender", "golden",
  "coral", "sky", "slate", "ocean", "midnight", "carbon",
  "cosmic1", "figma",
];

const DARK_PREMIUM_THEME_KEYS: ThemeType[] = [
  "obsidian", "graphite", "onyx", "noir", "charcoal", "abyss",
  "eclipse", "void", "stellar", "darkstar", "blackhole", "supernova",
  "smoke", "ash", "storm", "thunder", "haze", "cosmos",
  "nebula", "vercel", "executive", "concrete", "iron", "zinc",
  "lead", "gunmetal",
];

const BRIGHT_COLORFUL_THEME_KEYS: ThemeType[] = [
  "aurora", "crimson", "emerald", "sapphire", "amethyst", "sunshine",
  "lime", "fuchsia", "bubblegum", "tropical", "peacock", "berry",
  "citrus", "candy", "mango", "unicorn", "prism", "hologram",
  "linear", "stripe",
];

const NATURE_EARTH_THEME_KEYS: ThemeType[] = [
  "evergreen", "moss", "fern", "pine", "sage", "jade",
  "mariana", "pacific", "arctic", "depths", "tidal", "tourmaline",
  "sahara", "terracotta", "clay", "sandstone", "dune", "chocolate",
  "caramel", "mahogany", "walnut", "prestige",
];

const LUXURY_METALLIC_THEME_KEYS: ThemeType[] = [
  "bronze", "goldbar", "copper", "brass", "steel", "pewter",
  "platinum", "titanium", "champagne", "rosegold", "blackgold", "ruby",
  "garnet", "topaz", "citrine", "peridot", "velvet", "burgundy",
  "wine", "plum", "mulberry", "mercury", "corporate", "mist",
  "frost", "cloud", "silk", "cream", "notion",
];

const SOLID_THEME_KEYS: ThemeType[] = [
  "solid1", "solid2", "solid3", "solid4", "solid5", "solid6", "solid7",
  "solid8", "solid9", "solid10", "solid11", "solid12", "solid13", "solid14",
  "solid15", "solid16", "solid17", "solid18", "solid19", "solid20", "solid21",
  "solid22", "solid23", "solid24", "solid25",
];

type Tool =
  | "select"
  | "crop"
  | "rectangle"
  | "circle"
  | "arrow"
  | "line"
  | "highlight"
  | "blur"
  | "freehand";

interface Annotation {
  id: string;
  type:
    | "rectangle"
    | "circle"
    | "arrow"
    | "line"
    | "highlight"
    | "blur"
    | "freehand";
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: string;
  opacity: number;
  strokeWidth: number;
  filled: boolean;
  points?: { x: number; y: number }[];
}

interface CropArea {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface HistoryState {
  imageUrl: string;
  annotations: Annotation[];
  showBackground: boolean;
  includeWindowChrome: boolean;
  windowChromeTheme: "light" | "dark";
  selectedTheme: ThemeType;
}

// Tooltip Button Component
function TooltipButton({
  onClick,
  disabled = false,
  tooltip,
  style,
  children,
  tooltipBg,
  tooltipText,
  tooltipBorder,
  tooltipPosition = "bottom",
}: {
  onClick: () => void;
  disabled?: boolean;
  tooltip: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  tooltipBg?: string;
  tooltipText?: string;
  tooltipBorder?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const getTooltipStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: "absolute",
      background: tooltipBg || "#1E1E1E",
      color: tooltipText || "#E0E0E0",
      padding: "6px 10px",
      borderRadius: "4px",
      fontSize: "12px",
      whiteSpace: "nowrap",
      pointerEvents: "none",
      zIndex: 2000,
      border: `1px solid ${tooltipBorder || "#2D2D2D"}`,
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
    };

    switch (tooltipPosition) {
      case "top":
        return {
          ...base,
          bottom: "calc(100% + 8px)",
          left: "50%",
          transform: "translateX(-50%)",
        };
      case "bottom":
        return {
          ...base,
          top: "calc(100% + 8px)",
          left: "50%",
          transform: "translateX(-50%)",
        };
      case "left":
        return {
          ...base,
          right: "calc(100% + 8px)",
          top: "50%",
          transform: "translateY(-50%)",
        };
      case "right":
        return {
          ...base,
          left: "calc(100% + 8px)",
          top: "50%",
          transform: "translateY(-50%)",
        };
      default:
        return {
          ...base,
          top: "calc(100% + 8px)",
          left: "50%",
          transform: "translateX(-50%)",
        };
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      style={{ position: "relative", ...style }}
    >
      {children}
      {showTooltip && <div style={getTooltipStyle()}>{tooltip}</div>}
    </button>
  );
}

// Sparkle Icon Component - Reusable premium indicator
function SparkleIcon({
  size = 16,
  useGradient = true,
}: {
  size?: number;
  useGradient?: boolean;
}) {
  const gradientId = `sparkle-gradient-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {useGradient && (
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFC107" />
            <stop offset="50%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FFA500" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
        fill={useGradient ? `url(#${gradientId})` : "#EC4899"}
        stroke={useGradient ? `url(#${gradientId})` : "#EC4899"}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 4L19.5 6.5L22 7L19.5 7.5L19 10L18.5 7.5L16 7L18.5 6.5L19 4Z"
        fill={useGradient ? `url(#${gradientId})` : "#06B6D4"}
        opacity="0.8"
      />
      <path
        d="M5 14L5.5 16.5L8 17L5.5 17.5L5 20L4.5 17.5L2 17L4.5 16.5L5 14Z"
        fill={useGradient ? `url(#${gradientId})` : "#06B6D4"}
        opacity="0.8"
      />
    </svg>
  );
}

// Helper function to generate gradient CSS with multiple colors
function generateGradient(
  type: "linear" | "radial" | "angular" | "diamond",
  colors: string[],
  angle: number = 135
): string {
  // Create color stops evenly distributed
  const colorStops = colors
    .map((color, index) => {
      const percentage = (index / (colors.length - 1)) * 100;
      return `${color} ${percentage}%`;
    })
    .join(", ");

  switch (type) {
    case "linear":
      return `linear-gradient(${angle}deg, ${colorStops})`;
    case "radial":
      const positions = [
        "center",
        "top",
        "right",
        "bottom",
        "left",
        "top right",
        "bottom right",
        "bottom left",
        "top left",
      ];
      const posIndex = Math.floor((angle % 360) / 40) % positions.length;
      return `radial-gradient(circle at ${positions[posIndex]}, ${colorStops})`;
    case "angular":
      return `conic-gradient(from ${angle}deg, ${colorStops}, ${colors[0]})`;
    case "diamond":
      const diamondPositions = [
        "center",
        "top",
        "right",
        "bottom",
        "left",
        "top right",
        "bottom right",
        "bottom left",
        "top left",
      ];
      const diamondIndex =
        Math.floor((angle % 360) / 40) % diamondPositions.length;
      return `radial-gradient(ellipse at ${diamondPositions[diamondIndex]}, ${colorStops})`;
    default:
      return `linear-gradient(${angle}deg, ${colorStops})`;
  }
}

// Theme Selector Component
function ThemeSelector({
  selectedTheme,
  onThemeSelect,
  onClose,
  editorTheme,
  initialCustomColor = "#ededed",
  initialCustomColor2 = "#eb00eb",
  initialCustomColor3 = "#731ec8",
  initialCustomColor4 = "#1818dc",
  initialGradientType = "linear",
  initialGradientAngle = 133,
  initialCustomMode = "gradient",
  initialShowColor2 = true,
  initialShowColor3 = true,
  initialShowColor4 = true,
  onCustomChange,
}: {
  selectedTheme: ThemeType;
  onThemeSelect: (theme: ThemeType) => void;
  onClose: () => void;
  editorTheme: "light" | "dark";
  initialCustomColor?: string;
  initialCustomColor2?: string;
  initialCustomColor3?: string;
  initialCustomColor4?: string;
  initialGradientType?: "linear" | "radial" | "angular" | "diamond";
  initialGradientAngle?: number;
  initialCustomMode?: "solid" | "gradient";
  initialShowColor2?: boolean;
  initialShowColor3?: boolean;
  initialShowColor4?: boolean;
  onCustomChange?: (
    color: string,
    settings: {
      color2: string;
      color3: string;
      color4: string;
      type: "linear" | "radial" | "angular" | "diamond";
      angle: number;
      mode: "solid" | "gradient";
      showColor2: boolean;
      showColor3: boolean;
      showColor4: boolean;
    }
  ) => void;
}) {
  const [hoveredTheme, setHoveredTheme] = useState<ThemeType | null>(null);
  const [showCustom, setShowCustom] = useState(false);
  const [customColor, setCustomColor] = useState(initialCustomColor);
  const [customColor2, setCustomColor2] = useState(initialCustomColor2);
  const [customColor3, setCustomColor3] = useState(initialCustomColor3);
  const [customColor4, setCustomColor4] = useState(initialCustomColor4);
  const [gradientType, setGradientType] = useState(initialGradientType);
  const [gradientAngle, setGradientAngle] = useState(initialGradientAngle);
  const [customMode, setCustomMode] = useState(initialCustomMode);
  const [showColor2, setShowColor2] = useState(initialShowColor2);
  const [showColor3, setShowColor3] = useState(initialShowColor3);
  const [showColor4, setShowColor4] = useState(initialShowColor4);
  const containerRef = useRef<HTMLDivElement>(null);

  // Refs for smooth color updates without state lag
  const colorUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced update function for parent state
  const debouncedParentUpdate = useCallback(
    (
      color: string,
      color2: string,
      color3: string,
      color4: string,
      type: "linear" | "radial" | "angular" | "diamond",
      angle: number,
      mode: "solid" | "gradient",
      show2: boolean,
      show3: boolean,
      show4: boolean
    ) => {
      if (colorUpdateTimeoutRef.current) {
        clearTimeout(colorUpdateTimeoutRef.current);
      }
      colorUpdateTimeoutRef.current = setTimeout(() => {
        if (onCustomChange) {
          onCustomChange(color, {
            color2: color2,
            color3: color3,
            color4: color4,
            type: type,
            angle: angle,
            mode: mode,
            showColor2: show2,
            showColor3: show3,
            showColor4: show4,
          });
        }
      }, 0); // Update immediately but async to avoid blocking
    },
    [onCustomChange]
  );

  const colors = {
    background: editorTheme === "dark" ? "#1E1E1E" : "#FFFFFF",
    border: editorTheme === "dark" ? "#2D2D2D" : "#E0E0E0",
    text: editorTheme === "dark" ? "#E0E0E0" : "#2D2D2D",
    textMuted: editorTheme === "dark" ? "#A0A0A0" : "#6B7280",
    buttonBg: editorTheme === "dark" ? "#2D2D2D" : "#F5F5F5",
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const themeNames: Record<ThemeType, string> = {
    // Original
    midnight: "Midnight",
    sunset: "Sunset",
    ocean: "Ocean",
    forest: "Forest",
    lavender: "Lavender",
    golden: "Golden",
    coral: "Coral",
    sky: "Sky",
    slate: "Slate",
    rose: "Rose",
    pearl: "Pearl",
    carbon: "Carbon",
    aurora: "Aurora",
    crimson: "Crimson",
    emerald: "Emerald",
    sapphire: "Sapphire",
    amethyst: "Amethyst",
    obsidian: "Obsidian",
    graphite: "Graphite",
    onyx: "Onyx",
    sunshine: "Sunshine",
    lime: "Lime",
    fuchsia: "Fuchsia",
    bubblegum: "Bubblegum",
    cream: "Cream",
    tropical: "Tropical",
    peacock: "Peacock",
    berry: "Berry",
    citrus: "Citrus",
    candy: "Candy",
    mango: "Mango",
    unicorn: "Unicorn",
    chocolate: "Chocolate",
    caramel: "Caramel",
    bronze: "Bronze",
    // Premium Dark
    noir: "Noir",
    charcoal: "Charcoal",
    abyss: "Abyss",
    eclipse: "Eclipse",
    // Tech/SaaS
    linear: "Linear",
    notion: "Notion",
    vercel: "Vercel",
    stripe: "Stripe",
    figma: "Figma",
    // Luxury
    platinum: "Platinum",
    titanium: "Titanium",
    champagne: "Champagne",
    rosegold: "Rose Gold",
    blackgold: "Black Gold",
    // Professional
    mercury: "Mercury",
    corporate: "Corporate",
    executive: "Executive",
    prestige: "Prestige",
    // Ethereal
    mist: "Mist",
    frost: "Frost",
    cloud: "Cloud",
    silk: "Silk",
    // Gradient Mesh
    cosmos: "Cosmos",
    nebula: "Nebula",
    prism: "Prism",
    hologram: "Hologram",
    // Earth Premium
    mahogany: "Mahogany",
    walnut: "Walnut",
    jade: "Jade",
    ruby: "Ruby",
    // Deep Ocean & Sea
    mariana: "Mariana",
    pacific: "Pacific",
    arctic: "Arctic",
    depths: "Depths",
    tidal: "Tidal",
    // Warm Earth & Desert
    sahara: "Sahara",
    terracotta: "Terracotta",
    clay: "Clay",
    sandstone: "Sandstone",
    dune: "Dune",
    // Deep Forest & Nature
    evergreen: "Evergreen",
    moss: "Moss",
    fern: "Fern",
    pine: "Pine",
    sage: "Sage",
    // Rich Metallics
    goldbar: "Gold Bar",
    copper: "Copper",
    brass: "Brass",
    steel: "Steel",
    pewter: "Pewter",
    // Cosmic & Space
    void: "Void",
    stellar: "Stellar",
    darkstar: "Dark Star",
    blackhole: "Black Hole",
    supernova: "Supernova",
    // Jewel Tones
    garnet: "Garnet",
    topaz: "Topaz",
    citrine: "Citrine",
    peridot: "Peridot",
    tourmaline: "Tourmaline",
    // Smoke & Mist
    smoke: "Smoke",
    ash: "Ash",
    storm: "Storm",
    thunder: "Thunder",
    haze: "Haze",
    // Luxury Fabric
    velvet: "Velvet",
    burgundy: "Burgundy",
    wine: "Wine",
    plum: "Plum",
    mulberry: "Mulberry",
    // Industrial & Urban
    concrete: "Concrete",
    iron: "Iron",
    zinc: "Zinc",
    lead: "Lead",
    gunmetal: "Gunmetal",
    // Cosmic
    cosmic1: "Cosmic Dream",
    cosmic2: "Purple Haze",
    cosmic3: "Sunset Fire",
    cosmic4: "Neon Green",
    cosmic5: "Electric Blue",
    cosmic6: "Pastel Rainbow",
    cosmic7: "Lavender Dream",
    cosmic8: "Dark Fade",
    cosmic9: "Purple Noir",
    cosmic10: "Cyan Flash",
    cosmic11: "Ocean Depth",
    cosmic12: "Violet Night",
    cosmic13: "Steel Gray",
    cosmic14: "Mystic Purple",
    cosmic15: "Coral Blush",
    cosmic16: "Pink Flame",
    cosmic17: "Rose Fire",
    cosmic18: "Warm Glow",
    cosmic19: "Bronze Shadow",
    cosmic20: "Pink Radiance",
    cosmic21: "Ocean Breeze",
    // Solid
    solid1: "Pink Blush",
    solid2: "Crimson Red",
    solid3: "Cloud White",
    solid4: "Light Gray",
    solid5: "Charcoal",
    solid6: "Tangerine",
    solid7: "Golden Yellow",
    solid8: "Lime Green",
    solid9: "Emerald",
    solid10: "Peach Pink",
    solid11: "Apricot",
    solid12: "Cream",
    solid13: "Lemon",
    solid14: "Mint",
    solid15: "Teal",
    solid16: "Ocean Blue",
    solid17: "Royal Blue",
    solid18: "Deep Purple",
    solid19: "Magenta",
    solid20: "Aqua Mint",
    solid21: "Sky Blue",
    solid22: "Periwinkle",
    solid23: "Lavender",
    solid24: "Pink Purple",
    solid25: "Rose Pink",
    // Custom
    custom: "Custom",
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: "60px",
        left: "20px",
        background: colors.background,
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
        border: `1px solid ${colors.border}`,
        zIndex: 10000,
        width: "420px",
        maxHeight: "70vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
          gap: "8px",
        }}
      >
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button
            onClick={() => setShowCustom(false)}
            style={{
              background: !showCustom ? "#3B82F6" : "transparent",
              border: !showCustom ? "none" : `1px solid ${colors.border}`,
              color: !showCustom ? "white" : colors.text,
              fontSize: "13px",
              fontWeight: 500,
              padding: "6px 12px",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            Select Theme
          </button>
          <button
            onClick={() => {
              setShowCustom(true);
              // Apply custom theme with all settings
              if (onCustomChange) {
                onCustomChange(customColor, {
                  color2: customColor2,
                  color3: customColor3,
                  color4: customColor4,
                  type: gradientType,
                  angle: gradientAngle,
                  mode: customMode,
                  showColor2,
                  showColor3,
                  showColor4,
                });
              }
            }}
            style={{
              background: showCustom ? "#3B82F6" : "transparent",
              border: showCustom ? "none" : `1px solid ${colors.border}`,
              color: showCustom ? "white" : colors.text,
              fontSize: "13px",
              fontWeight: 500,
              padding: "6px 12px",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "all 0.2s",
              position: "relative",
            }}
          >
            Custom
            {/* Premium Star Badge */}
            <span
              style={{
                position: "absolute",
                top: "-6px",
                right: "-6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "shimmer 2s ease-in-out infinite",
                filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
              }}
            >
              <SparkleIcon size={16} />
            </span>
          </button>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            color: colors.textMuted,
            cursor: "pointer",
            fontSize: "18px",
            padding: "0",
            width: "24px",
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ×
        </button>
      </div>

      {!showCustom ? (
        <div
          style={{
            overflowY: "auto",
            maxHeight: "calc(70vh - 100px)",
            paddingRight: "4px",
          }}
        >
          {/* Peace Section (Free Themes) */}
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                color: colors.text,
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "8px",
                paddingLeft: "2px",
              }}
            >
              Peace
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(8, 1fr)",
                gap: "6px",
              }}
            >
              {POPULAR_THEME_KEYS.map((themeKey) => {
                const isSelected = selectedTheme === themeKey;
                const isHovered = hoveredTheme === themeKey;

                return (
                  <div key={themeKey} style={{ position: "relative" }}>
                    <button
                      onClick={() => onThemeSelect(themeKey)}
                      onMouseEnter={() => setHoveredTheme(themeKey)}
                      onMouseLeave={() => setHoveredTheme(null)}
                      style={{
                        width: "100%",
                        aspectRatio: "1",
                        padding: "0",
                        background: THEMES[themeKey],
                        border: isSelected
                          ? "2px solid #3B82F6"
                          : "1.5px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "6px",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        position: "relative",
                        transform: isHovered ? "scale(1.08)" : "scale(1)",
                        boxShadow: isSelected
                          ? "0 0 0 2px rgba(59, 130, 246, 0.2)"
                          : isHovered
                          ? "0 3px 6px rgba(0, 0, 0, 0.3)"
                          : "none",
                      }}
                    >
                      {isSelected && (
                        <div
                          style={{
                            position: "absolute",
                            top: "2px",
                            right: "2px",
                            width: "12px",
                            height: "12px",
                            background: "#3B82F6",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="white"
                            strokeWidth="2.5"
                          >
                            <path d="M3 8l3 3 7-7" />
                          </svg>
                        </div>
                      )}
                    </button>
                    {isHovered && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "calc(100% + 8px)",
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: colors.background,
                          color: colors.text,
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "11px",
                          whiteSpace: "nowrap",
                          pointerEvents: "none",
                          zIndex: 1001,
                          border: `1px solid ${colors.border}`,
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
                        }}
                      >
                        {themeNames[themeKey]}
                        <div
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 0,
                            height: 0,
                            borderLeft: "4px solid transparent",
                            borderRight: "4px solid transparent",
                            borderTop: `4px solid ${colors.background}`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cosmic Section (Premium) */}
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                color: colors.text,
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "8px",
                paddingLeft: "2px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>Cosmic</span>
              <SparkleIcon size={12} />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(8, 1fr)",
                gap: "6px",
              }}
            >
              {COSMIC_THEME_KEYS.map((themeKey) => {
                const isSelected = selectedTheme === themeKey;
                const isHovered = hoveredTheme === themeKey;

                return (
                  <div key={themeKey} style={{ position: "relative" }}>
                    <button
                      onClick={() => onThemeSelect(themeKey)}
                      onMouseEnter={() => setHoveredTheme(themeKey)}
                      onMouseLeave={() => setHoveredTheme(null)}
                      style={{
                        width: "100%",
                        aspectRatio: "1",
                        padding: "0",
                        background: THEMES[themeKey],
                        border: isSelected
                          ? "2px solid #3B82F6"
                          : "1.5px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "6px",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        position: "relative",
                        transform: isHovered ? "scale(1.08)" : "scale(1)",
                        boxShadow: isSelected
                          ? "0 0 0 2px rgba(59, 130, 246, 0.2)"
                          : isHovered
                          ? "0 3px 6px rgba(0, 0, 0, 0.3)"
                          : "none",
                      }}
                    >
                      {isSelected && (
                        <div
                          style={{
                            position: "absolute",
                            top: "2px",
                            right: "2px",
                            width: "12px",
                            height: "12px",
                            background: "#3B82F6",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="white"
                            strokeWidth="2.5"
                          >
                            <path d="M3 8l3 3 7-7" />
                          </svg>
                        </div>
                      )}
                    </button>
                    {isHovered && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "calc(100% + 8px)",
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: colors.background,
                          color: colors.text,
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "11px",
                          whiteSpace: "nowrap",
                          pointerEvents: "none",
                          zIndex: 1001,
                          border: `1px solid ${colors.border}`,
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
                        }}
                      >
                        {themeNames[themeKey]}
                        <div
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 0,
                            height: 0,
                            borderLeft: "4px solid transparent",
                            borderRight: "4px solid transparent",
                            borderTop: `4px solid ${colors.background}`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bright & Colorful Section */}
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                color: colors.text,
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "8px",
                paddingLeft: "2px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>Bright & Colorful</span>
              <SparkleIcon size={12} />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(8, 1fr)",
                gap: "6px",
              }}
            >
              {BRIGHT_COLORFUL_THEME_KEYS.map((themeKey) => {
                const isSelected = selectedTheme === themeKey;
                const isHovered = hoveredTheme === themeKey;

                return (
                  <div key={themeKey} style={{ position: "relative" }}>
                    <button
                      onClick={() => onThemeSelect(themeKey)}
                      onMouseEnter={() => setHoveredTheme(themeKey)}
                      onMouseLeave={() => setHoveredTheme(null)}
                      style={{
                        width: "100%",
                        aspectRatio: "1",
                        padding: "0",
                        background: THEMES[themeKey],
                        border: isSelected
                          ? "2px solid #3B82F6"
                          : "1.5px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "6px",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        position: "relative",
                        transform: isHovered ? "scale(1.08)" : "scale(1)",
                        boxShadow: isSelected
                          ? "0 0 0 2px rgba(59, 130, 246, 0.2)"
                          : isHovered
                          ? "0 3px 6px rgba(0, 0, 0, 0.3)"
                          : "none",
                      }}
                    >
                      {isSelected && (
                        <div
                          style={{
                            position: "absolute",
                            top: "2px",
                            right: "2px",
                            width: "12px",
                            height: "12px",
                            background: "#3B82F6",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="white"
                            strokeWidth="2.5"
                          >
                            <path d="M3 8l3 3 7-7" />
                          </svg>
                        </div>
                      )}
                    </button>
                    {isHovered && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "calc(100% + 8px)",
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: colors.background,
                          color: colors.text,
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "11px",
                          whiteSpace: "nowrap",
                          pointerEvents: "none",
                          zIndex: 1001,
                          border: `1px solid ${colors.border}`,
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
                        }}
                      >
                        {themeNames[themeKey]}
                        <div
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 0,
                            height: 0,
                            borderLeft: "4px solid transparent",
                            borderRight: "4px solid transparent",
                            borderTop: `4px solid ${colors.background}`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Nature & Earth Section */}
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                color: colors.text,
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "8px",
                paddingLeft: "2px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>Nature & Earth</span>
              <SparkleIcon size={12} />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(8, 1fr)",
                gap: "6px",
              }}
            >
              {NATURE_EARTH_THEME_KEYS.map((themeKey) => {
                const isSelected = selectedTheme === themeKey;
                const isHovered = hoveredTheme === themeKey;

                return (
                  <div key={themeKey} style={{ position: "relative" }}>
                    <button
                      onClick={() => onThemeSelect(themeKey)}
                      onMouseEnter={() => setHoveredTheme(themeKey)}
                      onMouseLeave={() => setHoveredTheme(null)}
                      style={{
                        width: "100%",
                        aspectRatio: "1",
                        padding: "0",
                        background: THEMES[themeKey],
                        border: isSelected
                          ? "2px solid #3B82F6"
                          : "1.5px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "6px",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        position: "relative",
                        transform: isHovered ? "scale(1.08)" : "scale(1)",
                        boxShadow: isSelected
                          ? "0 0 0 2px rgba(59, 130, 246, 0.2)"
                          : isHovered
                          ? "0 3px 6px rgba(0, 0, 0, 0.3)"
                          : "none",
                      }}
                    >
                      {isSelected && (
                        <div
                          style={{
                            position: "absolute",
                            top: "2px",
                            right: "2px",
                            width: "12px",
                            height: "12px",
                            background: "#3B82F6",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="white"
                            strokeWidth="2.5"
                          >
                            <path d="M3 8l3 3 7-7" />
                          </svg>
                        </div>
                      )}
                    </button>
                    {isHovered && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "calc(100% + 8px)",
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: colors.background,
                          color: colors.text,
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "11px",
                          whiteSpace: "nowrap",
                          pointerEvents: "none",
                          zIndex: 1001,
                          border: `1px solid ${colors.border}`,
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
                        }}
                      >
                        {themeNames[themeKey]}
                        <div
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 0,
                            height: 0,
                            borderLeft: "4px solid transparent",
                            borderRight: "4px solid transparent",
                            borderTop: `4px solid ${colors.background}`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Luxury & Metallic Section */}
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                color: colors.text,
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "8px",
                paddingLeft: "2px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>Luxury & Metallic</span>
              <SparkleIcon size={12} />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(8, 1fr)",
                gap: "6px",
              }}
            >
              {LUXURY_METALLIC_THEME_KEYS.map((themeKey) => {
                const isSelected = selectedTheme === themeKey;
                const isHovered = hoveredTheme === themeKey;

                return (
                  <div key={themeKey} style={{ position: "relative" }}>
                    <button
                      onClick={() => onThemeSelect(themeKey)}
                      onMouseEnter={() => setHoveredTheme(themeKey)}
                      onMouseLeave={() => setHoveredTheme(null)}
                      style={{
                        width: "100%",
                        aspectRatio: "1",
                        padding: "0",
                        background: THEMES[themeKey],
                        border: isSelected
                          ? "2px solid #3B82F6"
                          : "1.5px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "6px",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        position: "relative",
                        transform: isHovered ? "scale(1.08)" : "scale(1)",
                        boxShadow: isSelected
                          ? "0 0 0 2px rgba(59, 130, 246, 0.2)"
                          : isHovered
                          ? "0 3px 6px rgba(0, 0, 0, 0.3)"
                          : "none",
                      }}
                    >
                      {isSelected && (
                        <div
                          style={{
                            position: "absolute",
                            top: "2px",
                            right: "2px",
                            width: "12px",
                            height: "12px",
                            background: "#3B82F6",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="white"
                            strokeWidth="2.5"
                          >
                            <path d="M3 8l3 3 7-7" />
                          </svg>
                        </div>
                      )}
                    </button>
                    {isHovered && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "calc(100% + 8px)",
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: colors.background,
                          color: colors.text,
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "11px",
                          whiteSpace: "nowrap",
                          pointerEvents: "none",
                          zIndex: 1001,
                          border: `1px solid ${colors.border}`,
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
                        }}
                      >
                        {themeNames[themeKey]}
                        <div
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 0,
                            height: 0,
                            borderLeft: "4px solid transparent",
                            borderRight: "4px solid transparent",
                            borderTop: `4px solid ${colors.background}`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Solid Section */}
          <div>
            <div
              style={{
                color: colors.text,
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "8px",
                paddingLeft: "2px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>Solid</span>
              <SparkleIcon size={12} />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(8, 1fr)",
                gap: "6px",
                marginBottom: "12px",
              }}
            >
              {SOLID_THEME_KEYS.map((themeKey) => {
                const isSelected = selectedTheme === themeKey;
                const isHovered = hoveredTheme === themeKey;

                return (
                  <div key={themeKey} style={{ position: "relative" }}>
                    <button
                      onClick={() => onThemeSelect(themeKey)}
                      onMouseEnter={() => setHoveredTheme(themeKey)}
                      onMouseLeave={() => setHoveredTheme(null)}
                      style={{
                        width: "100%",
                        aspectRatio: "1",
                        padding: "0",
                        background: THEMES[themeKey],
                        border: isSelected
                          ? "2px solid #3B82F6"
                          : "1.5px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "6px",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        position: "relative",
                        transform: isHovered ? "scale(1.08)" : "scale(1)",
                        boxShadow: isSelected
                          ? "0 0 0 2px rgba(59, 130, 246, 0.2)"
                          : isHovered
                          ? "0 3px 6px rgba(0, 0, 0, 0.3)"
                          : "none",
                      }}
                    >
                      {isSelected && (
                        <div
                          style={{
                            position: "absolute",
                            top: "2px",
                            right: "2px",
                            width: "12px",
                            height: "12px",
                            background: "#3B82F6",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="white"
                            strokeWidth="2.5"
                          >
                            <path d="M3 8l3 3 7-7" />
                          </svg>
                        </div>
                      )}
                    </button>
                    {isHovered && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "calc(100% + 8px)",
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: colors.background,
                          color: colors.text,
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "11px",
                          whiteSpace: "nowrap",
                          pointerEvents: "none",
                          zIndex: 1001,
                          border: `1px solid ${colors.border}`,
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
                        }}
                      >
                        {themeNames[themeKey]}
                        <div
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 0,
                            height: 0,
                            borderLeft: "4px solid transparent",
                            borderRight: "4px solid transparent",
                            borderTop: `4px solid ${colors.background}`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dark & Premium Section */}
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                color: colors.text,
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "8px",
                paddingLeft: "2px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>Dark & Premium</span>
              <SparkleIcon size={12} />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(8, 1fr)",
                gap: "6px",
              }}
            >
              {DARK_PREMIUM_THEME_KEYS.map((themeKey) => {
                const isSelected = selectedTheme === themeKey;
                const isHovered = hoveredTheme === themeKey;

                return (
                  <div key={themeKey} style={{ position: "relative" }}>
                    <button
                      onClick={() => onThemeSelect(themeKey)}
                      onMouseEnter={() => setHoveredTheme(themeKey)}
                      onMouseLeave={() => setHoveredTheme(null)}
                      style={{
                        width: "100%",
                        aspectRatio: "1",
                        padding: "0",
                        background: THEMES[themeKey],
                        border: isSelected
                          ? "2px solid #3B82F6"
                          : "1.5px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "6px",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        position: "relative",
                        transform: isHovered ? "scale(1.08)" : "scale(1)",
                        boxShadow: isSelected
                          ? "0 0 0 2px rgba(59, 130, 246, 0.2)"
                          : isHovered
                          ? "0 3px 6px rgba(0, 0, 0, 0.3)"
                          : "none",
                      }}
                    >
                      {isSelected && (
                        <div
                          style={{
                            position: "absolute",
                            top: "2px",
                            right: "2px",
                            width: "12px",
                            height: "12px",
                            background: "#3B82F6",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="white"
                            strokeWidth="2.5"
                          >
                            <path d="M3 8l3 3 7-7" />
                          </svg>
                        </div>
                      )}
                    </button>
                    {isHovered && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "calc(100% + 8px)",
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: colors.background,
                          color: colors.text,
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "11px",
                          whiteSpace: "nowrap",
                          pointerEvents: "none",
                          zIndex: 1001,
                          border: `1px solid ${colors.border}`,
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
                        }}
                      >
                        {themeNames[themeKey]}
                        <div
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 0,
                            height: 0,
                            borderLeft: "4px solid transparent",
                            borderRight: "4px solid transparent",
                            borderTop: `4px solid ${colors.background}`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Custom Color Picker */
        <div
          style={{
            marginBottom: "12px",
            overflowY: "auto",
            maxHeight: "calc(70vh - 100px)",
            paddingRight: "4px",
          }}
        >
          {/* Tutorial Section */}
          <div
            style={{
              marginBottom: "16px",
              padding: "12px",
              backgroundColor: colors.buttonBg,
              border: `1px solid ${colors.border}`,
              borderRadius: "8px",
            }}
          >
            <div
              style={{
                color: colors.text,
                fontSize: "12px",
                marginBottom: "8px",
                lineHeight: "1.4",
              }}
            >
              Watch tutorial to understand how to use custom colors and
              gradients.
            </div>
            <button
              onClick={() =>
                window.open(
                  "https://youtu.be/FMfCSW-DTKw?si=esACvhbXrT0Ea1hM",
                  "_blank"
                )
              }
              style={{
                width: "100%",
                padding: "8px 16px",
                fontSize: "12px",
                cursor: "pointer",
                backgroundColor: "#8B5CF6",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
              </svg>
              Watch Tutorial
            </button>
          </div>

          {/* Gradient Section */}
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                color: colors.text,
                fontSize: "13px",
                fontWeight: 500,
                marginBottom: "8px",
              }}
            >
              Gradient
            </div>

            {/* Gradient Type Selector */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "6px",
                marginBottom: "12px",
              }}
            >
              {(["linear", "radial", "angular", "diamond"] as const).map(
                (type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setGradientType(type);
                      setCustomMode("gradient");
                      if (onCustomChange) {
                        onCustomChange(customColor, {
                          color2: customColor2,
                          color3: customColor3,
                          color4: customColor4,
                          type: type,
                          angle: gradientAngle,
                          mode: "gradient",
                          showColor2,
                          showColor3,
                          showColor4,
                        });
                      }
                    }}
                    style={{
                      padding: "8px",
                      background:
                        gradientType === type && customMode === "gradient"
                          ? "#3B82F6"
                          : colors.background,
                      border: `1px solid ${colors.border}`,
                      borderRadius: "6px",
                      color:
                        gradientType === type && customMode === "gradient"
                          ? "white"
                          : colors.text,
                      fontSize: "11px",
                      fontWeight: 500,
                      cursor: "pointer",
                      textTransform: "capitalize",
                      transition: "all 0.2s",
                    }}
                  >
                    {type}
                  </button>
                )
              )}
            </div>

            {/* Angle/Direction Control */}
            <div
              style={{
                marginBottom: "12px",
                padding: "12px",
                background: colors.background,
                borderRadius: "6px",
                border: `1px solid ${colors.border}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    color: colors.text,
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  Direction
                </span>
                <span
                  style={{
                    color: colors.textMuted,
                    fontSize: "11px",
                    fontFamily: "monospace",
                  }}
                >
                  {gradientAngle}°
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={gradientAngle}
                onChange={(e) => {
                  const newAngle = parseInt(e.target.value);
                  setGradientAngle(newAngle);
                  setCustomMode("gradient");
                  if (onCustomChange) {
                    onCustomChange(customColor, {
                      color2: customColor2,
                      color3: customColor3,
                      color4: customColor4,
                      type: gradientType,
                      angle: newAngle,
                      mode: "gradient",
                      showColor2,
                      showColor3,
                      showColor4,
                    });
                  }
                }}
                style={{
                  width: "100%",
                  height: "4px",
                  borderRadius: "2px",
                  background: (() => {
                    const activeColors = [customColor];
                    if (showColor2) activeColors.push(customColor2);
                    if (showColor3) activeColors.push(customColor3);
                    if (showColor4) activeColors.push(customColor4);
                    const colorStops = activeColors
                      .map((color, index) => {
                        const percentage =
                          (index / (activeColors.length - 1)) * 100;
                        return `${color} ${percentage}%`;
                      })
                      .join(", ");
                    return `linear-gradient(90deg, ${colorStops})`;
                  })(),
                  outline: "none",
                  cursor: "pointer",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "4px",
                }}
              >
                <span style={{ color: colors.textMuted, fontSize: "10px" }}>
                  0°
                </span>
                <span style={{ color: colors.textMuted, fontSize: "10px" }}>
                  90°
                </span>
                <span style={{ color: colors.textMuted, fontSize: "10px" }}>
                  180°
                </span>
                <span style={{ color: colors.textMuted, fontSize: "10px" }}>
                  270°
                </span>
                <span style={{ color: colors.textMuted, fontSize: "10px" }}>
                  360°
                </span>
              </div>
            </div>

            {/* Color Pickers for Gradient - 4 colors with show/hide toggles */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "6px",
              }}
            >
              {/* Color 1 - Always visible */}
              <div>
                <div
                  style={{
                    color: colors.textMuted,
                    fontSize: "10px",
                    marginBottom: "4px",
                    textAlign: "center",
                  }}
                >
                  Color 1
                </div>
                <input
                  type="color"
                  value={customColor}
                  onInput={(e) => {
                    const newColor = (e.target as HTMLInputElement).value;
                    setCustomColor(newColor);
                    setCustomMode("gradient");
                    debouncedParentUpdate(
                      newColor,
                      customColor2,
                      customColor3,
                      customColor4,
                      gradientType,
                      gradientAngle,
                      "gradient",
                      showColor2,
                      showColor3,
                      showColor4
                    );
                  }}
                  style={{
                    width: "100%",
                    height: "50px",
                    border: `1px solid ${colors.border}`,
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                />
                <input
                  type="text"
                  value={customColor}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (newValue.startsWith("#")) {
                      setCustomColor(newValue);
                      if (/^#[0-9A-F]{6}$/i.test(newValue)) {
                        setCustomMode("gradient");
                        if (onCustomChange) {
                          onCustomChange(newValue, {
                            color2: customColor2,
                            color3: customColor3,
                            color4: customColor4,
                            type: gradientType,
                            angle: gradientAngle,
                            mode: "gradient",
                            showColor2,
                            showColor3,
                            showColor4,
                          });
                        }
                      }
                    }
                  }}
                  style={{
                    width: "100%",
                    marginTop: "4px",
                    padding: "4px 8px",
                    background: colors.background,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "4px",
                    color: colors.text,
                    fontSize: "11px",
                    fontFamily: "monospace",
                  }}
                />
              </div>

              {/* Color 2 with toggle */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "4px",
                  }}
                >
                  <span style={{ color: colors.textMuted, fontSize: "10px" }}>
                    Color 2
                  </span>
                  <button
                    onClick={() => {
                      const newShowColor2 = !showColor2;
                      setShowColor2(newShowColor2);
                      setCustomMode("gradient");
                      if (onCustomChange) {
                        onCustomChange(customColor, {
                          color2: customColor2,
                          color3: customColor3,
                          color4: customColor4,
                          type: gradientType,
                          angle: gradientAngle,
                          mode: "gradient",
                          showColor2: newShowColor2,
                          showColor3,
                          showColor4,
                        });
                      }
                    }}
                    style={{
                      background: showColor2 ? "#3B82F6" : colors.border,
                      color: showColor2 ? "white" : colors.textMuted,
                      border: "none",
                      borderRadius: "3px",
                      padding: "2px 6px",
                      fontSize: "9px",
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
                  >
                    {showColor2 ? "Hide" : "Show"}
                  </button>
                </div>
                <input
                  type="color"
                  value={customColor2}
                  disabled={!showColor2}
                  onInput={(e) => {
                    const newColor = (e.target as HTMLInputElement).value;
                    setCustomColor2(newColor);
                    setCustomMode("gradient");
                    debouncedParentUpdate(
                      customColor,
                      newColor,
                      customColor3,
                      customColor4,
                      gradientType,
                      gradientAngle,
                      "gradient",
                      showColor2,
                      showColor3,
                      showColor4
                    );
                  }}
                  style={{
                    width: "100%",
                    height: "50px",
                    border: `1px solid ${colors.border}`,
                    borderRadius: "6px",
                    cursor: showColor2 ? "pointer" : "not-allowed",
                    opacity: showColor2 ? 1 : 0.5,
                  }}
                />
                <input
                  type="text"
                  value={customColor2}
                  disabled={!showColor2}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (newValue.startsWith("#")) {
                      setCustomColor2(newValue);
                      if (/^#[0-9A-F]{6}$/i.test(newValue)) {
                        setCustomMode("gradient");
                        if (onCustomChange) {
                          onCustomChange(customColor, {
                            color2: newValue,
                            color3: customColor3,
                            color4: customColor4,
                            type: gradientType,
                            angle: gradientAngle,
                            mode: "gradient",
                            showColor2,
                            showColor3,
                            showColor4,
                          });
                        }
                      }
                    }
                  }}
                  style={{
                    width: "100%",
                    marginTop: "4px",
                    padding: "4px 6px",
                    background: colors.background,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "4px",
                    color: colors.text,
                    fontSize: "10px",
                    fontFamily: "monospace",
                    opacity: showColor2 ? 1 : 0.5,
                  }}
                />
              </div>

              {/* Color 3 with toggle */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "4px",
                  }}
                >
                  <span style={{ color: colors.textMuted, fontSize: "10px" }}>
                    Color 3
                  </span>
                  <button
                    onClick={() => {
                      const newShowColor3 = !showColor3;
                      setShowColor3(newShowColor3);
                      setCustomMode("gradient");
                      if (onCustomChange) {
                        onCustomChange(customColor, {
                          color2: customColor2,
                          color3: customColor3,
                          color4: customColor4,
                          type: gradientType,
                          angle: gradientAngle,
                          mode: "gradient",
                          showColor2,
                          showColor3: newShowColor3,
                          showColor4,
                        });
                      }
                    }}
                    style={{
                      background: showColor3 ? "#3B82F6" : colors.border,
                      color: showColor3 ? "white" : colors.textMuted,
                      border: "none",
                      borderRadius: "3px",
                      padding: "2px 6px",
                      fontSize: "9px",
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
                  >
                    {showColor3 ? "Hide" : "Show"}
                  </button>
                </div>
                <input
                  type="color"
                  value={customColor3}
                  disabled={!showColor3}
                  onInput={(e) => {
                    const newColor = (e.target as HTMLInputElement).value;
                    setCustomColor3(newColor);
                    setCustomMode("gradient");
                    debouncedParentUpdate(
                      customColor,
                      customColor2,
                      newColor,
                      customColor4,
                      gradientType,
                      gradientAngle,
                      "gradient",
                      showColor2,
                      showColor3,
                      showColor4
                    );
                  }}
                  style={{
                    width: "100%",
                    height: "50px",
                    border: `1px solid ${colors.border}`,
                    borderRadius: "6px",
                    cursor: showColor3 ? "pointer" : "not-allowed",
                    opacity: showColor3 ? 1 : 0.5,
                  }}
                />
                <input
                  type="text"
                  value={customColor3}
                  disabled={!showColor3}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (newValue.startsWith("#")) {
                      setCustomColor3(newValue);
                      if (/^#[0-9A-F]{6}$/i.test(newValue)) {
                        setCustomMode("gradient");
                        if (onCustomChange) {
                          onCustomChange(customColor, {
                            color2: customColor2,
                            color3: newValue,
                            color4: customColor4,
                            type: gradientType,
                            angle: gradientAngle,
                            mode: "gradient",
                            showColor2,
                            showColor3,
                            showColor4,
                          });
                        }
                      }
                    }
                  }}
                  style={{
                    width: "100%",
                    marginTop: "4px",
                    padding: "4px 6px",
                    background: colors.background,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "4px",
                    color: colors.text,
                    fontSize: "10px",
                    fontFamily: "monospace",
                    opacity: showColor3 ? 1 : 0.5,
                  }}
                />
              </div>

              {/* Color 4 with toggle */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "4px",
                  }}
                >
                  <span style={{ color: colors.textMuted, fontSize: "10px" }}>
                    Color 4
                  </span>
                  <button
                    onClick={() => {
                      const newShowColor4 = !showColor4;
                      setShowColor4(newShowColor4);
                      setCustomMode("gradient");
                      if (onCustomChange) {
                        onCustomChange(customColor, {
                          color2: customColor2,
                          color3: customColor3,
                          color4: customColor4,
                          type: gradientType,
                          angle: gradientAngle,
                          mode: "gradient",
                          showColor2,
                          showColor3,
                          showColor4: newShowColor4,
                        });
                      }
                    }}
                    style={{
                      background: showColor4 ? "#3B82F6" : colors.border,
                      color: showColor4 ? "white" : colors.textMuted,
                      border: "none",
                      borderRadius: "3px",
                      padding: "2px 6px",
                      fontSize: "9px",
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
                  >
                    {showColor4 ? "Hide" : "Show"}
                  </button>
                </div>
                <input
                  type="color"
                  value={customColor4}
                  disabled={!showColor4}
                  onInput={(e) => {
                    const newColor = (e.target as HTMLInputElement).value;
                    setCustomColor4(newColor);
                    setCustomMode("gradient");
                    debouncedParentUpdate(
                      customColor,
                      customColor2,
                      customColor3,
                      newColor,
                      gradientType,
                      gradientAngle,
                      "gradient",
                      showColor2,
                      showColor3,
                      showColor4
                    );
                  }}
                  style={{
                    width: "100%",
                    height: "50px",
                    border: `1px solid ${colors.border}`,
                    borderRadius: "6px",
                    cursor: showColor4 ? "pointer" : "not-allowed",
                    opacity: showColor4 ? 1 : 0.5,
                  }}
                />
                <input
                  type="text"
                  value={customColor4}
                  disabled={!showColor4}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (newValue.startsWith("#")) {
                      setCustomColor4(newValue);
                      if (/^#[0-9A-F]{6}$/i.test(newValue)) {
                        setCustomMode("gradient");
                        if (onCustomChange) {
                          onCustomChange(customColor, {
                            color2: customColor2,
                            color3: customColor3,
                            color4: newValue,
                            type: gradientType,
                            angle: gradientAngle,
                            mode: "gradient",
                            showColor2,
                            showColor3,
                            showColor4,
                          });
                        }
                      }
                    }
                  }}
                  style={{
                    width: "100%",
                    marginTop: "4px",
                    padding: "4px 6px",
                    background: colors.background,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "4px",
                    color: colors.text,
                    fontSize: "10px",
                    fontFamily: "monospace",
                    opacity: showColor4 ? 1 : 0.5,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Solid Section */}
          <div>
            <div
              style={{
                color: colors.text,
                fontSize: "13px",
                fontWeight: 500,
                marginBottom: "8px",
              }}
            >
              Solid
            </div>
            <input
              type="color"
              value={customColor}
              onInput={(e) => {
                const newColor = (e.target as HTMLInputElement).value;
                setCustomColor(newColor);
                setCustomMode("solid");
                debouncedParentUpdate(
                  newColor,
                  customColor2,
                  customColor3,
                  customColor4,
                  gradientType,
                  gradientAngle,
                  "solid",
                  showColor2,
                  showColor3,
                  showColor4
                );
              }}
              style={{
                width: "100%",
                height: "120px",
                border: `1px solid ${colors.border}`,
                borderRadius: "8px",
                cursor: "pointer",
              }}
            />
            <div
              style={{
                marginTop: "8px",
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: colors.text,
                  fontSize: "12px",
                  fontWeight: 500,
                }}
              >
                Hex:
              </span>
              <input
                type="text"
                value={customColor}
                onChange={(e) => {
                  const newValue = e.target.value;
                  if (newValue.startsWith("#")) {
                    setCustomColor(newValue);
                    if (/^#[0-9A-F]{6}$/i.test(newValue)) {
                      setCustomMode("solid");
                      if (onCustomChange) {
                        onCustomChange(newValue, {
                          color2: customColor2,
                          color3: customColor3,
                          color4: customColor4,
                          type: gradientType,
                          angle: gradientAngle,
                          mode: "solid",
                          showColor2,
                          showColor3,
                          showColor4,
                        });
                      }
                    }
                  }
                }}
                style={{
                  flex: 1,
                  padding: "6px 12px",
                  background: colors.background,
                  border: `1px solid ${colors.border}`,
                  borderRadius: "6px",
                  color: colors.text,
                  fontSize: "12px",
                  fontFamily: "monospace",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ScreenshotEditor() {
  const router = useRouter();
  const { user } = useAuth();

  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTool, setActiveTool] = useState<Tool>("select");
  const [cropArea, setCropArea] = useState<CropArea | null>(null);
  const [cropMode, setCropMode] = useState<"freeform" | "border">("border");
  const [borderCrop, setBorderCrop] = useState<{
    top: number;
    bottom: number;
    left: number;
    right: number;
  } | null>(null);
  const [borderCropDragEdge, setBorderCropDragEdge] = useState<string | null>(
    null
  );
  const [isDragging, setIsDragging] = useState(false);

  // Zoom and pan state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [spacePressed, setSpacePressed] = useState(false);
  const [panModeEnabled, setPanModeEnabled] = useState(false);

  // Refs for smooth panning (avoid state updates during drag)
  const panRef = useRef({ x: 0, y: 0 });
  const panStartRef = useRef({ x: 0, y: 0 });
  const isPanningRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const transformContainerRef = useRef<HTMLDivElement>(null);

  // Visual settings
  const [includeWindowChrome, setIncludeWindowChrome] = useState(true);
  const [windowChromeTheme, setWindowChromeTheme] = useState<"light" | "dark">(
    "dark"
  );
  const [showBackground, setShowBackground] = useState(true);
  const [editorTheme, setEditorTheme] = useState<"light" | "dark">("light");
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>("cosmic1"); // Cosmic Dream as default
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [customColor, setCustomColor] = useState("#ededed");
  const [customColor2, setCustomColor2] = useState("#eb00eb");
  const [customColor3, setCustomColor3] = useState("#731ec8");
  const [customColor4, setCustomColor4] = useState("#1818dc");
  const [gradientType, setGradientType] = useState<
    "linear" | "radial" | "angular" | "diamond"
  >("linear");
  const [gradientAngle, setGradientAngle] = useState(135);
  const [customMode, setCustomMode] = useState<"solid" | "gradient">("gradient");
  const [showColor2, setShowColor2] = useState(true);
  const [showColor3, setShowColor3] = useState(true);
  const [showColor4, setShowColor4] = useState(true);

  // Width and padding
  const [cardWidth, setCardWidth] = useState(50);
  const [cardPadding, setCardPadding] = useState(31.25); // 90px default padding
  const [showWidthControl, setShowWidthControl] = useState(false);
  const [showPaddingControl, setShowPaddingControl] = useState(false);

  // Copy/feedback state
  const [isCopied, setIsCopied] = useState(false);

  // Tool notification state
  const [toolNotification, setToolNotification] = useState<string>("");
  const [showToolNotification, setShowToolNotification] = useState(false);

  // Contact popup state
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [isEmailCopied, setIsEmailCopied] = useState(false);

  // Login prompt state
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [loginPromptAction, setLoginPromptAction] = useState<
    "download" | "copy"
  >("download");

  // Quality modal state
  const [showQualityModal, setShowQualityModal] = useState(false);

  // Subscription state
  const [hasProPlan, setHasProPlan] = useState(false);
  const [usedPremiumFeatures, setUsedPremiumFeatures] = useState(false);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);

  // History
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Annotations
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [currentAnnotation, setCurrentAnnotation] = useState<Annotation | null>(
    null
  );
  const [isDrawingAnnotation, setIsDrawingAnnotation] = useState(false);
  const [annotationColor, setAnnotationColor] = useState("#FF0000");
  const [annotationOpacity, setAnnotationOpacity] = useState(0.5);
  const [annotationStrokeWidth, setAnnotationStrokeWidth] = useState(3);
  const [annotationFilled, setAnnotationFilled] = useState(false);

  // Drag and drop
  const [isDragOver, setIsDragOver] = useState(false);

  // Onboarding state
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(true); // Default true to prevent flash

  // Unsaved changes prompt state
  const [showUnsavedPrompt, setShowUnsavedPrompt] = useState(false);
  const [navigateAfterDownload, setNavigateAfterDownload] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const annotationCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const windowChromeRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper function to get the background
  const getThemeBackground = () => {
    if (selectedTheme === "custom") {
      if (customMode === "solid") {
        return customColor;
      } else {
        // Build array of active colors based on show/hide toggles
        const activeColors = [customColor];
        if (showColor2) activeColors.push(customColor2);
        if (showColor3) activeColors.push(customColor3);
        if (showColor4) activeColors.push(customColor4);
        return generateGradient(
          gradientType,
          activeColors,
          gradientAngle
        );
      }
    }
    return THEMES[selectedTheme];
  };

  // Theme colors
  const themeColors = {
    dark: {
      background: "#0D0D0D",
      toolbar: "#1E1E1E",
      border: "#2D2D2D",
      text: "#FFFFFF",
      textSecondary: "#E0E0E0",
      textMuted: "#A0A0A0",
      buttonBg: "#2D2D2D",
      buttonBgHover: "#3D3D3D",
      tooltipBg: "#1E1E1E",
      sliderTrack: "#3D3D3D",
      cardBg: "#1E1E1E",
    },
    light: {
      background: "#F5F5F5",
      toolbar: "#FFFFFF",
      border: "#E0E0E0",
      text: "#1A1A1A",
      textSecondary: "#2D2D2D",
      textMuted: "#6B7280",
      buttonBg: "#F3F4F6",
      buttonBgHover: "#E5E7EB",
      tooltipBg: "#FFFFFF",
      sliderTrack: "#E5E7EB",
      cardBg: "#FFFFFF",
    },
  };

  const colors = themeColors[editorTheme];

  const calculateCardWidth = (sliderValue: number) => {
    const minWidth = 600;
    const maxWidth = 1400;
    return minWidth + (maxWidth - minWidth) * (sliderValue / 100);
  };

  const calculateCardPadding = (sliderValue: number) => {
    const minPadding = 40;
    const maxPadding = 200;
    return minPadding + (maxPadding - minPadding) * (sliderValue / 100);
  };

  // Handle image load from various sources
  const handleImageLoad = useCallback((dataUrl: string) => {
    setImageUrl(dataUrl);
    setIsLoaded(false);
  }, []);

  // Handle file input
  const handleFileSelect = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) handleImageLoad(result);
      };
      reader.readAsDataURL(file);
    },
    [handleImageLoad]
  );

  // Check subscription status
  useEffect(() => {
    const checkSubscription = async () => {
      const isPro = await hasProSubscription();
      setHasProPlan(isPro);
    };

    if (user) {
      checkSubscription();
    }
  }, [user]);

  // Handle paste
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith("image/")) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) handleFileSelect(file);
          break;
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [handleFileSelect]);

  // Check onboarding status on mount
  useEffect(() => {
    const seen = localStorage.getItem("ilovesnapshots_onboarding_complete");
    if (!seen) {
      setHasSeenOnboarding(false);
      setShowOnboarding(true);
    }
  }, []);

  // Onboarding steps configuration
  const onboardingSteps = [
    {
      title: "Welcome to ILoveSnapshots! 🎨",
      description:
        "Create beautiful screenshots in seconds. Let's show you around!",
      icon: "👋",
    },
    {
      title: "Upload Your Screenshot",
      description:
        "Drag & drop an image, paste from clipboard (Ctrl+V), or click to upload. Supports PNG, JPG, GIF, and WebP.",
      icon: "📤",
    },
    {
      title: "Choose a Theme",
      description:
        "Click the 'Theme' button to pick from 100+ beautiful gradient backgrounds for your screenshot.",
      icon: "🎨",
    },
    {
      title: "Customize Your Design",
      description:
        "Adjust padding, width, and toggle the window chrome on/off. Use annotation tools to add arrows, shapes, and highlights.",
      icon: "✨",
    },
    {
      title: "Export Your Creation",
      description:
        "Download your polished screenshot or copy it directly to clipboard. That's it - you're ready to create!",
      icon: "🚀",
    },
  ];

  const handleCompleteOnboarding = () => {
    localStorage.setItem("ilovesnapshots_onboarding_complete", "true");
    setShowOnboarding(false);
    setHasSeenOnboarding(true);
  };

  const handleNextStep = () => {
    if (onboardingStep < onboardingSteps.length - 1) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      handleCompleteOnboarding();
    }
  };

  const handlePrevStep = () => {
    if (onboardingStep > 0) {
      setOnboardingStep(onboardingStep - 1);
    }
  };

  const handleSkipOnboarding = () => {
    handleCompleteOnboarding();
  };

  // Handle drag and drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect]
  );

  // Prevent body scroll and browser zoom
  useEffect(() => {
    // Prevent page scroll by setting body overflow to hidden
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;
    const originalOverscrollBehavior = document.body.style.overscrollBehavior;
    const originalOverscrollBehaviorX = document.body.style.overscrollBehaviorX;

    // Also save HTML element styles
    const htmlElement = document.documentElement;
    const originalHtmlOverflow = htmlElement.style.overflow;
    const originalHtmlTouchAction = htmlElement.style.touchAction;
    const originalHtmlOverscrollBehavior = htmlElement.style.overscrollBehavior;
    const originalHtmlOverscrollBehaviorX =
      htmlElement.style.overscrollBehaviorX;

    // Apply to both body and html
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.body.style.overscrollBehavior = "none";
    document.body.style.overscrollBehaviorX = "none";

    htmlElement.style.overflow = "hidden";
    htmlElement.style.touchAction = "none";
    htmlElement.style.overscrollBehavior = "none";
    htmlElement.style.overscrollBehaviorX = "none";

    const preventBrowserZoom = (e: WheelEvent) => {
      // Detect Ctrl+wheel (trackpad pinch) or Meta+wheel
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Prevent touchpad pinch-to-zoom gestures
    const preventGestureZoom = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Also prevent keyboard zoom shortcuts globally (except our custom ones)
    const preventKeyboardZoom = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "+" || e.key === "=" || e.key === "-" || e.key === "0")
      ) {
        // Let our custom handlers take over
        e.preventDefault();
      }
    };

    // Prevent browser back/forward swipe navigation
    const preventSwipeNavigation = (e: TouchEvent) => {
      // Prevent two-finger horizontal swipes from triggering browser navigation
      if (e.touches.length === 2) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Add listeners with passive: false to allow preventDefault
    document.addEventListener("wheel", preventBrowserZoom, {
      passive: false,
      capture: true,
    });
    document.addEventListener("gesturestart", preventGestureZoom, {
      passive: false,
    });
    document.addEventListener("gesturechange", preventGestureZoom, {
      passive: false,
    });
    document.addEventListener("gestureend", preventGestureZoom, {
      passive: false,
    });
    document.addEventListener("keydown", preventKeyboardZoom, {
      capture: true,
    });
    document.addEventListener("touchstart", preventSwipeNavigation, {
      passive: false,
      capture: true,
    });
    document.addEventListener("touchmove", preventSwipeNavigation, {
      passive: false,
      capture: true,
    });

    return () => {
      // Restore original body styles
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
      document.body.style.overscrollBehavior = originalOverscrollBehavior;
      document.body.style.overscrollBehaviorX = originalOverscrollBehaviorX;

      // Restore original html styles
      htmlElement.style.overflow = originalHtmlOverflow;
      htmlElement.style.touchAction = originalHtmlTouchAction;
      htmlElement.style.overscrollBehavior = originalHtmlOverscrollBehavior;
      htmlElement.style.overscrollBehaviorX = originalHtmlOverscrollBehaviorX;

      document.removeEventListener("wheel", preventBrowserZoom, {
        capture: true,
      } as EventListenerOptions);
      document.removeEventListener("gesturestart", preventGestureZoom);
      document.removeEventListener("gesturechange", preventGestureZoom);
      document.removeEventListener("gestureend", preventGestureZoom);
      document.removeEventListener("keydown", preventKeyboardZoom, {
        capture: true,
      } as EventListenerOptions);
      document.removeEventListener("touchstart", preventSwipeNavigation, {
        capture: true,
      } as EventListenerOptions);
      document.removeEventListener("touchmove", preventSwipeNavigation, {
        capture: true,
      } as EventListenerOptions);
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !spacePressed) {
        e.preventDefault();
        setSpacePressed(true);
      }
      if (e.key === "0" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleZoomReset();
      }
      if (e.key === "=" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleZoomIn();
      }
      if (e.key === "-" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleZoomOut();
      }
      if (e.key === "z" && (e.metaKey || e.ctrlKey) && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }
      if (
        (e.key === "z" && (e.metaKey || e.ctrlKey) && e.shiftKey) ||
        (e.key === "y" && (e.metaKey || e.ctrlKey))
      ) {
        e.preventDefault();
        handleRedo();
      }
      if (e.key === "c" && (e.metaKey || e.ctrlKey) && imageUrl) {
        e.preventDefault();
        handleCopy();
      }
      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleDownload();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setSpacePressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [spacePressed, imageUrl]);

  // Draw functions
  const drawImage = useCallback(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full image resolution
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    // Enable high-quality image rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(image, 0, 0);
  }, []);

  const drawCropOverlay = useCallback(() => {
    const canvas = canvasRef.current;
    const overlayCanvas = overlayCanvasRef.current;
    if (!canvas || !overlayCanvas) return;

    const ctx = overlayCanvas.getContext("2d");
    if (!ctx) return;

    overlayCanvas.width = canvas.width;
    overlayCanvas.height = canvas.height;
    ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

    // Freeform crop overlay
    if (cropArea && activeTool === "crop" && cropMode === "freeform") {
      const { startX, startY, endX, endY } = cropArea;
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, 0, overlayCanvas.width, overlayCanvas.height);
      ctx.clearRect(
        Math.min(startX, endX),
        Math.min(startY, endY),
        Math.abs(endX - startX),
        Math.abs(endY - startY)
      );
      ctx.strokeStyle = "#3B82F6";
      ctx.lineWidth = 2;
      ctx.strokeRect(
        Math.min(startX, endX),
        Math.min(startY, endY),
        Math.abs(endX - startX),
        Math.abs(endY - startY)
      );
    }

    // Border crop overlay
    if (borderCrop && activeTool === "crop" && cropMode === "border") {
      const { top, bottom, left, right } = borderCrop;
      const width = right - left;
      const height = bottom - top;

      // Draw semi-transparent overlay outside crop area
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      // Top area
      ctx.fillRect(0, 0, overlayCanvas.width, top);
      // Bottom area
      ctx.fillRect(
        0,
        bottom,
        overlayCanvas.width,
        overlayCanvas.height - bottom
      );
      // Left area
      ctx.fillRect(0, top, left, bottom - top);
      // Right area
      ctx.fillRect(right, top, overlayCanvas.width - right, bottom - top);

      // Draw border around crop area
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.strokeRect(left, top, width, height);

      // Draw rule of thirds grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      ctx.lineWidth = 1;

      // Vertical lines (rule of thirds)
      ctx.beginPath();
      ctx.moveTo(left + width / 3, top);
      ctx.lineTo(left + width / 3, bottom);
      ctx.moveTo(left + (width * 2) / 3, top);
      ctx.lineTo(left + (width * 2) / 3, bottom);
      // Horizontal lines (rule of thirds)
      ctx.moveTo(left, top + height / 3);
      ctx.lineTo(right, top + height / 3);
      ctx.moveTo(left, top + (height * 2) / 3);
      ctx.lineTo(right, top + (height * 2) / 3);
      ctx.stroke();

      // Draw corner L-shaped handles (more prominent)
      const cornerLength = 20;
      const cornerThickness = 4;
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Top-left corner
      ctx.fillRect(
        left - cornerThickness / 2,
        top - cornerThickness / 2,
        cornerLength,
        cornerThickness
      );
      ctx.fillRect(
        left - cornerThickness / 2,
        top - cornerThickness / 2,
        cornerThickness,
        cornerLength
      );

      // Top-right corner
      ctx.fillRect(
        right - cornerLength + cornerThickness / 2,
        top - cornerThickness / 2,
        cornerLength,
        cornerThickness
      );
      ctx.fillRect(
        right - cornerThickness / 2,
        top - cornerThickness / 2,
        cornerThickness,
        cornerLength
      );

      // Bottom-left corner
      ctx.fillRect(
        left - cornerThickness / 2,
        bottom - cornerThickness / 2,
        cornerLength,
        cornerThickness
      );
      ctx.fillRect(
        left - cornerThickness / 2,
        bottom - cornerLength + cornerThickness / 2,
        cornerThickness,
        cornerLength
      );

      // Bottom-right corner
      ctx.fillRect(
        right - cornerLength + cornerThickness / 2,
        bottom - cornerThickness / 2,
        cornerLength,
        cornerThickness
      );
      ctx.fillRect(
        right - cornerThickness / 2,
        bottom - cornerLength + cornerThickness / 2,
        cornerThickness,
        cornerLength
      );

      // Draw edge handles (small rectangles at edge midpoints)
      const edgeHandleWidth = 24;
      const edgeHandleHeight = 6;

      // Top edge handle
      ctx.fillRect(
        (left + right) / 2 - edgeHandleWidth / 2,
        top - edgeHandleHeight / 2,
        edgeHandleWidth,
        edgeHandleHeight
      );
      // Bottom edge handle
      ctx.fillRect(
        (left + right) / 2 - edgeHandleWidth / 2,
        bottom - edgeHandleHeight / 2,
        edgeHandleWidth,
        edgeHandleHeight
      );
      // Left edge handle
      ctx.fillRect(
        left - edgeHandleHeight / 2,
        (top + bottom) / 2 - edgeHandleWidth / 2,
        edgeHandleHeight,
        edgeHandleWidth
      );
      // Right edge handle
      ctx.fillRect(
        right - edgeHandleHeight / 2,
        (top + bottom) / 2 - edgeHandleWidth / 2,
        edgeHandleHeight,
        edgeHandleWidth
      );

      // Reset shadow
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;

      // Display dimensions
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(left + width / 2 - 40, bottom + 8, 80, 24);
      ctx.fillStyle = "#ffffff";
      ctx.font = "12px -apple-system, BlinkMacSystemFont, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `${Math.round(width)} × ${Math.round(height)}`,
        left + width / 2,
        bottom + 20
      );
    }
  }, [cropArea, activeTool, cropMode, borderCrop]);

  const drawAnnotations = useCallback(() => {
    const canvas = annotationCanvasRef.current;
    const mainCanvas = canvasRef.current;
    if (!canvas || !mainCanvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = mainCanvas.width;
    canvas.height = mainCanvas.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    [...annotations, currentAnnotation]
      .filter(Boolean)
      .forEach((annotation) => {
        if (!annotation) return;
        drawSingleAnnotation(ctx, annotation, mainCanvas);
      });
  }, [annotations, currentAnnotation]);

  const drawSingleAnnotation = (
    ctx: CanvasRenderingContext2D,
    annotation: Annotation,
    mainCanvas: HTMLCanvasElement
  ) => {
    const {
      type,
      startX,
      startY,
      endX,
      endY,
      color,
      opacity,
      strokeWidth,
      filled,
    } = annotation;

    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    switch (type) {
      case "rectangle":
        if (filled) {
          ctx.fillRect(startX, startY, endX - startX, endY - startY);
        } else {
          ctx.strokeRect(startX, startY, endX - startX, endY - startY);
        }
        break;
      case "circle":
        const radiusX = Math.abs(endX - startX) / 2;
        const radiusY = Math.abs(endY - startY) / 2;
        const centerX = (startX + endX) / 2;
        const centerY = (startY + endY) / 2;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
        if (filled) ctx.fill();
        else ctx.stroke();
        break;
      case "line":
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        break;
      case "arrow":
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        const angle = Math.atan2(endY - startY, endX - startX);
        const arrowLength = 15;
        const arrowAngle = Math.PI / 6;
        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(
          endX - arrowLength * Math.cos(angle - arrowAngle),
          endY - arrowLength * Math.sin(angle - arrowAngle)
        );
        ctx.moveTo(endX, endY);
        ctx.lineTo(
          endX - arrowLength * Math.cos(angle + arrowAngle),
          endY - arrowLength * Math.sin(angle + arrowAngle)
        );
        ctx.stroke();
        break;
      case "highlight":
        ctx.globalAlpha = opacity * 0.3;
        ctx.fillRect(
          Math.min(startX, endX),
          Math.min(startY, endY),
          Math.abs(endX - startX),
          Math.abs(endY - startY)
        );
        break;
      case "blur":
        const blurX = Math.max(0, Math.min(startX, endX));
        const blurY = Math.max(0, Math.min(startY, endY));
        const blurWidth = Math.abs(endX - startX);
        const blurHeight = Math.abs(endY - startY);
        if (blurWidth > 0 && blurHeight > 0) {
          const mainCtx = mainCanvas.getContext("2d");
          if (mainCtx) {
            try {
              const safeWidth = Math.min(blurWidth, mainCanvas.width - blurX);
              const safeHeight = Math.min(
                blurHeight,
                mainCanvas.height - blurY
              );
              if (safeWidth > 0 && safeHeight > 0) {
                const imageData = mainCtx.getImageData(
                  blurX,
                  blurY,
                  safeWidth,
                  safeHeight
                );
                const blurred = applyPixelate(imageData, 10);
                ctx.putImageData(blurred, blurX, blurY);
              }
            } catch {
              ctx.fillStyle = "rgba(128, 128, 128, 0.8)";
              ctx.fillRect(blurX, blurY, blurWidth, blurHeight);
            }
          }
        }
        break;
      case "freehand":
        if (annotation.points && annotation.points.length > 0) {
          ctx.beginPath();
          ctx.moveTo(annotation.points[0].x, annotation.points[0].y);

          if (annotation.points.length === 1) {
            // Draw a small dot for single point
            ctx.lineTo(annotation.points[0].x + 0.1, annotation.points[0].y + 0.1);
          } else if (annotation.points.length === 2) {
            // Draw a straight line for two points
            ctx.lineTo(annotation.points[1].x, annotation.points[1].y);
          } else {
            // Use quadratic curves for smoother lines with 3+ points
            for (let i = 1; i < annotation.points.length - 1; i++) {
              const xc = (annotation.points[i].x + annotation.points[i + 1].x) / 2;
              const yc = (annotation.points[i].y + annotation.points[i + 1].y) / 2;
              ctx.quadraticCurveTo(annotation.points[i].x, annotation.points[i].y, xc, yc);
            }
            // Draw the last segment
            const lastPoint = annotation.points[annotation.points.length - 1];
            const secondLastPoint = annotation.points[annotation.points.length - 2];
            ctx.quadraticCurveTo(secondLastPoint.x, secondLastPoint.y, lastPoint.x, lastPoint.y);
          }

          ctx.stroke();
        }
        break;
    }
    ctx.restore();
  };

  const applyPixelate = (
    imageData: ImageData,
    pixelSize: number
  ): ImageData => {
    const { width, height, data } = imageData;
    const pixelated = new ImageData(width, height);

    for (let y = 0; y < height; y += pixelSize) {
      for (let x = 0; x < width; x += pixelSize) {
        let r = 0,
          g = 0,
          b = 0,
          a = 0,
          count = 0;
        for (let dy = 0; dy < pixelSize && y + dy < height; dy++) {
          for (let dx = 0; dx < pixelSize && x + dx < width; dx++) {
            const i = ((y + dy) * width + (x + dx)) * 4;
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            a += data[i + 3];
            count++;
          }
        }
        r = Math.floor(r / count);
        g = Math.floor(g / count);
        b = Math.floor(b / count);
        a = Math.floor(a / count);

        for (let dy = 0; dy < pixelSize && y + dy < height; dy++) {
          for (let dx = 0; dx < pixelSize && x + dx < width; dx++) {
            const i = ((y + dy) * width + (x + dx)) * 4;
            pixelated.data[i] = r;
            pixelated.data[i + 1] = g;
            pixelated.data[i + 2] = b;
            pixelated.data[i + 3] = a;
          }
        }
      }
    }
    return pixelated;
  };

  // Canvas event handlers
  const getCanvasCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | MouseEvent,
    clamp: boolean = false
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    if (clamp) {
      return {
        x: Math.max(0, Math.min(canvas.width, x)),
        y: Math.max(0, Math.min(canvas.height, y)),
      };
    }

    return { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (spacePressed || e.button === 1 || panModeEnabled) {
      // Use refs for smooth panning - avoid state updates during drag
      isPanningRef.current = true;
      panRef.current = { ...pan };
      panStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
      setIsPanning(true);
      return;
    }

    const { x, y } = getCanvasCoordinates(e);
    const annotationTools: Tool[] = [
      "rectangle",
      "circle",
      "arrow",
      "line",
      "highlight",
      "blur",
      "freehand",
    ];

    if (annotationTools.includes(activeTool)) {
      setIsDrawingAnnotation(true);
      const newAnnotation: Annotation = {
        id: Date.now().toString(),
        type: activeTool as Annotation["type"],
        startX: x,
        startY: y,
        endX: x,
        endY: y,
        color: annotationColor,
        opacity: annotationOpacity,
        strokeWidth: annotationStrokeWidth,
        filled: annotationFilled,
      };
      if (activeTool === "freehand") {
        newAnnotation.points = [{ x, y }];
      }
      setCurrentAnnotation(newAnnotation);
      return;
    }

    if (activeTool === "crop") {
      if (cropMode === "freeform") {
        setCropArea({ startX: x, startY: y, endX: x, endY: y });
        setIsDragging(true);
      } else if (cropMode === "border" && borderCrop) {
        // Check if clicking on a handle or edge
        const handleSize = 15;
        const { top, bottom, left, right } = borderCrop;
        let edge: string | null = null;

        // Check corners first (they take priority)
        if (Math.abs(x - left) < handleSize && Math.abs(y - top) < handleSize) {
          edge = "topLeft";
        } else if (
          Math.abs(x - right) < handleSize &&
          Math.abs(y - top) < handleSize
        ) {
          edge = "topRight";
        } else if (
          Math.abs(x - left) < handleSize &&
          Math.abs(y - bottom) < handleSize
        ) {
          edge = "bottomLeft";
        } else if (
          Math.abs(x - right) < handleSize &&
          Math.abs(y - bottom) < handleSize
        ) {
          edge = "bottomRight";
        }
        // Check edge handles
        else if (
          Math.abs(x - (left + right) / 2) < handleSize &&
          Math.abs(y - top) < handleSize
        ) {
          edge = "top";
        } else if (
          Math.abs(x - (left + right) / 2) < handleSize &&
          Math.abs(y - bottom) < handleSize
        ) {
          edge = "bottom";
        } else if (
          Math.abs(x - left) < handleSize &&
          Math.abs(y - (top + bottom) / 2) < handleSize
        ) {
          edge = "left";
        } else if (
          Math.abs(x - right) < handleSize &&
          Math.abs(y - (top + bottom) / 2) < handleSize
        ) {
          edge = "right";
        }
        // Check edges
        else if (Math.abs(y - top) < handleSize && x > left && x < right) {
          edge = "top";
        } else if (Math.abs(y - bottom) < handleSize && x > left && x < right) {
          edge = "bottom";
        } else if (Math.abs(x - left) < handleSize && y > top && y < bottom) {
          edge = "left";
        } else if (Math.abs(x - right) < handleSize && y > top && y < bottom) {
          edge = "right";
        }

        if (edge) {
          setBorderCropDragEdge(edge);
          setIsDragging(true);
        }
      }
    }
  };

  // Helper function to update transform directly on DOM for smooth panning
  const updatePanTransform = useCallback(
    (newPan: { x: number; y: number }) => {
      const container = transformContainerRef.current;
      if (container) {
        container.style.transform = `scale(${zoom}) translate(${
          newPan.x / zoom
        }px, ${newPan.y / zoom}px)`;
      }
    },
    [zoom]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isPanningRef.current) {
      // Calculate new pan position
      const newPan = {
        x: e.clientX - panStartRef.current.x,
        y: e.clientY - panStartRef.current.y,
      };
      panRef.current = newPan;

      // Use requestAnimationFrame for smooth updates
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rafIdRef.current = requestAnimationFrame(() => {
        updatePanTransform(newPan);
      });
      return;
    }

    const { x, y } = getCanvasCoordinates(e, true); // Clamp coordinates to canvas bounds

    if (isDrawingAnnotation && currentAnnotation) {
      if (currentAnnotation.type === "freehand") {
        setCurrentAnnotation({
          ...currentAnnotation,
          points: [...(currentAnnotation.points || []), { x, y }],
          endX: x,
          endY: y,
        });
      } else {
        setCurrentAnnotation({ ...currentAnnotation, endX: x, endY: y });
      }
      return;
    }

    if (activeTool === "crop" && isDragging) {
      if (cropMode === "freeform" && cropArea) {
        setCropArea({ ...cropArea, endX: x, endY: y });
      } else if (cropMode === "border" && borderCrop && borderCropDragEdge) {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const newBorderCrop = { ...borderCrop };
        const minSize = 20;

        switch (borderCropDragEdge) {
          case "top":
            newBorderCrop.top = Math.max(
              0,
              Math.min(y, borderCrop.bottom - minSize)
            );
            break;
          case "bottom":
            newBorderCrop.bottom = Math.min(
              canvas.height,
              Math.max(y, borderCrop.top + minSize)
            );
            break;
          case "left":
            newBorderCrop.left = Math.max(
              0,
              Math.min(x, borderCrop.right - minSize)
            );
            break;
          case "right":
            newBorderCrop.right = Math.min(
              canvas.width,
              Math.max(x, borderCrop.left + minSize)
            );
            break;
          case "topLeft":
            newBorderCrop.top = Math.max(
              0,
              Math.min(y, borderCrop.bottom - minSize)
            );
            newBorderCrop.left = Math.max(
              0,
              Math.min(x, borderCrop.right - minSize)
            );
            break;
          case "topRight":
            newBorderCrop.top = Math.max(
              0,
              Math.min(y, borderCrop.bottom - minSize)
            );
            newBorderCrop.right = Math.min(
              canvas.width,
              Math.max(x, borderCrop.left + minSize)
            );
            break;
          case "bottomLeft":
            newBorderCrop.bottom = Math.min(
              canvas.height,
              Math.max(y, borderCrop.top + minSize)
            );
            newBorderCrop.left = Math.max(
              0,
              Math.min(x, borderCrop.right - minSize)
            );
            break;
          case "bottomRight":
            newBorderCrop.bottom = Math.min(
              canvas.height,
              Math.max(y, borderCrop.top + minSize)
            );
            newBorderCrop.right = Math.min(
              canvas.width,
              Math.max(x, borderCrop.left + minSize)
            );
            break;
        }

        setBorderCrop(newBorderCrop);
      }
    }
  };

  const handleMouseUp = () => {
    // Sync pan ref to state when panning ends
    if (isPanningRef.current) {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      setPan(panRef.current);
      isPanningRef.current = false;
    }

    if (isDrawingAnnotation && currentAnnotation) {
      const hasSize =
        currentAnnotation.type === "freehand"
          ? (currentAnnotation.points?.length || 0) > 2
          : Math.abs(currentAnnotation.endX - currentAnnotation.startX) > 5 ||
            Math.abs(currentAnnotation.endY - currentAnnotation.startY) > 5;

      if (hasSize) {
        const newAnnotations = [...annotations, currentAnnotation];
        setAnnotations(newAnnotations);
        // Save to history after annotation is added
        setTimeout(() => {
          saveToHistory({
            imageUrl,
            annotations: newAnnotations,
            showBackground,
            includeWindowChrome,
            windowChromeTheme,
            selectedTheme,
          });
        }, 0);
      }
      setIsDrawingAnnotation(false);
      setCurrentAnnotation(null);
    }
    setIsDragging(false);
    setIsPanning(false);
    setBorderCropDragEdge(null);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Don't allow Ctrl+wheel zoom - users should use zoom buttons
    if (e.ctrlKey || e.metaKey) {
      return;
    }

    // ALWAYS pan on any wheel/scroll event (trackpad or mouse)
    // For mouse wheel (which typically only has deltaY), we also pan vertically
    // For trackpad (which has both deltaX and deltaY), we pan in both directions
    const newPan = {
      x: pan.x - e.deltaX,
      y: pan.y - e.deltaY,
    };
    setPan(newPan);
  };

  const handleZoomIn = () => {
    setZoom((prev) => {
      // Define zoom levels: 10%, 25%, 50%, 75%, 100%, then 50% increments up to 300%, then 1.2x
      const belowHundred = [0.1, 0.25, 0.5, 0.75, 1.0];
      const hundredToThreeHundred = [1.0, 1.5, 2.0, 2.5, 3.0];

      // If current zoom is below 100%, use 25% increments
      if (prev < 1.0) {
        const nextLevel = belowHundred.find((level) => level > prev + 0.01);
        if (nextLevel) return nextLevel;
        return 1.0;
      }

      // Between 100% and 300%, use 50% increments (100, 150, 200, 250, 300)
      if (prev < 3.0) {
        const nextLevel = hundredToThreeHundred.find(
          (level) => level > prev + 0.01
        );
        if (nextLevel) return nextLevel;
        return 3.0;
      }

      // Above 300%, use 1.2x increments (360%, 432%, etc.)
      return Math.min(prev * 1.2, 10);
    });
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      // Define zoom levels in reverse: 100%, 75%, 50%, 25%, 10%
      const belowHundred = [1.0, 0.75, 0.5, 0.25, 0.1];
      const hundredToThreeHundred = [3.0, 2.5, 2.0, 1.5, 1.0];

      // If current zoom is at or below 100%, use 25% decrements
      if (prev <= 1.0) {
        for (let i = 0; i < belowHundred.length; i++) {
          if (prev > belowHundred[i] + 0.01) {
            return belowHundred[i];
          }
        }
        return 0.1; // Already at lowest
      }

      // Between 100% and 300%, use 50% decrements (300, 250, 200, 150, 100)
      if (prev <= 3.0) {
        for (let i = 0; i < hundredToThreeHundred.length; i++) {
          if (prev > hundredToThreeHundred[i] + 0.01) {
            return hundredToThreeHundred[i];
          }
        }
        return 1.0; // Snap to 100%
      }

      // Above 300%, use 1.2x decrements until we reach 300%
      const newZoom = prev / 1.2;
      if (newZoom <= 3.0) return 3.0; // Snap to 300%
      return Math.max(newZoom, 0.1);
    });
  };

  const handleZoomReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Track if we're restoring from history (to avoid saving during restore)
  const isRestoringRef = useRef(false);

  // History management - save a new state to history
  const saveToHistory = useCallback(
    (state: {
      imageUrl: string;
      annotations: Annotation[];
      showBackground: boolean;
      includeWindowChrome: boolean;
      windowChromeTheme: "light" | "dark";
      selectedTheme: ThemeType;
    }) => {
      if (!state.imageUrl || isRestoringRef.current) return;

      setHistory((prevHistory) => {
        setHistoryIndex((prevIndex) => {
          const newHistory = prevHistory.slice(0, prevIndex + 1);
          newHistory.push({
            imageUrl: state.imageUrl,
            annotations: [...state.annotations],
            showBackground: state.showBackground,
            includeWindowChrome: state.includeWindowChrome,
            windowChromeTheme: state.windowChromeTheme,
            selectedTheme: state.selectedTheme,
          });
          if (newHistory.length > 50) newHistory.shift();
          return newHistory.length - 1;
        });
        const newHistory = prevHistory.slice(0, historyIndex + 1);
        newHistory.push({
          imageUrl: state.imageUrl,
          annotations: [...state.annotations],
          showBackground: state.showBackground,
          includeWindowChrome: state.includeWindowChrome,
          windowChromeTheme: state.windowChromeTheme,
          selectedTheme: state.selectedTheme,
        });
        if (newHistory.length > 50) newHistory.shift();
        return newHistory;
      });
    },
    [historyIndex]
  );

  // Helper to save current state
  const saveCurrentState = useCallback(() => {
    saveToHistory({
      imageUrl,
      annotations,
      showBackground,
      includeWindowChrome,
      windowChromeTheme,
      selectedTheme,
    });
  }, [
    imageUrl,
    annotations,
    showBackground,
    includeWindowChrome,
    windowChromeTheme,
    selectedTheme,
    saveToHistory,
  ]);

  // Document-level mouse event handlers for when cursor leaves canvas boundary
  useEffect(() => {
    const isActive = isDragging || isDrawingAnnotation || isPanning;
    if (!isActive) return;

    const getDocumentCanvasCoordinates = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;

      // Clamp coordinates to canvas bounds
      return {
        x: Math.max(0, Math.min(canvas.width, x)),
        y: Math.max(0, Math.min(canvas.height, y)),
      };
    };

    const handleDocumentMouseMove = (e: MouseEvent) => {
      if (isPanningRef.current) {
        // Calculate new pan position using refs for smooth updates
        const newPan = {
          x: e.clientX - panStartRef.current.x,
          y: e.clientY - panStartRef.current.y,
        };
        panRef.current = newPan;

        // Use requestAnimationFrame for smooth updates
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
        }
        rafIdRef.current = requestAnimationFrame(() => {
          updatePanTransform(newPan);
        });
        return;
      }

      const { x, y } = getDocumentCanvasCoordinates(e);

      if (isDrawingAnnotation && currentAnnotation) {
        if (currentAnnotation.type === "freehand") {
          setCurrentAnnotation({
            ...currentAnnotation,
            points: [...(currentAnnotation.points || []), { x, y }],
            endX: x,
            endY: y,
          });
        } else {
          setCurrentAnnotation({ ...currentAnnotation, endX: x, endY: y });
        }
        return;
      }

      if (activeTool === "crop" && isDragging) {
        if (cropMode === "freeform" && cropArea) {
          setCropArea({ ...cropArea, endX: x, endY: y });
        } else if (cropMode === "border" && borderCrop && borderCropDragEdge) {
          const canvas = canvasRef.current;
          if (!canvas) return;

          const newBorderCrop = { ...borderCrop };
          const minSize = 20;

          switch (borderCropDragEdge) {
            case "top":
              newBorderCrop.top = Math.max(
                0,
                Math.min(y, borderCrop.bottom - minSize)
              );
              break;
            case "bottom":
              newBorderCrop.bottom = Math.min(
                canvas.height,
                Math.max(y, borderCrop.top + minSize)
              );
              break;
            case "left":
              newBorderCrop.left = Math.max(
                0,
                Math.min(x, borderCrop.right - minSize)
              );
              break;
            case "right":
              newBorderCrop.right = Math.min(
                canvas.width,
                Math.max(x, borderCrop.left + minSize)
              );
              break;
            case "topLeft":
              newBorderCrop.top = Math.max(
                0,
                Math.min(y, borderCrop.bottom - minSize)
              );
              newBorderCrop.left = Math.max(
                0,
                Math.min(x, borderCrop.right - minSize)
              );
              break;
            case "topRight":
              newBorderCrop.top = Math.max(
                0,
                Math.min(y, borderCrop.bottom - minSize)
              );
              newBorderCrop.right = Math.min(
                canvas.width,
                Math.max(x, borderCrop.left + minSize)
              );
              break;
            case "bottomLeft":
              newBorderCrop.bottom = Math.min(
                canvas.height,
                Math.max(y, borderCrop.top + minSize)
              );
              newBorderCrop.left = Math.max(
                0,
                Math.min(x, borderCrop.right - minSize)
              );
              break;
            case "bottomRight":
              newBorderCrop.bottom = Math.min(
                canvas.height,
                Math.max(y, borderCrop.top + minSize)
              );
              newBorderCrop.right = Math.min(
                canvas.width,
                Math.max(x, borderCrop.left + minSize)
              );
              break;
          }

          setBorderCrop(newBorderCrop);
        }
      }
    };

    const handleDocumentMouseUp = () => {
      // Sync pan ref to state when panning ends
      if (isPanningRef.current) {
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = null;
        }
        setPan(panRef.current);
        isPanningRef.current = false;
      }

      if (isDrawingAnnotation && currentAnnotation) {
        const hasSize =
          currentAnnotation.type === "freehand"
            ? (currentAnnotation.points?.length || 0) > 2
            : Math.abs(currentAnnotation.endX - currentAnnotation.startX) > 5 ||
              Math.abs(currentAnnotation.endY - currentAnnotation.startY) > 5;

        if (hasSize) {
          const newAnnotations = [...annotations, currentAnnotation];
          setAnnotations(newAnnotations);
          setTimeout(() => {
            saveToHistory({
              imageUrl,
              annotations: newAnnotations,
              showBackground,
              includeWindowChrome,
              windowChromeTheme,
              selectedTheme,
            });
          }, 0);
        }
        setIsDrawingAnnotation(false);
        setCurrentAnnotation(null);
      }
      setIsDragging(false);
      setIsPanning(false);
      setBorderCropDragEdge(null);
    };

    document.addEventListener("mousemove", handleDocumentMouseMove);
    document.addEventListener("mouseup", handleDocumentMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleDocumentMouseMove);
      document.removeEventListener("mouseup", handleDocumentMouseUp);
    };
  }, [
    isDragging,
    isDrawingAnnotation,
    isPanning,
    currentAnnotation,
    cropArea,
    cropMode,
    borderCrop,
    borderCropDragEdge,
    activeTool,
    annotations,
    imageUrl,
    showBackground,
    includeWindowChrome,
    windowChromeTheme,
    selectedTheme,
    saveToHistory,
    updatePanTransform,
  ]);

  const handleUndo = useCallback(() => {
    if (historyIndex <= 0) return;
    isRestoringRef.current = true;
    const prev = history[historyIndex - 1];
    setImageUrl(prev.imageUrl);
    setAnnotations(prev.annotations);
    setShowBackground(prev.showBackground);
    setIncludeWindowChrome(prev.includeWindowChrome);
    setWindowChromeTheme(prev.windowChromeTheme);
    setSelectedTheme(prev.selectedTheme);
    setHistoryIndex(historyIndex - 1);
    // Reset flag after state updates
    setTimeout(() => {
      isRestoringRef.current = false;
    }, 0);
  }, [history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex >= history.length - 1) return;
    isRestoringRef.current = true;
    const next = history[historyIndex + 1];
    setImageUrl(next.imageUrl);
    setAnnotations(next.annotations);
    setShowBackground(next.showBackground);
    setIncludeWindowChrome(next.includeWindowChrome);
    setWindowChromeTheme(next.windowChromeTheme);
    setSelectedTheme(next.selectedTheme);
    setHistoryIndex(historyIndex + 1);
    // Reset flag after state updates
    setTimeout(() => {
      isRestoringRef.current = false;
    }, 0);
  }, [history, historyIndex]);

  // Apply crop
  const applyCrop = () => {
    if (!cropArea) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { startX, startY, endX, endY } = cropArea;
    const x = Math.min(startX, endX);
    const y = Math.min(startY, endY);
    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);

    if (width < 1 || height < 1) return;

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;

    tempCtx.drawImage(canvas, x, y, width, height, 0, 0, width, height);
    const newImageUrl = tempCanvas.toDataURL("image/png");
    setImageUrl(newImageUrl);
    setCropArea(null);
    setBorderCrop(null);
    setActiveTool("select");
    setZoom(1);
    setPan({ x: 0, y: 0 });
    // Save to history after crop
    setTimeout(() => {
      saveToHistory({
        imageUrl: newImageUrl,
        annotations,
        showBackground,
        includeWindowChrome,
        windowChromeTheme,
        selectedTheme,
      });
    }, 0);
  };

  // Apply border crop
  const applyBorderCrop = () => {
    if (!borderCrop) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { top, bottom, left, right } = borderCrop;
    const width = right - left;
    const height = bottom - top;

    if (width < 1 || height < 1) return;

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;

    tempCtx.drawImage(canvas, left, top, width, height, 0, 0, width, height);
    const newImageUrl = tempCanvas.toDataURL("image/png");
    setImageUrl(newImageUrl);
    setCropArea(null);
    setBorderCrop(null);
    setActiveTool("select");
    setZoom(1);
    setPan({ x: 0, y: 0 });
    // Save to history after crop
    setTimeout(() => {
      saveToHistory({
        imageUrl: newImageUrl,
        annotations,
        showBackground,
        includeWindowChrome,
        windowChromeTheme,
        selectedTheme,
      });
    }, 0);
  };

  // Crop mode handlers
  const handleFreeformCrop = () => {
    setCropMode("freeform");
    if (activeTool === "crop" && cropMode === "freeform") {
      // Exit crop mode
      setActiveTool("select");
      setCropArea(null);
      setBorderCrop(null);
    } else {
      // Enter freeform crop mode
      setActiveTool("crop");
      setBorderCrop(null);
      setCropArea(null);
      showNotification("Click and drag to select crop area");
    }
  };

  const handleBorderCrop = () => {
    setCropMode("border");
    if (activeTool === "crop" && cropMode === "border") {
      // Exit crop mode
      setActiveTool("select");
      setCropArea(null);
      setBorderCrop(null);
    } else {
      // Enter border crop mode - initialize border crop
      const canvas = canvasRef.current;
      if (canvas) {
        setBorderCrop({
          top: 0,
          bottom: canvas.height,
          left: 0,
          right: canvas.width,
        });
      }
      setActiveTool("crop");
      setCropArea(null);
      showNotification("Drag the edges to crop the image");
    }
  };

  // Initialize border crop when crop tool is activated with border mode
  useEffect(() => {
    if (activeTool === "crop" && cropMode === "border" && !borderCrop) {
      const canvas = canvasRef.current;
      if (canvas) {
        setBorderCrop({
          top: 0,
          bottom: canvas.height,
          left: 0,
          right: canvas.width,
        });
      }
    }
  }, [activeTool, cropMode, borderCrop]);

  // Show tool notification helper
  const showNotification = (message: string) => {
    setToolNotification(message);
    setShowToolNotification(true);
    setTimeout(() => {
      setShowToolNotification(false);
    }, 4000); // Hide after 4 seconds
  };

  // Close width/padding controls on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Check if click is outside width/padding control dropdowns
      const isClickInsideWidthControl = target.closest('[data-width-control]');
      const isClickInsidePaddingControl = target.closest('[data-padding-control]');

      if (!isClickInsideWidthControl && showWidthControl) {
        setShowWidthControl(false);
      }
      if (!isClickInsidePaddingControl && showPaddingControl) {
        setShowPaddingControl(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowWidthControl(false);
        setShowPaddingControl(false);
      }
    };

    if (showWidthControl || showPaddingControl) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showWidthControl, showPaddingControl]);

  // Save editor state to localStorage for persistence after login
  const saveEditorStateForLogin = useCallback(() => {
    if (imageUrl) {
      const editorState = {
        imageUrl,
        selectedTheme,
        cardWidth,
        cardPadding,
        includeWindowChrome,
        windowChromeTheme,
        showBackground,
        annotations,
        zoom,
        pan,
      };
      localStorage.setItem(
        "editorStateBeforeLogin",
        JSON.stringify(editorState)
      );
    }
  }, [
    imageUrl,
    selectedTheme,
    cardWidth,
    cardPadding,
    includeWindowChrome,
    windowChromeTheme,
    showBackground,
    annotations,
    zoom,
    pan,
  ]);

  // Restore editor state after login
  useEffect(() => {
    const savedState = localStorage.getItem("editorStateBeforeLogin");
    if (savedState && user) {
      try {
        const state = JSON.parse(savedState);
        if (state.imageUrl) setImageUrl(state.imageUrl);
        if (state.selectedTheme) setSelectedTheme(state.selectedTheme);
        if (state.cardWidth !== undefined) setCardWidth(state.cardWidth);
        if (state.cardPadding !== undefined) setCardPadding(state.cardPadding);
        if (state.includeWindowChrome !== undefined)
          setIncludeWindowChrome(state.includeWindowChrome);
        if (state.windowChromeTheme)
          setWindowChromeTheme(state.windowChromeTheme);
        if (state.showBackground !== undefined)
          setShowBackground(state.showBackground);
        if (state.annotations) setAnnotations(state.annotations);
        if (state.zoom !== undefined) setZoom(state.zoom);
        if (state.pan) setPan(state.pan);
        localStorage.removeItem("editorStateBeforeLogin");
      } catch (e) {
        console.error("Failed to restore editor state:", e);
        localStorage.removeItem("editorStateBeforeLogin");
      }
    }
  }, [user]);

  // Download and copy
  const handleDownload = () => {
    // Check if user is logged in
    if (!user) {
      setLoginPromptAction("download");
      setShowLoginPrompt(true);
      return;
    }

    // Show quality selection modal
    setShowQualityModal(true);
  };

  const performDownload = async (quality: "standard" | "hd") => {
    // Close the modal
    setShowQualityModal(false);

    if (showBackground) {
      const backgroundContainer = document.querySelector(
        '[data-screenshot-with-background="true"]'
      ) as HTMLElement;
      if (!backgroundContainer) return;

      const currentTransform = backgroundContainer.style.transform;
      backgroundContainer.style.transform = "none";
      await new Promise((resolve) => setTimeout(resolve, 100));

      const html2canvas = (await import("html2canvas")).default;

      // Get exact dimensions - use floor to avoid capturing extra edge pixels
      const rect = backgroundContainer.getBoundingClientRect();
      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);

      // Use higher scale for better quality
      // HD: Ultra quality (DPR * 3) | Standard: Good quality (2x)
      const scale = quality === "hd" ? window.devicePixelRatio * 3 : 2;

      const capturedCanvas = await html2canvas(backgroundContainer, {
        backgroundColor: null,
        scale: scale,
        useCORS: true,
        allowTaint: false,
        width: width,
        height: height,
        windowWidth: width,
        windowHeight: height,
        x: 0,
        y: 0,
        scrollX: 0,
        scrollY: 0,
        removeContainer: true,
        imageTimeout: 0,
        logging: false,
      });

      backgroundContainer.style.transform = currentTransform;

      // Trim edge artifacts by cropping pixels from edges (scaled by scale)
      const cleanCanvas = document.createElement("canvas");
      const trim = Math.ceil(scale); // pixels to trim from each edge (scales with scale)
      const sourceWidth = capturedCanvas.width;
      const sourceHeight = capturedCanvas.height;

      // Final dimensions after trimming
      cleanCanvas.width = sourceWidth - trim * 2;
      cleanCanvas.height = sourceHeight - trim * 2;

      const cleanCtx = cleanCanvas.getContext("2d");
      if (cleanCtx) {
        // Enable high-quality image rendering
        cleanCtx.imageSmoothingEnabled = true;
        cleanCtx.imageSmoothingQuality = "high";

        // Draw from source, skipping the trim amount from edges
        cleanCtx.drawImage(
          capturedCanvas,
          trim,
          trim,
          sourceWidth - trim * 2,
          sourceHeight - trim * 2,
          0,
          0,
          cleanCanvas.width,
          cleanCanvas.height
        );
      }

      (cleanCtx ? cleanCanvas : capturedCanvas).toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `screenshot-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Navigate to dashboard if flag is set
        if (navigateAfterDownload) {
          setNavigateAfterDownload(false);
          router.push("/dashboard");
        }
      }, "image/png");
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `screenshot-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Navigate to dashboard if flag is set
      if (navigateAfterDownload) {
        setNavigateAfterDownload(false);
        router.push("/dashboard");
      }
    }, "image/png");
  };

  const handleCopy = async () => {
    // Check if free user has used premium features
    if (!hasProPlan && usedPremiumFeatures) {
      setShowUpgradePrompt(true);
      return;
    }

    // Check if user is logged in
    if (!user) {
      setLoginPromptAction("copy");
      setShowLoginPrompt(true);
      return;
    }

    try {
      let canvas: HTMLCanvasElement | null = null;

      if (showBackground) {
        const backgroundContainer = document.querySelector(
          '[data-screenshot-with-background="true"]'
        ) as HTMLElement;
        if (!backgroundContainer) return;

        const currentTransform = backgroundContainer.style.transform;
        backgroundContainer.style.transform = "none";
        await new Promise((resolve) => setTimeout(resolve, 150));

        const html2canvas = (await import("html2canvas")).default;

        // Get exact dimensions - use floor to avoid capturing extra edge pixels
        const rect = backgroundContainer.getBoundingClientRect();
        const width = Math.floor(rect.width);
        const height = Math.floor(rect.height);

        // Use higher scale for better quality (minimum 2, or device pixel ratio if higher)
        const dpr = Math.max(2, window.devicePixelRatio || 2);

        const capturedCanvas = await html2canvas(backgroundContainer, {
          backgroundColor: null,
          scale: dpr,
          useCORS: true,
          allowTaint: false,
          width: width,
          height: height,
          windowWidth: width,
          windowHeight: height,
          x: 0,
          y: 0,
          scrollX: 0,
          scrollY: 0,
          removeContainer: true,
          imageTimeout: 0,
          logging: false,
        });
        backgroundContainer.style.transform = currentTransform;

        // Trim edge artifacts by cropping pixels from edges (scaled by dpr)
        const trim = Math.ceil(dpr); // pixels to trim from each edge (scales with dpr)
        const sourceWidth = capturedCanvas.width;
        const sourceHeight = capturedCanvas.height;

        // Final dimensions after trimming
        canvas = document.createElement("canvas");
        canvas.width = sourceWidth - trim * 2;
        canvas.height = sourceHeight - trim * 2;

        const cleanCtx = canvas.getContext("2d");
        if (cleanCtx) {
          // Enable high-quality image rendering
          cleanCtx.imageSmoothingEnabled = true;
          cleanCtx.imageSmoothingQuality = "high";

          // Draw from source, skipping the trim amount from edges
          cleanCtx.drawImage(
            capturedCanvas,
            trim,
            trim,
            sourceWidth - trim * 2,
            sourceHeight - trim * 2,
            0,
            0,
            canvas.width,
            canvas.height
          );
        } else {
          canvas = capturedCanvas;
        }
      } else {
        const mainCanvas = canvasRef.current;
        const annotationCanvas = annotationCanvasRef.current;
        if (!mainCanvas) return;

        canvas = document.createElement("canvas");
        canvas.width = mainCanvas.width;
        canvas.height = mainCanvas.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Enable high-quality image rendering
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(mainCanvas, 0, 0);
        if (annotationCanvas) ctx.drawImage(annotationCanvas, 0, 0);
      }

      if (!canvas) return;

      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }, "image/png");
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  // Effects
  useEffect(() => {
    if (isLoaded) {
      drawImage();
      drawCropOverlay();
      drawAnnotations();
    }
  }, [
    isLoaded,
    cropArea,
    activeTool,
    annotations,
    currentAnnotation,
    drawImage,
    drawCropOverlay,
    drawAnnotations,
    showBackground,
    borderCrop,
    cropMode,
  ]);

  useEffect(() => {
    if (isLoaded && history.length === 0) {
      saveCurrentState();
    }
  }, [isLoaded]);

  const handleImageLoadComplete = () => {
    setIsLoaded(true);
    drawImage();
    // Fit to screen after a brief delay to allow DOM to render
    setTimeout(() => {
      handleZoomFit();
    }, 50);
    if (history.length === 0) saveCurrentState();
  };

  const handleZoomFit = () => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth - 40;
    const containerHeight = container.clientHeight - 40;

    // For regular images - fit based on the wrapper element dimensions
    if (showBackground) {
      const backgroundWrapper = document.querySelector(
        "[data-screenshot-with-background]"
      ) as HTMLElement;
      if (backgroundWrapper) {
        const wrapperWidth = backgroundWrapper.offsetWidth;
        const wrapperHeight = backgroundWrapper.offsetHeight;

        const scaleX = containerWidth / wrapperWidth;
        const scaleY = containerHeight / wrapperHeight;
        const newZoom = Math.min(scaleX, scaleY, 1);

        setZoom(newZoom);
        setPan({ x: 0, y: 0 });
        panRef.current = { x: 0, y: 0 };
      }
      return;
    }

    // Otherwise fit based on the window chrome wrapper dimensions
    const windowChrome = windowChromeRef.current;
    if (windowChrome) {
      const wrapperWidth = windowChrome.offsetWidth;
      const wrapperHeight = windowChrome.offsetHeight;

      const scaleX = containerWidth / wrapperWidth;
      const scaleY = containerHeight / wrapperHeight;
      const newZoom = Math.min(scaleX, scaleY, 1);

      setZoom(newZoom);
      setPan({ x: 0, y: 0 });
      panRef.current = { x: 0, y: 0 };
    }
  };

  const getCursor = () => {
    if (spacePressed || isPanning || panModeEnabled) return "grab";
    if (activeTool === "crop") return "crosshair";
    return "default";
  };

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: colors.background,
        color: colors.text,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        overflow: "hidden",
        touchAction: "none",
      }}
    >
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
      />

      {/* Hidden image for loading */}
      {imageUrl && (
        <img
          ref={imageRef}
          src={imageUrl}
          alt=""
          style={{ display: "none" }}
          onLoad={handleImageLoadComplete}
        />
      )}

      {/* Onboarding Modal */}
      {showOnboarding && !hasSeenOnboarding && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: editorTheme === "dark" ? "#1E1E1E" : "#FFFFFF",
              borderRadius: "20px",
              padding: "40px",
              maxWidth: "480px",
              width: "100%",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              border: `1px solid ${
                editorTheme === "dark" ? "#2D2D2D" : "#E5E7EB"
              }`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Gradient accent bar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background:
                  "linear-gradient(90deg, #f24e1e 0%, #ff7262 30%, #a259ff 70%, #1abcfe 100%)",
              }}
            />

            {/* Close/Skip button */}
            <button
              onClick={handleSkipOnboarding}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "8px",
                color: editorTheme === "dark" ? "#A0A0A0" : "#6B7280",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "13px",
              }}
            >
              Skip
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Icon */}
            <div
              style={{
                fontSize: "48px",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              {onboardingSteps[onboardingStep].icon}
            </div>

            {/* Title */}
            <h2
              style={{
                fontSize: "24px",
                fontWeight: 700,
                color: editorTheme === "dark" ? "#FFFFFF" : "#1A1A1A",
                marginBottom: "12px",
                textAlign: "center",
              }}
            >
              {onboardingSteps[onboardingStep].title}
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: "16px",
                color: editorTheme === "dark" ? "#A0A0A0" : "#6B7280",
                marginBottom: "32px",
                textAlign: "center",
                lineHeight: "1.6",
              }}
            >
              {onboardingSteps[onboardingStep].description}
            </p>

            {/* Progress dots */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "8px",
                marginBottom: "24px",
              }}
            >
              {onboardingSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setOnboardingStep(index)}
                  style={{
                    width: index === onboardingStep ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    background:
                      index === onboardingStep
                        ? "linear-gradient(90deg, #f24e1e, #a259ff)"
                        : editorTheme === "dark"
                        ? "#3D3D3D"
                        : "#E5E7EB",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
              }}
            >
              {onboardingStep > 0 && (
                <button
                  onClick={handlePrevStep}
                  style={{
                    padding: "12px 24px",
                    borderRadius: "10px",
                    border: `1px solid ${
                      editorTheme === "dark" ? "#3D3D3D" : "#E5E7EB"
                    }`,
                    background: "transparent",
                    color: editorTheme === "dark" ? "#E0E0E0" : "#374151",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNextStep}
                style={{
                  padding: "12px 32px",
                  borderRadius: "10px",
                  border: "none",
                  background:
                    "linear-gradient(135deg, #f24e1e 0%, #ff7262 30%, #a259ff 70%, #1abcfe 100%)",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 14px rgba(162, 89, 255, 0.4)",
                }}
              >
                {onboardingStep === onboardingSteps.length - 1
                  ? "Get Started!"
                  : "Next"}
              </button>
            </div>

            {/* Step counter */}
            <p
              style={{
                fontSize: "12px",
                color: editorTheme === "dark" ? "#6B7280" : "#9CA3AF",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              Step {onboardingStep + 1} of {onboardingSteps.length}
            </p>
          </div>
        </div>
      )}

      {/* Unsaved Changes Prompt Modal */}
      {showUnsavedPrompt && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
            padding: "20px",
          }}
          onClick={() => setShowUnsavedPrompt(false)}
        >
          <div
            style={{
              background: editorTheme === "dark" ? "#1E1E1E" : "#FFFFFF",
              borderRadius: "16px",
              padding: "32px",
              maxWidth: "420px",
              width: "100%",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              border: `1px solid ${
                editorTheme === "dark" ? "#2D2D2D" : "#E5E7EB"
              }`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Warning Icon */}
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "rgba(249, 115, 22, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#F97316"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>

            {/* Title */}
            <h3
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: editorTheme === "dark" ? "#FFFFFF" : "#1A1A1A",
                marginBottom: "12px",
                textAlign: "center",
              }}
            >
              Unsaved Changes
            </h3>

            {/* Description */}
            <p
              style={{
                fontSize: "15px",
                color: editorTheme === "dark" ? "#A0A0A0" : "#6B7280",
                marginBottom: "24px",
                textAlign: "center",
                lineHeight: "1.5",
              }}
            >
              You have an image in the editor that hasn&apos;t been downloaded.
              If you leave now, your changes will be lost.
            </p>

            {/* Buttons */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {/* Download Button */}
              <button
                onClick={() => {
                  setShowUnsavedPrompt(false);
                  setNavigateAfterDownload(true);
                  handleDownload();
                }}
                style={{
                  padding: "14px 24px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#F97316",
                  color: "white",
                  fontSize: "15px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.2s ease",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Image
              </button>

              {/* Continue Without Downloading */}
              <button
                onClick={() => {
                  setShowUnsavedPrompt(false);
                  router.push("/dashboard");
                }}
                style={{
                  padding: "14px 24px",
                  borderRadius: "10px",
                  border: `1px solid ${
                    editorTheme === "dark" ? "#3D3D3D" : "#E5E7EB"
                  }`,
                  background: "transparent",
                  color: editorTheme === "dark" ? "#A0A0A0" : "#6B7280",
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                Continue without downloading
              </button>

              {/* Cancel */}
              <button
                onClick={() => setShowUnsavedPrompt(false)}
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border: "none",
                  background: "transparent",
                  color: editorTheme === "dark" ? "#6B7280" : "#9CA3AF",
                  fontSize: "13px",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Toolbar */}
      <div
        style={{
          padding: "12px 16px",
          background: colors.toolbar,
          borderBottom: `1px solid ${colors.border}`,
          display: "flex",
          gap: "12px",
          alignItems: "center",
        }}
      >
        {/* LEFT SECTION: Logo + Title + Editor Theme Toggle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginRight: "auto",
          }}
        >
          {/* Logo - Links to Home */}
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <img
              src="/logo.png"
              alt="ILoveSnapshots"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                objectFit: "contain",
              }}
            />
            <span
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: colors.textSecondary,
              }}
            >
              ILoveSnapshots
            </span>
          </a>

          <div
            style={{
              width: "1px",
              height: "24px",
              background: colors.border,
              margin: "0 4px",
            }}
          />

          <h2
            style={{
              margin: 0,
              fontSize: "14px",
              fontWeight: 500,
              color: colors.textMuted,
            }}
          >
            Editor
          </h2>

          {/* Editor Theme Toggle */}
          <TooltipButton
            onClick={() =>
              setEditorTheme(editorTheme === "dark" ? "light" : "dark")
            }
            tooltip={editorTheme === "dark" ? "Light Mode" : "Dark Mode"}
            tooltipBg={colors.tooltipBg}
            tooltipText={colors.textSecondary}
            tooltipBorder={colors.border}
            style={{
              padding: "6px",
              cursor: "pointer",
              backgroundColor: colors.buttonBg,
              color: colors.textMuted,
              border: `1px solid ${colors.border}`,
              borderRadius: "6px",
              marginLeft: "8px",
            }}
          >
            {editorTheme === "dark" ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </TooltipButton>
        </div>

        {/* CENTER SECTION: Tools + Appearance Controls */}
        {imageUrl && (
          <>
            {/* Tool Buttons Group */}
            <div style={{ display: "flex", gap: "4px" }}>
              {/* Select Tool */}
              <TooltipButton
                onClick={() => {
                  setActiveTool("select");
                  setPanModeEnabled(false);
                }}
                tooltip="Select Tool (V)"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px 12px",
                  fontSize: "13px",
                  cursor: "pointer",
                  backgroundColor:
                    activeTool === "select" && !panModeEnabled
                      ? "#3B82F6"
                      : colors.buttonBg,
                  color:
                    activeTool === "select" && !panModeEnabled
                      ? "white"
                      : colors.textMuted,
                  border: "none",
                  borderRadius: "6px",
                  transition: "all 0.2s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M2 2l12 5-5 1-1 5z" />
                </svg>
                <span style={{ fontSize: "10px", fontWeight: 500 }}>Select</span>
              </TooltipButton>

              {/* Pan Tool */}
              <TooltipButton
                onClick={() => {
                  setPanModeEnabled(!panModeEnabled);
                  if (!panModeEnabled) {
                    setActiveTool("select");
                    showNotification("Click and drag to pan around the canvas");
                  }
                }}
                tooltip="Pan Tool (H) - Hold Space anytime to pan"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px 12px",
                  fontSize: "13px",
                  cursor: "pointer",
                  backgroundColor: panModeEnabled ? "#3B82F6" : colors.buttonBg,
                  color: panModeEnabled ? "white" : colors.textMuted,
                  border: "none",
                  borderRadius: "6px",
                  transition: "all 0.2s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M8 2v3M5 8H2M14 8h-3M8 11v3M4.5 4.5l2 2M11.5 4.5l-2 2M4.5 11.5l2-2M11.5 11.5l-2-2" />
                </svg>
                <span style={{ fontSize: "10px", fontWeight: 500 }}>Move</span>
              </TooltipButton>

              {/* Crop Tool */}
              <TooltipButton
                onClick={() => {
                  if (activeTool === "crop") {
                    setActiveTool("select");
                    setCropArea(null);
                  } else {
                    setActiveTool("crop");
                    setPanModeEnabled(false);
                    showNotification(
                      cropMode === "border"
                        ? "Drag the edges to crop the image"
                        : "Click and drag to select crop area"
                    );
                  }
                }}
                tooltip="Crop Tool (C)"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px 12px",
                  fontSize: "13px",
                  cursor: "pointer",
                  backgroundColor:
                    activeTool === "crop" ? "#3B82F6" : colors.buttonBg,
                  color: activeTool === "crop" ? "white" : colors.textMuted,
                  border: "none",
                  borderRadius: "6px",
                  transition: "all 0.2s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M11 2v3h3v1h-3v4h-1V6H6v4H5V6H2V5h3V2h1v3h4V2h1z" />
                </svg>
                <span style={{ fontSize: "10px", fontWeight: 500 }}>Crop</span>
              </TooltipButton>
            </div>

            {/* Background Toggle */}
            <TooltipButton
              onClick={() => {
                const newShowBackground = !showBackground;
                setShowBackground(newShowBackground);
                setTimeout(() => {
                  saveToHistory({
                    imageUrl,
                    annotations,
                    showBackground: newShowBackground,
                    includeWindowChrome,
                    windowChromeTheme,
                    selectedTheme,
                  });
                }, 0);
              }}
              tooltip={showBackground ? "Hide Background" : "Show Background"}
              tooltipBg={colors.tooltipBg}
              tooltipText={colors.textSecondary}
              tooltipBorder={colors.border}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                backgroundColor: showBackground ? "#3B82F6" : colors.buttonBg,
                color: showBackground ? "white" : colors.textMuted,
                border: "none",
                borderRadius: "6px",
                marginRight: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <rect
                  x="2"
                  y="2"
                  width="12"
                  height="12"
                  rx="2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <rect
                  x="4"
                  y="4"
                  width="8"
                  height="8"
                  rx="1"
                  fill="currentColor"
                  opacity="0.5"
                />
              </svg>
              <span style={{ fontSize: "10px", fontWeight: 500 }}>
                {showBackground ? "Hide BG" : "Show BG"}
              </span>
            </TooltipButton>

            {/* Theme Selector */}
            <TooltipButton
              onClick={() => {
                if (!showBackground) {
                  return;
                }
                setShowThemeSelector(!showThemeSelector);
              }}
              tooltip={
                !showBackground
                  ? "Enable background to use this feature"
                  : "Change Background Color"
              }
              tooltipBg={colors.tooltipBg}
              tooltipText={colors.textSecondary}
              tooltipBorder={colors.border}
              style={{
                padding: "8px 12px",
                fontSize: "13px",
                cursor: !showBackground ? "not-allowed" : "pointer",
                backgroundColor: showThemeSelector ? "#3B82F6" : colors.buttonBg,
                color: showThemeSelector ? "white" : colors.textMuted,
                border: "none",
                borderRadius: "6px",
                marginRight: "8px",
                transition: "all 0.2s",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
                opacity: !showBackground ? 0.5 : 1,
              }}
            >
              {/* Paint palette icon */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor" />
                <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor" />
                <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor" />
                <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor" />
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
              </svg>
              <span style={{ fontSize: "10px", fontWeight: 500 }}>
                Background
              </span>
            </TooltipButton>

            {/* Width Control */}
            <div style={{ position: "relative", marginRight: "8px" }} data-width-control>
              <TooltipButton
                onClick={() => {
                  if (!showBackground) {
                    return;
                  }
                  setShowWidthControl(!showWidthControl);
                }}
                tooltip={
                  !showBackground
                    ? "Enable background to use this feature"
                    : `Adjust Width - Current: ${Math.round(
                        calculateCardWidth(cardWidth)
                      )}px`
                }
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px 12px",
                  fontSize: "13px",
                  cursor: !showBackground ? "not-allowed" : "pointer",
                  backgroundColor: showWidthControl
                    ? "#3B82F6"
                    : colors.buttonBg,
                  color: showWidthControl ? "white" : colors.textMuted,
                  border: "none",
                  borderRadius: "6px",
                  transition: "all 0.2s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                  opacity: !showBackground ? 0.5 : 1,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M2 8h12M2 8l2-2M2 8l2 2M14 8l-2-2M14 8l-2 2" />
                </svg>
                <span style={{ fontSize: "10px", fontWeight: 500 }}>Width</span>
              </TooltipButton>
              {showWidthControl && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: "0",
                    background: colors.toolbar,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "8px",
                    padding: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                    zIndex: 1000,
                    minWidth: "200px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      color: colors.textMuted,
                      marginBottom: "8px",
                      fontWeight: 500,
                    }}
                  >
                    Card Width
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={cardWidth}
                      onChange={(e) => setCardWidth(Number(e.target.value))}
                      style={{ flex: 1 }}
                    />
                    <span
                      style={{
                        fontSize: "11px",
                        color: colors.textSecondary,
                        fontWeight: 500,
                      }}
                    >
                      {Math.round(calculateCardWidth(cardWidth))}px
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Padding Control */}
            <div style={{ position: "relative", marginRight: "8px" }} data-padding-control>
              <TooltipButton
                onClick={() => {
                  if (!showBackground) {
                    return;
                  }
                  setShowPaddingControl(!showPaddingControl);
                }}
                tooltip={
                  !showBackground
                    ? "Enable background to use this feature"
                    : `Adjust Padding - Current: ${Math.round(
                        calculateCardPadding(cardPadding)
                      )}px`
                }
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px 12px",
                  fontSize: "13px",
                  cursor: !showBackground ? "not-allowed" : "pointer",
                  backgroundColor: showPaddingControl
                    ? "#3B82F6"
                    : colors.buttonBg,
                  color: showPaddingControl ? "white" : colors.textMuted,
                  border: "none",
                  borderRadius: "6px",
                  transition: "all 0.2s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                  opacity: !showBackground ? 0.5 : 1,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <rect
                    x="2"
                    y="2"
                    width="12"
                    height="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                  <rect x="5" y="5" width="6" height="6" fill="currentColor" />
                </svg>
                <span style={{ fontSize: "10px", fontWeight: 500 }}>Spacing</span>
              </TooltipButton>
              {showPaddingControl && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: "0",
                    background: colors.toolbar,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "8px",
                    padding: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                    zIndex: 1000,
                    minWidth: "180px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      color: colors.textMuted,
                      marginBottom: "8px",
                      fontWeight: 500,
                    }}
                  >
                    Padding Size
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={cardPadding}
                      onChange={(e) => setCardPadding(Number(e.target.value))}
                      style={{ flex: 1 }}
                    />
                    <span
                      style={{
                        fontSize: "11px",
                        color: colors.textSecondary,
                        fontWeight: 500,
                      }}
                    >
                      {Math.round(calculateCardPadding(cardPadding))}px
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Undo/Redo - pushes action buttons to right */}
            <div style={{ display: "flex", gap: "4px", marginRight: "auto" }}>
              <TooltipButton
                onClick={handleUndo}
                disabled={!canUndo}
                tooltip="Undo (Ctrl/Cmd + Z)"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px 12px",
                  fontSize: "13px",
                  cursor: canUndo ? "pointer" : "not-allowed",
                  backgroundColor: colors.buttonBg,
                  color: canUndo ? colors.textSecondary : colors.textMuted,
                  border: "none",
                  borderRadius: "6px",
                  transition: "all 0.2s",
                  opacity: canUndo ? 1 : 0.5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M3 8h10M8 3l-5 5 5 5" />
                </svg>
                <span style={{ fontSize: "10px", fontWeight: 500 }}>Undo</span>
              </TooltipButton>

              <TooltipButton
                onClick={handleRedo}
                disabled={!canRedo}
                tooltip="Redo (Ctrl/Cmd + Shift + Z)"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px 12px",
                  fontSize: "13px",
                  cursor: canRedo ? "pointer" : "not-allowed",
                  backgroundColor: colors.buttonBg,
                  color: canRedo ? colors.textSecondary : colors.textMuted,
                  border: "none",
                  borderRadius: "6px",
                  transition: "all 0.2s",
                  opacity: canRedo ? 1 : 0.5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M3 8h10M8 3l5 5-5 5" />
                </svg>
                <span style={{ fontSize: "10px", fontWeight: 500 }}>Redo</span>
              </TooltipButton>
            </div>

            {/* Action Buttons */}
            {activeTool === "crop" && (cropArea || borderCrop) ? (
              <div style={{ display: "flex", gap: "8px" }}>
                <TooltipButton
                  onClick={() => {
                    if (borderCrop) {
                      applyBorderCrop();
                    } else if (cropArea) {
                      applyCrop();
                    }
                  }}
                  tooltip="Apply Crop"
                  tooltipBg={colors.tooltipBg}
                  tooltipText={colors.textSecondary}
                  tooltipBorder={colors.border}
                  style={{
                    padding: "8px 16px",
                    cursor: "pointer",
                    backgroundColor: "#3B82F6",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: 500,
                  }}
                >
                  Apply Crop
                </TooltipButton>
                <TooltipButton
                  onClick={() => {
                    setCropArea(null);
                    setBorderCrop(null);
                    setActiveTool("select");
                  }}
                  tooltip="Cancel"
                  tooltipBg={colors.tooltipBg}
                  tooltipText={colors.textSecondary}
                  tooltipBorder={colors.border}
                  style={{
                    padding: "8px 16px",
                    cursor: "pointer",
                    backgroundColor: colors.buttonBg,
                    color: colors.textSecondary,
                    border: "none",
                    borderRadius: "6px",
                  }}
                >
                  Cancel
                </TooltipButton>
              </div>
            ) : (
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                {/* Window Chrome Toggle */}
                <TooltipButton
                  onClick={() => {
                    const newIncludeWindowChrome = !includeWindowChrome;
                    setIncludeWindowChrome(newIncludeWindowChrome);
                    setTimeout(() => {
                      saveToHistory({
                        imageUrl,
                        annotations,
                        showBackground,
                        includeWindowChrome: newIncludeWindowChrome,
                        windowChromeTheme,
                        selectedTheme,
                      });
                    }, 0);
                  }}
                  tooltip={
                    includeWindowChrome
                      ? "Disable window chrome in download"
                      : "Enable window chrome in download"
                  }
                  tooltipBg={colors.tooltipBg}
                  tooltipText={colors.textSecondary}
                  tooltipBorder={colors.border}
                  style={{
                    padding: "8px 12px",
                    fontSize: "13px",
                    cursor: "pointer",
                    backgroundColor: includeWindowChrome
                      ? "#3B82F6"
                      : colors.buttonBg,
                    color: includeWindowChrome ? "white" : colors.textMuted,
                    border: "none",
                    borderRadius: "6px",
                    transition: "all 0.2s",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="2" y="3" width="12" height="10" rx="2" />
                    <line x1="2" y1="6" x2="14" y2="6" />
                    <circle cx="4" cy="4.5" r="0.5" fill="currentColor" />
                    <circle cx="6" cy="4.5" r="0.5" fill="currentColor" />
                    <circle cx="8" cy="4.5" r="0.5" fill="currentColor" />
                  </svg>
                  <span style={{ fontSize: "10px", fontWeight: 500 }}>Chrome</span>
                </TooltipButton>

                {/* Theme Toggle - show when window chrome is enabled */}
                {includeWindowChrome && (
                  <TooltipButton
                    onClick={() => {
                      const newWindowChromeTheme =
                        windowChromeTheme === "light" ? "dark" : "light";
                      setWindowChromeTheme(newWindowChromeTheme);
                      setTimeout(() => {
                        saveToHistory({
                          imageUrl,
                          annotations,
                          showBackground,
                          includeWindowChrome,
                          windowChromeTheme: newWindowChromeTheme,
                          selectedTheme,
                        });
                      }, 0);
                    }}
                    tooltip={
                      windowChromeTheme === "light"
                        ? "Switch to dark theme"
                        : "Switch to light theme"
                    }
                    tooltipBg={colors.tooltipBg}
                    tooltipText={colors.textSecondary}
                    tooltipBorder={colors.border}
                    style={{
                      padding: "8px 12px",
                      fontSize: "13px",
                      cursor: "pointer",
                      backgroundColor: colors.buttonBg,
                      color: colors.textSecondary,
                      border: "none",
                      borderRadius: "6px",
                      transition: "all 0.2s",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px",
                    }}
                  >
                    {windowChromeTheme === "light" ? (
                      <>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                        >
                          <circle cx="8" cy="8" r="3" />
                          <line
                            x1="8"
                            y1="1"
                            x2="8"
                            y2="3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <line
                            x1="8"
                            y1="13"
                            x2="8"
                            y2="15"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <line
                            x1="1"
                            y1="8"
                            x2="3"
                            y2="8"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <line
                            x1="13"
                            y1="8"
                            x2="15"
                            y2="8"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                        </svg>
                        <span style={{ fontSize: "10px", fontWeight: 500 }}>
                          Light
                        </span>
                      </>
                    ) : (
                      <>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                        >
                          <path d="M8 1C4.134 1 1 4.134 1 8s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 12.5c-3.038 0-5.5-2.462-5.5-5.5S4.962 2.5 8 2.5V8l3.89 3.89A5.474 5.474 0 018 13.5z" />
                        </svg>
                        <span style={{ fontSize: "10px", fontWeight: 500 }}>
                          Dark
                        </span>
                      </>
                    )}
                  </TooltipButton>
                )}

                {/* Copy Button */}
                <TooltipButton
                  onClick={handleCopy}
                  tooltip={isCopied ? "Copied!" : "Copy (Ctrl+C)"}
                  tooltipBg={colors.tooltipBg}
                  tooltipText={colors.textSecondary}
                  tooltipBorder={colors.border}
                  style={{
                    padding: "8px 20px",
                    cursor: "pointer",
                    backgroundColor: isCopied ? "#10B981" : colors.buttonBg,
                    color: isCopied ? "white" : colors.textSecondary,
                    border: `1px solid ${colors.buttonBgHover}`,
                    borderRadius: "6px",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {isCopied ? "Copied!" : "Copy"}
                </TooltipButton>

                {/* Download Button */}
                <TooltipButton
                  onClick={handleDownload}
                  tooltip="Download (Ctrl+S)"
                  tooltipBg={colors.tooltipBg}
                  tooltipText={colors.textSecondary}
                  tooltipBorder={colors.border}
                  style={{
                    padding: "8px 20px",
                    cursor: "pointer",
                    backgroundColor: "#3B82F6",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: 500,
                  }}
                >
                  Download
                </TooltipButton>
              </div>
            )}
          </>
        )}

        {/* Help Button - Restart onboarding */}
        <TooltipButton
          onClick={() => {
            setOnboardingStep(0);
            setHasSeenOnboarding(false);
            setShowOnboarding(true);
          }}
          tooltip="Show Tutorial"
          tooltipBg={colors.tooltipBg}
          tooltipText={colors.textSecondary}
          tooltipBorder={colors.border}
          style={{
            padding: "8px",
            cursor: "pointer",
            backgroundColor: colors.buttonBg,
            color: colors.textMuted,
            border: `1px solid ${colors.border}`,
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </TooltipButton>

        {/* Dashboard/Sign In Button - Always visible */}
        <button
          onClick={() => {
            if (user) {
              // If there's an image loaded, show unsaved changes prompt
              if (imageUrl) {
                setShowUnsavedPrompt(true);
              } else {
                router.push("/dashboard");
              }
            } else {
              router.push("/auth/login");
            }
          }}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            backgroundColor: user ? "#F97316" : "#10B981",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "14px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.9";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {user ? (
              <>
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </>
            ) : (
              <>
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </>
            )}
          </svg>
          {user ? "Dashboard" : "Sign In"}
        </button>
      </div>

      {/* Theme Selector Popup */}
      {showThemeSelector && (
        <ThemeSelector
          selectedTheme={selectedTheme}
          onThemeSelect={(newTheme) => {
            setSelectedTheme(newTheme);
            
            // Check if the theme is from a premium section (all sections EXCEPT Peace/Popular)
            const isPremiumTheme = !POPULAR_THEME_KEYS.includes(newTheme) && newTheme !== "custom";
            
            // For free users, track premium feature usage
            if (!hasProPlan) {
              if (isPremiumTheme || newTheme === "custom") {
                setUsedPremiumFeatures(true);
              } else if (POPULAR_THEME_KEYS.includes(newTheme)) {
                // Reset if switching to a free theme (Peace section)
                setUsedPremiumFeatures(false);
              }
            }
            
            setTimeout(() => {
              saveToHistory({
                imageUrl,
                annotations,
                showBackground,
                includeWindowChrome,
                windowChromeTheme,
                selectedTheme: newTheme,
              });
            }, 0);
          }}
          onClose={() => setShowThemeSelector(false)}
          editorTheme={editorTheme}
          initialCustomColor={customColor}
          initialCustomColor2={customColor2}
          initialCustomColor3={customColor3}
          initialCustomColor4={customColor4}
          initialGradientType={gradientType}
          initialGradientAngle={gradientAngle}
          initialCustomMode={customMode}
          initialShowColor2={showColor2}
          initialShowColor3={showColor3}
          initialShowColor4={showColor4}
          onCustomChange={(color, settings) => {
            setCustomColor(color);
            setCustomColor2(settings.color2);
            setCustomColor3(settings.color3);
            setCustomColor4(settings.color4);
            setGradientType(settings.type);
            setGradientAngle(settings.angle);
            setCustomMode(settings.mode);
            setShowColor2(settings.showColor2);
            setShowColor3(settings.showColor3);
            setShowColor4(settings.showColor4);
            setSelectedTheme("custom" as ThemeType);
            // Mark premium features as used when custom theme is selected
            if (!hasProPlan) {
              setUsedPremiumFeatures(true);
            }
          }}
        />
      )}

      {/* Contact Popup */}
      {showContactPopup && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => {
              setShowContactPopup(false);
              setIsEmailCopied(false);
            }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(4px)",
              zIndex: 9999,
            }}
          />
          {/* Popup Content */}
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: colors.toolbar,
              border: `1px solid ${colors.border}`,
              borderRadius: "12px",
              padding: "32px",
              maxWidth: "500px",
              width: "90%",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6)",
              zIndex: 10000,
            }}
          >
            {/* Close button */}
            <button
              onClick={() => {
                setShowContactPopup(false);
                setIsEmailCopied(false);
              }}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "transparent",
                border: "none",
                color: colors.textMuted,
                cursor: "pointer",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>

            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background:
                    "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 16 16" fill="white">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.708 2.825L15 11.105V5.383zm-.034 6.876l-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z" />
                </svg>
              </div>
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: 600,
                    color: colors.textSecondary,
                  }}
                >
                  Get in Touch
                </h3>
                <p
                  style={{
                    margin: "4px 0 0 0",
                    fontSize: "13px",
                    color: colors.textMuted,
                  }}
                >
                  We&apos;d love to hear from you
                </p>
              </div>
            </div>

            {/* Message */}
            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.6",
                color: colors.textSecondary,
                marginBottom: "24px",
              }}
            >
              Please contact us for anything like feature requests, doubts,
              bugs, issues, or any feedback you&apos;d like to share. We&apos;re
              here to help!
            </p>

            {/* Email Section */}
            <div
              style={{
                background: colors.buttonBg,
                border: `1px solid ${colors.border}`,
                borderRadius: "8px",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div
                  style={{
                    fontSize: "11px",
                    color: colors.textMuted,
                    marginBottom: "4px",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Email Address
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    color: "#3B82F6",
                    fontWeight: 500,
                  }}
                >
                  hello@ilovesnapshots.online
                </div>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("hello@ilovesnapshots.online");
                  setIsEmailCopied(true);
                  setTimeout(() => setIsEmailCopied(false), 2000);
                }}
                style={{
                  padding: "10px 20px",
                  fontSize: "13px",
                  cursor: "pointer",
                  backgroundColor: isEmailCopied ? "#10B981" : "#3B82F6",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {isEmailCopied ? (
                  <>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2z" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}

      {/* Login Prompt Popup */}
      {showLoginPrompt && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setShowLoginPrompt(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(4px)",
              zIndex: 9999,
            }}
          />
          {/* Modal */}
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: colors.cardBg,
              borderRadius: "16px",
              padding: "32px",
              border: `1px solid ${colors.border}`,
              maxWidth: "400px",
              width: "90%",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6)",
              zIndex: 10000,
              textAlign: "center",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowLoginPrompt(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "transparent",
                border: "none",
                color: colors.textMuted,
                cursor: "pointer",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>

            {/* Logo */}
            <img
              src="/logo.png"
              alt="ILoveSnapshots"
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                objectFit: "contain",
                margin: "0 auto 20px",
              }}
            />

            {/* Title */}
            <h3
              style={{
                margin: "0 0 12px 0",
                fontSize: "22px",
                fontWeight: 600,
                color: colors.textSecondary,
              }}
            >
              Login Required
            </h3>

            {/* Message */}
            <p
              style={{
                fontSize: "14px",
                lineHeight: "1.6",
                color: colors.textMuted,
                marginBottom: "24px",
              }}
            >
              {loginPromptAction === "download"
                ? "Please sign in to download your beautifully edited screenshot. Your work will be preserved!"
                : "Please sign in to copy your beautifully edited screenshot to clipboard. Your work will be preserved!"}
            </p>

            {/* Login Button */}
            <button
              onClick={() => {
                saveEditorStateForLogin();
                router.push("/auth/login?redirect=/editor");
              }}
              style={{
                width: "100%",
                padding: "14px 24px",
                fontSize: "15px",
                cursor: "pointer",
                backgroundColor: "#8B5CF6",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                boxShadow: "0 4px 12px rgba(139, 92, 246, 0.4)",
                transition: "all 0.2s",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
              Sign In to{" "}
              {loginPromptAction === "download" ? "Download" : "Copy"}
            </button>

            {/* Subtle note */}
            <p
              style={{
                fontSize: "12px",
                color: colors.textMuted,
                marginTop: "16px",
                opacity: 0.7,
              }}
            >
              Your edited image will be waiting for you after login
            </p>
          </div>
        </>
      )}

      {/* Quality Selection Modal */}
      {showQualityModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100000,
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setShowQualityModal(false)}
        >
          <div
            style={{
              background: colors.background,
              borderRadius: "16px",
              padding: "32px",
              maxWidth: "480px",
              width: "90%",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
              border: `1px solid ${colors.border}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ marginBottom: "24px", textAlign: "center" }}>
              <h3
                style={{
                  margin: "0 0 8px 0",
                  fontSize: "22px",
                  fontWeight: 600,
                  color: colors.text,
                }}
              >
                Choose Download Quality
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  color: colors.textMuted,
                  lineHeight: "1.5",
                }}
              >
                Select the quality that best suits your needs
              </p>

              {/* Premium Features Notification */}
              {!hasProPlan && usedPremiumFeatures && (
                <div
                  style={{
                    marginTop: "12px",
                    padding: "10px 14px",
                    background: "rgba(251, 146, 60, 0.1)",
                    border: "1px solid rgba(251, 146, 60, 0.3)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span style={{ fontSize: "16px" }}>⚠️</span>
                  <span
                    style={{
                      fontSize: "13px",
                      color: "#FB923C",
                      fontWeight: 500,
                    }}
                  >
                    You have used premium features in editor
                  </span>
                </div>
              )}
            </div>

            {/* Quality Options */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {/* Standard Quality Option */}
              <button
                onClick={() => {
                  // If free user has used premium features, show upgrade prompt
                  if (!hasProPlan && usedPremiumFeatures) {
                    setShowQualityModal(false);
                    setShowUpgradePrompt(true);
                  } else {
                    performDownload("standard");
                  }
                }}
                style={{
                  background: colors.buttonBg,
                  border: `2px solid ${colors.border}`,
                  borderRadius: "12px",
                  padding: "20px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.textMuted;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.border;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                    }}
                  >
                    ⚡
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: colors.text,
                        marginBottom: "4px",
                      }}
                    >
                      Standard Quality
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: colors.textMuted,
                        lineHeight: "1.4",
                      }}
                    >
                      Fast download • Perfect for sharing
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: colors.textSecondary,
                    paddingLeft: "52px",
                    lineHeight: "1.5",
                  }}
                >
                  Good quality, smaller file size. Ideal for quick sharing on
                  social media and messaging apps.
                </div>
              </button>

              {/* HD Quality Option */}
              <button
                onClick={() => {
                  if (!hasProPlan) {
                    setShowQualityModal(false);
                    setShowUpgradePrompt(true);
                  } else {
                    performDownload("hd");
                  }
                }}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)",
                  border: "2px solid #3B82F6",
                  borderRadius: "12px",
                  padding: "20px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(59, 130, 246, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Pro Only / Recommended Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: hasProPlan ? "#3B82F6" : "#F59E0B",
                    color: "white",
                    fontSize: "10px",
                    fontWeight: 600,
                    padding: "4px 8px",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {hasProPlan ? "Recommended" : "Pro Only"}
                </div>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background:
                        "linear-gradient(135deg, #3B82F6 0%, #9333EA 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                    }}
                  >
                    ✨
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: colors.text,
                        marginBottom: "4px",
                      }}
                    >
                      Ultra HD Quality
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: colors.textMuted,
                        lineHeight: "1.4",
                      }}
                    >
                      Premium quality • Crisp & sharp
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: colors.textSecondary,
                    paddingLeft: "52px",
                    lineHeight: "1.5",
                  }}
                >
                  Maximum resolution with crystal-clear text. Best for
                  professional use, presentations, and printing.
                </div>
                {!hasProPlan ? (
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#F59E0B",
                      paddingLeft: "52px",
                      marginTop: "4px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontWeight: 600,
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 13A6 6 0 1 1 8 2a6 6 0 0 1 0 12zm-.5-6.5v-3a.5.5 0 0 1 1 0v3a.5.5 0 0 1-1 0zM8 11a.75.75 0 1 1 0-1.5A.75.75 0 0 1 8 11z" />
                    </svg>
                    Click to upgrade to Pro and unlock Ultra HD downloads
                  </div>
                ) : (
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#F59E0B",
                      paddingLeft: "52px",
                      marginTop: "4px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                    Note: Larger file size due to higher quality
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Prompt Modal */}
      {showUpgradePrompt && (
        <div
          onClick={() => setShowUpgradePrompt(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
          }}
        >
          <div
            style={{
              background: colors.toolbar,
              borderRadius: "16px",
              maxWidth: "460px",
              width: "90%",
              maxHeight: "85vh",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5)",
              border: `2px solid ${colors.border}`,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Fixed */}
            <div
              style={{
                padding: "24px 28px",
                borderBottom: `1px solid ${colors.border}`,
                textAlign: "center",
              }}
            >
              <img 
                src="/logo.png" 
                alt="Logo"
                style={{
                  width: "48px",
                  height: "48px",
                  margin: "0 auto 16px",
                  display: "block",
                }}
              />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "6px" }}>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "24px",
                    fontWeight: 600,
                    color: colors.text,
                  }}
                >
                  Upgrade to Pro
                </h2>
                <SparkleIcon size={20} />
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  color: colors.textMuted,
                  lineHeight: "1.4",
                }}
              >
                Unlock premium features for your screenshots
              </p>
            </div>

            {/* Scrollable Content */}
            <div
              style={{
                overflowY: "auto",
                padding: "24px 28px",
                flex: 1,
              }}
            >
              {/* Launch Special Badge */}
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(251, 146, 60, 0.1) 100%)",
                  border: "2px solid rgba(6, 182, 212, 0.3)",
                  borderRadius: "10px",
                  padding: "14px 16px",
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "20px", marginBottom: "4px" }}>🎉</div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: colors.text, marginBottom: "2px" }}>
                  Launch Special: 50% OFF
                </div>
                <div style={{ fontSize: "12px", color: colors.textMuted }}>
                  For First 100 users only!
                </div>
              </div>

              {/* Pricing */}
              <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <div style={{ marginBottom: "12px" }}>
                  <span style={{ fontSize: "20px", color: colors.textMuted, textDecoration: "line-through" }}>$3</span>
                  <span style={{ fontSize: "36px", fontWeight: 700, color: colors.text, marginLeft: "8px" }}>$2</span>
                  <span style={{ fontSize: "16px", color: colors.textMuted }}>/month</span>
                </div>
                <div style={{ fontSize: "13px", color: "#06B6D4", fontWeight: 500 }}>
                  Or $12/year (save $12) 
                </div>
              </div>

              {/* Features */}
              <div style={{ marginBottom: "20px" }}>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: colors.text,
                    marginBottom: "12px",
                  }}
                >
                  What's included:
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    "Premium themes (120+ styles)",
                    "Custom theme creator",
                    "No watermark on exports",
                    "All Extension Pro Features",
                    "Drawing \u0026 annotation tools",
                    "Blur \u0026 pixelate tools",
                    "Highest quality exports (4K)",
                    "Priority support (24h)",
                    "Cloud storage (coming soon)",
                  ].map((feature, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#06B6D4"
                        strokeWidth="3"
                        style={{ flexShrink: 0 }}
                      >
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                      <span style={{ fontSize: "14px", color: colors.textSecondary }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Elements */}
              <div
                style={{
                  borderTop: `1px solid ${colors.border}`,
                  paddingTop: "16px",
                  marginTop: "20px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    // { icon: "✓", text: "7-day free trial" },
                    { icon: "✓", text: "Cancel anytime, no questions" },
                    { icon: "✓", text: "Secure payment" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "13px",
                        color: colors.textMuted,
                      }}
                    >
                      <span style={{ color: "#06B6D4", fontWeight: "bold" }}>{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer with buttons - Fixed */}
            <div
              style={{
                padding: "20px 28px",
                borderTop: `1px solid ${colors.border}`,
                background: colors.toolbar,
              }}
            >
              <button
                onClick={() => {
                  setShowUpgradePrompt(false);
                  window.location.href = "/#pricing";
                }}
                style={{
                  width: "100%",
                  padding: "14px 24px",
                  background: "linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%)",
                  border: "none",
                  borderRadius: "10px",
                  color: "#FFF",
                  fontSize: "15px",
                  fontWeight: 600,
                  cursor: "pointer",
                  marginBottom: "10px",
                  boxShadow: "0 4px 14px rgba(6, 182, 212, 0.3)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(6, 182, 212, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 14px rgba(6, 182, 212, 0.3)";
                }}
              >
                Upgrade to Pro
              </button>
              <button
                onClick={() => setShowUpgradePrompt(false)}
                style={{
                  width: "100%",
                  padding: "12px 24px",
                  background: "transparent",
                  border: "none",
                  borderRadius: "8px",
                  color: colors.textMuted,
                  fontSize: "14px",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = colors.buttonBg;
                  e.currentTarget.style.color = colors.text;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = colors.textMuted;
                }}
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Watch Demo and Contact Buttons - Below Toolbar on Left */}
      <div
        style={{
          position: "absolute",
          top: "88px",
          left: "20px",
          zIndex: 1001,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {/* Import New Image Button */}
        <TooltipButton
          onClick={() => fileInputRef.current?.click()}
          tooltip="Import a new image"
          tooltipBg={colors.tooltipBg}
          tooltipText={colors.textSecondary}
          tooltipBorder={colors.border}
          style={{
            padding: "10px 20px",
            fontSize: "13px",
            cursor: "pointer",
            backgroundColor: "#10B981",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 10v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-3" />
            <path d="M8 2v8" />
            <path d="M5 7l3-3 3 3" />
          </svg>
          Import New Image
        </TooltipButton>

        {/* Watch Demo Button */}
        <TooltipButton
          onClick={() => window.open("https://youtu.be/MaFE9Il0wC0", "_blank")}
          tooltip="Watch tutorial video"
          tooltipBg={colors.tooltipBg}
          tooltipText={colors.textSecondary}
          tooltipBorder={colors.border}
          style={{
            padding: "10px 20px",
            fontSize: "13px",
            cursor: "pointer",
            backgroundColor: "#8B5CF6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
          </svg>
          Watch Demo
        </TooltipButton>

        {/* Contact Button */}
        <TooltipButton
          onClick={() => setShowContactPopup(true)}
          tooltip="Contact us for support"
          tooltipBg={colors.tooltipBg}
          tooltipText={colors.textSecondary}
          tooltipBorder={colors.border}
          style={{
            padding: "10px 20px",
            fontSize: "13px",
            cursor: "pointer",
            backgroundColor: colors.buttonBg,
            color: colors.textSecondary,
            border: `1px solid ${colors.border}`,
            borderRadius: "8px",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.708 2.825L15 11.105V5.383zm-.034 6.876l-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z" />
          </svg>
          Contact
        </TooltipButton>

        {/* Extension Promotion Box */}
        <div
          style={{
            padding: "16px",
            backgroundColor: colors.buttonBg,
            border: `1px solid ${colors.border}`,
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            maxWidth: "280px",
            marginTop: "8px",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              lineHeight: "1.5",
              color: colors.textSecondary,
              marginBottom: "12px",
              fontWeight: 400,
            }}
          >
            You can directly take the screenshots of website pages and edit them
            in the editor using our extension
          </p>
          <button
            onClick={() =>
              window.open(
                "https://chromewebstore.google.com/detail/mnaeoccblgmbchggojbhijgeidlnnpmm?utm_source=item-share-cb",
                "_blank"
              )
            }
            style={{
              width: "100%",
              padding: "10px 20px",
              fontSize: "13px",
              cursor: "pointer",
              backgroundColor: "#4285F4",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: "0 2px 8px rgba(66, 133, 244, 0.3)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z" />
            </svg>
            Try Extension
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div
        ref={containerRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onMouseDown={(e) => {
          if (spacePressed || e.button === 1 || panModeEnabled) {
            setIsPanning(true);
            setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
          }
        }}
        onMouseMove={(e) => {
          if (isPanning) {
            setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
          }
        }}
        onMouseUp={() => setIsPanning(false)}
        onWheel={handleWheel}
        style={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: editorTheme === "dark" ? "#262626" : "#E5E7EB",
          cursor: getCursor(),
          border: isDragOver ? "3px dashed #3B82F6" : "none",
          touchAction: "none",
          overscrollBehavior: "none",
        }}
      >
        {!imageUrl ? (
          /* Upload Area */
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "60px",
              border: `2px dashed ${isDragOver ? "#3B82F6" : colors.border}`,
              borderRadius: "16px",
              background: isDragOver
                ? "rgba(59, 130, 246, 0.1)"
                : colors.toolbar,
              cursor: "pointer",
              transition: "all 0.2s",
              maxWidth: "500px",
            }}
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.textMuted}
              strokeWidth="1.5"
              style={{ marginBottom: "20px" }}
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <h3
              style={{
                margin: "0 0 8px 0",
                color: colors.text,
                fontSize: "18px",
              }}
            >
              Drop an image here or click to upload
            </h3>
            <p
              style={{
                margin: "0 0 16px 0",
                color: colors.textMuted,
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              You can also paste an image from clipboard (Ctrl+V)
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <span
                style={{
                  padding: "6px 12px",
                  background: colors.buttonBg,
                  borderRadius: "6px",
                  fontSize: "12px",
                  color: colors.textSecondary,
                }}
              >
                PNG
              </span>
              <span
                style={{
                  padding: "6px 12px",
                  background: colors.buttonBg,
                  borderRadius: "6px",
                  fontSize: "12px",
                  color: colors.textSecondary,
                }}
              >
                JPG
              </span>
              <span
                style={{
                  padding: "6px 12px",
                  background: colors.buttonBg,
                  borderRadius: "6px",
                  fontSize: "12px",
                  color: colors.textSecondary,
                }}
              >
                GIF
              </span>
              <span
                style={{
                  padding: "6px 12px",
                  background: colors.buttonBg,
                  borderRadius: "6px",
                  fontSize: "12px",
                  color: colors.textSecondary,
                }}
              >
                WebP
              </span>
            </div>
          </div>
        ) : showBackground ? (
          /* Image with Background */
          <div
            ref={transformContainerRef}
            data-screenshot-with-background="true"
            style={{
              transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${
                pan.y / zoom
              }px)`,
              transformOrigin: "center center",
              transition: "none",
              willChange: isPanning ? "transform" : "auto",
              background: getThemeBackground(),
              padding: `${calculateCardPadding(cardPadding)}px`,
              borderRadius: "0",
              display: "block",
              width: `${calculateCardWidth(cardWidth)}px`,
              overflow: "hidden",
              boxSizing: "border-box",
            }}
          >
            {/* Watermark - Only show for free plan users */}
            {!hasProPlan && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    background: "rgba(0, 0, 0, 0.6)",
                    backdropFilter: "blur(8px)",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <img
                    src="/logo.png"
                    alt="Logo"
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "6px",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "rgba(255, 255, 255, 0.95)",
                      textShadow: "0 1px 3px rgba(0, 0, 0, 0.5)",
                      fontFamily:
                        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    }}
                  >
                    iloveSnapshots.online
                  </span>
                </div>
              </div>
            )}

            {/* Shadow layers */}
            <div style={{ position: "relative" }}>
              {[45, 40, 35, 30, 25, 20, 15].map((offset, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: `${offset}px`,
                    left: `${-25 + i * 5}px`,
                    right: `${-25 + i * 5}px`,
                    bottom: `${-offset}px`,
                    background: `rgba(0, 0, 0, ${0.01 + i * 0.015})`,
                    borderRadius: `${18 - i}px`,
                  }}
                />
              ))}

              {/* Window Chrome Container */}
              <div
                ref={windowChromeRef}
                style={{
                  position: "relative",
                  background:
                    windowChromeTheme === "light" ? "#ffffff" : "#1a1a1a",
                  borderRadius: "12px",
                  overflow: "hidden",
                  zIndex: 10,
                  width: "100%",
                }}
              >
                {/* macOS Title Bar */}
                {includeWindowChrome && (
                  <div
                    style={{
                      height: "40px",
                      background:
                        windowChromeTheme === "light"
                          ? "linear-gradient(180deg, #e8e8e8 0%, #d8d8d8 100%)"
                          : "linear-gradient(180deg, #3d3d3d 0%, #2d2d2d 100%)",
                      borderBottom:
                        windowChromeTheme === "light"
                          ? "1px solid #c0c0c0"
                          : "1px solid #1a1a1a",
                      display: "flex",
                      alignItems: "center",
                      padding: "0 16px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "8px" }}>
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #FF5F57 0%, #FF4040 100%)",
                        }}
                      />
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #FFBD2E 0%, #FFA500 100%)",
                        }}
                      />
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #28C840 0%, #20A030 100%)",
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Canvas Container */}
                <div style={{ position: "relative", width: "100%" }}>
                  <canvas
                    ref={canvasRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onWheel={handleWheel}
                    style={{
                      display: "block",
                      width: "100%",
                      height: "auto",
                      cursor: getCursor(),
                    }}
                  />
                  <canvas
                    ref={overlayCanvasRef}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      pointerEvents: "none",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                  <canvas
                    ref={annotationCanvasRef}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      pointerEvents: "none",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Image without Background */
          <div
            ref={(el) => {
              windowChromeRef.current = el;
              if (!showBackground) transformContainerRef.current = el;
            }}
            style={{
              transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${
                pan.y / zoom
              }px)`,
              transformOrigin: "center center",
              transition: "none",
              willChange: isPanning ? "transform" : "auto",
              background: windowChromeTheme === "light" ? "#ffffff" : "#1a1a1a",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            {/* macOS Title Bar */}
            {includeWindowChrome && (
              <div
                style={{
                  height: "40px",
                  background:
                    windowChromeTheme === "light"
                      ? "linear-gradient(180deg, #e8e8e8 0%, #d8d8d8 100%)"
                      : "linear-gradient(180deg, #3d3d3d 0%, #2d2d2d 100%)",
                  borderBottom:
                    windowChromeTheme === "light"
                      ? "1px solid #c0c0c0"
                      : "1px solid #1a1a1a",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 16px",
                }}
              >
                <div style={{ display: "flex", gap: "8px" }}>
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #FF5F57 0%, #FF4040 100%)",
                    }}
                  />
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #FFBD2E 0%, #FFA500 100%)",
                    }}
                  />
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, #28C840 0%, #20A030 100%)",
                    }}
                  />
                </div>
              </div>
            )}

            {/* Canvas Container */}
            <div style={{ position: "relative" }}>
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onWheel={handleWheel}
                style={{
                  display: "block",
                  cursor: getCursor(),
                }}
              />
              <canvas
                ref={overlayCanvasRef}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  pointerEvents: "none",
                }}
              />
              <canvas
                ref={annotationCanvasRef}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        )}

        {/* Drawing Tools Sidebar - Right side */}
        {imageUrl && (
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: colors.toolbar,
              borderRadius: "8px",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              border: `1px solid ${colors.border}`,
            }}
          >
            {/* Drawing Toolbox Label */}
            <div
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: colors.textSecondary,
                textAlign: "center",
                paddingBottom: "4px",
                borderBottom: `1px solid ${colors.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              <span>Drawing Toolbox</span>
              <SparkleIcon size={10} />
            </div>

            {/* Row 1: Line, Freehand, Arrow */}
            <div style={{ display: "flex", gap: "4px" }}>
              <TooltipButton
                onClick={() => {
                  setActiveTool("line");
                  setPanModeEnabled(false);
                  showNotification("Click and drag to draw a straight line");
                  // Mark premium feature usage for free users
                  if (!hasProPlan) {
                    setUsedPremiumFeatures(true);
                  }
                }}
                tooltip="Line (L)"
                tooltipPosition="left"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  backgroundColor:
                    activeTool === "line" ? "#3B82F6" : colors.buttonBg,
                  color: activeTool === "line" ? "white" : colors.textSecondary,
                  border: "none",
                  borderRadius: "4px",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <line x1="2" y1="14" x2="14" y2="2" />
                </svg>
              </TooltipButton>

              <TooltipButton
                onClick={() => {
                  setActiveTool("freehand");
                  setPanModeEnabled(false);
                  showNotification("Click and drag to draw freehand");
                  if (!hasProPlan) {
                    setUsedPremiumFeatures(true);
                  }
                }}
                tooltip="Freehand (F)"
                tooltipPosition="left"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  backgroundColor:
                    activeTool === "freehand" ? "#3B82F6" : colors.buttonBg,
                  color:
                    activeTool === "freehand" ? "white" : colors.textSecondary,
                  border: "none",
                  borderRadius: "4px",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2 14 Q4 10, 6 8 T10 4 L14 2" />
                </svg>
              </TooltipButton>

              <TooltipButton
                onClick={() => {
                  setActiveTool("arrow");
                  setPanModeEnabled(false);
                  showNotification("Click and drag to draw an arrow");
                  if (!hasProPlan) {
                    setUsedPremiumFeatures(true);
                  }
                }}
                tooltip="Arrow (A)"
                tooltipPosition="left"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  backgroundColor:
                    activeTool === "arrow" ? "#3B82F6" : colors.buttonBg,
                  color:
                    activeTool === "arrow" ? "white" : colors.textSecondary,
                  border: "none",
                  borderRadius: "4px",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M2 14 L14 2 M14 2 L10 2 M14 2 L14 6" />
                </svg>
              </TooltipButton>
            </div>

            {/* Row 2: Circle, Rectangle, Blur */}
            <div style={{ display: "flex", gap: "4px" }}>
              <TooltipButton
                onClick={() => {
                  setActiveTool("circle");
                  setPanModeEnabled(false);
                  showNotification("Click and drag to draw a circle");
                  if (!hasProPlan) {
                    setUsedPremiumFeatures(true);
                  }
                }}
                tooltip="Circle (C)"
                tooltipPosition="left"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  backgroundColor:
                    activeTool === "circle" ? "#3B82F6" : colors.buttonBg,
                  color:
                    activeTool === "circle" ? "white" : colors.textSecondary,
                  border: "none",
                  borderRadius: "4px",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="8" cy="8" r="5" />
                </svg>
              </TooltipButton>

              <TooltipButton
                onClick={() => {
                  setActiveTool("rectangle");
                  setPanModeEnabled(false);
                  showNotification("Click and drag to draw a rectangle");
                  if (!hasProPlan) {
                    setUsedPremiumFeatures(true);
                  }
                }}
                tooltip="Rectangle (R)"
                tooltipPosition="left"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  backgroundColor:
                    activeTool === "rectangle" ? "#3B82F6" : colors.buttonBg,
                  color:
                    activeTool === "rectangle" ? "white" : colors.textSecondary,
                  border: "none",
                  borderRadius: "4px",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="2" y="3" width="12" height="10" rx="1" />
                </svg>
              </TooltipButton>

              <TooltipButton
                onClick={() => {
                  setActiveTool("blur");
                  setPanModeEnabled(false);
                  showNotification("Click and drag to blur an area");
                  if (!hasProPlan) {
                    setUsedPremiumFeatures(true);
                  }
                }}
                tooltip="Blur (B)"
                tooltipPosition="left"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  backgroundColor:
                    activeTool === "blur" ? "#3B82F6" : colors.buttonBg,
                  color: activeTool === "blur" ? "white" : colors.textSecondary,
                  border: "none",
                  borderRadius: "4px",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <rect x="2" y="2" width="3" height="3" opacity="0.7" />
                  <rect x="6" y="2" width="3" height="3" opacity="0.5" />
                  <rect x="10" y="2" width="3" height="3" opacity="0.8" />
                  <rect x="2" y="6" width="3" height="3" opacity="0.6" />
                  <rect x="6" y="6" width="3" height="3" opacity="0.9" />
                  <rect x="10" y="6" width="3" height="3" opacity="0.4" />
                  <rect x="2" y="10" width="3" height="3" opacity="0.8" />
                  <rect x="6" y="10" width="3" height="3" opacity="0.6" />
                  <rect x="10" y="10" width="3" height="3" opacity="0.7" />
                </svg>
              </TooltipButton>
            </div>

            {/* Row 3: Highlight */}
            <div style={{ display: "flex", gap: "4px" }}>
              <TooltipButton
                onClick={() => {
                  setActiveTool("highlight");
                  showNotification("Click and drag to highlight an area");
                  setPanModeEnabled(false);
                }}
                tooltip="Highlight (H)"
                tooltipPosition="left"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  backgroundColor:
                    activeTool === "highlight" ? "#3B82F6" : colors.buttonBg,
                  color:
                    activeTool === "highlight" ? "white" : colors.textSecondary,
                  border: "none",
                  borderRadius: "4px",
                  width: "100%",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  opacity="0.5"
                >
                  <rect x="2" y="5" width="12" height="6" />
                </svg>
                <span style={{ fontSize: "11px" }}>Highlight</span>
              </TooltipButton>
            </div>
          </div>
        )}

        {/* Crop Mode Toolbar - Only show when in crop mode */}
        {activeTool === "crop" && imageUrl && (
          <div
            style={{
              position: "absolute",
              top: "176px",
              right: "20px",
              background: colors.toolbar,
              borderRadius: "8px",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              border: `1px solid ${colors.border}`,
            }}
          >
            {/* Crop Mode Label */}
            <div
              style={{
                textAlign: "center",
                color: colors.textMuted,
                fontSize: "11px",
                fontWeight: 500,
                padding: "4px 0",
              }}
            >
              CROP MODE
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: colors.border }} />

            {/* Row 1: Freeform, Scissor Icon, Border */}
            <div style={{ display: "flex", gap: "4px" }}>
              <TooltipButton
                onClick={handleFreeformCrop}
                tooltip="Freeform Crop - Drag to select area"
                tooltipPosition="left"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px",
                  fontSize: "14px",
                  cursor: "pointer",
                  backgroundColor:
                    cropMode === "freeform" ? "#3B82F6" : colors.buttonBg,
                  color:
                    cropMode === "freeform" ? "white" : colors.textSecondary,
                  border: "none",
                  borderRadius: "4px",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M11 2v3h3v1h-3v4h-1V6H6v4H5V6H2V5h3V2h1v3h4V2h1z" />
                </svg>
              </TooltipButton>

              {/* Scissor icon in the middle - no background */}
              <div
                style={{
                  padding: "8px",
                  fontSize: "14px",
                  backgroundColor: "transparent",
                  color: colors.textMuted,
                  border: "none",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="3" cy="4" r="1.5" />
                  <circle cx="3" cy="12" r="1.5" />
                  <line x1="4.5" y1="4.5" x2="13" y2="8" />
                  <line x1="4.5" y1="11.5" x2="13" y2="8" />
                  <line x1="13" y1="8" x2="15" y2="8" />
                </svg>
              </div>

              <TooltipButton
                onClick={handleBorderCrop}
                tooltip="Border Crop - Drag edges to crop"
                tooltipPosition="left"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px",
                  fontSize: "14px",
                  cursor: "pointer",
                  backgroundColor:
                    cropMode === "border" ? "#3B82F6" : colors.buttonBg,
                  color: cropMode === "border" ? "white" : colors.textSecondary,
                  border: "none",
                  borderRadius: "4px",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <rect
                    x="2"
                    y="2"
                    width="12"
                    height="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="2"
                    y1="5"
                    x2="14"
                    y2="5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="2"
                    y1="11"
                    x2="14"
                    y2="11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="5"
                    y1="2"
                    x2="5"
                    y2="14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="11"
                    y1="2"
                    x2="11"
                    y2="14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </TooltipButton>
            </div>
          </div>
        )}

        {/* Annotation Options Toolbar - Shows when annotation tool is active */}
        {imageUrl &&
          [
            "rectangle",
            "circle",
            "arrow",
            "line",
            "highlight",
            "blur",
            "freehand",
          ].includes(activeTool) && (
            <div
              style={{
                position: "absolute",
                top: "176px",
                right: "20px",
                background: colors.toolbar,
                borderRadius: "8px",
                padding: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                border: `1px solid ${colors.border}`,
              }}
            >
              {/* Color Swatches Row 1 */}
              <div style={{ display: "flex", gap: "4px" }}>
                {["#FF0000", "#00FF00", "#0000FF"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setAnnotationColor(color)}
                    style={{
                      width: "36px",
                      height: "36px",
                      backgroundColor: color,
                      border:
                        annotationColor === color
                          ? "2px solid #3B82F6"
                          : `2px solid ${colors.border}`,
                      borderRadius: "4px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {annotationColor === color && (
                      <span
                        style={{
                          color: color === "#00FF00" ? "black" : "white",
                          fontSize: "16px",
                        }}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Color Swatches Row 2 */}
              <div style={{ display: "flex", gap: "4px" }}>
                {["#FFFF00", "#FFA500", "#800080"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setAnnotationColor(color)}
                    style={{
                      width: "36px",
                      height: "36px",
                      backgroundColor: color,
                      border:
                        annotationColor === color
                          ? "2px solid #3B82F6"
                          : `2px solid ${colors.border}`,
                      borderRadius: "4px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {annotationColor === color && (
                      <span
                        style={{
                          color: color === "#FFFF00" ? "black" : "white",
                          fontSize: "16px",
                        }}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Color Swatches Row 3 */}
              <div style={{ display: "flex", gap: "4px" }}>
                {["#000000", "#FFFFFF", "#FF00FF"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setAnnotationColor(color)}
                    style={{
                      width: "36px",
                      height: "36px",
                      backgroundColor: color,
                      border:
                        annotationColor === color
                          ? "2px solid #3B82F6"
                          : `2px solid ${colors.border}`,
                      borderRadius: "4px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {annotationColor === color && (
                      <span
                        style={{
                          color:
                            color === "#FFFFFF" || color === "#FFFF00"
                              ? "black"
                              : "white",
                          fontSize: "16px",
                        }}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div style={{ height: "1px", background: colors.border }} />

              {/* Fill/Stroke Toggle - for Rectangle & Circle */}
              {["rectangle", "circle"].includes(activeTool) && (
                <>
                  <div style={{ display: "flex", gap: "4px" }}>
                    <button
                      onClick={() => setAnnotationFilled(false)}
                      style={{
                        flex: 1,
                        padding: "8px",
                        cursor: "pointer",
                        backgroundColor: !annotationFilled
                          ? "#3B82F6"
                          : colors.buttonBg,
                        color: !annotationFilled
                          ? "white"
                          : colors.textSecondary,
                        border: "none",
                        borderRadius: "4px",
                        height: "36px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="3" y="3" width="10" height="10" rx="1" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setAnnotationFilled(true)}
                      style={{
                        flex: 1,
                        padding: "8px",
                        cursor: "pointer",
                        backgroundColor: annotationFilled
                          ? "#3B82F6"
                          : colors.buttonBg,
                        color: annotationFilled
                          ? "white"
                          : colors.textSecondary,
                        border: "none",
                        borderRadius: "4px",
                        height: "36px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <rect x="3" y="3" width="10" height="10" rx="1" />
                      </svg>
                    </button>
                  </div>
                  <div style={{ height: "1px", background: colors.border }} />
                </>
              )}

              {/* Stroke Width - for all except highlight and blur */}
              {!["highlight", "blur"].includes(activeTool) && (
                <div style={{ padding: "0 4px" }}>
                  <div
                    style={{
                      fontSize: "10px",
                      color: colors.textMuted,
                      marginBottom: "4px",
                      textAlign: "center",
                    }}
                  >
                    Width: {annotationStrokeWidth}px
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={annotationStrokeWidth}
                    onChange={(e) =>
                      setAnnotationStrokeWidth(Number(e.target.value))
                    }
                    style={{ width: "100%", cursor: "pointer" }}
                  />
                </div>
              )}

              {/* Opacity - for all except blur */}
              {activeTool !== "blur" && (
                <>
                  <div style={{ height: "1px", background: colors.border }} />
                  <div style={{ padding: "0 4px" }}>
                    <div
                      style={{
                        fontSize: "10px",
                        color: colors.textMuted,
                        marginBottom: "4px",
                        textAlign: "center",
                      }}
                    >
                      Opacity: {Math.round(annotationOpacity * 100)}%
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={annotationOpacity}
                      onChange={(e) =>
                        setAnnotationOpacity(Number(e.target.value))
                      }
                      style={{ width: "100%", cursor: "pointer" }}
                    />
                  </div>
                </>
              )}

              <div style={{ height: "1px", background: colors.border }} />

              {/* Undo Last & Clear All */}
              <div style={{ display: "flex", gap: "4px" }}>
                <TooltipButton
                  onClick={() => {
                    if (annotations.length > 0) {
                      const newAnnotations = annotations.slice(0, -1);
                      setAnnotations(newAnnotations);
                      setTimeout(() => {
                        saveToHistory({
                          imageUrl,
                          annotations: newAnnotations,
                          showBackground,
                          includeWindowChrome,
                          windowChromeTheme,
                          selectedTheme,
                        });
                      }, 0);
                    }
                  }}
                  disabled={annotations.length === 0}
                  tooltip={`Undo Last (${annotations.length})`}
                  tooltipPosition="left"
                  tooltipBg={colors.tooltipBg}
                  tooltipText={colors.textSecondary}
                  tooltipBorder={colors.border}
                  style={{
                    flex: 1,
                    padding: "8px",
                    cursor: annotations.length > 0 ? "pointer" : "not-allowed",
                    backgroundColor: colors.buttonBg,
                    color:
                      annotations.length > 0
                        ? colors.textSecondary
                        : colors.textMuted,
                    border: "none",
                    borderRadius: "4px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: annotations.length > 0 ? 1 : 0.5,
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M3 8h10M3 8l4-4M3 8l4 4" />
                  </svg>
                </TooltipButton>
                <TooltipButton
                  onClick={() => {
                    setAnnotations([]);
                    setTimeout(() => {
                      saveToHistory({
                        imageUrl,
                        annotations: [],
                        showBackground,
                        includeWindowChrome,
                        windowChromeTheme,
                        selectedTheme,
                      });
                    }, 0);
                  }}
                  disabled={annotations.length === 0}
                  tooltip="Clear All"
                  tooltipPosition="left"
                  tooltipBg={colors.tooltipBg}
                  tooltipText={colors.textSecondary}
                  tooltipBorder={colors.border}
                  style={{
                    flex: 1,
                    padding: "8px",
                    cursor: annotations.length > 0 ? "pointer" : "not-allowed",
                    backgroundColor:
                      annotations.length > 0 ? "#DC2626" : colors.buttonBg,
                    color: annotations.length > 0 ? "white" : colors.textMuted,
                    border: "none",
                    borderRadius: "4px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: annotations.length > 0 ? 1 : 0.5,
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                  </svg>
                </TooltipButton>
              </div>
            </div>
          )}

        {/* Zoom Controls - Bottom Right */}
        {imageUrl && (
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              background: colors.toolbar,
              borderRadius: "8px",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              border: `1px solid ${colors.border}`,
            }}
          >
            {/* Zoom Label */}
            <div
              style={{
                fontSize: "11px",
                fontWeight: 600,
                color: colors.textSecondary,
                textAlign: "center",
                paddingBottom: "4px",
                borderBottom: `1px solid ${colors.border}`,
              }}
            >
              Zoom
            </div>

            {/* Row 1: Zoom Out, Percentage, Zoom In */}
            <div style={{ display: "flex", gap: "4px" }}>
              <TooltipButton
                onClick={handleZoomOut}
                tooltip="Zoom Out (Ctrl + -)"
                tooltipPosition="left"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px",
                  fontSize: "16px",
                  cursor: "pointer",
                  backgroundColor: colors.buttonBg,
                  color: colors.textSecondary,
                  border: "none",
                  borderRadius: "4px",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                −
              </TooltipButton>

              <TooltipButton
                onClick={handleZoomReset}
                tooltip="Reset Zoom (Ctrl + 0)"
                tooltipPosition="left"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px",
                  fontSize: "11px",
                  cursor: "pointer",
                  backgroundColor: colors.buttonBg,
                  color: colors.textMuted,
                  border: "none",
                  borderRadius: "4px",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  userSelect: "none",
                }}
              >
                {Math.round(zoom * 100)}%
              </TooltipButton>

              <TooltipButton
                onClick={handleZoomIn}
                tooltip="Zoom In (Ctrl + =)"
                tooltipPosition="left"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px",
                  fontSize: "16px",
                  cursor: "pointer",
                  backgroundColor: colors.buttonBg,
                  color: colors.textSecondary,
                  border: "none",
                  borderRadius: "4px",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                +
              </TooltipButton>
            </div>

            {/* Divider */}
            <div style={{ height: "1px", background: colors.border }} />

            {/* Row 2: Fit to Screen */}
            <div
              style={{ display: "flex", gap: "4px", justifyContent: "center" }}
            >
              <TooltipButton
                onClick={handleZoomFit}
                tooltip="Fit to Screen"
                tooltipPosition="left"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  backgroundColor: colors.buttonBg,
                  color: colors.textSecondary,
                  border: "none",
                  borderRadius: "4px",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z" />
                </svg>
              </TooltipButton>
            </div>
          </div>
        )}

        {/* Premium Feature Notification - Above Preview */}
        {!hasProPlan && usedPremiumFeatures && (
          <div
            onClick={() => setShowUpgradePrompt(true)}
            style={{
              position: "absolute",
              bottom: "152px", // Above preview card
              left: "20px",
              background: "#FFA000",
              color: "#000",
              padding: "10px 14px",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
              border: "1px solid #FF8F00",
              zIndex: 1001,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 160, 0, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.3)";
            }}
          >
            <SparkleIcon size={14} />
            <span>Premium Feature Used</span>
          </div>
        )}

        {/* Remove Watermark Button - Always visible for free users */}
        {!hasProPlan && imageUrl && (
          <div
            onClick={() => {
              setUsedPremiumFeatures(true);
              setShowUpgradePrompt(true);
            }}
            style={{
              position: "absolute",
              bottom: usedPremiumFeatures ? "204px" : "152px", // Above premium notification (152 + 42 + 10) or above preview
              left: "20px",
              background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
              color: "#FFF",
              padding: "10px 14px",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
              border: "1px solid #4F46E5",
              zIndex: 1001,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(99, 102, 241, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.3)";
            }}
          >
            <SparkleIcon size={14} />
            <span>Remove Watermark</span>
          </div>
        )}

        {/* Minimap Preview - Bottom Left (only when zoomed/panned) */}
        {imageUrl && (zoom !== 1 || pan.x !== 0 || pan.y !== 0) && (
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "20px",
              width: "180px",
              height: "120px",
              background: colors.toolbar,
              borderRadius: "8px",
              padding: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              border: `1px solid ${colors.border}`,
              overflow: "hidden",
            }}
          >
            {/* Minimap content */}
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              {/* Scaled down image */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: showBackground
                    ? getThemeBackground()
                    : colors.buttonBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {canvasRef.current && (
                  <img
                    src={canvasRef.current.toDataURL()}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      opacity: 0.8,
                    }}
                  />
                )}
              </div>

              {/* Viewport indicator */}
              <div
                style={{
                  position: "absolute",
                  border: "2px solid #3B82F6",
                  borderRadius: "2px",
                  pointerEvents: "none",
                  top: `${50 - pan.y / (zoom * 10) - 50 / zoom}%`,
                  left: `${50 - pan.x / (zoom * 10) - 50 / zoom}%`,
                  width: `${100 / zoom}%`,
                  height: `${100 / zoom}%`,
                  maxWidth: "100%",
                  maxHeight: "100%",
                  background: "rgba(59, 130, 246, 0.1)",
                }}
              />
            </div>

            {/* Zoom level label */}
            <div
              style={{
                position: "absolute",
                bottom: "12px",
                right: "12px",
                background: "rgba(0, 0, 0, 0.6)",
                color: "white",
                padding: "2px 6px",
                borderRadius: "4px",
                fontSize: "10px",
                fontWeight: 500,
              }}
            >
              {Math.round(zoom * 100)}%
            </div>
          </div>
        )}
      </div>

      {/* Tool Notification Toast */}
      {showToolNotification && (
        <div
          style={{
            position: "fixed",
            top: "80px",
            left: "50%",
            transform: "translateX(-50%)",
            background: colors.toolbar,
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 500,
            color: colors.textSecondary,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            border: `1px solid ${colors.border}`,
            zIndex: 10000,
            animation: "slideDown 0.3s ease-out",
          }}
        >
          {toolNotification}
        </div>
      )}

      {/* CSS Animation */}
      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateX(-50%) translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
          }

          @keyframes shimmer {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.7;
              transform: scale(1.1);
            }
          }
        `}
      </style>
    </div>
  );
}
