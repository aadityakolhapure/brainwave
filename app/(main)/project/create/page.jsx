"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useOrganization, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch";
import { projectSchema } from "@/app/lib/validators";
import { createProject } from "@/actions/projects";
import { BarLoader } from "react-spinners";
import OrgSwitcher from "@/components/org-switcher";

export default function CreateProjectPage() {
  const router = useRouter();
  const { isLoaded: isOrgLoaded, membership } = useOrganization();
  const { isLoaded: isUserLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    if (isOrgLoaded && isUserLoaded && membership) {
      setIsAdmin(membership.role === "org:admin");
    }
  }, [isOrgLoaded, isUserLoaded, membership]);

  const {
    loading,
    error,
    data: project,
    fn: createProjectFn,
  } = useFetch(createProject);

  const onSubmit = async (data) => {
    if (!isAdmin) {
      alert("Only organization admins can create projects");
      return;
    }

    createProjectFn(data);
  };

  useEffect(() => {
    if (project) router.push(`/project/${project.id}`);
  }, [loading]);

  if (!isOrgLoaded || !isUserLoaded) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col gap-2 items-center">
        <span className="text-2xl bg-gradient-to-r from-indigo-700 via-purple-800 to-blue-900 bg-clip-text text-transparent">
          Oops! Only Admins can create projects.
        </span>
        <OrgSwitcher />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-4xl md:text-6xl text-center font-bold mb-8 bg-gradient-to-r from-purple-500 via-violet-600 to-blue-500 bg-clip-text text-transparent">
        Create New Project
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-6 md:p-8 space-y-6 text-gray-900"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Project Name
          </label>
          <Input
            id="name"
            {...register("name")}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-violet-400 focus:outline-none"
            placeholder="Enter project name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="key"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Project Key
          </label>
          <Input
            id="key"
            {...register("key")}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-violet-400 focus:outline-none"
            placeholder="Ex: RCYT"
          />
          {errors.key && (
            <p className="text-red-500 text-sm mt-1">{errors.key.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Project Description
          </label>
          <Textarea
            id="description"
            {...register("description")}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-violet-400 focus:outline-none h-28 resize-none"
            placeholder="Enter a brief project description"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {loading && (
          <div className="w-full">
            <BarLoader width={"100%"} color="#7c3aed" />
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="w-full bg-violet-500 hover:bg-violet-600 text-white font-medium rounded-md py-2 px-4 transition duration-300"
        >
          {loading ? "Creating..." : "Create Project"}
        </Button>

        {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
      </form>
    </div>
  );
}
