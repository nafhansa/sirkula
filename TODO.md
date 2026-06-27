# SIRKULA – COMPREHENSIVE TO-DO LIST

## v1.0 | Mobile-First Student App + Desktop Admin Dashboards

---

## STATUS LEGEND

- `[ ]` Belum dikerjakan
- `[~]` Sedang dikerjakan
- `[x]` Selesai

---

## 🏗️ FASE 0: PROJECT SETUP & FOUNDATION

### 0.1 Inisialisasi Project

- [x] Inisialisasi repo monorepo (Next.js atau Vite + React)
- [x] Setup TypeScript strict mode
- [x] Setup ESLint + Prettier + Husky pre-commit hooks
- [x] Setup path aliases (`@/components`, `@/hooks`, dll.)
- [x] Setup environment variables (`.env.local`, `.env.production`)
- [x] Setup CI/CD pipeline dasar (GitHub Actions)

### 0.2 Design Tokens Setup

- [x] Buat file `tokens.css` atau `globals.css` dengan semua CSS custom properties:
  - [x] `--color-primary-dark: #1B5E3F`
  - [x] `--color-primary: #2D8659`
  - [x] `--color-primary-light: #4CAF7D`
  - [x] `--color-primary-lighter: #E8F5E9`
  - [x] `--color-success: #4CAF50`
  - [x] `--color-warning: #FF9800`
  - [x] `--color-danger: #F44336`
  - [x] `--color-info: #2196F3`
  - [x] `--color-neutral-100` hingga `--color-neutral-900` (6 level)
  - [x] `--color-plastic: #2196F3`
  - [x] `--color-paper: #FF9800`
  - [x] `--color-residue: #795548`
- [x] Buat typography tokens:
  - [x] Font stack sans & mono
  - [x] Font sizes mobile: `xs` (12px) s/d `4xl` (32px)
  - [x] Font sizes admin: `xs` (11px) s/d `xl` (16px)
  - [x] Font weights: `light`, `regular`, `semibold`, `bold`
- [x] Buat spacing tokens: `xs` (4px), `sm` (8px), `md` (16px), `lg` (24px), `xl` (32px), `2xl` (48px)
- [x] Buat border radius tokens: `sm` (4px), `md` (8px), `lg` (12px), `xl` (16px), `full` (9999px)
- [x] Buat border tokens: `--border-light`, `--border-default`
- [x] Buat shadow tokens: student app (`sm`, `md`, `lg`) dan admin (`admin-sm`, `admin-md`, `admin-lg`)
- [x] Setup Tailwind config dengan semua token di atas (jika pakai Tailwind)

### 0.3 Setup Dependencies

- [x] Install `html5-qrcode` atau library QR scanner
- [ ] Install Cloudinary SDK untuk photo upload
- [x] Install charting library (Recharts / Chart.js / Nivo)
- [x] Install form validation library (`zod` + `react-hook-form`)
- [x] Install state management (Zustand / Redux Toolkit)
- [ ] Install WebSocket client library
- [x] Install IndexedDB wrapper (idb / Dexie.js) untuk offline support
- [ ] Setup Service Worker (Workbox atau manual)

---

## 📱 FASE 1: STUDENT MOBILE APP (PWA)

### 1.1 Layout & Navigation Foundation

- [ ] Setup PWA manifest (`manifest.json`)
- [ ] Konfigurasi viewport 320px–768px mobile-first
- [ ] Buat komponen `BottomTabBar`:
  - [ ] 4 tab: Home (🏠), Scan (📱), Rewards (🎁), Profile (👤)
  - [ ] Tinggi 60px
  - [ ] Safe area padding (iOS notch) dengan `env(safe-area-inset-bottom)`
  - [ ] Active tab: primary color + bold font
  - [ ] Inactive tabs: neutral gray
  - [ ] Tab labels visible (bukan icon-only)
- [ ] Buat komponen `Header` mobile:
  - [ ] Judul sekolah di kiri
  - [ ] Notification bell icon di kanan
  - [ ] Back button (optional)
  - [ ] Safe area padding atas: `env(safe-area-inset-top)`
- [ ] Setup responsive breakpoints:
  - [ ] Base: 320px–479px (phones)
  - [ ] `@media (min-width: 480px)`: small tablets
  - [ ] `@media (min-width: 768px)`: iPad / tablets
  - [ ] Safe area insets untuk header dan bottom tab

### 1.2 Screen 1: HOME DASHBOARD

- [ ] Buat komponen `GreetingCard`:
  - [ ] "Welcome back, [Nama]! 👋"
  - [ ] "Last activity: [waktu]"
