# SIRKULA – UI/UX DESIGN SYSTEM & COMPONENT SPECIFICATIONS
## v1.0 | Mobile-First Student App + Desktop Admin Dashboards

---

## 1. DESIGN PHILOSOPHY

### Student Experience (Mobile PWA)
- **Principle:** Friction-free, gamified, emoji-rich
- **Target Device:** Android (85% market share in Indonesia) + iOS
- **Viewport:** 320px (mobile) → 768px (tablet)
- **Interaction:** Thumb-friendly, one-hand navigation
- **Performance:** < 3 second load time, offline-capable

### Admin/School/FMCG Experience (Desktop)
- **Principle:** Data-dense, high productivity, accessibility-first
- **Target Viewport:** 1440px+ (monitor, laptop)
- **Interaction:** Keyboard shortcuts, batch operations, export
- **Performance:** < 2 second page load, real-time updates via WebSocket

---

## 2. DESIGN TOKENS

### 2.1 Color Palette

#### Primary Colors (Sirkula Brand)
```css
:root {
  /* Green = Sustainability/Eco */
  --color-primary-dark: #1B5E3F;      /* Hex: #1B5E3F - Deep forest green */
  --color-primary: #2D8659;            /* Hex: #2D8659 - Brand green */
  --color-primary-light: #4CAF7D;      /* Hex: #4CAF7D - Light green */
  --color-primary-lighter: #E8F5E9;    /* Hex: #E8F5E9 - Very light green bg */
  
  /* Secondary = Action/Success */
  --color-success: #4CAF50;             /* Green for positive actions */
  --color-warning: #FF9800;             /* Orange for caution */
  --color-danger: #F44336;              /* Red for errors/destructive actions */
  --color-info: #2196F3;                /* Blue for info */
  
  /* Neutral */
  --color-neutral-100: #FAFAFA;         /* Almost white */
  --color-neutral-200: #F5F5F5;         /* Light gray */
  --color-neutral-300: #E0E0E0;         /* Gray */
  --color-neutral-500: #9E9E9E;         /* Medium gray */
  --color-neutral-700: #424242;         /* Dark gray */
  --color-neutral-900: #212121;         /* Almost black */
  
  /* Category-Specific (Waste Types) */
  --color-plastic: #2196F3;             /* Blue for plastic */
  --color-paper: #FF9800;               /* Orange for paper */
  --color-residue: #795548;             /* Brown for residue */
}
```

#### Usage Rules
- **Student UI:** Primary + categorical colors (high contrast for outdoor/sun visibility)
- **Admin UI:** Neutral 700/900 text on white, primary for CTAs
- **Dark Mode:** Not in MVP scope

### 2.2 Typography

```css
/* Font Stack */
--font-family-sans: "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
--font-family-mono: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", monospace;

/* Student App (Mobile) */
--font-size-xs: 12px;
--font-size-sm: 14px;
--font-size-base: 16px;
--font-size-lg: 18px;
--font-size-xl: 20px;
--font-size-2xl: 24px;
--font-size-3xl: 28px;
--font-size-4xl: 32px;

/* Admin Dashboard */
--font-size-admin-xs: 11px;
--font-size-admin-sm: 12px;
--font-size-admin-base: 13px;
--font-size-admin-lg: 14px;
--font-size-admin-xl: 16px;

/* Font Weights */
--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

#### Heading System (Student Mobile)
```
h1: 32px, bold, --color-neutral-900
h2: 24px, semibold, --color-neutral-700
h3: 20px, semibold, --color-neutral-700
h4: 18px, semibold, --color-neutral-700
Body: 16px, regular, --color-neutral-700
Caption: 12px, regular, --color-neutral-500
```

### 2.3 Spacing System

```css
/* 8px base unit (mobile-friendly) */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;

/* Used as: margin, padding, gap */
margin: var(--space-md);
padding: var(--space-lg);
gap: var(--space-sm);
```

### 2.4 Border & Radius

```css
--border-radius-sm: 4px;
--border-radius-md: 8px;
--border-radius-lg: 12px;
--border-radius-xl: 16px;
--border-radius-full: 9999px;

/* Borders */
--border-light: 1px solid var(--color-neutral-200);
--border-default: 1px solid var(--color-neutral-300);
```

### 2.5 Shadow System

```css
/* Student App (subtle, flat) */
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.12);
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.16);

/* Admin Dashboard (more defined) */
--shadow-admin-sm: 0 1px 2px rgba(0, 0, 0, 0.06);
--shadow-admin-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-admin-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
```

---

## 3. STUDENT MOBILE APP (PWA)

### 3.1 Navigation Structure

```
Bottom Tab Navigation (Always Visible)
├─ 🏠 Home
├─ 📱 Scan
├─ 🎁 Rewards
├─ 👤 Profile
└─ ⚙️ Settings (collapse to hamburger if space)
```

**Layout:**
- Bottom tab bar: 60px height, safe area padding (iOS notch)
- Tab labels visible (not icon-only)
- Active tab: bright primary color + bold font
- Inactive tabs: neutral gray

### 3.2 Core Screens

#### Screen 1: HOME DASHBOARD (Mobile)

```
┌─────────────────────────────────────────┐
│ ☰ SMA Santa Maria          🔔           │ ← Header (20px)
├─────────────────────────────────────────┤
│                                         │
│  Welcome back, Jeremy! 👋              │ ← Greeting
│  Last activity: 14:30 today            │
│                                         │
├─────────────────────────────────────────┤
│  ⭐ YOUR POINTS: 2,450                 │ ← Hero card (primary color)
│  📊 Rank #8 in School                  │
│  🔥 Streak: 12 days                    │
├─────────────────────────────────────────┤
│  QUICK ACTIONS                          │
│                                         │
│  ┌─────────────┐  ┌─────────────┐     │
│  │ 📸 Scan     │  │ 🎁 Redeem   │     │
│  │ Waste       │  │ Rewards     │     │
│  └─────────────┘  └─────────────┘     │
│                                         │
│  ┌─────────────┐  ┌─────────────┐     │
│  │ 📊 View     │  │ 🏆 See      │     │
│  │ History     │  │ Leaderboard │     │
│  └─────────────┘  └─────────────┘     │
│                                         │
├─────────────────────────────────────────┤
│  RECENT ACTIVITY                        │
│  Jun 26, 14:30 🔵 Plastic   +70 pts    │
│  Jun 26, 12:15 📄 Paper     +40 pts    │
│  Jun 25, 08:45 🔵 Plastic   +50 pts    │
│  [See more...]                         │
│                                         │
│                                         │ ← Scroll area
├─────────────────────────────────────────┤
│ 🏠 Home │ 📱 Scan │ 🎁 Rewards │ 👤 Me │
└─────────────────────────────────────────┘
```

**Technical Specs:**
- Spacing: 16px padding left/right
- Hero card: `--color-primary-light` bg, white text, 16px radius, 8px shadow
- Activity list: Truncated to 3 items, expandable
- Status bar: 24px, primary color
- Safe area insets: iOS top 20px, bottom 60px (tab bar)

**React Component Structure:**
```jsx
<HomeScreen>
  <StatusBar backgroundColor={PRIMARY_COLOR} />
  <Header 
    title={schoolName}
    rightIcon={<NotificationBell />}
  />
  <GreetingCard studentName={name} />
  <PointsHeroCard 
    points={2450}
    rank={8}
    streak={12}
  />
  <QuickActionGrid>
    <ActionButton icon="📸" label="Scan Waste" />
    <ActionButton icon="🎁" label="Redeem" />
    {/* ... 2 more */}
  </QuickActionGrid>
  <ActivityFeed entries={recentActivity} />
  <BottomTabBar activeTab="home" />
