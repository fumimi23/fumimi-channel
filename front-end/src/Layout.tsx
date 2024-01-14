import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout(props: LayoutProps): React.ReactElement {
  return <>{props.children}</>;
}
