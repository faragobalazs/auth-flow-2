# Authentication Backend with JWT and Signed Cookies

This is a complete backend authentication system that uses JWT tokens stored in signed HTTP-only cookies for secure authentication.

## Features

- User registration with email and password
- User login with JWT token generation
- Protected routes with authentication middleware
- JWT tokens stored in signed HTTP-only cookies
- Automatic cookie expiration handling
- Logout functionality that clears cookies

## Project Structure

```
├── server.js              # Main server file
├── config.env             # Environment variables
├── package.json           # Dependencies
├── middleware/
│   └── auth.js           # Authentication middleware
├── controllers/
│   ├── authController.js # Authentication logic
│   └── userController.js # User-related logic
└── routes/
    ├── auth.js           # Authentication routes
    └── user.js           # User routes
```

## Setup Instructions

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment variables:**

   - Edit `config.env` file
   - Change the JWT_SECRET and COOKIE_SECRET to secure values

3. **Start the server:**

   ```bash
   npm start
   ```

   For development with auto-restart:

   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3000`

## API Endpoints

### Public Endpoints

#### 1. Register User

- **URL:** `POST /api/auth/register`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:** User created and automatically logged in with cookie set

#### 2. Login User

- **URL:** `POST /api/auth/login`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:** User logged in with cookie set

### Protected Endpoints (Require Authentication)

#### 3. Get User Profile

- **URL:** `GET /api/user/profile`
- **Headers:** Cookie will be automatically sent
- **Response:** User information including userId

#### 4. Logout

- **URL:** `POST /api/auth/logout`
- **Headers:** Cookie will be automatically sent
- **Response:** Cookie cleared

## Testing with Postman

### Step 1: Register a User

1. Create a new POST request to `http://localhost:3000/api/auth/register`
2. Set Content-Type header to `application/json`
3. Add body:
   ```json
   {
     "email": "test@example.com",
     "password": "password123"
   }
   ```
4. Send request - you should receive a success response and a cookie will be set

### Step 2: Test Protected Endpoint

1. Create a new GET request to `http://localhost:3000/api/user/profile`
2. In Postman settings, ensure "Automatically follow redirects" is enabled
3. Send request - you should receive user profile with userId

### Step 3: Test Logout

1. Create a new POST request to `http://localhost:3000/api/auth/logout`
2. Send request - cookie should be cleared

### Step 4: Test Without Authentication

1. Try accessing `http://localhost:3000/api/user/profile` again
2. You should receive a 401 Unauthorized error

## Cookie Configuration

- **Name:** `accessToken`
- **Type:** Signed HTTP-only cookie
- **JWT Expiration:** 1 day
- **Cookie Expiration:** 2 days (longer than JWT to handle browser cleanup)
- **Security:** HTTPS-only in production
- **SameSite:** Strict

## Testing Token Expiration

To test token expiration behavior, you can temporarily modify the JWT expiration in `controllers/authController.js`:

```javascript
// Change from 1 day to 10 seconds for testing
{
  expiresIn: "10s";
}
```

This will help you see what happens when tokens expire.

## Security Features

1. **Signed Cookies:** Cookies are encrypted with a secret key
2. **HTTP-Only:** Cookies cannot be accessed via JavaScript (XSS protection)
3. **Secure Flag:** HTTPS-only in production
4. **SameSite:** Prevents CSRF attacks
5. **Password Hashing:** Passwords are hashed using bcrypt
6. **JWT Expiration:** Tokens automatically expire after 1 day

## Notes

- This implementation uses in-memory storage for users. In production, use a database.
- The JWT secret and cookie secret should be strong, unique values in production.
- For HTTPS in development, you may need to set up SSL certificates or use a tool like ngrok.
