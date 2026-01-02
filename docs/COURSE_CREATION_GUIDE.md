# Course Creation & Design Guide

## Quick Overview

Create courses in StudyNotion with a simple 3-step process: **Design → Add Details → Publish**

## Step 1: Design Your Course Structure

```
Course
├── Basic Info (Title, Description, Price, Category)
├── Section 1
│   ├── Lecture 1 (Video/Content)
│   ├── Lecture 2 (Video/Content)
│   └── Lecture 3 (Video/Content)
├── Section 2
│   ├── Lecture 1
│   └── Lecture 2
└── Requirements & Instructions
```

## Step 2: Add Course Details

### Required Information:
1. **Course Name** - Clear, descriptive title
2. **Description** - What students will learn
3. **Price** - Set amount (or 0 for free)
4. **Category** - Select from available categories
5. **Thumbnail** - Course image (upload)
6. **Tags** - For search optimization
7. **Requirements** - Prerequisites for students
8. **Instructions** - What's included in course

### Course Sections:
- Add multiple sections (modules/chapters)
- Each section can have multiple subsections (lectures)

### Subsections (Lectures):
- Upload video content
- Add lecture title and description
- Set video duration (auto-detected)

## Step 3: Access the Course Creator

### For Instructors:

**Navigate to:**
```
Dashboard → My Courses → Add Course
```

**Or directly:** `/dashboard/add-course`

### UI Fields to Fill:

```javascript
1. Course Information
   - Course Title
   - Short Description
   - Price (₹)
   - Category (Dropdown)
   - Tags
   - Thumbnail (Image Upload)
   - Requirements (Bullet points)
   - Instructions (What you'll get)

2. Course Builder
   - Create Section
     ├── Section Name
     └── Add Lecture
         ├── Lecture Title
         ├── Lecture Description
         └── Video Upload

3. Publish
   - Review & Publish Course
```

## Quick Example

```yaml
Course Title: "React Complete Guide"
Description: "Master React from basics to advanced"
Price: ₹2999
Category: "Web Development"
Thumbnail: [Upload Image]

Section 1: "Getting Started"
  - Lecture 1: "Introduction to React"
  - Lecture 2: "Setting up Environment"
  
Section 2: "Components & Props"
  - Lecture 1: "Understanding Components"
  - Lecture 2: "Props in React"

Requirements:
  - Basic JavaScript knowledge
  - HTML & CSS basics

Instructions:
  - 10+ hours of video
  - Downloadable resources
  - Certificate of completion
```

## Components Used

The course creation flow uses these components:

```
src/components/dashboard/
├── addCourse/
│   ├── AddCourse.jsx           # Main form
│   ├── CourseInformation.jsx   # Step 1: Basic details
│   ├── CourseBuilder.jsx       # Step 2: Sections & lectures
│   └── PublishCourse.jsx       # Step 3: Review & publish
```

## API Endpoints

```javascript
POST /api/v1/course/createCourse        // Create new course
POST /api/v1/course/createSection       // Add section
POST /api/v1/course/createSubSection    // Add lecture/video
PUT  /api/v1/course/updateCourse        // Update course details
POST /api/v1/course/getInstructorCourses // Get my courses
```

## File Uploads

**Video Upload:**
- Cloudinary handles video storage
- Automatic quality optimization
- Duration auto-detected

**Image Upload:**
- Thumbnail images stored in Cloudinary
- Recommended size: 1280x720px
- Max file size: 5MB

## Tips for Good Course Design

✅ **Do:**
- Use clear, descriptive titles
- Break content into small lectures (5-15 min)
- Add multiple sections for better organization
- Include practical examples
- Set realistic requirements

❌ **Don't:**
- Create very long lectures (>30 min)
- Skip course descriptions
- Upload low-quality videos
- Forget to add thumbnails

## Course Status Flow

```
Draft → Review → Published → Active
```

- **Draft** - Course being created
- **Published** - Live on platform
- **Active** - Students can enroll

## Quick Start Commands

```bash
# Start development server
npm start

# Navigate to course creation
# Login as Instructor → Dashboard → My Courses → Add Course
```

## Notes

- Only **Instructors** can create courses
- **Students** can only view and enroll
- **Admin** can manage all courses
- Videos are processed after upload (may take 2-3 min)
- Free courses: Set price to 0
