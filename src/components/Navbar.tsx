import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, ChevronDown, BellRing, Search, Sun, Moon } from "lucide-react"; // Sun ve Moon eklendi
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "@/themes/ThemeProvider"; // Yeni useTheme hook'u
// import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher"; // ThemeSwitcher importu kaldırıldı

interface NavbarProps {
  className?: string;
  title?: string;
  showTitle?: boolean;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ 
  className,
  title = "Dashboard",
  showTitle = true,
  onToggleSidebar,
  isSidebarOpen = true,
}) => {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useTheme(); // Yeni hook'tan isDarkMode ve toggleDarkMode alındı

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <header
      className={cn(
        "sticky top-0 w-full border-b bg-background/80 backdrop-blur-sm z-10 transition-all",
        className
      )}
    >
      <div className="flex h-[64px] items-center justify-between px-4">
        <div className="flex items-center">
          {!isSidebarOpen && (
            <button
              onClick={onToggleSidebar}
              className="flex items-center justify-center p-0 text-purple-accent focus:outline-none transition-transform duration-300 ease-in-out"
              aria-label="Open sidebar"
            >
              <Menu className="h-8 w-8 transform transition-transform duration-300 ease-in-out" strokeWidth={1.5} />
            </button>
          )}
          {/* {showTitle && <h1 className="text-base font-medium ml-2">{title}</h1>} */}
        </div>
        
        {/* Search and user profile area */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-64 pl-8 bg-background border-border focus-visible:ring-1 focus-visible:ring-purple-accent"
            />
          </div>
          
          {/* Theme Toggle Switch */}
          <button
            onClick={toggleDarkMode} // toggleDarkMode fonksiyonu kullanıldı
            className={cn(
              "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              isDarkMode ? 'bg-primary' : 'bg-neutral' // isDarkMode durumuna göre arkaplan rengi
            )}
            role="switch"
            aria-checked={isDarkMode}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                isDarkMode ? 'translate-x-5' : 'translate-x-0' // isDarkMode durumuna göre topun pozisyonu ayarlandı
              )}
            >
              <span
                className={cn(
                  "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity",
                  isDarkMode ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in' // İkon görünürlüğü isDarkMode'a göre ayarlandı
                )}
                aria-hidden="true"
              >
                <Sun className="h-3 w-3 text-muted-foreground" />
              </span>
              <span
                className={cn(
                  "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity",
                  isDarkMode ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out' // İkon görünürlüğü isDarkMode'a göre ayarlandı
                )}
                aria-hidden="true"
              >
                <Moon className="h-3 w-3 text-primary" />
              </span>
            </span>
          </button>
          {/* Yeni açma/kapama anahtarı eklendi */}

          {/* Notification Bell Icon */}
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <BellRing className="h-5 w-5" />
            {/* Notification Dot */}
            <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500" />
          </Button>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="group flex items-center gap-2 px-2 hover:bg-muted rounded-lg transition-colors">
                <Avatar className="h-8 w-8 border border-muted rounded-md">
                  <AvatarImage
                    src="https://i.pravatar.cc/40?u=admin"
                    alt="Admin Profile"
                  />
                  <AvatarFallback>SO</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-left">
                  <span className="text-muted-foreground font-bold text-[11px] uppercase">KONYA PANCAR</span>
                  <span className="font-medium text-sm">Serkan Özdoğan</span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center justify-start gap-2 p-2 md:hidden">
                <div className="font-medium">Serkan Özdoğan</div>
                <div className="text-xs text-muted-foreground">KONYA PANCAR</div>
              </div>
              <DropdownMenuSeparator className="md:hidden" />
              <DropdownMenuItem>
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
