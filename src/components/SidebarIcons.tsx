import React from "react"; // required for cloneElement
import { Shield } from "lucide-react";
import { SidebarIconItem } from "../data/sidebarData";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface SidebarIconsProps {
  icons: SidebarIconItem[];
  activeIconIndex: number;
  setActiveIconIndex: (index: number) => void;
  onIconClick?: () => void;
}

export default function SidebarIcons({
  icons,
  activeIconIndex,
  setActiveIconIndex,
  onIconClick
}: SidebarIconsProps) {
  const handleIconClick = (index: number) => {
    setActiveIconIndex(index);
    if (onIconClick) {
      onIconClick();
    }
  };
  
  return (
    <TooltipProvider delayDuration={100}>
      <div className="w-16 flex flex-col h-full bg-sidebar shadow-sidebar border-r border-sidebar-border">
        <div className="w-full flex items-center justify-center py-5 border-b border-sidebar-border">
          <div className="w-10 h-10 flex items-center justify-center bg-black rounded-lg cursor-pointer transform hover:scale-105 transition-all duration-200">
            <img src="/pnk-logo.png" alt="PNK Logo" className="w-10 h-10" />
          </div>
        </div>
        
        <div className="flex flex-col items-center pt-3 space-y-4 flex-grow">
          {icons.slice(0, 7).map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => handleIconClick(index)}
                  className={`sidebar-icon-button ${index === activeIconIndex ? 'active' : ''}`}
                >
                  {index === activeIconIndex 
                    ? React.cloneElement(item.icon as React.ReactElement, { className: "w-5 h-5 text-white" })
                    : React.cloneElement(item.icon as React.ReactElement, { className: "w-5 h-5 text-purple-accent" })}
                </button>
              </TooltipTrigger>
              <TooltipContent 
                side="right" 
                className="bg-popover text-popover-foreground shadow-dropdown border border-border"
                sideOffset={5}
                align="center"
              >
                {item.title}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        
        <div className="flex flex-col items-center pb-5 mt-auto space-y-3">
        </div>
      </div>
    </TooltipProvider>
  );
}
