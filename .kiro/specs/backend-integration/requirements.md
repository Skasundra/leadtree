# Requirements Document

## Introduction

This document outlines the requirements for transforming the LeadTree static frontend into a fully functional, production-ready SaaS application. The implementation will include a Node.js backend with Express, MySQL database with Sequelize ORM, complete API integration, authentication system, and all necessary features to support the existing frontend functionality including user management, lead management, campaign management, AI email generation, billing, and analytics.

## Requirements

### Requirement 1: Backend Infrastructure Setup

**User Story:** As a developer, I want a properly structured Node.js backend with Express and Sequelize, so that I can build a scalable and maintainable API server.

#### Acceptance Criteria

1. WHEN the backend project is initialized THEN the system SHALL create a separate backend directory with proper folder structure (controllers, models, routes, middleware, config, utils)
2. WHEN dependencies are installed THEN the system SHALL include Express, Sequelize, MySQL2, JWT, bcrypt, cors, dotenv, and other necessary packages
3. WHEN the server starts THEN the system SHALL connect to MySQL database successfully and log connection status
4. WHEN environment variables are configured THEN the system SHALL load database credentials, JWT secrets, and API keys from .env file
5. IF database connection fails THEN the system SHALL log detailed error messages and prevent server startup
6. WHEN Sequelize is configured THEN the system SHALL support both development and production database configurations
7. WHEN the API is accessed THEN the system SHALL handle CORS properly for frontend requests

### Requirement 2: Database Schema Design and Models

**User Story:** As a developer, I want well-designed database schemas with Sequelize models, so that I can store and manage all application data efficiently.

#### Acceptance Criteria

1. WHEN User model is created THEN the system SHALL include fields for id, email, password (hashed), firstName, lastName, phone, role, emailVerified, resetPasswordToken, resetPasswordExpiry, createdAt, updatedAt
2. WHEN Company model is created THEN the system SHALL include fields for id, userId, name, size, industry, website, createdAt, updatedAt
3. WHEN Lead model is created THEN the system SHALL include fields for id, userId, firstName, lastName, email, phone, company, status, source, tags (JSON), notes, lastContactedAt, createdAt, updatedAt
4. WHEN Campaign model is created THEN the system SHALL include fields for id, userId, name, description, status, type, startDate, endDate, targetAudience (JSON), metrics (JSON), createdAt, updatedAt
5. WHEN Email model is created THEN the system SHALL include fields for id, userId, campaignId, leadId, subject, body, status, sentAt, openedAt, clickedAt, bounced, createdAt, updatedAt
6. WHEN Subscription model is created THEN the system SHALL include fields for id, userId, planId, status, startDate, endDate, trialEndDate, cancelledAt, createdAt, updatedAt
7. WHEN Plan model is created THEN the system SHALL include fields for id, name, price, billingCycle, features (JSON), emailLimit, leadLimit, active, createdAt, updatedAt
8. WHEN Payment model is created THEN the system SHALL include fields for id, userId, subscriptionId, amount, currency, status, paymentMethod, transactionId, createdAt, updatedAt
9. WHEN EmailTemplate model is created THEN the system SHALL include fields for id, userId, name, subject, body, variables (JSON), category, createdAt, updatedAt
10. WHEN Activity model is created THEN the system SHALL include fields for id, userId, type, description, metadata (JSON), createdAt
11. WHEN models are defined THEN the system SHALL establish proper associations (User hasOne Company, User hasMany Leads, User hasMany Campaigns, Campaign hasMany Emails, etc.)
12. WHEN migrations are created THEN the system SHALL support database schema versioning and rollback capabilities

### Requirement 3: Authentication and Authorization System

**User Story:** As a user, I want secure authentication with JWT tokens and role-based access control, so that my account and data are protected.

#### Acceptance Criteria

1. WHEN a user registers THEN the system SHALL validate email format, password strength (min 8 chars, uppercase, lowercase, number), and required fields
2. WHEN a user registers THEN the system SHALL hash the password using bcrypt with salt rounds of 10
3. WHEN a user registers THEN the system SHALL create a new user record and send a verification email
4. WHEN a user logs in with valid credentials THEN the system SHALL generate a JWT access token (expires in 15 minutes) and refresh token (expires in 7 days)
5. WHEN a user logs in THEN the system SHALL return user data (excluding password) along with tokens
6. IF login credentials are invalid THEN the system SHALL return 401 error with appropriate message
7. WHEN a protected route is accessed THEN the system SHALL verify JWT token from Authorization header
8. IF JWT token is invalid or expired THEN the system SHALL return 401 error
9. WHEN refresh token is used THEN the system SHALL generate new access token if refresh token is valid
10. WHEN a user requests password reset THEN the system SHALL generate a unique reset token, store it with expiry (1 hour), and send reset email
11. WHEN a user resets password with valid token THEN the system SHALL update password and invalidate reset token
12. WHEN role-based access is checked THEN the system SHALL verify user role matches required permission (superadmin, admin, team_member, client)
13. IF user lacks required role THEN the system SHALL return 403 Forbidden error
14. WHEN admin routes are accessed THEN the system SHALL verify user has admin or superadmin role
15. WHEN a user logs out THEN the system SHALL invalidate the refresh token

