
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ColorPickerProps {
  label: string;
  colorKey: string;
  value: string;
  onChange: (key: string, value: string) => void;
  type?: "text" | "color";
}

export function ColorPicker({ label, colorKey, value, onChange, type = "text" }: ColorPickerProps) {
  // HSL to HEX conversion for color picker
  const hslToHex = (hsl: string): string => {
    const hslMatch = hsl.match(/(\d+)\s*(\d+)%\s*(\d+)%/);
    if (!hslMatch) return '#000000'; // Invalid HSL returns black
  
    let h = parseInt(hslMatch[1]);
    let s = parseInt(hslMatch[2]) / 100;
    let l = parseInt(hslMatch[3]) / 100;
  
    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c/2,
        r = 0,
        g = 0,
        b = 0;
  
    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
  
    const toHex = (c: number) => {
      const hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    };
  
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  // HEX to HSL conversion for color picker
  const hexToHsl = (hex: string): string => {
    let r = 0, g = 0, b = 0;
    if (hex.length == 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length == 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
  
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
  
    if (delta == 0) h = 0;
    else if (cmax == r) h = ((g - b) / delta) % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
  
    return `${h} ${s}% ${l}%`;
  };

  return (
    <div className="space-y-1">
      <Label htmlFor={colorKey}>{label}</Label>
      {type === "color" ? (
        <Input
          id={colorKey}
          type="color"
          value={value.startsWith('hsl') ? hslToHex(value) : value}
          onChange={(e) => onChange(colorKey, hexToHsl(e.target.value))}
          className="h-10"
        />
      ) : (
        <Input
          id={colorKey}
          type="text"
          value={value}
          onChange={(e) => onChange(colorKey, e.target.value)}
          placeholder="örn: 210 40% 98%"
        />
      )}
    </div>
  );
}
