import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import { Navigate, Router, useNavigate } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn, loginUser } from "../store/IsLoggedInSlice";
import { store } from "../store/store";

export function Login() {
  useEffect(() => { }, []);
  const [error, setError] = useState("");
  const [inputState, setInputState] = useState({
    userId: "",
    password: "",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { userId, password } = inputState;

  const handleInput = (name: any) => (e: any) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    //addExpense(inputState)

    if (inputState.userId === "Satya") {
      setInputState({
        userId: "",
        password: "",
      });
      dispatch(loginUser());
      navigate("/home/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  // useSelector((state: any) => {
  //   debugger;
  //   let isLogin = state.isLoggedIn;
  //   if (isLogin) {
  //     navigate("/home/dashboard");
  //   }
  // });

  return (
    <Provider store={store}>
      <LoginStyledDiv>
        <h4>Login</h4>
        <form onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}
          <div className="input-control">
            <input
              type="text"
              value={userId}
              name={"userId"}
              placeholder="User Id"
              onChange={handleInput("userId")}
            />
          </div>
          <div className="input-control">
            <input
              value={password}
              type="password"
              name={"password"}
              placeholder={"Password"}
              onChange={handleInput("password")}
            />
          </div>
          <div className="submit-btn">
            <Button
              name={"Sign In"}
              bPad={".8rem 1.6rem"}
              bRad={"30px"}
              bg={"red"}
              color={"#fff"}
            />
          </div>
        </form>
      </LoginStyledDiv>
    </Provider>
  );
}

const LoginStyledDiv = styled.div`
  height: 240px;
  width: 390px;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  overflow-x: hidden;
  padding: 30px;
  &::-webkit-scrollbar {
    width: 0;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 0rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }
  .input-control {
    input {
      width: 100%;
    }
  }

  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }
  .error {
    position: absolute;
    top: 12px;
    color: red;
  }
`;
