"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { UseGetCourses } from "@/Modules/Courses/ApiClient/ApiClient";
import { UseGetCourseCategory } from "@/Modules/Courses/Categories/ApiClient/ApiClient";

type Params = { page: number; pageSize: number; search: string };

type UtilsContextProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  courses: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  courseCategory: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  questionTypes: any;

  courseParams: Params;
  categoryParams: Params;

  setCoursesSearch: (search: string) => void;
  nextCoursesPage: () => void;
  prevCoursesPage: () => void;
  setCoursesPageSize: (pageSize: number) => void;

  setCategoriesSearch: (search: string) => void;
  nextCategoriesPage: () => void;
  prevCategoriesPage: () => void;
  setCategoriesPageSize: (pageSize: number) => void;
  canNextCoursesPage: boolean;
  canPrevCoursesPage: boolean;
};

const UtilsContex = createContext<UtilsContextProps | undefined>(undefined);

export const UtilsContextProvider = ({ children }: { children: ReactNode }) => {
  const [courseParams, setCourseParams] = useState<Params>({
    page: 1,
    pageSize: 10,
    search: "",
  });

  const [categoryParams, setCategoryParams] = useState<Params>({
    page: 1,
    pageSize: 10,
    search: "",
  });

  const { data: Courses } = UseGetCourses(courseParams);
  const { data: CourseCategories } = UseGetCourseCategory(categoryParams);

  const coursesItems = Courses?.items ?? Courses ?? [];
  const coursesTotal = Courses?.total;

  const canPrevCoursesPage = courseParams.page > 1;

  const canNextByTotal =
    typeof coursesTotal === "number"
      ? courseParams.page * courseParams.pageSize < coursesTotal
      : undefined;

  const canNextByItems = Array.isArray(coursesItems)
    ? coursesItems.length === courseParams.pageSize && coursesItems.length > 0
    : false;

  const canNextCoursesPage = canNextByTotal ?? canNextByItems;

  const value = useMemo<UtilsContextProps>(
    () => ({
      courses: Courses,
      courseCategory: CourseCategories,
      questionTypes: {},

      courseParams,
      categoryParams,

      setCoursesSearch: (search) =>
        setCourseParams((p) => ({ ...p, search, page: 1 })),

      nextCoursesPage: () =>
        setCourseParams((p) =>
          canNextCoursesPage ? { ...p, page: p.page + 1 } : p,
        ),

      prevCoursesPage: () =>
        setCourseParams((p) => ({ ...p, page: Math.max(1, p.page - 1) })),

      setCoursesPageSize: (pageSize) =>
        setCourseParams((p) => ({ ...p, pageSize, page: 1 })),

      setCategoriesSearch: (search) =>
        setCategoryParams((p) => ({ ...p, search, page: 1 })),

      nextCategoriesPage: () =>
        setCategoryParams((p) => ({ ...p, page: p.page + 1 })),

      prevCategoriesPage: () =>
        setCategoryParams((p) => ({ ...p, page: Math.max(1, p.page - 1) })),

      setCategoriesPageSize: (pageSize) =>
        setCategoryParams((p) => ({ ...p, pageSize, page: 1 })),

      canNextCoursesPage,
      canPrevCoursesPage,
    }),
    [
      Courses,
      CourseCategories,
      courseParams,
      categoryParams,
      canNextCoursesPage,
      canPrevCoursesPage,
    ],
  );

  return <UtilsContex.Provider value={value}>{children}</UtilsContex.Provider>;
};

export const useUtilsContext = () => {
  const ctx = useContext(UtilsContex);
  if (!ctx)
    throw new Error(
      "Utils context should be used within a utils context provider",
    );
  return ctx;
};
