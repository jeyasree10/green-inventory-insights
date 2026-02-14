import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ComponentsPage from "./pages/ComponentsPage";
import ComponentDetailPage from "./pages/ComponentDetailPage";
import PCBListPage from "./pages/PCBListPage";
import ProductionPage from "./pages/ProductionPage";
import ProductionHistoryPage from "./pages/ProductionHistoryPage";
import InventoryAnalyticsPage from "./pages/InventoryAnalyticsPage";
import ProcurementPage from "./pages/ProcurementPage";
import ExportPage from "./pages/ExportPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/components" element={<ComponentsPage />} />
            <Route path="/components/:id" element={<ComponentDetailPage />} />
            <Route path="/pcb" element={<PCBListPage />} />
            <Route path="/production" element={<ProductionPage />} />
            <Route path="/history" element={<ProductionHistoryPage />} />
            <Route path="/analytics" element={<InventoryAnalyticsPage />} />
            <Route path="/procurement" element={<ProcurementPage />} />
            <Route path="/export" element={<ExportPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