</HomeScreen>
```

---

#### Screen 2: SCAN QR CODE (Mobile)

```
┌─────────────────────────────────────────┐
│ ← Back            📸 SCAN               │
├─────────────────────────────────────────┤
│                                         │
│     ┌─────────────────────────────┐   │
│     │                             │   │
│     │   [CAMERA VIEWFINDER]       │   │ ← Video stream
│     │   (html5-qrcode overlay)    │   │ (fill screen)
│     │                             │   │
│     │        ┌───────┐            │   │
│     │        │  QR   │            │   │ ← Scan frame
│     │        │ CODE  │            │   │
│     │        └───────┘            │   │
│     │                             │   │
│     └─────────────────────────────┘   │
│                                         │
│  ✅ QR Code Detected!                  │ ← Status message
│  Eco-Station: Kantin Area (ESB-01)     │
│                                         │
│          [NEXT]                        │ ← CTA button
│                                         │
│  ⓘ Point camera at QR code on bin     │ ← Helper text
│                                         │
└─────────────────────────────────────────┘
```

**Technical Specs:**
- Full-screen camera (Safe area aware)
- QR frame overlay: 200x200px dashed border, primary color
- Detection feedback: Toast notification at bottom (300ms, auto-dismiss)
- Permissions: Request camera on mount, handle denial gracefully
- Performance: 60fps camera stream, debounce scan detection (500ms)

**React Component Structure:**
```jsx
<ScanScreen>
  <Header title="Scan Waste" backButton />
  <QRCodeReader
    ref={cameraRef}
    onScan={handleQRDetected}
    constraints={{ video: { facingMode: "environment" } }}
  />
  <ScanFrameOverlay />
  {scanned && (
    <>
      <StatusMessage 
        icon="✅"
        text={`Eco-Station: ${stationName}`}
      />
      <Button 
        label="Next"
        onPress={() => navigateTo('/log-waste')}
      />
    </>
  )}
  <HelperText>Point camera at QR code on bin</HelperText>
</ScanScreen>
```

---

#### Screen 3: LOG WASTE (Post-Scan Form) (Mobile)

```
┌─────────────────────────────────────────┐
│ ← Back            LOG WASTE             │
├─────────────────────────────────────────┤
│                                         │
│  ✅ Eco-Station Detected               │
│  Kantin Area (ESB-01)                  │ ← Read-only
│  ───────────────────────────────────   │
│                                         │
│  SELECT WASTE CATEGORY *                │ ← Required
│                                         │
│  ◯ 🔵 Plastic Bottles                  │ ← Radio buttons
│    & Containers                        │   (each 48px tall)
│                                         │
│  ◯ 📄 Paper & Cardboard                │
│                                         │
│  ◯ ⚫ Residue / Mixed                  │
│                                         │
│  ───────────────────────────────────   │
│                                         │
│  ADD PHOTO (OPTIONAL) +20 BONUS PTS    │ ← Label with bonus
│                                         │
│  ┌─────────────────────────────────┐  │
│  │                                 │  │
│  │  📷 [TAP TO UPLOAD PHOTO]       │  │ ← 120x120px
│  │                                 │  │
│  └─────────────────────────────────┘  │
│                                         │
│  NOTES (OPTIONAL)                      │
│  ┌─────────────────────────────────┐  │
│  │ Just finished lunch...          │  │
│  │ [max 200 chars]                 │  │
│  └─────────────────────────────────┘  │
│                                         │
│  📊 POINTS YOU'LL EARN:                │
│  Plastic: 50 pts                       │
│  Photo Bonus: +20 pts                  │
│  ─────────────                         │
│  TOTAL: 70 pts ⭐                      │
│                                         │
│          [SUBMIT WASTE]                │ ← CTA (full width)
│                                         │
│  [CANCEL]                              │ ← Secondary action
│                                         │
└─────────────────────────────────────────┘
```

**Technical Specs:**
- Form inputs: 48px min height (thumb-friendly)
- Category cards: Grid 2col (but stack on narrow), padding 12px
- Active category: primary color bg, white text, check icon
- Photo upload: Cloudinary widget integration
- Points calculator: Real-time update as user selects options
- Submit button: Disabled until category selected, shows loading spinner

**Form Validation:**
```javascript
const schema = z.object({
  eco_station_id: z.string().uuid().required('Station required'),
  category: z.enum(['plastic', 'paper', 'residue']).required('Select category'),
  photo_url: z.string().url().optional(),
  notes: z.string().max(200).optional(),
});
```

**React Component Structure:**
```jsx
<LogWasteScreen scannedStation={station}>
  <Header title="Log Waste" backButton />
  <Form>
    <StationDisplay station={station} />
    <CategorySelector
      selected={formData.category}
      onChange={setFormData}
      categories={[
        { id: 'plastic', label: '🔵 Plastic', points: 50 },
        { id: 'paper', label: '📄 Paper', points: 40 },
        { id: 'residue', label: '⚫ Residue', points: 10 },
      ]}
    />
    <PhotoUploader onUpload={handlePhotoUpload} />
    <TextInput 
      label="Notes"
      maxLength={200}
      placeholder="Optional notes..."
    />
    <PointsPreview 
      basePoints={getBasePoints(formData.category)}
      bonusPoints={formData.photo_url ? 20 : 0}
    />
    <Button 
      label="Submit Waste"
      onPress={handleSubmit}
      disabled={!formData.category}
      loading={isSubmitting}
    />
  </Form>
