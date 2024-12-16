import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import useSingleJob from "../../hooks/useSingleJob";
import useEditJobMutation from "../../hooks/useUpdateJobs";
import { JobFormValues, jobSchema } from "./job-form";

export default function EditJobForm() {
  const { jobId } = useParams();
  const {
    data: job,
    isLoading,
    error,
  } = useSingleJob(jobId as string, "RECRUITER");
  console.log(job);

  const { mutate: updateJob, isPending: isUpdatePending } = useEditJobMutation(
    jobId as string
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: job?.title as string,
      jobType: job?.type as
        | "full-time"
        | "part-time"
        | "contract"
        | "internship",
      description: job?.description as string,
      company: job?.company as string,
      location: job?.location as string,
      salary: {
        min: job?.salaryRange.min as number,
        max: job?.salaryRange.max as number,
      },
    },
    values: job as unknown as JobFormValues,
  });

  async function onSubmit(data: JobFormValues) {
    console.log("job id is balalaa fro  recruiter", data);
    updateJob(data);
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Job Title
        </label>
        <input
          type="text"
          id="title"
          {...register("title")}
          className="mt-1 block w-full rounded-md border-2 border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="jobType"
          className="block text-sm font-medium text-gray-700"
        >
          Job Type
        </label>
        <select
          id="jobType"
          {...register("jobType")}
          className="mt-1 block w-full rounded-md border-2 border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
        </select>
        {errors.jobType && (
          <p className="mt-1 text-sm text-red-600">{errors.jobType.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Job Description
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="mt-1 block w-full rounded-md border-2 border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          rows={4}
        ></textarea>
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-gray-700"
        >
          Company
        </label>
        <input
          type="text"
          id="company"
          {...register("company")}
          className="mt-1 block w-full rounded-md border-2 border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.company && (
          <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700"
        >
          Location
        </label>
        <input
          type="text"
          id="location"
          {...register("location")}
          className="mt-1 block w-full rounded-md border-2 border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.location && (
          <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="salaryMin"
          className="block text-sm font-medium text-gray-700"
        >
          Minimum Salary
        </label>
        <input
          type="number"
          id="salaryMin"
          {...register("salary.min", { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-2 border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.salary?.min && (
          <p className="mt-1 text-sm text-red-600">
            {errors.salary.min.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="salaryMax"
          className="block text-sm font-medium text-gray-700"
        >
          Maximum Salary
        </label>
        <input
          type="number"
          id="salaryMax"
          {...register("salary.max", { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-2 border-gray-300 bg-gray-50 px-3 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.salary?.max && (
          <p className="mt-1 text-sm text-red-600">
            {errors.salary.max.message}
          </p>
        )}
      </div>

      <button
        disabled={isUpdatePending}
        type="submit"
        className="w-full py-2 px-4 border-2 border-blue-500 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {isUpdatePending ? "Editing..." : "Edit"}
      </button>
    </form>
  );
}
