# Blood Donation Application

## Overview

The Blood Donation Application is a platform designed to facilitate blood donation activities by connecting donors with those in need of blood. It provides a user-friendly interface for registration, donation requests, donor management, content management, and role-based access control. The application is built using the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

### User Authentication and Management

- **Registration:** Users can register as donors, volunteers, or administrators. Default role upon registration is "donor".
- **Login:** Registered users can log in using their email and password.
- **Profile Management:** Users can view and update their profile information, including blood type and location.
- **Role-Based Access Control:** Admins have access to all features, while donors and volunteers have limited access based on their roles.

### Donation Requests

- **Create Donation Requests:** Donors and volunteers can create donation requests, specifying recipient information, donation location, and schedule.
- **View Donation Requests:** Donors can view their recent donation requests and manage them, including editing and deleting.

### Dashboard

- **Responsive Dashboard:** The dashboard layout is responsive for mobile, tablet, and desktop views.
- **Profile Page:** Users have a profile page to view and update their information.
- **Donor Dashboard:** Provides a home page to view recent donation requests and manage them.
- **Admin Dashboard:** Allows admins to view statistics, manage users, manage donation requests, and manage content.

### Content Management

- **Add Blog Posts:** Admins can add blog posts with titles, thumbnail images, and content using a rich text editor.
- **Publishing and Unpublishing:** Admins can publish or unpublish blog posts, and only published posts are visible to users.
- **Deleting Blog Posts:** Admins can delete blog posts.

### Additional Features

- **Search Functionality:** Users can search for donation opportunities based on blood type and location.
- **Pagination:** Pagination is implemented for displaying large datasets.
- **JWT Authentication:** JSON Web Tokens (JWT) are used for authentication and protecting private APIs.

## Technologies Used

- MongoDB
- Express.js
- React
- Node.js
- JWT for authentication



## Default Admin Credentials (For Testing)

- **Admin Email:** admin@redlove.com
- **Admin Password:** Admin123

## Live Site URL

## Live Site URL

[Live Site](https://red-love-donation.web.app/)

## Deployment

The application can be deployed to any hosting platform that supports Node.js applications. Make sure to configure environment variables and set up the necessary database.