- [ ] Buat komponen `PointsHeroCard`:
  - [ ] Background `--color-primary-light`, teks putih
  - [ ] Border radius 16px, shadow 8px
  - [ ] Tampilkan total poin (format: `2,450`)
  - [ ] Tampilkan rank sekolah (`📊 Rank #8 in School`)
  - [ ] Tampilkan streak (`🔥 Streak: 12 days`)
- [ ] Buat komponen `QuickActionGrid`:
  - [ ] Grid 2x2
  - [ ] 4 tombol: Scan Waste (📸), Redeem Rewards (🎁), View History (📊), See Leaderboard (🏆)
  - [ ] Setiap tombol: ikon + label, shadow-md
- [ ] Buat komponen `ActivityFeed`:
  - [ ] Tampilkan 3 entri terbaru
  - [ ] Format: "Jun 26, 14:30 🔵 Plastic +70 pts"
  - [ ] Tombol "See more..." expandable
  - [ ] Warna berdasarkan kategori (plastik = biru, kertas = oranye, residu = coklat)
- [ ] Susun layout `HomeScreen` dengan urutan: StatusBar → Header → GreetingCard → PointsHeroCard → QuickActionGrid → ActivityFeed → BottomTabBar
- [ ] Padding kiri/kanan 16px
- [ ] Scroll area di antara header dan tab bar

### 1.3 Screen 2: SCAN QR CODE

- [ ] Buat komponen `QRCodeReader`:
  - [ ] Integrasi `html5-qrcode`
  - [ ] Full-screen camera (safe area aware)
  - [ ] Constraint: `facingMode: "environment"` (kamera belakang)
  - [ ] 60fps camera stream
  - [ ] Debounce scan detection 500ms
- [ ] Buat komponen `ScanFrameOverlay`:
  - [ ] Frame 200x200px
  - [ ] Dashed border, warna primary
  - [ ] Posisi di tengah viewfinder
- [ ] Handle camera permissions:
  - [ ] Request permission saat mount
  - [ ] Handle denial gracefully (tampilkan pesan error + instruksi)
- [ ] Buat `StatusMessage` saat QR terdeteksi:
  - [ ] Icon ✅
  - [ ] Nama eco-station (`Eco-Station: Kantin Area (ESB-01)`)
  - [ ] Toast notification auto-dismiss 300ms
- [ ] Buat tombol `[NEXT]` setelah scan berhasil → navigate ke Log Waste
- [ ] Buat `HelperText`: "Point camera at QR code on bin"
- [ ] Susun layout `ScanScreen`

### 1.4 Screen 3: LOG WASTE (Post-Scan Form)

- [ ] Buat komponen `StationDisplay` (read-only):
  - [ ] Tampilkan nama eco-station yang di-scan
  - [ ] Icon ✅
- [ ] Buat komponen `CategorySelector`:
  - [ ] 3 pilihan: Plastic Bottles (🔵, 50 pts), Paper & Cardboard (📄, 40 pts), Residue/Mixed (⚫, 10 pts)
  - [ ] Radio button style, setiap opsi min 48px tinggi (thumb-friendly)
  - [ ] Active: primary color bg, teks putih, check icon
  - [ ] Grid 2-kolom (stack pada layar sempit)
  - [ ] Padding 12px per card
- [ ] Buat komponen `PhotoUploader`:
  - [ ] Integrasi Cloudinary widget
  - [ ] Placeholder 120x120px
  - [ ] Label: "ADD PHOTO (OPTIONAL) +20 BONUS PTS"
- [ ] Buat `TextInput` untuk Notes:
  - [ ] Opsional
  - [ ] Max 200 karakter
  - [ ] Placeholder "Optional notes..."
  - [ ] Counter karakter
- [ ] Buat komponen `PointsPreview` (real-time):
  - [ ] Base points (tergantung kategori)
  - [ ] Photo bonus: +20 pts jika foto diupload
  - [ ] Total kalkulasi
  - [ ] Update real-time saat user memilih opsi
- [ ] Implementasi form validation dengan Zod:
  ```
  eco_station_id: uuid, required
  category: enum('plastic','paper','residue'), required
  photo_url: url, optional
  notes: string max 200, optional
  ```
- [ ] Tombol `[SUBMIT WASTE]`:
  - [ ] Full width
  - [ ] Disabled sampai kategori dipilih
  - [ ] Loading spinner saat submit
- [ ] Tombol `[CANCEL]` secondary action
- [ ] Susun layout `LogWasteScreen`

### 1.5 Screen 4: REWARDS CATALOG

- [ ] Buat komponen `BalanceCard`:
  - [ ] Prominent: "💰 BALANCE: 2,450 POINTS"
  - [ ] Sticky header, update real-time saat redeem
