
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import News from "./pages/News";
import Events from "./pages/Events";
import Database from "./pages/Database";
import AngelInvestors from "./pages/AngelInvestors";
import VCFirms from "./pages/VCFirms";
import InvestorProfile from "./pages/InvestorProfile";
import PoliciesHub from "./pages/PoliciesHub";
import PolicyDetail from "./pages/PolicyDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/news" element={<News />} />
          <Route path="/events" element={<Events />} />
          <Route path="/database" element={<Database />} />
          <Route path="/database/angels" element={<AngelInvestors />} />
          <Route path="/database/vc" element={<VCFirms />} />
          <Route path="/database/investor/:id" element={<InvestorProfile />} />
          <Route path="/policies" element={<PoliciesHub />} />
          <Route path="/policies/:id" element={<PolicyDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
