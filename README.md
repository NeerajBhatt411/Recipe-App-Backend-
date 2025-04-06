<h1 align="center">🍽️ Recipe App - Backend</h1>
<p align="center">Node.js | Express.js | MongoDB | Email OTP Auth</p>

---

## 🔑 Features

- ✅ **User Authentication**
  - Register with email and password
  - OTP-based email verification
  - Resend OTP
  - Secure login and forgot password

- 📚 **Explore Recipes**
  - Search by recipe name
  - Filter by cuisine
  - View detailed recipe info

- ❤️ **Favorites**
  - Add recipes to your favorites

- ✍️ **User Contributions**
  - Create and post your own recipes

---

## 🛠️ Tech Stack

| Tech         | Use                         |
|--------------|------------------------------|
| Node.js      | Backend runtime              |
| Express.js   | Web framework                |
| MongoDB      | NoSQL Database               |
| Mongoose     | ODM for MongoDB              |
| Bcrypt       | Password hashing             |
| JWT          | Authentication tokens        |
| Nodemailer   | Sending emails (OTP)         |
| dotenv       | Manage environment variables |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/NeerajBhatt411/Recepie_App.git
cd Recepie_App



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recipe App Auth API Documentation</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        
        h1 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
        }
        
        .endpoint {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            margin-bottom: 25px;
            border-left: 4px solid #3498db;
        }
        
        .endpoint-title {
            font-size: 1.4em;
            color: #2c3e50;
            margin-top: 0;
            display: flex;
            align-items: center;
        }
        
        .endpoint-title .method {
            background-color: #3498db;
            color: white;
            padding: 3px 10px;
            border-radius: 4px;
            font-size: 0.8em;
            margin-right: 10px;
        }
        
        .endpoint-title .path {
            font-family: monospace;
        }
        
        .purpose {
            font-style: italic;
            color: #555;
            margin-bottom: 15px;
        }
        
        .section {
            margin-bottom: 15px;
        }
        
        .section-title {
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
        }
        
        .request-title {
            color: #3498db;
        }
        
        .response-title {
            color: #27ae60;
        }
        
        pre {
            background-color: #f5f5f5;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            border-left: 3px solid #3498db;
        }
        
        .success-badge {
            background-color: #27ae60;
            color: white;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 0.8em;
            margin-right: 8px;
        }
        
        .emoji {
            font-size: 1.2em;
            margin-right: 5px;
        }
    </style>
</head>
<body>
    <h1>🍲 Recipe App Auth API Documentation</h1>
    
    <div class="endpoint">
        <h2 class="endpoint-title">
            <span class="method">POST</span>
            <span class="path">/v1/api/register</span>
        </h2>
        <p class="purpose">✅ Registers a new user and sends OTP on their email.</p>
        
        <div class="section">
            <div class="section-title request-title">
                <span class="emoji">📩</span> Request Body (JSON):
            </div>
            <pre>{
  "name": "Neeraj",
  "email": "neerajbhattadx@gmail.com",
  "password": "123456"
}</pre>
        </div>
        
        <div class="section">
            <div class="section-title response-title">
                <span class="success-badge">🟢 Success</span> Response:
            </div>
            <pre>{
  "success": true,
  "message": "OTP sent to your email"
}</pre>
        </div>
    </div>
    
    <div class="endpoint">
        <h2 class="endpoint-title">
            <span class="method">POST</span>
            <span class="path">/v1/api/verify-otp</span>
        </h2>
        <p class="purpose">🔍 Verifies the OTP sent to user's email after registration.</p>
        
        <div class="section">
            <div class="section-title request-title">
                <span class="emoji">📩</span> Request Body (JSON):
            </div>
            <pre>{
  "email": "neerajbhattadx@gmail.com",
  "otp": "914157"
}</pre>
        </div>
        
        <div class="section">
            <div class="section-title response-title">
                <span class="success-badge">🟢 Success</span> Response:
            </div>
            <pre>{
  "success": true,
  "message": "User verified successfully"
}</pre>
        </div>
    </div>
    
    <div class="endpoint">
        <h2 class="endpoint-title">
            <span class="method">POST</span>
            <span class="path">/v1/api/resend-otp</span>
        </h2>
        <p class="purpose">🔁 Resends the OTP to user's email if not received or expired.</p>
        
        <div class="section">
            <div class="section-title request-title">
                <span class="emoji">📩</span> Request Body (JSON):
            </div>
            <pre>{
  "email": "neerajbhattadx@gmail.com"
}</pre>
        </div>
        
        <div class="section">
            <div class="section-title response-title">
                <span class="success-badge">🟢 Success</span> Response:
            </div>
            <pre>{
  "success": true,
  "message": "OTP resent to your email"
}</pre>
        </div>
    </div>
    
    <div class="endpoint">
        <h2 class="endpoint-title">
            <span class="method">POST</span>
            <span class="path">/v1/api/forget-password</span>
        </h2>
        <p class="purpose">❓ Sends OTP to reset user's password.</p>
        
        <div class="section">
            <div class="section-title request-title">
                <span class="emoji">📩</span> Request Body (JSON):
            </div>
            <pre>{
  "email": "neerajbhattadx@gmail.com"
}</pre>
        </div>
        
        <div class="section">
            <div class="section-title response-title">
                <span class="success-badge">🟢 Success</span> Response:
            </div>
            <pre>{
  "success": true,
  "message": "OTP sent to your email"
}</pre>
        </div>
    </div>
    
    <div class="endpoint">
        <h2 class="endpoint-title">
            <span class="method">POST</span>
            <span class="path">/v1/api/resetPassword</span>
        </h2>
        <p class="purpose">🔐 Allows user to reset their password using OTP.</p>
        
        <div class="section">
            <div class="section-title request-title">
                <span class="emoji">📩</span> Request Body (JSON):
            </div>
            <pre>{
  "email": "neerajbhattadx@gmail.com",
  "otp": "646098",
  "newPassword": "newpass@123"
}</pre>
        </div>
        
        <div class="section">
            <div class="section-title response-title">
                <span class="success-badge">🟢 Success</span> Response:
            </div>
            <pre>{
  "success": true,
  "message": "Password reset successfully"
}</pre>
        </div>
    </div>
    
    <div class="endpoint">
        <h2 class="endpoint-title">
            <span class="method">POST</span>
            <span class="path">/v1/api/login</span>
        </h2>
        <p class="purpose">🔓 Logs in the user and returns a JWT token.</p>
        
        <div class="section">
            <div class="section-title request-title">
                <span class="emoji">📩</span> Request Body (JSON):
            </div>
            <pre>{
  "email": "neerajbhattadx@gmail.com",
  "password": "newpass@123"
}</pre>
        </div>
        
        <div class="section">
            <div class="section-title response-title">
                <span class="success-badge">🟢 Success</span> Response:
            </div>
            <pre>{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}</pre>
        </div>
    </div>
</body>
</html>