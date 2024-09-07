import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const MetaMaskWallet = () => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('ETH');

  useEffect(() => {
    if (window.ethereum) {
      const initWeb3 = async () => {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        const accounts = await web3Instance.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          console.log('Connected wallet address:', accounts[0]);
          const accountBalance = await web3Instance.eth.getBalance(accounts[0]);
          setBalance(web3Instance.utils.fromWei(accountBalance, 'ether'));
        }
      };
      initWeb3();
    } else {
      console.log('MetaMask not detected');
    }
  }, []); // Removed `web3` from the dependency array

  const connectWallet = async () => {
    if (window.ethereum && web3) { // Ensure `web3` is initialized
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        console.log('Connected wallet address:', accounts[0]);
        const accountBalance = await web3.eth.getBalance(accounts[0]);
        setBalance(web3.utils.fromWei(accountBalance, 'ether'));
        localStorage.setItem('walletAccount', accounts[0]); // Save wallet account if needed
      } catch (error) {
        console.error('User denied account access');
      }
    } else {
      console.log('MetaMask not detected');
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setBalance(null);
    setSelectedCurrency('ETH');
    localStorage.removeItem('walletAccount');
    sessionStorage.removeItem('walletAccount');
    // window.location.reload(); // Optionally reload page to reset state
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  return (
    <div>
      {account ? (
        <div>
          <span>Balance: {balance} {selectedCurrency}</span>
          <button onClick={() => setShowDropdown(!showDropdown)}>
            {selectedCurrency} ▼
          </button>
          {showDropdown && (
            <select value={selectedCurrency} onChange={handleCurrencyChange}>
              <option value="ETH">Ethereum (ETH)</option>
              <option value="BTC">Bitcoin (BTC)</option>
              <option value="USDT">Tether (USDT)</option>
              <option value="XTZ">Tezos (TEZ)</option>
              {/* Add more currencies as needed */}
            </select>
          )}
          <button onClick={disconnectWallet}>Logout</button>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect MetaMask</button>
      )}
    </div>
  );
};

export default MetaMaskWallet;
