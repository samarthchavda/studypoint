# Cart/Wishlist Functionality Guide

## What is Add to Cart?

The "Add to Wishlist" feature allows students to save courses they're interested in before purchasing. It acts as a shopping cart where you can:
- Browse and collect courses
- Review them later
- Purchase multiple courses together

## How It Works

### User Flow:

```
1. Student views course → 2. Click "Add to Wishlist" → 3. Course saved → 4. Go to Cart → 5. Buy Now
```

### Button States:

- **Not in cart:** Shows "Add to Wishlist" button
- **Already in cart:** Shows "Remove from Wishlist" button
- **Already purchased:** Shows "Go To Course" button

## Technical Implementation

### Frontend (Redux)

**Location:** `src/slices/cartSlice.js`

**State Management:**
```javascript
Cart State:
├── items: []           // Array of courses
├── totalItems: 0       // Count of courses
└── total: 0            // Total price (₹)
```

**Actions:**
- `addItem()` - Add course to cart
- `removeItem()` - Remove course from cart
- `resetCart()` - Clear all items (after purchase)

### Storage

**LocalStorage Keys:**
```javascript
localStorage:
├── items       // Course objects array
├── total       // Total price
└── totalItems  // Number of courses
```

## Add to Cart Process

### Step 1: Click "Add to Wishlist"
```javascript
// Checks:
1. User must be logged in
2. User must be Student (not Instructor)
3. Course not already in cart
```

### Step 2: Course Added
```javascript
// Actions:
1. Course added to Redux store
2. Saved to localStorage
3. Toast notification shown
4. Button changes to "Remove from Wishlist"
```

### Step 3: View Cart
```
Navigate to: Cart Icon (top-right) → View all saved courses
```

### Step 4: Purchase
```
Click "Buy Now" → Payment Gateway → Course enrolled
```

## Key Features

✅ **Persistent Storage** - Cart saved in localStorage (survives page refresh)  
✅ **Real-time Updates** - Button changes based on cart status  
✅ **Duplicate Prevention** - Can't add same course twice  
✅ **Price Calculation** - Auto-calculates total price  
✅ **Quick Access** - Cart icon shows item count  

## User Restrictions

| User Type | Can Add to Cart? | Reason |
|-----------|-----------------|---------|
| Student | ✅ Yes | Primary use case |
| Instructor | ❌ No | Can't buy courses |
| Admin | ❌ No | Can't enroll in courses |
| Guest (Not logged in) | ❌ No | Must login first |

## Code Flow

```javascript
CourseInfoPage.jsx
    ↓
addToCart() function
    ↓
Validates user (logged in + student)
    ↓
dispatch(addItem(course))
    ↓
cartSlice.js → addItem reducer
    ↓
Updates state + localStorage
    ↓
Shows toast notification
```

## Cart Page Features

**Location:** `/dashboard/cart` or Cart Icon

**Functions:**
- View all saved courses
- Remove individual courses
- See total price
- Buy single course or all at once
- Empty cart after purchase

## Example Usage

```javascript
// Add to cart
const addToCart = () => {
  if (!user) {
    toast.error("Please login to add items to wishlist");
    return;
  }
  if (user?.accountType === "INSTRUCTOR") {
    toast.error("Instructors cannot add courses to wishlist");
    return;
  }
  dispatch(addItem(course));
  toast.success("Added to wishlist successfully!");
};

// Remove from cart
dispatch(removeItem({ _id: courseId }));

// Clear cart (after purchase)
dispatch(resetCart());
```

## Benefits

1. **Save for Later** - Bookmark interesting courses
2. **Compare Courses** - Review multiple courses together
3. **Bulk Purchase** - Buy multiple courses at once
4. **Price Tracking** - See total cost before checkout
5. **Flexible Shopping** - Add/remove anytime

## Important Notes

- Cart is client-side only (not saved on server)
- Clears after successful purchase
- Free courses don't need cart (direct enroll)
- Cart persists across browser sessions
- Maximum items: No limit

## Quick Commands

```bash
# View cart in Redux DevTools
State → cart → items

# Clear cart (browser console)
localStorage.removeItem('items')
localStorage.removeItem('total')
localStorage.removeItem('totalItems')
```

## Related Components

```
src/
├── slices/cartSlice.js              # Redux logic
├── components/
│   └── courseInfo/CourseBuyCard.jsx # Add to cart button
└── pages/
    ├── CourseInfoPage.jsx           # Course details
    └── Cart.jsx                      # Cart page (if exists)
```
