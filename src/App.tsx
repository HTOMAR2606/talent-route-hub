import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/layout/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LoginPage } from "@/pages/LoginPage";
import { CandidateDashboard } from "@/pages/CandidateDashboard";
import { AdminDashboard } from "@/pages/AdminDashboard";
import { ApplicationsPage } from "@/pages/ApplicationsPage";
import { AllotmentPage } from "@/pages/AllotmentPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Layout>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? (
              <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} replace />
            ) : (
              <LoginPage />
            )
          } 
        />
        
        {/* Root redirect */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />

        {/* Candidate Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['candidate']}>
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <ProtectedRoute allowedRoles={['candidate']}>
              <ApplicationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/allotment"
          element={
            <ProtectedRoute allowedRoles={['candidate']}>
              <AllotmentPage />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/applicants"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Applicants Management</h1>
                <p className="text-muted-foreground">View and manage all candidate applications.</p>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/allocations"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Allocation Management</h1>
                <p className="text-muted-foreground">Manage internship allocations and assignments.</p>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
