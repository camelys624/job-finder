"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { JobWithRelations } from "@/types/job";
import {
  Building2,
  MapPin,
  Briefcase,
  Calendar,
  Users,
  ArrowLeft,
  DollarSign,
} from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [job, setJob] = useState<JobWithRelations & { hasApplied?: boolean } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [applying, setApplying] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const [jobId, setJobId] = useState<string | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      setJobId(resolvedParams.id);
    });
  }, [params]);

  useEffect(() => {
    if (!jobId) return;

    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/jobs/${jobId}`);

        if (!response.ok) {
          if (response.status === 404) {
            setError("Job not found");
          } else {
            setError("Failed to load job details");
          }
          return;
        }

        const data = await response.json();
        setJob(data);
      } catch (err) {
        console.error("Error fetching job:", err);
        setError("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleApply = async () => {
    if (!session?.user) {
      toast.error("Please sign in to apply for this job");
      router.push("/auth/signin");
      return;
    }

    setApplying(true);
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId: job?.id,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.message || "Failed to apply for job");
        return;
      }

      setJob((prev) => prev ? { ...prev, hasApplied: true } : null);
      toast.success("Application submitted successfully!");
    } catch (error) {
      console.error("Error applying for job:", error);
      toast.error("Failed to apply for job");
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-8">
        <Skeleton className="h-10 w-32 mb-6" />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-6" />
            <div className="flex flex-wrap gap-4">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-32" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Skeleton className="h-6 w-24 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <Skeleton className="h-12 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="container max-w-4xl py-8">
        <Button
          variant="ghost"
          onClick={() => router.push("/jobs")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Jobs
        </Button>
        <Alert variant="destructive">
          <AlertDescription>{error || "Job not found"}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Button
        variant="ghost"
        onClick={() => router.push("/jobs")}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Jobs
      </Button>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div className="flex-1">
              <CardTitle className="text-3xl mb-3">{job.title}</CardTitle>
              <CardDescription className="flex items-center gap-2 text-lg">
                <Building2 className="h-5 w-5" />
                {job.company}
              </CardDescription>
            </div>
            {job.salary && (
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                  <DollarSign className="h-4 w-4" />
                  <span>Salary</span>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {job.salary}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span className="font-medium">{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              <span className="capitalize font-medium">{job.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>Posted {formatDate(job.createdAt)}</span>
            </div>
            {job._count && (
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>{job._count.applications} applications</span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Job Description</h3>
            <div className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {job.description}
            </div>
          </div>

          {job.postedBy && (
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">Posted By</h3>
              <div className="text-sm text-muted-foreground">
                {job.postedBy.name || job.postedBy.email}
              </div>
            </div>
          )}

          <div className="border-t pt-4">
            {job.hasApplied ? (
              <Alert>
                <AlertDescription className="text-center">
                  You have already applied for this position
                </AlertDescription>
              </Alert>
            ) : (
              <Button
                onClick={handleApply}
                disabled={applying}
                className="w-full"
                size="lg"
              >
                {applying ? "Submitting..." : "Apply for this Position"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
