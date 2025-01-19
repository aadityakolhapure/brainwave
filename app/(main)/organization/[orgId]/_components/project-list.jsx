// components/ProjectList.jsx
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getProjects } from "@/actions/organizations";
import DeleteProject from "./delete-project";

export default async function ProjectList({ orgId }) {
  const projects = await getProjects(orgId);

  if (projects.length === 0) {
    return (
      <div>
        <div
          className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-100"
          role="alert"
        >
          <span className="font-medium">Create a project!</span> No projects
          found.{" "}
        </div>
        <Link
          data-popover-target="popover-animation"
          type="button"
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          href="/project/create"
        >
          Create Project
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((project) => (
        <Card
          key={project.id}
          className="bg-white shadow-md rounded-lg border border-gray-200"
        >
          <CardHeader>
            <CardTitle className="flex justify-between items-center px-3 py-2 bg-white border-b border-gray-300 rounded-t-lg shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-base font-medium text-gray-900 px-2 py-1 bg-gray-100 rounded-full shadow-inner">
                  {project.name}
                </span>
                <span className="text-xs text-gray-500 italic">
                  Active Project
                </span>
              </div>
              <DeleteProject
                projectId={project.id}
                // className="text-red-500 hover:text-red-700 transition duration-300 ease-in-out"
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 mb-4 p-3 bg-gray-100 border-l-4 border-violet-500 rounded-lg shadow-sm">
              {project.description}
            </p>

            {/* <div className="text-sm text-gray-700 mb-4">
              <span className="font-medium text-gray-800">Admin:</span>{" "}
              {project.admin && project.admin.length > 0
                ? project.admin.join(", ")
                : "No members assigned"}
            </div>
            <div className="text-sm text-gray-700 mb-4">
              <span className="font-medium text-gray-800">Members:</span>{" "}
              {project.members && project.members.length > 0
                ? project.members.join(", ")
                : "No members assigned"}
            </div> */}
            <Link
              href={`/project/${project.id}`}
              className="inline-block px-4 py-2 mt-2 text-sm font-medium text-white bg-gradient-to-r from-violet-500 to-indigo-500 rounded-lg shadow-md hover:from-violet-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-violet-400 transition duration-300 ease-in-out"
            >
              View Project
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
