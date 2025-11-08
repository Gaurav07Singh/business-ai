# GrowthAI - Routing Structure

## URL Routes

### Home Page
- **URL**: `/`
- **Component**: `app/page.jsx`
- **Description**: Landing page with "Get Started" button

### Get Started (Services Selection)
- **URL**: `/get-started`
- **Component**: `app/get-started/page.jsx`
- **Description**: Shows all available services (Email, Lead Generation, Marketing)

### Service Quiz Pages
- **URL**: `/get-started/email`
- **Component**: `app/get-started/[service]/page.jsx`
- **Description**: Professional Email quiz

- **URL**: `/get-started/lead-generation`
- **Component**: `app/get-started/[service]/page.jsx`
- **Description**: Lead Generation quiz

- **URL**: `/get-started/marketing`
- **Component**: `app/get-started/[service]/page.jsx`
- **Description**: Marketing Campaign Planner quiz

## Navigation Flow

1. User lands on `/` (Home page)
2. Clicks "Get Started" → Navigates to `/get-started`
3. Selects a service → Navigates to `/get-started/{service-name}`
4. Completes quiz → Can go back to `/get-started` or home

## Dynamic Routes

The `[service]` folder creates a dynamic route that accepts any service name:
- `email`
- `lead-generation`
- `marketing`

## Back Navigation

- From `/get-started` → Back to `/`
- From `/get-started/{service}` → Back to `/get-started`
