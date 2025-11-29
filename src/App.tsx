import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Calendario from "./pages/Calendario";
import Notificacoes from "./pages/Notificacoes";
import Acompanhamento from "./pages/Acompanhamento";
import Upload from "./pages/Upload";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calendario" element={<Layout><Calendario /></Layout>} />
          <Route path="/notificacoes" element={<Layout><Notificacoes /></Layout>} />
          <Route path="/acompanhamento" element={<Layout><Acompanhamento /></Layout>} />
          <Route path="/upload" element={<Layout><Upload /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
