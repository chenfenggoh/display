# NTU Smart Display — Installation Guide

A smart display app for NTU students showing:
- 🕐 Live clock & date
- 🌤 Real-time weather (OpenWeatherMap)
- 🚌 LTA public bus arrivals (DataMall API)
- 🎓 NTU Omnibus schedule estimates
- 📅 NTU semester & week tracker

---

## OPTION A — Run in Browser (Easiest, No Install Needed)

Just open `index.html` in Chrome on your tablet.

1. Transfer `index.html` to your tablet (via USB, Google Drive, email, etc.)
2. Open **Chrome** on the tablet
3. Tap the address bar → type `file:///` and navigate to the file, OR
4. Use Chrome → Menu → Open File
5. The app opens full-screen. Tap **⚙ Settings** to enter your API keys.

**For best results in Chrome:**
- Go to Chrome Settings → Accessibility → enable "Force enable zoom" OFF
- Put your tablet in landscape orientation
- Use "Add to Home Screen" to create a home screen shortcut

---

## OPTION B — Build as Android APK

This gives you a proper full-screen Android app with the screen always on.

### Prerequisites

You need a computer with:
- **Android Studio** (free) from https://developer.android.com/studio
- OR just the **Android SDK command-line tools** (lighter option)
- Java 11 or newer

### Step 1 — Install Android Studio

1. Download Android Studio from https://developer.android.com/studio
2. Install and open it
3. On first launch, complete the setup wizard (it downloads the Android SDK)

### Step 2 — Open the Project

1. In Android Studio, click **"Open"** (not "New Project")
2. Navigate to the `android-apk/` folder inside the smart-display folder
3. Click **OK** — Android Studio will sync Gradle (takes 2–5 min first time)

### Step 3 — Build the APK

**In Android Studio:**
1. Top menu → **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. Wait ~1–2 minutes
3. A notification appears: "APK(s) generated" → click **"locate"**
4. The APK is at: `android-apk/app/build/outputs/apk/debug/app-debug.apk`

**OR via command line (if you have the SDK):**
```bash
cd android-apk
./gradlew assembleDebug
# APK will be at: app/build/outputs/apk/debug/app-debug.apk
```

### Step 4 — Enable Developer Mode on Your Tablet

1. Open **Settings** → **About Tablet** (or "About Phone")
2. Find **"Build Number"** and tap it **7 times**
3. You'll see "You are now a developer!"
4. Go back to Settings → **Developer Options**
5. Enable **"USB Debugging"**
6. Also enable **"Install via USB"** if shown

### Step 5 — Install the APK

**Method A — Via USB (fastest):**
1. Connect tablet to PC via USB
2. On tablet, allow the USB debugging prompt
3. In Android Studio: **Run** → **Run 'app'** (select your device)
   OR from command line: `adb install app/build/outputs/apk/debug/app-debug.apk`

**Method B — Transfer APK to tablet:**
1. Copy the `.apk` file to your tablet via USB, Google Drive, or email
2. On the tablet, open **Settings** → **Security** (or Privacy)
3. Enable **"Install Unknown Apps"** / **"Unknown Sources"**
4. Use the Files app to find the APK and tap it to install

### Step 6 — Configure the App

On first launch, the **Settings** panel opens automatically. Fill in:

| Field | What to Enter | How to Get It |
|-------|---------------|---------------|
| LTA DataMall API Key | Your free LTA key | See below |
| Primary Bus Stop | 5-digit stop code | See below |
| OpenWeatherMap Key | Your free OWM key | See below |
| NTU Stop Name | e.g. "Hall 1" | Whichever stop you use |
| NTU Routes | e.g. `CL-B,CL-R,CR` | See NTU routes below |
| Refresh Interval | `30` (seconds) | 30s is good |

---

## Getting Your API Keys

### LTA DataMall API Key (Free — Instant)

1. Go to https://datamall.lta.gov.sg
2. Click **"Request for API Access"** (top right)
3. Fill in the form (name, email, organisation: NTU)
4. Click submit — **you get the key immediately by email**
5. The key looks like: `AbCdEfGhIjKlMnOpQrSt==`

### OpenWeatherMap API Key (Free — Takes ~1 hour to activate)