### Requirement 4: User Management API

**User Story:** As an admin, I want comprehensive user management APIs, so that I can manage users, roles, and permissions effectively.

#### Acceptance Criteria

1. WHEN GET /api/users is called THEN the system SHALL return paginated list of users with search, filter by role, and filter by status capabilities
2. WHEN GET /api/users/:id is called THEN the system SHALL return user details including company information and subscription status
3. WHEN PUT /api/users/:id is called THEN the system SHALL update user information (firstName, lastName, phone, role) with validation
4. WHEN DELETE /api/users/:id is called by admin THEN the system SHALL soft delete the user and associated data
5. WHEN GET /api/users/me is called THEN the system SHALL return authenticated user's profile with company and subscription details
6. WHEN PUT /api/users/me is called THEN the system SHALL update authenticated user's profile
7. WHEN POST /api/users/:id/send-email is called THEN the system SHALL send email to specified user
8. WHEN GET /api/users/stats is called by admin THEN the system SHALL return user statistics (total, active, by role, growth trends)
9. IF non-admin tries to access admin-only endpoints THEN the system SHALL return 403 Forbidden error
10. WHEN user data is returned THEN the system SHALL exclude sensitive fields like password and resetPasswordToken

### Requirement 5: Lead Management API

**User Story:** As a user, I want to manage my leads through API endpoints, so that I can create, update, search, and organize leads efficiently.

#### Acceptance Criteria

1. WHEN POST /api/leads is called THEN the system SHALL create a new lead with validation for required fields (firstName, lastName, email)
2. WHEN GET /api/leads is called THEN the system SHALL return paginated leads with search by name/email, filter by status, filter by tags, and sort options
3. WHEN GET /api/leads/:id is called THEN the system SHALL return lead details including contact history and associated campaigns
4. WHEN PUT /api/leads/:id is called THEN the system SHALL update lead information with validation
5. WHEN DELETE /api/leads/:id is called THEN the system SHALL delete the lead and update associated campaign metrics
6. WHEN POST /api/leads/import is called with CSV file THEN the system SHALL parse CSV, validate data, create leads in bulk, and return import summary
7. WHEN GET /api/leads/export is called THEN the system SHALL generate CSV file with all user's leads
8. WHEN POST /api/leads/:id/tags is called THEN the system SHALL add tags to lead
9. WHEN DELETE /api/leads/:id/tags/:tag is called THEN the system SHALL remove tag from lead
10. WHEN GET /api/leads/stats is called THEN the system SHALL return lead statistics (total, by status, by source, recent activity)
11. WHEN leads are queried THEN the system SHALL only return leads belonging to authenticated user
12. IF user exceeds lead limit for their plan THEN the system SHALL return 403 error when creating new leads

### Requirement 6: Campaign Management API

**User Story:** As a user, I want to create and manage email campaigns through API endpoints, so that I can run effective marketing campaigns.

#### Acceptance Criteria

1. WHEN POST /api/campaigns is called THEN the system SHALL create a new campaign with validation for name, type, and target audience
2. WHEN GET /api/campaigns is called THEN the system SHALL return paginated campaigns with filter by status and sort options
3. WHEN GET /api/campaigns/:id is called THEN the system SHALL return campaign details including metrics (sent, opened, clicked, bounced)
4. WHEN PUT /api/campaigns/:id is called THEN the system SHALL update campaign information
5. WHEN DELETE /api/campaigns/:id is called THEN the system SHALL delete campaign and associated emails
6. WHEN POST /api/campaigns/:id/start is called THEN the system SHALL change campaign status to 'active' and begin sending emails
7. WHEN POST /api/campaigns/:id/pause is called THEN the system SHALL change campaign status to 'paused'
8. WHEN POST /api/campaigns/:id/resume is called THEN the system SHALL change campaign status to 'active'
9. WHEN GET /api/campaigns/:id/analytics is called THEN the system SHALL return detailed campaign analytics (open rate, click rate, conversion rate, timeline data)
10. WHEN GET /api/campaigns/stats is called THEN the system SHALL return campaign statistics (total, by status, performance metrics)
11. WHEN campaigns are queried THEN the system SHALL only return campaigns belonging to authenticated user

