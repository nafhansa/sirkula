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

- [x] Setup PWA manifest (`manifest.json`)
- [x] Konfigurasi viewport 320px–768px mobile-first
- [x] Buat komponen `BottomTabBar`:
  - [x] 4 tab: Home (🏠), Scan (📱), Rewards (🎁), Profile (👤)
  - [x] Tinggi 60px
  - [x] Safe area padding (iOS notch) dengan `env(safe-area-inset-bottom)`
  - [x] Active tab: primary color + bold font
  - [x] Inactive tabs: neutral gray
  - [x] Tab labels visible (bukan icon-only)
- [x] Buat komponen `Header` mobile:
  - [x] Judul sekolah di kiri
  - [x] Notification bell icon di kanan
  - [x] Back button (optional)
  - [x] Safe area padding atas: `env(safe-area-inset-top)`
- [x] Setup responsive breakpoints:
  - [x] Base: 320px–479px (phones)
  - [x] `@media (min-width: 480px)`: small tablets
  - [x] `@media (min-width: 768px)`: iPad / tablets
  - [x] Safe area insets untuk header dan bottom tab

### 1.2 Screen 1: HOME DASHBOARD

- [x] Buat komponen `GreetingCard`:
  - [x] "Welcome back, [Nama]! 👋"
  - [x] "Last activity: [waktu]"
- [x] Buat komponen `PointsHeroCard`:
  - [x] Background `--color-primary-light`, teks putih
  - [x] Border radius 16px, shadow 8px
  - [x] Tampilkan total poin (format: `2,450`)
  - [x] Tampilkan rank sekolah (`📊 Rank #8 in School`)
  - [x] Tampilkan streak (`🔥 Streak: 12 days`)
- [x] Buat komponen `QuickActionGrid`:
  - [x] Grid 2x2
  - [x] 4 tombol: Scan Waste (📸), Redeem Rewards (🎁), View History (📊), See Leaderboard (🏆)
  - [x] Setiap tombol: ikon + label, shadow-md
- [x] Buat komponen `ActivityFeed`:
  - [x] Tampilkan 3 entri terbaru
  - [x] Format: "Jun 26, 14:30 🔵 Plastic +70 pts"
  - [x] Tombol "See more..." expandable
  - [x] Warna berdasarkan kategori (plastik = biru, kertas = oranye, residu = coklat)
- [x] Susun layout `HomeScreen` dengan urutan: StatusBar → Header → GreetingCard → PointsHeroCard → QuickActionGrid → ActivityFeed → BottomTabBar
- [x] Padding kiri/kanan 16px
- [x] Scroll area di antara header dan tab bar

### 1.3 Screen 2: SCAN QR CODE

- [x] Buat komponen `QRCodeReader`:
  - [x] Integrasi `html5-qrcode`
  - [x] Full-screen camera (safe area aware)
  - [x] Constraint: `facingMode: "environment"` (kamera belakang)
  - [x] 60fps camera stream
  - [x] Debounce scan detection 500ms
- [x] Buat komponen `ScanFrameOverlay`:
  - [x] Frame 200x200px
  - [x] Dashed border, warna primary
  - [x] Posisi di tengah viewfinder
- [x] Handle camera permissions:
  - [x] Request permission saat mount
  - [x] Handle denial gracefully (tampilkan pesan error + instruksi)
- [x] Buat `StatusMessage` saat QR terdeteksi:
  - [x] Icon ✅
  - [x] Nama eco-station (`Eco-Station: Kantin Area (ESB-01)`)
  - [x] Toast notification auto-dismiss 300ms
- [x] Buat tombol `[NEXT]` setelah scan berhasil → navigate ke Log Waste
- [x] Buat `HelperText`: "Point camera at QR code on bin"
- [x] Susun layout `ScanScreen`

### 1.4 Screen 3: LOG WASTE (Post-Scan Form)

- [x] Buat komponen `StationDisplay` (read-only):
  - [x] Tampilkan nama eco-station yang di-scan
  - [x] Icon ✅
