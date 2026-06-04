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
  UserCheck,
  FileBarChart,
  Ticket,
} from "lucide-react";

export const sidebarMenu = {
  super_admin: [
    {
      title: "Dashboard",
      path: "/super-admin",
      icon: LayoutDashboard,
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
      icon: CreditCard,
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
    },
    {
      title: "Peserta",
      path: "/admin-event/participants",
      icon: Users,
    },
    {
      title: "Presensi",
      path: "/admin-event/attendance",
      icon: UserCheck,
    },
    {
      title: "Pembayaran",
      path: "/admin-event/payments",
      icon: CreditCard,
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
    },
    {
      title: "Penilaian",
      path: "/judge/scoring",
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
      title: "E-Ticket",
      path: "/participant/tickets",
      icon: Ticket,
    },
    {
      title: "Sertifikat",
      path: "/participant/certificates",
      icon: Award,
    },
  ],
};