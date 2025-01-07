Full-Stack Developer Challenge:  Job Portal with Dashboard

Task Overview:  

Build a small job portal with the following core features:

Authentication
Job Listings (with filtering, pagination, and sorting)
Dashboard (with graphs to visualize job-related statistics )

You have 1 week to complete this challenge. The goal is to assess your ability to develop both frontend and backend features, integrate graphs, handle data efficiently, and ensure the application is scalable and maintainable

Challenge Requirements:

1. User Authentication:
Implement a login feature where users can log in using their credentials.
Jobs should be visible to anyone (public), but users must have an account to apply for jobs.


2. Job Listings:
Display a list of jobs on the homepage.
Each job listing should have the following attributes: Title, Category, Location, Date Posted, and Description.
Implement pagination to show only a limited number of jobs per page (e.g., 10 jobs per page).
Allow sorting of jobs by Title, Date Posted, and Location.
Add filters for job listings, allowing users to filter by Category, Location, and Date Posted (e.g., filter by the past week, past month).


3. Job Applications:
Users should be able to apply for jobs (must be logged in).
Each application should include the following details: User Info, Job Title, Date Applied, and Status (Pending, Reviewed, Accepted).
Implement pagination for job applications in the admin view (e.g., show 10 applications per page).
Allow sorting of applications by Date Applied, Status, and User.
Implement filters for applications (e.g., filter by Status or Date Range).

4. Admin Operations:
Create: Admins can create applications manually (if needed).
Read: Admins can view all applications (with pagination, sorting, and filtering).
Update: Admins can update the status of an application (e.g., change it from Pending to Reviewed or Accepted).
Delete: Admins can delete any application.


4. Dashboard with Graphs:
The dashboard should display graphs to visualize job-related statistics. 
Job Applications Over Time 
Job Listings by Category 
Job Applications by Location 
Implement pagination, sorting, and filtering on the job listings and job applications pages.



5. Backend:
Set up the database to store job listings, job applications, and user information. You can use PostgreSQL or MongoDB.
Implement the necessary API endpoints to support functionalities


6. Frontend:
Create a clean, responsive frontend using React.js or Next.js.
Design the UI to be simple but intuitive, with easy-to-use filters, sorting options, and pagination.


7. Deployment:
Deploy the application on a platform like Heroku, Netlify, or Vercel. 

Bonus Points:
Implement a search feature to search job listings by title or description.
Integrate email notifications for users when their application status changes (e.g., accepted or rejected).
Use Docker to containerize the application.





