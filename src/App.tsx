import { Toaster as Sonner } from '@/components/ui/sonner';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { GlobalSearchProvider } from '@/hooks/useGlobalSearch';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './landing/Landing';
import AngelInvestors from './pages/AngelInvestors';
import Database from './pages/Database';
import Events from './pages/Events';
import InvestorProfile from './pages/InvestorProfile';
import News from './pages/News';
import NotFound from './pages/NotFound';
import PoliciesHub from './pages/PoliciesHub';
import PolicyDetail from './pages/PolicyDetail';
import ResourceGuides from './pages/ResourceGuides';
import ResourceReports from './pages/ResourceReports';
import Resources from './pages/Resources';
import ResourceTools from './pages/ResourceTools';
import SearchPage from './pages/Search';
import VCFirms from './pages/VCFirms';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GlobalSearchProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/news" element={<News />} />
            <Route path="/events" element={<Events />} />
            <Route path="/database" element={<Database />} />
            <Route path="/database/angels" element={<AngelInvestors />} />
            <Route path="/database/vc" element={<VCFirms />} />
            <Route
              path="/database/investor/:id"
              element={<InvestorProfile />}
            />
            <Route path="/policies" element={<PoliciesHub />} />
            <Route path="/policies/:id" element={<PolicyDetail />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/guides" element={<ResourceGuides />} />
            <Route path="/resources/tools" element={<ResourceTools />} />
            <Route path="/resources/reports" element={<ResourceReports />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </GlobalSearchProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
