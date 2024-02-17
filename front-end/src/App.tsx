import "./App.css";
import { useRoutes } from "react-router-dom";
import { Layout } from "./Layout";
import routes from "~react-pages";

function App() {
  const routeContent = useRoutes(routes);

  return <Layout>{routeContent}</Layout>;
}

export default App;
