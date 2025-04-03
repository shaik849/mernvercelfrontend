import { createBrowserRouter, createHashRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Posts from "./pages/Posts";
import NotFound from "./pages/NotFound";
import PostDetails from "./pages/PostDetails";
// import Posts from "./pages/Posts";
// import PostDetails from "./pages/PostDetails";
// import NotFound from "./pages/NotFound";

const router = createHashRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { path: "", Component: Home }, // Default route
        { path: "profile", Component: Profile },
        { path: "posts", Component: Posts },
        { path: "post/:id", Component: PostDetails },
        { path: "*", Component: NotFound },
      ],
    },
  ]);

export default router;
