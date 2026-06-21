import {
  LayoutDashboard,
  CalendarDays,
  Trophy,
  Users,
  UserCog,
  CreditCard,
  Vote,
  Award,
  ClipboardCheck,
  FileBarChart,
  Ticket,
  FileUp,
  CalendarCheck,
  FileText,
  Settings,
  ScanLine,
  Medal,
  Receipt,
} from "lucide-react";

export const sidebarMenu = {
  super_admin: [
    {
      title: "Dashboard",
      path: "/super-admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      title: "Festival",
      path: "/super-admin/festivals",
      icon: Trophy,
    },
    {
      title: "Event",
      path: "/super-admin/events",
      icon: CalendarDays,
    },
    {
      title: "Juri",
      path: "/super-admin/judges",
      icon: Users,
    },
    {
      title: "Admin Event",
      path: "/super-admin/admin-events",
      icon: UserCog,
    },
    {
      title: "Pembayaran",
      path: "/super-admin/payments",
      icon: Receipt,
    },
    {
      title: "Daftar Hadir",
      path: "/super-admin/attendance",
      icon: CalendarCheck,
    },
    {
      title: "Voting",
      path: "/super-admin/voting",
      icon: Vote,
    },
    {
      title: "Sertifikat",
      path: "/super-admin/certificates",
      icon: Award,
    },
  ],

  admin_event: [
    {
      title: "Dashboard",
      path: "/admin-event",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      title: "Scan Presensi",
      path: "/admin-event/scan",
      icon: ScanLine,
    },
    {
      title: "Daftar Hadir",
      path: "/admin-event/attendance",
      icon: CalendarCheck,
    },
    {
      title: "Pengaturan Lomba",
      path: "/admin-event/events",
      icon: Settings,
    },
    {
      title: "Submission",
      path: "/admin-event/submissions",
      icon: FileUp,
    },
    {
      title: "Pembayaran",
      path: "/admin-event/payments",
      icon: Receipt,
    },
    {
      title: "Sertifikat",
      path: "/admin-event/certificates",
      icon: Award,
    },
  ],

  juri: [
    {
      title: "Dashboard",
      path: "/judge",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      title: "Penilaian",
      path: "/judge/submission",
      icon: ClipboardCheck,
    },
    {
      title: "Rekap",
      path: "/judge/recap",
      icon: FileBarChart,
    },
  ],

  peserta: [
    {
      title: "Dashboard",
      path: "/participant",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      title: "Daftar Event",
      path: "/participant/events",
      icon: CalendarDays,
    },
    {
      title: "Event Saya",
      path: "/participant/my-events",
      icon: Ticket,
    },
    {
      title: "Pembayaran",
      path: "/participant/payments",
      icon: CreditCard,
    },
    {
      title: "Sertifikat",
      path: "/participant/certificates",
      icon: Medal,
    },
  ],
};