</LogWasteScreen>
```

---

#### Screen 4: REWARDS CATALOG (Mobile)

```
┌─────────────────────────────────────────┐
│ ← Back        🎁 REDEEM REWARDS         │
├─────────────────────────────────────────┤
│                                         │
│  💰 BALANCE: 2,450 POINTS              │ ← Prominent balance
│  ═════════════════════════════════════ │
│                                         │
│  ⬜ FILTER BY TYPE                     │
│  [All] [Canteen] [Vouchers] [School]  │ ← Horizontal scroll
│                                         │
│  ═════════════════════════════════════ │
│                                         │
│  🍕 CANTEEN VOUCHER (Rp 20k)           │
│  └─ Cost: 100 pts | Stock: 45         │ ← Availability
│      [REDEEM] ← Green CTA button       │
│                                         │
│  🧁 FREE PASTRY (Canteen)              │
│  └─ Cost: 80 pts | Stock: 15          │
│      [REDEEM] ← Green CTA button       │
│                                         │
│  🎫 PARKING PASS (1 week)              │
│  └─ Cost: 250 pts | Stock: 0          │
│      [OUT OF STOCK] ← Disabled button  │
│                                         │
│  📚 LIBRARY CREDIT (Rp 50k)            │
│  └─ Cost: 150 pts | Stock: 3          │
│      [REDEEM] ← Green CTA button       │
│                                         │
│  [Load more...]                        │ ← Pagination
│                                         │
│                                         │ ← Scroll area
├─────────────────────────────────────────┤
│ 🏠 Home │ 📱 Scan │ 🎁 Rewards │ 👤 Me │
└─────────────────────────────────────────┘
```

**Technical Specs:**
- Reward cards: Full width, padding 12px, shadow-md on hover
- CTA buttons:
  - Available: Primary green, full width
  - Out of stock: Gray, disabled, no pointer events
- Filter chips: Scrollable horizontal, toggle-style
- Balance: Sticky header, updates in real-time on redemption

**Redemption Flow:**
1. Tap [REDEEM]
2. Confirmation modal: "Spend 100 points for Rp 20k Voucher?"
3. Submit → API call
4. Success: Toast "✅ Voucher Code: ABC123 sent to SMS"
5. Modal: Display code + "Show this to canteen"
6. Balance updates immediately

**React Component Structure:**
```jsx
<RewardsScreen>
  <Header title="Redeem Rewards" />
  <BalanceCard points={2450} />
  <FilterChips 
    categories={['All', 'Canteen', 'Vouchers', 'School']}
    selected={filter}
    onChange={setFilter}
  />
  <RewardsList rewards={filteredRewards}>
    {rewards.map(reward => (
      <RewardCard
        key={reward.id}
        reward={reward}
        onRedeem={handleRedeem}
        disabled={reward.stock === 0}
      />
    ))}
  </RewardsList>
  {showConfirmation && (
    <RedemptionModal
      reward={selectedReward}
      onConfirm={confirmRedeem}
      onCancel={closeModal}
    />
  )}
  <BottomTabBar activeTab="rewards" />
</RewardsScreen>
```

---

#### Screen 5: PERSONAL PROFILE / WASTE PASSPORT (Mobile)

```
┌─────────────────────────────────────────┐
│ ← Back       👤 MY PASSPORT             │
├─────────────────────────────────────────┤
│                                         │
│      ┌─────────────────────────┐       │
│      │  [PROFILE PHOTO]        │       │ ← 80x80px, circle
│      │                         │       │
│      └─────────────────────────┘       │
│                                         │
│      Jeremy Christiano                  │ ← Name
│      SMA Santa Maria 1 Bandung         │ ← School
│      Joined June 1, 2026               │ ← Date
│                                         │
│  ═════════════════════════════════════ │
│                                         │
│  KEY STATS (3-column grid)              │
│                                         │
│  ⭐ 2,450        📊 65         🌱 12.4  │
│  POINTS          ENTRIES       CO₂e kg  │
│                                         │
│  🔥 12 days      📈 #8 School  💾 45kg │
│  CURRENT STREAK  YOUR RANK     TOTAL WT │
│                                         │
│  ═════════════════════════════════════ │
│                                         │
│  CONTRIBUTION (30 DAYS)                 │
│                                         │
│  🔵 Plastic:  45 entries  2,250 pts    │ ← Category breakdown
│  📄 Paper:    18 entries    720 pts    │
│  ⚫ Residue:   2 entries     20 pts    │
│                                         │
│  ═════════════════════════════════════ │
│                                         │
│  RECENT ACTIVITY                        │
│                                         │
│  Jun 26, 14:30: 🔵 Plastic  +50 pts   │ ← Scroll section
│  Jun 26, 12:15: 📄 Paper    +40 pts   │
│  Jun 25, 08:45: 🔵 Plastic  +70 pts   │
│  [View all 65 entries]                 │
│                                         │
│  ═════════════════════════════════════ │
│                                         │
│  [EDIT PROFILE]    [LOGOUT]            │ ← Account actions
│                                         │
├─────────────────────────────────────────┤
│ 🏠 Home │ 📱 Scan │ 🎁 Rewards │ 👤 Me │
└─────────────────────────────────────────┘
```

**Technical Specs:**
- Profile section: White card, center-aligned, padding 24px
- Stats grid: 3 columns, metric + label stacked
- Activity: Last 5 entries, tap "View all" → modal or separate screen
- Bottom buttons: 2-column grid, 48px height

---

#### Screen 6: LEADERBOARD (Mobile)

```
┌─────────────────────────────────────────┐
│           🏆 LEADERBOARD                │
├─────────────────────────────────────────┤
│                                         │
│  📅 JUNE 2026                           │ ← Month selector
│  ─────────────────────────────────────  │
│                                         │
│  🥇 Budi Santoso                3,420  │ ← Top 3 highlighted
│      18-day streak                     │   (gold/silver/bronze)
│                                         │
│  🥈 Siti Nurhaliza              3,150  │
│      14-day streak                     │
│                                         │
│  🥉 Andi Wijaya                 2,890  │
│      10-day streak                     │
│                                         │
│  ═════════════════════════════════════ │
│                                         │
│   #8  👤 Jeremy Christiano      2,450  │ ← You are here
│       (14-day streak)                  │   Highlighted in primary
│                                         │
│   #9  👤 Budi Wijaya            2,340  │
│                                         │
│  #10  👤 Sinta Prabowo          2,210  │
│                                         │
│  ... [more users]                      │
│                                         │
│                                         │ ← Scroll section
│  [Load more] or infinite scroll        │
│                                         │
│  ℹ️ Resets monthly on the 1st          │
│                                         │
├─────────────────────────────────────────┤
│ 🏠 Home │ 📱 Scan │ 🎁 Rewards │ 👤 Me │
└─────────────────────────────────────────┘
```

**Technical Specs:**
- Top 3: Emoji medals (🥇🥈🥉), larger font, primary color
- Your rank: Subtle highlight (primary-lighter bg), underline
- Rest: Standard list items, tappable (no action, just visual feedback)
- Month selector: Dropdown or swipe tabs (show past 3 months)
- Real-time updates: WebSocket connection, reflect point changes within 5 seconds

---

### 3.3 Components Library (Reusable)

#### Button Component
```jsx
// Student App: Thumb-friendly, large hit target
<Button 
  label="Submit"
  variant="primary" | "secondary" | "outline"
  size="md" // 48px height
  fullWidth={true}
  loading={false}
  disabled={false}
  onPress={() => {}}
