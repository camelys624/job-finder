import { Job, User } from "@/app/generated/prisma";

export type JobWithRelations = Job & {
  postedBy: Pick<User, "id" | "name" | "email" | "image">;
  _count?: {
    applications: number;
  };
};

export type JobFormData = {
  title: string;
  description: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
};

export type JobFilterParams = {
  type?: string;
  location?: string;
  search?: string;
};
