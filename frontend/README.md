# Overview of Hythrmia - Frontend
This is the frontend that has all the UI elements of hythrmia, ensure integration with the backend were all the tools and logic were executed using the backend API. Here we are using TypeScript and React, with Vite as the build tool. 

Used this stack for learning purposes. I think would be better if we used JavaScript but for now, will continue since its not a big difference.

>[!IMPORTANT]
>Ensure backend server started before running the frontend.

>[!NOTE]
Please ensure you update the ip address assigned in the `.env.development.local` file and use your private local ip address. The port number used is the backend port number.
```bash
VITE_API_BASE=http://192.168.1.3:3000
```
To find the current local ip address, we can use the following command `ifconfig | grep inet` this can be done in either macOS or linux systems.

### Prerequisites
We will need to have node.js with npm installed. [Node.JS](https://nodejs.org/en) this will ensure npm as well installed.


### Clone the repository and run frontend

```bash
git clone git@github.com:Hythrmia/frontend.git
```

Once you are in that directory `frontend/` then you can execute the following commands to run the application


First we will install all prerequisites libraries.
```bash
npm install
```

Next we will start the frontend server using vite.
```bash
npm run dev
```

You can view `package.json` and browse through all the libraries that we used.

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
