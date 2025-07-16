import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import AdminLayout from "@/components/AdminLayout";
import ErrorBoundary from "@/components/ErrorBoundary";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import HuayueProducts from "@/pages/HuayueProducts";
import EiderProducts from "@/pages/EiderProducts";
import About from "@/pages/About";
import News from "@/pages/News";
import Contact from "@/pages/Contact";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminNews from "@/pages/AdminNews";
import AdminMessages from "@/pages/AdminMessages";
import AdminLogin from "@/pages/AdminLogin";
import AdminForgotPassword from "@/pages/AdminForgotPassword";
import AdminResetPassword from "@/pages/AdminResetPassword";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Protected Admin routes with AdminLayout */}
      <Route path="/admin/news" component={() => (
        <AdminLayout>
          <AdminNews />
        </AdminLayout>
      )} />
      <Route path="/admin/messages" component={() => (
        <AdminLayout>
          <AdminMessages />
        </AdminLayout>
      )} />
      <Route path="/admin" component={() => (
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      )} />
      
      {/* Admin auth routes - no layout */}
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/forgot-password" component={AdminForgotPassword} />
      <Route path="/admin/reset-password" component={AdminResetPassword} />
      
      {/* Public routes - with public layout */}
      <Route path="/" component={() => (
        <Layout>
          <Home />
        </Layout>
      )} />
      <Route path="/products" component={() => (
        <Layout>
          <Products />
        </Layout>
      )} />
      <Route path="/products/huayue" component={() => (
        <Layout>
          <HuayueProducts />
        </Layout>
      )} />
      <Route path="/products/eider" component={() => (
        <Layout>
          <EiderProducts />
        </Layout>
      )} />
      <Route path="/about" component={() => (
        <Layout>
          <About />
        </Layout>
      )} />
      <Route path="/news" component={() => (
        <Layout>
          <News />
        </Layout>
      )} />
      <Route path="/contact" component={() => (
        <Layout>
          <Contact />
        </Layout>
      )} />
      
      {/* 404 page */}
      <Route component={() => (
        <Layout>
          <NotFound />
        </Layout>
      )} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
