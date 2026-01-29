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
}

export interface LMSNavData {
  navMain: NavItem[];
}

export const DashBoardItems: LMSNavData = {
  navMain: [
    {
      title: "DashBoard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Statistics",
          url: "/dashboard",
          icon: ClipboardList,
          isActive: true,
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
          title: "Enrolled Students",
          url: "/enrolled-students",
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
  ],
};
