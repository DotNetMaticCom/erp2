
import { useState, useEffect } from 'react';

type SectionNames = 
  | 'campaigns'
  | 'adGroups'
  | 'audiences'
  | 'home'
  | 'recent'
  | 'productCatalog'
  | 'management'
  | 'marketingCampaigns'
  | 'audience'
  | 'reports'
  | 'data'
  | 'files'
  | 'shared'
  | 'dailyReports'
  | 'account'
  | 'system';

type SidebarSections = Record<SectionNames, boolean>;

interface UseSidebarStateResult {
  sectionStates: SidebarSections;
  toggleSection: (section: SectionNames) => void;
  expandAll: () => void;
  collapseAll: () => void;
}

// Custom hook for managing sidebar section states
export const useSidebarState = (): UseSidebarStateResult => {
  // Section states for each icon's sections with more precise typing
  const [sectionStates, setSectionStates] = useState<SidebarSections>({
    // Dashboard sections
    campaigns: true,
    adGroups: true,
    audiences: false,
    // Home sections
    home: true,
    recent: true,
    // Products sections
    productCatalog: true,
    management: true,
    // Marketing sections
    marketingCampaigns: true,
    audience: true,
    // Analytics sections
    reports: true,
    data: true,
    // Documents sections
    files: true,
    shared: true,
    // Reports sections
    dailyReports: true,
    // Settings sections
    account: true,
    system: true
  });

  // Toggle section function
  const toggleSection = (section: SectionNames) => {
    setSectionStates(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Expand all sections
  const expandAll = () => {
    const allExpanded = Object.keys(sectionStates).reduce((acc, key) => {
      acc[key as SectionNames] = true;
      return acc;
    }, {} as SidebarSections);
    
    setSectionStates(allExpanded);
  };

  // Collapse all sections
  const collapseAll = () => {
    const allCollapsed = Object.keys(sectionStates).reduce((acc, key) => {
      acc[key as SectionNames] = false;
      return acc;
    }, {} as SidebarSections);
    
    setSectionStates(allCollapsed);
  };

  return { sectionStates, toggleSection, expandAll, collapseAll };
};