/>

// Rendered as:
<button
  className={`
    px-4 py-3           /* Padding */
    rounded-lg          /* Border radius */
    font-semibold       /* Font weight */
    h-12                /* 48px height */
    w-full              /* Full width option */
    bg-primary          /* Primary green */
    text-white
    hover:bg-primary-dark
    active:scale-95     /* Press feedback */
    disabled:opacity-50
    disabled:cursor-not-allowed
    transition-all duration-150
  `}
>
  {loading && <Spinner />}
  {label}
</button>
```

#### Card Component
```jsx
<Card 
  title="Points Summary"
  icon={<StarIcon />}
  color="primary" | "success" | "warning"
  shadowSize="sm" | "md" | "lg"
  onPress={() => {}} // Optional tap handler
>
  <CardContent>
    {/* Child content */}
  </CardContent>
</Card>
```

#### Input Component
```jsx
<TextInput
  label="Notes"
  placeholder="Optional notes..."
  value={value}
  onChange={setValue}
  maxLength={200}
  type="text" | "number" | "email"
  error="Field required"
  helperText="Max 200 characters"
/>
```

#### Modal Component
```jsx
<Modal
  visible={isVisible}
  title="Confirm Redemption"
  onClose={handleClose}
  type="alert" | "confirmation" | "choice"
>
  <ModalContent>
    <p>Spend 100 points for Rp 20k Voucher?</p>
  </ModalContent>
  <ModalActions>
    <Button label="Cancel" variant="outline" />
    <Button label="Confirm" variant="primary" />
  </ModalActions>
</Modal>
```

#### Tab Bar Component
```jsx
<BottomTabBar
  tabs={[
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'scan', label: 'Scan', icon: '📱' },
    { id: 'rewards', label: 'Rewards', icon: '🎁' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ]}
  activeTab={activeTab}
  onChange={setActiveTab}
/>

// Sticky at bottom, 60px height, safe area padding
```

---

### 3.4 Responsive Breakpoints (Mobile PWA)

```css
/* Mobile First */
/* Base: 320px – 479px (phones) */

@media (min-width: 480px) {
  /* Small tablets, landscape phones */
  /* Adjust spacing: --space-lg becomes --space-xl */
}

@media (min-width: 768px) {
  /* iPad, larger tablets */
  /* 2-column grids become possible */
  /* Font sizes +2px */
}

@media (min-width: 1024px) {
  /* Not targeting in MVP, but prepare structure */
}

/* Safe areas (notch support) */
.header {
  padding-top: env(safe-area-inset-top);
}
.bottom-tab {
  padding-bottom: max(
    env(safe-area-inset-bottom),
    var(--space-lg)
  );
}
```

---

### 3.5 Offline Support (Service Worker)

**Scenario:** Student scans QR and logs waste, but connection drops before upload.

**Implementation:**
```javascript
// service-worker.js
self.addEventListener('sync', event => {
  if (event.tag === 'sync-waste-logs') {
    event.waitUntil(
      // Retry failed logs from IndexedDB
      db.getAll('pending_logs')
        .then(logs => Promise.all(
          logs.map(log => 
            fetch('/api/students/{id}/waste-disposal', {
              method: 'POST',
              body: JSON.stringify(log)
            })
          )
        ))
    );
  }
});

// Client-side
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(registration => {
    // Save log to IndexedDB first
    db.add('pending_logs', logData);
    
    // Request background sync
    registration.sync.register('sync-waste-logs');
    
    // Show user: "Will sync when online"
  });
}
```

---

## 4. ADMIN DASHBOARD (Desktop Web)

### 4.1 Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│ Logo  │ Sirkula Admin            │ Admin │ Notif │ ⚙️   │ ← Header (64px)
├─────────────────────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────────────────────────────────────┐ │
│ │         │ │ [BREADCRUMB]                            │ │
│ │ Sidebar │ ├─────────────────────────────────────────┤ │
│ │ 280px   │ │                                         │ │
│ │         │ │  MAIN CONTENT AREA                      │ │
│ │ • Home  │ │  (1440px - 280px - padding = 1120px)   │ │
│ │ • Schools   │                                         │ │
│ │ • FMCG  │ │                                         │ │
│ │ • Reports   │  [Charts, Tables, Forms]              │ │
│ │ • Finance   │                                         │ │
│ │ • Settings  │                                         │ │
│ │         │ │                                         │ │
│ │ [Collapse]  │ │                                         │ │
│ └─────────┘ └─────────────────────────────────────────┘ │
│                  [Footer - optional]                     │
└─────────────────────────────────────────────────────────┘
```

**Grid System:**
- Header: 64px fixed
- Sidebar: 280px (collapsible to 64px icon-only)
- Main content: Remaining width, 24px padding
- Max content width: 1200px (optional, for very wide screens)

### 4.2 Header & Navigation

```
┌──────────────────────────────────────────────────────────┐
│ [≡] Logo  │ SIRKULA ADMIN              │ User │ ? │ ⚙️ │
└──────────────────────────────────────────────────────────┘

Sidebar (Collapsed View):
├─ 🏠 Home
├─ 🏫 Schools
├─ 🏢 FMCG Companies
├─ 📊 Reports
├─ 💰 Financial
└─ ⚙️ Settings

Sidebar (Expanded View):
├─ 🏠 HOME
│  Manage Dashboard
│
├─ 🏫 SCHOOLS
│  • All Schools
│  • Onboard New
│  • Performance
│
├─ 🏢 FMCG COMPANIES
│  • Active Contracts
│  • Subscriptions
│  • API Keys
│
├─ 📊 REPORTS
│  • Brand Audit
│  • Financial
│  • System Health
│
├─ 💰 FINANCIAL
│  • Reconciliation
│  • Payouts
│  • Revenue
│
└─ ⚙️ SETTINGS
   • System Config
   • Users
   • Audit Logs
```

