# Web-UI: Audio-Visual Emotion Recognition System

This repository contains the **Web-UI** component for the Audio-Visual Emotion Recognition System. It is built using **React**, **TypeScript**, and **Vite**, providing a fast and modern development environment. The Web-UI serves as the frontend interface for interacting with the system.

## UML Diagrams

### 1. Class Diagram (High-Level System)
![Class Diagram](./src/assets/Class%20Diagram%20(High-Level%20System)%20.png)

### 2. Deployment Diagram for Emotion Recognition
![Deployment Diagram](./src/assets/Deployment%20Diagram%20for%20Emotion%20Recognition.png)

### 3. Sequence Diagram (Emotion Detection Flow)
![Sequence Diagram](./src/assets/Sequence%20Diagram%20(Emotion%20Detection%20Flow)%20.png)

---

## Features

- **React + TypeScript**: Ensures type safety and modular development.
- **Vite**: Provides a fast build system with Hot Module Replacement (HMR).
- **ESLint Integration**: Includes linting rules for maintaining code quality.
- **Audio-Visual Emotion Analysis**: A user-friendly interface to interact with the backend emotion recognition system.

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**

---

## Getting Started

Follow these steps to set up and run the project locally:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Audio-Visual-Emotion-Recognition-System/Web-UI.git
   cd Web-UI
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

---

## Project Structure

```
Web-UI/
├── src/                  # Source code
│   ├── components/       # React components
│   ├── pages/            # Application pages
│   ├── assets/           # Static assets (images, styles, etc.)
│   └── App.tsx           # Main application file
├── public/               # Public files served directly
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration file
```

---

## ESLint Configuration

This project includes ESLint for code linting. To expand the configuration for production:

1. **Update `parserOptions`** in the ESLint configuration:
   ```javascript
   parserOptions: {
     project: ['./tsconfig.node.json', './tsconfig.app.json'],
     tsconfigRootDir: import.meta.dirname,
   }
   ```

2. **Replace `tseslint.configs.recommended` with stricter rules:**
   - `tseslint.configs.recommendedTypeChecked`
   - `tseslint.configs.strictTypeChecked`

3. **Optionally add stylistic rules:**
   - `...tseslint.configs.stylisticTypeChecked`

4. **Install and configure `eslint-plugin-react`:**
   ```javascript
   import react from 'eslint-plugin-react';
   export default tseslint.config({
     settings: { react: { version: '18.3' } },
     plugins: { react },
     rules: {
       ...react.configs.recommended.rules,
       ...react.configs['jsx-runtime'].rules,
     },
   });
   ```

---

## Scripts

The following scripts are available in `package.json`:

- `dev`: Start the development server.
- `build`: Build the project for production.
- `lint`: Run ESLint to check code quality.

---

## Contribution Guidelines

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with clear messages.
4. Submit a pull request.

---

## License

This project is licensed under the MIT License.
