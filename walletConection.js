import React, { useState, useEffect } from 'react';
import { connect, disconnect } from 'starknetkit';

export const WalletConnection = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState('0.00');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      // Подключение к кошелькам Argent X или Braavos в сети Starknet
      const connection = await connect({
        modalMode: 'canAsk',
        dappName: 'Starknet Gateway Provider'
      });
      
      if (connection && connection.account) {
        setAccount(connection.account);
        // Логика получения баланса в STRK / ETH через RPC-провайдер
        console.log("Wallet successfully authenticated:", connection.account.address);
      }
    } catch (error) {
      console.error("Authentication failed or rejected by user:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    await disconnect();
    setAccount(null);
    setBalance('0.00');
  };

  return (
    <div className="web3-container p-6 bg-slate-900 text-white rounded-xl">
      <h2 className="text-xl font-bold mb-4">Starknet Secure Gateway</h2>
      {account ? (
        <div className="account-details space-y-2">
          <p className="text-green-400 text-sm">● Connected to Mainnet</p>
          <p className="font-mono text-xs truncate">Address: {account.address}</p>
          <p className="text-lg">Balance: <span className="font-semibold text-indigo-300">{balance} STRK</span></p>
          <button onClick={handleDisconnect} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm mt-2 transition">
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <button 
          onClick={handleConnect} 
          disabled={isConnecting}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 py-3 rounded-lg font-medium transition"
        >
          {isConnecting ? 'Requesting Extension...' : 'Connect Starknet Wallet'}
        </button>
      )}
    </div>
  );
};