### Requirement 7: Email Management and Tracking API

**User Story:** As a user, I want to send emails and track their performance, so that I can measure campaign effectiveness.

#### Acceptance Criteria

1. WHEN POST /api/emails/send is called THEN the system SHALL validate email data, check user's email limit, create email record, and send email via email service
2. WHEN GET /api/emails is called THEN the system SHALL return paginated emails with filter by campaign, filter by status, and search capabilities
3. WHEN GET /api/emails/:id is called THEN the system SHALL return email details including tracking data
4. WHEN GET /api/emails/track/open/:emailId is called THEN the system SHALL record email open event with timestamp and update metrics
5. WHEN GET /api/emails/track/click/:emailId is called THEN the system SHALL record email click event with timestamp and update metrics
6. WHEN POST /api/emails/bounce is called (webhook) THEN the system SHALL mark email as bounced and update metrics
7. WHEN GET /api/emails/stats is called THEN the system SHALL return email statistics (sent, opened, clicked, bounced, open rate, click rate)
8. IF user exceeds email limit for their plan THEN the system SHALL return 403 error and prevent sending
9. WHEN email is sent THEN the system SHALL increment user's email usage counter
10. WHEN tracking pixel is loaded THEN the system SHALL record open without requiring authentication

### Requirement 8: AI Email Generation API

**User Story:** As a user, I want to generate personalized emails using AI, so that I can create effective email content quickly.

#### Acceptance Criteria

1. WHEN POST /api/ai/generate-email is called THEN the system SHALL accept lead information, tone preference, and campaign context
2. WHEN AI generation is requested THEN the system SHALL integrate with OpenAI API or similar service to generate email content
3. WHEN email is generated THEN the system SHALL return subject line and email body
4. IF AI service fails THEN the system SHALL return fallback template-based email
5. WHEN POST /api/ai/improve-email is called THEN the system SHALL accept existing email content and return improved version
6. WHEN AI features are used THEN the system SHALL check if user's plan includes AI features
7. IF user's plan doesn't include AI THEN the system SHALL return 403 error with upgrade message
8. WHEN AI requests are made THEN the system SHALL implement rate limiting to prevent abuse

### Requirement 9: Subscription and Billing API

**User Story:** As a user, I want to manage my subscription and billing through API endpoints, so that I can upgrade, downgrade, or cancel my plan.

#### Acceptance Criteria

1. WHEN GET /api/subscriptions/plans is called THEN the system SHALL return all available subscription plans with features and pricing
2. WHEN POST /api/subscriptions/subscribe is called THEN the system SHALL create subscription, process payment, and activate plan
3. WHEN GET /api/subscriptions/current is called THEN the system SHALL return user's current subscription with usage statistics
4. WHEN PUT /api/subscriptions/upgrade is called THEN the system SHALL upgrade plan, calculate prorated amount, and process payment
5. WHEN PUT /api/subscriptions/downgrade is called THEN the system SHALL schedule downgrade for next billing cycle
6. WHEN POST /api/subscriptions/cancel is called THEN the system SHALL cancel subscription at end of billing period
7. WHEN GET /api/subscriptions/usage is called THEN the system SHALL return current usage (emails sent, leads count) vs plan limits
8. WHEN GET /api/payments/history is called THEN the system SHALL return paginated payment history
9. WHEN POST /api/payments/methods is called THEN the system SHALL add new payment method
10. WHEN PUT /api/payments/methods/:id is called THEN the system SHALL update payment method
11. WHEN DELETE /api/payments/methods/:id is called THEN the system SHALL remove payment method
12. WHEN subscription trial ends THEN the system SHALL automatically charge payment method and activate paid subscription
13. IF payment fails THEN the system SHALL retry payment, send notification, and mark subscription as past_due after retries
14. WHEN subscription is created THEN the system SHALL send confirmation email with plan details

### Requirement 10: Analytics and Reporting API

**User Story:** As a user, I want to access analytics and reports through API endpoints, so that I can track performance and make data-driven decisions.

#### Acceptance Criteria