- [ ] Buat komponen `FilterChips`:
  - [ ] Kategori: All, Canteen, Vouchers, School
  - [ ] Horizontal scrollable
  - [ ] Toggle-style selection
- [ ] Buat komponen `RewardCard`:
  - [ ] Full width, padding 12px, shadow-md on hover
  - [ ] Tampilkan: nama reward, cost (pts), stok
  - [ ] Tombol REDEEM (primary green) jika tersedia
  - [ ] Tombol OUT OF STOCK (disabled, gray) jika stok 0
- [ ] Implementasi Redemption Flow:
  - [ ] Step 1: Tap [REDEEM]
  - [ ] Step 2: Confirmation modal "Spend X points for [reward]?"
  - [ ] Step 3: API call submit
  - [ ] Step 4: Toast success "✅ Voucher Code: ABC123 sent to SMS"
  - [ ] Step 5: Modal display kode + instruksi "Show this to canteen"
  - [ ] Step 6: Balance update immediately
- [ ] Buat komponen `RedemptionModal`
- [ ] Implementasi pagination / "Load more..."
- [ ] Susun layout `RewardsScreen`

### 1.6 Screen 5: PERSONAL PROFILE / WASTE PASSPORT

- [ ] Buat section profile:
  - [ ] Foto profil 80x80px, circle
  - [ ] Nama lengkap
  - [ ] Nama sekolah
  - [ ] Tanggal bergabung
  - [ ] Padding 24px, white card, center-aligned
- [ ] Buat `StatsGrid` (3 kolom):
  - [ ] ⭐ Total Points
  - [ ] 📊 Total Entries
  - [ ] 🌱 CO₂e kg (dihindarkan)
  - [ ] 🔥 Current Streak
  - [ ] 📈 Your Rank (sekolah)
  - [ ] 💾 Total Weight (kg)
- [ ] Buat `ContributionBreakdown` (30 hari):
  - [ ] 🔵 Plastic: X entries, X pts
  - [ ] 📄 Paper: X entries, X pts
  - [ ] ⚫ Residue: X entries, X pts
- [ ] Buat `RecentActivityList`:
  - [ ] Last 5 entries
  - [ ] Tap "View all X entries" → modal atau screen terpisah
- [ ] Buat tombol akun (2-kolom grid, 48px height):
  - [ ] [EDIT PROFILE]
  - [ ] [LOGOUT]
- [ ] Susun layout `ProfileScreen`

### 1.7 Screen 6: LEADERBOARD

- [ ] Buat `MonthSelector`:
  - [ ] Dropdown atau swipe tabs
  - [ ] Tampilkan 3 bulan terakhir
- [ ] Buat Top 3 highlight:
  - [ ] 🥇🥈🥉 emoji medals
  - [ ] Font lebih besar, primary color
  - [ ] Tampilkan nama + streak
- [ ] Buat list leaderboard:
  - [ ] "You are here" highlighted (primary-lighter bg + underline)
  - [ ] Format: `#[rank] 👤 [Nama] [Poin]`
  - [ ] Tappable rows (visual feedback)
- [ ] Implementasi infinite scroll / "Load more"
- [ ] Catatan info: "ℹ️ Resets monthly on the 1st"
- [ ] Real-time updates via WebSocket (reflect point changes within 5s)
- [ ] Susun layout `LeaderboardScreen`

---

## 🔌 FASE 2: OFFLINE SUPPORT (SERVICE WORKER)

- [ ] Setup `service-worker.js`
- [ ] Implementasi Background Sync API:
  - [ ] Event listener untuk `sync-waste-logs`
  - [ ] Retry failed logs dari IndexedDB
  - [ ] Fetch ke `/api/students/{id}/waste-disposal` dengan method POST
- [ ] Setup IndexedDB schema:
  - [ ] Object store `pending_logs`
  - [ ] CRUD operations untuk pending logs
- [ ] Client-side offline logic:
  - [ ] Check `serviceWorker` support
  - [ ] Save log ke IndexedDB sebelum network request
  - [ ] Register `sync-waste-logs` background sync
  - [ ] Tampilkan UI feedback: "Will sync when online"
- [ ] Handle online/offline events di UI
- [ ] Test skenario: scan → log → koneksi putus → reconnect → sync otomatis

---

## 🖥️ FASE 3: ADMIN DASHBOARD (Desktop)

### 3.1 Layout & Navigation Admin

- [ ] Setup layout admin desktop (1440px+):
  - [ ] Header fixed 64px
  - [ ] Sidebar 280px (collapsible ke 64px icon-only)
  - [ ] Main content: sisa lebar, padding 24px
  - [ ] Max content width: 1200px (opsional)
