
import * as React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BaseThemeName } from "@/components/theme-provider";

interface BaseThemeSelectorProps {
  value: BaseThemeName;
  onChange: (value: BaseThemeName) => void;
  availableThemes: BaseThemeName[];
}

export function BaseThemeSelector({ value, onChange, availableThemes }: BaseThemeSelectorProps) {
  const handleChange = (value: string) => {
    onChange(value as BaseThemeName);
  };
  
  return (
    <div className="space-y-2">
      <Label htmlFor="base-theme-select">Ana Tema</Label>
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger id="base-theme-select" className="w-full transition-colors duration-200">
          <SelectValue placeholder="Ana tema seçin" />
        </SelectTrigger>
        <SelectContent>
          {availableThemes.map(themeName => (
            <SelectItem 
              key={themeName} 
              value={themeName}
              className="transition-colors duration-150 hover:bg-primary/5 focus:bg-primary/10"
            >
              {themeName.charAt(0).toUpperCase() + themeName.slice(1).replace('-', ' ')}
            </SelectItem>
          ))}
          <SelectItem 
            value="custom"
            className="transition-colors duration-150 hover:bg-primary/5 focus:bg-primary/10"
          >
            Kişisel Tema
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
