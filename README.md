[RUN THE APP](https://lifetodo-my.netlify.app/)

# Lifetodo (Frontend)

Lifetodo is a personal **productivity app** that helps you organize your daily thoughts by creating notes, todo lists, and favorite songs and books lists.

## Tech Stack

### **Frontend Platform**
- React.js

### **Libraries & Tools**
- React Router
- Hamburger React
- Axios
- Sass
- Fortawesome
- React Helmet
- jQuery

## Project Structure

```
Lifetodo/
│── public/               # Static assets
│
├── src/                  # Main source folder
│   ├── components/       # Reusable UI components
│   ├── fonts/            # Custom fonts
│   ├── images/           # Static images
│   ├── middleware/       # Logic for authentication
│   ├── pages/            # Page components (routes)
│   ├── style/            # Global and component styles
│   ├── index.js          # App entry point
│   ├── store.js          # Redux store configuration
│
│── .gitignore            # Git ignored files
│── README.md             # Project documentation
│── package.json          # Project metadata & dependencies
│── package-lock.json     # Lock file for dependencies
```

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

## Running the Project

Start the development server:

```bash
npm start
```
## Deploy

The frontend is deployed on [Netlify](https://www.netlify.com/) and the environment variables are configured on the platform.

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).
