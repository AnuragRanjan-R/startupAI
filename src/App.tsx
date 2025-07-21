import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AngelInvestors from './pages/AngelInvestors';
import Database from './pages/Database';
import Events from './pages/Events';
import Index from './pages/Index';
import InvestorProfile from './pages/InvestorProfile';
import News from './pages/News';
import NotFound from './pages/NotFound';
import PoliciesHub from './pages/PoliciesHub';
import PolicyDetail from './pages/PolicyDetail';
import ResourceGuides from './pages/ResourceGuides';
import ResourceReports from './pages/ResourceReports';
import Resources from './pages/Resources';
import ResourceTools from './pages/ResourceTools';
import VCFirms from './pages/VCFirms';

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
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/guides" element={<ResourceGuides />} />
          <Route path="/resources/tools" element={<ResourceTools />} />
          <Route path="/resources/reports" element={<ResourceReports />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
