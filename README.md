# CeylonEats – Restaurant Discovery Mobile Application

## Student Details

- **Student Name:** [Enter Your Name]
- **Student ID:** [Enter Your Student ID]
- **Module:** Mobile Application Development
- **Application Name:** CeylonEats

---

## 1. Introduction

CeylonEats is a mobile application developed using React Native and Expo.

The main purpose of this application is to help users discover restaurants and view food details in one place.

Users can search for restaurants, filter restaurants by category and price, view restaurant details, save their favourite restaurants, and manage their profiles.

This application uses sample restaurant and food information from Sri Lanka.

## 2. Problem Solved by the Application

Finding suitable restaurants and comparing food options can take time.

CeylonEats provides a simple way to discover restaurants and view their food menus.

It helps users to:

- Find restaurants easily.
- Search restaurants by name, location, or category.
- Filter restaurants according to food categories and price ranges.
- View restaurant information and food menus.
- Save favourite restaurants.
- Manage personal profile information.

## 3. Main Features

- Restaurant discovery
- Restaurant search
- Food category filtering
- Price range filtering
- Restaurant details and food menus
- Add and remove favourite restaurants
- User profile management
- Data storage using AsyncStorage
- AppState API to detect background and foreground changes
- Local notifications
- Bottom tab navigation
- Restaurant details navigation

**Note:** Restaurant information and food prices are sample data for this application. They are not live restaurant details or real-time prices.

## 4. Application Screens

The application has five main screens.

### 4.1 Home Screen

The Home screen displays a welcome message, restaurant categories, and restaurant information.

Users can search for restaurants and filter them by category. They can also add restaurants to their favourites.

### 4.2 Explore Screen

The Explore screen allows users to discover restaurants.

Users can search and filter restaurants using food categories and price ranges. A Modal is used to display the price filter options.

### 4.3 Favorites Screen

The Favorites screen displays restaurants saved by the user.

Users can view saved restaurants and remove restaurants from their favourites.

### 4.4 Profile Screen

The Profile screen displays user information.

Users can update their profile details. Profile information is saved locally.

### 4.5 Restaurant Details Screen

This screen displays information about a selected restaurant.

Users can view the restaurant description, location, rating, opening hours, and available food items with sample prices.

Users can also add or remove the restaurant from their favourites.

## 5. React Native Components

The application uses the following React Native components:

| Component | Purpose |
|---|---|
| View | Organises screen layouts and content. |
| Text | Displays headings, descriptions, and other text. |
| Image | Displays restaurant and food images. |
| Pressable | Handles user actions such as button presses. |
| FlatList | Displays restaurant or food data as a list. |
| Modal | Displays filtering options. |
| TextInput | Allows users to enter search terms and profile information. |
| ScrollView | Allows users to scroll through screen content. |

## 6. Navigation Structure

CeylonEats uses Expo Router for file-based navigation.

The application includes bottom tab navigation and a nested Stack layout.

Main navigation files:

```text
app/
│
├── _layout.js
├── index.js
│
├── (tabs)/
│   ├── _layout.js
│   ├── index.js
│   ├── explore.js
│   ├── favorites.js
│   └── profile.js
│
└── restaurant/
    └── [id].js
```

The bottom tab navigation provides access to the Home, Explore, Favorites, and Profile screens.

The Restaurant Details screen is opened through the nested Stack navigation. Users can return to the previous screen using the back navigation.

## 7. State Management

The application uses React Context API to share data between screens.

The FavoritesContext manages favourite restaurants. When a user adds or removes a restaurant from favourites, the changes are available across the application.

The ProfileContext manages user profile information.

AsyncStorage is used to save favourite restaurants and profile information locally on the device. Therefore, saved information can remain available after closing and reopening the application.

## 8. AppState API

The React Native AppState API is used to detect application lifecycle changes.

An event listener checks when the application moves between background and foreground states.

When the user returns to CeylonEats after moving the application to the background, a welcome message is displayed.

This feature helps demonstrate how the application responds to changes in its current state.

## 9. Local Notifications

The application uses the `expo-notifications` package to display local notifications.

A local notification is triggered by the relevant user action in the application.

Local notifications help users receive messages about application activities, such as saving a restaurant to favourites.

The application requests notification permission before displaying notifications.

## 10. Technologies Used

- React Native
- Expo
- Expo Router
- JavaScript
- React Context API
- AsyncStorage
- Expo Notifications
- VS Code

## 11. Installation and Running Instructions

Follow these steps to run the application.

### Step 1 – Clone the Repository

```bash
git clone [YOUR_GITHUB_REPOSITORY_URL]
```

### Step 2 – Open the Project Folder

```bash
cd CeylonEats
```

### Step 3 – Install Dependencies

```bash
npm install
```

### Step 4 – Start the Expo Development Server

```bash
npx expo start
```

### Step 5 – Run the Application

- Install Expo Go on your mobile phone.
- Connect your phone and computer to the same Wi-Fi network.
- Scan the QR code displayed in the terminal.
- Open the application using Expo Go.

## 12. Demonstration Video

The demonstration video explains the main features of the CeylonEats application.

**Video Link:** [https://drive.google.com/file/d/1ekHZN3SfCndO9mvq3E6L1tD7NjwekLTL/view?usp=sharing]

## 13. Conclusion

CeylonEats is a simple restaurant discovery mobile application developed using React Native and Expo.

This project helped me understand mobile application development, React Native components, file-based navigation, state management, local data storage, AppState API, and local notifications.

"# CeylonEats" 
