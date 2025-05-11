import React from "react";
import NavItem from "./NavItem";
import { Plus, Minus } from "lucide-react";

interface SidebarSectionProps {
  title: string;
  items: Array<{
    icon: React.ReactNode;
    text: string;
    active?: boolean;
    badge?: number;
  }>;
  isOpen: boolean;
  toggleSection: () => void;
  plusIcon: string;
  minusIcon: string;
  isLastSection: boolean;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  title,
  items,
  isOpen,
  toggleSection,
  plusIcon,
  minusIcon,
  isLastSection
}) => {
  return (
    <div className="mb-4">
      <div 
        className="flex items-center justify-between cursor-pointer group px-4 py-3" 
        onClick={toggleSection}
      >
        <span className="text-muted-foreground font-bold text-[11px] uppercase hover:text-accent transition-colors duration-200">{title}</span>
        <button 
          type="button"
          className="flex items-center justify-center w-6 h-6 rounded-[4px] bg-muted hover:bg-accent/10 transition-colors duration-200"
        >
          {isOpen ? 
            <Minus className="w-4 h-4 text-muted-foreground hover:text-accent" /> :
            <Plus className="w-4 h-4 text-muted-foreground hover:text-accent" />
          }
        </button>
      </div>
      
      {isOpen && (
        <div className="px-4 py-1">
          {items.map((item, index) => (
            <NavItem
              key={index}
              icon={item.icon}
              text={item.text}
              active={item.active}
              badge={item.badge}
            />
          ))}
        </div>
      )}
      {!isLastSection && (
        <div className="mt-4 border-b border-border"></div>
      )}
    </div>
  );
};

export default SidebarSection;
