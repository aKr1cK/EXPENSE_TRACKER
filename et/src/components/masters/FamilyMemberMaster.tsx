import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { apiBaseUrl } from "../../common/Constants";
import Button from "../../common/Button";
import { minus, plus, saveButton, trash, user } from "../../utils/icons";
import { ToastMsgType, useGlobalContext } from "../../context/GlobalContext";
import GeneratedIcon from "../../common/GeneratedIcon";

export default function FamilyMemberMaster() {
  const { showToastMsg, setLoading } = useGlobalContext();
  const [familyMembers, setFamilyMembers] = useState([]);
  const [showAdd, setShowAdd] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    getFamilyMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function getFamilyMembers() {
    setLoading(true);
    axios.get(`${apiBaseUrl}/api/v1/get-family-members`).then((resp: any) => {
      setFamilyMembers(resp.data);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      showToastMsg(ToastMsgType.ERROR, 'Server error occured !!');
    });
  }

  function addFamilyMember(data: any) {
    setLoading(true);
    axios.post(`${apiBaseUrl}/api/v1/add-family-member`, data).then((resp: any) => {
      showToastMsg(ToastMsgType.SUCCESS, resp.data.message);
      getFamilyMembers();
      reset();
    }).catch((error) => {
      setLoading(false);
      showToastMsg(ToastMsgType.ERROR, 'Server error occured !!');
    });
  }

  function deleteFamilyMember(data: any) {
    setLoading(true);
    axios.post(`${apiBaseUrl}/api/v1/delete-family-member`, data).then((resp: any) => {
      showToastMsg(ToastMsgType.SUCCESS, resp.data.message);
      getFamilyMembers();
      reset();
    }).catch((error) => {
      setLoading(false);
      showToastMsg(ToastMsgType.ERROR, 'Server error occured !!');
    });
  }


  return (
    <FamilyMemberMasterStyledDiv>
      <div className="showButtonDiv"><Button
        icon={showAdd ? minus : plus}
        bPad={'1rem'}
        bRad={'50%'}
        bg={'#4F46E5'}
        color={'#fff'}
        iColor={'#fff'}
        hColor={'red'}
        onClick={() => setShowAdd((state) => !state)}></Button></div>
      {showAdd && (
        <form className="form-row"
          onSubmit={handleSubmit((data) => {
            addFamilyMember(data);
          })}
        >
          <div>
            <input placeholder="First Name" {...register("firstName", { required: true })} type="input"></input>
          </div>
          <div>
            <input placeholder="Middle Name" {...register("middleName", { required: true })} type="input"></input>
          </div>
          <div>
            <input placeholder="Last Name" {...register("lastName", { required: true })} type="input"></input>
          </div>
          <div className="endButtonDiv">
            <div>
              <Button
                icon={saveButton}
                bPad={'1rem'}
                bRad={'50%'}
                bg={'#4F46E5'}
                color={'#fff'}
                iColor={'#fff'}
                hColor={'red'}></Button>
            </div>

          </div>
        </form>
      )}
      {familyMembers.map((member: any) => (
        <div className="table-row" key={member}>
          <div className="startButtonDiv">
            <span>
              <GeneratedIcon
                className={'fa-users'}
                bPad={'1rem'}
                bRad={'50%'}
                bg={'#38B606'}
                color={'#fff'}
              >
              </GeneratedIcon>
            </span>
          </div>
          <div>{member.firstName}</div>
          <div>{member.middleName}</div>
          <div>{member.lastName}</div>
          <div className="endButtonDiv">
            <div><Button
              icon={trash}
              bPad={'1rem'}
              bRad={'50%'}
              bg={'red'}
              color={'#fff'}
              iColor={'#fff'}
              hColor={'red'}
              onClick={() => deleteFamilyMember(member)}>
            </Button>
            </div>
          </div>
        </div>
      ))}
    </FamilyMemberMasterStyledDiv>
  );
}

const FamilyMemberMasterStyledDiv = styled.div`
  flex: 1;
  input{
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border-radius: 2rem;
  }
  .startButtonDiv{
    flex:1 !important;
    div{
      justify-content: flex-start !important;
    }
  }
  .endButtonDiv{
    flex:1 !important;
    div{
      justify-content: flex-end !important;
    }
  }
  .showButtonDiv{
    padding:0rem 1rem 0rem 0rem;
    display:flex;
    flex-direction:row-reverse;
  }
  .form-row{
    margin-top:8px;
    background: rgba(252, 246, 249, 0.78);
    height: 65px;
    border-radius: 35px;
    display: flex;
    padding: 0rem 1rem 0rem 1rem;
    gap: 1rem;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    background-color:#D7E0FB !important;
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
  .table-row{
    margin-top:8px;
    background: rgba(252, 246, 249, 0.78);
    height: 65px;
    border-radius: 35px;
    display: flex;
    padding: 0rem 1rem 0rem 1rem;
    gap: 1rem;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    background-color:white !important;
    div {
      flex: 2;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .startButtonDiv{
      justify-content: flex-start !important;
    }
  }
`;
