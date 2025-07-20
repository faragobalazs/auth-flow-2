# Postman Testing Guide for Authentication API

This guide will help you test the authentication backend using Postman.

## Setup Instructions

1. **Import the API Collection**

   - Open Postman
   - Create a new collection called "Auth API"
   - Add the following requests

2. **Configure Postman Settings**
   - Go to Settings (gear icon) → General
   - Enable "Automatically follow redirects"
   - Go to Settings → Cookies
   - Enable "Automatically persist cookies"

## API Endpoints to Test

### 1. Register User

- **Method:** POST
- **URL:** `http://localhost:3000/api/auth/register`
- **Headers:**
  - `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Expected Response:**
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "userId": "1753045930530",
      "email": "test@example.com"
    }
  }
  ```

### 2. Login User

- **Method:** POST
- **URL:** `http://localhost:3000/api/auth/login`
- **Headers:**
  - `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Expected Response:**
  ```json
  {
    "message": "Login successful",
    "user": {
      "userId": "1753045930530",
      "email": "test@example.com"
    }
  }
  ```

### 3. Get User Profile (Protected)

- **Method:** GET
- **URL:** `http://localhost:3000/api/user/profile`
- **Headers:** None (cookie will be sent automatically)
- **Expected Response:**
  ```json
  {
    "message": "User profile retrieved successfully",
    "user": {
      "userId": "1753045930530",
      "email": "test@example.com"
    },
    "timestamp": "2025-07-20T21:12:10.783Z"
  }
  ```

### 4. Logout

- **Method:** POST
- **URL:** `http://localhost:3000/api/auth/logout`
- **Headers:** None (cookie will be sent automatically)
- **Expected Response:**
  ```json
  {
    "message": "Logout successful"
  }
  ```

## Testing Flow

### Step 1: Register a New User

1. Send the register request
2. Check that you get a success response
3. Note the `userId` from the response
4. The `accessToken` cookie will be automatically set

### Step 2: Test Protected Endpoint

1. Send the GET profile request
2. You should receive the user profile with the same `userId`
3. This confirms the authentication is working

### Step 3: Test Logout

1. Send the logout request
2. You should receive a success message
3. The cookie should be cleared

### Step 4: Test Without Authentication

1. Try to access the profile endpoint again
2. You should receive a 401 Unauthorized error

### Step 5: Login Again

1. Send the login request with the same credentials
2. You should be able to access protected endpoints again

## Cookie Information

- **Name:** `accessToken`
- **Type:** Signed HTTP-only cookie
- **JWT Expiration:** 1 day
- **Cookie Expiration:** 2 days
- **Security Features:**
  - `httpOnly: true` (cannot be accessed via JavaScript)
  - `secure: false` (in development, true in production)
  - `signed: true` (encrypted with secret key)
  - `sameSite: "lax"` (for testing compatibility)

## Error Responses

### 400 Bad Request

```json
{
  "error": "Email and password are required"
}
```

### 401 Unauthorized

```json
{
  "error": "Access denied. No token provided."
}
```

### 401 Invalid Credentials

```json
{
  "error": "Invalid email or password"
}
```

## Testing Token Expiration

To test what happens when tokens expire:

1. Modify the JWT expiration in `controllers/authController.js`:

   ```javascript
   {
     expiresIn: "10s";
   } // Change from '1d' to '10s'
   ```

2. Restart the server
3. Login and wait 10 seconds
4. Try to access a protected endpoint
5. You should receive a token expiration error

## Troubleshooting

### Cookies Not Being Sent

- Ensure "Automatically persist cookies" is enabled in Postman settings
- Check that the request is going to the correct domain
- Verify CORS settings in the server

### 401 Unauthorized Errors

- Make sure you've logged in first
- Check that the cookie is being sent with the request
- Verify the JWT hasn't expired

### CORS Errors

- The server is configured to allow all origins for testing
- In production, update the CORS origin in `server.js`
