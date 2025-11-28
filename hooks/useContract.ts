"use client"

import { useState, useEffect } from "react"
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { contractABI, contractAddress } from "@/lib/contract"
import { isAddress } from "viem"

export const useGradeContract = () => {
  const { address } = useAccount()
  const [studentAddress, setStudentAddress] = useState("")
  const [grade, setGrade] = useState<number | null>(null)

  const { data: fetchedGrade, refetch: refetchGrade } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "getGrade",
    args: studentAddress && isAddress(studentAddress) ? [studentAddress as `0x${string}`] : undefined,
    query: {
      enabled: !!studentAddress && isAddress(studentAddress),
    },
  })

  const { writeContractAsync, data: hash, error, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash })

  useEffect(() => {
    if (isConfirmed) refetchGrade()
  }, [isConfirmed, refetchGrade])

  const updateGrade = async (student: string, gradeValue: number) => {
    if (!isAddress(student)) return

    await writeContractAsync({
      address: contractAddress,
      abi: contractABI,
      functionName: "setGrade",
      args: [student as `0x${string}`, BigInt(gradeValue)],
    })
  }

  return {
    data: {
      grade: fetchedGrade ? Number(fetchedGrade) : null,
      studentAddress,
      setStudentAddress,
      gradeValue: grade,
      setGradeValue: setGrade,
    },
    actions: {
      updateGrade,
    },
    state: {
      isLoading: isPending || isConfirming,
      isPending,
      isConfirming,
      isConfirmed,
      hash,
      error,
    },
  }
}
