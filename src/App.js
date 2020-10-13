import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const ethereum = window.ethereum
  const [address, setAddress] = useState('Not set')

  window.addEventListener('load', async () => {
    if (ethereum) {
      try {
        // await ethereum.enable()
        ethereum.on('accountsChanged', function (accounts) {
          console.log("Account was changed!");
          console.log(accounts[0]);
          setAddress(accounts[0]);
        });
      } catch {
        console.log("User denied account access")
      }
    }
  });

  async function getAccount() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    setAddress(accounts[0]);
  }

  return (
    <div className="App">
      <button
        className="enableEthereumButton"
        onClick={getAccount}
      >Enable Ethereum</button>
      <h2>Account: {address}</h2>
    </div>
  );
}

export default App;
