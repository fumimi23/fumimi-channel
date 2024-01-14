import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "~react-pages";
import { Layout } from "./Layout";

function App() {
  const routeContent = useRoutes(routes);

  return <Layout>{routeContent}</Layout>;
}

export default App;