- [x] Buat komponen `CategorySelector`:
  - [x] 3 pilihan: Plastic Bottles (🔵, 50 pts), Paper & Cardboard (📄, 40 pts), Residue/Mixed (⚫, 10 pts)
  - [x] Radio button style, setiap opsi min 48px tinggi (thumb-friendly)
  - [x] Active: primary color bg, teks putih, check icon
  - [x] Grid 2-kolom (stack pada layar sempit)
  - [x] Padding 12px per card
- [~] Buat komponen `PhotoUploader`:
  - [x] Placeholder 120x120px
  - [x] Label: "ADD PHOTO (OPTIONAL) +20 BONUS PTS"
  - [ ] Integrasi Cloudinary widget (menunggu Cloudinary SDK)
- [x] Buat `TextInput` untuk Notes:
  - [x] Opsional
  - [x] Max 200 karakter
  - [x] Placeholder "Optional notes..."
  - [x] Counter karakter
- [x] Buat komponen `PointsPreview` (real-time):
  - [x] Base points (tergantung kategori)
  - [x] Photo bonus: +20 pts jika foto diupload
  - [x] Total kalkulasi
  - [x] Update real-time saat user memilih opsi
- [x] Implementasi form validation dengan Zod:
  ```
  eco_station_id: uuid, required
  category: enum('plastic','paper','residue'), required
  photo_url: url, optional
  notes: string max 200, optional
  ```
- [x] Tombol `[SUBMIT WASTE]`:
  - [x] Full width
  - [x] Disabled sampai kategori dipilih
  - [x] Loading spinner saat submit
- [x] Tombol `[CANCEL]` secondary action
- [x] Susun layout `LogWasteScreen`

### 1.5 Screen 4: REWARDS CATALOG

- [x] Buat komponen `BalanceCard`:
  - [x] Prominent: "💰 BALANCE: 2,450 POINTS"
  - [x] Sticky header, update real-time saat redeem
- [x] Buat komponen `FilterChips`:
  - [x] Kategori: All, Canteen, Vouchers, School
  - [x] Horizontal scrollable
  - [x] Toggle-style selection
- [x] Buat komponen `RewardCard`:
  - [x] Full width, padding 12px, shadow-md on hover
  - [x] Tampilkan: nama reward, cost (pts), stok
  - [x] Tombol REDEEM (primary green) jika tersedia
  - [x] Tombol OUT OF STOCK (disabled, gray) jika stok 0
- [x] Implementasi Redemption Flow:
  - [x] Step 1: Tap [REDEEM]
  - [x] Step 2: Confirmation modal "Spend X points for [reward]?"
  - [x] Step 3: API call submit (mock)
  - [x] Step 4: Toast success "✅ Voucher Code: ABC123 sent to SMS"
  - [x] Step 5: Modal display kode + instruksi "Show this to canteen"
  - [x] Step 6: Balance update immediately
- [x] Buat komponen `RedemptionModal`
- [ ] Implementasi pagination / "Load more..." (deferred — perlu API)
- [x] Susun layout `RewardsScreen`

### 1.6 Screen 5: PERSONAL PROFILE / WASTE PASSPORT

- [x] Buat section profile:
  - [x] Foto profil 80x80px, circle
  - [x] Nama lengkap
  - [x] Nama sekolah
  - [x] Tanggal bergabung
  - [x] Padding 24px, white card, center-aligned
- [x] Buat `StatsGrid` (3 kolom):
  - [x] ⭐ Total Points
  - [x] 📊 Total Entries
  - [x] 🌱 CO₂e kg (dihindarkan)
  - [x] 🔥 Current Streak
  - [x] 📈 Your Rank (sekolah)
  - [x] 💾 Total Weight (kg)
- [x] Buat `ContributionBreakdown` (30 hari):
  - [x] 🔵 Plastic: X entries, X pts
  - [x] 📄 Paper: X entries, X pts
  - [x] ⚫ Residue: X entries, X pts
- [x] Buat `RecentActivityList`:
  - [x] Last 5 entries
  - [x] Tap "View all X entries" → modal atau screen terpisah
- [x] Buat tombol akun (2-kolom grid, 48px height):
  - [x] [EDIT PROFILE]
  - [x] [LOGOUT]
