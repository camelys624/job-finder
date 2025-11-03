"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { toast } from "sonner"
import { useRouter } from "next/navigation";


const PostJobPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    setLoading(true);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setLoading(false);
      if (response.ok) {
        // Handle successful post creation (e.g., redirect or show a success message)
        toast.success("Job posted successfully!")
        router.push("/jobs");
      } else {
        // Handle errors (e.g., show an error message)
        toast.error("Failed to post the job. Please try again.")
      }
    } catch (error) {
      console.error("An error occurred while posting the job:", error);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-3xl">
      <form onSubmit={handleSubmit}>
        <FieldSet>
          <FieldLegend>Post a Job</FieldLegend>
          <FieldDescription>
            Fill in the details below to post a new job opening
          </FieldDescription>

          <FieldGroup>
            {/* Job Title */}
            <Field>
              <FieldLabel htmlFor="title">
                Job Title <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="title"
                name="title"
                placeholder="e.g. Senior Frontend Developer"
                required
              />
            </Field>

            {/* Company */}
            <Field>
              <FieldLabel htmlFor="company">
                Company <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="company"
                name="company"
                placeholder="e.g. Tech Company Inc."
                required
              />
            </Field>

            {/* Location */}
            <Field>
              <FieldLabel htmlFor="location">
                Location <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="location"
                name="location"
                placeholder="e.g. San Francisco, CA or Remote"
                required
              />
            </Field>

            {/* Job Type */}
            <Field>
              <FieldLabel htmlFor="type">
                Job Type <span className="text-destructive">*</span>
              </FieldLabel>
              <Select name="type" required>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            {/* Salary */}
            <Field>
              <FieldLabel htmlFor="salary">
                Salary <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="salary"
                name="salary"
                required
                placeholder="e.g. $80,000 - $120,000"
              />
            </Field>

            {/* Description */}
            <Field>
              <FieldLabel htmlFor="description">Job Description</FieldLabel>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the role, responsibilities, and requirements..."
                className="min-h-[200px]"
              />
            </Field>

            {/* Action Buttons */}
            <Field orientation="horizontal">
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={loading}
              >
                Post Job
              </Button>
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                disabled={loading}
              >
                Save as Draft
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  );
};

export default PostJobPage;
