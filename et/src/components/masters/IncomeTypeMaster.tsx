import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { apiBaseUrl } from "../../common/Constants";
import Button from "../../common/Button";
import {
  allIconsJSON,
  minus,
  plus,
  saveButton,
  trash,
  user,
} from "../../utils/icons";
import { ToastMsgType, useGlobalContext } from "../../context/GlobalContext";
import GeneratedIcon from "../../common/GeneratedIcon";

export default function IncomeTypeMaster() {
  const { showToastMsg, setLoading } = useGlobalContext();
  const [incomeTypes, setIncomeTypes] = useState([]);
  const [showAdd, setShowAdd] = useState(true);
  const [selecetedIcon, setSelecetedIcon] = useState("");
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    getIncomeTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function changeIcon(e: any) {
    setSelecetedIcon(e.target.value);
  }

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

  function addIncomeType(data: any) {
    setLoading(true);
    data.type = "1";
    axios
      .post(`${apiBaseUrl}/api/v1/add-category`, data)
      .then((resp: any) => {
        showToastMsg(ToastMsgType.SUCCESS, resp.data.message);
        getIncomeTypes();
        reset();
      })
      .catch((error) => {
        setLoading(false);
        showToastMsg(ToastMsgType.ERROR, "Server error occured !!");
      });
  }

  function deleteIncomeType(data: any) {
    setLoading(true);
    axios
      .post(`${apiBaseUrl}/api/v1/delete-category`, data)
      .then((resp: any) => {
        showToastMsg(ToastMsgType.SUCCESS, resp.data.message);
        getIncomeTypes();
        reset();
      })
      .catch((error) => {
        setLoading(false);
        showToastMsg(ToastMsgType.ERROR, "Server error occured !!");
      });
  }

  return (
    <IncomeTypeMasterStyledDiv>
      <div className="showButtonDiv">
        <Button
          icon={showAdd ? minus : plus}
          bPad={"1rem"}
          bRad={"50%"}
          bg={"#4F46E5"}
          color={"#fff"}
          iColor={"#fff"}
          hColor={"red"}
          onClick={() => setShowAdd((state) => !state)}
        ></Button>
      </div>
      {showAdd && (
        <form
          className="form-row"
          onSubmit={handleSubmit((data) => {
            addIncomeType(data);
          })}
        >
          <div>
            <input
              placeholder="Name"
              {...register("name", { required: true })}
              type="input"
            ></input>
          </div>
          <div>
            <select
              {...register("icon", { required: true })}
              onChange={changeIcon}
            >
              {allIconsJSON.map(({ unicode, label }: any) => (
                <option value={unicode}>
                  <div style={{ display: "block" }}>{label}</div>
                </option>
              ))}
            </select>
          </div>
          <div>
            <span>
              <GeneratedIcon
                unicode={selecetedIcon}
                bPad={"1rem"}
                bRad={"50%"}
                bg={"#38B606"}
                color={"#fff"}
              ></GeneratedIcon>
            </span>
          </div>
          <div className="endButtonDiv">
            <div>
              <Button
                icon={saveButton}
                bPad={"1rem"}
                bRad={"50%"}
                bg={"#4F46E5"}
                color={"#fff"}
                iColor={"#fff"}
                hColor={"red"}
              ></Button>
            </div>
          </div>
        </form>
      )}
      {incomeTypes.map((member: any) => (
        // <div className="table-row" key={member}>
        //   <div className="startButtonDiv">
        //     <div>
        //       <Button
        //         icon={member.icon}
        //         bPad={"0.7rem"}
        //         bRad={"50%"}
        //         bg={"#07bc0c"}
        //         color={"#fff"}
        //         iColor={"#fff"}
        //         hColor={"red"}
        //       ></Button>
        //     </div>
        //   </div>
        //   <div>{member.name}</div>
        //   <div className="endButtonDiv">
        //     <div>
        //       <Button
        //         icon={trash}
        //         bPad={"1rem"}
        //         bRad={"50%"}
        //         bg={"red"}
        //         color={"#fff"}
        //         iColor={"#fff"}
        //         hColor={"red"}
        //         onClick={() => deleteIncomeType(member)}
        //       ></Button>
        //     </div>
        //   </div>
        // </div>
        <div className="table-row" key={member}>
          <div className="startButtonDiv">
            <span>
              <GeneratedIcon
                unicode={member.icon}
                bPad={"1rem"}
                bRad={"50%"}
                bg={"#38B606"}
                color={"#fff"}
              ></GeneratedIcon>
            </span>
          </div>
          <div>{member.name}</div>
          <div className="endButtonDiv">
            <div>
              <Button
                icon={trash}
                bPad={"1rem"}
                bRad={"50%"}
                bg={"red"}
                color={"#fff"}
                iColor={"#fff"}
                hColor={"red"}
                onClick={() => deleteIncomeType(member)}
              ></Button>
            </div>
          </div>
        </div>
      ))}
    </IncomeTypeMasterStyledDiv>
  );
}

const IncomeTypeMasterStyledDiv = styled.div`
  flex: 1;
  input,
  select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border-radius: 2rem;
  }
  .startButtonDiv {
    flex: 1 !important;
    div {
      justify-content: flex-start !important;
    }
  }
  .endButtonDiv {
    flex: 1 !important;
    div {
      justify-content: flex-end !important;
    }
  }
  .showButtonDiv {
    padding: 0rem 1rem 0rem 0rem;
    display: flex;
    flex-direction: row-reverse;
  }
  .form-row {
    margin-top: 8px;
    background: rgba(252, 246, 249, 0.78);
    height: 65px;
    border-radius: 35px;
    display: flex;
    padding: 0rem 1rem 0rem 1rem;
    gap: 1rem;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    background-color: #d7e0fb !important;
    div {
      flex: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      form {
        display: flex;
        gap: 3rem;
      }
    }
  }
  .table-row {
    margin-top: 8px;
    background: rgba(252, 246, 249, 0.78);
    height: 65px;
    border-radius: 35px;
    display: flex;
    padding: 0rem 1rem 0rem 1rem;
    gap: 1rem;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    background-color: white !important;
    div {
      flex: 2;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .startButtonDiv {
      justify-content: flex-start !important;
    }
  }
`;
