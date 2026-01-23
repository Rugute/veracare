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
      title: "Company",
      url: "/company",
      items: [
        {
          title: "Create Company",
          url: "/compnay",
        },
      ],
    },
  ],
};