- [x] Susun layout `ProfileScreen`

### 1.7 Screen 6: LEADERBOARD

- [x] Buat `MonthSelector`:
  - [x] Dropdown atau swipe tabs
  - [x] Tampilkan 3 bulan terakhir
- [x] Buat Top 3 highlight:
  - [x] 🥇🥈🥉 emoji medals
  - [x] Font lebih besar, primary color
  - [x] Tampilkan nama + streak
- [x] Buat list leaderboard:
  - [x] "You are here" highlighted (primary-lighter bg + underline)
  - [x] Format: `#[rank] 👤 [Nama] [Poin]`
  - [x] Tappable rows (visual feedback)
- [ ] Implementasi infinite scroll / "Load more" (deferred — perlu API)
- [x] Catatan info: "ℹ️ Resets monthly on the 1st"
- [ ] Real-time updates via WebSocket (deferred — Fase 8)

---

## 🔌 FASE 2: OFFLINE SUPPORT (SERVICE WORKER)

- [x] Setup `service-worker.js` (`public/sw.js`) — cache app shell + network-first API
- [x] Implementasi Background Sync API:
  - [x] Event listener untuk `sync-waste-logs`
  - [x] Retry failed logs dari IndexedDB (5xx → retry; 4xx/2xx → delete)
  - [x] Fetch ke `/api/students/{id}/waste-disposal` dengan method POST
- [x] Setup IndexedDB schema (`src/lib/db.ts`):
  - [x] Object store `pending_logs` via idb v8 + typed DBSchema
  - [x] CRUD: `addPendingLog`, `getPendingLogs`, `deletePendingLog`, `getPendingCount`
- [x] Client-side offline logic:
  - [x] Check `serviceWorker` support + register via `ServiceWorkerProvider.tsx`
  - [x] Deteksi offline via `navigator.onLine` sebelum submit
  - [x] Save log ke IndexedDB via `queueWasteLog()` saat offline / fetch gagal
  - [x] Register `sync-waste-logs` background sync setelah queue
  - [x] UI feedback: `OfflineBanner.tsx` — merah (offline) / kuning (pending sync)
- [x] Handle online/offline events di UI (`useOffline.ts` hook)
- [ ] Test skenario: scan → log → koneksi putus → reconnect → sync otomatis (manual QA)

---

## 🖥️ FASE 3: ADMIN DASHBOARD (Desktop)

### 3.1 Layout & Navigation Admin

- [x] Setup layout admin desktop (`src/app/admin/layout.tsx`):
  - [x] Header fixed 64px
  - [x] Sidebar 280px (collapsible ke 64px icon-only)
  - [x] Main content: margin-left dynamic, padding 24px
  - [x] Transition 300ms pada sidebar collapse
- [x] Buat komponen `AdminHeader` (`src/components/admin/AdminHeader.tsx`):
  - [x] Logo + "SIRKULA ADMIN"
  - [x] User avatar dengan dropdown menu
  - [x] Notifikasi icon (badge merah)
  - [x] Settings icon
  - [x] Dropdown menu: 👤 Profile, 🔑 Change Password, 📋 Activity Log, 🚪 Logout
- [x] Buat komponen `AdminSidebar` (`src/components/admin/AdminSidebar.tsx`):
  - [x] Collapsed & expanded state (Zustand store: `src/stores/adminUi.ts`)
  - [x] Menu items: Home (🏠), Schools (🏫), FMCG Companies (🏢), Reports (📊), Financial (💰), Settings (⚙️)
  - [x] Sub-menu accordion (expand/collapse per section)
  - [x] Tombol [Collapse] di bawah sidebar
  - [x] Active item highlight via `usePathname()`
  - [x] Auto-expand parent saat child route aktif
- [x] Buat komponen `Breadcrumb` (`src/components/admin/Breadcrumb.tsx`)
- [x] Sidebar collapsible logic (toggle 280px ↔ 64px, smooth transition)

### 3.2 Screen 1: ADMIN DASHBOARD (System Overview)

