"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import MDEditor from "@uiw/react-md-editor";
import UserAvatar from "./user-avatar";
import useFetch from "@/hooks/use-fetch";
import { useOrganization, useUser } from "@clerk/nextjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarLoader } from "react-spinners";
import { ExternalLink } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import statuses from "@/data/status";
import { deleteIssue, updateIssue } from "@/actions/issues";

const priorityOptions = ["LOW", "MEDIUM", "HIGH", "URGENT"];

export default function IssueDetailsDialog({
  isOpen,
  onClose,
  issue,
  onDelete = () => {},
  onUpdate = () => {},
  borderCol = "",
}) {
  const [status, setStatus] = useState(issue.status);
  const [priority, setPriority] = useState(issue.priority);
  const { user } = useUser();
  const { membership } = useOrganization();
  const router = useRouter();
  const pathname = usePathname();

  const {
    loading: deleteLoading,
    error: deleteError,
    fn: deleteIssueFn,
    data: deleted,
  } = useFetch(deleteIssue);

  const {
    loading: updateLoading,
    error: updateError,
    fn: updateIssueFn,
    data: updated,
  } = useFetch(updateIssue);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this issue?")) {
      deleteIssueFn(issue.id);
    }
  };

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    updateIssueFn(issue.id, { status: newStatus, priority });
  };

  const handlePriorityChange = async (newPriority) => {
    setPriority(newPriority);
    updateIssueFn(issue.id, { status, priority: newPriority });
  };

  useEffect(() => {
    if (deleted) {
      onClose();
      onDelete();
    }
    if (updated) {
      onUpdate(updated);
    }
  }, [deleted, updated, deleteLoading, updateLoading]);

  const canChange =
    user.id === issue.reporter.clerkUserId || membership.role === "org:admin";

  const handleGoToProject = () => {
    router.push(`/project/${issue.projectId}?sprint=${issue.sprintId}`);
  };

  const isProjectPage = !pathname.startsWith("/project/");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white shadow-lg rounded-xl p-6 border border-gray-300">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-2xl font-semibold text-gray-800">
            {issue.title}
          </DialogTitle>
          {isProjectPage && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleGoToProject}
              title="Go to Project"
            >
              <ExternalLink className="h-5 w-5 text-gray-500" />
            </Button>
          )}
        </DialogHeader>
        {(updateLoading || deleteLoading) && (
          <BarLoader width={"100%"} color="#36d7b7" className="mt-2" />
        )}
        <div className="mt-4 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="w-full">
              <h4 className="text-sm text-gray-600">Status</h4>
              <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-full border-gray-300">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((option) => (
                    <SelectItem key={option.key} value={option.key}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full">
              <h4 className="text-sm text-gray-600">Priority</h4>
              <Select
                value={priority}
                onValueChange={handlePriorityChange}
                disabled={!canChange}
              >
                <SelectTrigger
                  className={`w-full border ${borderCol} rounded border-gray-300`}
                >
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700">Description</h4>
            <MDEditor.Markdown
              className="bg-gray-50 p-4 rounded-md text-sm text-gray-800"
              source={issue.description ? issue.description : "--"}
            />
          </div>
          <div className="flex justify-between gap-4">
            <div className="w-full">
              <h4 className="font-semibold text-gray-700">Assignee</h4>
              <UserAvatar user={issue.assignee} />
            </div>
            <div className="w-full">
              <h4 className="font-semibold text-gray-700">Reporter</h4>
              <UserAvatar user={issue.reporter} />
            </div>
          </div>
          {canChange && (
            <Button
              onClick={handleDelete}
              disabled={deleteLoading}
              variant="destructive"
              className="w-full"
            >
              {deleteLoading ? "Deleting..." : "Delete Issue"}
            </Button>
          )}
          {(deleteError || updateError) && (
            <p className="text-sm text-red-500 mt-2">
              {deleteError?.message || updateError?.message}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
