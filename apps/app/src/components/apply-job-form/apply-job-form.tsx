import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useApplyJob } from "../../hooks/useApplyJob";
import { useState } from "react";

const applyJobSchema = z.object({
  coverLetter: z
    .string()
    .min(2, "Cover letter must be at least 2 characters long"),
});

type FormData = z.infer<typeof applyJobSchema>;

export default function JobApplicationForm({
  jobId,
  setShow,
}: {
  jobId: string;

  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(applyJobSchema),
  });

  const {
    mutate: applyJobMutation,
    isPending,
    error,
    isSuccess,
  } = useApplyJob(jobId);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const maxFileSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(selectedFile.type)) {
        setFileError(
          "Invalid file type. Please upload a PDF, DOC, or DOCX file."
        );
        return;
      }

      if (selectedFile.size > maxFileSize) {
        setFileError("File size exceeds 5MB. Please upload a smaller file.");
        return;
      }

      setFile(selectedFile);
    }
  };

  const onSubmit = async (data: FormData) => {
    console.log(jobId);
    try {
      const formData = new FormData();
      formData.append("coverLetter", data.coverLetter);
      if (file) {
        formData.append("resume", file);
      } else {
        setFileError("Please upload a resume.");
      }

      applyJobMutation(formData);
    } catch (error) {
      console.error("Failed to apply for job:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex gap-3 items-center justify-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Apply for Job</h2>
        <span
          onClick={() => setShow(false)}
          className="bg-red-400  px-4 py-3 cursor-pointer"
        >
          X
        </span>
      </div>
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
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {file && <p>{file.name}</p>}
          {fileError && (
            <p className="mt-1 text-sm text-red-600">{fileError}</p>
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

        {error && <div className="text-red-600 text-sm">{error.message}</div>}

        {isSuccess && (
          <div className="text-green-600 text-sm">
            Your application has been submitted successfully!
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isPending ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}
