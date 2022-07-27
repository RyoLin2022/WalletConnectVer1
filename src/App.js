import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';

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
    } catch (error) {
      console.log('error connecting');
    }

    //Check if Metamask Exist
    if (window.ethereum) {
      console.log('detected');
    } else {
      console.log('not detected');
    }
  }

  async function connectWallet() {
    
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      var btnConnect = document.getElementById("connect-btn");
      btnConnect.innerText = "Wallet Connected";

    } else {
      alert("Please install Metamask");
    }
  }


  return (
    <div className="App">
      <header className="App-header">
        <button id="connect-btn" onClick={connectWallet}>
          Connect Wallet
        </button>
        <h3>Wallet Address: {walletAddress}</h3>
      </header>
    </div>
    
  );  
}

export default App;
