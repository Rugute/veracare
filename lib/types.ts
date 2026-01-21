//import { Units } from "@prisma/client";

export interface Company {

  id: number | string;
  name: string;
  status: string;
  license: string;
  logo: string | null;
  location: string;
  address: string;
  email: string;
  phone: string;
  website: string;
}

export interface SMTP {
  id: number | string;
  name: string;
  protocals: string;
  port: string;
  password: string;
  host: string;
  email: string;
  debug: boolean;
  auth: boolean;
  sslEnabled: boolean;
  companyId: string;
  company: Company;

}
export interface JwtPayload {
  userId: number;
  email?: string;
  role?: string;
}