- [ ] Buat komponen `AdminHeader`:
  - [ ] Logo + "SIRKULA ADMIN"
  - [ ] User avatar dengan dropdown menu
  - [ ] Notifikasi icon
  - [ ] Settings icon
  - [ ] Dropdown menu: 👤 Profile, 🔑 Change Password, 📋 Activity Log, 🚪 Logout
- [ ] Buat komponen `AdminSidebar`:
  - [ ] Collapsed & expanded state
  - [ ] Menu items: Home (🏠), Schools (🏫), FMCG Companies (🏢), Reports (📊), Financial (💰), Settings (⚙️)
  - [ ] Sub-menu items per section (expanded view):
    - Schools: All Schools, Onboard New, Performance
    - FMCG: Active Contracts, Subscriptions, API Keys
    - Reports: Brand Audit, Financial, System Health
    - Financial: Reconciliation, Payouts, Revenue
    - Settings: System Config, Users, Audit Logs
  - [ ] Tombol [Collapse] di bawah sidebar
  - [ ] Active item highlight
- [ ] Buat komponen `Breadcrumb`
- [ ] Sidebar collapsible logic (toggle 280px ↔ 64px)

### 3.2 Screen 1: ADMIN DASHBOARD (System Overview)

- [ ] Buat `SystemStatusGrid` (4 kolom):
  - [ ] StatusCard: API (🟢 Healthy, 145ms avg, Uptime 99.97%)
  - [ ] StatusCard: Database (🟢 Connected, 4.2GB/16GB, CPU 12%)
  - [ ] StatusCard: Cache (Hit 92%, 1.2GB, Online)
  - [ ] StatusCard: DB Uptime (99.97%)
- [ ] Buat `KeyMetricsGrid` (6 kolom, smaller cards):
  - [ ] Schools count
  - [ ] Total Students
  - [ ] Active (30d)
  - [ ] Entries (Month)
  - [ ] Avg Points
- [ ] Buat `DailyActivityChart`:
  - [ ] Line chart 30 data points
  - [ ] Y-axis: 0–200 entries
  - [ ] X-axis: tanggal bulan ini
  - [ ] Full width
  - [ ] Fade in on load 300ms
- [ ] Buat `RevenueBreakdown` (2 kolom):
  - [ ] Pie chart: kategori material (Plastic 60%, Paper 40%, dll.)
  - [ ] Tabel financial summary: Material Revenue, Fees 30%, School Net, Status
- [ ] Buat `RecentAuditTable`:
  - [ ] Kolom: Time, User, Action, Status
  - [ ] 10 entri terbaru
  - [ ] Link "View full audit log"
- [ ] Susun layout `AdminDashboardScreen`

### 3.3 Screen 2: SCHOOLS MANAGEMENT

- [ ] Buat tombol `[+ Add New School]`, `[Filters ▼]`, search input
- [ ] Buat `SchoolsTable`:
  - [ ] Kolom: School Name, Principal/Contact, Students/Eco, Active, Revenue, Actions
  - [ ] Sortable columns (click header)
  - [ ] Hover row highlight (light gray)
  - [ ] Action buttons per row: [Edit] [View] [Delete]
  - [ ] Checkboxes bulk selection (first column)
  - [ ] Bulk action bar (muncul saat ada selection)
  - [ ] Pagination: [< 1 2 3 >] + "Showing X of Y"
- [ ] Buat `OnboardSchoolWizard` (3 langkah, modal):
  - [ ] Step 1: Basic Info (name, address, principal name, contact phone)
  - [ ] Step 2: School Details (student count, eco-station count, revenue share %)
  - [ ] Step 3: Review & Confirm
  - [ ] Progress indicator
  - [ ] [Back] [Next] navigation
  - [ ] [Submit] di langkah terakhir
- [ ] Susun layout `SchoolsManagementScreen`

### 3.4 Screen 3: SCHOOL DETAILS (Drill-Down)

- [ ] Buat header school detail (2 kolom):
  - [ ] Kiri: nama sekolah, kota, nama principal, phone
  - [ ] Kanan: Status, Joined date, Revenue Share %, tombol [Edit] [Pause] [Archive]
- [ ] Buat `SchoolDetailTabs` (sticky):
  - [ ] Tab: Overview, Students, Rewards, Finances, Logs
