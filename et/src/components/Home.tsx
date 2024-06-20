import {
  BrowserRouter,
  Link,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./Dashboard";
import Expenses from "./Expenses";
import { Customnavbar } from "./Customnavbar";
import { useState } from "react";
import styled from "styled-components";

export function Home() {
  const navigate = useNavigate();
  const [active, setActive] = useState(1);
  function setActivePage(id: any) {
    setActive(id);
    switch (id) {
      case 1:
        navigate("/home/dashboard");
        break;
      case 3:
        navigate("/home/incomes");
        break;
      case 4:
        navigate("/home/expenses");
        break;
      case 5:
        navigate("/home/masters");
        break;
    }
  }
  return (
    <HomeStyledDiv>
      <NavbarStyledDiv>
        <Customnavbar setActive={setActivePage} active={active}></Customnavbar>
      </NavbarStyledDiv>
      <OutletStyledDiv>
        <Outlet></Outlet>
      </OutletStyledDiv>
    </HomeStyledDiv>
  );
}

const HomeStyledDiv = styled.div`
    flex: 1;
    display: flex;
    height: inherit;
  `;

const OutletStyledDiv = styled.div`
    display: flex;
    flex: 5;
    height: 100%;
  `;

const NavbarStyledDiv = styled.div`
    flex: 1;
    padding: 1rem;
  `;
