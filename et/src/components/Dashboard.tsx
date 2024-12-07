import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ToastMsgType, useGlobalContext } from "../context/GlobalContext";
import { apiBaseUrl } from "../common/Constants";
import axios from "axios";
import { rupee } from "../utils/icons";
import moment from "moment";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line, Pie } from "react-chartjs-2";


export default function Dashboard() {
  const svgRef = useRef(null);
  const data = [
    { date: new Date(2023, 1, 1), value: 10 },
    { date: new Date(2023, 2, 1), value: 15 },
    // ... more data points
  ];
  const [d3Data, setD3Data] = useState(data);
  const [brushSelection, setBrushSelection] = useState([null, null]);
  const { showToastMsg, setLoading } = useGlobalContext();
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [banks, setBanks] = useState([]);
  const [availableMonthsData, setAvailableMonthsData] = useState([]);
  const [currMonth, setCurrMonth] = useState('');
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [pieChartData, setPieChartData] = useState({
    labels: [],
    datasets: [
      {
        backgroundColor: [],
        data: [],
      },
    ],
  });
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  const [totalExpenseValue, setTotalExpenseValue] = useState(0);
  const [totalIncomeValue, setTotalIncomeValue] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [difference, setDifference] = useState(0);

  useEffect(() => {
    getDahsboardData();
  }, []);

  useEffect(() => {
    if (allDataLoaded) {
      processData();
    }
  }, [allDataLoaded]);

  const LineChart = ({ data }: any) => {
    Chart.register(CategoryScale);
    return <>{allDataLoaded && data && <Line data={data} />}</>;
  };

  const PieChart = ({ data }: any) => {
    Chart.register(CategoryScale);
    return <>{allDataLoaded && data && <Pie data={data} />}</>;
  };

  function getDahsboardData() {
    setLoading(true);
    axios
      .get(`${apiBaseUrl}/api/v1/dashboard-data`)
      .then((resp: any) => {
        setBanks(resp.data.banks);
        setCategories(resp.data.categories);
        setFamilyMembers(resp.data.familyMembers);
        setTransactions(resp.data.transactions);
        setAvailableMonthsData([...new Set(resp.data.transactions.map((item)=>moment(new Date(item.date)).format('MMM-YYYY')))]);
        setCurrMonth(moment(new Date()).format('MMM-YYYY'));//current month set by defualt
        setAllDataLoaded(true);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        showToastMsg(ToastMsgType.ERROR, "Server error occured !!");
      });
  }

  function processData(curr?) {
    let monthStart, monthEnd, trans;
    if(curr){
      monthStart = moment(curr, 'MMM-YYYY').startOf("month").toDate();
      monthEnd = moment(curr, 'MMM-YYYY').endOf("month").toDate();
    }else{
      monthStart = moment().startOf("month").toDate();
      monthEnd = moment().endOf("month").toDate();
    }
    trans = transactions.filter((item: any) => {
      return new Date(item.date) > monthStart && new Date(item.date) < monthEnd;
    });
    trans = trans.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    let totalInc = 0;
    let totalExp = 0;
    let totlaBal = 0;
    let cashComp = 0;
    let indirect = 0;
    console.log("TRANS", trans);

    const lcd: any = {
      labels: [],
      datasets: [
        {
          label: "Expense",
          backgroundColor: "rgb(255, 0, 0)",
          borderColor: "rgb(255, 0, 0)",
          data: [],
        },
      ],
    };

    const pcd = {
      labels: [],
      datasets: [
        {
          label: "Expense",
          backgroundColor: [],
          data: [],
        },
      ],
      option: {
        responsive: true,
        maintainAspectRatio: false
      },
    };

    trans.forEach((element) => {
      switch (element.type) {
        case "1":
          //data.datasets[0].data.push(Number(element.amount));
          totalInc += Number(element.amount);
          break;
        case "2":
          if (!element.isDirect) {
            indirect += Number(element.amount);
          } else {
            let label = moment(element.date).format("DD MMM");
            lcd.labels.push(label);
            lcd.datasets[0].data.push(Number(element.amount));
            let index = pcd.labels.indexOf(element?.categoryName);
            if (index !== -1) {
              pcd.datasets[0].data[index] += Number(element.amount);
            } else {
              pcd.labels.push(element.categoryName);
              pcd.datasets[0].data.push(Number(element.amount));
              pcd.datasets[0].backgroundColor.push(
                "#" + Math.random().toString(16).substr(-6)
              );
            }
            totalExp += Number(element.amount);
            if (element.title === "Cash") {
              cashComp += Number(element.amount);
            }
          }
          break;
      }
    });

    setLineChartData(lcd);
    setPieChartData(pcd);

    banks.forEach((element: any) => {
      totlaBal += Number(element.balance);
    });
    console.log("totalInc", totalInc);
    console.log("totalExp", totalExp);
    setTotalIncomeValue(totalInc);
    setTotalExpenseValue(totalExp);
    setTotalBalance(totlaBal);
    setDifference(cashComp - indirect);
  }

  const handleActiveMonthChange = (e: any) => {
    setCurrMonth(e.target.value);
    processData(e.target.value);
  }
  
  return (
    <HomeStyledDiv>
      <div className="firstHalf">
        {/* <div className="chart2Div elevatedDiv"></div> */}
        <div className="chartDiv elevatedDiv">
          <PieChart data={pieChartData}></PieChart>
        </div>
      </div>
      <div className="secondHalf">
        <div className="recentDiv elevatedDiv" ref={svgRef}>
          <LineChart data={lineChartData}></LineChart>
        </div>
        <div className="totalValuesDiv">
          <div className="firstRow">
            <div className="income card">
              <div className="label">
                <h4>TOTAL INCOME</h4>
              </div>
              <div className="value">
                <h1>
                  {rupee}&nbsp;{totalIncomeValue}
                </h1>
              </div>
            </div>
            <div className="card expense">
              <div className="label">
                <h4>TOTAL EXPENSE</h4>
              </div>
              <div className="value">
                <h1>
                  {rupee}&nbsp;{totalExpenseValue}
                </h1>
              </div>
            </div>
          </div>
          <div className="secondRow">
            <div className="totalDiff card">
              <div className="label">
                <h4>TOTAL DIFF.</h4>
              </div>
              <div className="value">
                <h1>
                  {rupee}&nbsp;{totalIncomeValue}
                </h1>
              </div>
            </div>
            <div className="activeMonth card">
              <div className="label">
                <h4>Active Month</h4>
              </div>
              <div className="value">
              <select  value={currMonth} onChange={handleActiveMonthChange}>
                {
                  availableMonthsData.map((name) => (
                    <option value={name}>{name}</option>
                  ))
                }
              </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeStyledDiv>
  );
}