- [ ] **Tab Overview:**
  - [ ] `PerformanceCards` (4 kolom): Total Students, Active (30d), Waste kg (Month), Acceptance Rate %
  - [ ] `WasteBreakdown` (2 kolom): Horizontal Bar Chart + Tabel perbandingan (This Mo vs Last Mo)
  - [ ] `TopStudentsTable`: Rank, Name, Points, Entries, Streak
  - [ ] Link "View Full Leaderboard"
  - [ ] `EcoStationStatus` table: Station ID, Location, Total Scans, Last Used
  - [ ] Link "View All Stations"
- [ ] **Tab Students:** (daftar semua siswa dengan filter/sort)
- [ ] **Tab Rewards:** (manajemen reward spesifik sekolah)
- [ ] **Tab Finances:** (detail keuangan dan payout)
- [ ] **Tab Logs:** (activity logs sekolah)
- [ ] Susun layout `SchoolDetailsScreen`

### 3.5 Screen 4: FMCG COMPANY DATA PORTAL

- [ ] Buat header company detail:
  - [ ] Nama perusahaan, email, Tier, Status
  - [ ] Periode kontrak
- [ ] Buat `APIUsageCards` (3 kolom):
  - [ ] API Requests bulan ini
  - [ ] Reports generated
  - [ ] Rate limit usage %
- [ ] Buat `RecentReportsList`:
  - [ ] Card per report: judul, tanggal, sekolah, Data Quality %
  - [ ] Tombol: [Download PDF] [Download CSV] [View JSON]
  - [ ] Pagination / "Load More Reports"
- [ ] Buat `SubscriptionBillingSection`:
  - [ ] Plan, cost, billing cycle, next charge date
  - [ ] Payment method, status
  - [ ] Tombol: [Change Plan] [Update Payment Method] [Cancel]
- [ ] Susun layout `FMCGCompanyScreen`

---

## 🏫 FASE 4: SCHOOL STAFF DASHBOARD (Desktop)

### 4.1 Layout & Navigation School Staff

- [ ] Setup layout mirip admin
- [ ] Buat sidebar school staff:
  - [ ] Menu: Dashboard (📊), Students (👥), Manage Rewards (🎁), Redemptions (📋), Reports (📈), Settings (⚙️)
- [ ] Buat header school staff

### 4.2 Screen: REDEMPTIONS QUEUE

- [ ] Buat header "PENDING REDEMPTIONS: [count]"
- [ ] Buat `RedemptionCard` per pending:
  - [ ] Timestamp
  - [ ] Nama siswa + ID
  - [ ] Nama reward
  - [ ] Points spent
  - [ ] SMS Code (jika ada)
  - [ ] Tombol [Fulfill]
  - [ ] Tombol "✓ MARK AS COMPLETE"
- [ ] Implementasi "Mark as Complete" flow:
  - [ ] Klik → API call record completion
  - [ ] Trigger notifikasi ke siswa
  - [ ] Hapus dari pending list
- [ ] Tampilkan "COMPLETED (Last 7 Days): [count] | [View All]"
- [ ] Susun layout `RedemptionsQueueScreen`

### 4.3 Screen: STUDENTS LIST (School Staff)

- [ ] Tabel daftar siswa dengan sort/filter
- [ ] Detail per siswa: nama, poin, entries, streak, status

### 4.4 Screen: MANAGE REWARDS (School Staff)

- [ ] CRUD rewards: tambah, edit, hapus, atur stok
- [ ] Toggle reward active/inactive

### 4.5 Screen: REPORTS (School Staff)

- [ ] Laporan aktivitas sekolah
- [ ] Export ke PDF/CSV

---

## 🏭 FASE 5: FMCG DATA PORTAL (Desktop)

### 5.1 Brand Audit Interface

- [ ] Buat `FilterQueryPanel` (sidebar sticky):
  - [ ] Multi-select sekolah
  - [ ] Dropdown bulan
  - [ ] Checkbox brand filter
  - [ ] Tombol [Apply Filters]
- [ ] Buat `BrandAuditReport`:
  - [ ] Header: judul, periode, sekolah, Data Quality %
  - [ ] Tombol download: [Download PDF] [Download CSV]
- [ ] Buat `BrandPackagingSection` per brand:
  - [ ] Nama brand & parent company
  - [ ] Tabel: Packaging Type, Count, Weight, Share %
  - [ ] Total: units, weight, market share %
- [ ] Buat `CompetitorSummarySection`:
  - [ ] Breakdown % per competitor
  - [ ] Link "View Detailed Breakdown"
- [ ] Buat `InsightsRecommendationsSection`:
  - [ ] Bullet points insights otomatis
  - [ ] Recommendation teks
- [ ] Buat `ESGMetricsSection`:
  - [ ] Total plastic packaging attributed (kg)
  - [ ] CO₂e avoided via sorting (kg)
  - [ ] Contribution to circular economy (%)
