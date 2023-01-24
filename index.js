
import { ethers } from "./ethers-5.6.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")
const balanceButton = document.getElementById("balanceButton")
connectButton.onclick = connect
fundButton.onclick = fund
balanceButton.onclick = getbalance

async function connect() {
    if (typeof window.ethereum !== "undefined") {
    await ethereum.request({ method: "eth_requestAccounts" })
    connectButton.innerHTML = "connected"
    } else {
    connectButton.innerHTML = "please install metamask"
    }
    }

   /* async function getbalance(){
        if(typeof window.ethereum != "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const balance = await provider.getBalance(contractAddress)
        console.log(ethers.utils.formatEther(balance))
    }
}*/

    
    async function fund() {
      const ethAmount = document.getElementById("ethAmount").value
        console.log(`Funding with ${ethAmount}`)

        if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
             const transactionResponce = await contract.fund ({
                value: ethers.utils.parseEther(ethAmount),
           })
           await listenForTransactionMine(transactionResponce, provider)
           console.log("Done!")
       } catch(error) {
           console.log(error)
        }
        }
        
    }

    function listenForTransactionMine(transactionResponce, provider) {
        console.log(`Mining ${transactionResponce.hash}...`)
        return new Promise((resolve, reject) => {
            provider.once(transactionResponce.hash, (transactionReceipt) => {
                console.log(
                    `Completed with ${transactionReceipt.confirmations} confirmations`
                )
               resolve()
            })
        })
    }