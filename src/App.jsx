/** @jsx createElement */
import { createElement, useState, useEffect, Head } from "./proreact.js";

export function App() {
  wipFiber = { hooks: [] };
  hookIndex = 0;

  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("App rendered! Count:", count);
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
        metas={[{ charset: "UTF-8" }]}
      />

      <header className="mb-4">
        <h1 className="text-primary">ProReact Website</h1>
        <p>Website built with ProReact + Vite Template</p>
      </header>

      <main>
        <section className="card p-3 mb-3">
          <h2>Counter Example</h2>
          <p>Count: {count}</p>
          <button className="btn btn-success" onClick={() => setCount((c) => c + 1)}>
            Increment
          </button>
        </section>

        <section className="card p-3">
          <h2>Bootstrap Section</h2>
          <button className="btn btn-danger">Click Me</button>
        </section>
      </main>

      <footer className="mt-4">
        <p>© 2026 ProReact</p>
      </footer>
    </div>
  );
}