export const HomeStyledDiv = styled.div`
  flex: 1;
  background: rgba(252, 246, 249, 0.78);
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  .firstHalf {
    flex: 1;
    display: flex;
    gap: 1rem;
    .chartDiv {
      flex: 1;
      border: 3px solid white;
      padding: 1rem;
      box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
        rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
        rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
        rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
        rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
        rgba(0, 0, 0, 0.09) 0px 32px 16px;
    }
    .chart2Div {
      flex: 1;
      border: 3px solid white;
      padding: 1rem;
    }
  }
  .secondHalf {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    .totalValuesDiv {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
      .firstRow {
        flex: 1;
        display: flex;
        gap: 1rem;
        .income {
          flex: 1;
          box-shadow: rgba(0, 128, 0, 0.17) 0px -23px 25px 0px inset,
            rgba(0, 128, 0, 0.15) 0px -36px 30px 0px inset,
            rgba(0, 128, 0, 0.1) 0px -79px 40px 0px inset,
            rgba(0, 128, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
            rgba(0, 128, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
            rgba(0, 128, 0, 0.09) 0px 32px 16px;
        }
        .expense {
          flex: 1;
          border: 3px solid white;
          border-radius: 2rem;
          box-shadow: rgba(128, 0, 0, 0.17) 0px -23px 25px 0px inset,
            rgba(128, 0, 0, 0.15) 0px -36px 30px 0px inset,
            rgba(128, 0, 0, 0.1) 0px -79px 40px 0px inset,
            rgba(128, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
            rgba(128, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
            rgba(128, 0, 0, 0.09) 0px 32px 16px;
        }
      }
      .secondRow {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 1rem;
        .activeMonth {
          flex: 1;
          box-shadow: rgba(0, 128, 0, 0.17) 0px -23px 25px 0px inset,
            rgba(0, 128, 0, 0.15) 0px -36px 30px 0px inset,
            rgba(0, 128, 0, 0.1) 0px -79px 40px 0px inset,
            rgba(0, 128, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
            rgba(0, 128, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
            rgba(0, 128, 0, 0.09) 0px 32px 16px;
        }
        .totalDiff {
          flex: 1;
          box-shadow: rgba(0, 128, 0, 0.17) 0px -23px 25px 0px inset,
            rgba(0, 128, 0, 0.15) 0px -36px 30px 0px inset,
            rgba(0, 128, 0, 0.1) 0px -79px 40px 0px inset,
            rgba(0, 128, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
            rgba(0, 128, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
            rgba(0, 128, 0, 0.09) 0px 32px 16px;
        }
      }
    }

    .recentDiv {
      flex: 1;
      border: 3px solid white;
      padding: 1rem;
      box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
        rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
        rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
        rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
        rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
        rgba(0, 0, 0, 0.09) 0px 32px 16px;
    }
  }

  .elevatedDiv {
    border-radius: 2rem;
  }
  .card {
    display: flex;
    border: 3px solid white;
    border-radius: 2rem;
    flex-direction: column;
    .label {
      flex: 1;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgba(34, 34, 96, 1);
    }
    .value {
      flex: 2;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
