import React from "react";
import {
  LayoutDashboard,
  Home,
  Layers,
  Settings,
  User,
  BarChart2,
  Search,
  FileText,
  Command,
  Target,
  PanelLeft,
} from "lucide-react";

// Define the type for sidebar icon items
export interface SidebarIconItem {
  icon: React.ReactNode;
  title: string;
}

// Define the type for sidebar section items
export interface SidebarSectionItem {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  badge?: number;
}

// Define the type for sidebar sections
export interface SidebarSection {
  title: string;
  items: SidebarSectionItem[];
  isOpen: boolean;
}

// Icons for the left sidebar
export const sidebarIcons: SidebarIconItem[] = [
  { icon: <Layers className="w-5 h-5" />, title: "Dashboard" },
  { icon: <Home className="w-5 h-5" />, title: "Home" },
  { icon: <Layers className="w-5 h-5" />, title: "Products" },
  { icon: <Target className="w-5 h-5" />, title: "Marketing" },
  { icon: <Command className="w-5 h-5" />, title: "Analytics" },
  { icon: <FileText className="w-5 h-5" />, title: "Documents" },
  { icon: <PanelLeft className="w-5 h-5" />, title: "Reports" },
  { icon: <Settings className="w-5 h-5" />, title: "Settings" }
];

// Icon content data for each sidebar icon
export const iconContent: SidebarSection[][] = [
  // Dashboard content (Icon 0)
  [
    {
      title: "Campaigns",
      items: [
        { icon: <LayoutDashboard className="w-4 h-4" />, text: "Overview", active: true },
        { icon: <BarChart2 className="w-4 h-4" />, text: "Recommendations" },
        { icon: <Target className="w-4 h-4" />, text: "Insights", badge: 10 },
        { icon: <Command className="w-4 h-4" />, text: "Campaigns" },
        { icon: <Search className="w-4 h-4" />, text: "Keywords" },
        { icon: <FileText className="w-4 h-4" />, text: "Reporting" }
      ],
      isOpen: true
    },
    {
      title: "Ad groups",
      items: [
        { icon: <LayoutDashboard className="w-4 h-4" />, text: "Overview" },
        { icon: <Layers className="w-4 h-4" />, text: "Ad groups" },
        { icon: <Target className="w-4 h-4" />, text: "Ads & extensions" },
        { icon: <FileText className="w-4 h-4" />, text: "Landing pages" },
        { icon: <BarChart2 className="w-4 h-4" />, text: "Reporting" },
        { icon: <Settings className="w-4 h-4" />, text: "Settings" }
      ],
      isOpen: true
    },
    {
      title: "Audiences",
      items: [
        { icon: <LayoutDashboard className="w-4 h-4" />, text: "Kitle Segmentleri" },
        { icon: <User className="w-4 h-4" />, text: "Demografi" },
        { icon: <Target className="w-4 h-4" />, text: "İlgi Alanları" },
        { icon: <BarChart2 className="w-4 h-4" />, text: "Davranış Analizi" },
        { icon: <FileText className="w-4 h-4" />, text: "Raporlar" }
      ],
      isOpen: false
    }
  ],
  // Home content (Icon 1)
  [
    {
      title: "Home",
      items: [
        { icon: <Home className="w-4 h-4" />, text: "Dashboard", active: true },
        { icon: <User className="w-4 h-4" />, text: "Profile" },
        { icon: <Settings className="w-4 h-4" />, text: "Preferences" }
      ],
      isOpen: true
    },
    {
      title: "Recent",
      items: [
        { icon: <FileText className="w-4 h-4" />, text: "Documents" },
        { icon: <LayoutDashboard className="w-4 h-4" />, text: "Projects" }
      ],
      isOpen: true
    }
  ],
  // Products content (Icon 2)
  [
    {
      title: "Product Catalog",
      items: [
        { icon: <Layers className="w-4 h-4" />, text: "All Products", active: true },
        { icon: <FileText className="w-4 h-4" />, text: "Categories" },
        { icon: <Target className="w-4 h-4" />, text: "Inventory" },
        { icon: <BarChart2 className="w-4 h-4" />, text: "Analytics" }
      ],
      isOpen: true
    },
    {
      title: "Management",
      items: [
        { icon: <Settings className="w-4 h-4" />, text: "Settings" },
        { icon: <User className="w-4 h-4" />, text: "Permissions" }
      ],
      isOpen: true
    }
  ],
  // Marketing content (Icon 3)
  [
    {
      title: "Campaigns",
      items: [
        { icon: <Target className="w-4 h-4" />, text: "Active Campaigns", active: true },
        { icon: <BarChart2 className="w-4 h-4" />, text: "Performance" },
        { icon: <FileText className="w-4 h-4" />, text: "Reports" }
      ],
      isOpen: true
    },
    {
      title: "Audience",
      items: [
        { icon: <User className="w-4 h-4" />, text: "Segments" },
        { icon: <Command className="w-4 h-4" />, text: "Targeting" }
      ],
      isOpen: true
    }
  ],
  // Analytics content (Icon 4)
  [
    {
      title: "Reports",
      items: [
        { icon: <BarChart2 className="w-4 h-4" />, text: "Overview", active: true },
        { icon: <Target className="w-4 h-4" />, text: "Conversions" },
        { icon: <User className="w-4 h-4" />, text: "User Behavior" }
      ],
      isOpen: true
    },
    {
      title: "Data",
      items: [
        { icon: <FileText className="w-4 h-4" />, text: "Export" },
        { icon: <Settings className="w-4 h-4" />, text: "Settings" }
      ],
      isOpen: true
    }
  ],
  // Documents content (Icon 5)
  [
    {
      title: "Files",
      items: [
        { icon: <FileText className="w-4 h-4" />, text: "All Documents", active: true },
        { icon: <Layers className="w-4 h-4" />, text: "Categories" }
      ],
      isOpen: true
    },
    {
      title: "Shared",
      items: [
        { icon: <User className="w-4 h-4" />, text: "With Me" },
        { icon: <Settings className="w-4 h-4" />, text: "My Shares" }
      ],
      isOpen: true
    }
  ],
  // Reports content (Icon 6)
  [
    {
      title: "Reports",
      items: [
        { icon: <FileText className="w-4 h-4" />, text: "Daily Reports", active: true },
        { icon: <BarChart2 className="w-4 h-4" />, text: "Analytics" },
        { icon: <Target className="w-4 h-4" />, text: "Performance" }
      ],
      isOpen: true
    }
  ],
  // Settings content (Icon 7)
  [
    {
      title: "Account",
      items: [
        { icon: <User className="w-4 h-4" />, text: "Profile", active: true },
        { icon: <Settings className="w-4 h-4" />, text: "Preferences" }
      ],
      isOpen: true
    },
    {
      title: "System",
      items: [
        { icon: <Command className="w-4 h-4" />, text: "General" },
        { icon: <Layers className="w-4 h-4" />, text: "Advanced" }
      ],
      isOpen: true
    }
  ]
];