- [ ] Susun layout `BrandAuditScreen`

---

## 🧩 FASE 6: SHARED COMPONENT LIBRARY

### 6.1 Atomic Components (`components/common/`)

- [ ] **Button** (`Button.tsx`):
  - [ ] Props: label, variant (primary/secondary/outline), size (md=48px), fullWidth, loading, disabled, onPress
  - [ ] Variants: primary (bg-primary, white text), secondary, outline
  - [ ] States: hover (bg-primary-dark), active (scale 95%), disabled (opacity 50%, no pointer)
  - [ ] Loading: spinner inside button
  - [ ] Transition: 150ms all
- [ ] **Card** (`Card.tsx`):
  - [ ] Props: title, icon, color (primary/success/warning), shadowSize (sm/md/lg), onPress
  - [ ] Tap handler (optional)
- [ ] **Input/TextInput** (`Input.tsx`):
  - [ ] Props: label, placeholder, value, onChange, maxLength, type (text/number/email), error, helperText
  - [ ] States: focused (primary border + shadow), invalid (red border + error msg), disabled (gray bg)
  - [ ] Min height 48px (mobile) / 36px (admin)
- [ ] **Modal** (`Modal.tsx`):
  - [ ] Props: visible, title, onClose, type (alert/confirmation/choice)
  - [ ] Slot: ModalContent, ModalActions
  - [ ] Focus trap saat terbuka
  - [ ] Escape key untuk close
  - [ ] Full screen di mobile
  - [ ] Fade in 200ms, scale from center (desktop)
- [ ] **Header** (`Header.tsx`):
  - [ ] Mobile: dengan back button + title + right icon
  - [ ] Admin: dengan breadcrumb
- [ ] **Sidebar** (`Sidebar.tsx`):
  - [ ] Collapsible (280px ↔ 64px)
  - [ ] Active item highlight
  - [ ] Sub-menu accordion
- [ ] **Spinner/Loading** component (8-frame animation, looping)
- [ ] **Toast/Notification** component:
  - [ ] Slide in from top 200ms
  - [ ] Auto-dismiss
  - [ ] Variants: success, error, warning, info
- [ ] **TextArea** component
- [ ] **Select/Dropdown** component
- [ ] **Checkbox** component
- [ ] **RadioButton** component
- [ ] **Badge/Chip** component
- [ ] **Avatar** component (circle, dengan fallback)
- [ ] **Pagination** component

### 6.2 Admin-Specific Components (`components/admin/`)

- [ ] **DataTable** (`DataTable.tsx`):
  - [ ] Props: columns, data, pagination, sorting, selectable, onSort, onPageChange, onSelectionChange, actions
  - [ ] Sticky header (content scrollable)
  - [ ] Sort arrows on column headers
  - [ ] Hover row highlight
  - [ ] Checkboxes bulk selection (top-left)
  - [ ] Action buttons last column
  - [ ] Pagination di bawah
  - [ ] "Showing X of Y" text
- [ ] **Charts** (`Charts.tsx`):
  - [ ] LineChart (daily activity)
  - [ ] PieChart (revenue breakdown)
  - [ ] HorizontalBarChart (waste breakdown)
  - [ ] Fade in on load 300ms
  - [ ] Animate axis labels
- [ ] **StatusCard** (untuk system status)
- [ ] **MetricCard** (untuk key metrics)
- [ ] **FormSection** + **FormGroup** + **FormActions**
- [ ] **PageHeader** (judul + subtitle + breadcrumb)
- [ ] **AuditTable**

### 6.3 Student-Specific Components (`components/student/`)

- [ ] **BottomTabBar** (lihat 1.1)
- [ ] **QRCodeReader** (lihat 1.3)
- [ ] **ScanFrameOverlay** (lihat 1.3)
- [ ] **PointsHeroCard** (lihat 1.2)
- [ ] **ActivityFeed** (lihat 1.2)
- [ ] **CategorySelector** (lihat 1.4)
- [ ] **PhotoUploader** (lihat 1.4)
- [ ] **PointsPreview** (lihat 1.4)
- [ ] **RewardCard** (lihat 1.5)
- [ ] **FilterChips** (lihat 1.5)
- [ ] **RedemptionModal** (lihat 1.5)

---

## 🔗 FASE 7: HOOKS & STATE MANAGEMENT

### 7.1 Custom Hooks (`hooks/`)

- [ ] **useAuth** (`useAuth.ts`):
  - [ ] Login, logout, check session
  - [ ] Role-based: student, school_staff, admin, fmcg
  - [ ] Persist auth state
