import { useState, useEffect } from "react";
import { ethers, utils } from "ethers";
import abi from "./contracts/Bank.json";

const App = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isBankerOwner, setIsBankerOwner] = useState(false);
  const [inputValue, setInputValue] = useState({
    withdraw: "",
    deposit: "",
    bankName: "",
  });
  const [bankOwnerAddress, setBankOwnerAddress] = useState(null);
  const [customerTotalBalance, setCustomerTotalBalance] = useState(null);
  const [currentBankName, setCurrentBankName] = useState(null);
  const [customerAddress, setCustomerAddress] = useState(null);
  const [error, setError] = useState(null);

  const contractAddress = "0xc859B3cdeFc99a7d56bCcE130979B81A07D02cfE";
  const contractABI = abi.abi;

  const checkIfWalletIsConnected = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        setIsWalletConnected(true);
        setCustomerAddress(account);
        console.log("Account Connected: ", account);
      } else setError("Please install a MetaMask wallet to use our bank.");
      console.log("No MetaMask detected");
    } catch (error) {}
  };

  return <div>App</div>;
};

export default App;
