export interface Job {
  _id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salaryRange: {
    min: number;
    max: number;
  };
  type: string;
  createdAt: string;
}
