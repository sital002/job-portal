import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

const applyJobSchema = z.object({
  coverLetter: z
    .string()
    .min(2, "Cover letter must be at least 2 characters long")
    .max(1024, "Cover letter must be at most 1024 characters long"),
  resume: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, `Max file size is 5MB.`)
    .refine(
      (file) =>
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type),
      "Only .pdf, .doc and .docx formats are supported."
    ),
});

type FormData = z.infer<typeof applyJobSchema>;

export default function JobApplicationForm({ jobId }: { jobId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(applyJobSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    console.log(jobId);
    try {
      const formData = new FormData();
      formData.append("coverLetter", data.coverLetter);
      formData.append("resume", data.resume);

      //   const response = await axios.post(`/api/jobs/apply/${jobId}`, formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data'
      //     }
      //   })

      setSubmitSuccess(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setSubmitError(
          error.response.data.message ||
            "An error occurred while submitting your application."
        );
      } else {
        setSubmitError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Apply for Job</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="resume"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Resume (PDF, DOC, or DOCX, max 5MB)
          </label>
          <input
            type="file"
            id="resume"
            accept=".pdf,.doc,.docx"
            {...register("resume")}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {errors.resume && (
            <p className="mt-1 text-sm text-red-600">{errors.resume.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="coverLetter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Cover Letter
          </label>
          <textarea
            id="coverLetter"
            rows={6}
            {...register("coverLetter")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="Enter your cover letter here..."
          />
          {errors.coverLetter && (
            <p className="mt-1 text-sm text-red-600">
              {errors.coverLetter.message}
            </p>
          )}
        </div>

        {submitError && (
          <div className="text-red-600 text-sm">{submitError}</div>
        )}

        {submitSuccess && (
          <div className="text-green-600 text-sm">
            Your application has been submitted successfully!
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}
