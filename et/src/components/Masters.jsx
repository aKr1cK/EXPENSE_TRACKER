import styled from "styled-components";
import { useState } from "react";
import FamilyMemberMaster from "./masters/FamilyMemberMaster";
import ExpenseTypeMaster from "./masters/ExpenseTypeMaster";
import { bank, expenses, income, user } from "../utils/icons";
import IncomeTypeMaster from "./masters/IncomeTypeMaster";
import BankMaster from "./masters/BankMaster";

export default function Masters() {
  const [active, setActive] = useState(1);
  return (
    <MasterStyleDiv>
      <div className="nav">
        <div
          onClick={() => setActive(1)}
          className={active === 1 ? "active" : ""}
        >
          {expenses}&nbsp;Expense Types
        </div>
        <div
          onClick={() => setActive(2)}
          className={active === 2 ? "active" : ""}
        >
          {income}&nbsp;Income Types
        </div>
        <div
          onClick={() => setActive(3)}
          className={active === 3 ? "active" : ""}
        >
          {user}&nbsp;Family Members
        </div>
        <div
          onClick={() => setActive(4)}
          className={active === 4 ? "active" : ""}
        >
          {bank}&nbsp;Bank
        </div>
      </div>
      <div className="master-container">
        {active === 1 && <ExpenseTypeMaster></ExpenseTypeMaster>}
        {active === 2 && <IncomeTypeMaster></IncomeTypeMaster>}
        {active === 3 && <FamilyMemberMaster></FamilyMemberMaster>}
        {active === 4 && <BankMaster></BankMaster>}
      </div>
    </MasterStyleDiv>
  );
}

const MasterStyleDiv = styled.div`
  flex: 1;
  display: flex;
  height: inherit;
  background: rgba(252, 246, 249, 0.78);
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  .nav {
    display: flex;
    height: 4rem;
    gap: 1rem;
    div {
      flex: 1;
      background: rgba(252, 246, 249, 0.78);
      border: 2px solid #222260;
      border-radius: 32px;
      gap: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 500;
      cursor: pointer;
    }

    .active {
      background: #222260;
      color: white;
    }
  }
  .master-container {
    padding: 1rem;
    overflow-y: auto;
    flex: 1;
    display: flex;
    .row {
      background: rgba(252, 246, 249, 0.78);
      height: 65px;
      border-radius: 35px;
      display: flex;
      div {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;
