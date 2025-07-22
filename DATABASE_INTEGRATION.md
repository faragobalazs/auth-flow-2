# Database Integration Guide

This document outlines how to integrate a database with the authentication system.

## Supported Databases

### MongoDB Integration

1. **Install MongoDB dependencies:**

   ```bash
   npm install mongoose
   ```

2. **Create database connection:**

   ```javascript
   const mongoose = require("mongoose");

   mongoose.connect(process.env.MONGODB_URI, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
   });
   ```

3. **Create User model:**

   ```javascript
   const userSchema = new mongoose.Schema({
     email: { type: String, required: true, unique: true },
     password: { type: String, required: true },
     createdAt: { type: Date, default: Date.now },
   });

   module.exports = mongoose.model("User", userSchema);
   ```

### PostgreSQL Integration

1. **Install PostgreSQL dependencies:**

   ```bash
   npm install pg sequelize
   ```

2. **Create database connection:**

   ```javascript
   const { Sequelize } = require("sequelize");

   const sequelize = new Sequelize(process.env.DATABASE_URL, {
     dialect: "postgres",
     logging: false,
   });
   ```

3. **Create User model:**

   ```javascript
   const { DataTypes } = require("sequelize");

   const User = sequelize.define("User", {
     email: {
       type: DataTypes.STRING,
       allowNull: false,
       unique: true,
     },
     password: {
       type: DataTypes.STRING,
       allowNull: false,
     },
   });
   ```

## Environment Variables

Add these to your `.env`:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/auth-system

# PostgreSQL
DATABASE_URL=postgresql://username:password@localhost:5432/auth-system
```

## Migration Steps

1. **Replace in-memory storage** in `controllers/authController.js`
2. **Add database connection** to `server.js`
3. **Update user operations** to use database queries
4. **Add error handling** for database operations

## Benefits of Database Integration

- **Persistence:** User data survives server restarts
- **Scalability:** Handle multiple server instances
- **Security:** Better data protection and backup
- **Performance:** Optimized queries and indexing
- **Analytics:** Track user behavior and system usage

## Next Steps

1. Choose your preferred database
2. Follow the integration guide above
3. Test thoroughly with the existing API endpoints
4. Update deployment documentation
5. Consider adding database migrations for schema changes
