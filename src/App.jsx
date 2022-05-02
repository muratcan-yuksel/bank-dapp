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
    } catch (error) {
      console.log(error);
    }
  };

  const getBankName = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const bankContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let bankName = await bankContract.bankName();
        bankName = utils.parseBytes32String(bankName);
        setCurrentBankName(bankName.toString());
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use our bank.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setBankNameHandler = async (event) => {
    event.preventDefault();
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const bankContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const txn = await bankContract.setBankName(
          utils.formatBytes32String(inputValue.bankName)
        );
        console.log("Setting Bank Name...");
        //waits for the transaction to be complete
        await txn.wait();
        console.log("Bank Name Changed", tnx.hash);
        await getBankName();
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use our bank.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBankOwnerHandler = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const bankContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const owner = await bankContract.bankOwner();
        setBankOwnerAddress(owner);
        const [account] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        if (owner.toLowerCase() === account.toLowerCase()) {
          setIsBankerOwner(true);
        }
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use our bank.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const customerBalanceHandler = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const bankContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        let balance = await bankContract.getCustomerBalance();
        setCustomerTotalBalance(utils.formatEther(balance));
        console.log("Retrieved balance...", balance);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const depositMoneyHandler = async (event) => {
    try {
      event.preventDefault();
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const bankContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const txn = await bankContract.depositMoney({
          value: ethers.utils.parseEther(inputValue.deposit),
        });
        console.log("Depositing money...");
        //waits for the transaction to be complete
        await txn.wait();
        console.log("Money Deposited", tnx.hash);
        customerBalanceHandler();
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use our bank.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const withDrawMoneyHandler = async (event) => {
    try {
      event.preventDefault();
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const bankContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        let myAddress = await signer.getAddress();
        console.log("provider signer...", myAddress);

        const txn = await bankContract.withdrawMoney(
          myAddress,
          ethers.utils.parseEther(inputValue.withdraw)
        );
        console.log("Withdrawing money...");
        //waits for the transaction to be complete
        await txn.wait();
        console.log("Money Withdrawn", tnx.hash);
        customerBalanceHandler();
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use our bank.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    getBankName();
    getbankOwnerHandler();
    customerBalanceHanlder();
  }, [isWalletConnected]);

  return (
    <div className="App">
      App Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis
      necessitatibus voluptas, praesentium est commodi, mollitia sapiente
      doloremque iste unde odit, recusandae suscipit laboriosam aperiam
      consequatur ipsa beatae maiores non autem.
    </div>
  );
};

export default App;
