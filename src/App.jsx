import React from "react";
import HomePage from "./pages/home-page";

/**
 * The root component intentionally stays as small as possible.
 * Doing so keeps routing or providers easy to reason about because
 * every other concern is delegated to feature-level modules.
 */
export const App = () => {
  return <HomePage />;
};

export default App;