var web3 = window.web3;
web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:54076/dexchange/Node'));
web3.setProvider(new web3.providers.HttpProvider("http://localhost:54076/dexchange/Node"));
web3.currentProvider.isMetaMask = true;

