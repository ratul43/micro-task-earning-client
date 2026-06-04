# Micro-Task & Earning Platform (Client Side)

A responsive MERN-based platform enabling **Workers**, **Buyers**, and **Admins** to collaborate on micro-tasks, earn rewards, and manage operations seamlessly.

---

## ✨ Features
1. **Role-based Dashboards** for Worker, Buyer, and Admin.  
2. **Responsive Design** across mobile, tablet, and desktop.  
3. **Secure Authentication** with Email/Password & Google Sign-In.  
4. **Coin System**: Workers earn coins, Buyers purchase coins, Admin manages balances.  
5. **Task Management**: Buyers can add, update, delete, and review tasks.  
6. **Submission Workflow**: Workers submit tasks, Buyers approve/reject, Admin oversees.  
7. **Withdrawal System**: Workers withdraw earnings (20 coins = $1).  
8. **Stripe Payment Integration** for coin purchases.  
9. **Notification System** for approvals, rejections, and withdrawals.  
10. **Environment Variables** used to secure Firebase and MongoDB credentials.  

---

## 🖼️ Pages & Components
- **Home Page**: Hero slider, best workers, testimonials, and extra sections.  
- **Auth Pages**: Registration (with role selection & coin allocation), Login, Google Sign-In.  
- **Dashboard**:
  - Worker: Task list, submissions, withdrawals.  
  - Buyer: Add tasks, review submissions, purchase coins, payment history.  
  - Admin: Manage users, tasks, and withdrawal requests.  

---

## 🛠️ Tech Stack
- **Frontend**: React, Tailwind CSS, Swiper/Carousel  
- **State Management**: Context API  
- **Authentication**: Firebase Auth  
- **Payment**: Stripe Integration  
- **Image Hosting**: imgBB (optional)  