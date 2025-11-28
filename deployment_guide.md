# Deployment Guide - School Health & Activity Platform

Since this project is a **Monorepo** using TurboRepo, deploying the Next.js application (`apps/web`) requires specific configuration.

## Option 1: Vercel (Recommended)
Vercel is the creators of Next.js and TurboRepo, making it the easiest way to deploy.

### Steps:
1.  **Push your code to GitHub/GitLab/Bitbucket**.
2.  **Log in to Vercel** and click "Add New Project".
3.  **Import your repository**.
4.  **Configure Project**:
    *   **Framework Preset**: Next.js
    *   **Root Directory**: Click `Edit` and select `apps/web`.
    *   **Build Command**: `cd ../.. && npx turbo run build --filter=web...`
    *   **Output Directory**: `.next` (Default).
    *   **Install Command**: `npm install` (Default).

> [!IMPORTANT]
> **Fix for "No Output Directory named 'public'" Error**:
> I have added a `vercel.json` file to `apps/web` to explicitly tell Vercel this is a Next.js project.
> Ensure your **Root Directory** in Vercel is set to `apps/web`.

5.  **Environment Variables**:
    *   Add `DATABASE_URL` (Connection string to your production PostgreSQL database).
    *   Add `NEXTAUTH_SECRET` (if/when authentication is implemented).
6.  Click **Deploy**.

## Option 2: Docker / Self-Hosted
You can containerize the application for deployment on any cloud provider (AWS, Google Cloud, DigitalOcean).

### 1. Build & Run with Docker Compose
I have created a `Dockerfile` and `docker-compose.yml` in the root directory.

To start the application:
```bash
docker-compose up --build -d
```
The app will be available at `http://localhost:3000`.

### 2. Manual Docker Build
If you prefer to build the image manually:

```bash
# Build the image
docker build -t shp-web .

# Run the container
docker run -p 3000:3000 shp-web
```

### 3. Environment Variables
Uncomment the `DATABASE_URL` line in `docker-compose.yml` or pass it via `-e` in `docker run` to connect to your production database.

## Database Deployment
You will need a hosted PostgreSQL database.
*   **Supabase**: Excellent free tier, easy setup.
*   **Neon**: Serverless Postgres, scales to zero.
*   **AWS RDS / Google Cloud SQL**: Managed standard options.

After setting up the database, remember to run migrations:
```bash
npx turbo run db:push
```
