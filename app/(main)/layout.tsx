import { AuthContextProvided } from "@/context/AuthContext";
import { getCurrentUser } from "@/lib/auth";
import Header from "@/Modules/Home/Header";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  const user = getCurrentUser();
  return (
    <AuthContextProvided initialUser={user} initialAuth={!!user}>
      <Header showSearch={true} />
      {children}
    </AuthContextProvided>
  );
};

export default layout;
