import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import RequireAuth from './components/common/RequireAuth';
import RequireAdmin from './components/common/RequireAdmin';
import Loader from './components/common/Loader';

// Landing Pages
const Home = lazy(() => import('./pages/landing/Home'));
const WebHosting = lazy(() => import('./pages/landing/WebHosting'));
const Pricing = lazy(() => import('./pages/landing/Pricing'));
const Features = lazy(() => import('./pages/landing/Features'));
const Ticket = lazy(() => import('./pages/landing/Ticket'));
const DomainSearch = lazy(() => import('./pages/landing/DomainSearch'));
const Domains = lazy(() => import('./pages/landing/Domains'));
const Account = lazy(() => import('./pages/landing/Account'));
const Checkout = lazy(() => import('./pages/landing/Checkout'));
const OrderConfirmation = lazy(() => import('./pages/landing/OrderConfirmation'));
const CPanelHosting = lazy(() => import('./pages/landing/CPanelHosting'));
const DomainRegister = lazy(() => import('./pages/landing/DomainRegister'));
const DomainTransfer = lazy(() => import('./pages/landing/DomainTransfer'));
const DomainPricing = lazy(() => import('./pages/landing/DomainPricing'));
const WorkplaceEmails = lazy(() => import('./pages/landing/WorkplaceEmails'));
const SSLCertificates = lazy(() => import('./pages/landing/SSLCertificates'));

// Auth Pages
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));

// User Dashboard Wrapper
const UserDashboard = lazy(() => import('./pages/user/dashboard/UserDashboard'));

// User Pages
const UserBillingHistory = lazy(() => import('./pages/user/billing/History'));
const UserInvoices = lazy(() => import('./pages/user/billing/Invoices'));
const UserPayments = lazy(() => import('./pages/user/billing/Payments'));
const UserPaymentMethods = lazy(() => import('./pages/user/billing/Methods'));
const UserProfileSettings = lazy(() => import('./pages/user/settings/Profile'));
const UserSecuritySettings = lazy(() => import('./pages/user/settings/Security'));
const UserNotificationSettings = lazy(() => import('./pages/user/settings/Notifications'));
const UserDomainList = lazy(() => import('./pages/user/domains/List'));
const UserDomainManage = lazy(() => import('./pages/user/domains/Manage'));
const UserDomainRegister = lazy(() => import('./pages/user/domains/Register'));
const UserDomainTransfer = lazy(() => import('./pages/user/domains/Transfer'));

// Admin Dashboard Wrapper
const AdminDashboard = lazy(() => import('./pages/admin/dashboard/AdminDashboard'));

// Admin Pages
const AdminDashboardOverview = lazy(() => import('./pages/admin/dashboard/Overview'));
const AdminDashboardAnalytics = lazy(() => import('./pages/admin/dashboard/Analytics'));
const AdminDashboardSecurity = lazy(() => import('./pages/admin/dashboard/Security'));
const AdminBillingReports = lazy(() => import('./pages/admin/billing/Reports'));
const AdminBillingInvoices = lazy(() => import('./pages/admin/billing/Invoices'));
const AdminBillingReminders = lazy(() => import('./pages/admin/billing/Reminders'));
const AdminBillingTransactions = lazy(() => import('./pages/admin/billing/Transactions'));
const AdminSecurityAlerts = lazy(() => import('./pages/admin/security/Alerts'));
const AdminSecurityLogs = lazy(() => import('./pages/admin/security/Logs'));
const AdminSecurityAudit = lazy(() => import('./pages/admin/security/Audit'));
const AdminServicesList = lazy(() => import('./pages/admin/services/List'));
const AdminServicesTypes = lazy(() => import('./pages/admin/services/Types'));
const AdminServicesMonitor = lazy(() => import('./pages/admin/services/Monitor'));
const AdminSettingsSystem = lazy(() => import('./pages/admin/settings/System'));
const AdminSettingsGeneral = lazy(() => import('./pages/admin/settings/General'));
const AdminSettingsAffiliate = lazy(() => import('./pages/admin/settings/Affiliate'));
const AdminSettingsStaff = lazy(() => import('./pages/admin/settings/Staff'));
const AdminUsersList = lazy(() => import('./pages/admin/users/List'));
const AdminUsersActivity = lazy(() => import('./pages/admin/users/Activity'));
const AdminUsersView = lazy(() => import('./pages/admin/users/View'));
const AdminUsersAdd = lazy(() => import('./pages/admin/users/Add'));
const AdminSupportQueue = lazy(() => import('./pages/admin/support/Queue'));
const AdminSupportResponses = lazy(() => import('./pages/admin/support/Responses'));
const AdminSupportTickets = lazy(() => import('./pages/admin/support/Tickets'));
const AdminAnalyticsTrends = lazy(() => import('./pages/admin/analytics/Trends'));
const AdminAnalyticsConversions = lazy(() => import('./pages/admin/analytics/Conversions'));
const AdminAnalyticsGrowth = lazy(() => import('./pages/admin/analytics/Growth'));

