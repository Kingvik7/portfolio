import "./App.css";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import RoutesConfig from "./routes";
import DefaultLayout from "@layouts/DefaultLayout";

function App() {
  const { routes } = RoutesConfig();

  return (
    <Wrapper>
      <Routes>
        <Route element={<DefaultLayout />}>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                element={<route.element />}
              />
            );
          })}
        </Route>
      </Routes>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: radial-gradient(circle, #ffffff18 0.5px, transparent 0.5px);
  background-size: 18px 18px;
  background-position: center center;
`;
