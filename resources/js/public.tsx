import { createInertiaApp } from "@inertiajs/react";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import App from "../../src/App";
import "../../src/index.css";

const pages: Record<string, React.ComponentType<any>> = {
  "Public/App": App,
};

createInertiaApp({
  resolve: (name) => pages[name] ?? App,
  setup({ el, App: InertiaApp, props }) {
    createRoot(el).render(createElement(InertiaApp, props));
  },
});
