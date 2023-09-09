import { useSyncState } from "@hooks/useSyncState";
import { useRouter } from "next/router";
import { useRef, useEffect, useState, useMemo } from "react";

type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
type SortBy = "Price" | "Time"

interface QueryFilter extends Record<string, string> {
  day: DayOfWeek 
  sort: SortBy
}

const DAY_OF_WEEK: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const DEFAULT_DAY = "Monday"

export function FilterTable() {
    const renderCount = useRef(0)
    renderCount.current += 1
  
    const [ _, setCounter ] = useState<{}>({})
    const [ filter, setFilter ] = useSyncState<QueryFilter>({
      day: DAY_OF_WEEK,
      sort: [ "Price", "Time"]
    })

    const [ secondFiler, setSecondFilter ] = useSyncState({
      search: [] as string[]
    })

    const filterButtons = useMemo((): {title: DayOfWeek}[] => [
      {
        title: "Monday",
      },
      {
        title: "Tuesday",
      },
      {
        title: "Wednesday",
      },
      {
        title: "Thursday",
      },
      {
        title: "Friday",
      },
      {
        title: "Saturday",
      },
      {
        title: "Sunday",
      }
    ], [])
  
    return (
        <div className='flex flex-col w-full max-h-[800px] min-h-[400px] overflow-y-auto no-scrollbar max-w-[600px] gap-3'>
          <header className="shrink-0 flex overflow-x-auto no-scrollbar gap-3">
            {filterButtons.map(btn => (
              <button
                className={
                  `p-3 text-md font-bold shadow-md bg-zinc-800 border border-zinc-700 rounded-md hover:bg-zinc-900 active:scale-95 active:opacity-70 transition
                  ${filter.day === btn.title? "bg-zinc-600": ""}`
                }
                key={btn.title}
                onClick={() => {
                    setFilter({day: btn.title})
                }}
              >
                {btn.title}
              </button>
            ))}
            
          </header>
          <div  className="shrink-0 flex overflow-x-auto no-scrollbar gap-3">
            {
              sortByList.map(btn => (
                <button
                  className={
                    `p-3 text-md font-bold shadow-md bg-zinc-800 border border-zinc-700 rounded-md hover:bg-zinc-900 active:scale-95 active:opacity-70 transition
                    ${filter.sort === btn.sortBy? "bg-zinc-600": ""}`
                  }
                  key={btn.sortBy}
                  onClick={() => {
                      setFilter({sort: btn.sortBy})
                  }}
                >
                  {btn.sortBy}
                </button>
              ))
            }
          </div>
          <div className="w-full p-3 bg-zinc-700 rounded-md">
            <input className="w-full outline-none bg-transparent" value={secondFiler.search} onChange={(e) => setSecondFilter({search: e.target.value})} />
          </div>
          <div className='flex-1 flex-col flex gap-3'>
            <div className="w-full p-3 bg-zinc-700 rounded-md">
              {JSON.stringify(filter)}
            </div>
            <div className="w-full p-3 bg-zinc-700 rounded-md">
              Rerender count: {renderCount.current}
            </div>
            <div className='[&>*]:flex-1 flex gap-3'>
                <button 
                  className="bg-zinc-800 rounded-md border-zinc-700 border p-3"
                  onClick={() => setCounter({})}
                >
                  Rerender
                </button>
                 <button 
                  className="bg-zinc-800 rounded-md border-zinc-700 border p-3"
                  onClick={() => {
                    renderCount.current = 0
                    setCounter({})
                  }}
                >
                  Reset render count
                </button>             
            </div>
          </div>
        </div>
    )
  }

  const sortByList: {sortBy: SortBy}[] = [
    {
      sortBy: "Price",
    },
    {
      sortBy: "Time",
    }
  ]