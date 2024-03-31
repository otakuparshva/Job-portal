import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";

// Function to handle job application submission
export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  
  // Check if the user is an employer
  if (role === "Employer") {
    return next(
      new ErrorHandler("Employer not allowed to access this resource.", 400)
    );
  }

  const { name, email, coverLetter, phone, address, jobId } = req.body;

  // Create applicantID object
  const applicantID = {
    user: req.user._id,
    role: "Job Seeker",
  };

  // Check if jobId is provided
  if (!jobId) {
    return next(new ErrorHandler("Job not found!", 404));
  }

  // Retrieve job details from the database
  const jobDetails = await Job.findById(jobId);

  // Check if jobDetails exist
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found!", 404));
  }

  // Create employerID object
  const employerID = {
    user: jobDetails.postedBy,
    role: "Employer",
  };

  // Validate if all required fields are filled
  if (!name || !email || !coverLetter || !phone || !address || !applicantID || !employerID) {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }

  // Create a new application record in the database
  const application = await Application.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    applicantID,
    employerID,
  });

  // Send response indicating successful application submission
  res.status(200).json({
    success: true,
    message: "Application Submitted!",
    application,
  });
});

// Function to retrieve all applications associated with an employer
export const employerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;

  // Check if the user is a job seeker
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }

  const { _id } = req.user;
  
  // Find all applications with the employer's user ID
  const applications = await Application.find({ "employerID.user": _id });

  // Send response with retrieved applications
  res.status(200).json({
    success: true,
    applications,
  });
});

// Function to retrieve all applications associated with a job seeker
export const jobseekerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;

  // Check if the user is an employer
  if (role === "Employer") {
    return next(
      new ErrorHandler("Employer not allowed to access this resource.", 400)
    );
  }

  const { _id } = req.user;
  
  // Find all applications with the job seeker's user ID
  const applications = await Application.find({ "applicantID.user": _id });

  // Send response with retrieved applications
  res.status(200).json({
    success: true,
    applications,
  });
});

// Function to delete a job application by the job seeker
export const jobseekerDeleteApplication = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;

  // Check if the user is an employer
  if (role === "Employer") {
    return next(
      new ErrorHandler("Employer not allowed to access this resource.", 400)
    );
  }

  const { id } = req.params;

  // Find the application by ID
  const application = await Application.findById(id);

  // Check if the application exists
  if (!application) {
    return next(new ErrorHandler("Application not found!", 404));
  }

  // Delete the application
  await application.deleteOne();

  // Send response indicating successful deletion
  res.status(200).json({
    success: true,
    message: "Application Deleted!",
  });
});
