import React from "react";
import ReactDOM from "react-dom/client";
import Body from "./src/Body";
import abi1 from "../artifacts/contracts/ERC20.sol/ERC20.json";
import abi2 from "../artifacts/contracts/ERC20_A.sol/ERC20_A.json";
import abi3 from "../artifacts/contracts/CPAMM.sol/CPAMM.json";
import {Contract, BrowserProvider} from "ethers";
import { useState, useEffect } from "react";

const App = () => {
  const [account, setAccount] = useState(null);
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract1: null,
    contract2: null,
    contract3: null,
  });

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress1 = "0x572B0E9b90e83825C4D0CEC6425eF78449DDaa2F";
      const contractAddress1abi1 = abi1.abi;
      const contractAddress2 = "0x3A4Fe1ef8faB39178fE6e8105E5821EC47eB7eB3";
      const contractAddress2abi2 = abi2.abi;
      const contractAddress3 = "0x70217A42886b520f79B75411CbF6A70096A28C48";
      const contractAddress3abi3 = abi3.abi;

      try {
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          // window.ethereum.on("chainChanged",()=>{
          //   window.location.reload();
          // })

          // window.ethereum.on("accountChanged",()=>{
          //   window.location.reload();
          // })
        //   console.log(ethers)
          const provider = new BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const contract1 = new Contract(
            contractAddress1,
            contractAddress1abi1,
            signer
          );
          const contract2 = new Contract(
            contractAddress2,
            contractAddress2abi2,
            signer
          );
          const contract3 = new Contract(
            contractAddress3,
            contractAddress3abi3,
            signer
          );

          setAccount(account);
          setState({ provider, signer, contract1, contract2, contract3 });
        } else {
          alert("metamask not installed");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

// const first = account.slice(0,4);
  return (
    <React.Fragment>
      <h3>Connected Account : {account} </h3>
      <Body state={state} />
    </React.Fragment>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);