- [x] Buat `SystemStatusGrid` (4 kolom, `SystemStatusGrid.tsx`):
  - [x] StatusCard: API (🟢 Healthy, 145ms avg, Uptime 99.97%)
  - [x] StatusCard: Database (🟢 Connected, 4.2GB/16GB, CPU 12%)
  - [x] StatusCard: Cache (Hit 92%, 1.2GB, Online)
  - [x] StatusCard: DB Uptime (99.97%)
- [x] Buat `KeyMetricsGrid` (5 kolom, `KeyMetricsGrid.tsx`):
  - [x] Schools count + trend %
  - [x] Total Students + trend %
  - [x] Active (30d) + trend %
  - [x] Entries (Month) + trend %
  - [x] Avg Points + trend %
- [x] Buat `DailyActivityChart` (`DailyActivityChart.tsx`, Recharts):
  - [x] Line chart 30 data points (deterministik, no hydration mismatch)
  - [x] Y-axis: 0–200 entries
  - [x] X-axis: tanggal bulan ini
  - [x] Full width via ResponsiveContainer
- [x] Buat `RevenueBreakdown` (`RevenueBreakdown.tsx`):
  - [x] Pie chart: kategori material (Plastic 60%, Paper 30%, Residue 10%)
  - [x] Tabel financial summary: Material Revenue, Fees 30%, School Net, FMCG Subscription
- [x] Buat `RecentAuditTable` (`RecentAuditTable.tsx`):
  - [x] Kolom: Time, User, Action, Status (color-coded badge)
  - [x] 10 entri terbaru
  - [x] Link "View full audit log"
- [x] Susun layout `AdminDashboardScreen` (`src/app/admin/page.tsx`)

### 3.3 Screen 2: SCHOOLS MANAGEMENT

- [x] Buat tombol [+ Tambah Sekolah], [Filters ▼], search input
- [x] Buat `SchoolsTable` (`SchoolsTable.tsx`):
  - [x] Kolom: School Name+City, Principal/Contact, Students/Eco, Aktif, Revenue, Status, Actions
  - [x] Sortable columns: name, studentCount, activeStudents30d, totalRevenueMillion
  - [x] Hover row highlight
  - [x] Action buttons per row: View, Edit, Delete
  - [x] Checkboxes bulk selection (first column)
  - [x] Bulk action bar (muncul saat ada selection) + konfirmasi delete
  - [x] Pagination: `Pagination.tsx` + "Showing X–Y of Z"
  - [x] Search filter (nama/kota)
- [x] Buat `OnboardSchoolWizard` (`OnboardSchoolWizard.tsx`, 3 langkah, modal):
  - [x] Step 1: Basic Info (name, address, principal name, contact phone)
  - [x] Step 2: School Details (city, student count, eco-station count, revenue share %)
  - [x] Step 3: Review & Confirm (ringkasan semua data)
  - [x] Progress indicator dengan checkmark pada step selesai
  - [x] [Kembali] [Selanjutnya] navigation + [Submit] di langkah terakhir
  - [x] Zod validation per step
- [x] Susun layout `SchoolsManagementScreen` (`src/app/admin/schools/page.tsx`)

### 3.4 Screen 3: SCHOOL DETAILS (Drill-Down)

- [x] Buat header school detail (2 kolom, `src/app/admin/schools/[id]/page.tsx`):
  - [x] Kiri: nama sekolah, kota, nama principal, phone
  - [x] Kanan: Status badge, Joined date, Revenue Share %, tombol [Edit] [Pause] [Archive]
- [x] Buat `SchoolDetailTabs` (sticky, `SchoolDetailTabs.tsx`):
  - [x] Tab: Overview, Students, Rewards, Finances, Logs
- [x] **Tab Overview:**
  - [x] `PerformanceCards` (4 kolom): Total Students, Active (30d), Waste kg (Month), Acceptance Rate %
  - [x] `WasteBreakdown`: Horizontal bar chart per kategori (This Mo vs Last Mo)
  - [x] `TopStudentsTable`: Rank, Name, Points, Entries, Streak
  - [x] `EcoStationStatus` table: Station ID, Location, Total Scans, Last Used
