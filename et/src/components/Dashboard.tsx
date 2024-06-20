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
        setAllDataLoaded(true);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        showToastMsg(ToastMsgType.ERROR, "Server error occured !!");
      });
    // let resp = {
    //   data: {
    //     banks: [
    //       {
    //         _id: "666af6574b6d6ea52807093a",
    //         name: "HDFC",
    //         balance: 286857,
    //         __v: 0,
    //       },
    //       {
    //         _id: "666b21b418891761e6112be7",
    //         name: "SBI",
    //         balance: 14996,
    //         __v: 0,
    //       },
    //     ],
    //     categories: [
    //       {
    //         _id: "666b1f3e18891761e6112bae",
    //         name: "Salary",
    //         icon: "f0d6",
    //         type: "1",
    //         __v: 0,
    //       },
    //       {
    //         _id: "666b1f6618891761e6112bb2",
    //         name: "Bike",
    //         icon: "f21c",
    //         type: "2",
    //         __v: 0,
    //       },
    //       {
    //         _id: "666b213f18891761e6112bc8",
    //         name: "Freelance",
    //         icon: "f571",
    //         type: "1",
    //         __v: 0,
    //       },
    //       {
    //         _id: "666b216d18891761e6112bcc",
    //         name: "FLAT EMI",
    //         icon: "e50d",
    //         type: "2",
    //         __v: 0,
    //       },
    //       {
    //         _id: "666b23b3a95938a351a50a82",
    //         name: "Groceries",
    //         icon: "f07a",
    //         type: "2",
    //         __v: 0,
    //       },
    //       {
    //         _id: "666d0b5695d0156c66c5cce7",
    //         name: "Traveling",
    //         icon: "f1b9",
    //         type: "2",
    //         __v: 0,
    //       },
    //       {
    //         _id: "666d0bc795d0156c66c5ccea",
    //         name: "Home Misc",
    //         icon: "e51a",
    //         type: "2",
    //         __v: 0,
    //       },
    //       {
    //         _id: "666d0c7b95d0156c66c5cced",
    //         name: "Electricity Bill",
    //         icon: "f1e6",
    //         type: "2",
    //         __v: 0,
    //       },
    //       {
    //         _id: "666d0c9695d0156c66c5ccf0",
    //         name: "Rent",
    //         icon: "f4de",
    //         type: "2",
    //         __v: 0,
    //       },
    //       {
    //         _id: "666d0cc595d0156c66c5ccf3",
    //         name: "Baby",
    //         icon: "f77d",
    //         type: "2",
    //         __v: 0,
    //       },
    //       {
    //         _id: "666d0e1895d0156c66c5ccf6",
    //         name: "Clothing",
    //         icon: "f756",
    //         type: "2",
    //         __v: 0,
    //       },
    //       {
    //         _id: "666d117b95d0156c66c5ccfd",
    //         name: "Hospital",
    //         icon: "f469",
    //         type: "2",
    //         __v: 0,
    //       },
    //       {
    //         _id: "666d14e795d0156c66c5cd00",
    //         name: "Cash",
    //         icon: "e1bc",
    //         type: "2",
    //         __v: 0,
    //       },
    //       {
    //         _id: "666d158195d0156c66c5cd03",
    //         name: "Investment",
    //         icon: "f53d",
    //         type: "2",
    //         __v: 0,
    //       },
    //       {
    //         _id: "666d166495d0156c66c5cd06",
    //         name: "Hoteling",
    //         icon: "f594",
    //         type: "2",
    //         __v: 0,
    //       },
    //       {
    //         _id: "666d1c6c95d0156c66c5cd7b",
    //         name: "Mobile",
    //         icon: "f3cd",
    //         type: "2",
    //         __v: 0,
    //       },
    //       {
    //         _id: "666d1d1c95d0156c66c5cd8d",
    //         name: "Shopping",
    //         icon: "f218",
    //         type: "2",
    //         __v: 0,
    //       },
    //     ],
    //     familyMembers: [
    //       {
    //         _id: "6660698d157e5f9c466a5c69",
    //         firstName: "Satyajit",
    //         middleName: "Subhash",
    //         lastName: "Toradmal",
    //         icon: "",
    //       },
    //       {
    //         _id: "666b2257a95938a351a50a77",
    //         firstName: "Alka",
    //         middleName: "Subhash",
    //         lastName: "Toradmal",
    //         icon: "",
    //         __v: 0,
    //       },
    //       {
    //         _id: "666b2266a95938a351a50a7a",
    //         firstName: "Swapnali",
    //         middleName: "Subhash",
    //         lastName: "Toradmal",
    //         icon: "",
    //         __v: 0,
    //       },
    //       {
    //         _id: "666b2272a95938a351a50a7d",
    //         firstName: "Sayali",
    //         middleName: "Satyajit",
    //         lastName: "Toradmal",
    //         icon: "",
    //         __v: 0,
    //       },
    //     ],
    //     transactions: [
    //       {
    //         _id: "666d0a2095d0156c66c5ccdd",
    //         title: "Salary",
    //         amount: 153772,
    //         type: "1",
    //         date: "2024-06-01T03:26:42.000Z",
    //         isDirect: true,
    //         bank: "HDFC",
    //         category: "f0d6",
    //         categoryName: "Salary",
    //         transactionBy: "Satyajit",
    //       },
    //       {
    //         _id: "666d179c95d0156c66c5cd11",
    //         title: "Traveling",
    //         amount: 4100,
    //         type: "2",
    //         date: "2024-06-01T04:22:16.000Z",
    //         isDirect: true,
    //         bank: "HDFC",
    //         category: "f1b9",
    //         categoryName: "Traveling",
    //         transactionBy: "Satyajit",
    //       },
    //       {
    //         _id: "666d17d195d0156c66c5cd16",
    //         title: "Hoteling",
    //         amount: 760,
    //         type: "2",
    //         date: "2024-06-01T04:22:16.000Z",
    //         isDirect: true,
    //         bank: "HDFC",
    //         category: "f594",
    //         categoryName: "Hoteling",
    //         transactionBy: "Satyajit",
    //       },
    //       {
    //         _id: "666d180b95d0156c66c5cd1b",
    //         title: "Water",
    //         amount: 20,
    //         type: "2",
    //         date: "2024-06-03T04:22:16.869Z",
    //         isDirect: true,
    //         bank: "HDFC",
    //         category: "e51a",
    //         categoryName: "Home Misc",
    //         transactionBy: "Satyajit",
    //       },
    //       {
    //         _id: "666d189795d0156c66c5cd20",
    //         title: "Electricity Bill",
    //         amount: 350,
    //         type: "2",
    //         date: "2024-06-04T04:22:16.000Z",
    //         isDirect: true,
    //         bank: "HDFC",
    //         category: "f1e6",
    //         categoryName: "Electricity Bill",
    //         transactionBy: "Satyajit",
    //       },
    //       {
    //         _id: "666d18d795d0156c66c5cd25",
    //         title: "Petrol",
    //         amount: 100,
    //         type: "2",
    //         date: "2024-06-04T04:22:16.000Z",
    //         isDirect: true,
    //         bank: "HDFC",
    //         category: "f21c",
    //         categoryName: "Bike",
    //         transactionBy: "Satyajit",
    //       },
    //       {
    //         _id: "666d192095d0156c66c5cd2a",
    //         title: "Cash",
    //         amount: 20000,
    //         type: "2",
    //         date: "2024-06-05T04:22:16.869Z",
    //         isDirect: true,
    //         bank: "HDFC",
    //         category: "e1bc",
    //         categoryName: "Cash",
    //         transactionBy: "Alka",
    //       },
    //       {
    //         _id: "666d196395d0156c66c5cd2f",
    //         title: "Home Misc",
    //         amount: 50,
    //         type: "2",
    //         date: "2024-06-05T04:22:16.869Z",
    //         isDirect: true,
    //         bank: "HDFC",
    //         category: "e51a",
    //         categoryName: "Home Misc",
    //         transactionBy: "Alka",
    //       },
    //       {
    //         _id: "666d19dd95d0156c66c5cd34",
    //         title: "FLAT EMI",
    //         amount: 42708,
    //         type: "2",
    //         date: "2024-06-05T04:22:16.000Z",
    //         isDirect: true,
    //         bank: "HDFC",
    //         category: "e50d",
    //         categoryName: "FLAT EMI",
    //         transactionBy: "Satyajit",
    //       },
    //       {
    //         _id: "666d1af595d0156c66c5cd61",
    //         title: "Servicing",
    //         amount: 660,
    //         type: "2",
    //         date: "2024-06-05T04:37:48.000Z",
    //         isDirect: true,
    //         bank: "HDFC",
    //         category: "f21c",
    //         categoryName: "Bike",
    //         transactionBy: "Satyajit",
    //       },
    //       {
    //         _id: "666d1b3d95d0156c66c5cd66",
    //         title: "Petrol",
    //         amount: 100,
    //         type: "2",
    //         date: "2024-06-06T04:37:48.000Z",
    //         isDirect: true,
    //         bank: "HDFC",
    //         category: "f21c",
    //         categoryName: "Bike",
    //         transactionBy: "Satyajit",
    //       },
    //       {
    //         _id: "666d1b6d95d0156c66c5cd6b",
    //         title: "Water",
    //         amount: 20,
    //         type: "2",
    //         date: "2024-06-07T04:37:48.000Z",
    //         isDirect: true,
    //         bank: "HDFC",
    //         category: "e51a",
    //         categoryName: "Home Misc",
    //         transactionBy: "Alka",
    //       },
    //       {
    //         _id: "666d1bf195d0156c66c5cd70",
    //         title: "Baby",
    //         amount: 1000,
    //         type: "2",
    //         date: "2024-06-07T04:37:48.000Z",
    //         isDirect: true,
    //         bank: "HDFC",
    //         category: "f77d",
    //         categoryName: "Baby",
    //         transactionBy: "Sayali",
    //       },
    //       {
    //         _id: "666d1c3b95d0156c66c5cd75",
    //         title: "Medicines",
    //         amount: 4000,
    //         type: "2",
    //         date: "2024-06-07T04:37:48.000Z",
    //         isDirect: true,
    //         bank: "HDFC",
    //         category: "f469",
    //         categoryName: "Hospital",
    //         transactionBy: "Alka",
    //       },
    //       {
    //         _id: "666d1c9595d0156c66c5cd82",
    //         title: "Recharge",
    //         amount: 259,
    //         type: "2",
    //         date: "2024-06-08T04:45:37.000Z",
    //         isDirect: true,
    //         bank: "HDFC",
    //         category: "f3cd",
    //         categoryName: "Mobile",
    //         transactionBy: "Satyajit",
    //       },
    //       {
    //         _id: "666d1cc795d0156c66c5cd87",
    //         title: "Baby",
    //         amount: 1000,
    //         type: "2",
    //         date: "2024-06-08T04:45:37.000Z",
    //         isDirect: true,
    //         bank: "HDFC",
    //         category: "f77d",
    //         categoryName: "Baby",
    //         transactionBy: "Sayali",
    //       },
    //       {
    //         _id: "666d1d5a95d0156c66c5cd94",
    //         title: "Gold",
    //         amount: 27000,
    //         type: "2",
    //         date: "2024-06-09T04:48:43.000Z",
    //         isDirect: true,
    //         bank: "HDFC",
    //         category: "f218",
    //         categoryName: "Shopping",
    //         transactionBy: "Alka",
    //       },
    //       {
    //         _id: "666d1d8f95d0156c66c5cd99",
    //         title: "Petrol",
    //         amount: 200,
    //         type: "2",
    //         date: "2024-06-10T04:48:43.000Z",
    //         isDirect: true,
    //         bank: "HDFC",
    //         category: "f21c",
    //         categoryName: "Bike",
    //         transactionBy: "Satyajit",
    //       },
    //       {
    //         _id: "666d1fc695d0156c66c5cd9e",
    //         title: "Baby",
    //         amount: 1000,
    //         type: "2",
    //         date: "2024-06-12T04:48:43.000Z",
    //         isDirect: true,
    //         bank: "HDFC",
    //         category: "f77d",
    //         categoryName: "Baby",
    //         transactionBy: "Sayali",
    //       },
    //       {
    //         _id: "666d207e95d0156c66c5cda3",
    //         title: "Cake for Anu",
    //         amount: 300,
    //         type: "2",
    //         date: "2024-06-12T04:48:43.000Z",
    //         isDirect: true,
    //         bank: "HDFC",
    //         category: "e51a",
    //         categoryName: "Home Misc",
    //         transactionBy: "Satyajit",
    //       },
    //       {
    //         _id: "666d23ac95d0156c66c5cdc9",
    //         title: "Rent",
    //         amount: 9200,
    //         type: "2",
    //         date: "2024-06-04T05:15:33.000Z",
    //         isDirect: true,
    //         bank: "SBI",
    //         category: "f4de",
    //         categoryName: "Rent",
    //         transactionBy: "Satyajit",
    //       },
    //       {
    //         _id: "666d242595d0156c66c5cdce",
    //         title: "NPS",
    //         amount: 529,
    //         type: "2",
    //         date: "2024-06-15T05:15:33.129Z",
    //         isDirect: true,
    //         bank: "SBI",
    //         category: "f53d",
    //         categoryName: "Investment",
    //         transactionBy: "Satyajit",
    //       },
    //       {
    //         _id: "666d264b5a382c6bd21fd70e",
    //         title: "Groceries",
    //         amount: 3183,
    //         type: "2",
    //         date: "2024-06-15T05:21:45.234Z",
    //         isDirect: false,
    //         bank: "HDFC",
    //         category: "f07a",
    //         categoryName: "Groceries",
    //         transactionBy: "Alka",
    //       },
    //       {
    //         _id: "666d26eb5a382c6bd21fd711",
    //         title: "Sweets",
    //         amount: 210,
    //         type: "2",
    //         date: "2024-06-15T05:21:45.225Z",
    //         isDirect: false,
    //         bank: "HDFC",
    //         category: "e51a",
    //         categoryName: "Home Misc",
    //         transactionBy: "Satyajit",
    //       },
    //       {
    //         _id: "666db7be2377d7fe29d0ff87",
    //         title: "Home Misc",
    //         amount: 50,
    //         type: "2",
    //         date: "2024-06-15T15:47:12.838Z",
    //         isDirect: true,
    //         bank: "HDFC",
    //         category: "e51a",
    //         categoryName: "Home Misc",
    //         transactionBy: "Satyajit",
    //       },
    //       {
    //         _id: "666dbbc12377d7fe29d0ffbf",
    //         title: "Maid",
    //         amount: 1500,
    //         type: "2",
    //         date: "2024-06-15T16:04:03.517Z",
    //         isDirect: false,
    //         bank: "HDFC",
    //         category: "e51a",
    //         categoryName: "Home Misc",
    //         transactionBy: "Alka",
    //       },
    //       {
    //         _id: "666dbc4c2377d7fe29d0ffca",
    //         title: "Groceries",
    //         amount: 600,
    //         type: "2",
    //         date: "2024-06-15T16:07:00.000Z",
    //         isDirect: false,
    //         bank: "HDFC",
    //         category: "f07a",
    //         categoryName: "Groceries",
    //         transactionBy: "Alka",
    //       },
    //       {
    //         _id: "666fc1162377d7fe29d10017",
    //         title: "Traveling",
    //         amount: 100,
    //         type: "2",
    //         date: "2024-06-16T04:51:22.000Z",
    //         isDirect: false,
    //         bank: "HDFC",
    //         category: "f1b9",
    //         categoryName: "Traveling",
    //         transactionBy: "Alka",
    //       },
    //       {
    //         _id: "666fc15d2377d7fe29d1001a",
    //         title: "Traveling",
    //         amount: 45,
    //         type: "2",
    //         date: "2024-06-16T04:51:22.000Z",
    //         isDirect: true,
    //         bank: "HDFC",
    //         category: "f1b9",
    //         categoryName: "Traveling",
    //         transactionBy: "Satyajit",
    //       },
    //       {
    //         _id: "666fc19b2377d7fe29d1001f",
    //         title: "Hoteling",
    //         amount: 785,
    //         type: "2",
    //         date: "2024-06-16T04:51:22.000Z",
    //         isDirect: true,
    //         bank: "HDFC",
    //         category: "f594",
    //         categoryName: "Hoteling",
    //         transactionBy: "Satyajit",
    //       },
    //       {
    //         _id: "666fc1c92377d7fe29d10024",
    //         title: "Shopping",
    //         amount: 200,
    //         type: "2",
    //         date: "2024-06-17T04:51:22.457Z",
    //         isDirect: true,
    //         bank: "HDFC",
    //         category: "f218",
    //         categoryName: "Shopping",
    //         transactionBy: "Satyajit",
    //       },
    //     ],
    //   },
    // };
    // setBanks(resp.data.banks);
    // setCategories(resp.data.categories);
    // setFamilyMembers(resp.data.familyMembers);
    // setTransactions(resp.data.transactions);
    // setAllDataLoaded(true);
    // setLoading(false);
  }

  function processData() {
    let monthStart = moment().startOf("month").toDate();
    let monthEnd = moment().endOf("month").toDate();
    let trans;
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
            let label = moment(element.date).format("DD MMMM");
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
          <div className="card secondRow">
            <div className="label">
              <h4>TOTAL DIFF.</h4>
            </div>
            <div className="value">
              <h1>
                {rupee}&nbsp;{difference}
              </h1>
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
        justify-content: center;
        box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
          rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
          rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
          rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
          rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
          rgba(0, 0, 0, 0.09) 0px 32px 16px;
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
