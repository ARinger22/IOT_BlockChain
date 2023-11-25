import Web3 from "web3";
import CertificateAuthority from './contracts/CertificateAuthority.json';
import LPeer from './contracts/LPeer.json';
import LPeer0 from './contracts/LPeer0.json';

const web3 = new Web3(window.ethereum);
// NOTE: 
// if http://localhost:8545 not working then try this http://127.0.0.1:8545/ 
async function connectWeb3() {
    const provider = new Web3.providers.HttpProvider("http://localhost:8545");
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    console.log("accounts" , accounts);
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = await CertificateAuthority.networks[networkId];
    const instance = new web3.eth.Contract(
        CertificateAuthority.abi,
        deployedNetwork.address
    );
    return { accounts, instance }
}

//function for using Metamask
async function connectWeb3Metamask(provider) {
    const web3 = new Web3(provider);
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    console.log("Injected web3 detected.", accounts, networkId);
    const deployedNetwork = await CertificateAuthority.networks[networkId];
    const instance = new web3.eth.Contract(
        CertificateAuthority.abi,
        deployedNetwork.address
    );
    return { accounts, instance }
}

async function registerCandidates(contract, account, _name, _age, _candidateAddress) {
    try {
        console.log("registerCandidates:", contract._address);
        // Getting contract address
        let contract_address = contract._address

        // Getting account address from web3
        let from_address = await web3.eth.getAccounts();
        from_address = from_address[0]

        // Getting nonce value and gasPrice for the account
        const nonce = await web3.eth.getTransactionCount(from_address);
        const gasPrice = await web3.eth.getGasPrice();

        // Preparing txn obj
        const txData = contract.methods
            .registerCandidates(
                _name,
                Number(_age),
                _candidateAddress
            )
            .encodeABI();

        const txObject = {
            nonce: nonce,
            gasPrice: gasPrice,
            gasLimit: web3.utils.toHex(3000000),
            to: contract_address,
            data: txData,
        };

        // sending txn 
        const txReceipt = await web3.eth.sendTransaction({
            from: from_address,
            ...txObject
        });

        // Getting events to check 
        const events = await contract.getPastEvents('allEvents', {
            fromBlock: txReceipt.blockNumber,
            toBlock: txReceipt.blockNumber,
        });

        console.log('Emitted Events:', events);
        console.log('Transaction Hash:', txReceipt);

        return { error: false, message: events[0].returnValues.msg }
    } catch (error) {
        console.log("Error:", error);
        return { error: true, message: error.message }
    }

}

async function whiteListAddress(contract, account, _IoT_deviceAddress) {
    try {
        console.log("registerCandidates:", contract._address);
        // Getting contract address
        let contract_address = contract._address

        // Getting account address from web3
        let from_address = await web3.eth.getAccounts();
        from_address = from_address[0]

        // Getting nonce value and gasPrice for the account
        const nonce = await web3.eth.getTransactionCount(from_address);
        const gasPrice = await web3.eth.getGasPrice();

        // Preparing txn obj
        const txData = contract.methods.whiteListAddress(_IoT_deviceAddress).encodeABI();

        const txObject = {
            nonce: nonce,
            gasPrice: gasPrice,
            gasLimit: web3.utils.toHex(3000000),
            to: contract_address,
            data: txData,
        };

        // sending txn 
        const txReceipt = await web3.eth.sendTransaction({
            from: from_address,
            ...txObject
        });

        // Getting events to check 
        const events = await contract.getPastEvents('allEvents', {
            fromBlock: txReceipt.blockNumber,
            toBlock: txReceipt.blockNumber,
        });

        console.log('Emitted Events:', events);
        console.log('Transaction Hash:', txReceipt);

        return { error: false, message: events[0].returnValues.msg }

    } catch (error) {
        console.log("Error:", error);
        return { error: true, message: error.message }
    }

}

async function getAllCandidate(contractInstance, account) {
    try {
        let candidateList = []
        let res2 = await contractInstance.methods.getAllCandidate().call();

        for (let i = 1; i < res2.length; i++) {
            candidateList.push(res2[i])
        }

        console.log("listwww:", candidateList);
        return { error: false, message: candidateList }
    } catch (error) {
        console.log("Error:", error);
        return { error: true, message: error.message }
    }

}

export {
    connectWeb3,
    connectWeb3Metamask,
    getAllCandidate,
    registerCandidates,
    whiteListAddress,}