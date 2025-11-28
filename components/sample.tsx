"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { isAddress } from "viem"
import { useGradeContract } from "@/hooks/useContract"

const SampleIntregation = () => {
  const { isConnected } = useAccount()
  const [inputStudent, setInputStudent] = useState("")
  const [inputGrade, setInputGrade] = useState("")

  const { data, actions, state } = useGradeContract()

  const handleFetch = () => {
    data.setStudentAddress(inputStudent)
  }

  const handleSetGrade = async () => {
    if (!isAddress(inputStudent) || !inputGrade) return

    await actions.updateGrade(inputStudent, Number(inputGrade))
    setInputGrade("")
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold mb-3">Grade Contract</h2>
          <p>Please connect your wallet to interact with the contract.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Grade Management</h1>

        {/* Fetch Grade */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Fetch Grade</h2>
          <input
            type="text"
            placeholder="Student address"
            value={inputStudent}
            onChange={(e) => setInputStudent(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <button
            onClick={handleFetch}
            disabled={!isAddress(inputStudent)}
            className="w-full mt-3 px-4 py-2 bg-primary text-white rounded disabled:opacity-50"
          >
            Fetch Grade
          </button>

          {data.grade !== null && (
            <p className="mt-3 font-mono">Grade: {data.grade}</p>
          )}
        </div>

        {/* Set Grade */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Set Grade</h2>
          <input
            type="text"
            placeholder="Student address"
            value={inputStudent}
            onChange={(e) => setInputStudent(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2"
          />
          <input
            type="number"
            placeholder="Grade"
            value={inputGrade}
            onChange={(e) => setInputGrade(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />

          <button
            onClick={handleSetGrade}
            disabled={!isAddress(inputStudent) || !inputGrade || state.isLoading}
            className="w-full mt-3 px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
          >
            {state.isLoading ? "Submitting..." : "Set Grade"}
          </button>
        </div>

        {/* Tx status */}
        {state.hash && (
          <div className="p-4 border rounded bg-card mt-4">
            <p className="text-xs uppercase mb-1">Transaction</p>
            <p className="font-mono break-all">{state.hash}</p>
            {state.isConfirming && <p className="text-primary mt-2">Confirming...</p>}
            {state.isConfirmed && <p className="text-green-500 mt-2">Confirmed!</p>}
          </div>
        )}

        {state.error && (
          <div className="p-4 border border-red-500 text-red-600 rounded mt-4">
            Error: {state.error.message}
          </div>
        )}
      </div>
    </div>
  )
}

export default SampleIntregation
