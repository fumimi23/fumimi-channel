import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "~react-pages";

function App() {
  const routeContent = useRoutes(routes);

  return <>{routeContent}</>;
}

export default App;