**Top Right User Menu:**
```
Click avatar/user name → Dropdown:
├─ 👤 Profile
├─ 🔑 Change Password
├─ 📋 Activity Log
├─ ─────────────────
└─ 🚪 Logout
```

### 4.3 Core Admin Screens

#### Screen 1: ADMIN DASHBOARD (System Overview)

```
┌─────────────────────────────────────────────────────────┐
│ Home › Dashboard                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ SYSTEM STATUS CARDS (4-column grid)                    │
│                                                         │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────┐ ┌────┐ │
│ │ 🟢 API       │ │ 🟢 Database  │ │ Cache    │ │DB  │ │
│ │ Healthy      │ │ Connected    │ │ Hit: 92% │ │👍  │ │
│ │ 145ms avg    │ │ 4.2GB / 16GB │ │ 1.2GB    │ │Uptime
│ │ Uptime 99.97%│ │ CPU: 12%     │ │ Online   │ │99.97%
│ └──────────────┘ └──────────────┘ └──────────┘ └────┘ │
│                                                         │
│ KEY METRICS (6-column grid, smaller cards)             │
│                                                         │
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────┐ │
│ │ 1      │ │ 500    │ │ 327    │ │ 1,850  │ │Avg │ │
│ │ School │ │Students│ │ Active │ │ Entries│ │127 │ │
│ │        │ │        │ │ (30d)  │ │ (Month)│ │pts │ │
│ └────────┘ └────────┘ └────────┘ └────────┘ └────┘ │
│                                                         │
│ DAILY ACTIVITY TREND (Chart, full width)              │
│                                                         │
│ ┌───────────────────────────────────────────────────┐ │
│ │ Entries Logged (Last 30 Days)                    │ │
│ │                                                   │ │
│ │ [Line Chart: 30 data points]                     │ │
│ │ Y-axis: 0-200 entries                            │ │
│ │ X-axis: Jun 1-30                                 │ │
│ │                                                   │ │
│ └───────────────────────────────────────────────────┘ │
│                                                         │
│ REVENUE BREAKDOWN (2-column: Pie + Table)            │
│                                                         │
│ ┌──────────────────┐ ┌──────────────────────────────┐ │
│ │ [Pie Chart]      │ │ Material Revenue: Rp 813.6k │ │
│ │ 60% Plastic      │ │ Fees (30%): -Rp 244k       │ │
│ │ 40% Paper        │ │ School Net: Rp 609.8k      │ │
│ │                  │ │ Status: ✓ Paid Jun 28     │ │
│ └──────────────────┘ └──────────────────────────────┘ │
│                                                         │
│ RECENT AUDIT LOG (Table, last 10 entries)            │
│                                                         │
│ Time       │ User          │ Action              │Status│
│ ───────────┼───────────────┼─────────────────────┼─────│
│ 15:32      │ admin@sirkula │ Added reward        │ ✓   │
│ 14:15      │ staff@school  │ Redeemed 100 pts   │ ✓   │
│ 12:00      │ System        │ Daily backup       │ ✓   │
│ ... [View full audit log]                             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**React Component Structure:**
```jsx
<AdminDashboard>
  <PageHeader title="Dashboard" subtitle="System Overview" />
  
  <StatusGrid>
    <StatusCard icon="🟢" title="API" status="Healthy" metric="145ms avg" />
    <StatusCard icon="🟢" title="Database" status="Connected" metric="4.2GB / 16GB" />
    {/* ... 2 more */}
  </StatusGrid>
  
  <KeyMetricsGrid>
    <MetricCard label="Schools" value={1} />
    <MetricCard label="Students" value={500} />
    {/* ... 4 more */}
  </KeyMetricsGrid>
  
  <ChartSection title="Daily Activity Trend">
    <LineChart data={activityData} />
  </ChartSection>
  
  <TwoColumnSection>
    <LeftColumn>
      <PieChart data={revenueBreakdown} />
    </LeftColumn>
    <RightColumn>
      <FinancialSummary revenue={813600} />
    </RightColumn>
  </TwoColumnSection>
  
  <AuditTable entries={auditLogs} limit={10} />
