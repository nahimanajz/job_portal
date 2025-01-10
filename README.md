# Jobboard
 This fullstack web application for listing and applying for job,
 you can frontend repository (here)[https://github.com/nahimanajz/jobportal-fe]
## features
- Signin
- Signup as either admin or applicant
- List jobs and applications along with filters and sorting 
- Apply for a job
- Change status to accepted, or reviewed 
- Deleting a candidate application 

## installation Guide
 clone this repository then follow the guidance below
 ```
 cd job_portal/
 cp .env.example .env // fill environment variables shared
 npm install or pnpm install 
 pnpm start:dev
 pnpm prisma:generate
 pnpm prisma:db:seed
 
 ```
## Tools
1. backend

- postgres and prisma ORM
- NestJs
- Typescript
- Node mailer 

2. frontend

- NextJs on frontend
- nextauth
- ReactQuery

# Devnotes

 - This application features are complete  as well as bonus features, however you might due to time I focused a lot on functionality even so, given time I would entirely focus on code quality, removing `any types` as well as on reducing I do on frontend while filtering jobs and application using text fields which are there.
 - Lastly, few feature might not work on deployed version but once tested on local computer they work smoothly this is due to some virtual machines inconveniences that arose while deploying

## Developed by JanvierNahimana