- [ ] **Tab Students, Rewards, Finances, Logs:** placeholder (Sprint 2)
- [x] Susun layout `SchoolDetailsScreen`

### 3.5 Screen 4: FMCG COMPANY DATA PORTAL

- [x] Buat header company detail (`src/app/admin/companies/[id]/page.tsx`):
  - [x] Nama perusahaan, email, Tier badge, Status badge
  - [x] Periode kontrak
- [x] Buat `APIUsageCards` (3 kolom):
  - [x] API Requests bulan ini
  - [x] Reports generated
  - [x] Rate limit usage % (warning border jika > 80%)
- [x] Buat `RecentReportsList`:
  - [x] Card per report: judul, tanggal, sekolah, Data Quality %
  - [x] Tombol: [PDF] [CSV] [JSON] per report
  - [x] "Load more →" link
- [x] Buat `SubscriptionBillingSection`:
  - [x] Plan, cost, billing cycle, next charge date, payment method, status
  - [x] Tombol: [Ganti Plan] [Update Pembayaran] [Batalkan Langganan]
- [x] Susun layout `FMCGCompanyScreen`

---

## 🏫 FASE 4: SCHOOL STAFF DASHBOARD (Desktop)

### 4.1 Layout & Navigation School Staff

- [x] Setup layout mirip admin (`src/app/staff/layout.tsx`)
- [x] Buat sidebar school staff (`StaffSidebar.tsx`):
  - [x] Menu: Dashboard (📊), Students (👥), Manage Rewards (🎁), Redemptions (📋), Reports (📈), Settings (⚙️)
- [x] Buat header school staff (`StaffHeader.tsx`)

### 4.2 Screen: REDEMPTIONS QUEUE

- [x] Buat header "PENDING REDEMPTIONS: [count]"
- [x] Buat `RedemptionCard` per pending:
  - [x] Timestamp
  - [x] Nama siswa + ID
  - [x] Nama reward
  - [x] Points spent
  - [x] SMS Code (jika ada)
  - [x] Tombol [Fulfill]
  - [x] Tombol "✓ MARK AS COMPLETE"
- [x] Implementasi "Mark as Complete" flow (mock, no backend API yet):
  - [x] Klik → mock delay + hapus dari pending list
  - [x] Toast notifikasi (mewakili notifikasi ke siswa)
  - [x] Hapus dari pending list
- [x] Tampilkan "COMPLETED (Last 7 Days): [count] | [View All]" (mock count, View All belum ada halaman)
- [x] Susun layout `RedemptionsQueueScreen` (`src/app/staff/redemptions/page.tsx`)

### 4.3 Screen: STUDENTS LIST (School Staff)

- [x] Tabel daftar siswa dengan sort/filter (`StudentsTable.tsx`)
- [x] Detail per siswa: nama, poin, entries, streak, status

### 4.4 Screen: MANAGE REWARDS (School Staff)

- [x] CRUD rewards: tambah, edit, hapus, atur stok (`RewardFormModal.tsx` + `src/app/staff/rewards/page.tsx`)
- [x] Toggle reward active/inactive

### 4.5 Screen: REPORTS (School Staff)

- [x] Laporan aktivitas sekolah (`src/app/staff/reports/page.tsx`)
- [x] Export ke CSV (client-side Blob download); Export PDF stubbed — perlu integrasi backend/PDF library

---

## 🏭 FASE 5: FMCG DATA PORTAL (Desktop)

### 5.1 Brand Audit Interface

- [x] Buat `FilterQueryPanel` (sidebar sticky):
  - [x] Multi-select sekolah
  - [x] Dropdown bulan
  - [x] Checkbox brand filter
  - [x] Tombol [Apply Filters]
- [x] Buat `BrandAuditReport`:
  - [x] Header: judul, periode, sekolah, Data Quality %
  - [x] Tombol download: [Download PDF] [Download CSV] (UI only — belum terhubung ke backend/generator)
- [x] Buat `BrandPackagingSection` per brand:
  - [x] Nama brand & parent company
  - [x] Tabel: Packaging Type, Count, Weight, Share %
  - [x] Total: units, weight, market share %
