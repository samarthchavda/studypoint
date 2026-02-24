# 📁 StudyPoint - Project Structure

## 🏗️ Root Directory

```
StudyNotion-main/
│
├── 📂 src/                          # Frontend Source Code
│   ├── 📂 components/               # React Components
│   │   ├── 📂 common/              # Common components (Navbar, Footer)
│   │   ├── 📂 home/                # Home page components
│   │   ├── 📂 catalog/             # Catalog page components
│   │   ├── 📂 course/              # Course related components
│   │   ├── 📂 dashboard/           # Dashboard components
│   │   └── 📂 loginSignup/         # Login/Signup components
│   │
│   ├── 📂 pages/                    # Page Components
│   │   ├── Home.jsx                # Home page
│   │   ├── Login.jsx               # Login page
│   │   ├── Signup.jsx              # Signup page
│   │   ├── Dashboard.jsx           # Dashboard page
│   │   ├── CatalogPage.jsx         # Catalog page
│   │   └── CourseDetails.jsx       # Course details page
│   │
│   ├── 📂 services/                 # API Services
│   │   ├── apis.js                 # API endpoints
│   │   ├── apiConnector.js         # Axios configuration
│   │   └── 📂 operations/          # API operations
│   │       ├── authAPI.js          # Authentication APIs
│   │       ├── courseAPI.js        # Course APIs
│   │       └── profileAPI.js       # Profile APIs
│   │
│   ├── 📂 slices/                   # Redux Slices
│   │   ├── authSlice.js            # Authentication state
│   │   ├── profileSlice.js         # Profile state
│   │   ├── cartSlice.js            # Cart state
│   │   └── courseSlice.js          # Course state
│   │
│   ├── 📂 data/                     # Static Data
│   │   ├── catalog-data.js         # Catalog default data
│   │   └── courses-data.js         # Courses JSON data
│   │
│   ├── 📂 assets/                   # Images, Icons, Videos
│   ├── 📂 utils/                    # Utility Functions
│   ├── App.js                      # Main App Component
│   ├── index.js                    # Entry Point
│   └── store.js                    # Redux Store
│
├── 📂 server/                       # Backend Source Code
│   ├── 📂 controllers/             # Route Controllers
│   │   ├── Auth.js                 # Authentication logic
│   │   ├── Course.js               # Course logic
│   │   ├── Payment.js              # Payment logic
│   │   ├── Profile.js              # Profile logic
│   │   └── Category.js             # Category logic
│   │
│   ├── 📂 models/                   # MongoDB Models
│   │   ├── User.js                 # User schema
│   │   ├── Course.js               # Course schema
│   │   ├── Category.js             # Category schema
│   │   ├── OTP.js                  # OTP schema
│   │   └── Profile.js              # Profile schema
│   │
│   ├── 📂 routes/                   # API Routes
│   │   ├── userRoute.js            # User routes
│   │   ├── courseRoute.js          # Course routes
│   │   ├── paymentRoute.js         # Payment routes
│   │   └── profileRoute.js         # Profile routes
│   │
│   ├── 📂 middlewares/              # Middleware Functions
│   │   ├── auth.js                 # JWT verification
│   │   └── multer.js               # File upload
│   │
│   ├── 📂 config/                   # Configuration Files
│   │   ├── database.js             # MongoDB connection
│   │   └── cloudinary.js           # Cloudinary config
│   │
│   ├── 📂 utils/                    # Utility Functions
│   │   ├── mailSender.js           # Email utility
│   │   └── smsSender.js            # SMS utility
│   │
│   ├── 📂 mail/                     # Email Templates
│   ├── index.js                    # Server Entry Point
│   ├── .env                        # Environment Variables
│   └── package.json                # Server Dependencies
│
├── 📂 public/                       # Static Files
│   ├── index.html                  # HTML Template
│   └── favicon.ico                 # Favicon
│
├── 📂 docs/                         # Documentation
│
├── 📄 .env                          # Frontend Environment (Local)
├── 📄 .env.production               # Frontend Environment (Production)
├── 📄 .gitignore                    # Git Ignore Rules
├── 📄 .vercelignore                 # Vercel Ignore Rules
├── 📄 package.json                  # Frontend Dependencies
├── 📄 vercel.json                   # Vercel Configuration
├── 📄 tailwind.config.js            # Tailwind CSS Config
├── 📄 config-overrides.js           # Webpack Config
├── 📄 README.md                     # Project Documentation
├── 📄 DEMO_ACCOUNTS.md              # Demo Login Credentials
├── 📄 BACKEND_DEMO_CODE.js          # Backend Code for Learning
├── 📄 LICENSE                       # MIT License
└── 📄 PROJECT_CERTIFICATE.html      # Project Certificate
```

## 📱 Frontend Structure (src/)

