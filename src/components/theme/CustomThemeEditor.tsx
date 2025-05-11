
import * as React from "react";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "./ColorPicker";

// Define customizable colors interface
interface CustomizableColors {
  [key: string]: string;
  '--color-primary': string;
  '--color-secondary': string;
  '--color-accent': string;
  '--color-background': string;
  '--color-foreground': string;
  '--color-card': string;
  '--color-card-foreground': string;
}

interface CustomThemeEditorProps {
  colors: CustomizableColors;
  onChange: (colors: CustomizableColors) => void;
  onSave: () => void;
}

export function CustomThemeEditor({ colors, onChange, onSave }: CustomThemeEditorProps) {
  const handleColorChange = (key: string, value: string) => {
    onChange({
      ...colors,
      [key]: value,
    });
  };

  const colorInputFields = [
    { label: "Birincil Renk (HSL)", key: "--color-primary" },
    { label: "İkincil Renk (HSL)", key: "--color-secondary" },
    { label: "Vurgu Rengi (HSL)", key: "--color-accent" },
    { label: "Arka Plan Rengi (HSL)", key: "--color-background" },
    { label: "Metin Rengi (HSL)", key: "--color-foreground" },
    { label: "Kart Rengi (HSL)", key: "--color-card" },
    { label: "Kart Metin Rengi (HSL)", key: "--color-card-foreground" },
  ];

  return (
    <div className="space-y-4 pt-4 border-t">
      <h3 className="text-lg font-medium">Kişisel Tema Renkleri</h3>
      <div className="space-y-4">
        {colorInputFields.map(({ label, key }) => (
          <ColorPicker
            key={key}
            label={label}
            colorKey={key}
            value={colors[key as keyof CustomizableColors]}
            onChange={handleColorChange}
          />
        ))}
      </div>
      <Button onClick={onSave} className="w-full">
        Kişisel Temayı Kaydet ve Uygula
      </Button>
    </div>
  );
}
