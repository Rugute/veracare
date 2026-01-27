export {};

declare global {
  module "*.css";

  interface ApiParams {
    page: number;
    pageSize: number;
    search: string;
  }
}
