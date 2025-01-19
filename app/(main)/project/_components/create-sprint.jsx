"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
// import { CalendarIcon } from "@heroicons/react/outline";
// import { DayPicker } from "react-day-picker"; // assuming you're using react-day-picker

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format, addDays } from "date-fns";

import { sprintSchema } from "@/app/lib/validators";
import useFetch from "@/hooks/use-fetch";
import { createSprint } from "@/actions/sprints";

export default function SprintCreationForm({
  projectTitle,
  projectKey,
  projectId,
  sprintKey,
}) {
  const [showForm, setShowForm] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: addDays(new Date(), 14),
  });
  const router = useRouter();

  const { loading: createSprintLoading, fn: createSprintFn } =
    useFetch(createSprint);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(sprintSchema),
    defaultValues: {
      name: `${projectKey}-${sprintKey}`,
      startDate: dateRange.from,
      endDate: dateRange.to,
    },
  });

  const onSubmit = async (data) => {
    await createSprintFn(projectId, {
      ...data,
      startDate: dateRange.from,
      endDate: dateRange.to,
    });
    setShowForm(false);
    router.refresh(); // Refresh the page to show updated data
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-700 via-purple-800 to-blue-900 bg-clip-text text-transparent">
          {projectTitle}
        </h1>
        <Button
          className="mt-2 px-6 py-2 text-white font-semibold rounded-lg shadow-md transition-colors hover:bg-red-600 bg-violet-500"
          onClick={() => setShowForm(!showForm)}
          variant={!showForm ? "default" : "destructive"}
        >
          {!showForm ? "Create New Sprint" : "Cancel"}
        </Button>
      </div>

      {showForm && (
        <Card className="bg-white shadow-xl rounded-lg p-6 mb-6">
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
            >
              {/* Sprint Name */}
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700 mb-2"
                >
                  Sprint Name
                </label>
                <Input
                  id="name"
                  {...register("name")}
                  readOnly
                  className="border border-gray-300 rounded-md px-4 py-2 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="Enter sprint name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Sprint Duration */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">
                  Sprint Duration
                </label>
                <Controller
                  control={control}
                  name="dateRange"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={`w-full text-left font-normal rounded-md px-4 py-2 bg-gray-100 text-black focus:outline-none ${
                            !dateRange && "text-gray-500"
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-5 w-5 " />
                          {dateRange.from && dateRange.to ? (
                            format(dateRange.from, "LLL dd, y") +
                            " - " +
                            format(dateRange.to, "LLL dd, y")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto bg-black rounded-lg shadow-lg p-4 text-white">
                        <DayPicker
                          classNames={{
                            chevron: "fill-violet-500", // Retaining the violet color for the chevron
                            range_start: "bg-violet-600", // Darker background for the start of the range
                            range_end: "bg-violet-600", // Darker background for the end of the range
                            range_middle: "bg-violet-400", // Lighter violet for the middle of the range
                            day_button: "border-none text-white", // Light text color for the day buttons
                            today: "border-2 border-violet-500 text-violet-500", // Highlight today with a violet border and text
                            selected: "bg-violet-500 text-white", // Selected days will have a solid violet background with white text
                          }}
                          mode="range"
                          disabled={[{ before: new Date() }]} // Disable dates before today
                          selected={dateRange}
                          onSelect={(range) => {
                            if (range?.from && range?.to) {
                              setDateRange(range);
                              field.onChange(range);
                            }
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="mt-4 bg-violet-500 text-white font-medium rounded-lg px-6 py-2 hover:bg-violet-600 focus:ring-4 focus:ring-violet-300"
                disabled={createSprintLoading}
              >
                {createSprintLoading ? "Creating..." : "Create Sprint"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
}
