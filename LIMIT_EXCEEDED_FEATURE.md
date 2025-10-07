# User Limit Exceeded Feature

## Overview
This feature displays a popup modal when users exceed their plan limits (emails, leads, or AI generations), allowing them to upgrade their plan or purchase top-up credits.

## Features Implemented

### 1. Limit Exceeded Modal (`src/components/ui/LimitExceededModal.jsx`)
A beautiful, user-friendly modal that appears when limits are exceeded:
- **Dynamic Content**: Shows different messages based on limit type (emails, leads, AI)
- **Visual Indicators**: Progress bar showing 100% usage
- **Two Options**:
  - **Upgrade Plan**: Navigate to pricing page to select a higher tier
  - **Add Top-up Credits**: Navigate to top-up page for one-time purchases
- **Responsive Design**: Works on all screen sizes
- **Gradient Styling**: Modern UI with blue/purple gradients

### 2. Usage Limit Hook (`src/hooks/useUsageLimit.js`)
Custom React hook for managing usage limits:
- **Track Usage**: Monitors emails, leads, and AI generation usage
- **Check Limits**: Functions to check if limits are exceeded
- **Usage Percentage**: Calculate usage percentage for progress bars
- **Approaching Limit**: Detect when usage is >80%
- **Update Usage**: Function to update usage values

### 3. Dashboard Integration (`src/pages/dashboard/Dashboard.jsx`)
Enhanced dashboard with limit monitoring:
- **Auto-popup**: Modal automatically appears when limit is exceeded
- **Warning Banner**: Red banner at top of dashboard when limit reached
- **Quick Action**: "View Options" button to reopen modal
- **Real-time Monitoring**: Uses the useUsageLimit hook

### 4. Top-Up Credits Page (`src/pages/billing/TopUpCredits.jsx`)
New page for purchasing additional credits:
- **Four Package Types**:
  - 1,000 Emails - $15
  - 5,000 Emails - $60 (Best value)
  - 100 AI Credits - $25
  - 1,000 Leads - $20
- **Features**:
  - One-time purchase
  - Credits never expire
  - Instant activation
  - Works alongside monthly plan
- **Visual Selection**: Click to select package
- **Purchase Summary**: Review before buying
- **FAQ Section**: Common questions answered

## User Flow

### When Limit is Exceeded:
1. User reaches their plan limit (e.g., 5,000 emails sent)
2. Modal automatically pops up on dashboard
3. Red warning banner appears at top of dashboard
4. User sees two options:
   - **Upgrade Plan** → Goes to `/pricing`
   - **Add Top-up** → Goes to `/billing/topup`

### Upgrade Plan Flow:
1. Click "Upgrade Your Plan" in modal
2. Navigate to pricing page
3. View all available plans
4. Select and upgrade to higher tier

### Top-up Credits Flow:
1. Click "Add Top-up Credits" in modal
2. Navigate to top-up page
3. View available credit packages
4. Select desired package
5. Review purchase summary
6. Complete purchase
7. Credits added to account instantly

## Routes Added

- `/billing/topup` - Top-up credits purchase page

## Components Created

1. **LimitExceededModal** - Modal component for limit warnings
2. **useUsageLimit** - Custom hook for usage tracking
3. **TopUpCredits** - Page for purchasing additional credits

## Usage Limits (Current Mock Data)

```javascript
{
  emails: { current: 3247, limit: 5000 },
  leads: { current: 2847, limit: 3000 },
  ai: { current: 156, limit: 500 }
}
```

## Testing the Feature

### To test the limit exceeded modal:
1. Navigate to dashboard (`/dashboard`)
2. The modal will automatically appear if any limit is exceeded
3. In `src/hooks/useUsageLimit.js`, you can modify the mock data:
   - Change `current` to be >= `limit` to trigger the modal
   - Example: `emails: { current: 5000, limit: 5000 }`

### To test the top-up page:
1. Navigate to `/billing/topup`
2. Select a credit package
3. Review purchase summary
4. Click "Purchase Now"

## Customization

### Changing Limit Values:
Edit `src/hooks/useUsageLimit.js`:
```javascript
const [usage, setUsage] = useState({
  emails: { current: 5000, limit: 5000 }, // Trigger modal
  leads: { current: 2847, limit: 3000 },
  ai: { current: 156, limit: 500 },
});
```

### Adding New Limit Types:
1. Add new limit type to `useUsageLimit` hook
2. Update `LimitExceededModal` with new limit info
3. Add check in Dashboard useEffect

### Customizing Top-up Packages:
Edit `src/pages/billing/TopUpCredits.jsx`:
```javascript
const topUpPackages = [
  {
    id: 'custom-package',
    title: 'Custom Package',
    amount: '10,000 Emails',
    price: 100,
    icon: Mail,
    color: 'from-blue-500 to-blue-600',
    features: ['Feature 1', 'Feature 2']
  }
];
```

## Integration with Backend

When integrating with a real backend:

1. **Replace mock data** in `useUsageLimit` with API calls
2. **Add payment processing** in TopUpCredits component
3. **Update usage** after successful purchase
4. **Store credits** in user account
5. **Track credit usage** across the application

## Design Features

- **Modern Gradients**: Blue/purple color scheme
- **Responsive**: Works on mobile, tablet, desktop
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Smooth Animations**: Fade-in effects and transitions
- **Clear CTAs**: Prominent action buttons
- **Visual Hierarchy**: Important information stands out

## Future Enhancements

- [ ] Email notifications when approaching limit
- [ ] Usage analytics dashboard
- [ ] Automatic top-up option
- [ ] Credit expiration warnings
- [ ] Usage history tracking
- [ ] Bulk purchase discounts
- [ ] Gift credits to team members
- [ ] Usage forecasting

## Notes

- All credits are currently mock data
- Payment processing needs real integration (Stripe, PayPal, etc.)
- Usage tracking should be implemented server-side
- Consider adding usage alerts at 80%, 90%, 95%
- Add ability to set custom usage alerts
