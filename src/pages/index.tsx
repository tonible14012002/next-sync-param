import { FilterTable } from '@components/FilterTable/FilterTable'
import { FilterTableWithInternalState } from '@components/FilterTableWithInternalState'
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [ approach, setApproach ] = useState<"NoInternal"|"WithInternal">("NoInternal")

  const ToRender = approach === "NoInternal" ? (
        <FilterTable/>
  ): (
    <FilterTableWithInternalState/>
  )
  return (
    <div className="bg-zinc-900 w-full h-screen flex items-center justify-center gap-20 flex-col">
      <div className='flex gap-3'>
        <button
          className={`p-3 rounded-md font-bold
            ${approach === "NoInternal" ? "bg-zinc-200 text-zinc-900": "bg-zinc-700 text-zinc-200"}
          `}
          onClick={() => setApproach("NoInternal")}
        >
          No Internal State
        </button>
        <button
          className={`p-3 rounded-md font-bold
            ${approach === "WithInternal" ? "bg-zinc-200 text-zinc-900": "bg-zinc-700 text-zinc-200"}
          `}
          onClick={() => setApproach("WithInternal")}
        >
          With Internal State
        </button>
      </div>
      {ToRender}
    </div>
  )
}