- [ ] **useWasteDisposal** (`useWasteDisposal.ts`):
  - [ ] Submit waste log
  - [ ] Fetch history
  - [ ] Offline queue logic
- [ ] **useLeaderboard** (`useLeaderboard.ts`):
  - [ ] Fetch leaderboard data
  - [ ] WebSocket subscription
  - [ ] Filter by month
- [ ] **useRewards** (`useRewards.ts`):
  - [ ] Fetch rewards catalog
  - [ ] Redeem reward
  - [ ] Fetch redemption history
- [ ] **useProfile** hook:
  - [ ] Fetch student stats
  - [ ] Update profile
- [ ] **useOffline** hook:
  - [ ] Detect online/offline status
  - [ ] Manage pending sync queue

### 7.2 Global State

- [ ] Auth state (user info, role, token)
- [ ] Student points & streak (real-time)
- [ ] Notification state
- [ ] WebSocket connection state

---

## ⚡ FASE 8: REAL-TIME & WEBSOCKET

- [ ] Setup WebSocket server connection
- [ ] Subscribe leaderboard updates (reflect changes within 5s)
- [ ] Subscribe points updates (saat siswa lain log waste)
- [ ] Admin dashboard real-time updates (entries, system status)
- [ ] Handle WebSocket reconnection (auto-reconnect dengan exponential backoff)
- [ ] Smooth transitions saat data update (fade in 300ms)

---

## 🎨 FASE 9: ANIMATIONS & MICRO-INTERACTIONS

### 9.1 Student App

- [ ] Page transitions: slide left/right 120ms ease-in-out
- [ ] Button press: scale 95% (50ms), instant release
  ```css
  @keyframes buttonPress {
    0% {
      scale: 1;
    }
    50% {
      scale: 0.95;
    }
    100% {
      scale: 1;
    }
  }
  button:active {
    animation: buttonPress 50ms ease-out;
  }
  ```
- [ ] Form validation error: shake input 2x (200ms)
- [ ] Points award: bounce animation (confetti optional, test performance)
- [ ] Leaderboard update: fade in new ranks (300ms)
- [ ] Loading states: spinner (8-frame animation, looping)

### 9.2 Admin Dashboard

- [ ] Table rows hover: bg color change (100ms)
- [ ] Charts: fade in on load (300ms), animate axis labels
- [ ] Modals: fade in (200ms), scale from center
- [ ] Notifications: slide in from top (200ms), auto-dismiss
- [ ] Data WebSocket updates: smooth transitions

---

## ♿ FASE 10: ACCESSIBILITY (a11y)

- [ ] Semua teks: WCAG AA contrast ratio minimum 4.5:1
- [ ] Informasi tidak hanya dari warna (tambah ikon/teks): contoh "🔴 Failed" bukan hanya merah
- [ ] Tab order logis (top-left ke bottom-right)
- [ ] Focus visible: outline 2px pada semua elemen interaktif
- [ ] Modals: trap focus di dalam modal sampai ditutup
- [ ] Escape key: closes modal/dropdowns
- [ ] Alt text pada semua gambar (termasuk fungsi emoji)
- [ ] Form labels: associated via `<label htmlFor>` atau `aria-label`
- [ ] Button text: deskriptif, bukan hanya "Click"
- [ ] Tables: `<th>` headers dengan `scope` attributes
- [ ] Touch targets mobile: minimum 44x44px
- [ ] Tidak ada horizontal scroll di mobile
- [ ] Modals: full screen di mobile

---

## ⚡ FASE 11: PERFORMANCE OPTIMIZATION

- [ ] Code splitting by route (Next.js dynamic imports)
- [ ] Image lazy loading (Cloudinary responsive images)
- [ ] WebSocket untuk real-time (tidak polling)
- [ ] Service Workers untuk offline caching (student app)
- [ ] Minimasi third-party scripts
- [ ] Bundle size target: Student App < 200KB, Admin < 250KB
- [ ] Audit FCP: Student < 2s, Admin < 1.5s
- [ ] Audit LCP: Student < 3s, Admin < 2.5s
- [ ] Audit CLS: Student < 0.1, Admin < 0.05
- [ ] API response time target: Student < 300ms, Admin < 200ms
- [ ] QR scan detection target: < 500ms

---

## 🧪 FASE 12: TESTING & QA

### 12.1 Student App Testing

- [ ] QR scan works on Android (minimum Android 8+)
- [ ] QR scan works on iOS (Safari + Chrome)
- [ ] Camera permissions handled gracefully (denial, revoked)
- [ ] Offline mode: dapat log waste saat offline
- [ ] Offline sync: otomatis saat reconnect
- [ ] Points calculation accurate (+photo bonus +20 pts)
- [ ] Leaderboard updates real-time (< 5s)
- [ ] SMS voucher code received within 5s
- [ ] Mobile responsiveness: test di 320px, 375px, 414px, 768px
- [ ] Safe area insets respected (notch devices)
- [ ] Landscape orientation handling