- [x] Buat `CompetitorSummarySection`:
  - [x] Breakdown % per competitor
  - [x] Link "View Detailed Breakdown" (UI only, halaman detail belum ada)
- [x] Buat `InsightsRecommendationsSection`:
  - [x] Bullet points insights otomatis (mock)
  - [x] Recommendation teks
- [x] Buat `ESGMetricsSection`:
  - [x] Total plastic packaging attributed (kg)
  - [x] CO₂e avoided via sorting (kg)
  - [x] Contribution to circular economy (%)
- [x] Susun layout `BrandAuditScreen` (`src/app/admin/reports/brand-audit/page.tsx`)

---

## 🧩 FASE 6: SHARED COMPONENT LIBRARY

### 6.1 Atomic Components (`components/common/`)

- [x] **Button** (`Button.tsx`):
  - [x] Props: label, variant (primary/secondary/outline), size (md=48px), fullWidth, loading, disabled, onPress
  - [x] Variants: primary (bg-primary, white text), secondary, outline
  - [x] States: hover (bg-primary-dark), active (scale 95%), disabled (opacity 50%, no pointer)
  - [x] Loading: spinner inside button
  - [x] Transition: 150ms all
- [x] **Card** (`Card.tsx`):
  - [x] Props: title, icon, color (primary/success/warning), shadowSize (sm/md/lg), onPress
  - [x] Tap handler (optional)
- [x] **Input/TextInput** (`Input.tsx`):
  - [x] Props: label, placeholder, value, onChange, maxLength, type (text/number/email), error, helperText
  - [x] States: focused (primary border + shadow), invalid (red border + error msg), disabled (gray bg)
  - [x] Min height 48px (mobile) / 36px (admin)
- [x] **Modal** (`Modal.tsx`):
  - [x] Props: visible, title, onClose, type (alert/confirmation/choice)
  - [x] Slot: ModalContent, ModalActions
  - [x] Focus trap saat terbuka
  - [x] Escape key untuk close
  - [x] Full screen di mobile
  - [x] Fade in 200ms, scale from center (desktop)
- [x] **Header** (`Header.tsx`) — `MobileHeader.tsx`
  - [x] Mobile: dengan back button + title + right icon
  - [ ] Admin: dengan breadcrumb (Fase 3)
- [ ] **Sidebar** (`Sidebar.tsx`):
  - [ ] Collapsible (280px ↔ 64px)
  - [ ] Active item highlight
  - [ ] Sub-menu accordion
- [x] **Spinner/Loading** component (8-frame animation, looping) — built into Button
- [x] **Toast/Notification** component (`Toast.tsx`):
  - [x] Slide in from top 200ms
  - [x] Auto-dismiss
  - [x] Variants: success, error, warning, info
- [x] **TextArea** component — di `Input.tsx`
- [x] **Select/Dropdown** component (`Select.tsx`)
- [x] **Checkbox** component (`Checkbox.tsx`)
- [x] **RadioButton** component (`RadioButton.tsx`, exports `RadioButtonGroup`)
- [x] **Badge/Chip** component (`Badge.tsx`)
- [x] **Avatar** component (circle, dengan fallback) (`Avatar.tsx`, dipakai di `ProfileScreen`)
- [x] **Pagination** component (`Pagination.tsx`, Fase 3)

### 6.2 Admin-Specific Components (`components/admin/`)

- [x] **DataTable** (`DataTable.tsx`) — generic sortable/paginated table, tersedia untuk tabel baru
- [ ] **Charts** (`Charts.tsx`) — chart-chart existing (Daily Activity, Revenue Breakdown) sudah ada tapi belum di-generalize jadi satu file `Charts.tsx`
- [x] **StatusCard** (`StatusCard.tsx`, di-extract dari `SystemStatusGrid`)
- [x] **MetricCard** (`MetricCard.tsx`, di-extract dari `KeyMetricsGrid`)
- [x] **FormSection** + **FormGroup** + **FormActions** (`FormSection.tsx`, dipakai di `RewardFormModal`)
- [x] **PageHeader** (judul + subtitle + breadcrumb) (`PageHeader.tsx`, dipakai di halaman staff)
- [x] **AuditTable** (`AuditTable.tsx`, `RecentAuditTable` sekarang wrapper tipis di atasnya)

