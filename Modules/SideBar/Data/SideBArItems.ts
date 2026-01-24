export interface NavItem {
  title: string;
  url: string;
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
      isActive: true,
      items: [
        {
          title: "statistics",
          url: "/dashboard",
          isActive: true,
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      items: [
        {
          title: "Company",
          url: "/company",
        },
        {
          title: "Users",
          url: "/users",
        },
      ],
    },
     {
      title: "Academics",
      url: "/academics",
      items: [
        {
          title: "Course Categories",
          url: "/course-categories",
        },
        {
          title: "Courses",
          url: "/courses",
        },
         {
          title: "Lessons",
          url: "/lessons",
        },
         {
          title: "Questions Bank",
          url: "/questions-bank",
        },
        {
          title: "Instructors",
          url: "/instructors",
        },
        { title: "Calendar", 
          url: "/calendar" 
        }
        
      ],
    },
    {
      title: "Enrollments",
      url: "/enrollments",
      items: [
        {
          title: "Enrolled Students",
          url: "/enrolled-students",
        },
        {
          title: "Billing Plans",
          url: "/billing-plans",
        },
      ],
    },
  ],
};