</AdminDashboard>
```

---

#### Screen 2: SCHOOLS MANAGEMENT

```
┌─────────────────────────────────────────────────────────┐
│ Home › Schools                                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ [+ Add New School]  [Filters ▼]  [Search ───────────┐  │
│                                                    │  │  │
│ TABLE: Schools List (8-column)                       │  │
│                                                         │
│ ┌────────────┬──────────────┬─────────┬────┬──────┐ │
│ │ School     │ Principal    │Students │Act │  $   │ │
│ │ Name       │ / Contact    │ / Eco   │    │      │ │
│ ├────────────┼──────────────┼─────────┼────┼──────┤ │
│ │ SMA SMM 1  │ Dr. Opy K.   │ 500/2   │✓   │813.6k│ │
│ │ Bandung    │ 0812-244-913 │         │    │      │ │
│ │            │ [Edit] [View]│         │    │ [Pay]│ │
│ ├────────────┼──────────────┼─────────┼────┼──────┤ │
│ │ [More rows as needed]                              │ │
│ └────────────┴──────────────┴─────────┴────┴──────┘ │
│                                                         │
│ Pagination: [< 1 2 3 >]  Showing 1 of 1              │
│                                                         │
│ [ONBOARD NEW SCHOOL WIZARD]                          │
│                                                         │
│ When clicked, modal opens:                            │
│                                                         │
│ ┌──────────────────────────────────────────────────┐ │
│ │ Step 1 of 3: BASIC INFO                        X │ │
│ ├──────────────────────────────────────────────────┤ │
│ │                                                  │ │
│ │ School Name *                                   │ │
│ │ [Text input: ________________]                  │ │
│ │                                                  │ │
│ │ Address *                                       │ │
│ │ [Text input: ________________]                  │ │
│ │                                                  │ │
│ │ Principal Name                                  │ │
│ │ [Text input: ________________]                  │ │
│ │                                                  │ │
│ │ Contact Phone *                                 │ │
│ │ [Tel input: (__) ____-____]                    │ │
│ │                                                  │ │
│ │          [Back] [Next]                          │ │
│ │                                                  │ │
│ └──────────────────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Table Features:**
- Sortable columns (click header to sort ascending/descending)
- Hover rows highlight with light gray bg
- Action buttons (Edit, View, Delete, Archive) in right column
- Inline actions: [Edit] [View Details] [Delete]
- Bulk actions: Checkboxes in first column, action bar appears at top

**Onboard Wizard Steps:**
1. Basic Info (name, address, contact)
2. School Details (student count, eco-station count, revenue share %)
3. Review & Confirm

---

#### Screen 3: SCHOOL DETAILS (Drill-Down)

```
┌─────────────────────────────────────────────────────────┐
│ Home › Schools › SMA Santa Maria 1 Bandung              │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ┌──────────────────────┐ ┌──────────────────────────┐ │
│ │ SMA SANTA MARIA 1    │ │ Status: Active           │ │
│ │ Bandung              │ │ Joined: Jun 1, 2026      │ │
│ │                      │ │ Revenue Share: 60%       │ │
│ │ Dr. Opy Kurniasari   │ │                          │ │
│ │ 0812-2443-913        │ │ [Edit] [Pause] [Archive]│ │
│ └──────────────────────┘ └──────────────────────────┘ │
│                                                         │
│ TAB NAVIGATION (sticky):                              │
│ [Overview] [Students] [Rewards] [Finances] [Logs]   │
│                                                         │
│ ─ OVERVIEW TAB ────────────────────────────────────── │
│                                                         │
│ PERFORMANCE CARDS (4-column)                          │
│                                                         │
│ ┌──────────────┐ ┌──────────────┐ ┌────────┐ ┌───┐  │
│ │ 500          │ │ 327          │ │ 1,440 │ │ 65│  │
│ │ Total        │ │ Active (30d) │ │ kg    │ │ %  │  │
│ │ Students     │ │              │ │ Month │ │ Acc│  │
│ └──────────────┘ └──────────────┘ └────────┘ └───┘  │
│                                                         │
│ WASTE BREAKDOWN (2-column: Chart + Table)            │
│                                                         │
│ ┌──────────────────┐ ┌──────────────────────────────┐ │
│ │ [Horizontal Bar] │ │ Category  │ This Mo │ Last Mo│ │
│ │ Plastic: 50%     │ │ ──────────┼─────────┼────────│ │
│ │ Paper:   15%     │ │ Plastic   │ 720 kg  │ 680 kg│ │
│ │ Residue: 35%     │ │ Paper     │ 216 kg  │ 210 kg│ │
│ │                  │ │ Residue   │ 504 kg  │ 520 kg│ │
│ └──────────────────┘ └──────────────────────────────┘ │
│                                                         │
│ TOP STUDENTS (Table)                                 │
│                                                         │
│ Rank │ Name             │ Points │ Entries │ Streak   │
│ ────┼──────────────────┼────────┼─────────┼──────── │
│  1  │ Budi Santoso     │ 3,420  │ 51      │ 18 days │
│  2  │ Siti Nurhaliza   │ 3,150  │ 45      │ 14 days │
│  3  │ Andi Wijaya      │ 2,890  │ 42      │ 10 days │
│                                                         │
│ [View Full Leaderboard]                              │
│                                                         │
│ ECO-STATION STATUS                                   │
│                                                         │
│ Station           │ Location     │ Scans │ Last Used   │
│ ─────────────────┼──────────────┼───────┼────────────│
│ ESB-01           │ Kantin       │ 487   │ 14:45 (now) │
│ ESB-02           │ Koridor Blok │ 258   │ 11:20 (now) │
│                                                         │
│ [View All Stations]                                  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

#### Screen 4: FMCG COMPANY DATA PORTAL

```
┌─────────────────────────────────────────────────────────┐
│ Home › FMCG Companies › Danone Indonesia                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Danone Indonesia                                        │
│ contact@danone.co.id | Tier: PREMIUM | Active ✓       │
│ Contract: Jun 1, 2026 - Jun 1, 2027                   │
│                                                         │
│ ─────────────────────────────────────────────────────  │
│                                                         │
│ API USAGE THIS MONTH                                  │
│                                                         │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │
│ │ 1,245        │ │ 4            │ │ 92%          │   │
│ │ API Requests │ │ Reports Gen. │ │ Rate Limit   │   │
│ └──────────────┘ └──────────────┘ └──────────────┘   │
│                                                         │
│ RECENT REPORTS                                        │
│                                                         │
│ ┌─────────────────────────────────────────────────┐   │
│ │ June 2026 Brand Audit                      Jul 1│   │
│ │ SMA Santa Maria 1 Bandung | Data Quality: 94% │   │
│ │                                                 │   │
│ │ [Download PDF] [Download CSV] [View JSON]     │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ ┌─────────────────────────────────────────────────┐   │
│ │ May 2026 Brand Audit                        Jun 1│   │
│ │ SMA Santa Maria 1 Bandung | Data Quality: 91% │   │
│ │                                                 │   │
│ │ [Download PDF] [Download CSV] [View JSON]     │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ [Load More Reports]                                  │
│                                                         │
│ SUBSCRIPTION & BILLING                              │
│                                                         │
│ Plan: Premium | Cost: Rp 20,000,000 / month          │
│ Billing Cycle: Monthly (next charge Jul 1, 2026)     │
│ Payment Method: Bank Transfer                         │
│ Status: ✓ Paid                                       │
│                                                         │
│ [Change Plan] [Update Payment Method] [Cancel]       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

### 4.4 Data Tables (Admin Standard)

**Table Component Pattern:**

```jsx
<DataTable
  columns={[
    { key: 'name', label: 'Name', sortable: true, width: '25%' },
    { key: 'email', label: 'Email', sortable: true, width: '25%' },
    { key: 'status', label: 'Status', sortable: true, width: '15%' },
    { key: 'actions', label: 'Actions', sortable: false, width: '35%' },
  ]}
  data={schoolsData}
  pagination={{ pageSize: 20, totalPages: 5 }}
  sorting={{ field: 'name', direction: 'asc' }}
  onSort={(field) => setSorting({ field, direction: 'asc' })}
  onPageChange={(page) => setCurrentPage(page)}
  selectable={true}
  onSelectionChange={(selected) => setSelectedRows(selected)}
  actions={[
    { label: 'Edit', icon: '✏️', onClick: (row) => handleEdit(row) },
    { label: 'Delete', icon: '🗑️', onClick: (row) => handleDelete(row) },
  ]}
/>
```

**Features:**
- Sticky header (scrollable content)
- Sort arrows on column headers
- Hover row highlighting
- Checkboxes for bulk selection (top-left)
- Action buttons in last column
- Pagination at bottom
- "Showing X of Y" text

---

### 4.5 Form Patterns (Admin)

**Standard Form Layout:**

```jsx
<Form onSubmit={handleSubmit}>
  <FormSection title="Basic Information">
    <FormGroup>
      <Label htmlFor="name">School Name *</Label>
      <Input 
        id="name"
        type="text"
        required
        placeholder="e.g., SMA Santa Maria 1"
        error={errors.name}
      />
      <HelperText>Official school name as registered</HelperText>
    </FormGroup>
    
    <FormGroup>
      <Label htmlFor="address">Address *</Label>
      <TextArea 
        id="address"
        required
        rows={3}
        placeholder="Full address with postal code"
      />
    </FormGroup>
  </FormSection>
  
  <FormSection title="Contact Information">
    <FormGroup>
      <Label htmlFor="principal">Principal Name</Label>
      <Input id="principal" type="text" />
    </FormGroup>
    
    <FormGroup>
      <Label htmlFor="phone">Contact Phone *</Label>
      <Input 
        id="phone"
        type="tel"
        placeholder="(XX) XXXX-XXXX"
        required
      />
    </FormGroup>
  </FormSection>
  
  <FormActions>
    <Button type="button" variant="outline" label="Cancel" />
    <Button type="submit" variant="primary" label="Save Changes" />
  </FormActions>
</Form>
```

**Validation Styling:**
- Required fields: Asterisk (*) in red after label
- Invalid fields: Red border + error message below input
- Focused fields: Primary color border, slight shadow
- Disabled fields: Gray bg, no pointer events

---

## 5. SCHOOL STAFF DASHBOARD (Desktop)

### 5.1 Layout (Similar to Admin)

```
Sidebar Navigation:
├─ 📊 Dashboard
├─ 👥 Students
├─ 🎁 Manage Rewards
├─ 📋 Redemptions
├─ 📈 Reports
└─ ⚙️ Settings
```

### 5.2 Key Screens

#### REDEMPTIONS QUEUE (School Staff)

```
┌─────────────────────────────────────────────────────────┐
│ Home › Redemptions                                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ PENDING REDEMPTIONS: 3                                 │
│                                                         │
│ ┌──────────────────────────────────────────────────┐   │
│ │ 🕐 Jun 26, 14:22                         [Fulfill] │   │
│ │                                                  │   │
│ │ Budi Santoso (Student #001)                     │   │
│ │ Reward: Canteen Voucher (Rp 20k)               │   │
│ │ Points Spent: 100                               │   │
│ │                                                  │   │
│ │ ✓ MARK AS COMPLETE                             │   │
│ └──────────────────────────────────────────────────┘   │
│                                                         │
│ ┌──────────────────────────────────────────────────┐   │
│ │ 🕐 Jun 26, 12:15                         [Fulfill] │   │
│ │                                                  │   │
│ │ Siti Nurhaliza (Student #023)                   │   │
│ │ Reward: Free Pastry (Canteen)                   │   │
│ │ Points Spent: 80                                │   │
│ │ SMS Code: ABC123                                │   │
│ │                                                  │   │
│ │ ✓ MARK AS COMPLETE                             │   │
│ └──────────────────────────────────────────────────┘   │
│                                                         │
│ ┌──────────────────────────────────────────────────┐   │
│ │ 🕐 Jun 25, 09:30                         [Fulfill] │   │
│ │                                                  │   │
│ │ Andi Wijaya (Student #045)                      │   │
│ │ Reward: Parking Pass (1 week)                   │   │
│ │ Points Spent: 250                               │   │
│ │ SMS Code: XYZ789                                │   │
│ │                                                  │   │
│ │ ✓ MARK AS COMPLETE                             │   │
│ └──────────────────────────────────────────────────┘   │
│                                                         │
│ COMPLETED (Last 7 Days): 12 | [View All]              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Key Feature:** Staff clicks "Mark as Complete" → system records completion → student notification sent

---

## 6. FMCG DATA PORTAL (Desktop)

### 6.1 Brand Audit Interface

```
┌─────────────────────────────────────────────────────────┐
│ Home › Brand Audit                                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ FILTER & QUERY PANEL (Sidebar, sticky)               │
│                                                         │
│ School(s):   [SMA Santa Maria 1 ▼] [+ Add More]      │
│ Month:       [June 2026 ▼]                            │
│ Your Brands: [☑ Aqua] [☐ Sprite] [☐ Others]         │
│              [Show all brands]                        │
│                                                         │
│ [Apply Filters]                                      │
│                                                         │
│ ─────────────────────────────────────────────────────  │
│                                                         │
│ MAIN REPORT VIEW                                      │
│                                                         │
│ SIRKULA BRAND AUDIT REPORT                            │
│ June 2026 | SMA Santa Maria 1 Bandung | Data: 94%    │
│ Downloaded: [Download PDF] [Download CSV]            │
│                                                         │
│ ───────────────────────────────────────────────────── │
│                                                         │
│ YOUR BRAND PACKAGING DETECTED                         │
│                                                         │
│ ┌─────────────────────────────────────────────────┐   │
│ │ AQUA (Danone Indonesia)                         │   │
│ │ ─────────────────────────────────────────────   │   │
│ │ Packaging Type         │ Count │ Weight │ Share  │   │
│ │ PET Bottle 600ml       │ 145   │ 10.1 kg│ 42%   │   │
│ │ PET Bottle 1.5L        │ 87    │ 9.6 kg │ 28%   │   │
│ │                                                 │   │
│ │ TOTAL: 232 units | 19.7 kg | Market Share: 42% │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ ┌─────────────────────────────────────────────────┐   │
│ │ SPRITE (The Coca-Cola Company)                  │   │
│ │ ─────────────────────────────────────────────   │   │
│ │ PET Bottle 600ml       │ 52    │ 3.8 kg │ 15%   │   │
│ │                                                 │   │
│ │ TOTAL: 52 units | 3.8 kg | Market Share: 15%  │   │
│ └─────────────────────────────────────────────────┘   │
│                                                         │
│ COMPETITOR SUMMARY                                    │
│                                                         │
│ Your Brands: 28% of detectable packaging             │
│ Coca-Cola: 18% | Tropicana: 8% | Others: 46%       │
│                                                         │
│ [View Detailed Breakdown]                            │
│                                                         │
│ INSIGHTS & RECOMMENDATIONS                           │
│                                                         │
│ • Your brands represent 28% of detectable packaging  │
│ • PET bottles dominate (89% of your portfolio)       │
│ • Growth vs May: +12% volume, stable share          │
│                                                         │
│ Recommendation: Focus EPR efforts on PET reduction   │
│                                                         │
│ ESG/EPR METRICS                                      │
│                                                         │
│ Total plastic packaging attributed: 8.9 kg          │
│ CO₂e avoided via sorting: ~5.1 kg                   │
│ Your contribution to circular economy: 57%          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 7. RESPONSIVE BEHAVIOR

### Mobile (Student App)
- **Breakpoint 320px–768px:** Single column, large touch targets, bottom tab nav
- **Breakpoint 768px–1024px:** Tablet layout (2 columns possible, but maintain mobile UX)
- **No desktop redirect:** Student app is always mobile-optimized

### Desktop (Admin/School/FMCG)
- **Minimum 1440px:** Do not optimize below this
- **Table scaling:** Columns reduce font size, not stack
- **Sidebar:** Collapsible, not hidden on narrow
- **Forms:** 2-column layout on 1600px+

---

## 8. ACCESSIBILITY STANDARDS

### Colors
- All text: WCAG AA contrast ratio (4.5:1 minimum)
- Color alone never conveys information (also use icons/text)
- Example: ✓ "🔴 Failed" not just "Red"

### Keyboard Navigation
- Tab order: Logical (top-left to bottom-right)
- Focus visible: 2px outline on all interactive elements
- Modals: Trap focus inside modal until closed
- Escape key: Closes modals/dropdowns

### Screen Readers
- Alt text on all images (include emoji function)
- Form labels: Associated via `<label htmlFor>` or `aria-label`
- Buttons: Descriptive text, not just "Click"
- Tables: Proper `<th>` headers, `scope` attributes

### Mobile
- Touch targets: Minimum 44x44px (CSS height, not smaller)
- Scrolling: No horizontal scroll required
- Modals: Full screen on mobile (not overlays)

---

## 9. ANIMATION & MICRO-INTERACTIONS

### Student App
- **Page transitions:** Slide left/right (120ms), ease-in-out
- **Button press:** Scale 95% (50ms), instant release
- **Form validation:** Shake input 2x on error (200ms)
- **Points award:** Bounce animation (confetti optional, performance-tested)
- **Leaderboard update:** Fade in new ranks (300ms)
- **Loading states:** Spinner (8-frame animation, looping)

**CSS Example:**
```css
@keyframes buttonPress {
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
}

button:active {
  animation: buttonPress 50ms ease-out;
}
```

### Admin Dashboard
- **Table rows:** Hover slight bg color change (100ms)
- **Charts:** Fade in on load (300ms), animate axis labels
- **Modals:** Fade in (200ms), scale from center
- **Notifications:** Slide in from top (200ms), auto-dismiss
- **Data updates:** Real-time via WebSocket, smooth transitions

---

## 10. COMPONENT LIBRARY (REACT)

### File Structure
```
components/
├── student/
│   ├── HomeScreen.tsx
│   ├── ScanQRScreen.tsx
│   ├── LogWasteForm.tsx
│   ├── RewardsScreen.tsx
│   ├── LeaderboardScreen.tsx
│   ├── ProfileScreen.tsx
│   └── BottomTabBar.tsx
├── admin/
│   ├── AdminDashboard.tsx
│   ├── SchoolsManagement.tsx
│   ├── FMCGManagement.tsx
│   ├── DataTable.tsx
│   └── Charts.tsx
├── common/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   ├── Card.tsx
│   ├── Header.tsx
│   └── Sidebar.tsx
└── hooks/
    ├── useAuth.ts
    ├── useWasteDisposal.ts
    ├── useLeaderboard.ts
    └── useRewards.ts
```

---

## 11. DESIGN HANDOFF (FOR DESIGNERS)

### Figma Structure (Recommended)
```
Sirkula Design System
├─ 01. Foundations
│  ├─ Colors
│  ├─ Typography
│  ├─ Spacing
│  └─ Shadows
├─ 02. Components (Atoms)
│  ├─ Buttons
│  ├─ Inputs
│  ├─ Cards
│  └─ Icons
├─ 03. Student App (Pages)
│  ├─ Home
│  ├─ Scan QR
│  ├─ Log Waste
│  ├─ Rewards
│  ├─ Profile
│  └─ Leaderboard
├─ 04. Admin Dashboard (Pages)
│  ├─ Dashboard
│  ├─ Schools
│  ├─ FMCG
│  └─ Financial
└─ 05. Prototypes
   ├─ Student Flow (Scan → Redeem)
   └─ Admin Flow (Onboard → Monitor)
```

### Handoff Checklist
- ✅ All components documented (props, states, variations)
- ✅ Color tokens exported as CSS/JSON
- ✅ Typography scale specified
- ✅ Interaction timings documented (120ms, 300ms, etc.)
- ✅ Responsive breakpoints tested
- ✅ Accessibility notes (contrast, focus states)
- ✅ Mobile safe areas marked

---

## 12. PERFORMANCE TARGETS

| Metric | Student App | Admin Dashboard |
|--------|-------------|-----------------|
| **First Contentful Paint (FCP)** | < 2s | < 1.5s |
| **Largest Contentful Paint (LCP)** | < 3s | < 2.5s |
| **Cumulative Layout Shift (CLS)** | < 0.1 | < 0.05 |
| **Page Load (JS Bundle)** | < 200KB | < 250KB |
| **QR Scan Detection** | < 500ms | N/A |
| **API Response Time** | < 300ms | < 200ms |

**Optimization Strategies:**
- Code splitting by route (Next.js)
- Image lazy loading (Cloudinary responsive)
- WebSocket for real-time updates (not polling)
- Service Workers for offline caching (student app)
- Minimize third-party scripts

---

## 13. TESTING CHECKLIST (QA)

### Student App
- [ ] QR scan works on Android + iOS
- [ ] Camera permissions handled gracefully
- [ ] Offline mode: Can log waste, syncs on reconnect
- [ ] Points calculation accurate (+photo bonus)
- [ ] Leaderboard updates real-time
- [ ] SMS voucher code received within 5s
- [ ] Mobile responsiveness (320px–768px)
- [ ] Safe area insets respected (notch)

### Admin Dashboard
- [ ] Data table sorts & filters correctly
- [ ] Modal forms validate properly
- [ ] Charts render without performance issues
- [ ] Real-time updates via WebSocket
- [ ] Export to PDF/CSV works
- [ ] Keyboard shortcuts functional
- [ ] Dark mode (if added later)

---

**End of Design System Document**

### Quick Reference: Key Components

| Component | Mobile | Desktop | Props |
|-----------|--------|---------|-------|
| `Button` | ✅ | ✅ | label, variant, size, loading, disabled |
| `Card` | ✅ | ✅ | title, icon, shadowSize, onPress |
| `DataTable` | | ✅ | columns, data, sortable, selectable |
| `Modal` | ✅ | ✅ | visible, title, type, onClose |
| `QRCodeReader` | ✅ | | onScan, constraints, ref |
| `BottomTabBar` | ✅ | | tabs, activeTab, onChange |
| `LineChart` | | ✅ | data, xAxis, yAxis |

