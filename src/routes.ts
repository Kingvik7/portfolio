import WorkPage from "@pages/WorkPage";
import ContactPage from "@pages/ContactPage";

const Routes = () => {
  const workPage = WorkPage;
  const contactPage = ContactPage;

  const routes = [
    {
      name: "Work",
      path: "/",
      element: workPage,
    },
    {
      name: "Me",
      path: "/me",
      element: contactPage,
    },
  ];

  return { routes };
};

export default Routes;
