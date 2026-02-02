import {
  LayoutDashboard,
  BookOpen,
  Clock,
  GraduationCap,
  FileText,
  CalendarDays,
  ScrollText,
  Award,
  Wallet,
  Receipt,
  CreditCard,
  User,
  Settings,
  LifeBuoy,
} from "lucide-react";
export const StudentSideBarItems = {
  user: {
    name: "Gideon Lelei",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },

    {
      title: "Academic",
      icon: BookOpen,
      items: [
        {
          title: "My Class",
          url: "/academic/classes",
          icon: GraduationCap,
        },
        {
          title: "Class Schedule",
          url: "/academic/schedule",
          icon: Clock,
        },
        {
          title: "Grades & Transcript",
          url: "/academic/grades",
          icon: ScrollText,
        },
        {
          title: "Assignments",
          url: "/academic/assignments",
          icon: FileText,
        },
        {
          title: "Academic Calendar",
          url: "/academic/calendar",
          icon: CalendarDays,
        },
      ],
    },

    {
      title: "Documents",
      icon: FileText,
      items: [
        {
          title: "Official Transcript",
          url: "/documents/transcript",
          icon: ScrollText,
        },
        {
          title: "Certificates",
          url: "/documents/certificates",
          icon: Award,
        },
      ],
    },

    {
      title: "Financial",
      icon: Wallet,
      items: [
        {
          title: "Tuition & Fees",
          url: "/finance/tuition",
          icon: CreditCard,
        },
        {
          title: "Payment History",
          url: "/finance/payments",
          icon: Receipt,
        },
        {
          title: "Financial Aid",
          url: "/finance/aid",
          icon: Wallet,
        },
      ],
    },

    {
      title: "Account",
      icon: User,
      items: [
        {
          title: "Profile",
          url: "/account/profile",
          icon: User,
        },
        {
          title: "Settings",
          url: "/account/settings",
          icon: Settings,
        },
      ],
    },

    {
      title: "Support",
      icon: LifeBuoy,
      items: [
        {
          title: "Help Center",
          url: "/support/help",
          icon: LifeBuoy,
        },
      ],
    },
  ],
};
