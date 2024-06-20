import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import styled from "styled-components";
import bg from "./images/bg.png";
import Dashboard from "./components/Dashboard";
import Expenses from "./components/Expenses";
import Incomes from "./components/Incomes";
import Masters from "./components/Masters";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <Provider store={store}>
      <AppStyledDiv>
        <BrowserRouter>
          <Routes>
            <Route
              path="home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            >
              <Route index path="expenses" element={<Expenses />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="incomes" element={<Incomes />} />
              <Route path="masters" element={<Masters />} />
              <Route path="**" element={<Dashboard />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AppStyledDiv>
    </Provider>
  );
}

const AppStyledDiv = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(${bg});
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
