# LeadTree - SaaS Dashboard Frontend

A production-ready SaaS dashboard frontend built with React, TailwindCSS, and modern web technologies.

## 🚀 Features

### Core Functionality
- **Authentication & User Management**: Login, signup, password reset, role-based access control
- **Dashboard Overview**: KPI cards, analytics charts, recent activity feed
- **Lead Management**: Lead database, import/export, tagging, status tracking
- **Campaign Management**: Email campaigns, automation sequences, performance tracking
- **AI Email Generator**: AI-powered personalized email generation
- **Email Tracking**: Sent email logs, open/click analytics
- **Billing & Subscription**: Usage monitoring, plan management, billing history
- **Settings & Profile**: User preferences, account management

### Technical Features
- **Fully Responsive**: Mobile-first design with Tailwind responsive classes
- **Dark/Light Mode**: Theme switching with system preference detection
- **Role-Based Access Control**: Super Admin, Admin, Team Member, Client roles
- **Modern UI Components**: shadcn/ui inspired component library
- **State Management**: Context API for auth and theme, Zustand ready for complex state
- **Data Fetching**: React Query (TanStack Query) setup for API integration
- **Routing**: React Router DOM with protected routes
- **Charts**: Chart.js integration for analytics dashboards

## 🛠 Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Styling**: TailwindCSS 4.1.13
- **UI Components**: Custom shadcn/ui inspired components
- **Routing**: React Router DOM 6.28.0
- **State Management**: Context API + Zustand 5.0.2
- **Data Fetching**: TanStack React Query 5.62.7
- **Charts**: Chart.js 4.4.6 + react-chartjs-2 5.2.0
- **Icons**: Lucide React 0.462.0
- **Utilities**: clsx, tailwind-merge, class-variance-authority

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.js
│   │   ├── Input.js
│   │   ├── Card.js
│   │   ├── Table.js
│   │   ├── Modal.js
│   │   └── Toast.js
│   ├── layout/             # Layout components
│   │   ├── Sidebar.js
│   │   ├── Topbar.js
│   │   └── PageWrapper.js
│   └── auth/               # Auth components
│       └── RoleGuard.js
├── pages/
│   ├── auth/               # Authentication pages
│   ├── dashboard/          # Dashboard pages
│   ├── leads/              # Lead management
│   ├── campaigns/          # Campaign management
│   ├── emails/             # Email features
│   ├── billing/            # Billing & subscription
│   └── settings/           # Settings pages
├── context/                # React Context providers
│   ├── AuthContext.js
│   └── ThemeContext.js
├── hooks/                  # Custom React hooks
├── utils/                  # Utility functions
├── data/                   # Mock data
└── App.jsx                 # Main app component
```

## 🎨 Design System

### Color Palette
- **Primary**: #4F46E5 (Indigo) - Main actions, buttons, links
- **Secondary**: #14B8A6 (Teal) - Secondary actions
- **Success**: #22C55E (Green) - Success states
- **Warning**: #F97316 (Orange) - Warning states
- **Error**: #EF4444 (Red) - Error states
- **Info**: #0EA5E9 (Sky) - Info states

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd leadtree
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## 🔐 Authentication & Roles

### Default Login Credentials
- **Email**: Any valid email format
- **Password**: Any password
- **Role**: Automatically assigned as 'admin'

### Role Permissions
- **Super Admin**: Full system access
- **Admin**: Manage organization, leads, campaigns, billing
- **Team Member**: Manage own leads and campaigns
- **Client/User**: Limited campaign and lead access

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile Navigation**: Collapsible sidebar with overlay
- **Responsive Tables**: Horizontal scroll on mobile
- **Adaptive Forms**: Stack vertically on small screens
- **Flexible Charts**: Resize based on container width
- **Touch-Friendly**: Appropriate touch targets for mobile

## 🎯 Key Pages & Features

### Dashboard
- KPI overview cards
- Recent activity feed
- Quick action buttons
- Performance charts placeholder

### Lead Management
- Searchable lead database
- Bulk import/export
- Lead status tracking
- Tag management
- Contact history

### Campaign Management
- Campaign creation wizard
- Performance analytics
- Status management (Draft, Active, Paused, Completed)
- Progress tracking

### AI Email Generator
- Lead information input form
- Tone selection (Professional, Casual, Persuasive, Friendly)
- AI-generated email preview
- Template saving
- Copy to clipboard

### Billing & Subscription
- Usage monitoring with progress bars
- Plan comparison
- Billing history
- Payment method management

## 🔧 Customization

### Adding New Pages
1. Create page component in appropriate `pages/` subdirectory
2. Add route in `App.jsx`
3. Update navigation in `Sidebar.js` if needed
4. Add role permissions in `RoleGuard.js`

### Styling
- Modify `tailwind.config.js` for theme customization
- Update color palette in the config
- Add custom components in `components/ui/`

### State Management
- Auth state: `context/AuthContext.js`
- Theme state: `context/ThemeContext.js`
- For complex state: Add Zustand stores

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy dist/ folder to Vercel
```

### Netlify
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🔮 Future Enhancements

- [ ] Chart.js integration for real analytics
- [ ] Real-time notifications
- [ ] Advanced filtering and search
- [ ] Bulk operations for leads/campaigns
- [ ] Email template editor
- [ ] CRM integration UI
- [ ] Advanced user management
- [ ] API integration layer
- [ ] Internationalization (i18n)
- [ ] Progressive Web App (PWA) features

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments for implementation details