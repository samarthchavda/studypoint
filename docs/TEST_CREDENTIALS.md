# 🔐 Test Account Credentials

## ⚠️ Important Notice

**These are test accounts for development and testing purposes only.**  
**DO NOT use these credentials in production!**  
**Change all passwords before deploying to production environment.**

---

## 👨‍💼 Admin Account

### Admin User
- **Name**: Admin User
- **Email**: `admin@studynotion.com`
- **Password**: `Admin@123`
- **Account Type**: Admin
- **Permissions**: Full platform access, user management, analytics, content moderation

**Usage**: Login to access admin dashboard, manage users, categories, and view platform statistics.

---

## 👨‍🏫 Instructor Accounts

All instructor accounts use the same password for easy testing.

### Instructor 1 - Priya Sharma
- **Name**: Priya Sharma
- **Email**: `priya.sharma@studynotion.com`
- **Password**: `Instructor@123`
- **Specialization**: Full Stack Web Development
- **Bio**: Senior Full Stack Developer with 8+ years of experience in web technologies. Specialized in React, Node.js, and modern JavaScript frameworks.
- **Teaches**: 
  - Complete Web Development Bootcamp
  - React JS - The Complete Guide

### Instructor 2 - Rahul Verma
- **Name**: Rahul Verma
- **Email**: `rahul.verma@studynotion.com`
- **Password**: `Instructor@123`
- **Specialization**: Mobile App Development
- **Bio**: Mobile App Development Expert with 10+ years in iOS and Android development. Built 50+ apps for Fortune 500 companies.
- **Teaches**: 
  - Flutter & Dart - Complete Guide
  - React Native - Build Mobile Apps

### Instructor 3 - Anjali Patel
- **Name**: Anjali Patel
- **Email**: `anjali.patel@studynotion.com`
- **Password**: `Instructor@123`
- **Specialization**: Data Science & AI
- **Bio**: Data Scientist and AI Researcher with PhD in Machine Learning. Published 20+ research papers.
- **Teaches**: 
  - Data Science Masterclass
  - Machine Learning A-Z

### Instructor 4 - Vikram Singh
- **Name**: Vikram Singh
- **Email**: `vikram.singh@studynotion.com`
- **Password**: `Instructor@123`
- **Specialization**: Software Engineering & Programming
- **Bio**: Software Engineer and Programming Educator with 12+ years in enterprise software development. Expert in Java, Python, and software architecture.
- **Teaches**: 
  - Python Programming Masterclass
  - Java Programming Complete Course

---

## 👨‍🎓 Student Accounts

All student accounts use the same password for easy testing.

### Student 1 - Priya Sharma
- **Name**: Priya Sharma
- **Email**: `priya.sharma@student.com`
- **Password**: `Student@123`
- **Account Type**: Student

### Student 2 - Rahul Patel
- **Name**: Rahul Patel
- **Email**: `rahul.patel@student.com`
- **Password**: `Student@123`
- **Account Type**: Student

### Student 3 - Ananya Desai
- **Name**: Ananya Desai
- **Email**: `ananya.desai@student.com`
- **Password**: `Student@123`
- **Account Type**: Student

### Student 4 - Vikram Singh
- **Name**: Vikram Singh
- **Email**: `vikram.singh@student.com`
- **Password**: `Student@123`
- **Account Type**: Student

### Student 5 - Sneha Reddy
- **Name**: Sneha Reddy
- **Email**: `sneha.reddy@student.com`
- **Password**: `Student@123`
- **Account Type**: Student

### Student 6 - Arjun Kumar
- **Name**: Arjun Kumar
- **Email**: `arjun.kumar@student.com`
- **Password**: `Student@123`
- **Account Type**: Student

### Student 7 - Meera Iyer
- **Name**: Meera Iyer
- **Email**: `meera.iyer@student.com`
- **Password**: `Student@123`
- **Account Type**: Student

### Student 8 - Rohan Gupta
- **Name**: Rohan Gupta
- **Email**: `rohan.gupta@student.com`
- **Password**: `Student@123`
- **Account Type**: Student

---

## 📋 Quick Reference Table

### All Accounts Summary

| Role | Email | Password | Count |
|------|-------|----------|-------|
| **Admin** | admin@studynotion.com | `Admin@123` | 1 |
| **Instructor** | *.sharma/verma/patel/singh@studynotion.com | `Instructor@123` | 4 |
| **Student** | various@student.com | `Student@123` | 8 |

---

## 🔑 Password Summary

For quick reference during testing:

```
Admin Password:      Admin@123
Instructor Password: Instructor@123
Student Password:    Student@123
```

---

## 🚀 How to Create These Accounts

These accounts are created automatically when you run the database seeding scripts:

```bash
# Navigate to server directory
cd server

# Run the main seeder (creates all accounts)
npm run seed

# Or create specific accounts:
node scripts/createAdmin.js
node scripts/createMultipleInstructors.js
node scripts/createProperCoursesAndStudents.js
```

---

## 🧪 Testing Scenarios

### Admin Testing
1. Login as admin
2. Access admin dashboard
3. View platform statistics
4. Manage users and categories
5. Moderate content

### Instructor Testing
1. Login as any instructor
2. Create/edit/delete courses
3. Add sections and subsections
4. Upload course materials
5. View student enrollments
6. Check course analytics

### Student Testing
1. Login as any student
2. Browse course catalog
3. Enroll in courses
4. Track progress
5. Leave ratings and reviews
6. Complete course content

---

## 🔒 Security Notes

### For Development
- ✅ Use these test accounts freely
- ✅ Share with your development team
- ✅ Reset database anytime with seeding scripts

### For Production
- ❌ **Never** use these credentials
- ❌ **Never** commit `.env` files with real credentials
- ✅ Use strong, unique passwords
- ✅ Enable 2FA for admin accounts
- ✅ Implement password policies
- ✅ Regular security audits

---

## 🛠️ Troubleshooting

### Can't Login?
1. Ensure database is running
2. Check if accounts are created: `node scripts/createAdmin.js`
3. Verify password is correct (case-sensitive)
4. Clear browser cache/cookies
5. Check backend logs for errors

### Reset All Accounts
```bash
# Drop database and recreate
mongo studynotion --eval "db.dropDatabase()"

# Re-run seeder
cd server
npm run seed
```

---

## 📞 Need Help?

If you encounter issues with test accounts:

1. Check `docs/SETUP.md` for environment setup
2. Verify MongoDB is running
3. Check server logs in `server/logs/`
4. Ensure all environment variables are set correctly

---

## 📝 Notes

- All passwords follow the pattern: `[Role]@123`
- Profile pictures are auto-generated using DiceBear API
- Student accounts have randomized course enrollments
- Instructor accounts are pre-assigned to courses
- Admin account has full unrestricted access

---

**Last Updated**: January 2, 2026  
**Environment**: Development/Testing  
**Status**: Active

---

## 🎯 Quick Copy Credentials

### Admin Login
```
Email: admin@studynotion.com
Password: Admin@123
```

### Instructor Login (Any)
```
Email: priya.sharma@studynotion.com
Password: Instructor@123
```

### Student Login (Any)
```
Email: priya.sharma@student.com
Password: Student@123
```

---

> ⚠️ **Remember**: These are test credentials. Always use secure passwords in production!
