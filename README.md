# ⚡ ProReact – Vite Template

![ProReact Logo](https://github.com/attendance1978-wq/vite-template-proreact/blob/main/public/image/Proreact.png)

![Node.js](https://img.shields.io/badge/node-%3E%3D18-green)
![Vite](https://img.shields.io/badge/vite-4.x-purple)
![License](https://img.shields.io/github/license/attendance1978-wq/vite-template-proreact)
![Build](https://img.shields.io/github/actions/workflow/status/attendance1978-wq/vite-template-proreact/node.js.yml)
![Version](https://img.shields.io/github/v/release/attendance1978-wq/vite-template-proreact)
![GitHub stars](https://img.shields.io/github/stars/attendance1978-wq/vite-template-proreact?style=social)

**ProReact** is a lightweight experimental JavaScript framework inspired by React, built from scratch and bundled with **Vite** for fast development and modern tooling.

This repository provides a **Vite template** to build websites and apps using **ProReact + JSX** — without React or Vanilla presets.

---

- JSX syntax
- Hooks: `useState` & `useEffect`
- Dynamic `<Head>` management (`<title>`, `<link>`, `<meta>`)
- Bootstrap and custom CSS
- Fully reactive UI components

This template makes it easy to scaffold a new project using **ProReact**, skipping Vanilla or other frameworks.

---

## 🚀 Features

- **JSX Support** – Write components like React with your own `createElement`.
- **Hooks** – `useState` and `useEffect` for state and side-effects.
- **Head Management** – Use `<Head>` component to set `<title>` and include CSS or meta tags dynamically.
- **Bootstrap + App.css** – Ready to use Bootstrap and custom styles.
- **Single Root Rendering** – All components rendered into `<div id="root"></div>`.
- **Vite Dev Server** – Fast development with hot reload.

---

## 🛠 Project Structure
```
vite-template-proreact/
├─ public/
│ └─ App.css # Custom CSS
├─ src/
│ ├─ main.jsx # Entry point
│ ├─ App.jsx # Main component
│ └─ proreact.js # ProReact framework
├─ index.html # HTML host
├─ package.json
├─ vite.config.js
└─ README.md
```
---

## ⚡ Usage

### 1. Create a new ProReact project from template

```bash
npm create vite@latest my-proreact-app -- --template yourusername/vite-template-proreact

```

### 2. Install dependencies
```
cd project name
npm install
```
### 3. Run the development server
```
npm run dev
```
Open your browser at http://localhost:5173 to see your ProReact website in action.

### 4. Build for production
```
npm run build
npm run preview
```
---

## 📝 Example Usage in App.jsx

```jsx
/** @jsx createElement */
import { createElement, useState, useEffect, Head } from "./proreact.js";

export function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Rendered with count:", count);
  }, [count]);

  return (
    <div className="container mt-5">
      <Head
        title="ProReact Website"
        links={[
          { rel: "stylesheet", href: "App.css" },
          {
            rel: "stylesheet",
            href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
          },
        ]}
      />

      <header>
        <h1>ProReact Website</h1>
      </header>

      <main>
        <p>Count: {count}</p>
        <button className="btn btn-success" onClick={() => setCount(c => c + 1)}>Increment</button>
      </main>
    </div>
  );
}
```

