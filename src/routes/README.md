# Routes Configuration

This directory contains the centralized routing configuration for the application.

## Structure

### `index.jsx`
Main routes configuration file that exports four route arrays:

#### 1. **publicRoutes**
Routes accessible without authentication:
- `/login` - User login page
- `/signup` - User registration page
- `/forgot-password` - Password recovery
- `/pricing` - Pricing information
- `/landing` - Landing page
- `/onboarding` - Onboarding flow
- `/onboarding/success` - Onboarding completion
- `/` - Home page (redirects to landing)

#### 2. **adminAuthRoutes**
Admin authentication routes:
- `/admin/login` - Admin login page
- `/admin/forgot-password` - Admin password recovery

#### 3. **protectedRoutes**
Routes requiring user authentication:
- `/dashboard` - Main dashboard
- `/leads` - Lead management list
- `/leads/add` - Add new lead search
- `/leads/:id` - Lead search details
- `/campaigns` - Campaign list
- `/campaigns/create` - Create campaign
- `/ai-email` - AI email generator
- `/emails` - Email tracking
- `/settings` - User settings
- `/billing` - Billing overview
- `/billing/topup` - Top up credits
- `/crm` - CRM integration

#### 4. **adminProtectedRoutes**
Routes requiring admin authentication:
- `/admin/dashboard` - Admin dashboard
- `/admin/users` - User management
- `/admin/users/add` - Add user
- `/admin/users/edit/:userId` - Edit user
- `/admin/roles` - Role management
- `/admin/roles/create` - Create role
- `/admin/roles/edit/:roleId` - Edit role
- `/admin/subscriptions` - Subscription management
- `/admin/subscriptions/add` - Add subscription
- `/admin/subscriptions/edit/:subscriptionId` - Edit subscription
- `/admin/analytics` - Analytics dashboard
- `/admin/settings` - System settings
- `/admin/profile` - Admin profile
- `/admin/database` - Database management
- `/admin/email-templates` - Email templates
- `/admin/content` - Content management
- `/admin/api` - API management
- `/admin/billing` - Billing & payments
- `/admin/security` - Security logs

## Usage

Routes are imported and used in `App.jsx`:

```jsx
import {
  publicRoutes,
  adminAuthRoutes,
  protectedRoutes,
  adminProtectedRoutes,
} from "./routes";
```

## Adding New Routes

To add a new route:

1. Import the component at the top of `src/routes/index.jsx`
2. Add the route object to the appropriate array:

```jsx
{
  path: '/your-path',
  element: YourComponent,
  redirectIfAuth: '/redirect-path', // Optional, for public routes
}
```

## Benefits

- **Centralized Management**: All routes in one place
- **Easy Maintenance**: Update routes without touching App.jsx
- **Type Safety**: Easy to add TypeScript types later
- **Scalability**: Simple to add new routes or route groups
- **Clean Code**: Separates routing logic from application logic
