# API Documentation

## Overview

Welcome to the API documentation for social-media-backend.

**Base URL:** `https://social-media-backend-g4nj.onrender.com`

## Authentication

All requests to the API require authentication using JSON Web Tokens (JWT). To authenticate, include the JWT in the `Authorization` header.

### Authentication Endpoints

- **POST /api/users/signup**
  - Register a new user account.
- **POST /api/users/signin**
  - Log in as a user.
- **POST /api/users/logout**
  - Log out the currently logged-in user.
- **POST /api/users/logout-all-devices**
  - Log out the user from all devices.

## User Profile

Manage user profiles using the following endpoints:

- **GET /api/users/get-details/:userId**
  - Retrieve user information by ID.
- **GET /api/users/get-all-details**
  - Retrieve information for all users.
- **PUT /api/users/update-details/:userId**
  - Update user details.

## Posts

Interact with posts using the following endpoints:

- **GET /api/posts/all**
  - Retrieve all posts for a news feed.
- **GET /api/posts/:postId**
  - Retrieve a specific post by ID.
- **GET /api/posts/:userId**
  - Retrieve all posts for a specific user.
- **POST /api/posts/**
  - Create a new post.
- **DELETE /api/posts/:postId**
  - Delete a specific post.
- **PUT /api/posts/:postId**
  - Update a specific post.

## Comments

Manage comments on posts:

- **GET /api/comments/:postId**
  - Get comments for a specific post.
- **POST /api/comments/:postId**
  - Add a comment to a specific post.
- **DELETE /api/comments/:commentId**
  - Delete a specific comment.
- **PUT /api/comments/:commentId**
  - Update a specific comment.

## Likes

Handle likes on posts or comments:

- **GET /api/likes/:id**
  - Get likes for a specific post or comment.
- **GET /api/likes/toggle/:id**
  - Toggle like on a post or comment.

## Friendship

Manage user friendships:

- **GET /api/friends/get-friends/:userId**
  - Get a user's friends.
- **GET /api/friends/get-pending-requests**
  - Get pending friend requests.
- **GET /api/friends/toggle-friendship/:friendId**
  - Toggle friendship with another user.
- **GET /api/friends/response-to-request/:friendId**
  - Accept or reject a friend request.

## OTP

Handle OTP for password reset:

- **POST /api/otp/send**
  - Send an OTP for password reset.
- **POST /api/otp/verify**
  - Verify an OTP.
- **POST /api/otp/reset-password**
  - Reset the user's password.

## Response Format

All API responses follow a standard format:

```json
{
  "success": true,
  "message": "Request successful",
  "data": { /* Response data */ }
}
