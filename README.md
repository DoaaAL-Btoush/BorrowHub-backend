# 🧠 BorrowHub Backend (Express.js + PostgreSQL)

Backend API for the **BorrowHub** full-stack web application. It provides RESTful APIs for user management, item sharing, borrowing requests, authentication, image uploading, and communication with the PostgreSQL database.

---

# 🛠️ Tech Stack

* 🟢 Node.js
* 🚀 Express.js
* 🐘 PostgreSQL
* 📦 pg
* 📁 Multer (Image Upload)
* 🔒 dotenv
* 🌐 CORS

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/your-username/borrowhub-backend.git
```

## 2. Navigate to the project

```bash
cd borrowhub-backend
```

## 3. Install dependencies

```bash
npm install
```

## 4. Create a `.env` file

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=borrowhub_db
DB_USER=postgres
DB_PASSWORD=your_password
```

For Railway deployment:

```env
DATABASE_URL=your_railway_postgresql_connection_string
```

## 5. Start the server

```bash
node server.js
```

or

```bash
npm start
```

The backend server will run on:

```
http://localhost:3000
```

---

# 📂 Project Structure

```text
borrowhub-backend/

├── routes/
│   ├── users.js
│   ├── items.js
│   └── requests.js
│
├── uploads/
│   ├── default-item.png
│   └── uploaded images
│
├── db.js
├── server.js
├── package.json
└── .env
```

---

# 🔌 API Endpoints

## 👤 Users

Base URL:

```
/users
```

| Method | Endpoint   | Description       |
| ------ | ---------- | ----------------- |
| GET    | /users     | Get all users     |
| GET    | /users/:id | Get user by ID    |
| POST   | /users     | Register new user |
| PUT    | /users/:id | Update user       |
| DELETE | /users/:id | Delete user       |

---

## 📦 Items

Base URL:

```
/items
```

| Method | Endpoint   | Description             |
| ------ | ---------- | ----------------------- |
| GET    | /items     | Get all items           |
| GET    | /items/:id | Get item details        |
| POST   | /items     | Add new item with image |
| PUT    | /items/:id | Update item information |
| DELETE | /items/:id | Delete item             |

---

## 🤝 Borrow Requests

Base URL:

```
/requests
```

| Method | Endpoint      | Description               |
| ------ | ------------- | ------------------------- |
| GET    | /requests     | Get all requests          |
| GET    | /requests/:id | Get request by ID         |
| POST   | /requests     | Create borrowing request  |
| PUT    | /requests/:id | Approve or reject request |
| DELETE | /requests/:id | Delete request            |

---

# 🖼️ Image Upload

BorrowHub supports uploading item images using **Multer**.

Uploaded images are stored inside the **uploads/** directory and served statically using:

```javascript
app.use("/uploads", express.static("uploads"));
```

If no image is uploaded, the application automatically uses:

```
/uploads/default-item.png
```

---

# 🗄️ Database

The backend is connected to a **PostgreSQL** database.

Main tables:

* Users
* Items
* Requests

The application performs full CRUD operations through REST APIs while maintaining relationships between users, items, and borrowing requests.

---

# 🌐 Deployment

The backend is deployed on **Railway**.

Production uses the Railway PostgreSQL database through the `DATABASE_URL` environment variable.

Example:

```env
DATABASE_URL=postgresql://username:password@host:port/database
```

---

# 🔒 Features

* ✅ User Registration
* ✅ User Login
* ✅ Role-based Authorization (Admin/User)
* ✅ CRUD Operations
* ✅ Image Upload
* ✅ Borrow Request Management
* ✅ PostgreSQL Integration
* ✅ RESTful API Architecture
* ✅ Railway Deployment

---

# 👨‍💻 Author

BorrowHub Backend was developed using **Express.js, Node.js, PostgreSQL, Multer, and REST APIs** as part of a Full-Stack Web Development project.
