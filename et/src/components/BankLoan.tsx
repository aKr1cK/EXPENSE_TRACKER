import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import styled from "styled-components";

export default function BankLoan() {
    const gridRef = useRef(null); // Reference to the grid
    const [records, setRecords] = useState([]);
    const [colDefs, setColDefs] = useState([
        { field: "now" },
        { field: "emiPerMonth" },
        { field: "currMonthInterest" },
        { field: "totalLoanAfterInterest" },
        { field: "prepayment" },
        { field: "totalLoanAmtAfterPrepayment" },
    ]);

    // useEffect(() => {
    //     if (gridRef.current) {
    //       gridRef.current.api.sizeColumnsToFit(); // Auto-size columns to fit the grid width
    //     }
    //   }, []);

      const onGridReady = () => {
        if (gridRef.current) {
          gridRef.current.api.sizeColumnsToFit();
        }
      };

    const getArray = () => {
        let returnArr = [];
        var now: any = moment(new Date('05-11-2024')).format('DD-MM-YYYY');
        debugger;
        var totalLoanAmt_val = Number((document.getElementById('totalLoanAmt') as any).value || 5599375);
        var interestRate = Number((document.getElementById('interestRate') as any).value || 8.5);
        var interestPerMonth = interestRate / 12;
        var emiPerMonth = Number((document.getElementById('emiPerMonth') as any).value || 42708);;
        var extraEmiPerMonths = Number((document.getElementById('extraEmiPerMonths') as any).value || 40000);
        // (document.getElementById('totalLoanAmt') as any).value = totalLoanAmt_val;
        // (document.getElementById('interestRate') as any).value = interestRate;
        // (document.getElementById('emiPerMonth') as any).value = emiPerMonth;
        // (document.getElementById('extraEmiPerMonths') as any).value = extraEmiPerMonths;
        let i = 0;
        let totalRow = {now:'',currMonthInterest:0,totalLoanAfterInterest:0,emiPerMonth:0,prepayment:0};
        while (totalLoanAmt_val && isFinite(totalLoanAmt_val) && totalLoanAmt_val > 0) {
            console.log("LOLA");
            let obj: any = {};
            now = moment(now).add(1, 'months');
            obj['now'] = moment(now).format('DD-MM-YYYY');
            var currMonthInterest = shortIt(totalLoanAmt_val * (interestPerMonth / 100));
            obj['currMonthInterest'] = currMonthInterest;
            totalRow['currMonthInterest'] += currMonthInterest;
            totalLoanAmt_val += currMonthInterest;
            obj['totalLoanAfterInterest'] = totalLoanAmt_val;
            obj['emiPerMonth'] = emiPerMonth;
            totalRow['emiPerMonth'] += emiPerMonth;
            totalLoanAmt_val -= emiPerMonth;
            if (i == 2) {
                totalLoanAmt_val -= (extraEmiPerMonths * 3);
                obj['prepayment'] = (extraEmiPerMonths * 3);
                totalRow['prepayment'] += (extraEmiPerMonths * 3);
                i = 0;
            } else {
                i++;
                obj['prepayment'] = 0;
            }
            obj['totalLoanAmtAfterPrepayment'] = totalLoanAmt_val;
            returnArr.push(obj);
        }
        returnArr.push(totalRow);
        return returnArr;
    }

    const shortIt = (num) => {
        return Math.trunc(num);
    }

    return (
        <IncomeStyledDiv>
            <div className="inputsRow">
                <input type="text" id="totalLoanAmt"  placeholder="Total Loan Ammount"/>
                <input type="text" id="interestRate"   placeholder="Interest Rate"/>
                <input type="text" id="emiPerMonth"   placeholder="Emi PerMonth"/>
                <input type="text" id="extraEmiPerMonths"  placeholder="Extra EmiPerMonth"/>
                <input type="button" onClick={()=>setRecords(getArray())} value="Submit" />
            </div>
            <div className="ag-theme-quartz" style={{ width: '100%' }} >
                <AgGridReact rowData={records} columnDefs={colDefs} ref={gridRef} defaultColDef={{sortable: false}} onGridReady={onGridReady} domLayout="autoHeight" />
            </div>
        </IncomeStyledDiv>
    );
}

const IncomeStyledDiv = styled.div`
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .inputsRow{
        display:flex;
        gap: 1rem;
    }
    .ag-theme-quartz{
        overflow:scroll;
    }
`;
