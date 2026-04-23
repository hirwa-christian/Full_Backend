export interface UserAttributes {
  name: string;
  email: string;
  password: string;
  role?: "ADMIN" | "TEACHER" | "STUDENT";
}
