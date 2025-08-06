# Payra Pay Digital Wallet 💳  

## 🚀 Project Overview 
A secure and scalable **digital wallet system** built with **TypeScript, Express, Mongoose, and REST APIs**, deployed on **Vercel**.  
 
Payra Pay is a digital wallet solution that allows users to manage funds, send/receive money, and perform cash-in/out through agents.  

It also provides **admins** with full control over users, wallets, and transactions.  

---

### Key Features  
- ✅ JWT-based authentication with **3 roles**: Admin, User, Agent  
- ✅ Automatic wallet creation with initial balance  
- ✅ Secure password hashing using **bcrypt**  
- ✅ Users can add money, withdraw, send money, and view transactions  
- ✅ Agents can cash-in/cash-out for users and earn commissions  
- ✅ Admins can view all data, block/unblock wallets, approve/suspend agents  
- ✅ Full **transaction history tracking**  
- ✅ Query builder: search, filter, sort, paginate  
- ✅ Role-based route protection  

---

## ⚙️ Technologies Used  
- **Node.js** with **Express.js** – Backend framework  
- **TypeScript** – Strongly-typed server-side development  
- **MongoDB with Mongoose** – NoSQL database and schema modeling  
- **JWT (JSON Web Token)** – Authentication and authorization  
- **bcrypt** – Secure password hashing  
- **REST API** – Standardized API design  
- **Vercel** – Deployment  

---

## 🔒 Security 
- Passwords hashed with bcrypt
- Role-based authentication with JWT
- Protected API routes per role (Admin, User, Agent)


## API Endpoints

### 🔐 Authentication
| Method | Path         | Role(s) Allowed        | Description |
|--------|--------------|------------------------|-------------|
| POST   | `/login`     | All                    | Authenticate user/agent/admin and issue JWTs. |

### 👤 User & Agent Management
| Method | Path                             | Role(s) Allowed      | Description |
|--------|----------------------------------|--------------------- |-------------|
| POST   | `/register`                      | Public (new user)    | Register a new user (auto-create wallet with initial balance). |
| PATCH  | `/`                              | Admin, Agent, User   | Update current user's profile. |
| GET    | `/`                              | Admin                | Get all users. |
| GET    | `/agents`                        | Admin                | Get all agents. |
| POST   | `/agents/become-agent`           | User                 | Apply to become an agent. |
| PATCH  | `/handle-request/:id`            | Admin                | Handle (approve/suspend) an agent request. |

### 💸 Transaction Operations
| Method | Path                                        | Role(s) Allowed      | Description |
|--------|---------------------------------------------|--------------------- |-------------|
| POST   | `/add-money`                                | Admin, Agent, User   | Add/top-up money to a wallet. |
| POST   | `/withdraw-money`                           | Admin, Agent, User   | Withdraw money from a wallet. |
| POST   | `/send-money`                               | Admin, Agent, User   | Send money from one wallet to another. |
| GET    | `/history`                                  | Admin, Agent, User   | View transaction history for the authenticated user/agent. |
| POST   | `/cash-in`                                  | Agent                | Agent performs cash-in to any user's wallet. |
| POST   | `/cash-out`                                 | User                 | Agent can Cash-out from any user's wallet. User will hit the api
| GET    | `/`                                         | Admin                | Get all transactions. |
| POST   | `/parameters/create`                        | Admin                | Create/set transaction system parameters (Charges & commisions). |
| PATCH  | `/parameters/update`                        | Admin                | Update existing transaction parameters. |

### 🏦 Wallet Management
| Method | Path                         | Role(s) Allowed       | Description |
|--------|------------------------------|-----------------------|-------------|
| GET    | `/`                          | Admin                 | Get all wallets. |
| PATCH  | `/block/:id`                 | Admin                 | Block a specific wallet by ID. |
| PATCH  | `/unblock/:id`               | Admin                 | Unblock a specific wallet by ID. |
| PATCH  | `/deactivate`                | Admin, Agent, User    | Deactivate own wallet. |
| PATCH  | `/activate`                  | Admin, Agent, User    | Activate/reactivate own wallet. |



## 📦 Installation & Setup  

```bash
# 1. Clone the repository
git clone https://github.com/nabilsiddik/payra-pay.git
cd payra-pay

# 2. Install dependencies
npm install

# 3. Setup environment variables
PORT=
NODE_ENV=
MONGODB_URI=
SALT_ROUND=
JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRES=
JWT_REFRESH_SECRET=
JWT_REFRESH_EXPIRES=

# 2. Run the application
npm run dev
