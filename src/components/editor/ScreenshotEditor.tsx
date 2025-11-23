"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// Theme gradients
const THEMES = {
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
} as const;

type ThemeType = keyof typeof THEMES;

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
  type: "rectangle" | "circle" | "arrow" | "line" | "highlight" | "blur" | "freehand";
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
        return { ...base, bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" };
      case "bottom":
        return { ...base, top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" };
      case "left":
        return { ...base, right: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" };
      case "right":
        return { ...base, left: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" };
      default:
        return { ...base, top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" };
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
      {showTooltip && (
        <div style={getTooltipStyle()}>
          {tooltip}
        </div>
      )}
    </button>
  );
}

// Theme Selector Component
function ThemeSelector({
  selectedTheme,
  onThemeSelect,
  onClose,
  editorTheme,
}: {
  selectedTheme: ThemeType;
  onThemeSelect: (theme: ThemeType) => void;
  onClose: () => void;
  editorTheme: "light" | "dark";
}) {
  const [hoveredTheme, setHoveredTheme] = useState<ThemeType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const colors = {
    background: editorTheme === "dark" ? "#1E1E1E" : "#FFFFFF",
    border: editorTheme === "dark" ? "#2D2D2D" : "#E0E0E0",
    text: editorTheme === "dark" ? "#E0E0E0" : "#2D2D2D",
    textMuted: editorTheme === "dark" ? "#A0A0A0" : "#6B7280",
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const themeNames: Record<ThemeType, string> = {
    midnight: "Midnight", sunset: "Sunset", ocean: "Ocean", forest: "Forest",
    lavender: "Lavender", golden: "Golden", coral: "Coral", sky: "Sky",
    slate: "Slate", rose: "Rose", pearl: "Pearl", carbon: "Carbon",
    aurora: "Aurora", crimson: "Crimson", emerald: "Emerald", sapphire: "Sapphire",
    amethyst: "Amethyst", obsidian: "Obsidian", graphite: "Graphite", onyx: "Onyx",
    sunshine: "Sunshine", lime: "Lime", fuchsia: "Fuchsia", bubblegum: "Bubblegum",
    cream: "Cream", tropical: "Tropical", peacock: "Peacock", berry: "Berry",
    citrus: "Citrus", candy: "Candy", mango: "Mango", unicorn: "Unicorn",
    chocolate: "Chocolate", caramel: "Caramel", bronze: "Bronze",
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: "60px",
        left: "20px",
        background: colors.background,
        borderRadius: "8px",
        padding: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
        border: `1px solid ${colors.border}`,
        zIndex: 10000,
        minWidth: "340px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <span style={{ color: colors.text, fontSize: "14px", fontWeight: 500 }}>Select Theme</span>
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
          }}
        >
          ×
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px", marginBottom: "12px" }}>
        {(Object.keys(THEMES) as ThemeType[]).map((themeKey) => {
          const isSelected = selectedTheme === themeKey;
          const isHovered = hoveredTheme === themeKey;

          return (
            <div key={themeKey} style={{ position: "relative" }}>
              <button
                onClick={() => {
                  onThemeSelect(themeKey);
                  onClose();
                }}
                onMouseEnter={() => setHoveredTheme(themeKey)}
                onMouseLeave={() => setHoveredTheme(null)}
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  padding: "0",
                  background: THEMES[themeKey],
                  border: isSelected ? "2px solid #3B82F6" : "2px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  position: "relative",
                  transform: isHovered ? "scale(1.05)" : "scale(1)",
                }}
              >
                {isSelected && (
                  <div style={{
                    position: "absolute",
                    top: "4px",
                    right: "4px",
                    width: "16px",
                    height: "16px",
                    background: "#3B82F6",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2.5">
                      <path d="M3 8l3 3 7-7" />
                    </svg>
                  </div>
                )}
              </button>
              {isHovered && (
                <div style={{
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
                }}>
                  {themeNames[themeKey]}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ScreenshotEditor() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTool, setActiveTool] = useState<Tool>("select");
  const [cropArea, setCropArea] = useState<CropArea | null>(null);
  const [cropMode, setCropMode] = useState<"freeform" | "border">("freeform");
  const [borderCrop, setBorderCrop] = useState<{ top: number; bottom: number; left: number; right: number } | null>(null);
  const [borderCropDragEdge, setBorderCropDragEdge] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Zoom and pan state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [spacePressed, setSpacePressed] = useState(false);
  const [panModeEnabled, setPanModeEnabled] = useState(false);

  // Visual settings
  const [includeWindowChrome, setIncludeWindowChrome] = useState(true);
  const [windowChromeTheme, setWindowChromeTheme] = useState<"light" | "dark">("light");
  const [showBackground, setShowBackground] = useState(true);
  const [editorTheme, setEditorTheme] = useState<"light" | "dark">("dark");
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>("sunset");
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  // Width and padding
  const [cardWidth, setCardWidth] = useState(50);
  const [cardPadding, setCardPadding] = useState(6.25);
  const [showWidthControl, setShowWidthControl] = useState(false);
  const [showPaddingControl, setShowPaddingControl] = useState(false);

  // Copy/feedback state
  const [isCopied, setIsCopied] = useState(false);

  // Contact popup state
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [isEmailCopied, setIsEmailCopied] = useState(false);

  // History
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Annotations
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [currentAnnotation, setCurrentAnnotation] = useState<Annotation | null>(null);
  const [isDrawingAnnotation, setIsDrawingAnnotation] = useState(false);
  const [annotationColor, setAnnotationColor] = useState("#FF0000");
  const [annotationOpacity, setAnnotationOpacity] = useState(0.5);
  const [annotationStrokeWidth, setAnnotationStrokeWidth] = useState(3);
  const [annotationFilled, setAnnotationFilled] = useState(false);

  // Drag and drop
  const [isDragOver, setIsDragOver] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const annotationCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const windowChromeRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) handleImageLoad(result);
    };
    reader.readAsDataURL(file);
  }, [handleImageLoad]);

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

  // Handle drag and drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !spacePressed) {
        e.preventDefault();
        setSpacePressed(true);
      }
      if (e.key === "0" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setZoom(1);
        setPan({ x: 0, y: 0 });
      }
      if (e.key === "=" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setZoom(prev => Math.min(prev * 1.2, 10));
      }
      if (e.key === "-" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setZoom(prev => Math.max(prev / 1.2, 0.1));
      }
      if (e.key === "z" && (e.metaKey || e.ctrlKey) && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }
      if ((e.key === "z" && (e.metaKey || e.ctrlKey) && e.shiftKey) || (e.key === "y" && (e.metaKey || e.ctrlKey))) {
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

    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
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
      ctx.fillRect(0, bottom, overlayCanvas.width, overlayCanvas.height - bottom);
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
      ctx.fillRect(left - cornerThickness/2, top - cornerThickness/2, cornerLength, cornerThickness);
      ctx.fillRect(left - cornerThickness/2, top - cornerThickness/2, cornerThickness, cornerLength);

      // Top-right corner
      ctx.fillRect(right - cornerLength + cornerThickness/2, top - cornerThickness/2, cornerLength, cornerThickness);
      ctx.fillRect(right - cornerThickness/2, top - cornerThickness/2, cornerThickness, cornerLength);

      // Bottom-left corner
      ctx.fillRect(left - cornerThickness/2, bottom - cornerThickness/2, cornerLength, cornerThickness);
      ctx.fillRect(left - cornerThickness/2, bottom - cornerLength + cornerThickness/2, cornerThickness, cornerLength);

      // Bottom-right corner
      ctx.fillRect(right - cornerLength + cornerThickness/2, bottom - cornerThickness/2, cornerLength, cornerThickness);
      ctx.fillRect(right - cornerThickness/2, bottom - cornerLength + cornerThickness/2, cornerThickness, cornerLength);

      // Draw edge handles (small rectangles at edge midpoints)
      const edgeHandleWidth = 24;
      const edgeHandleHeight = 6;

      // Top edge handle
      ctx.fillRect((left + right) / 2 - edgeHandleWidth / 2, top - edgeHandleHeight / 2, edgeHandleWidth, edgeHandleHeight);
      // Bottom edge handle
      ctx.fillRect((left + right) / 2 - edgeHandleWidth / 2, bottom - edgeHandleHeight / 2, edgeHandleWidth, edgeHandleHeight);
      // Left edge handle
      ctx.fillRect(left - edgeHandleHeight / 2, (top + bottom) / 2 - edgeHandleWidth / 2, edgeHandleHeight, edgeHandleWidth);
      // Right edge handle
      ctx.fillRect(right - edgeHandleHeight / 2, (top + bottom) / 2 - edgeHandleWidth / 2, edgeHandleHeight, edgeHandleWidth);

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
      ctx.fillText(`${Math.round(width)} × ${Math.round(height)}`, left + width / 2, bottom + 20);
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

    [...annotations, currentAnnotation].filter(Boolean).forEach((annotation) => {
      if (!annotation) return;
      drawSingleAnnotation(ctx, annotation, mainCanvas);
    });
  }, [annotations, currentAnnotation]);

  const drawSingleAnnotation = (ctx: CanvasRenderingContext2D, annotation: Annotation, mainCanvas: HTMLCanvasElement) => {
    const { type, startX, startY, endX, endY, color, opacity, strokeWidth, filled } = annotation;

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
        ctx.lineTo(endX - arrowLength * Math.cos(angle - arrowAngle), endY - arrowLength * Math.sin(angle - arrowAngle));
        ctx.moveTo(endX, endY);
        ctx.lineTo(endX - arrowLength * Math.cos(angle + arrowAngle), endY - arrowLength * Math.sin(angle + arrowAngle));
        ctx.stroke();
        break;
      case "highlight":
        ctx.globalAlpha = opacity * 0.3;
        ctx.fillRect(Math.min(startX, endX), Math.min(startY, endY), Math.abs(endX - startX), Math.abs(endY - startY));
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
              const safeHeight = Math.min(blurHeight, mainCanvas.height - blurY);
              if (safeWidth > 0 && safeHeight > 0) {
                const imageData = mainCtx.getImageData(blurX, blurY, safeWidth, safeHeight);
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
        if (annotation.points && annotation.points.length > 1) {
          ctx.beginPath();
          ctx.moveTo(annotation.points[0].x, annotation.points[0].y);
          for (let i = 1; i < annotation.points.length; i++) {
            ctx.lineTo(annotation.points[i].x, annotation.points[i].y);
          }
          ctx.stroke();
        }
        break;
    }
    ctx.restore();
  };

  const applyPixelate = (imageData: ImageData, pixelSize: number): ImageData => {
    const { width, height, data } = imageData;
    const pixelated = new ImageData(width, height);

    for (let y = 0; y < height; y += pixelSize) {
      for (let x = 0; x < width; x += pixelSize) {
        let r = 0, g = 0, b = 0, a = 0, count = 0;
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
  const getCanvasCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (spacePressed || e.button === 1 || panModeEnabled) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      return;
    }

    const { x, y } = getCanvasCoordinates(e);
    const annotationTools: Tool[] = ["rectangle", "circle", "arrow", "line", "highlight", "blur", "freehand"];

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
        } else if (Math.abs(x - right) < handleSize && Math.abs(y - top) < handleSize) {
          edge = "topRight";
        } else if (Math.abs(x - left) < handleSize && Math.abs(y - bottom) < handleSize) {
          edge = "bottomLeft";
        } else if (Math.abs(x - right) < handleSize && Math.abs(y - bottom) < handleSize) {
          edge = "bottomRight";
        }
        // Check edge handles
        else if (Math.abs(x - (left + right) / 2) < handleSize && Math.abs(y - top) < handleSize) {
          edge = "top";
        } else if (Math.abs(x - (left + right) / 2) < handleSize && Math.abs(y - bottom) < handleSize) {
          edge = "bottom";
        } else if (Math.abs(x - left) < handleSize && Math.abs(y - (top + bottom) / 2) < handleSize) {
          edge = "left";
        } else if (Math.abs(x - right) < handleSize && Math.abs(y - (top + bottom) / 2) < handleSize) {
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

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isPanning) {
      setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
      return;
    }

    const { x, y } = getCanvasCoordinates(e);

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
            newBorderCrop.top = Math.max(0, Math.min(y, borderCrop.bottom - minSize));
            break;
          case "bottom":
            newBorderCrop.bottom = Math.min(canvas.height, Math.max(y, borderCrop.top + minSize));
            break;
          case "left":
            newBorderCrop.left = Math.max(0, Math.min(x, borderCrop.right - minSize));
            break;
          case "right":
            newBorderCrop.right = Math.min(canvas.width, Math.max(x, borderCrop.left + minSize));
            break;
          case "topLeft":
            newBorderCrop.top = Math.max(0, Math.min(y, borderCrop.bottom - minSize));
            newBorderCrop.left = Math.max(0, Math.min(x, borderCrop.right - minSize));
            break;
          case "topRight":
            newBorderCrop.top = Math.max(0, Math.min(y, borderCrop.bottom - minSize));
            newBorderCrop.right = Math.min(canvas.width, Math.max(x, borderCrop.left + minSize));
            break;
          case "bottomLeft":
            newBorderCrop.bottom = Math.min(canvas.height, Math.max(y, borderCrop.top + minSize));
            newBorderCrop.left = Math.max(0, Math.min(x, borderCrop.right - minSize));
            break;
          case "bottomRight":
            newBorderCrop.bottom = Math.min(canvas.height, Math.max(y, borderCrop.top + minSize));
            newBorderCrop.right = Math.min(canvas.width, Math.max(x, borderCrop.left + minSize));
            break;
        }

        setBorderCrop(newBorderCrop);
      }
    }
  };

  const handleMouseUp = () => {
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
    if (spacePressed) {
      setPan({ x: pan.x - e.deltaX, y: pan.y - e.deltaY });
      return;
    }
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(Math.min(Math.max(zoom * delta, 0.1), 10));
  };

  // Track if we're restoring from history (to avoid saving during restore)
  const isRestoringRef = useRef(false);

  // History management - save a new state to history
  const saveToHistory = useCallback((state: {
    imageUrl: string;
    annotations: Annotation[];
    showBackground: boolean;
    includeWindowChrome: boolean;
    windowChromeTheme: "light" | "dark";
    selectedTheme: ThemeType;
  }) => {
    if (!state.imageUrl || isRestoringRef.current) return;

    setHistory(prevHistory => {
      setHistoryIndex(prevIndex => {
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
  }, [historyIndex]);

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
  }, [imageUrl, annotations, showBackground, includeWindowChrome, windowChromeTheme, selectedTheme, saveToHistory]);

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
    setTimeout(() => { isRestoringRef.current = false; }, 0);
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
    setTimeout(() => { isRestoringRef.current = false; }, 0);
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
    }
  };

  // Download and copy
  const handleDownload = async () => {
    if (showBackground) {
      const backgroundContainer = document.querySelector('[data-screenshot-with-background="true"]') as HTMLElement;
      if (!backgroundContainer) return;

      const currentTransform = backgroundContainer.style.transform;
      backgroundContainer.style.transform = "none";
      await new Promise((resolve) => setTimeout(resolve, 100));

      const html2canvas = (await import("html2canvas")).default;
      const capturedCanvas = await html2canvas(backgroundContainer, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      });

      backgroundContainer.style.transform = currentTransform;

      capturedCanvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `screenshot-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
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
    }, "image/png");
  };

  const handleCopy = async () => {
    try {
      let canvas: HTMLCanvasElement | null = null;

      if (showBackground) {
        const backgroundContainer = document.querySelector('[data-screenshot-with-background="true"]') as HTMLElement;
        if (!backgroundContainer) return;

        const currentTransform = backgroundContainer.style.transform;
        backgroundContainer.style.transform = "none";
        await new Promise((resolve) => setTimeout(resolve, 150));

        const html2canvas = (await import("html2canvas")).default;
        canvas = await html2canvas(backgroundContainer, {
          backgroundColor: null,
          scale: 2,
          useCORS: true,
        });
        backgroundContainer.style.transform = currentTransform;
      } else {
        const mainCanvas = canvasRef.current;
        const annotationCanvas = annotationCanvasRef.current;
        if (!mainCanvas) return;

        canvas = document.createElement("canvas");
        canvas.width = mainCanvas.width;
        canvas.height = mainCanvas.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(mainCanvas, 0, 0);
        if (annotationCanvas) ctx.drawImage(annotationCanvas, 0, 0);
      }

      if (!canvas) return;

      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
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
  }, [isLoaded, cropArea, activeTool, annotations, currentAnnotation, drawImage, drawCropOverlay, drawAnnotations, showBackground, borderCrop, cropMode]);

  useEffect(() => {
    if (isLoaded && history.length === 0) {
      saveCurrentState();
    }
  }, [isLoaded]);

  const handleImageLoadComplete = () => {
    setIsLoaded(true);
    drawImage();
    // Fit to screen
    const container = containerRef.current;
    const image = imageRef.current;
    if (container && image) {
      const containerWidth = container.clientWidth - 40;
      const containerHeight = container.clientHeight - 40;
      const scaleX = containerWidth / image.naturalWidth;
      const scaleY = containerHeight / image.naturalHeight;
      setZoom(Math.min(scaleX, scaleY, 1));
    }
    if (history.length === 0) saveCurrentState();
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
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
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
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginRight: "auto" }}>
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
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
            <span style={{ fontSize: "16px", fontWeight: 600, color: colors.textSecondary }}>
              ILoveSnapshots
            </span>
          </a>

          <div style={{ width: "1px", height: "24px", background: colors.border, margin: "0 4px" }} />

          <h2 style={{ margin: 0, fontSize: "14px", fontWeight: 500, color: colors.textMuted }}>
            Editor
          </h2>

          {/* Editor Theme Toggle */}
          <TooltipButton
            onClick={() => setEditorTheme(editorTheme === "dark" ? "light" : "dark")}
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                onClick={() => { setActiveTool("select"); setPanModeEnabled(false); }}
                tooltip="Select (V)"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  backgroundColor: activeTool === "select" && !panModeEnabled ? "#3B82F6" : colors.buttonBg,
                  color: activeTool === "select" && !panModeEnabled ? "white" : colors.textMuted,
                  border: "none",
                  borderRadius: "6px",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 2l12 5-5 1-1 5z" />
                </svg>
              </TooltipButton>

              {/* Pan Tool */}
              <TooltipButton
                onClick={() => { setPanModeEnabled(!panModeEnabled); if (!panModeEnabled) setActiveTool("select"); }}
                tooltip="Pan (Space)"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  backgroundColor: panModeEnabled ? "#3B82F6" : colors.buttonBg,
                  color: panModeEnabled ? "white" : colors.textMuted,
                  border: "none",
                  borderRadius: "6px",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 2v3M5 8H2M14 8h-3M8 11v3M4.5 4.5l2 2M11.5 4.5l-2 2M4.5 11.5l2-2M11.5 11.5l-2-2" />
                </svg>
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
                  }
                }}
                tooltip="Crop (C)"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  backgroundColor: activeTool === "crop" ? "#3B82F6" : colors.buttonBg,
                  color: activeTool === "crop" ? "white" : colors.textMuted,
                  border: "none",
                  borderRadius: "6px",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M11 2v3h3v1h-3v4h-1V6H6v4H5V6H2V5h3V2h1v3h4V2h1z" />
                </svg>
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
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="2" y="2" width="12" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <rect x="4" y="4" width="8" height="8" rx="1" fill="currentColor" opacity="0.5" />
              </svg>
            </TooltipButton>

            {/* Theme Selector - only when background enabled */}
            {showBackground && (
              <TooltipButton
                onClick={() => setShowThemeSelector(!showThemeSelector)}
                tooltip="Color Theme"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px 12px",
                  cursor: "pointer",
                  backgroundColor: showThemeSelector ? "#3B82F6" : colors.buttonBg,
                  color: showThemeSelector ? "white" : colors.textSecondary,
                  border: "none",
                  borderRadius: "6px",
                  marginRight: "8px",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <circle cx="8" cy="4" r="2" />
                  <circle cx="13" cy="8" r="2" />
                  <circle cx="11" cy="13" r="2" />
                  <circle cx="5" cy="13" r="2" />
                  <circle cx="3" cy="8" r="2" />
                </svg>
              </TooltipButton>
            )}

            {/* Width Control - only when background enabled */}
            {showBackground && (
              <div style={{ position: "relative", marginRight: "8px" }}>
                <TooltipButton
                  onClick={() => setShowWidthControl(!showWidthControl)}
                  tooltip={`Width: ${Math.round(calculateCardWidth(cardWidth))}px`}
                  tooltipBg={colors.tooltipBg}
                  tooltipText={colors.textSecondary}
                  tooltipBorder={colors.border}
                  style={{
                    padding: "8px 12px",
                    cursor: "pointer",
                    backgroundColor: showWidthControl ? "#3B82F6" : colors.buttonBg,
                    color: showWidthControl ? "white" : colors.textMuted,
                    border: "none",
                    borderRadius: "6px",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 8h12M2 8l2-2M2 8l2 2M14 8l-2-2M14 8l-2 2" />
                  </svg>
                </TooltipButton>
                {showWidthControl && (
                  <div style={{
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
                  }}>
                    <div style={{ fontSize: "11px", color: colors.textMuted, marginBottom: "8px", fontWeight: 500 }}>Card Width</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={cardWidth}
                        onChange={(e) => setCardWidth(Number(e.target.value))}
                        style={{ flex: 1 }}
                      />
                      <span style={{ fontSize: "11px", color: colors.textSecondary, fontWeight: 500 }}>{Math.round(calculateCardWidth(cardWidth))}px</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Padding Control - only when background enabled */}
            {showBackground && (
              <div style={{ position: "relative", marginRight: "8px" }}>
                <TooltipButton
                  onClick={() => setShowPaddingControl(!showPaddingControl)}
                  tooltip={`Padding: ${Math.round(calculateCardPadding(cardPadding))}px`}
                  tooltipBg={colors.tooltipBg}
                  tooltipText={colors.textSecondary}
                  tooltipBorder={colors.border}
                  style={{
                    padding: "8px 12px",
                    cursor: "pointer",
                    backgroundColor: showPaddingControl ? "#3B82F6" : colors.buttonBg,
                    color: showPaddingControl ? "white" : colors.textMuted,
                    border: "none",
                    borderRadius: "6px",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <rect x="2" y="2" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
                    <rect x="5" y="5" width="6" height="6" fill="currentColor" />
                  </svg>
                </TooltipButton>
                {showPaddingControl && (
                  <div style={{
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
                  }}>
                    <div style={{ fontSize: "11px", color: colors.textMuted, marginBottom: "8px", fontWeight: 500 }}>Padding Size</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={cardPadding}
                        onChange={(e) => setCardPadding(Number(e.target.value))}
                        style={{ flex: 1 }}
                      />
                      <span style={{ fontSize: "11px", color: colors.textSecondary, fontWeight: 500 }}>{Math.round(calculateCardPadding(cardPadding))}px</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Undo/Redo - pushes action buttons to right */}
            <div style={{ display: "flex", gap: "4px", marginRight: "auto" }}>
              <TooltipButton
                onClick={handleUndo}
                disabled={!canUndo}
                tooltip="Undo (Ctrl+Z)"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px 12px",
                  cursor: canUndo ? "pointer" : "not-allowed",
                  backgroundColor: colors.buttonBg,
                  color: canUndo ? colors.textSecondary : colors.textMuted,
                  border: "none",
                  borderRadius: "6px",
                  opacity: canUndo ? 1 : 0.5,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M3 8h10M8 3l-5 5 5 5" />
                </svg>
              </TooltipButton>

              <TooltipButton
                onClick={handleRedo}
                disabled={!canRedo}
                tooltip="Redo (Ctrl+Shift+Z)"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px 12px",
                  cursor: canRedo ? "pointer" : "not-allowed",
                  backgroundColor: colors.buttonBg,
                  color: canRedo ? colors.textSecondary : colors.textMuted,
                  border: "none",
                  borderRadius: "6px",
                  opacity: canRedo ? 1 : 0.5,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M3 8h10M8 3l5 5-5 5" />
                </svg>
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
                  onClick={() => { setCropArea(null); setBorderCrop(null); setActiveTool("select"); }}
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
              <div style={{ display: "flex", gap: "8px" }}>
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
                  tooltip={includeWindowChrome ? "Hide Window Chrome" : "Show Window Chrome"}
                  tooltipBg={colors.tooltipBg}
                  tooltipText={colors.textSecondary}
                  tooltipBorder={colors.border}
                  style={{
                    padding: "8px 12px",
                    cursor: "pointer",
                    backgroundColor: includeWindowChrome ? "#3B82F6" : colors.buttonBg,
                    color: includeWindowChrome ? "white" : colors.textMuted,
                    border: "none",
                    borderRadius: "6px",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="3" width="12" height="10" rx="2" />
                    <line x1="2" y1="6" x2="14" y2="6" />
                    <circle cx="4" cy="4.5" r="0.5" fill="currentColor" />
                    <circle cx="6" cy="4.5" r="0.5" fill="currentColor" />
                    <circle cx="8" cy="4.5" r="0.5" fill="currentColor" />
                  </svg>
                </TooltipButton>

                {/* Theme Toggle */}
                {includeWindowChrome && (
                  <TooltipButton
                    onClick={() => {
                      const newWindowChromeTheme = windowChromeTheme === "light" ? "dark" : "light";
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
                    tooltip={windowChromeTheme === "light" ? "Dark Chrome" : "Light Chrome"}
                    tooltipBg={colors.tooltipBg}
                    tooltipText={colors.textSecondary}
                    tooltipBorder={colors.border}
                    style={{
                      padding: "8px 12px",
                      cursor: "pointer",
                      backgroundColor: colors.buttonBg,
                      color: colors.textSecondary,
                      border: "none",
                      borderRadius: "6px",
                    }}
                  >
                    {windowChromeTheme === "light" ? (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <circle cx="8" cy="8" r="3" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 1C4.134 1 1 4.134 1 8s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7z" />
                      </svg>
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
      </div>

      {/* Theme Selector Popup */}
      {showThemeSelector && (
        <ThemeSelector
          selectedTheme={selectedTheme}
          onThemeSelect={(newTheme) => {
            setSelectedTheme(newTheme);
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
              <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
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
                <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 600, color: colors.textSecondary }}>
                  Get in Touch
                </h3>
                <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: colors.textMuted }}>
                  We&apos;d love to hear from you
                </p>
              </div>
            </div>

            {/* Message */}
            <p style={{ fontSize: "14px", lineHeight: "1.6", color: colors.textSecondary, marginBottom: "24px" }}>
              Please contact us for anything like feature requests, doubts, bugs, issues, or any feedback you&apos;d like to share. We&apos;re here to help!
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
                <div style={{ fontSize: "11px", color: colors.textMuted, marginBottom: "4px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Email Address
                </div>
                <div style={{ fontSize: "15px", color: "#3B82F6", fontWeight: 500 }}>
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
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
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

      {/* Watch Demo and Contact Buttons - Below Toolbar on Left */}
      <div
        style={{
          position: "absolute",
          top: "68px",
          left: "20px",
          zIndex: 1001,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
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
              background: isDragOver ? "rgba(59, 130, 246, 0.1)" : colors.toolbar,
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
            <h3 style={{ margin: "0 0 8px 0", color: colors.text, fontSize: "18px" }}>
              Drop an image here or click to upload
            </h3>
            <p style={{ margin: "0 0 16px 0", color: colors.textMuted, fontSize: "14px", textAlign: "center" }}>
              You can also paste an image from clipboard (Ctrl+V)
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <span style={{ padding: "6px 12px", background: colors.buttonBg, borderRadius: "6px", fontSize: "12px", color: colors.textSecondary }}>
                PNG
              </span>
              <span style={{ padding: "6px 12px", background: colors.buttonBg, borderRadius: "6px", fontSize: "12px", color: colors.textSecondary }}>
                JPG
              </span>
              <span style={{ padding: "6px 12px", background: colors.buttonBg, borderRadius: "6px", fontSize: "12px", color: colors.textSecondary }}>
                GIF
              </span>
              <span style={{ padding: "6px 12px", background: colors.buttonBg, borderRadius: "6px", fontSize: "12px", color: colors.textSecondary }}>
                WebP
              </span>
            </div>
          </div>
        ) : showBackground ? (
          /* Image with Background */
          <div
            data-screenshot-with-background="true"
            style={{
              transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
              transformOrigin: "center center",
              transition: isPanning ? "none" : "transform 0.1s ease-out",
              background: THEMES[selectedTheme],
              padding: `${calculateCardPadding(cardPadding)}px`,
              borderRadius: "0",
              display: "inline-block",
              width: `${calculateCardWidth(cardWidth)}px`,
            }}
          >
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
                  background: windowChromeTheme === "light" ? "#ffffff" : "#1a1a1a",
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
                      background: windowChromeTheme === "light"
                        ? "linear-gradient(180deg, #e8e8e8 0%, #d8d8d8 100%)"
                        : "linear-gradient(180deg, #3d3d3d 0%, #2d2d2d 100%)",
                      borderBottom: windowChromeTheme === "light" ? "1px solid #c0c0c0" : "1px solid #1a1a1a",
                      display: "flex",
                      alignItems: "center",
                      padding: "0 16px",
                    }}
                  >
                    <div style={{ display: "flex", gap: "8px" }}>
                      <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "linear-gradient(135deg, #FF5F57 0%, #FF4040 100%)" }} />
                      <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "linear-gradient(135deg, #FFBD2E 0%, #FFA500 100%)" }} />
                      <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "linear-gradient(135deg, #28C840 0%, #20A030 100%)" }} />
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
            ref={windowChromeRef}
            style={{
              transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
              transformOrigin: "center center",
              transition: isPanning ? "none" : "transform 0.1s ease-out",
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
                  background: windowChromeTheme === "light"
                    ? "linear-gradient(180deg, #e8e8e8 0%, #d8d8d8 100%)"
                    : "linear-gradient(180deg, #3d3d3d 0%, #2d2d2d 100%)",
                  borderBottom: windowChromeTheme === "light" ? "1px solid #c0c0c0" : "1px solid #1a1a1a",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 16px",
                }}
              >
                <div style={{ display: "flex", gap: "8px" }}>
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "linear-gradient(135deg, #FF5F57 0%, #FF4040 100%)" }} />
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "linear-gradient(135deg, #FFBD2E 0%, #FFA500 100%)" }} />
                  <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "linear-gradient(135deg, #28C840 0%, #20A030 100%)" }} />
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
            {/* Row 1: Line, Freehand, Arrow */}
            <div style={{ display: "flex", gap: "4px" }}>
              <TooltipButton
                onClick={() => { setActiveTool("line"); setPanModeEnabled(false); }}
                tooltip="Line (L)"
                tooltipPosition="left"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  backgroundColor: activeTool === "line" ? "#3B82F6" : colors.buttonBg,
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
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="2" y1="14" x2="14" y2="2" />
                </svg>
              </TooltipButton>

              <TooltipButton
                onClick={() => { setActiveTool("freehand"); setPanModeEnabled(false); }}
                tooltip="Freehand (F)"
                tooltipPosition="left"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  backgroundColor: activeTool === "freehand" ? "#3B82F6" : colors.buttonBg,
                  color: activeTool === "freehand" ? "white" : colors.textSecondary,
                  border: "none",
                  borderRadius: "4px",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 14 Q4 10, 6 8 T10 4 L14 2" />
                </svg>
              </TooltipButton>

              <TooltipButton
                onClick={() => { setActiveTool("arrow"); setPanModeEnabled(false); }}
                tooltip="Arrow (A)"
                tooltipPosition="left"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  backgroundColor: activeTool === "arrow" ? "#3B82F6" : colors.buttonBg,
                  color: activeTool === "arrow" ? "white" : colors.textSecondary,
                  border: "none",
                  borderRadius: "4px",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 14 L14 2 M14 2 L10 2 M14 2 L14 6" />
                </svg>
              </TooltipButton>
            </div>

            {/* Row 2: Circle, Rectangle, Blur */}
            <div style={{ display: "flex", gap: "4px" }}>
              <TooltipButton
                onClick={() => { setActiveTool("circle"); setPanModeEnabled(false); }}
                tooltip="Circle (C)"
                tooltipPosition="left"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  backgroundColor: activeTool === "circle" ? "#3B82F6" : colors.buttonBg,
                  color: activeTool === "circle" ? "white" : colors.textSecondary,
                  border: "none",
                  borderRadius: "4px",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="8" r="5" />
                </svg>
              </TooltipButton>

              <TooltipButton
                onClick={() => { setActiveTool("rectangle"); setPanModeEnabled(false); }}
                tooltip="Rectangle (R)"
                tooltipPosition="left"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  backgroundColor: activeTool === "rectangle" ? "#3B82F6" : colors.buttonBg,
                  color: activeTool === "rectangle" ? "white" : colors.textSecondary,
                  border: "none",
                  borderRadius: "4px",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="12" height="10" rx="1" />
                </svg>
              </TooltipButton>

              <TooltipButton
                onClick={() => { setActiveTool("blur"); setPanModeEnabled(false); }}
                tooltip="Blur (B)"
                tooltipPosition="left"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  backgroundColor: activeTool === "blur" ? "#3B82F6" : colors.buttonBg,
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
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
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
                onClick={() => { setActiveTool("highlight"); setPanModeEnabled(false); }}
                tooltip="Highlight (H)"
                tooltipPosition="left"
                tooltipBg={colors.tooltipBg}
                tooltipText={colors.textSecondary}
                tooltipBorder={colors.border}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  backgroundColor: activeTool === "highlight" ? "#3B82F6" : colors.buttonBg,
                  color: activeTool === "highlight" ? "white" : colors.textSecondary,
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
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" opacity="0.5">
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
                  backgroundColor: cropMode === "freeform" ? "#3B82F6" : colors.buttonBg,
                  color: cropMode === "freeform" ? "white" : colors.textSecondary,
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
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
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
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
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
                  backgroundColor: cropMode === "border" ? "#3B82F6" : colors.buttonBg,
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
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="2" y="2" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" />
                  <line x1="2" y1="5" x2="14" y2="5" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="2" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="5" y1="2" x2="5" y2="14" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="11" y1="2" x2="11" y2="14" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </TooltipButton>
            </div>
          </div>
        )}

        {/* Annotation Options Toolbar - Shows when annotation tool is active */}
        {imageUrl && ["rectangle", "circle", "arrow", "line", "highlight", "blur", "freehand"].includes(activeTool) && (
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
                    border: annotationColor === color ? "2px solid #3B82F6" : `2px solid ${colors.border}`,
                    borderRadius: "4px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {annotationColor === color && (
                    <span style={{ color: color === "#00FF00" ? "black" : "white", fontSize: "16px" }}>✓</span>
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
                    border: annotationColor === color ? "2px solid #3B82F6" : `2px solid ${colors.border}`,
                    borderRadius: "4px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {annotationColor === color && (
                    <span style={{ color: color === "#FFFF00" ? "black" : "white", fontSize: "16px" }}>✓</span>
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
                    border: annotationColor === color ? "2px solid #3B82F6" : `2px solid ${colors.border}`,
                    borderRadius: "4px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {annotationColor === color && (
                    <span style={{ color: color === "#FFFFFF" || color === "#FFFF00" ? "black" : "white", fontSize: "16px" }}>✓</span>
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
                      backgroundColor: !annotationFilled ? "#3B82F6" : colors.buttonBg,
                      color: !annotationFilled ? "white" : colors.textSecondary,
                      border: "none",
                      borderRadius: "4px",
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="10" height="10" rx="1" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setAnnotationFilled(true)}
                    style={{
                      flex: 1,
                      padding: "8px",
                      cursor: "pointer",
                      backgroundColor: annotationFilled ? "#3B82F6" : colors.buttonBg,
                      color: annotationFilled ? "white" : colors.textSecondary,
                      border: "none",
                      borderRadius: "4px",
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
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
                <div style={{ fontSize: "10px", color: colors.textMuted, marginBottom: "4px", textAlign: "center" }}>
                  Width: {annotationStrokeWidth}px
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={annotationStrokeWidth}
                  onChange={(e) => setAnnotationStrokeWidth(Number(e.target.value))}
                  style={{ width: "100%", cursor: "pointer" }}
                />
              </div>
            )}

            {/* Opacity - for all except blur */}
            {activeTool !== "blur" && (
              <>
                <div style={{ height: "1px", background: colors.border }} />
                <div style={{ padding: "0 4px" }}>
                  <div style={{ fontSize: "10px", color: colors.textMuted, marginBottom: "4px", textAlign: "center" }}>
                    Opacity: {Math.round(annotationOpacity * 100)}%
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={annotationOpacity}
                    onChange={(e) => setAnnotationOpacity(Number(e.target.value))}
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
                  color: annotations.length > 0 ? colors.textSecondary : colors.textMuted,
                  border: "none",
                  borderRadius: "4px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: annotations.length > 0 ? 1 : 0.5,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
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
                  backgroundColor: annotations.length > 0 ? "#DC2626" : colors.buttonBg,
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
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
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
            {/* Row 1: Zoom Out, Percentage, Zoom In */}
            <div style={{ display: "flex", gap: "4px" }}>
              <TooltipButton
                onClick={() => setZoom(Math.max(zoom / 1.2, 0.1))}
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
                onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
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
                onClick={() => setZoom(Math.min(zoom * 1.2, 10))}
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
            <div style={{ display: "flex", gap: "4px", justifyContent: "center" }}>
              <TooltipButton
                onClick={() => {
                  const container = containerRef.current;
                  const image = imageRef.current;
                  if (container && image) {
                    const containerWidth = container.clientWidth - 40;
                    const containerHeight = container.clientHeight - 40;
                    const scaleX = containerWidth / image.naturalWidth;
                    const scaleY = containerHeight / image.naturalHeight;
                    setZoom(Math.min(scaleX, scaleY, 1));
                    setPan({ x: 0, y: 0 });
                  }
                }}
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
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z" />
                </svg>
              </TooltipButton>
            </div>
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
                  background: showBackground ? THEMES[selectedTheme] : colors.buttonBg,
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
                  top: `${50 - (pan.y / (zoom * 10)) - (50 / zoom)}%`,
                  left: `${50 - (pan.x / (zoom * 10)) - (50 / zoom)}%`,
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
    </div>
  );
}