1. Go to https://openweathermap.org/api
2. Click **"Sign Up"** (free)
3. After login, go to **API Keys** tab
4. Copy the default API key (or generate a new one)
5. Free tier: 1,000 calls/day — more than enough for this app

---

## Finding Your Bus Stop Code

### Method 1 — Look at the Bus Stop Sign
The 5-digit code is printed on the yellow bus stop pole sign.

### Method 2 — LTA Transport Tools
1. Go to https://www.lta.gov.sg/content/ltagov/en/map/busservice.html
2. Search for your area and click the bus stop

### Method 3 — OneMap
1. Go to https://www.onemap.gov.sg
2. Search for a location → toggle "Transport" layer

### Common NTU-Area Bus Stops

| Stop Name | Code | Bus Services |
|-----------|------|-------------|
| Bef Nanyang Dr (NTU Main Gate) | 22009 | 179, 179A, 199 |
| Aft Nanyang Dr | 22099 | 179, 179A, 199 |
| Pioneer MRT Exit B | 24481 | NTU CR, 99, 99A |
| Boon Lay Bus Int | 22009 | 179, 179A, 77, 98, etc. |
| Opp Pioneer MRT | 24489 | 99, 99A, 190, etc. |
| Yunnan Garden | 22151 | 179A |

*(Codes may change — verify at the physical stop or via LTA tools)*

---

## NTU Omnibus Routes

The NTU Omnibus app uses a **closed proprietary API** (built on OutSystems + ComfortDelGro FMS). No public API is available. This app provides **schedule-based estimates** from NTU's published timetable.

| Code | Route | Interval | Operating Hours |
|------|-------|----------|----------------|
| CL-B | Campus Loop – Blue | ~10 min | 08:00–22:00 |
| CL-R | Campus Loop – Red | ~10 min | 08:00–22:00 |
| CR | Campus Rider (→ Pioneer MRT) | ~15 min | 07:30–23:00 (weekdays) |
| CWR | Campus Weekend Rider | ~15 min | 08:00–23:00 (weekends) |

**For real-time NTU bus data:** Install the official **NTU Omnibus** app from the Play Store alongside this display app.

---

## Keep Screen On (Important for Smart Display Use)

### Option 1 — In Developer Options (Recommended)
Settings → Developer Options → **"Stay Awake"** → ON
(Screen stays on while charging)

### Option 2 — In Display Settings
Settings → Display → Sleep → **"Never"** (if available)

### Option 3 — The app itself keeps screen on
The APK has `FLAG_KEEP_SCREEN_ON` set — screen won't sleep while the app is in foreground.

---

## Landscape Mode

The APK is set to **landscape** by default (ideal for smart display).

If running in the browser instead, rotate your tablet and lock rotation in:
Settings → Display → Auto-rotate (or use the quick settings tile).

---

## Troubleshooting

**Weather not loading:**
- Check your OpenWeatherMap key is correct
- New keys can take up to 2 hours to activate after registration
- Make sure tablet has internet access

**LTA bus not loading:**
- Verify your LTA API key (copy-paste it exactly, no spaces)
- Check the bus stop code is exactly 5 digits
- The LTA API requires HTTPS — ensure your network isn't blocking it
- Try refreshing after a few seconds

**NTU bus times seem off:**
- These are schedule estimates, not real-time GPS data
- Actual buses can be ±5 min due to traffic
- Use the official NTU Omnibus app for real-time data

**APK won't install:**
- Ensure "Install Unknown Apps" / "Unknown Sources" is enabled
- Check your tablet runs Android 5.0 (Lollipop) or higher
- If getting "Parse Error", re-download/re-copy the APK

**App crashes on launch:**
- Try clearing app data: Settings → Apps → NTU Smart Display → Clear Data
- Reinstall the APK

---

## Updating the Display

To change what the display shows:
1. Edit `index.html` directly (it's plain HTML/CSS/JS — no build tools needed)
2. For browser use: just refresh the page
3. For APK: copy new `index.html` to `android-apk/app/src/main/assets/` and rebuild

---

*Built for NTU students · Uses LTA DataMall API (gov.sg) · OpenWeatherMap API*
