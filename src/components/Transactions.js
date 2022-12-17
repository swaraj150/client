import React from "react"
import { useRef } from "react";
import { useContext } from "react";
import { useState } from "react";
import Bankcontext from "../context/Bankcontext";



function Transactions() {
    const myform=useRef(null);
    const [trans, settrans] = useState({ account: "", amount: "" });
    const context = useContext(Bankcontext);
    const { showalert } = context;
    const onchange = (e) => {
        settrans({ ...trans, [e.target.name]: e.target.value });
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = fetch("http://localhost:80/api/transactions/newtransaction", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("auth-token")
            },
            body: JSON.stringify((trans))
        });
        const json = (await response).json();

        console.log(json);
        json.then((response) => {
            if (response.success) {
                showalert("Transaction is Successful", "success");
                
            }
            else if (!localStorage.getItem("auth-token")) {
                showalert("Please Login before Transaction", "danger");
            }
            else {
                showalert("Invalid account no.", "danger");
            }
        }).catch(() => {
            showalert("Please Enter a valid Account No.", "danger");
            
        })
        settrans(trans.account=" ",trans.account=" ");
        myform.current.reset();
    }
    
    return (
        <div className="my-3">
            <form onSubmit={handlesubmit} ref={myform}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Account No</label>
                    <input inputMode="numeric" type={"number"} className="form-control" id="exampleFormControlTextarea1" name="account" onChange={onchange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Amount</label>
                    <input inputMode="numeric" type={"number"} className="form-control" id="exampleFormControlTextarea1" name="amount" onChange={onchange} required />
                </div>

                <button type="submit" className="btn btn-primary" >Pay</button>
            </form>
        </div>
    )
}
export default Transactions