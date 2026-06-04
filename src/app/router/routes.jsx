import LoginPage from "@/features/auth/pages/LoginPage";
import LandingPage from "@/pages/landing/LandingPage";
import NotFoundPage from "@/pages/errors/NotFoundPage";
import PublicLayout from "@/layouts/PublicLayout";
import GuestRoute from "@/components/common/GuestRoute";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import RoleRoute from "@/components/common/RoleRoute";
import SuperAdminDashboard from "@/features/super-admin/pages/DashboardPage";
import DashboardLayout from "@/layouts/DashboardLayout";
import ClaimAccountPage from "@/features/claim-account/pages/ClaimAccountPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import ParticipantDashboardPage from "@/features/participant/pages/DashboardPage";
import EventDetailPage
from "@/features/event/pages/EventDetailPage";
import EventsPage
from "@/features/event/pages/EventsPage";
import MyEventsPage from "@/features/registration/pages/MyEventsPage";
import RegistrationDetailPage
from "@/features/registration/pages/RegistrationDetailPage";

export const routes = [
  {
  element: <PublicLayout />,
  children: [
    {
      path: "/",
      element: <LandingPage />
    }
  ]
},
  {
  element: <PublicLayout />,
  children: [
    {
      path: "/login",
      element: (
    <GuestRoute>
      <LoginPage />
    </GuestRoute>
  )
    }
  ]
},
  {
    path: "*",
    element: <NotFoundPage />,
  },
 {
  path: "/super-admin",

  element: (
    <ProtectedRoute>

      <RoleRoute
        allowedRoles={[
          "super_admin",
        ]}
      >

        <DashboardLayout />

      </RoleRoute>

    </ProtectedRoute>
  ),

  children: [
    {
      index: true,
      element: (
        <SuperAdminDashboard />
      ),
    },
  ],
},
{
  path: "/klaim-akun",
  element: (
    <GuestRoute>
      <ClaimAccountPage />
    </GuestRoute>
  ),
},
{
  path: "/register",
  element: (
    <GuestRoute>
      <RegisterPage />
    </GuestRoute>
  ),
},
{
  path: "/participant",

  element: (
    <ProtectedRoute>
      <RoleRoute
        allowedRoles={[
          "peserta",
        ]}
      >
        <DashboardLayout />
      </RoleRoute>
    </ProtectedRoute>
  ),

  children: [
    {
      index: true,
      element: (
        <ParticipantDashboardPage />
      ),
    },
    {
  path: "events",
  element: (
    <EventsPage />
  ),
},

    {
      path: "events/:id",
      element: (
        <EventDetailPage /> 
      ),
    },
    {
  path: "my-events",
  element: (
    <MyEventsPage />
  ),
},
{
  path:
    "registrations/:id",

  element: (
    <RegistrationDetailPage />
  ),
},
  ],
},
];