// Loading component for suspense fallback
const SuspenseFallback = () => (
  <MainLayout>
    <div className="flex items-center justify-center min-h-screen">
      <Loader />
    </div>
  </MainLayout>
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <Routes>
        {/* Public Landing Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="hosting" element={<WebHosting />} />
          <Route path="hosting/cpanel" element={<CPanelHosting />} />
          <Route path="domain-search" element={<DomainSearch />} />
          <Route path="domains" element={<Domains />} />
          <Route path="domains/register" element={<DomainRegister />} />
          <Route path="domains/transfer" element={<DomainTransfer />} />
          <Route path="domains/pricing" element={<DomainPricing />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="pricing/emails" element={<WorkplaceEmails />} />
          <Route path="pricing/ssl" element={<SSLCertificates />} />
          <Route path="features" element={<Features />} />
          <Route path="ticket" element={<Ticket />} />
          <Route path="account" element={<Account />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-confirmation" element={<OrderConfirmation />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/auth" element={<MainLayout hideNav />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
        </Route>

        {/* Redirect root auth path to login */}
        <Route path="/auth" element={<Navigate to="/auth/login" replace />} />

        {/* User Dashboard Routes */}
        <Route path="/user" element={<RequireAuth><UserLayout /></RequireAuth>}>
          <Route index element={<Navigate to="/user/dashboard" replace />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="billing/history" element={<UserBillingHistory />} />
          <Route path="billing/invoices" element={<UserInvoices />} />
          <Route path="billing/invoices/:id" element={<UserInvoices />} />
          <Route path="billing/payments" element={<UserPayments />} />
          <Route path="billing/methods" element={<UserPaymentMethods />} />
          <Route path="settings/profile" element={<UserProfileSettings />} />
          <Route path="settings/security" element={<UserSecuritySettings />} />
          <Route path="settings/notifications" element={<UserNotificationSettings />} />
          <Route path="domains" element={<UserDomainList />} />
          <Route path="domains/manage/:id" element={<UserDomainManage />} />
          <Route path="domains/register" element={<UserDomainRegister />} />
          <Route path="domains/transfer" element={<UserDomainTransfer />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<RequireAdmin><AdminLayout /></RequireAdmin>}>
          <Route index element={<Navigate to="/admin/dashboard/overview" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="dashboard/overview" element={<AdminDashboardOverview />} />
          <Route path="dashboard/analytics" element={<AdminDashboardAnalytics />} />
          <Route path="dashboard/security" element={<AdminDashboardSecurity />} />
          <Route path="billing/reports" element={<AdminBillingReports />} />
          <Route path="billing/invoices" element={<AdminBillingInvoices />} />
          <Route path="billing/reminders" element={<AdminBillingReminders />} />
          <Route path="billing/transactions" element={<AdminBillingTransactions />} />
          <Route path="security/alerts" element={<AdminSecurityAlerts />} />
          <Route path="security/logs" element={<AdminSecurityLogs />} />
          <Route path="security/audit" element={<AdminSecurityAudit />} />
          <Route path="services" element={<AdminServicesList />} />
          <Route path="services/types" element={<AdminServicesTypes />} />
          <Route path="services/monitor" element={<AdminServicesMonitor />} />
          <Route path="settings/system" element={<AdminSettingsSystem />} />
          <Route path="settings/general" element={<AdminSettingsGeneral />} />
          <Route path="settings/affiliate" element={<AdminSettingsAffiliate />} />
          <Route path="settings/staff" element={<AdminSettingsStaff />} />
          <Route path="users" element={<AdminUsersList />} />
          <Route path="users/activity" element={<AdminUsersActivity />} />
          <Route path="users/add" element={<AdminUsersAdd />} />
          <Route path="users/:id" element={<AdminUsersView />} />
          <Route path="support/queue" element={<AdminSupportQueue />} />
          <Route path="support/responses" element={<AdminSupportResponses />} />
          <Route path="support/tickets" element={<AdminSupportTickets />} />
          <Route path="analytics/trends" element={<AdminAnalyticsTrends />} />
          <Route path="analytics/conversions" element={<AdminAnalyticsConversions />} />
          <Route path="analytics/growth" element={<AdminAnalyticsGrowth />} />
        </Route>

        {/* Redirect authenticated users to appropriate dashboard */}
        <Route path="/dashboard" element={<Navigate to="/user/dashboard" replace />} />

        {/* 404 Route */}
        <Route path="*" element={<MainLayout><div className="flex items-center justify-center min-h-screen">404 - Page Not Found</div></MainLayout>} />
      </Routes>
    </Suspense>
  );
}