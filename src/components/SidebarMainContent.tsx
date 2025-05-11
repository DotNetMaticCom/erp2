import React from "react";
import SidebarSection from "./SidebarSection";
import { SidebarSection as SidebarSectionType } from "../data/sidebarData";
import { ChevronDown, Settings, ChevronLeft } from "lucide-react";

interface SidebarMainContentProps {
  sectionStates: Record<string, boolean>;
  toggleSection: (section: string) => void;
  expandAll?: () => void;
  collapseAll?: () => void;
  sidebarSections: SidebarSectionType[];
  plusIcon: string;
  minusIcon: string;
  activeIconTitle?: string;
  toggleMainContent?: () => void;
}

const SidebarMainContent: React.FC<SidebarMainContentProps> = ({
  sectionStates,
  toggleSection,
  expandAll,
  collapseAll,
  sidebarSections,
  plusIcon,
  minusIcon,
  activeIconTitle = "Dashboard",
  toggleMainContent
}) => {
  // Helper function to get the state key for a section
  const getSectionStateKey = (title: string): string => {
    const keyMap: { [key: string]: string } = {
      "Campaigns": "campaigns",
      "Ad groups": "adGroups",
      "Audiences": "audiences",
      "Home": "home",
      "Recent": "recent",
      "Product Catalog": "productCatalog",
      "Management": "management",
      "Marketing Campaigns": "marketingCampaigns",
      "Audience": "audience",
      "Reports": "reports",
      "Data": "data",
      "Files": "files",
      "Shared": "shared",
      "Daily Reports": "dailyReports",
      "Account": "account",
      "System": "system"
    };
    return keyMap[title] || title.toLowerCase().replace(/\s+/g, '');
  };

  return (
    <div className="w-64 overflow-y-auto flex flex-col justify-between h-full bg-sidebar shadow-sidebar transition-all duration-300 animate-slide-in border-r border-sidebar-border">
      <div className="flex-grow">
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-sidebar-foreground">{activeIconTitle}</h2>
            {toggleMainContent && (
              <button
                onClick={toggleMainContent}
                className="p-1 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/60 hover:text-sidebar-foreground focus:outline-none"
                aria-label="Toggle sidebar"
              >
                <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
              </button>
            )}
          </div>
        </div>
        
        <div className="py-2">
          {/* Dynamically render sidebar sections based on active icon */}
          {sidebarSections.map((section, index) => {
            const stateKey = getSectionStateKey(section.title);
            return (
              <SidebarSection 
                key={`${section.title}-${index}`}
                title={section.title} 
                items={section.items}
                isOpen={sectionStates[stateKey]}
                toggleSection={() => toggleSection(stateKey)}
                plusIcon={plusIcon}
                minusIcon={minusIcon}
              />
            );
          })}
        </div>
      </div>
      
      <div className="border-t border-sidebar-border">
        <div className="flex items-center p-4">
          <div className="w-9 h-9 rounded-full bg-purple-accent mr-3 flex items-center justify-center">
            <span className="text-white font-medium">C</span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-sidebar-foreground">Team Catalog</div>
            <div className="text-xs text-sidebar-foreground/70">Analytics ID 63066612</div>
          </div>
          <button className="p-1 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/60 hover:text-sidebar-foreground">
            <Settings size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarMainContent;
