# Quick Start Guide - Patient Caregiver Management System

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or higher
- pnpm (package manager)
- Supabase account (free tier available)

### Installation

1. **Clone or set up the project**
   ```bash
   # If using the downloaded code
   cd patient-caregiver-management-system
   pnpm install
   ```

2. **Set up Supabase** (if not already connected)
   - Visit [supabase.com](https://supabase.com)
   - Create a new project
   - Get your project URL and Anon Key from Project Settings

3. **Configure Environment Variables**
   Create a `.env.local` file in the project root:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_KEY=your_service_key
   ```

4. **Set Up Database**
   - Open Supabase SQL Editor
   - Copy and execute `scripts/01_init_schema.sql` to create tables
   - (Optional) Execute `scripts/02_seed_data.sql` for sample data

5. **Start Development Server**
   ```bash
   pnpm dev
   ```
   - Open [http://localhost:3000](http://localhost:3000)
   - Should auto-redirect to `/dashboard`

## 📋 Application Modules

### Dashboard (`/dashboard`)
- Overview of all system metrics
- Recent assignments
- Quick action shortcuts
- System status

### Guardians (`/guardians`)
- Manage patient guardians/family members
- View guardian contact information
- Track patient associations
- Add, edit, or delete guardians

### Caregivers (`/caregivers`)
- Register and manage caregivers
- Track specializations (RN, LPN, CNA, etc.)
- Monitor availability status
- View active assignments per caregiver

### Care Requests (`/care-requests`)
- Create requests for patient care
- Set priority levels and care types
- Associate with patients and guardians
- Track request approval status

### Assignments (`/assignments`)
- Assign caregivers to patients
- Define shift times
- Link to care requests
- Monitor assignment status

### Leave Requests (`/leave-requests`)
- Caregivers request leave (vacation, sick, personal, emergency)
- Admin approval/rejection
- Track caregiver availability
- View impact on assignments

### Incidents (`/incidents`)
- Report patient care incidents
- Categorize by type and severity
- Document actions taken
- Track resolution status

### Settings (`/settings`)
- Organization information
- User management
- Notification preferences
- Backup and security settings

## 🎨 UI Features

### Responsive Design
- ✅ Desktop sidebar navigation
- ✅ Mobile drawer navigation
- ✅ Responsive tables
- ✅ Touch-friendly buttons

### Data Tables
- Search functionality
- Status indicators with color coding
- Quick action buttons (View, Edit, Delete)
- Empty state messages

### Navigation
- Active route highlighting
- Keyboard accessible
- Mobile menu toggle
- User dropdown menu

## 🔧 Key Components

### Sidebar (`components/sidebar.tsx`)
- Navigation menu for all modules
- Active route detection
- Mobile close functionality

### Header (`components/header.tsx`)
- Page title display
- Notifications bell
- User account menu
- Mobile menu button

### Stat Card (`components/stat-card.tsx`)
- Metric display with icon
- Trend indicators
- Reusable across pages

### Dashboard Layout (`app/(dashboard)/layout.tsx`)
- Provides shared sidebar and header
- Mobile responsive drawer
- Two-column layout on desktop

## 📊 Mock Data

The application currently uses **mock data** for demonstration. To connect real data:

1. Create API routes: `app/api/[module]/route.ts`
2. Update pages to fetch from API
3. Implement React hooks (useState, useEffect) or SWR

Example pattern:
```typescript
// app/api/guardians/route.ts
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  const { data, error } = await supabase.from('guardians').select()
  return Response.json({ data, error })
}
```

## 🎯 Next Steps

### Immediate (Week 1)
- [ ] Connect Supabase database
- [ ] Implement authentication
- [ ] Replace mock data with real API calls
- [ ] Test on mobile devices

### Short Term (Week 2-3)
- [ ] Add form validation
- [ ] Implement error handling
- [ ] Add loading states
- [ ] Set up data pagination

### Medium Term (Week 4+)
- [ ] Add unit tests
- [ ] Implement file uploads
- [ ] Add real-time updates
- [ ] Create mobile app
- [ ] Set up CI/CD pipeline

## 🐛 Troubleshooting

### Database Connection Error
```
Error: connect ECONNREFUSED
```
- Check Supabase URL and keys in `.env.local`
- Verify Supabase project is active
- Test connection in Supabase SQL Editor

### Components Not Rendering
```
Module not found: Can't resolve '@/components/...'
```
- Verify import paths use `@/` alias
- Check file names match exactly
- Rebuild with `pnpm build`

### Styling Issues
```
Tailwind classes not applying
```
- Restart dev server: `Ctrl+C` then `pnpm dev`
- Check `app/globals.css` for custom CSS
- Verify `tailwind.config.ts` includes all paths

## 📱 Mobile Testing

1. **Responsive Preview**: Press `F12` in browser
2. **Real Device**: Connect via local network
   ```bash
   # Get your machine's IP
   ipconfig getifaddr en0  # macOS
   # Then visit http://YOUR_IP:3000
   ```

## 🚢 Deployment

### Deploy to Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel Settings
4. Deploy automatically on push

### Deploy to Other Platforms
```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 📚 Documentation

- **Architecture**: See `SYSTEM_ARCHITECTURE.md`
- **Database Schema**: See `scripts/01_init_schema.sql`
- **Components**: Documented in component files

## 🆘 Getting Help

- Check component files for JSDoc comments
- Review `SYSTEM_ARCHITECTURE.md` for system design
- Inspect network tab for API issues
- Enable debug logging in components

## 📞 Support

For issues or questions:
1. Check existing documentation
2. Review code comments
3. Check Vercel dashboard for errors
4. Contact support at vercel.com/help

---

**Happy coding!** 🎉
