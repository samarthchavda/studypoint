# 📂 StudyNotion Project Structure

```
StudyNotion-main/
│
├── 📁 src/                          # Frontend React Application
│   ├── 📁 components/               # Reusable UI components
│   │   ├── common/                  # Shared components (Button, Input, Modal)
│   │   ├── core/                    # Core feature components
│   │   └── Dashboard/               # Dashboard-specific components
│   │
│   ├── 📁 pages/                    # Page components (Route level)
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Catalog.jsx
│   │   └── ViewCourse.jsx
│   │
│   ├── 📁 services/                 # API integration layer
│   │   ├── operations/              # API calls by feature
│   │   └── apiConnector.js          # Axios configuration
│   │
│   ├── 📁 slices/                   # Redux state management
│   │   ├── authSlice.js             # Authentication state
│   │   ├── profileSlice.js          # User profile state
│   │   ├── courseSlice.js           # Course state
│   │   └── cartSlice.js             # Shopping cart state
│   │
│   ├── 📁 reducer/                  # Redux store setup
│   │   └── index.js
│   │
│   ├── 📁 hooks/                    # Custom React hooks
│   │   └── useOnClickOutside.js
│   │
│   ├── 📁 data/                     # Static data & constants
│   │   ├── homepage-explore.js
│   │   └── dashboard-links.js
│   │
│   ├── 📁 utils/                    # Utility functions
│   │   ├── dateFormatter.js
│   │   └── constants.js
│   │
│   ├── 📁 assets/                   # Static media files
│   │   ├── Images/
│   │   └── Logo/
│   │
│   ├── App.js                       # Main application component
│   ├── App.css                      # Global styles
│   ├── index.js                     # Application entry point
│   └── index.css                    # Base CSS
│
├── 📁 server/                       # Backend Node.js/Express API
│   │
│   ├── 📁 config/                   # Configuration files
│   │   ├── database.js              # MongoDB connection
│   │   ├── cloudinary.js            # Cloudinary setup
│   │   └── razorPay.js              # Razorpay configuration
│   │
│   ├── 📁 controllers/              # Business logic handlers
│   │   ├── auth.js                  # Authentication (login, signup, OTP)
│   │   ├── courseCon.js             # Course CRUD operations
│   │   ├── payment.js               # Payment processing
│   │   ├── profileCon.js            # User profile management
│   │   ├── sectionCon.js            # Course sections
│   │   ├── subSection.js            # Course lectures/videos
│   │   ├── categoryCon.js           # Course categories
│   │   ├── ratingAndReview.js       # Course reviews
│   │   ├── courseProgress.js        # Track student progress
│   │   └── contactUs.js             # Contact form handler
│   │
│   ├── 📁 models/                   # Database schemas
│   │   ├── User.js                  # User model
│   │   ├── Profile.js               # User profile model
│   │   ├── Course.js                # Course model
│   │   ├── Section.js               # Course section model
│   │   ├── SubSection.js            # Lecture/video model
│   │   ├── Category.js              # Course category model
│   │   ├── CourseProgress.js        # Progress tracking model
│   │   ├── RatingAndReview.js       # Review model
│   │   ├── OTP.js                   # OTP verification model
│   │   └── ContactForm.js           # Contact form model
│   │
│   ├── 📁 routes/                   # API endpoint definitions
│   │   ├── userRoute.js             # User & auth routes
│   │   ├── courseRoute.js           # Course management routes
│   │   ├── paymentRoute.js          # Payment routes
│   │   ├── profileRoute.js          # Profile routes
│   │   └── adminRoute.js            # Admin routes
│   │
│   ├── 📁 middlewares/              # Express middlewares
│   │   └── auth.js                  # JWT verification & role checks
│   │
│   ├── 📁 mail/                     # Email templates
│   │   └── templates/
│   │       ├── emailVerification.js
│   │       └── courseEnrollment.js
│   │
│   ├── 📁 utils/                    # Backend utilities
│   │   ├── imageUploader.js         # Cloudinary upload helper
│   │   └── mailSender.js            # Email sending utility
│   │
│   ├── 📁 scripts/                  # Database seeding scripts
│   │   ├── runSeeder.js             # Main seeder runner
│   │   ├── createAdmin.js           # Create admin account
│   │   ├── createFreeCourse.js      # Create free sample course
│   │   ├── createSampleCourses.js   # Create demo courses
│   │   └── createMultipleInstructors.js
│   │
│   ├── 📁 seedData/                 # Sample data for seeding
│   │
│   ├── 📁 logs/                     # Server log files
│   │
│   ├── index.js                     # Server entry point
│   ├── package.json                 # Backend dependencies
│   └── .env                         # Backend environment variables
│
├── 📁 public/                       # Static frontend assets
│   ├── index.html                   # HTML template
│   └── robots.txt                   # SEO robots file
│
├── 📁 docs/                         # Project documentation
│   ├── SETUP.md                     # Setup instructions
│   ├── STRUCTURE.md                 # Project structure guide
│   └── API.md                       # API documentation
│
├── .env                             # Frontend environment variables
├── .gitignore                       # Git ignore rules
├── package.json                     # Frontend dependencies
├── tailwind.config.js               # Tailwind CSS configuration
├── config-overrides.js              # React app overrides
├── LICENSE                          # MIT License
└── README.md                        # Project overview
```

## 🎯 Key Directories Explained

### Frontend (`src/`)
- **components/**: Modular, reusable UI components organized by feature
- **pages/**: Top-level route components that compose smaller components
- **services/**: API integration layer with axios
- **slices/**: Redux Toolkit state management
- **hooks/**: Custom React hooks for shared logic
- **utils/**: Helper functions and constants

### Backend (`server/`)
- **config/**: Third-party service configurations
- **controllers/**: Business logic for API requests
- **models/**: MongoDB schemas using Mongoose
- **routes/**: API endpoint definitions
- **middlewares/**: Request processing (auth, validation)
- **scripts/**: Database initialization and seeding
- **utils/**: Helper functions for backend operations

### Documentation (`docs/`)
- **SETUP.md**: Complete installation guide
- **STRUCTURE.md**: Detailed folder structure explanation
- **API.md**: Comprehensive API reference

## 🔄 Data Flow

```
User Action (Browser)
    ↓
React Component
    ↓
Redux Action
    ↓
API Service (Axios)
    ↓
Express Route
    ↓
Controller
    ↓
Model (Mongoose)
    ↓
MongoDB Database
    ↓
Response → Redux Store → Component → UI Update
```

## 🚀 Quick Navigation

- **Add new page**: `src/pages/`
- **Create component**: `src/components/`
- **Add API call**: `src/services/operations/`
- **Add backend route**: `server/routes/`
- **Create controller**: `server/controllers/`
- **Define model**: `server/models/`
- **Configure env**: `.env` and `server/.env`

## 📝 Naming Conventions

- **Components**: PascalCase (e.g., `CourseCard.jsx`)
- **Files**: camelCase (e.g., `dateFormatter.js`)
- **Folders**: lowercase (e.g., `components/`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Routes**: kebab-case (e.g., `/api/v1/get-user-details`)
