"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JobWithRelations } from "@/types/job";
import { Building2, MapPin, Briefcase, Calendar, Users } from "lucide-react";

interface JobCardProps {
  job: JobWithRelations;
  onApply?: (jobId: string) => void;
  showApplyButton?: boolean;
}

export function JobCard({ job, onApply, showApplyButton = true }: JobCardProps) {
  const router = useRouter();

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleCardClick = () => {
    router.push(`/jobs/${job.id}`);
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleCardClick}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <Building2 className="size-4" />
              {job.company}
            </CardDescription>
          </div>
          {job.salary && (
            <div className="text-right">
              <div className="text-lg font-semibold text-primary">
                {job.salary}
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPin className="size-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Briefcase className="size-4" />
            <span className="capitalize">{job.type}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="size-4" />
            <span>{formatDate(job.createdAt)}</span>
          </div>
          {job._count && (
            <div className="flex items-center gap-1.5">
              <Users className="size-4" />
              <span>{job._count.applications} applications</span>
            </div>
          )}
        </div>

        <p className="text-sm line-clamp-3">{job.description}</p>

        {job.postedBy && (
          <div className="text-xs text-muted-foreground">
            Posted by {job.postedBy.name || job.postedBy.email}
          </div>
        )}
      </CardContent>

      {showApplyButton && onApply && (
        <CardFooter>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onApply(job.id);
            }}
            className="w-full"
          >
            Apply Now
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
