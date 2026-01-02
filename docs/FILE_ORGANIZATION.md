# 🗂️ File Organization Guide

## 📊 What Was Cleaned Up

### Summary Statistics
- **Removed**: 60+ unnecessary files
- **Organized**: All documentation into `docs/` folder
- **Retained**: Only essential project files
- **Created**: 4 comprehensive documentation files

---

## 🎯 Current Project Organization

### Root Level (Clean & Minimal)
```
StudyNotion-main/
├── 📄 .env                        # Frontend environment config
├── 📄 .gitignore                  # Git ignore rules
├── 📄 LICENSE                     # MIT License
├── 📄 README.md                   # Project overview & quick start
├── 📄 PROJECT_STRUCTURE.md        # Visual structure guide
├── 📄 CLEANUP_SUMMARY.md          # This cleanup documentation
├── 📄 package.json                # Frontend dependencies
├── 📄 package-lock.json           # Dependency lock file
├── 📄 tailwind.config.js          # Tailwind CSS config
├── 📄 config-overrides.js         # React app overrides
├── 📁 src/                        # Frontend source code
├── 📁 server/                     # Backend source code
├── 📁 public/                     # Static assets
└── 📁 docs/                       # 📚 All documentation
    ├── SETUP.md                   # Installation guide
    ├── STRUCTURE.md               # Structure details
    └── API.md                     # API reference
```

---

## 📚 Documentation Structure

All documentation is now centralized in the `docs/` folder:

### 1. **README.md** (Root)
- Project overview
- Key features
- Tech stack
- Quick start guide
- Links to detailed docs

### 2. **docs/SETUP.md**
- Prerequisites
- Installation steps
- Environment configuration
- Database setup
- Troubleshooting
- Default admin credentials

### 3. **docs/STRUCTURE.md**
- Complete folder structure
- Frontend organization
- Backend organization
- File naming conventions
- Development workflow

### 4. **docs/API.md**
- All API endpoints
- Request/response formats
- Authentication details
- Error codes
- Usage examples

### 5. **PROJECT_STRUCTURE.md** (Root)
- Visual project tree
- Quick navigation guide
- Data flow diagram
- Naming conventions

---

## 🗂️ Frontend Structure (`src/`)

```
src/
├── components/         # Reusable UI components
│   ├── common/        # Shared (Button, Input, Modal)
│   ├── core/          # Core features
│   └── Dashboard/     # Dashboard components
│
├── pages/             # Route-level pages
├── services/          # API calls
├── slices/            # Redux state
├── reducer/           # Redux store
├── hooks/             # Custom hooks
├── data/              # Static data
├── utils/             # Helper functions
├── assets/            # Images & media
│
├── App.js             # Main component
├── App.css            # Global styles
├── index.js           # Entry point
└── index.css          # Base styles
```

---

## 🗂️ Backend Structure (`server/`)

```
server/
├── config/            # Configurations
│   ├── database.js    # MongoDB
│   ├── cloudinary.js  # File storage
│   └── razorPay.js    # Payments
│
├── controllers/       # Business logic
│   ├── auth.js
│   ├── courseCon.js
│   ├── payment.js
│   └── ...
│
├── models/           # Database schemas
│   ├── User.js
│   ├── Course.js
│   └── ...
│
├── routes/           # API routes
│   ├── userRoute.js
│   ├── courseRoute.js
│   └── ...
│
├── middlewares/      # Auth & validation
├── mail/             # Email templates
├── utils/            # Helper functions
│
├── scripts/          # Database seeding
│   ├── runSeeder.js
│   ├── createAdmin.js
│   └── ...
│
├── seedData/         # Sample data
├── logs/             # Server logs
│
├── index.js          # Server entry
├── package.json      # Backend deps
└── .env              # Backend config
```

---

## 🔍 How to Find Things

### Want to...

**Add a new page?**
→ Create in `src/pages/`

**Create a reusable component?**
→ Add to `src/components/common/`

