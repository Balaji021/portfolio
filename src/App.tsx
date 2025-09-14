import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLoading } from "./hooks/useLoading";
import LoadingScreen from "./components/LoadingScreen";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isLoading } = useLoading(3000); // 3 seconds minimum loading time
  const [fsSupported, setFsSupported] = useState(false);
  const [isFs, setIsFs] = useState(false);
  const [showFsPrompt, setShowFsPrompt] = useState(false);

  useEffect(() => {
    // Check fullscreen API support and desktop viewport
    const supported = !!(
      document.documentElement.requestFullscreen ||
      (document.documentElement as any).webkitRequestFullscreen ||
      (document.documentElement as any).msRequestFullscreen
    );
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    setFsSupported(supported && isDesktop);

    const onChange = () => setIsFs(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    if (!fsSupported) return;
    // Try to enter fullscreen on first user interaction
    const onFirstGesture = async () => {
      window.removeEventListener("pointerdown", onFirstGesture);
      try {
        const el: any = document.documentElement;
        if (el.requestFullscreen) await el.requestFullscreen();
        else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
        else if (el.msRequestFullscreen) await el.msRequestFullscreen();
        setShowFsPrompt(false);
      } catch (e) {
        // If blocked, show prompt later
        setShowFsPrompt(true);
      }
    };
    window.addEventListener("pointerdown", onFirstGesture, { once: true });
    // Fallback: show prompt if user hasn't interacted
    const t = setTimeout(() => setShowFsPrompt(true), 2500);
    return () => {
      clearTimeout(t);
      window.removeEventListener("pointerdown", onFirstGesture);
    };
  }, [fsSupported]);

  const enterFullscreen = async () => {
    try {
      const el: any = document.documentElement;
      if (el.requestFullscreen) await el.requestFullscreen();
      else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
      else if (el.msRequestFullscreen) await el.msRequestFullscreen();
      setShowFsPrompt(false);
    } catch (e) {
      // Ignore
    }
  };

  const exitFullscreen = async () => {
    try {
      if (document.exitFullscreen) await document.exitFullscreen();
      setShowFsPrompt(true);
    } catch (e) {
      // Ignore
    }
  };

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <div className="dark">
        <Toaster />
        <Sonner />
        {/* Desktop fullscreen prompt/toggle */}
        {fsSupported && (
          <div className="hidden md:block fixed z-[60] right-4 bottom-4 space-y-2">
            {!isFs && showFsPrompt && (
              <button
                onClick={enterFullscreen}
                className="glass border px-4 py-2 rounded-full text-sm shadow hover:shadow-md transition text-gray-800 dark:text-gray-200"
                aria-label="Enter fullscreen"
              >
                Enter Fullscreen
              </button>
            )}
            {isFs && (
              <button
                onClick={exitFullscreen}
                className="glass border px-4 py-2 rounded-full text-sm shadow hover:shadow-md transition text-gray-800 dark:text-gray-200"
                aria-label="Exit fullscreen"
              >
                Exit Fullscreen
              </button>
            )}
          </div>
        )}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