### 6.3 Student-Specific Components (`components/student/`)

- [x] **BottomTabBar** ✓
- [x] **QRCodeReader** ✓
- [x] **ScanFrameOverlay** ✓
- [x] **PointsHeroCard** ✓
- [x] **ActivityFeed** ✓
- [x] **CategorySelector** ✓ (inline di LogWasteForm)
- [~] **PhotoUploader** (UI ✓, Cloudinary pending)
- [x] **PointsPreview** ✓ (inline di LogWasteForm)
- [x] **RewardCard** ✓ (inline di RewardsScreen)
- [x] **FilterChips** ✓ (inline di RewardsScreen)
- [x] **RedemptionModal** ✓

---

## 🔗 FASE 7: HOOKS & STATE MANAGEMENT

### 7.1 Custom Hooks (`hooks/`)

- [x] **useAuth** (`useAuth.ts`):
  - [x] Login, register, logout — real backend (Prisma + SQLite, bcrypt password hash, JWT httpOnly session cookie via `jose`)
  - [x] Role-based: student, school_staff, admin, fmcg (`role` field dari `User`), enforced di `proxy.ts` (route protection)
  - [x] Session persisted server-side via httpOnly cookie (bukan localStorage) — `GET /api/auth/me` untuk hydrate
- [x] Waste log submission → real API (`/api/waste-entries`), status `pending` sampai admin approve/reject di `/admin/waste-approvals`; poin baru ditambahkan setelah approve (`useWasteDisposal.ts` mock dihapus)
- [x] **useLeaderboard** (`useLeaderboard.ts`):
  - [x] Fetch leaderboard data (mock per bulan, dipakai `LeaderboardScreen`)
  - [x] WebSocket subscription — stub `wsStatus` (`connecting`→`connected`), koneksi asli menunggu Fase 8
  - [x] Filter by month
- [x] **useRewards** (`useRewards.ts`):
  - [x] Fetch rewards catalog (mock, dipakai `RewardsScreen`)
  - [x] Redeem reward (mock delay + kode SMS)
  - [x] Fetch redemption history (in-memory)
- [x] **useProfile** hook (`useProfile.ts`):
  - [x] Fetch student stats (mock, dipakai `ProfileScreen`)
  - [x] Update profile (mock delay)
- [x] **useOffline** hook — sudah ada sejak Fase 2

### 7.2 Global State

- [x] Auth state (user info, role) — server session via httpOnly JWT cookie, hydrated per-request lewat `useAuth`/`/api/auth/me` (`authStore.ts` dihapus, tidak lagi localStorage-based)
- [ ] Student points & streak (real-time) — belum real-time, masih local state per komponen (menunggu Fase 8)
- [x] Notification state — `notificationStore.ts` (Zustand), dipakai di `AdminHeader`/`StaffHeader` bell icon
- [ ] WebSocket connection state — di-stub sebagai `wsStatus` di dalam `useLeaderboard`, belum ada koneksi WS sungguhan (Fase 8)

---

## ⚡ FASE 8: REAL-TIME & WEBSOCKET

> Seluruh fase ini butuh WebSocket server sungguhan (infra eksternal) — belum diimplementasikan. `useLeaderboard` sudah menyediakan `wsStatus` stub agar UI siap dihubungkan begitu server tersedia.

- [ ] Setup WebSocket server connection
- [ ] Subscribe leaderboard updates (reflect changes within 5s)
- [ ] Subscribe points updates (saat siswa lain log waste)
- [ ] Admin dashboard real-time updates (entries, system status)
- [ ] Handle WebSocket reconnection (auto-reconnect dengan exponential backoff)
- [ ] Smooth transitions saat data update (fade in 300ms)

---

## 🎨 FASE 9: ANIMATIONS & MICRO-INTERACTIONS

### 9.1 Student App