**Add an API call?**
→ Create in `src/services/operations/`

**Add backend route?**
→ Define in `server/routes/`

**Create database model?**
→ Add to `server/models/`

**Write business logic?**
→ Implement in `server/controllers/`

**Configure environment?**
→ Edit `.env` (frontend) or `server/.env` (backend)

**Check API endpoints?**
→ Read `docs/API.md`

**Understand structure?**
→ Read `docs/STRUCTURE.md`

**Setup project?**
→ Follow `docs/SETUP.md`

---

## 🗑️ What Was Removed

### Redundant Documentation (Consolidated)
- Multiple setup guides → `docs/SETUP.md`
- Multiple structure docs → `docs/STRUCTURE.md`
- Admin guides → Integrated into main docs
- Quick start files → Consolidated in README

### Development Files (Not Needed)
- Test scripts (test*.js)
- Debug scripts (debug*.js)
- Fix scripts (fix*.js)
- Check scripts (check*.js)
- Update scripts (update*.js)
- Verify scripts (verify*.js)
- Cleanup scripts (cleanup*.js)

### Build Artifacts
- `build/` folder (regenerate with `npm run build`)

### Temporary Files
- `improvements.txt`
- Development notes

### Shell Scripts
- PM2 management scripts
- MongoDB start scripts
- Server restart scripts

**Total**: 60+ files removed for cleaner structure

---

## 🎯 What's Retained

### Essential Code
✅ All source code (`src/`, `server/`)
✅ Configuration files
✅ Dependencies (package.json)

### Essential Scripts
✅ Database seeding scripts (7 files)
✅ Build & run scripts

### Essential Documentation
✅ README.md
✅ LICENSE
✅ Complete docs folder

---

## 📖 Reading Order for New Developers

1. **Start**: `README.md` - Get project overview
2. **Setup**: `docs/SETUP.md` - Install and configure
3. **Structure**: `PROJECT_STRUCTURE.md` - Visual overview
4. **Details**: `docs/STRUCTURE.md` - Deep dive into folders
5. **API**: `docs/API.md` - Backend integration reference

---

## 💡 Benefits of New Structure

### Before Cleanup
- ❌ 24 files in root directory
- ❌ 56 scripts (mostly unused)
- ❌ Documentation scattered
- ❌ Confusing for new developers
- ❌ Hard to maintain

### After Cleanup
- ✅ 12 files in root (clean!)
- ✅ 7 essential scripts only
- ✅ Documentation organized
- ✅ Easy to understand
- ✅ Professional structure

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install
cd server && npm install && cd ..

# Setup environment
# Edit .env and server/.env

# Seed database (optional)
cd server && npm run seed && cd ..

# Start development
# Terminal 1:
cd server && npm run dev

# Terminal 2:
npm start
```

---

## 📝 File Naming Conventions

- **React Components**: PascalCase (`CourseCard.jsx`)
- **JavaScript Files**: camelCase (`apiConnector.js`)
- **Folders**: lowercase (`components/`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **API Routes**: kebab-case (`/api/v1/get-courses`)
- **CSS Files**: kebab-case (`course-card.css`)

---

## 🔐 Important Files (Don't Delete!)

### Root
- `.env` - Frontend configuration
- `package.json` - Dependencies
- `tailwind.config.js` - Styling config
- `config-overrides.js` - Build config

### Server
- `server/.env` - Backend secrets
- `server/package.json` - Backend deps
- `server/index.js` - Server entry

### Documentation
- All files in `docs/` folder
- `README.md`
- `PROJECT_STRUCTURE.md`

---

## 📞 Need Help?

1. **Setup Issues**: Check `docs/SETUP.md`
2. **Structure Questions**: Read `docs/STRUCTURE.md`
3. **API Questions**: See `docs/API.md`
4. **General Questions**: Start with `README.md`

---

**Last Updated**: January 2, 2026
**Maintained By**: Chavda Samarth, Ansh Sangani
