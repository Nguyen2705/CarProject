# CARVO Social Media Application Project 


## About the application
CARVO is a social media platform where users can share their feedback and thoughts about specific automobiles they have used. Our application provides a space for everyone to connect with their passion for the automotive world.

Our platform offers a unique space where users can not only share their automotive adventures but also dive deep into the world of cars, motorcycles, trucks, and every mode of transportation in between.

## Technology
This project uses:

- React Native
- Redux
- Node.js
- Firebase
- Expo
- JavaScript
- Tailwind CSS
- Python
- MySQL

## Running the project

To run the project, please follow these steps:

1. Clone the github project on the terminal `git clone https://github.com/Nguyen2705/CarProject.git`.
2. Open the project in VSCode and replace the firebase config object with yours from firebase.
   ```js
   const firebaseConfig = {
     apiKey: 'xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx',
     authDomain: 'xxx-xxx-xxx-xxx-xxx-xxx-xxx',
     databaseURL: 'xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx',
     projectId: 'xxx-xxx-xxx',
     storageBucket: 'xxx-xxx-xxx-xxx-xxx',
     messagingSenderId: 'xxx-xxx-xxx',
     appId: 'xxx-xxx-xxx-xxx-xxx-xxx-xxx-xxx',
     measurementId: 'xxx-xxx-xxx',
   }
   ```
3. Open new terminal and run the following commands.
   ```sh
   npm install
   npm start
   
   # You will have the option to either run it on iOS, Android or Web
   
   # Use this command on the terminal to run it on web
   npx expo install @expo/webpack-config@^19.0.0

   # If you want to run it on iOS or Android, use a phone to scan it or use a simulator
   ```
4. Choose your platform and experience the app.