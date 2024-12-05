# PetBuddy Frontend

# Introduction
PetBuddy is a mobile application that helps pet owners manage their pets' care, reminders, and activities effectively.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Run Backend](#run-backend)
5. [Installation](#installation)
   - [Clone the Repository](#clone-the-repository)
   - [Navigate to Project Directory](#navigate-to-project-directory)
6. [Android Steps](#android-steps)
7. [iOS Steps](#ios-steps)
8. [Contribution](#contribution)
9. [Contact](#contact)

## Features

- **User Authentication**: Login and register functionality for secure access.
- **Home Screen**: View and navigate through pet profiles, activities, and reminders.
- **Tabs Navigation**: Switch between Home, Services, and Training tabs easily.
- **Pet Management**: Add, update, and view pet profiles.
- **Activity Logging**: Track daily activities like feeding, walking, and vaccinations.
- **Reminders**: Manage reminders for vaccinations, vet visits, and medications.
- **Gallery**: Upload and view pet photos in a digital gallery.
- **Training Resources**: Access resources and tips for training and pet care.
- **Services**: Find and contact pet services like grooming and boarding.

---

## Prerequisites


Ensure you have the following installed:

- Node.js
- React Native CLI
- Android Studio and Xcode (for emulator/simulator)

## Run Backend

Clone the backend repository and follow its README to set it up:

```bash
git clone https://github.com/yourusername/petbuddy-backend.git
```
```bash
cd petbuddy-backend
```
```bash
npm install
```
```bash
npm start
```

## Installation

1. Clone the repository:

   ```bash 
   git clone https://github.com/ushasri2645/petbuddy/tree/petbuddy/version-1
   ```

2.  Navigate to the project directory:

    ```bash
    cd version-1
    ```


## Android steps:

1. **Launch an Android Emulator**:
    - Open Android Studio.
    - Go to AVD Manager (Android Virtual Device Manager) from the top-right corner of Android Studio or via the Tools menu.
    - Create a new virtual device or select an existing one and start it.

2. **Run the Application**:
    - Once the emulator is running, open a terminal.
    - Navigate to the project directory
    ```sh
    cd petbuddy/version-1
    ```
    ```sh
    npx react-native run-android
    ```

## iOS Steps:
1. **Open an iOS Simulator**:
    - Ensure you have Xcode installed in your system.
    - Open Simulator from Xcode via Xcode > Open Developer Tool > Simulator
    
2. **Install CocoaPods Dependencies**:
    - Navigate to the iOS project directory
    ```sh
    cd ios
    ```
    - Run the following command to install CocoaPods dependencies
    ```sh
    pod install
    ```

3. **Run the Application**:
   - Open a terminal
   - Navigate to the project directory after cloning
   ```sh
   cd petuddy/version-1 
   ```
   - Execute the following command to build and run the application
   ```sh
   npx react-native run-ios
   ```

## Contribution

I contributed to the development of PetBuddy Frontend by:

- Implemented User Authentication for secure login and registration.
- Developed the Home Screen with navigation to pet profiles, activities, and reminders.
- Built the Pet Management feature to add, update, and view pet profiles.
- Created the Activity Logging system to track daily activities like feeding, walking, and vaccinations.
- Added the Reminder System for managing important pet care tasks.
- Developed the Gallery feature for uploading and viewing pet photos.
- Integrated Training Resources for users to access helpful pet care and training tips.
- Added functionality for viewing and contacting local Pet Services like grooming and boarding.

## Contact: 
For any issues, questions or feedback, please contact:
- Email : ugudikandula@everest.engineering


