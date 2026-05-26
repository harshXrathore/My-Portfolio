# 🛡️ Harsh Rathore — Cybersecurity Portfolio

[![GitHub license](https://img.shields.io/github/license/harshXrathore/My-Portfolio?color=cyan&style=flat-square)](LICENSE)
[![CEH v13](https://img.shields.io/badge/Certification-CEH%20v13-emerald?style=flat-square)](https://www.eccouncil.org/)
[![CCNA](https://img.shields.io/badge/Certification-CCNA-blue?style=flat-square)](https://www.cisco.com/)
[![React](https://img.shields.io/badge/Stack-React%2019--TypeScript-purple?style=flat-square)](https://react.dev/)
[![Tailwind](https://img.shields.io/badge/CSS-Tailwind%20v4-blueviolet?style=flat-square)](https://tailwindcss.com/)

An interactive, high-fidelity, cyberpunk-themed portfolio website designed for **Harsh Rathore**, a Cybersecurity Professional and Certified Ethical Hacker (CEH v13). The interface simulates a secure shell operating system (HUD/HUD Terminal) mapping security concepts directly into user-experience elements.

---

## 🚀 Live Demo & Preview

* **Interactive Features:** Real-time diagnostics command scanner, keyboard-driven navigation console, and symmetric credential decryptor.
* **Cursor HUD:** Tracks mouse client coordinates displaying telemetry HUD data.

---

## ⚡ Core Features & Interactivity

The portfolio integrates gamified cybersecurity elements directly into the user interface:

### 1. 🖥️ Interactive System Terminal
* **`info.sh`**: Fetches a dossier/profile of security certifications, qualifications, and internship objectives.
* **`network.cfg`**: Runs a live-simulated ICMP ping (`ping -c 5 security.harsh-rathore.dev`) tracking latency statistics in real-time.
* **`diag.log`**: Triggers a simulated local vulnerability inspection scanning common attack vectors (SQL Injection, XSS, CSRF, IDOR, Cryptography) with custom scan speeds and reports.

### 2. ⌨️ Keyboard-Driven Command Palette
* Summoned instantly using `Ctrl + K` (or via the Command Palette button).
* Supports autocompletion, fuzzy search, and keyboard-guided execution.
* Available commands:
  * `/goto [home | about | skills | experience | certs | projects | contact]`
  * `/theme toggle` (Switch between dark hacker and light console themes)
  * `/system diagnostics` (Launches deep vulnerability scan sequence on the Hero HUD)
  * `/download resume` (Pulls the latest PDF resume)

### 3. 🔑 Symmetric Credential Decryptor (Modal)
* Clicking on any certification opens an interactive **AES-256-GCM** decryption sequence.
* Displays pseudo-terminal logs loading blocks, verifying signatures, and evaluating SHA256 verification hashes before decrypting and showing the verified document download action.

### 4. 📊 Security Integrity Log Matrix
* A GitHub-style contribution matrix simulating daily network audit logs over the past weeks.
* Visualizes nodes representing:
  * **STANDBY** (Inactive monitoring)
  * **SCAN_NOMINAL** (Cyan - Compliant scan)
  * **PATCHED_VULN** (Purple - Resolved vulnerability)
  * **THREAT_BLOCKED** (Red - Blocked attack origin + source IP addresses)
* Supports custom tooltips showing detailed telemetry info upon hover.

### 5. 🔭 Client Coordinates Telemetry HUD
* A mouse-following cursor glow accompanied by real-time `(X, Y)` client coordinate indicators simulating tactical system telemetry.

---

## 🛠️ Technology Stack & Architecture

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework & Language** | React 19 + TypeScript | Core application rendering and static typing safety. |
| **Styling Engine** | Tailwind CSS v4 | High-performance CSS compilation and modern color systems. |
| **Animations** | Framer Motion v12 | High-fidelity micro-interactions, page transitions, and slide physics. |
| **Bundler** | Vite + Rolldown | Rapid dev server hot module reloading and optimized bundling. |
| **Third Party UI** | Ant Design | Interactive Tooltip systems for activity mapping. |
| **Iconography** | Lucide React | High-quality vector-based developer and cybersecurity icons. |
| **Mail Services** | EmailJS Browser | Client-side secure email forwarding. |
| **Notifications** | React Hot Toast | Real-time interactive operation feedback alerts. |

---

## 📁 Directory Structure

```text
my-portfolio/
├── public/                 # Static assets (Resume, Certificates, etc.)
├── src/
│   ├── assets/             # Images & static assets
│   ├── components/
│   │   ├── Layout/         # Core structure (Navbar, Footer, CursorGlow, etc.)
│   │   │   ├── Background.tsx
│   │   │   ├── CommandPalette.tsx
│   │   │   ├── CursorGlow.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── LoadingScreen.tsx
│   │   │   └── Navbar.tsx
│   │   └── Sections/       # Content Components
│   │       ├── About.tsx
│   │       ├── ActivityMatrix.tsx
│   │       ├── Certifications.tsx
│   │       ├── Contact.tsx
│   │       ├── DecryptionModal.tsx
│   │       ├── Experience.tsx
│   │       ├── Hero.tsx
│   │       ├── Projects.tsx
│   │       └── Skills.tsx
│   ├── context/            # Global Theme Context state
│   ├── services/           # Email service hooks (EmailJS)
│   ├── utils/              # Data stores and skills mappings (data.ts)
│   ├── App.tsx             # Root Layout and Scroll Spy logic
│   └── main.tsx            # Entry point
```

---

## 💻 Local Setup & Installation

To run this project locally on your machine, follow these steps:

### Prerequisites
* Node.js (v18.x or higher)
* npm (v9.x or higher)

### 1. Clone the Repository
```bash
git clone https://github.com/harshXrathore/My-Portfolio.git
cd My-Portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory based on the `.env.example` file:
```bash
# Copy template
cp .env.example .env
```
Open `.env` and provide your own **EmailJS** credentials (service, template ID, and public key) to activate the contact form:
```env
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

### 4. Run Development Server
Start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 5. Build for Production
Create an optimized build ready for deployment:
```bash
npm run build
```

---

## 🛡️ Profile & Qualifications

The data model configured in [data.ts](file:///c:/Users/harsh/my-portfolio/src/utils/data.ts) includes the following core dossier profile:

### Key Certifications
* **Certified Ethical Hacker (CEHv13)** — EC-Council (July 2025)
* **Cybersecurity Foundation** — Palo Alto Networks Cybersecurity Academy (August 2025)
* **CCNA: Enterprise Networking, Security, and Automation** — Cisco (March 2025)
* **Cryptography and Network Security** — NPTEL (May 2025)

### Professional Experience
* **Cybersecurity Intern** — Hacktify Cyber Security (Feb 2025 – Mar 2025)
  * Web application security testing, exploit PoC development, CTF completion.
* **Intern** — ShadowFox (Oct 2024 – Nov 2024)
  * Traffic interception, Wi-Fi deauth analysis, custom payload creation, reverse engineering.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
