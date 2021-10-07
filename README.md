# DefHack clone

[DefHack clone app](https://def-hacks-clone.web.app/)

![Demo](/demo.gif)

## Overview

This is another version of the app that is intended to be used by DefHack that I built. Features includes:

- Authentication
- View instruction that can include video and code block
- Quiz practice
- Progress tracker
- Quick navigation to last location user left off

## Technologies used

Here are the primary technologies used in this project (in no particular order)

- React: for the UI
- Material-UI: for styling
- React Context: React built-in state management
- Firebase: database, authentication and hosting
- react-route: handling routing

## How to start

[How to deploy a React app to Firebase Hosting](https://www.youtube.com/watch?v=gMZaKtTPFqs)

- Install Firebase CLI

  ```bash
  npm install -g firebase-tools
  ```

- Sign in to your Firebase account

  ```bash
  firebase login
  ```

- Make sure you have a project already created on Firebase

- Initiate the project

  ```bash
  firebase init
  ```

  Make sure to select hosting option and maybe emulator for local development. For hosting setup, make sure to choose the `build` directory since it's the place where our project will be compiled into

- Build the project

  ```bash
  npm run build
  ```

- Deploy it

  ```bash
  firebase deploy
  ```
