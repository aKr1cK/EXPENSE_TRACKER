import styled from "styled-components";
import avatar from "../images/avatar.png";
import { signout, dashboard, expenses, tools, income } from "../utils/icons";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/IsLoggedInSlice";
import { Provider, useDispatch } from "react-redux";
import { store } from "../store/store";

const menuItems = [
  {
    id: 1,
    title: "Dashboard",
    icon: dashboard,
    link: "/dashboard",
  },
  // {
  //   id: 2,
  //   title: "View Transactions",
  //   icon: transactions,
  //   link: "/dashboard",
  // },
  {
    id: 3,
    title: "Incomes",
    icon: income, //trend,
    link: "/incomes",
  },
  {
    id: 4,
    title: "Expenses",
    icon: expenses,
    link: "/expenses",
  },
  {
    id: 5,
    title: "Masters",
    icon: tools,
    link: "/masters",
  },
];

export function Customnavbar({ active, setActive }: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Provider store={store}>
      <NavStyled>
        <div className="user-con">
          <img src={avatar} alt="" />
          <div className="text">
            <h2>Satyajit</h2>
            <p>Your Money</p>
          </div>
        </div>
        <ul className="menu-items">
          {menuItems.map((item: any) => {
            return (
              <li
                key={item.id}
                onClick={() => setActive(item.id)}
                className={active === item.id ? "active" : ""}
              >
                {item.icon}
                <span>{item.title}</span>
              </li>
            );
          })}
        </ul>
        <div className="bottom-nav">
          <li
            onClick={() => {
              dispatch(logoutUser());
              navigate("/login");
            }}
          >
            {signout} Sign Out
          </li>
        </div>
      </NavStyled>
    </Provider>
  );
}

const NavStyled = styled.nav`
  width: 300px;
  height: 100%;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
    rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
    rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px,
    rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px,
    rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
  .user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
    padding: 1rem;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }
    h2 {
      color: rgba(34, 34, 96, 1);
    }
    p {
      color: rgba(34, 34, 96, 0.6);
    }
  }

  .menu-items {
    flex: 4;
    display: flex;
    flex-direction: column;
    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 0.6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      color: rgba(34, 34, 96, 0.6);
      padding-left: 1rem;
      position: relative;
      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.4rem;
        transition: all 0.4s ease-in-out;
      }
    }
  }

  .active {
    color: rgba(34, 34, 96, 1) !important;
    i {
      color: rgba(34, 34, 96, 1) !important;
    }
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
    }
  }

  .bottom-nav {
    flex: 1;
    padding-left: 40px;
    cursor: pointer;
  }
`;
