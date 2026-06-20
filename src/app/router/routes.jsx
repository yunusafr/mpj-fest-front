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
import SubmissionPage
from "@/features/participant/pages/SubmissionPage";
import AdminEventsPage
from "@/features/super-admin/admin-events/pages/AdminEventsPage";
import SubmissionsPage
from "@/features/admin-event/pages/SubmissionsPage";
import AdminEventDashboard from "@/features/admin-event/pages/DashboardPage";
import AssignEventPage
from "@/features/super-admin/admin-events/pages/AssignEventPage";
import CreateAdminEventPage
from "@/features/super-admin/admin-events/pages/CreateAdminEventPage";
import SubmissionDetailPage from "@/features/admin-event/pages/SubmissionDetailPage";
import FestivalListPage
from "@/features/super-admin/festivals/pages/FestivalListPage";

import CreateFestivalPage
from "@/features/super-admin/festivals/pages/CreateFestivalPage";

import EditFestivalPage
from "@/features/super-admin/festivals/pages/EditFestivalPage";
import EventsPage2 from "@/features/super-admin/events/pages/EventsPage";
import CreateEventPage from "@/features/super-admin/events/pages/CreateEventPage";
import EditEventPage from "@/features/super-admin/events/pages/EditEventPage";

import TicketPage
from "@/features/ticket/pages/TicketPage";
import ScanTicketPage
from "@/features/admin-event/pages/ScanTicketPage";

import JudgesPage
from "@/features/super-admin/judges/pages/JudgesPage";

import AssignJudgePage
from "@/features/super-admin/judges/pages/AssignJudgePage";
import CreateJudgePage
from "@/features/super-admin/judges/pages/CreateJudgePage";
import EditJudgePage from "@/features/super-admin/judges/pages/EditJudgePage";

import PaymentHistoryPage from "@/features/payments/pages/PaymentHistoryPage";
import InvoicePage from "@/features/payments/pages/InvoicePage";

import AttendancesPage from "@/features/attendance/pages/AttendancesPage";
import AttendanceDetailPage from "@/features/attendance/pages/AttendanceDetailPage";

import JudgeDashboard from "@/features/judge/pages/JudgeDashboard";
import JudgeSubmissionsPage from "@/features/judge/pages/JudgeSubmissionsPage";

import EventsPage3 from "@/features/admin-event/pages/EventsPage";
import EventCriteriaPage from "@/features/admin-event/pages/EventCriteriaPage";
import JudgeAssessmentPage from "@/features/judge/pages/JudgeAssessmentPage";

import VotingSetupPage from "@/features/admin-event/pages/VotingSetupPage";
import PublicVotingPage from "@/features/voting/pages/PublicVotingPage";

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
    },
    {
  path: "/v/:slug",
  element: <PublicVotingPage />
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
{
  path: "admin-events",
  children: [
    {
      index: true,
      element: <AdminEventsPage />,
    },

    {
      path: "create",
      element: <CreateAdminEventPage />,
    },

    {
      path: ":id/assign",
      element: <AssignEventPage />,
    },
  ],
},
{
  path: "attendance",
  children: [
    {
      index: true,
      element: <AttendancesPage />,
    },

    {
      path: ":eventId",
      element: <AttendanceDetailPage />,
    },
  ],
},
{
  path: "festivals",
  children: [
    {
      index: true,
      element:
        <FestivalListPage />,
    },

    {
      path: "create",
      element:
        <CreateFestivalPage />,
    },

    {
      path: ":id/edit",
      element:
        <EditFestivalPage />,
    },
  ],
},{
  path: "judges",
  children: [
    {
      index: true,
      element:
        <JudgesPage />,
    },
    {
      path: ":id/assign",
      element:
        <AssignJudgePage />,
    },
    {
  path:
    "create",

  element:
    <CreateJudgePage />
},
    {
  path:
    ":id/edit",

  element:
    <EditJudgePage />
},

  ],
},

{
  path: "events",
  children: [
    {
      index: true,
      element: <EventsPage2 />,
    },

    {
      path: "create",
      element: <CreateEventPage />,
    },

    {
      path: ":id/edit",
      element: <EditEventPage />,
    },
  ],
},
{
  path: "payments",
  element: <PaymentHistoryPage />,
},
{
  path: "payments/:orderId",
  element: <InvoicePage />,
},
  ],
},
{
  path: "/admin-event",

  element: (
    <ProtectedRoute>
      <RoleRoute
        allowedRoles={[
          "admin_event",
        ]}
      >
        <DashboardLayout />
      </RoleRoute>
    </ProtectedRoute>
  ),

  children: [
    {
      index: true,
      element:
        <AdminEventDashboard />,
    },

    {
      path:
        "submissions",

      element:
        <SubmissionsPage />,
    },
    {
  path: "submissions/:id",
  element:
    <SubmissionDetailPage />,
},
{
  path: "scan",
  element: <ScanTicketPage />,
},
{
  path: "events",

  children: [

    {

      index:true,

      element:

      <EventsPage3 />

    },

    {

      path:

      ":eventId/criteria",

      element:

      <EventCriteriaPage />

    },

    {

      path:

      ":eventId/voting",

      element:

      <VotingSetupPage />

    }

  ]

},
{
  path: "attendance",
  children: [
    {
      index: true,
      element: <AttendancesPage />,
    },

    {
      path: ":eventId",
      element: <AttendanceDetailPage />,
    },
  ],
},
{
  path: "payments",
  element: <PaymentHistoryPage />,
},
{
  path: "payments/:orderId",
  element: <InvoicePage />,
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
{
  path: "submissions/:registrationId",
  element: <SubmissionPage />,
},
{
  path: "tickets/:registrationId",
  element: <TicketPage />,
},
{
  path: "payments",
  element: <PaymentHistoryPage />,
},
{
  path: "payments/:orderId",
  element: <InvoicePage />,
},
  ],
},
{
  path: "/judge",

  element: (
    <ProtectedRoute>
      <RoleRoute
        allowedRoles={[
          "juri",
        ]}
      >
        <DashboardLayout />
      </RoleRoute>
    </ProtectedRoute>
  ),

  children: [
    {
      index: true,
      element:
        <JudgeDashboard />,
    },

  {
  path: "submission",
  element: <JudgeSubmissionsPage />,
},
{
  path: "submission/:submissionId",
  element: <JudgeAssessmentPage  />,
},
  ],
}
];