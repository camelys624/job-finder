"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

interface JobFiltersProps {
  onFilterChange: (filters: {
    type?: string;
    location?: string;
    search?: string;
  }) => void;
}

const JOB_TYPES = [
  { value: "all", label: "All Types" },
  { value: "full-time", label: "Full Time" },
  { value: "part-time", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "remote", label: "Remote" },
];

export function JobFilters({ onFilterChange }: JobFiltersProps) {
  const [filters, setFilters] = React.useState({
    type: "all",
    location: "",
    search: "",
  });

  const handleTypeChange = (value: string) => {
    const newFilters = {
      ...filters,
      type: value === "all" ? undefined : value,
    };
    setFilters({ ...filters, type: value });
    onFilterChange(newFilters);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newFilters = {
      ...filters,
      location: value || undefined,
    };
    setFilters({ ...filters, location: value });
    onFilterChange(newFilters);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newFilters = {
      ...filters,
      search: value || undefined,
    };
    setFilters({ ...filters, search: value });
    onFilterChange(newFilters);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 w-6xl">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search jobs by title, company, or description..."
          value={filters.search}
          onChange={handleSearchChange}
          className="pl-10"
        />
      </div>

      <Select value={filters.type} onValueChange={handleTypeChange}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Job Type" />
        </SelectTrigger>
        <SelectContent>
          {JOB_TYPES.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        placeholder="Location"
        value={filters.location}
        onChange={handleLocationChange}
        className="w-full md:w-[200px]"
      />
      <Button onClick={() => {
        setFilters({ type: "all", location: "", search: "" });
        onFilterChange({});
      }}>
        Clear Filters
      </Button>
    </div>
  );
}
