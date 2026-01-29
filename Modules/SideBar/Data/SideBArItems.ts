import {
  BookOpen,
  Building2,
  ClipboardList,
  CreditCard,
  FileText,
  GraduationCap,
  HelpCircle,
  Layers,
  LayoutDashboard,
  LucideIcon,
  UserCog,
  Users,
} from "lucide-react";

export interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: NavItem[];
  roles?: string[];
}

export interface LMSNavData {
  navMain: NavItem[];
}

export const DashBoardItems: LMSNavData = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "DashBoard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      roles: ["SUPER_ADMIN", "ADMIN", "INSTRUCTOR"],
      items: [
        {
          title: "Statistics",
          url: "/dashboard",
          icon: ClipboardList,
          isActive: true,
          roles: ["SUPER_ADMIN", "ADMIN"],
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: CreditCard,
      items: [
        {
          title: "Company",
          url: "/company",
          icon: Building2,
        },
        {
          title: "Users",
          url: "/users",
          icon: Users,
        },
        {
          title: "Roles",
          url: "/roles",
          icon: Users,
        },
      ],
    },
    {
      title: "Academics",
      url: "/academics",
      icon: GraduationCap,
      items: [
        {
          title: "Course Categories",
          url: "/course-categories",
          icon: Layers,
        },
        {
          title: "Courses",
          url: "/courses",
          icon: BookOpen,
        },
        {
          title: "Lessons",
          url: "/lessons",
          icon: FileText,
        },
        {
          title: "Questions Type",
          url: "/questions-type",
          icon: HelpCircle,
        },
        {
          title: "Questions Bank",
          url: "/questions-bank",
          icon: HelpCircle,
        },
        {
          title: "Instructors",
          url: "/instructors",
          icon: UserCog,
        },
        {
          title: "Events",
          url: "/events",
          icon: HelpCircle,
        },
        {
          title: "Calendar",
          url: "/calendar",
          icon: HelpCircle,
        },
      ],
    },
    {
      title: "Enrollments",
      url: "/enrollments",
      icon: ClipboardList,
      items: [
        {
          title: "Students",
          url: "/students",
          icon: Users,
        },
        {
          title: "Billing Plans",
          url: "/billing-plans",
          icon: CreditCard,
        },
      ],
    },
    {
      title: "Examinations",
      url: "/exam",
      icon: ClipboardList,
      items: [
        {
          title: "Exams",
          url: "/exam",
          icon: Users,
        },
        {
          title: "Exam Questions",
          url: "/billing-plans",
          icon: CreditCard,
        },
        {
          title: "Exam Results",
          url: "/billing-plans",
          icon: CreditCard,
        },
      ],
    },
    {
      title: "Accounting",
      url: "/accounting",
      icon: ClipboardList,
      items: [
        {
          title: "Payments",
          url: "/payments",
          icon: Users,
        },
        {
          title: "Bills",
          url: "/billing-plans",
          icon: CreditCard,
        },
        {
          title: "Instructor Payments",
          url: "/instructor-payments",
          icon: CreditCard,
        },
      ],
    },
  ],
};
