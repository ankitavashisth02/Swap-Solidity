import React, {useState} from "react";

const Body=({state})=> {
  const {contract1,contract2,contract3} = state;

  const handleChange = async()=> {
    var reserveIn = Number(await contract3.reserve0());
    var reserveOut = Number(await contract3.reserve1());
    const amount1 = document.querySelector(".inputToken").value;
    
    var amountWithFee = (amount1 * 997)/1000;
    var amountOut = (amountWithFee * reserveOut)/(reserveIn + amountWithFee);
    document.querySelector(".outputToken").value = amountOut+ parseInt(amount1);
  }

  const transferToken = async() =>{
    event.preventDefault();

    const amount1 = document.querySelector(".inputToken").value;
    // console.log(contract3);
    // console.log(amount1);
    // console.log(await contract2.symbol());
    //console.log(contractAddress1);
    //console.log(await contract1.getAddress());
    //console.log(parseInt(await contract1.balanceOf(window.ethereum.selectedAddress)));
    //console.log(parseInt(await contract2.balanceOf(window.ethereum.selectedAddress)));

    const approved1 = await contract1.approve(await contract3.getAddress(), parseInt(amount1*(10**2)));
    await approved1.wait();
    console.log("approved1 done");
    const approved2 = await contract2.approve(await contract3.getAddress(), parseInt(amount1*(10**2)));
    await approved2.wait();
    console.log("approved2 done");
    const addLiquidity = await contract3.addLiquidity(amount1*(10**2),amount1*(10**2));
    await addLiquidity.wait();
    console.log("liquidity added");


    // const approvedAgain = await contract1.approve(await contract3.getAddress(),amount1*(10**2));
    // await approvedAgain.wait();
    // console.log("approved again");

    // const swapping = await contract3.swap(await contract1.getAddress(),amount1*(10**2));
    // await swapping.wait();
    
    console.log("transaction done");
    // window.alert("transaction done");
  }

    return (
      <div className="token-swap-container">
        <form onSubmit={transferToken}>
        <div className="input-container">
          <label htmlFor="inputToken">TEST :</label>
          <input
            type="text"
            className="inputToken"
            placeholder="Enter Token.."
            onChange = {handleChange}
          />
        </div>
  
        <div className="output-container">
          <label htmlFor="outputToken">ANK :</label>
          <input
            type="text"
            className="outputToken"
            placeholder="Amount is.."
          />
        </div>
  
        <button type="submit">Swap</button>
        </form>
      </div>
    );
}

export default Body;