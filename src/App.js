import React, { useState } from 'react';
import './App.css';

function App() {

  const ethereum = window.ethereum;
  const Web3 = require('web3');
  const [address, setAddress] = useState('Not set');
  const receiver = '0x8afB142655d14b2840489Aa512e798FC9deeFBC0';
  const [senderBal, setSenderBal] = useState('');
  const [receiverBal, setReceiverBal] = useState('');

  const web3 = new Web3(ethereum);

  window.addEventListener('load', async () => {
    if (ethereum) {
      try {
        ethereum.on('accountsChanged', async function (accounts) {
          console.log("Account was changed!");
          console.log(accounts[0]);
          setAddress(accounts[0]);
          setSenderBal(await web3.eth.getBalance(accounts[0]));
          setReceiverBal(await web3.eth.getBalance(receiver));
        });
      } catch {
        console.log("User denied account access");
      }
    }
  });

  async function getAccount() {
    const accounts = await web3.eth.getAccounts();;
    setAddress(accounts[0]);
    setSenderBal(await web3.eth.getBalance(accounts[0]));
    setReceiverBal(await web3.eth.getBalance(receiver));
  }

  function sendETH() {
    web3.eth.sendTransaction({
      from: address,
      to: receiver,
      value: web3.utils.toHex(web3.utils.toWei('0.1')),
    })
    .then(async () => setSenderBal(await web3.eth.getBalance(address)))
    .then(async () => setReceiverBal(await web3.eth.getBalance(receiver)))
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error);
  }

  return (
    <div className="App">
      <button
        className="enableEthereumButton"
        onClick={getAccount}
      >
        Enable Ethereum
      </button>
      <h2>
        {ethereum && <p>Your Ethereum address: {address}</p>}
        {!ethereum && <p style={{color: 'red'}}>Please use browser with Ethereum wallet</p>}
      </h2>
      <button
        className="sendETH"
        onClick={sendETH}
      >
        Send ETH
      </button>
      <h2>Sender Balance: {(senderBal) ? parseFloat(web3.utils.fromWei(senderBal)).toFixed(1) : 'Not set'} ETH</h2>
      <h2>Receiver Balance: {(receiverBal) ? parseFloat(web3.utils.fromWei(receiverBal)).toFixed(1) : 'Not set'} ETH</h2>
    </div>
  );
}

export default App;
