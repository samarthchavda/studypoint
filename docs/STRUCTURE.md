# 📁 Project Structure

## Root Directory

```
StudyNotion-main/
├── src/                    # Frontend React application
├── server/                 # Backend Node.js/Express API
├── public/                 # Static files for frontend
├── docs/                   # Project documentation
├── .gitignore             # Git ignore rules
├── .env                   # Frontend environment variables
├── package.json           # Frontend dependencies
├── tailwind.config.js     # Tailwind CSS configuration
├── config-overrides.js    # React app configuration overrides
├── LICENSE                # Project license
└── README.md              # Project overview
```

## Frontend Structure (`src/`)

```
src/
├── components/            # Reusable React components
│   ├── common/           # Shared components (buttons, inputs, modals)
│   ├── core/             # Core feature components
│   └── Dashboard/        # Dashboard-specific components
│
├── pages/                # Page components (routes)
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Dashboard.jsx
│   └── ...
│
├── services/             # API service functions
│   ├── operations/       # API calls organized by feature
│   └── apiConnector.js   # Axios instance configuration
│
├── slices/               # Redux Toolkit slices
│   ├── authSlice.js
│   ├── profileSlice.js
│   ├── courseSlice.js
│   └── ...
│
├── reducer/              # Redux store configuration
│   └── index.js
│
├── data/                 # Static data and constants
│   ├── homepage-explore.js
│   └── dashboard-links.js
│
├── hooks/                # Custom React hooks
│   └── useOnClickOutside.js
│
├── utils/                # Utility functions
│   ├── dateFormatter.js
│   └── constants.js
│
├── assets/               # Images, icons, and media files
│   ├── Images/
│   └── Logo/
│
├── App.js                # Main App component
├── App.css               # Global styles
├── index.js              # Entry point
└── index.css             # Base styles
```

## Backend Structure (`server/`)

```
server/
├── config/               # Configuration files
│   ├── database.js      # MongoDB connection
│   ├── cloudinary.js    # Cloudinary setup
│   └── razorPay.js      # Razorpay configuration
│
├── controllers/          # Request handlers
│   ├── auth.js          # Authentication logic
│   ├── courseCon.js     # Course operations
│   ├── payment.js       # Payment processing
│   ├── profileCon.js    # User profile management
│   └── ...
│
├── models/              # MongoDB schemas
│   ├── User.js
│   ├── Course.js
│   ├── Category.js
│   ├── Section.js
│   ├── SubSection.js
│   └── ...
│
├── routes/              # API route definitions
│   ├── userRoute.js     # User & auth routes
│   ├── courseRoute.js   # Course routes
│   ├── paymentRoute.js  # Payment routes
│   └── ...
│
├── middlewares/         # Express middlewares
│   └── auth.js          # JWT verification, role checks
│
├── mail/                # Email templates
│   └── templates/
│       ├── emailVerification.js
│       └── courseEnrollment.js
│
├── utils/               # Utility functions
│   ├── imageUploader.js
│   ├── mailSender.js
│   └── ...
│
├── scripts/             # Database seeding scripts
│   ├── createAdmin.js
│   ├── createFreeCourse.js
│   ├── createSampleCourses.js
│   └── runSeeder.js     # Main seeder script
│
├── seedData/            # Sample data for seeding
│
├── logs/                # Server logs
│
├── .env                 # Backend environment variables
├── .gitignore          # Backend-specific ignore rules
├── package.json        # Backend dependencies
└── index.js            # Server entry point
```

## Key Directories Explained

### Frontend (`src/`)

- **components/**: Modular, reusable UI components organized by feature
- **pages/**: Top-level route components that compose smaller components
- **services/**: API integration layer using axios
- **slices/**: Redux state management (user, cart, courses, etc.)
- **hooks/**: Custom React hooks for shared logic

### Backend (`server/`)

- **config/**: Third-party service configurations (DB, Cloud, Payment)
- **controllers/**: Business logic for handling API requests
- **models/**: Data structures and database schemas
- **routes/**: API endpoint definitions and routing
- **middlewares/**: Request processing (auth, validation, error handling)
- **scripts/**: Database initialization and seeding utilities

## Environment Files

Both frontend and backend require `.env` files:
- **Root `.env`**: Frontend API URLs and config
- **server/.env`**: Database, JWT, mail, cloud, payment credentials

See `docs/SETUP.md` for required environment variables.

## Important Files

- **package.json**: Dependencies and scripts for frontend/backend
- **tailwind.config.js**: Tailwind CSS theming and configuration
- **config-overrides.js**: Custom webpack configuration for React
- **.gitignore**: Excludes node_modules, .env, build files

## Development Workflow

1. Start MongoDB
2. Run backend: `cd server && npm run dev`
3. Run frontend: `npm start` (from root)
4. Access at: `http://localhost:3000`

For detailed setup instructions, see `docs/SETUP.md`.