### 12.2 Admin Dashboard Testing

- [ ] DataTable sorts correctly (asc/desc)
- [ ] DataTable filters correctly
- [ ] Modal forms validate properly (required fields, format)
- [ ] Charts render tanpa performance issues
- [ ] Real-time updates via WebSocket
- [ ] Export PDF berfungsi
- [ ] Export CSV berfungsi
- [ ] Keyboard shortcuts functional
- [ ] Pagination bekerja (prev/next, direct page)
- [ ] Bulk selection + bulk actions

### 12.3 Form Validation Testing

- [ ] Required fields: asterisk merah + error jika kosong
- [ ] Invalid fields: red border + error message
- [ ] Focused fields: primary color border + shadow
- [ ] Disabled fields: gray bg, no pointer events
- [ ] Zod schema validation berjalan di semua form

### 12.4 Cross-Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (macOS + iOS)
- [ ] Edge (latest)
- [ ] Samsung Internet (Android)

---

## 📐 FASE 13: DESIGN HANDOFF PREPARATION

- [ ] Ekspor semua color tokens sebagai CSS/JSON
- [ ] Dokumentasikan semua component props & states
- [ ] Dokumentasikan interaction timings (120ms, 300ms, dll.)
- [ ] Test semua responsive breakpoints
- [ ] Catat accessibility notes (contrast, focus states)
- [ ] Tandai mobile safe areas
- [ ] Siapkan Figma structure:
  - [ ] 01. Foundations (Colors, Typography, Spacing, Shadows)
  - [ ] 02. Components Atoms (Buttons, Inputs, Cards, Icons)
  - [ ] 03. Student App Pages (6 screens)
  - [ ] 04. Admin Dashboard Pages (4 screens)
  - [ ] 05. Prototypes (Student Flow, Admin Flow)

---

## 📁 FASE 14: FILE STRUCTURE IMPLEMENTATION

```
components/
├── student/
│   ├── [ ] HomeScreen.tsx
│   ├── [ ] ScanQRScreen.tsx
│   ├── [ ] LogWasteForm.tsx
│   ├── [ ] RewardsScreen.tsx
│   ├── [ ] LeaderboardScreen.tsx
│   ├── [ ] ProfileScreen.tsx
│   └── [ ] BottomTabBar.tsx
├── admin/
│   ├── [ ] AdminDashboard.tsx
│   ├── [ ] SchoolsManagement.tsx
│   ├── [ ] FMCGManagement.tsx
│   ├── [ ] DataTable.tsx
│   └── [ ] Charts.tsx
├── common/
│   ├── [ ] Button.tsx
│   ├── [ ] Input.tsx
│   ├── [ ] Modal.tsx
│   ├── [ ] Card.tsx
│   ├── [ ] Header.tsx
│   └── [ ] Sidebar.tsx
└── hooks/
    ├── [ ] useAuth.ts
    ├── [ ] useWasteDisposal.ts
    ├── [ ] useLeaderboard.ts
    └── [ ] useRewards.ts
```

---

## 🚀 RINGKASAN PRIORITAS MVP

### 🔴 CRITICAL (Harus ada di MVP)

1. Design tokens & setup
2. Student: HomeScreen + PointsHeroCard
3. Student: ScanQRScreen + QRCodeReader
4. Student: LogWasteForm + CategorySelector + form validation
5. Student: RewardsScreen + redemption flow
6. Student: BottomTabBar navigation
7. Common: Button, Input, Modal, Card
8. Admin: AdminDashboard overview
9. Admin: SchoolsManagement + DataTable
10. Admin: Sidebar + Header
11. Service Worker offline support
12. WebSocket real-time updates

### 🟡 IMPORTANT (Sprint 2)

13. Student: ProfileScreen / Waste Passport
14. Student: LeaderboardScreen
15. School Staff: RedemptionsQueue
16. Admin: SchoolDetails drill-down
17. Admin: Charts (Line, Pie, Bar)
18. Accessibility compliance

### 🟢 NICE TO HAVE (Sprint 3+)

19. FMCG Brand Audit Portal
20. School Staff: full dashboard
21. Animations & micro-interactions
22. Performance optimization pass
23. Cross-browser testing
24. Design handoff documentation

---

_Last updated: 2026-06-28_
_Based on: README.md v1.0 – UI/UX Design System & Component Specifications_
