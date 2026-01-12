# Hospitality Manager - Execution Guide

## Quick Start (5 Minutes)

### Step 1: Install Dependencies
```bash
cd "c:/Users/pc/OneDrive/Desktop/3rd project"
npm install
```
**Expected time**: 2-3 minutes

### Step 2: Start Development Server
```bash
npm run dev
```
**Expected time**: 10-15 seconds

### Step 3: Open in Browser
Navigate to: `http://localhost:5173`

**You should see**: The Hospitality Manager home page with hero section and features

---

## Detailed Setup Guide

### Prerequisites Check
Before starting, ensure you have:
- [ ] Node.js installed (v16+) - Check with `node --version`
- [ ] npm installed - Check with `npm --version`
- [ ] A modern web browser (Chrome, Firefox, Safari, or Edge)
- [ ] A Google account (for Sheets integration)

### Installation Steps

#### 1. Navigate to Project Directory
```bash
cd "c:/Users/pc/OneDrive/Desktop/3rd project"
```

#### 2. Install All Dependencies
```bash
npm install
```

This installs:
- React 18.2.0
- React DOM 18.2.0
- React Router DOM 6.20.0
- Vite 5.0.8
- @vitejs/plugin-react 4.2.1

#### 3. Verify Installation
Check that `node_modules` folder was created:
```bash
dir node_modules
```

#### 4. Start Development Server
```bash
npm run dev
```

You should see output like:
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

#### 5. Access the Application
Open your browser and navigate to `http://localhost:5173`

---

## Google Sheets Integration Setup

### Part 1: Create Google Sheet

1. **Go to Google Sheets**
   - Visit: https://sheets.google.com
   - Sign in with your Google account

2. **Create New Spreadsheet**
   - Click "+ Blank" to create new sheet
   - Name it: "Hospitality Manager Data"

3. **Set Up Bookings Sheet**
   - Rename "Sheet1" to "Bookings"
   - Add headers in Row 1:
     ```
     A1: Guest Name
     B1: Email
     C1: Phone
     D1: Check-in Date
     E1: Check-out Date
     F1: Room Type
     G1: Number of Guests
     H1: Special Requests
     I1: Status
     J1: Created At
     ```

### Part 2: Create Apps Script

1. **Open Apps Script Editor**
   - In your Google Sheet, click: Extensions > Apps Script
   - Delete any existing code

2. **Paste the Script**
   Copy and paste this code:

```javascript
const SHEET_NAME = 'Bookings';

function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const result = rows.map(row => {
    let obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  });
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.guestName,
      data.email,
      data.phone,
      data.checkInDate,
      data.checkOutDate,
      data.roomType,
      data.numberOfGuests,
      data.specialRequests,
      'Confirmed',
      new Date()
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. **Save the Script**
   - Click the disk icon or Ctrl+S
   - Name it: "Hospitality Manager API"

### Part 3: Deploy Web App

1. **Deploy**
   - Click "Deploy" > "New deployment"
   - Click gear icon > Select "Web app"
   - Configure:
     - Description: "Hospitality Manager API v1"
     - Execute as: "Me"
     - Who has access: "Anyone"
   - Click "Deploy"

2. **Authorize**
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" > "Go to [project name]"
   - Click "Allow"

3. **Copy Web App URL**
   - Copy the "Web app URL" (looks like: `https://script.google.com/macros/s/...`)
   - Save this URL - you'll need it next

### Part 4: Connect to Application

1. **Create Environment File**
   Create `.env` in project root:
   ```bash
   echo VITE_GOOGLE_SHEETS_URL=your_web_app_url_here > .env
   ```

2. **Update API Calls**
   The application is currently using mock data. To connect to Google Sheets:
   
   - Update `src/pages/BookingForm.jsx` line 23
   - Update `src/pages/Dashboard.jsx` line 16
   - Update `src/pages/GuestList.jsx` line 11
   
   Replace mock data fetching with:
   ```javascript
   const response = await fetch(import.meta.env.VITE_GOOGLE_SHEETS_URL);
   const data = await response.json();
   ```

3. **Restart Development Server**
   ```bash
   # Stop the server (Ctrl+C)
   # Start again
   npm run dev
   ```

---

## Testing the Application

### Test 1: Navigation
- [ ] Click on each navigation link (Home, Dashboard, New Booking, Guests)
- [ ] Verify active state highlights correctly
- [ ] Check responsive behavior on mobile (resize browser)

### Test 2: Create Booking
- [ ] Go to "New Booking"
- [ ] Fill in all required fields
- [ ] Click "Create Booking"
- [ ] Verify success message appears
- [ ] Check Google Sheet for new row (if integrated)

### Test 3: View Dashboard
- [ ] Navigate to Dashboard
- [ ] Verify stats cards display numbers
- [ ] Check recent bookings table
- [ ] Verify responsive layout

### Test 4: Guest List
- [ ] Go to "Guests" page
- [ ] Test search functionality
- [ ] Test status filter dropdown
- [ ] Verify guest cards display correctly

---

## Building for Production

### Step 1: Create Production Build
```bash
npm run build
```

This creates optimized files in the `dist/` folder.

### Step 2: Preview Production Build
```bash
npm run preview
```

Opens production build at `http://localhost:4173`

### Step 3: Deploy

**Option A: Netlify**
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Run: `netlify deploy --prod`
3. Follow prompts

**Option B: Vercel**
1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel --prod`
3. Follow prompts

**Option C: GitHub Pages**
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts: `"deploy": "gh-pages -d dist"`
3. Run: `npm run deploy`

---

## Troubleshooting

### Issue: npm install fails
**Solution**: 
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Try `npm install --legacy-peer-deps`

### Issue: Port 5173 already in use
**Solution**:
- Kill the process using port 5173
- Or specify different port: `npm run dev -- --port 3000`

### Issue: Google Sheets not updating
**Solution**:
- Verify Web App URL is correct
- Check Apps Script deployment is set to "Anyone"
- Check browser console for CORS errors
- Redeploy the Apps Script as new version

### Issue: Styles not loading
**Solution**:
- Clear browser cache
- Check browser console for CSS errors
- Verify all CSS files are imported correctly

---

## Development Tips

### Hot Module Replacement
Vite supports HMR - changes appear instantly without full reload.

### Browser DevTools
- Press F12 to open DevTools
- Use React DevTools extension for component inspection

### Code Organization
- Components in `src/components/`
- Pages in `src/pages/`
- Each component has its own CSS file

### Adding New Pages
1. Create component in `src/pages/`
2. Create corresponding CSS file
3. Add route in `src/App.jsx`
4. Add navigation link in `src/components/Header.jsx`

---

## Next Steps

After completing setup:
1. Customize the color scheme in `src/index.css`
2. Add your own logo
3. Modify form fields for your specific needs
4. Add additional features (email notifications, etc.)
5. Deploy to production

---

## Support Resources

- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev
- **React Router**: https://reactrouter.com
- **Font Awesome**: https://fontawesome.com/icons
- **Google Apps Script**: https://developers.google.com/apps-script

---

**Ready to go! Start building your hospitality management system.**
