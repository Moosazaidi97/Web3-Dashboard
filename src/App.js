import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [network, setNetwork] = useState("");

  // 🔗 Connect Wallet
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Install MetaMask!");
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      await provider.send("eth_requestAccounts", []);

      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);

      // 🌐 Network
      const networkInfo = await provider.getNetwork();
      const networkName =
        networkInfo.name === "homestead"
          ? "Ethereum Mainnet"
          : networkInfo.name;

      setNetwork(networkName);

      // 💰 Balance
      const bal = await provider.getBalance(address);
      setBalance(ethers.utils.formatEther(bal));

    } catch (error) {
      console.error(error);
      alert("Error connecting wallet");
    }
  };

  // 🔄 Auto-connect on load
  useEffect(() => {
    if (window.ethereum) {
      connectWallet();
    }
  }, []);

  return (
   <div className="container">
  <h1>💼 Web3 Wallet Dashboard</h1>

  <button onClick={connectWallet}>Connect MetaMask</button>

  {/* Wallet Card */}
  <div className="card">
    <h2>Wallet Info</h2>

    <p><b>Address:</b> {account || "Not Connected"}</p>

    <button
      onClick={() => account && navigator.clipboard.writeText(account)}
    >
      📋 Copy Address
    </button>

    <p><b>Balance:</b> {balance || "0"} ETH</p>
    <p><b>Network:</b> {network || "Unknown"}</p>

    <button onClick={connectWallet}>🔄 Refresh</button>
  </div>

  {/* Tokens Section */}
  <div className="card">
    <h2>🪙 Tokens</h2>

    <div className="token">
      <span>ETH</span>
      <span>{balance || "0"}</span>
    </div>

    <div className="token">
      <span>USDT</span>
      <span>--</span>
    </div>

    <div className="token">
      <span>DAI</span>
      <span>--</span>
    </div>
  </div>

  {/* Activity Section */}
  <div className="card">
    <h2>📜 Recent Activity</h2>

    <div className="activity">
      <p>{account ? "No transactions yet" : "Connect wallet to see activity"}</p>
    </div>
  </div>
</div>
  );
}

export default App;