# 🚀 MERN Stack Deployment Guide

## 📋 Pre-Deployment Checklist

### ✅ Application Preparation
- [ ] All environment variables configured
- [ ] Database connection string updated for production
- [ ] API endpoints updated to production URLs
- [ ] Security headers implemented
- [ ] Error handling implemented
- [ ] Logging configured
- [ ] Tests passing
- [ ] Build process working

### ✅ Services Setup
- [ ] MongoDB Atlas cluster created
- [ ] Backend hosting platform account (Render/Railway/Heroku)
- [ ] Frontend hosting platform account (Vercel/Netlify)
- [ ] GitHub repository ready
- [ ] Domain name configured (optional)

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new project

### Step 2: Create Database Cluster
1. Click "Build a Database"
2. Choose "M0 Sandbox" (Free tier)
3. Select your preferred cloud provider and region
4. Name your cluster (e.g., "mern-production")

### Step 3: Configure Database Access
1. Create database user:
   - Username: `admin` (or your preferred username)
   - Password: Generate secure password
   - Database User Privileges: Read and write to any database

2. Configure network access:
   - Add IP address: `0.0.0.0/0` (Allow access from anywhere)
   - Or add specific IP addresses for better security

### Step 4: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with your database name (e.g., `production_db`)

## 🖥️ Backend Deployment (Render)

### Step 1: Prepare Backend
1. Ensure your `server/package.json` has the correct start script:
   ```json
   {
     "scripts": {
       "start": "node src/index.js"
     }
   }
   ```

2. Create `render.yaml` in project root (already created)

### Step 2: Deploy to Render
1. Go to [Render](https://render.com/)
2. Sign up/login with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure settings:
   - **Name**: `mern-backend-yourname`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Step 3: Configure Environment Variables
Add these environment variables in Render dashboard:
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/production_db
JWT_SECRET=your_super_secure_jwt_secret_key_here
CORS_ORIGIN=https://your-frontend-domain.vercel.app
ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
```

### Step 4: Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete
3. Test your API at: `https://your-backend-name.onrender.com/health`

## 🌐 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend
1. Update `client/.env.production`:
   ```
   REACT_APP_API_URL=https://your-backend-name.onrender.com/api
   REACT_APP_ENVIRONMENT=production
   ```

2. Test build locally:
   ```bash
   cd client
   npm run build
   ```

### Step 2: Deploy to Vercel
1. Go to [Vercel](https://vercel.com/)
2. Sign up/login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Configure settings:
   - **Framework Preset**: Create React App
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### Step 3: Configure Environment Variables
Add in Vercel dashboard:
```
REACT_APP_API_URL=https://your-backend-name.onrender.com/api
REACT_APP_ENVIRONMENT=production
```

### Step 4: Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Test your application at: `https://your-project-name.vercel.app`

## 🔄 CI/CD Setup (GitHub Actions)

### Step 1: Configure Repository Secrets
Go to your GitHub repository → Settings → Secrets and Variables → Actions

Add these secrets:
```
# Vercel (Frontend)
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id

# Render (Backend)
RENDER_API_KEY=your_render_api_key
RENDER_SERVICE_ID=your_service_id

# Application URLs (for testing)
BACKEND_URL=https://your-backend-name.onrender.com
REACT_APP_API_URL=https://your-backend-name.onrender.com/api
```

### Step 2: Enable GitHub Actions
The workflow files are already created in `.github/workflows/`:
- `frontend-ci-cd.yml`: Frontend testing and deployment
- `backend-ci-cd.yml`: Backend testing and deployment

Push to your `main` branch to trigger the first deployment.

## 📊 Monitoring Setup

### Step 1: Application Monitoring
1. **Health Check**: Your app has `/health` endpoint
2. **Error Tracking**: Configure Sentry (optional)
   ```bash
   # Add to server environment variables
   SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
   ```

### Step 2: Uptime Monitoring
1. Sign up for [UptimeRobot](https://uptimerobot.com/) (free)
2. Add monitors for:
   - Frontend: `https://your-project-name.vercel.app`
   - Backend: `https://your-backend-name.onrender.com/health`

## 🔧 Post-Deployment

### Verify Deployment
1. **Frontend**: Visit your Vercel URL
2. **Backend**: Test API endpoints
3. **Database**: Verify data operations work
4. **Authentication**: Test login/register flow

### Performance Optimization
1. **Frontend**:
   - Enable caching in Vercel
   - Optimize images
   - Use lazy loading
   
2. **Backend**:
   - Enable compression
   - Implement database indexing
   - Use connection pooling

### Security Checklist
- [ ] HTTPS enabled on both frontend and backend
- [ ] CORS properly configured
- [ ] Environment variables secure
- [ ] Database access restricted
- [ ] Rate limiting enabled
- [ ] Security headers implemented

## 🚨 Troubleshooting

### Common Issues

#### Build Failures
- Check Node.js version compatibility
- Verify all dependencies are listed in package.json
- Ensure environment variables are set

#### Database Connection Issues
- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Ensure database user has proper permissions

#### CORS Errors
- Verify CORS_ORIGIN environment variable
- Check allowed origins configuration
- Ensure frontend URL is correct

#### 404 Errors on Refresh
- Configure redirects for SPA routing
- Ensure proper build configuration

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 🎯 Success Criteria

Your deployment is successful when:
- [ ] Frontend application loads and functions correctly
- [ ] Backend API responds to requests
- [ ] Database operations work (create, read, update, delete)
- [ ] Authentication flow works end-to-end
- [ ] CI/CD pipeline runs successfully
- [ ] Monitoring is active and reporting

---

🎉 **Congratulations!** Your MERN application is now deployed and accessible to the world!
