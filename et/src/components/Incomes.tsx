import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import { ToastMsgType, useGlobalContext } from "../context/GlobalContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "../common/Constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../common/Button";
import { plus, trash } from "../utils/icons";
import moment from "moment";
import GeneratedIcon from "../common/GeneratedIcon";

export default function Incomes() {
  const { showToastMsg, setLoading } = useGlobalContext();
  const [incomeTypes, setIncomeTypes] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [banks, setBanks] = useState([]);

  const [arrowActive, setArrowActive] = useState(true);
  const { control, register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      category: "",
      title: "",
      type: "1",
      amount: "",
      subcategory: "",
      date: new Date(),
      bank: "",
      transactionBy: "",
      transactionFor: "",
      description: "",
    },
  });

  useEffect(() => {
    getIncomeTypes();
    getIncomeList();
    getFamilyMembers();
    getBanks();
    setValue("date", new Date());
  }, []);

  function getIncomeTypes() {
    setLoading(true);
    axios
      .get(`${apiBaseUrl}/api/v1/get-incomeTypes`)
      .then((resp: any) => {
        setIncomeTypes(resp.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        showToastMsg(ToastMsgType.ERROR, "Server error occured !!");
      });
  }

  function getIncomeList() {
    setLoading(true);
    axios
      .post(`${apiBaseUrl}/api/v1/get-transactions`, { type: "1" })
      .then((resp: any) => {
        setIncomeList(resp.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        showToastMsg(ToastMsgType.ERROR, "Server error occured !!");
      });
  }

  function getFamilyMembers() {
    setLoading(true);
    axios
      .get(`${apiBaseUrl}/api/v1/get-family-members`)
      .then((resp: any) => {
        setFamilyMembers(resp.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        showToastMsg(ToastMsgType.ERROR, "Server error occured !!");
      });
  }

  function getBanks() {
    setLoading(true);
    axios
      .get(`${apiBaseUrl}/api/v1/get-banks`)
      .then((resp: any) => {
        setBanks(resp.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        showToastMsg(ToastMsgType.ERROR, "Server error occured !!");
      });
  }

  function onSubmit(data: any) {
    console.log(data);
    data.isDirect = true;
    data.type = "1";
    axios
      .post(`${apiBaseUrl}/api/v1/add-transaction`, data)
      .then((resp: any) => {
        getIncomeList();
        reset();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        showToastMsg(ToastMsgType.ERROR, "Server error occured !!");
      });
  }

  function deleteIncome(data: any) {
    setLoading(true);
    axios
      .post(`${apiBaseUrl}/api/v1/delete-transaction`, data)
      .then((resp: any) => {
        showToastMsg(ToastMsgType.SUCCESS, resp.data.message);
        setIncomeList([
          ...incomeList.filter((item: any) => item._id !== data._id),
        ]);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        showToastMsg(ToastMsgType.ERROR, "Server error occured !!");
      });
  }

  function onChange(e: any) {
    let a: any = incomeTypes.filter(
      (item: any) => item._id == e.target.value
    )[0];
    setValue("title", a.name);
  }

  function toggleAddIncome() {
    if (arrowActive) {
    } else {
    }
    setArrowActive(!arrowActive);
  }

  function IncomeItem({ item }) {
    return (
      <IncomeItemStyledDiv>
        <div className="containerDiv">
          <div style={{ width: "55px" }}>
            <span>
              <GeneratedIcon
                unicode={item.category}
                bPad={"1rem"}
                bRad={"50%"}
                bg={"#38B606"}
                color={"#fff"}
                iconBg={"transparent"}
              ></GeneratedIcon>
            </span>
          </div>
          <div style={{ flex: 2 }}>{item.title}</div>
          <div style={{ flex: 1 }}>{item.amount}</div>
          <div style={{ width: "90px" }}>
            {moment(item.date).format("DD-MM-YYYY")}
          </div>
          <div style={{ flex: 2 }}>{item.transactionBy}</div>
          <div
            onClick={() => {
              deleteIncome(item);
            }}
            style={{ width: "55px" }}
          >
            <GeneratedIcon
              iconBg={"transparent"}
              className={"fa-trash"}
              bPad={"1rem"}
              bRad={"50%"}
              bg={"#E52C2E"}
              color={"#fff"}
            ></GeneratedIcon>
          </div>
        </div>
      </IncomeItemStyledDiv>
    );
  }

  return (
    <IncomeStyledDiv>
      <div
        style={{ display: arrowActive ? "flex" : "none" }}
        className="formDiv"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <select
              aria-placeholder="Income Type"
              {...register("category", {
                required: true,
                onChange(event) {
                  onChange(event);
                },
              })}
            >
              <option value="">
                <div style={{ display: "block" }}>
                  Please select income type
                </div>
              </option>
              {incomeTypes.map(({ name, _id }: any) => (
                <option key={_id} value={_id}>
                  <div style={{ display: "block" }}>{name}</div>
                </option>
              ))}
            </select>
          </div>
          <div>
            <input
              placeholder="Title"
              {...register("title", { required: true })}
              type="input"
            ></input>
          </div>
          <div>
            <input
              placeholder="Amount"
              {...register("amount", { required: true })}
              type="input"
            ></input>
          </div>
          <div className="datePickerDiv">
            <Controller
              control={control}
              name="date"
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  placeholderText="Select date"
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                />
              )}
            />
          </div>

          <div>
            <select
              aria-placeholder="Income By"
              {...register("transactionBy", { required: true })}
            >
              <option value="">
                <div style={{ display: "block" }}>
                  Please select tarnsaction By
                </div>
              </option>
              {familyMembers.map(({ firstName, lastName, _id }: any) => (
                <option key={_id} value={_id}>
                  <div style={{ display: "block" }}>
                    {firstName}&nbsp;{lastName}
                  </div>
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              aria-placeholder="BANK"
              {...register("bank", { required: true })}
            >
              <option value="">
                <div style={{ display: "block" }}>Bank</div>
              </option>
              {banks.map(({ name, _id }: any) => (
                <option key={_id} value={_id}>
                  <div style={{ display: "block" }}>{name}</div>
                </option>
              ))}
            </select>
          </div>
          <div>
            <input
              placeholder="transactionFor"
              {...register("transactionFor")}
              type="input"
            ></input>
          </div>
          <div>
            <Button
              name="ADD INCOME"
              icon={plus}
              bPad={"8px 16px"}
              bRad={"25px"}
              bg={"#4F46E5"}
              color={"#fff"}
              iColor={"#fff"}
              hColor={"red"}
            ></Button>
          </div>
        </form>
      </div>
      <div className="tableDiv">
        <div className="drawerButton">
          <div
            onClick={() => {
              toggleAddIncome();
            }}
            className={`arrow-` + (arrowActive ? "left" : "right")}
          ></div>
        </div>
        {incomeList.map((item: any) => (
          <IncomeItem key={item} item={item}></IncomeItem>
        ))}
      </div>
    </IncomeStyledDiv>
  );
}

const IncomeStyledDiv = styled.div`
  flex: 1;
  display: flex;
  height: inherit;
  background: rgba(252, 246, 249, 0.78);
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  form {
    display: flex;
    flex-direction: column;
    gap: 8px;
    border: 3px solid white;
    padding: 1rem;
    border-radius: 32px;
  }
  input,
  select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border-radius: 2rem;
  }
  .formDiv {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .tableDiv {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border: 3px solid white;
    border-radius: 35px;
    overflow-y: auto;
    .drawerButton {
      position: absolute;
      top: 50%;
      .arrow-left {
        width: 10px;
        height: 10px;
        border: 2px solid #333;
        border-left: 0;
        border-top: 0;
        transform: rotate(135deg);
      }
      .arrow-right {
        width: 10px;
        height: 10px;
        border: 2px solid #333;
        border-left: 0;
        border-top: 0;
        transform: rotate(315deg);
      }
    }
  }

  .datePickerDiv {
    display: flex;
    div {
      flex: 1 !important;
    }
  }
`;

const IncomeItemStyledDiv = styled.div`
  display: flex;
  align-items: center;
  background: white;
  height: 48px;
  border-radius: 35px;
  padding: 10px;
  //box-shadow: rgba(0, 128, 0, 0.35) 0px 5px 15px;
  box-shadow: rgba(0, 128, 0, 0.17) 0px -23px 25px 0px inset,
    rgba(0, 128, 0, 0.15) 0px -36px 30px 0px inset,
    rgba(0, 128, 0, 0.1) 0px -79px 40px 0px inset,
    rgba(0, 128, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
    rgba(0, 128, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
    rgba(0, 128, 0, 0.09) 0px 32px 16px;
  .containerDiv {
    display: flex;
    flex: 1;
    align-items: center;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
