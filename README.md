#  WouldYouTry

A dedicated social platform where people discover, rate, and validate creative off-menu dishes from brunch cafés.


##  Overview

**WouldYouTry** is the community-facing platform of our hackathon project.

It allows café owners to share experimental dishes made from leftover ingredients and gather real-time feedback from customers before adding them to the menu.

Instead of guessing what might work, owners can validate ideas through engagement.


##  Problem

Brunch menus are often repetitive because:

- Owners avoid risk when trying new dishes  
- There is no fast way to test customer interest  
- New ideas may fail without feedback  
- Customers are not involved in menu decisions  


##  Solution

WouldYouTry enables:

- Sharing experimental dishes publicly  
- Community-driven feedback ("Would you try this?")  
- Data-backed decisions before launching dishes  


##  Features

###  Create Post

- Upload a dish image  
- Add description (ingredients, concept, notes)  
- Attach location (Map integration)  


###  Community Feedback

- Users can:
  - Like (Would Try)
  - Dislike (Would Not Try)  

- Ratings update dynamically based on interactions  


###  Engagement Metrics

- Real-time popularity tracking  
- Visual rating indicators  
- Helps owners evaluate demand  


###  Explore Page

- Discover nearby dishes  
- Interactive map (Mapbox integration)  
- Browse trending or recent posts  


##  Tech Stack

- **Frontend**
  - React (Vite)
  - TypeScript
  - Tailwind CSS  

- **Backend (basic / optional)**
  - Node.js
  - Express  

- **Database**
  - Supabase 

- **APIs & Tools**
  - Mapbox (maps and location)
  - Image upload handling  


##  How It Works

1. Café owner creates a post with a new dish  
2. The post appears on the feed  
3. Users interact (like / dislike)  
4. Ratings update in real time  
5. Owners use feedback to decide whether to launch the dish  


##  Use Case

Example:

> A café posts a "Matcha Pancake with Citrus Cream" made from leftover ingredients.  
> If users respond positively → it becomes a menu item.  
> If not → no risk taken.


##  Hackathon Scope

This project focuses on:

- Fast and intuitive UI/UX  
- Real-time interaction simulation  
- Simple but impactful social mechanics  


##  Future Improvements

- User accounts & authentication  
- Comment system (thread-style discussions)  
- Save / bookmark posts  
- AI-based trend insights  
- Analytics dashboard for café owners  


##  Related Projects

- [WouldYouTry.Create](https://qkhnh.github.io/WouldYouTry.Create/) – AI dish generation tool  


##  Note

This repository contains **only the social platform (WouldYouTry)**.  
The AI management tool (**WouldYouTry.Create**) is developed separately.
