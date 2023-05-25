## Anima Full Stack Technical

### Overview

This is a calendar app that allows users to manage their events. The app displays a calendar view for the day, 
with the ability to navigate to previous and next days. Users are able to add, edit, and remove events.
The app should be visually pleasing, somewhat responsive, and intuitive. Users can also switch from day view
to week / month view.

### Frontend
- I used Vite for blazingly fast development
- I used React as JavaScript framework / library
- I used React Router Dom to manage routing in SPA
- I used Redux to store / manage events data
- I used Yup for validation
- I used Axios for HTTP Requests
- I used Bootstrap as UI library for ready-to-use components

### Backend
- I used Node.js with Express to spin up a server
- I followed REST API convention to build my API
- I used MongoDB as database for this app
- I used Mongoose for easier access to MongoDB

### Potential improvements

Although the app works and represents the idea, there is always room for improvement. I disliked the idea
to exceed time over 3–4 hours, so here are a couple of things I would like to implement if there would be more time:
- Add TypeScript for more type-safe environment, common types and security within the app
- Add Unit Testing, although app is not huge, would be nice to test some basic features (Jest, React Testing Library)
- I used Redux here, but maybe Redux Toolkit would be a more scalable approach
- Extract "Form" into separate component and use it in "Add Event" and "Edit Event" pages
- Better styling & further optimizations

## Quick Start (localhost)

/calendar-rest-api

Install packages
```
npm i
```

Run server
```
npm run dev
```

Edit .env
```
PORT=
MONGO_URL=
```

/calendar-client

Install packages
```
npm i 
```

Run client
```
npm run dev
```
<br/>
Happy hacking!