1. WHEN GET /api/analytics/dashboard is called THEN the system SHALL return dashboard KPIs (total leads, active campaigns, emails sent, conversion rate)
2. WHEN GET /api/analytics/leads is called THEN the system SHALL return lead analytics (growth over time, by source, by status, conversion funnel)
3. WHEN GET /api/analytics/campaigns is called THEN the system SHALL return campaign analytics (performance comparison, trends, ROI metrics)
4. WHEN GET /api/analytics/emails is called THEN the system SHALL return email analytics (delivery rate, open rate, click rate, best performing times)
5. WHEN GET /api/analytics/revenue is called by admin THEN the system SHALL return revenue analytics (MRR, ARR, churn rate, LTV)
6. WHEN GET /api/analytics/users is called by admin THEN the system SHALL return user analytics (growth, by plan, engagement metrics)
7. WHEN analytics are requested with date range THEN the system SHALL filter data by specified date range
8. WHEN analytics are requested THEN the system SHALL return data in format suitable for Chart.js visualization
9. IF non-admin requests admin analytics THEN the system SHALL return 403 Forbidden error

### Requirement 11: Admin Management API

**User Story:** As an admin, I want comprehensive admin APIs, so that I can manage the entire system effectively.

#### Acceptance Criteria

1. WHEN GET /api/admin/dashboard is called THEN the system SHALL return admin dashboard statistics (total users, active subscriptions, revenue, system health)
2. WHEN GET /api/admin/activities is called THEN the system SHALL return recent system activities with pagination
3. WHEN GET /api/admin/users is called THEN the system SHALL return all users with advanced filtering and search
4. WHEN PUT /api/admin/users/:id/role is called THEN the system SHALL update user role
5. WHEN POST /api/admin/users/:id/suspend is called THEN the system SHALL suspend user account
6. WHEN POST /api/admin/users/:id/activate is called THEN the system SHALL activate suspended user account
7. WHEN GET /api/admin/subscriptions is called THEN the system SHALL return all subscriptions with filtering by plan and status
8. WHEN POST /api/admin/subscriptions/:id/refund is called THEN the system SHALL process refund and update subscription
9. WHEN GET /api/admin/system/health is called THEN the system SHALL return system health metrics (database status, API response times, error rates)
10. WHEN POST /api/admin/system/backup is called THEN the system SHALL trigger database backup
11. WHEN GET /api/admin/logs is called THEN the system SHALL return system logs with filtering by level and date
12. IF non-admin tries to access admin endpoints THEN the system SHALL return 403 Forbidden error

### Requirement 12: Email Service Integration

**User Story:** As a system, I want to integrate with email service providers, so that I can send transactional and campaign emails reliably.

#### Acceptance Criteria

1. WHEN email needs to be sent THEN the system SHALL use email service provider (SendGrid, AWS SES, or Mailgun)
2. WHEN transactional email is sent THEN the system SHALL use predefined templates for verification, password reset, and notifications
3. WHEN campaign email is sent THEN the system SHALL include tracking pixels for opens and tracking links for clicks
4. WHEN email is sent THEN the system SHALL handle email service errors gracefully and retry failed sends
5. WHEN email bounces THEN the system SHALL process bounce webhooks and update email status
6. WHEN email service webhook is received THEN the system SHALL verify webhook signature for security
7. WHEN bulk emails are sent THEN the system SHALL implement rate limiting to comply with email service limits
8. WHEN email templates are rendered THEN the system SHALL support variable substitution ({{firstName}}, {{companyName}}, etc.)

### Requirement 13: File Upload and Storage

**User Story:** As a user, I want to upload files (CSV for lead import, profile images), so that I can import data and personalize my profile.

#### Acceptance Criteria

1. WHEN POST /api/upload/avatar is called THEN the system SHALL accept image file, validate format (jpg, png), validate size (max 5MB), and store in cloud storage
2. WHEN POST /api/upload/leads-csv is called THEN the system SHALL accept CSV file, validate format, and process for lead import
3. WHEN files are uploaded THEN the system SHALL generate unique filenames to prevent conflicts
4. WHEN files are uploaded THEN the system SHALL scan for malware/viruses
5. WHEN files are stored THEN the system SHALL use cloud storage (AWS S3, Cloudinary, or similar)
6. WHEN file URLs are returned THEN the system SHALL return secure, signed URLs with expiration
7. IF file upload fails THEN the system SHALL return appropriate error message with details

### Requirement 14: Notification System

**User Story:** As a user, I want to receive notifications about important events, so that I stay informed about my account and campaigns.

#### Acceptance Criteria

