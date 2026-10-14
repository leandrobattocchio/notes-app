# 📝 Notes App

Full-stack notes application with user accounts. Users can sign up, log in and manage their own notes. The project includes a REST API, a React frontend and automated tests on both sides.

## ✨ Features

- **REST API** with Node.js and Express
- **MongoDB** database with Mongoose models for users and notes
- Authentication with **JWT** and password hashing with **bcrypt**
- Custom middlewares for error handling, 404s and extracting the user from the token
- Error monitoring with **Sentry**
- **React + Redux** frontend with Material UI

## 🧪 Testing

- API: **Jest + Supertest** with a separate test database
- Frontend: **Cypress** end-to-end tests

## 🛠️ Tech stack

**Backend:** Node.js · Express · MongoDB · Mongoose · JWT · bcrypt · Sentry
**Frontend:** React · Redux · React Router · Material UI · Axios
**Testing:** Jest · Supertest · Cypress

## 📁 Structure

```
notes-app/
├── api/   # Express REST API
└── app/   # React frontend
```

## 🚀 Run locally

```bash
git clone https://github.com/leandrobattocchio/notes-app.git
cd notes-app/api
npm install
```

Create `api/.env`:

```env
MONGO_DB_URI=your_mongodb_connection_string
MONGO_DB_URI_TEST=your_test_database_connection_string
SECRET=your_jwt_secret
```

```bash
npm run dev    # start the API
npm test       # run API tests
```

In another terminal:

```bash
cd notes-app/app
npm install
npm start
```

---

Made by [Leandro Battocchio](https://leandrobattocchio.github.io) · [LinkedIn](https://www.linkedin.com/in/leandro-battocchio/)
