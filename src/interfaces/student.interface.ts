export interface StudentsAttributes {
  registration_date: Date;
  student_id: number;
  first_name?: string;
  last_name?: string;
  country: string;
  linked_msisdn: string;
  email_address?: string;
  dateofbirth?: Date;
  gender: "male" | "female";
}
