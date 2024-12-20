export interface JobApplication {
  applicant: string; // MongoDB ObjectId represented as a string
  coverLetter: string;
  createdAt: string; // ISO 8601 date string
  job: {
    salaryRange: {
      min: number;
      max: number;
    };
    _id: string; // MongoDB ObjectId represented as a string
    title: string;
    description: string;
    user: string; // MongoDB ObjectId represented as a string
  };
  resume: string; // URL string
  status: string;
  //  "APPLIED" | "REJECTED" | "SHORTLISTED"; // Example of possible statuses
  updatedAt: string; // ISO 8601 date string
  __v: number;
  _id: string; // MongoDB ObjectId represented as a string
}
