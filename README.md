# **Story Flow - A Modern Blogging Platform**

🚀 **Story Flow** is a sleek and powerful blogging platform built with **Next.js**, **Prisma**, and **PostgreSQL**. It offers a seamless experience for both writers and readers, making content creation effortless and engaging.

---

## 🌟 **Features**

### ✅ **For Readers**

- Browse published articles with a clean and responsive UI
- Read engaging blog posts with a distraction-free experience
- Explore content by category and author
- View post analytics (comments)

### ✍️ **For Writers**

- Create, edit, and manage blog posts with a **rich text editor (Tiptap)**
- Upload and manage images using **Cloudinary**
- Save drafts before publishing
- See a **"Draft" badge** on unpublished posts (visible only to authors)

### 🔐 **Authentication & Security**

- **NextAuth (Credentials Provider)** for secure login and signup
- **Password Reset** via email using **Brevo (formerly Sendinblue)**
- **CSRF Protection & XSS Prevention** for enhanced security

### ⚙️ **Admin Features**

- **User Management** (assign roles, manage users)
- **Post Moderation** (delete inappropriate content)
- **Category Management** (add/edit blog categories)

---

## 🛠 **Tech Stack**

| **Technology**         | **Usage**                                     |
| ---------------------- | --------------------------------------------- |
| **Next.js**            | Full-stack framework for SSR and routing      |
| **TypeScript**         | Type safety and improved developer experience |
| **Prisma**             | ORM for database interactions                 |
| **PostgreSQL (Neon)**  | Cloud-based relational database               |
| **NextAuth**           | Authentication and session management         |
| **Redux Toolkit**      | State management                              |
| **Cloudinary**         | Image storage and optimization                |
| **Tiptap**             | Rich text editor for content creation         |
| **Tailwind CSS**       | Modern styling framework                      |
| **Brevo (Sendinblue)** | Email service for password resets             |

---

## 🚀 **Getting Started**

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/yourusername/story-flow.git
cd story-flow
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Set Up Environment Variables**

Create a `.env.local` file and configure the following:

```env
DATABASE_URL="your_postgres_database_url"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
BREVO_API_KEY="your_brevo_api_key"
CLOUDINARY_CLOUD_NAME="your_cloudinary_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
```

### **4️⃣ Run the Development Server**

```sh
npm run dev
```

Your app will be running at **http://localhost:3000** 🎉

---

## 📢 **Contributing**

Contributions are welcome! Feel free to submit **issues** or **pull requests**.

---

## 📄 **License**

This project is **open-source** under the **MIT License**.

---

🔗 **Follow for updates & support:**

- ✉️ **Email:** [martinchijindu@gmail.com]
- 🌐 **Website:** [Your Website]
- 🐙 **GitHub:** [Your GitHub Profile]
