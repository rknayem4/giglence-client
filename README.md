# Giglance 🚀

A modern freelance marketplace platform connecting clients with talented freelancers. Giglance enables businesses to post projects, hire professionals, manage collaborations, and track project progress through a secure and user-friendly environment.

---

## 🌐 Live Demo

**Frontend:** https://your-live-site.com

**Server:** https://your-api.com

---

## 📖 Project Overview

Giglance is a full-stack freelance marketplace built with Next.js, MongoDB, Better Auth, and HeroUI. The platform provides dedicated dashboards for both clients and freelancers, allowing them to manage projects, proposals, profiles, and communications efficiently.

---

## ✨ Features

### 🔐 Authentication & Authorization

* Secure authentication with Better Auth
* Email & Password login
* Session management
* Role-based access control
* Protected dashboard routes

### 👤 Freelancer Features

* Complete freelancer profile
* Skills and experience showcase
* Portfolio links
* Browse available jobs
* Submit proposals
* Track earnings
* Manage profile settings

### 🏢 Client Features

* Company profile management
* Post new jobs
* Manage existing jobs
* Review freelancer proposals
* Hire freelancers
* Track project progress

### 🖼 Cloudinary Image Upload

* Freelancer profile images
* Company logos
* Secure cloud storage
* Live image preview

### 📋 Job Management

* Create job listings
* Set budgets and deadlines
* Manage applications
* Track hiring process
* Update project status

### 📱 Responsive Design

* Mobile-first approach
* Desktop sidebar navigation
* Mobile-friendly dashboard
* Modern UI powered by HeroUI

---

## 💬 Chat System (Planned)

Future releases will include:

* Real-time messaging
* Instant notifications
* Online status indicators
* File sharing
* Conversation history
* Project-based communication

---

## 💰 Pricing Model

### Freelancer Plan

| Feature          | Free |
| ---------------- | ---- |
| Create Profile   | ✅    |
| Browse Jobs      | ✅    |
| Submit Proposals | ✅    |
| Portfolio Links  | ✅    |
| Dashboard Access | ✅    |

### Client Plan

| Feature                | Free |
| ---------------------- | ---- |
| Create Company Profile | ✅    |
| Post Jobs              | ✅    |
| View Proposals         | ✅    |
| Hire Freelancers       | ✅    |
| Dashboard Access       | ✅    |

### Future Premium Features

* Featured Freelancer Profiles
* Featured Job Listings
* Priority Proposal Placement
* Advanced Analytics
* Unlimited Portfolio Items
* AI Job Recommendations

---

## 🛠 Tech Stack

### Frontend

* Next.js 16
* React 19
* Tailwind CSS
* HeroUI v3.2.1
* React Icons
* Gravity UI Icons

### Backend

* Next.js API Routes
* Better Auth
* MongoDB
* Cloudinary

### Utilities

* React Hooks
* React Hot Toast

---

## 📂 Project Structure

```bash
src/
│
├── app/
│   ├── dashboard/
│   │   ├── freelancer/
│   │   └── client/
│   │
│   ├── login/
│   ├── register/
│   └── jobs/
│
├── components/
│   ├── shared/
│   ├── dashboard/
│   └── ui/
│
├── lib/
│   ├── auth/
│   ├── db/
│   └── cloudinary/
│
└── hooks/
```

---

## 🗄 Database Collections

### Users

```js
{
  _id,
  name,
  email,
  role,
  image,
  createdAt,
  updatedAt
}
```

### Freelancer Profiles

```js
{
  userId,
  title,
  skills,
  experience,
  linkedin,
  github,
  portfolio,
  bio,
  image
}
```

### Client Profiles

```js
{
  userId,
  companyName,
  contactPerson,
  website,
  industry,
  companySize,
  location,
  description,
  logo
}
```

### Jobs

```js
{
  title,
  category,
  description,
  budget,
  deadline,
  client_email,
  status,
  createdAt
}
```

### Proposals

```js
{
  jobId,
  freelancerId,
  bidAmount,
  coverLetter,
  status
}
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/giglance.git
```

### Navigate

```bash
cd giglance
```

### Install Dependencies

```bash
npm install
```

### Setup Environment Variables

```env
MONGODB_URI=

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### Run Development Server

```bash
npm run dev
```

---

## 🔮 Future Roadmap

* Real-time Chat System
* Notifications
* Reviews & Ratings
* Stripe Payment Integration
* Escrow Payments
* Saved Jobs
* Advanced Search & Filters
* Admin Dashboard
* Analytics & Reporting
* AI-powered Matching

---

## 🎯 Project Goal

Giglance aims to create a secure, scalable, and modern freelance marketplace where businesses can find qualified talent and freelancers can discover quality opportunities to grow their careers.

---

## 👨‍💻 Developer

**Robiul Khan Nayem**

Full Stack Developer

Built with ❤️ using Next.js, MongoDB, Better Auth, HeroUI, and Cloudinary.
