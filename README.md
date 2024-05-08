# Twitter Clone

A simple Twitter clone project built with Express.js and React.js, featuring user authentication (login, logout, signup) and session management.

<div style="display: flex;">
  <img src="https://github.com/LukeT2340/TwitterClone/assets/83848772/48c1a859-3f44-4a38-95a2-5d27a6a0758b" alt="Screenshot 1" style="flex: 1; margin-right: 10px;">
  <img src="https://github.com/LukeT2340/TwitterClone/assets/83848772/87f6d21d-0c55-4cbe-8fe4-029d9bd86aac" alt="Screenshot 2" style="flex: 1; margin-right: 10px;">
  <img src="https://github.com/LukeT2340/TwitterClone/assets/83848772/83fc731e-38f4-40a0-91d3-0c1e53ff8198" alt="Screenshot 3" style="flex: 1;">
</div>

## Features (So far)

- User authentication:
  - Sign up: Users can create new accounts with a unique username, email, and password.
  - Login: Registered users can log in to their accounts securely.
  - Logout: Users can log out of their accounts.
- Session management: User sessions are managed using `express-session`.
- Basic sign-up and login pages: Simple sign-up and login pages resembling Twitter's design.
- Home page that is different depending on whether the user is logged in or not.
- Retrieve latest tweets and tweeter information from MySQL database by querying the expres API.
## Technologies Used

- **Front-end**:
  - React.js
  - HTML
  - CSS
- **Back-end**:
  - Express.js
  - MySQL (for user authentication and data storage)
- **Session Management**:
  - `express-session`
- **Password Hashing**:
  - `crypto` (for hashing passwords)

