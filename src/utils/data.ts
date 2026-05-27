import { Shield, Code, Award, Briefcase, Terminal, Lock, Network, Cpu, Eye, Zap, Layers } from 'lucide-react';

export const skills = [
  { category: 'Security Skills', items: ['Penetration Testing', 'Vulnerability Assessment', 'Web App Security', 'Network Security', 'OSINT', 'Threat Analysis'], icon: Shield, color: 'from-red-500 to-orange-500', level: 95 },
  { category: 'Security Tools', items: ['Burp Suite', 'Metasploit', 'Wireshark', 'Nmap', 'SQLMap', 'Kali Linux'], icon: Terminal, color: 'from-cyan-500 to-blue-500', level: 90 },
  { category: 'Attack Vectors', items: ['XSS', 'SQL Injection', 'IDOR', 'CSRF', 'CORS Misconfiguration', 'Payload Development'], icon: Zap, color: 'from-purple-500 to-pink-500', level: 88 },
  { category: 'Programming', items: ['Python', 'Java', 'JavaScript', 'Bash Scripting', 'SQL'], icon: Code, color: 'from-green-500 to-emerald-500', level: 85 }
];

export const certifications = [
  { name: 'Cybersecurity Foundation', org: 'Palo Alto Networks Cybersecurity Academy', icon: Lock, level: 'Foundation', issued: 'Aug 2025', credentialId: null, credentialUrl: '/certificates/palo-alto-cybersecurity-foundation.pdf' },
  { name: 'Certified Ethical Hacker (CEHv13)', org: 'EC-Council', icon: Shield, level: 'Professional', issued: 'Jul 2025', credentialId: null, credentialUrl: '/certificates/ceh-v13.pdf' },
  { name: 'Cryptography and Network Security', org: 'NPTEL', icon: Lock, level: 'Advanced', issued: 'May 2025', credentialId: null, credentialUrl: '/certificates/nptel-cryptography.pdf' },
  { name: 'CCNA: Enterprise Networking, Security, and Automation', org: 'Cisco', icon: Network, level: 'Advanced', issued: 'Mar 2025', credentialId: null, credentialUrl: '/certificates/ccna-enterprise.pdf' },
  { name: 'CCNA: Switching, Routing, and Wireless Essentials', org: 'Cisco', icon: Network, level: 'Advanced', issued: 'Feb 2025', credentialId: null, credentialUrl: '/certificates/ccna-switching-routing.pdf' },
  { name: 'Tata Group - Cybersecurity Analyst Job Simulation', org: 'Forage', icon: Terminal, level: 'Simulation', issued: 'Feb 2025', credentialId: null, credentialUrl: '/certificates/tata-cybersecurity.pdf' },
  { name: 'Mastercard - Cybersecurity Job Simulation', org: 'Forage', icon: Briefcase, level: 'Simulation', issued: 'Jan 2025', credentialId: null, credentialUrl: '/certificates/mastercard-cybersecurity.pdf' },
  { name: 'CCNA: Introduction to Networks', org: 'Cisco', icon: Network, level: 'Foundation', issued: 'Nov 2024', credentialId: null, credentialUrl: '/certificates/ccna-intro-networks.pdf' },
  { name: 'Diving Deep in Cyber Security', org: 'Null Vadodara', icon: Shield, level: 'Workshop', issued: 'Nov 2024', credentialId: null, credentialUrl: '/certificates/null-vadodara.pdf' }
];

export const experience = [
  {
    role: 'AI Model Trainer And Evaluator',
    company: 'Deccan AI Experts',
    period: 'May 2026 – Present',
    type: 'Freelance',
    points: [
      'Successfully completed the Training & Evaluation phase of the Deccan AI Expert Program.',
      'Worked on AI-focused tasks involving analytical thinking, prompt understanding, response evaluation, and quality assessment.'
    ]
  },
  {
    role: 'Cybersecurity Intern',
    company: 'Hacktify Cyber Security',
    period: 'February 2025 – March 2025',
    type: 'Remote',
    points: [
      'Performed in-depth web application security testing to identify critical vulnerabilities',
      'Developed proof-of-concept exploits for discovered vulnerabilities',
      'Solved advanced real-world CTF challenges',
      'Collaborated with developers to strengthen secure coding practices'
    ]
  },
  {
    role: 'Intern',
    company: 'ShadowFox',
    period: 'October 2024 - November 2024',
    duration: '2 months',
    type: 'Remote',
    points: [
      'Web Security Testing – Identifying and patching vulnerabilities',
      'Network Traffic Analysis – Intercepting, analyzing, and decoding traffic',
      'Encryption Decoding & Reverse Engineering – Breaking down complex data for security insights',
      'Payload Creation – Developing custom payloads for penetration testing',
      'Wi-Fi Deauthentication Attacks – Analyzing security of wireless networks'
    ]
  }
];

export const projects = [
  {
    title: 'The-Setu – AI-Powered Career Development Platform',
    description: 'Built a full-stack platform with 3 user roles (Student, Mentor, Admin), JWT + OTP auth, and AI features including adaptive learning roadmaps, career prediction, and a Hybrid Job Board (Adzuna API + AI skill matching).',
    tags: ['React 18', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB'],
    icon: Code,
    github: 'https://github.com/harshXrathore/The-Setu-Student-Skill-Progression-Website',
    points: [
      'Built a full-stack platform with 3 user roles (Student, Mentor, Admin), JWT + OTP auth, and AI features including adaptive learning roadmaps, career prediction, and a Hybrid Job Board (Adzuna API + AI skill matching)',
      'Designed RAG Based LLM Model to generate personalized learning roadmaps and built an Adaptive Learning Engine that analyzes quiz performance, identifies skill gaps, and dynamically injects targeted remediation steps',
      'Implemented a Mentor Booking System with availability management and mentee tracking, a Gamification System (badges, streaks, points), and an Admin Panel with audit logging and platform analytics'
    ]
  }
];

export const achievements = [
  {
    title: 'Penetration Testing Bootcamp',
    description: 'Completed 4-week intensive bootcamp covering OWASP Top 10 vulnerabilities with hands-on exploitation and remediation exercises',
    tags: ['OWASP', 'Web Security', 'Exploitation'],
    icon: Shield
  },
  {
    title: 'CTF Competitions',
    description: 'Participated in multiple Capture The Flag competitions, demonstrating proficiency in web exploitation, cryptography, forensics, and reverse engineering',
    tags: ['CTF', 'Cryptography', 'Forensics', 'Rev Engineering'],
    icon: Cpu
  },
  {
    title: 'Security Assessments',
    description: 'Conducted comprehensive security assessments identifying critical vulnerabilities in web applications with detailed reports and remediation strategies',
    tags: ['Assessment', 'Reporting', 'Risk Analysis'],
    icon: Eye
  }
];

export const stats = [
  { label: 'Certifications', value: '4+', icon: Award },
  { label: 'CTF Challenges', value: '10+', icon: Terminal },
  { label: 'Tools Mastered', value: '15+', icon: Layers },
  { label: 'Security Tests', value: '5+', icon: Shield }
];
