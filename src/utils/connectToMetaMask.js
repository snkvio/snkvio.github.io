import web3 from './web3'

const connectToMetaMask = async () => {
    if (window.ethereum) {
        window.ethereum.request({method: "eth_requestAccounts"}).then(async (accounts) => {
            // Get network ID
            let n = parseInt(window.ethereum.chainId);

            if(n !== 80001) {
                await switchNetwork();
            }

            return accounts[0];
        }).catch((err) => console.log(err))
    } else {
        return false;
    }
};

const switchNetwork = async () => {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: "0x13881"}],
        });
        console.log("You have switched to the right network")
    } catch (switchError) {
        // The network has not been added to MetaMask
        if (switchError.code === 4902) {
            await addNetwork();
        }
    }
};

const addNetwork = async () => {
    try {
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
                {
                    // chainId: '0x89',
                    // chainName:'Polygon',
                    // rpcUrls:['https://polygon-rpc.com'],
                    // blockExplorerUrls:['https://polygonscan.com/'],
                    // nativeCurrency: {
                    //     symbol:'MATIC',
                    //     decimals: 18
                    // }
                    chainId: '0x13881',
                    chainName:'Polygon Testnet',
                    rpcUrls:['https://rpc-mumbai.maticvigil.com/'],
                    blockExplorerUrls:['https://mumbai-explorer.matic.today/'],
                    nativeCurrency: {
                        symbol:'MATIC',
                        decimals: 18
                    }
                }
            ]
        });
    } catch (err) {
        console.log(err);
    }
};

export default connectToMetaMask