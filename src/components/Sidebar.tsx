
import { useState, useEffect, useCallback } from "react";
import SidebarIcons from "./SidebarIcons";
import SidebarMainContent from "./SidebarMainContent";
import { sidebarIcons, iconContent } from "../data/sidebarData";
import { useSidebarState } from "../hooks/useSidebarState";
import { AnimatePresence, motion } from "framer-motion";

// Sidebar props interface
interface SidebarProps {
  isMainContentVisible?: boolean;
  toggleMainContent?: () => void;
}

export default function Sidebar({
  isMainContentVisible = true,
  toggleMainContent
}: SidebarProps) {
  const [activeIconIndex, setActiveIconIndex] = useState(0);
  const { sectionStates, toggleSection, expandAll, collapseAll } = useSidebarState();
  
  // Icons for plus/minus toggle
  const plusIcon = "/lovable-uploads/8965ae2e-9c05-44f6-80eb-a5856c9faf24.png";
  const minusIcon = "/lovable-uploads/055cdd82-539e-4344-aac8-e58ec44aad06.png";

  // Get current sections based on active icon
  const currentSections = iconContent[activeIconIndex] || iconContent[0];

  // If sidebar is hidden and icon is clicked, show sidebar
  const handleIconClick = useCallback(() => {
    if (!isMainContentVisible && toggleMainContent) {
      toggleMainContent();
    }
  }, [isMainContentVisible, toggleMainContent]);

  // Add keyboard shortcut for toggling sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+S to toggle sidebar
      if (e.altKey && e.key === 's') {
        if (toggleMainContent) {
          toggleMainContent();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleMainContent]);

  return (
    <div className="flex h-full w-max">
      {/* Icon sidebar */}
      <div className="h-full flex flex-col border-r">
        <SidebarIcons
          icons={sidebarIcons}
          activeIconIndex={activeIconIndex}
          setActiveIconIndex={setActiveIconIndex}
          onIconClick={handleIconClick}
        />
      </div>

      {/* Main sidebar - with AnimatePresence for smooth transitions */}
      <AnimatePresence mode="wait">
        {isMainContentVisible && (
          <motion.div
            key="sidebar-content"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 256, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full overflow-hidden"
          >
            <SidebarMainContent 
              sectionStates={sectionStates}
              toggleSection={toggleSection}
              expandAll={expandAll}
              collapseAll={collapseAll}
              sidebarSections={currentSections}
              plusIcon={plusIcon}
              minusIcon={minusIcon}
              activeIconTitle={sidebarIcons[activeIconIndex]?.title || "Dashboard"}
              toggleMainContent={toggleMainContent}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
