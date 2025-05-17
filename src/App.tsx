import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { NewThemeProvider } from "./themes/ThemeProvider";
import ThemeTestControls from "./components/dev/ThemeTestControls";

const queryClient = new QueryClient();

const future = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};


const App = () => (
  <QueryClientProvider client={queryClient}>
    <NewThemeProvider defaultTheme="default-theme" respectSystemPreference={true}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={future}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        {/* Geçici Test Kontrolleri */}
        <ThemeTestControls />
      </TooltipProvider>
    </NewThemeProvider>
  </QueryClientProvider>
);

export default App;