1. WHEN important event occurs THEN the system SHALL create notification record in database
2. WHEN GET /api/notifications is called THEN the system SHALL return user's notifications with pagination
3. WHEN PUT /api/notifications/:id/read is called THEN the system SHALL mark notification as read
4. WHEN PUT /api/notifications/read-all is called THEN the system SHALL mark all user's notifications as read
5. WHEN DELETE /api/notifications/:id is called THEN the system SHALL delete notification
6. WHEN notification is created THEN the system SHALL send real-time update via WebSocket if user is online
7. WHEN user preferences allow THEN the system SHALL send email notification for critical events
8. WHEN notification is created THEN the system SHALL include type, title, message, link, and timestamp

### Requirement 15: API Security and Rate Limiting

**User Story:** As a system administrator, I want robust security measures and rate limiting, so that the API is protected from abuse and attacks.

#### Acceptance Criteria

1. WHEN API request is received THEN the system SHALL validate and sanitize all input data
2. WHEN API request is received THEN the system SHALL implement rate limiting (100 requests per 15 minutes per IP)
3. WHEN rate limit is exceeded THEN the system SHALL return 429 Too Many Requests error
4. WHEN SQL queries are executed THEN the system SHALL use parameterized queries to prevent SQL injection
5. WHEN sensitive data is logged THEN the system SHALL redact passwords, tokens, and payment information
6. WHEN API errors occur THEN the system SHALL log errors without exposing sensitive information to client
7. WHEN CORS is configured THEN the system SHALL only allow requests from authorized frontend domains
8. WHEN file uploads are processed THEN the system SHALL validate file types and scan for malicious content
9. WHEN API keys are used THEN the system SHALL validate API key and associate with user account
10. WHEN security headers are set THEN the system SHALL include helmet.js security headers

### Requirement 16: Testing and Documentation

**User Story:** As a developer, I want comprehensive tests and API documentation, so that the system is reliable and easy to maintain.

#### Acceptance Criteria

1. WHEN API endpoints are created THEN the system SHALL include unit tests for business logic
2. WHEN API endpoints are created THEN the system SHALL include integration tests for API routes
3. WHEN database models are created THEN the system SHALL include tests for model validations and associations
4. WHEN tests are run THEN the system SHALL achieve minimum 80% code coverage
5. WHEN API is documented THEN the system SHALL use Swagger/OpenAPI specification
6. WHEN API documentation is accessed THEN the system SHALL provide interactive API testing interface
7. WHEN endpoints are documented THEN the system SHALL include request/response examples, authentication requirements, and error codes

### Requirement 17: Frontend Integration

**User Story:** As a frontend developer, I want to integrate the existing React frontend with the new backend APIs, so that the application is fully functional.

#### Acceptance Criteria

1. WHEN API service files are updated THEN the system SHALL replace mock data with actual API calls
2. WHEN authentication is implemented THEN the system SHALL store JWT tokens in httpOnly cookies or secure localStorage
3. WHEN API calls are made THEN the system SHALL include authentication token in request headers
4. WHEN API errors occur THEN the system SHALL display user-friendly error messages
5. WHEN token expires THEN the system SHALL automatically refresh token or redirect to login
6. WHEN forms are submitted THEN the system SHALL validate data on frontend before API call
7. WHEN data is loaded THEN the system SHALL show loading states and handle empty states
8. WHEN API calls fail THEN the system SHALL implement retry logic for network errors
9. WHEN real-time updates are needed THEN the system SHALL implement WebSocket connection for notifications
10. WHEN environment variables are configured THEN the system SHALL use different API URLs for development and production

### Requirement 18: Deployment and DevOps

**User Story:** As a DevOps engineer, I want proper deployment configuration and monitoring, so that the application runs reliably in production.

#### Acceptance Criteria

1. WHEN application is deployed THEN the system SHALL use environment-specific configurations
2. WHEN database migrations are run THEN the system SHALL execute in correct order and support rollback
3. WHEN application starts THEN the system SHALL perform health checks on database and external services
4. WHEN errors occur THEN the system SHALL log to centralized logging service (Winston, Morgan)
5. WHEN application is monitored THEN the system SHALL track performance metrics (response times, error rates)
6. WHEN application is deployed THEN the system SHALL use process manager (PM2) for Node.js
7. WHEN SSL is configured THEN the system SHALL enforce HTTPS in production
8. WHEN database is backed up THEN the system SHALL schedule automated daily backups
9. WHEN application scales THEN the system SHALL support horizontal scaling with load balancer
10. WHEN CI/CD pipeline is configured THEN the system SHALL run tests before deployment
