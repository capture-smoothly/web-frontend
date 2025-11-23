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
}: {
  onClick: () => void;
  disabled?: boolean;
  tooltip: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  tooltipBg?: string;
  tooltipText?: string;
  tooltipBorder?: string;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

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
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
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
          }}
        >
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

  // History
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Annotations
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [currentAnnotation, setCurrentAnnotation] = useState<Annotation | null>(null);
  const [isDrawingAnnotation, setIsDrawingAnnotation] = useState(false);
  const [annotationColor] = useState("#FF0000");
  const [annotationOpacity] = useState(0.5);
  const [annotationStrokeWidth] = useState(3);
  const [annotationFilled] = useState(false);

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

    if (cropArea && activeTool === "crop") {
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
  }, [cropArea, activeTool]);

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
      setCropArea({ startX: x, startY: y, endX: x, endY: y });
      setIsDragging(true);
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

    if (activeTool === "crop" && isDragging && cropArea) {
      setCropArea({ ...cropArea, endX: x, endY: y });
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
        setAnnotations([...annotations, currentAnnotation]);
      }
      setIsDrawingAnnotation(false);
      setCurrentAnnotation(null);
    }
    setIsDragging(false);
    setIsPanning(false);
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

  // History management
  const saveToHistory = useCallback(() => {
    if (!imageUrl) return;
    const newState: HistoryState = {
      imageUrl,
      annotations: [...annotations],
      showBackground,
      includeWindowChrome,
      windowChromeTheme,
      selectedTheme,
    };
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newState);
    if (newHistory.length > 50) newHistory.shift();
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [imageUrl, annotations, showBackground, includeWindowChrome, windowChromeTheme, selectedTheme, history, historyIndex]);

  const handleUndo = useCallback(() => {
    if (historyIndex <= 0) return;
    const prev = history[historyIndex - 1];
    setImageUrl(prev.imageUrl);
    setAnnotations(prev.annotations);
    setShowBackground(prev.showBackground);
    setIncludeWindowChrome(prev.includeWindowChrome);
    setWindowChromeTheme(prev.windowChromeTheme);
    setSelectedTheme(prev.selectedTheme);
    setHistoryIndex(historyIndex - 1);
  }, [history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex >= history.length - 1) return;
    const next = history[historyIndex + 1];
    setImageUrl(next.imageUrl);
    setAnnotations(next.annotations);
    setShowBackground(next.showBackground);
    setIncludeWindowChrome(next.includeWindowChrome);
    setWindowChromeTheme(next.windowChromeTheme);
    setSelectedTheme(next.selectedTheme);
    setHistoryIndex(historyIndex + 1);
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
    setImageUrl(tempCanvas.toDataURL("image/png"));
    setCropArea(null);
    setActiveTool("select");
    setZoom(1);
    setPan({ x: 0, y: 0 });
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
  }, [isLoaded, cropArea, activeTool, annotations, currentAnnotation, drawImage, drawCropOverlay, drawAnnotations]);

  useEffect(() => {
    if (isLoaded && history.length === 0) {
      saveToHistory();
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
    if (history.length === 0) saveToHistory();
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
          <h2 style={{ margin: 0, fontSize: "14px", fontWeight: 500, color: colors.textSecondary }}>
            Screenshot Editor
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
              onClick={() => setShowBackground(!showBackground)}
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
            {activeTool === "crop" && cropArea ? (
              <div style={{ display: "flex", gap: "8px" }}>
                <TooltipButton
                  onClick={applyCrop}
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
                  onClick={() => { setCropArea(null); setActiveTool("select"); }}
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
                  onClick={() => setIncludeWindowChrome(!includeWindowChrome)}
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
                    onClick={() => setWindowChromeTheme(windowChromeTheme === "light" ? "dark" : "light")}
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
          onThemeSelect={setSelectedTheme}
          onClose={() => setShowThemeSelector(false)}
          editorTheme={editorTheme}
        />
      )}

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
                      maxWidth: "100%",
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
                      maxWidth: "100%",
                    }}
                  />
                  <canvas
                    ref={annotationCanvasRef}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      pointerEvents: "none",
                      maxWidth: "100%",
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
      </div>
    </div>
  );
}