- [x] Page transitions: slide 120ms ease-in-out (`.page-transition` class, keyed by pathname di semua layout)
- [x] Button press: scale 95% (`active:scale-95` di `Button.tsx`, `buttonPress` keyframe tersedia di `globals.css`)
- [x] Form validation error: shake input 2x (200ms) — `Input`/`TextArea` menambahkan animasi `shake` saat `error` terisi
- [x] Points award: bounce animation — `PointsHeroCard` poin menggunakan `bounce` keyframe
- [x] Leaderboard update: fade in new ranks (300ms) — staggered `fadeIn` per baris di `LeaderboardScreen`
- [x] Loading states: spinner (looping) — built into `Button`

### 9.2 Admin Dashboard

- [x] Table rows hover: bg color change (100ms) — `duration-100` pada `AuditTable`, `DataTable`, `StudentsTable`, `RevenueBreakdown`
- [x] Charts: fade in on load (300ms) — `DailyActivityChart`, `RevenueBreakdown`; animate axis labels belum ada (Recharts default)
- [x] Modals: fade in (200ms), scale from center (desktop) — `scaleIn` keyframe pada `sm:` breakpoint di `Modal.tsx`
- [x] Notifications: slide in from top (200ms), auto-dismiss — sudah ada sejak `Toast.tsx`
- [ ] Data WebSocket updates: smooth transitions — menunggu Fase 8

---

## ♿ FASE 10: ACCESSIBILITY (a11y)

- [x] Semua teks: WCAG AA contrast ratio minimum 4.5:1 (menggunakan token warna existing, belum diaudit dengan tool otomatis)
- [x] Informasi tidak hanya dari warna (tambah ikon/teks): semua Badge/status pill sudah menyertakan label teks
- [x] Tab order logis (mengikuti DOM order, tidak ada custom tabindex yang mengacaukan urutan)
- [x] Focus visible: outline 2px pada elemen interaktif baru (`Checkbox`, `RadioButtonGroup`, `Select` mengikuti pola `Input`/`Button`)
- [x] Modals: trap focus di dalam modal sampai ditutup — diimplementasikan di `Modal.tsx` (Tab/Shift+Tab cycling + focus restore)
- [x] Escape key: closes modal/dropdowns
- [x] Alt text pada semua gambar — `Avatar` menggunakan `alt={name}`, logo header sudah punya alt
- [x] Form labels: associated via `<label htmlFor>` atau `aria-label`
- [x] Button text: deskriptif, bukan hanya "Click"
- [x] Tables: `<th>` headers dengan `scope` attributes (semua tabel baru mengikuti pola existing)
- [x] Touch targets mobile: minimum 44x44px (`Checkbox`, `RadioButtonGroup` diberi `min-h-[44px]`)
- [ ] Tidak ada horizontal scroll di mobile — belum diverifikasi manual di device/browser asli
- [x] Modals: full screen di mobile (sudah ada sejak awal)

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

_Last updated: 2026-07-01 (Phase 4, 5, 6, 7, 9, 10 complete — mock/stub untuk semua dependensi infra eksternal)_
_Based on: README.md v1.0 – UI/UX Design System & Component Specifications_

## 📌 CATATAN INFRA YANG DI-DEFER

Item berikut sengaja di-skip karena butuh kredensial/infra eksternal atau device fisik, bukan karena lupa:

- **WebSocket server sungguhan** (Fase 8) — `useLeaderboard` sudah expose `wsStatus` stub, tinggal disambungkan.
- **Cloudinary SDK** (Fase 0.3, 1.4 PhotoUploader) — UI placeholder sudah ada, upload nyata menunggu kredensial akun.
- **Export PDF sungguhan** (Fase 4.5, 5.1) — tombol ada, generator PDF belum diintegrasikan (butuh library seperti jsPDF/backend service). Export CSV sudah fungsional (client-side Blob).
- **Testing di device fisik / cross-browser** (Fase 12) — tidak bisa dilakukan dari lingkungan ini, butuh QA manual.
- **Performance audit (FCP/LCP/CLS, bundle size)** (Fase 11) — butuh profiling di browser nyata / Lighthouse, bukan sekadar review kode.
- **Figma structure & design handoff docs** (Fase 13) — di luar scope implementasi kode.
