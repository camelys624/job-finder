"use client";
import { JobCard } from "@/components/job-card";
import { JobFilters } from "@/components/job-filters";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

const JobsPage = () => {
  const [jobs, setJobs] = useState([{}, {}, {}, {}, {}]);
  const [loading, setLoading] = useState(true);
  const handleFilterChange = (filters: {
    type?: string;
    location?: string;
    search?: string;
  }) => {
    setLoading(true);
    // Handle the filter changes, e.g., fetch filtered job listings
    fetch(
      `/api/jobs?type=${
        filters.type ? (filters.type === "all" ? "" : filters.type) : ""
      }&location=${filters.location || ""}&search=${filters.search || ""}`
    )
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    // Initial fetch of jobs without filters
    fetch(`/api/jobs`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setJobs(data);
      });
  }, []);

  return (
    <div className="container flex flex-col items-center">
      <JobFilters onFilterChange={handleFilterChange} />
      <div className="w-full mt-8 flex flex-col gap-6">
        {jobs.map((job: any) =>
          loading ? (
            <Card className="flex flex-col space-y-3 rounded-lg p-6">
              <Skeleton className="h-6 w-full rounded-xl" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-[550px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </Card>
          ) : (
            <JobCard key={job.id} job={job} />
          )
        )}
      </div>
    </div>
  );
};

export default JobsPage;
