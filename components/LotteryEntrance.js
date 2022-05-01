import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { abi } from "../constants/abi.json"

const CONTRACT_ADDRESS = "0x693C12B5C7903Bb5D2d729e1f9974CE78AfF5F58"

export default function LotteryEntrance() {
  const { isWeb3Enabled } = useMoralis()

  const [recentWinner, setRecentWinner] = useState("0")
  const [numPlayers, setNumPlayers] = useState("0")

  const { runContractFunction: enterRaffle } = useWeb3Contract({
    abi: abi,
    contractAddress: CONTRACT_ADDRESS,
    functionName: "enterRaffle",
    msgValue: ethers.utils.parseEther("0.1"), // 0.1 ETH
    params: {},
  })

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: abi,
    contractAddress: CONTRACT_ADDRESS,
    functionName: "s_recentWinner",
    params: {},
  })

  useEffect(() => {
    const getRecentWinnerFromContract = async () => {
      const recentWinnerFromCall = await getRecentWinner()
      setRecentWinner(recentWinnerFromCall)
    }
    if (isWeb3Enabled) {
      getRecentWinnerFromContract()
    }
  }, [isWeb3Enabled])

  return (
    <div>
      <button
        className="rounded ml-auto font-bold bg-blue-400 p-2 m-2 text-white"
        onClick={async () => {
          await enterRaffle()
        }}
      >
        Enter lottery!
      </button>
      <div>
        <p className="text-lg font-semibold">The recent winner is: {recentWinner}</p>
      </div>
    </div>
  )
}
