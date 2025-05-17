
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function DashboardLayout({
  children,
  title = "Dashboard"
}: DashboardLayoutProps) {
  const [isSidebarMainVisible, setIsSidebarMainVisible] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if screen is mobile on component mount and window resize
  useEffect(() => {
    const checkIsMobile = () => {
      if (window.innerWidth < 768) {
        setIsSidebarMainVisible(false);
      } else {
        setIsSidebarMainVisible(true);
      }
    };

    // Check initially
    checkIsMobile();

    // Add resize listener
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const toggleSidebarMain = () => {
    setIsSidebarMainVisible(!isSidebarMainVisible);
  };

  return (
    <div className="flex bg-background min-h-screen">
      {/* Sidebar */}
      <div className="sticky top-0 self-start h-screen">
        <Sidebar 
          isMainContentVisible={isSidebarMainVisible} 
          toggleMainContent={toggleSidebarMain} 
        />
      </div>
      
      {/* Content column with Navbar */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar 
          title={title} 
          showTitle={true} 
          onToggleSidebar={toggleSidebarMain} 
          isSidebarOpen={isSidebarMainVisible} 
        />
        
        <main className="flex-1">
          {children}
        </main>
      </div>

      {/* Toaster for notifications */}
      <Toaster position="top-right" />
    </div>
  );
}