### Components Organization
```
components/
├── common/              # Reusable components
│   ├── Navbar.jsx      # Navigation bar
│   ├── Footer.jsx      # Footer
│   ├── Spinner.jsx     # Loading spinner
│   └── Button.jsx      # Custom button
│
├── home/               # Home page specific
│   ├── Hero.jsx        # Hero section
│   ├── Features.jsx    # Features section
│   └── Testimonials.jsx
│
├── catalog/            # Catalog page specific
│   ├── CourseCard.jsx  # Course card
│   ├── FilterBar.jsx   # Filter sidebar
│   └── CourseGrid.jsx  # Course grid
│
├── dashboard/          # Dashboard components
│   ├── Sidebar.jsx     # Dashboard sidebar
│   ├── MyProfile.jsx   # Profile view
│   ├── MyCourses.jsx   # Student courses
│   └── InstructorDashboard.jsx
│
└── loginSignup/        # Auth components
    ├── LoginForm.jsx   # Login form
    ├── SignupForm.jsx  # Signup form
    └── OTPInput.jsx    # OTP input
```

### Pages Organization
```
pages/
├── Home.jsx            # Landing page
├── Login.jsx           # Login page
├── Signup.jsx          # Signup page
├── Dashboard.jsx       # Main dashboard
├── CatalogPage.jsx     # Course catalog
├── CourseDetails.jsx   # Course detail view
├── Cart.jsx            # Shopping cart
└── About.jsx           # About page
```

### Redux State Management
```
slices/
├── authSlice.js        # User authentication
├── profileSlice.js     # User profile data
├── cartSlice.js        # Shopping cart
├── courseSlice.js      # Course data
└── viewCourseSlice.js  # Course viewing
```

## 🔧 Backend Structure (server/)

### Controllers (Business Logic)
```
controllers/
├── Auth.js             # Login, Signup, OTP
├── Course.js           # Create, Update, Delete courses
├── Payment.js          # Razorpay integration
├── Profile.js          # User profile management
├── Category.js         # Course categories
└── Rating.js           # Course ratings
```

### Models (Database Schemas)
```
models/
├── User.js             # User data
├── Course.js           # Course data
├── Category.js         # Categories
├── Section.js          # Course sections
├── SubSection.js       # Lectures/videos
├── Profile.js          # Additional user info
├── OTP.js              # OTP verification
└── RatingAndReview.js  # Course reviews
```

### Routes (API Endpoints)
```
routes/
├── userRoute.js        # /api/v1/auth/*
├── courseRoute.js      # /api/v1/course/*
├── paymentRoute.js     # /api/v1/payment/*
└── profileRoute.js     # /api/v1/profile/*
```

## 🔐 Environment Variables

### Frontend (.env)
```env
REACT_APP_BASE_URL=http://localhost:4000/api/v1
REACT_APP_RAZORPAY_KEY=your_key
```

### Backend (server/.env)
```env
PORT=4000
MONGODB_URL=your_mongodb_url
JWT_SECRET=your_secret
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email
MAIL_PASS=your_password
CLOUDNAME=your_cloudinary_name
APIKEY=your_cloudinary_key
APISECRET=your_cloudinary_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_phone
```

## 📦 Key Dependencies

### Frontend
- **React** - UI Library
- **Redux Toolkit** - State Management
- **React Router** - Routing
- **Axios** - HTTP Client
- **Tailwind CSS** - Styling
- **React Hook Form** - Form Handling
- **React Hot Toast** - Notifications

### Backend
- **Express** - Web Framework
- **MongoDB + Mongoose** - Database
- **JWT** - Authentication
- **Bcrypt** - Password Hashing
- **Nodemailer** - Email Service
- **Twilio** - SMS Service
- **Cloudinary** - File Storage
- **Razorpay** - Payment Gateway

## 🚀 How It Works

### User Flow
```
1. User visits website (Home.jsx)
2. Browses courses (CatalogPage.jsx)
3. Views course details (CourseDetails.jsx)
4. Signs up/Login (Signup.jsx/Login.jsx)
5. Adds to cart (Cart.jsx)
6. Makes payment (Payment API)
7. Accesses course (Dashboard.jsx)
```

### Data Flow
```
Frontend (React)
    ↓
API Call (Axios)
    ↓
Backend Routes (Express)
    ↓
Controllers (Business Logic)
    ↓
Models (MongoDB)
    ↓
Database (MongoDB Atlas)
```

## 📝 Important Files

| File | Purpose |
|------|---------|
| `src/App.js` | Main React component with routes |
| `src/store.js` | Redux store configuration |
| `server/index.js` | Express server entry point |
| `server/config/database.js` | MongoDB connection |
| `vercel.json` | Vercel deployment config |
| `package.json` | Dependencies and scripts |

## 🎨 Styling

- **Tailwind CSS** - Utility-first CSS framework
- **Custom Components** - Reusable styled components
- **Responsive Design** - Mobile-first approach

## 🔒 Security

- JWT tokens for authentication
- Bcrypt for password hashing
- Environment variables for secrets
- CORS protection
- Input validation

---

**આ structure સમજવા માટે સરળ છે અને professional પણ છે!** 🎉
