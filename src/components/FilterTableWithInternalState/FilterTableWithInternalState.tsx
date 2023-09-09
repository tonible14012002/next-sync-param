
import { useRouter } from "next/router";
import { useRef, useEffect, useState, useMemo } from "react";

type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
type SortBy = "Price" | "Time"
interface QueryFilter {
  day?: DayOfWeek
  sort?: SortBy
}

const DAY_OF_WEEK: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const SORT_FIELDS: SortBy[] = ["Price", "Time"]

export function FilterTableWithInternalState() {
    const { query, push } = useRouter()
    const { day, sort } = query as QueryFilter
    const renderCount = useRef(0)
    renderCount.current += 1
  
    const [ _, setCounter ] = useState<{}>({})
  
    const [ validDay, setValidDay ] = useState<DayOfWeek>("Monday")
    const [ validSort, setValidSort ] = useState<SortBy>("Price")

    const syncStateOnLoad = () => {
        const isValidDay = DAY_OF_WEEK.findIndex(d => d === day) !== -1
        const isValidSort = SORT_FIELDS.findIndex(s => s === sort) !== -1
        if (!isValidDay) {
            setValidDay(day as DayOfWeek)
        }
        if (!isValidSort) {
          setValidSort(sort as SortBy)
        }
    }

    const syncParamOnStateChange = () => {
        if (day == validDay) return
        push({
            query: {
                ...query,
                day: validDay
            }
        }, undefined, { shallow: true })
    }

    const syncSortByStateChange = () => {
        if (sort == validSort) return
        push({
            query: {
                ...query,
                sort: validSort
            }
        }, undefined, { shallow: true })
    }
  
    const handleUpdateParams = (day: DayOfWeek) => {
        setValidDay(day)
    }
  
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
  
    useEffect(syncStateOnLoad, [day, sort]) // Sync state with param on Params change
    useEffect(syncParamOnStateChange, [day, push, query, validDay]) // Sync url params on state changed
    useEffect(syncSortByStateChange, [push, query, sort, validSort])
  
    console.log("rerender")
    return (
        <div className='flex flex-col w-full max-h-[800px] min-h-[400px] overflow-y-auto no-scrollbar max-w-[600px] gap-3'>
          <header className="shrink-0 flex overflow-x-auto no-scrollbar gap-3">
            {filterButtons.map(btn => (
              <button
                className={
                  `p-3 text-md font-bold shadow-md bg-zinc-800 border border-zinc-700 rounded-md hover:bg-zinc-900 active:scale-95 active:opacity-70 transition
                  ${validDay === btn.title? "bg-zinc-700": ""}`
                }
                key={btn.title}
                onClick={() => {
                  handleUpdateParams(btn.title)
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
                    ${validSort === btn.sortBy? "bg-zinc-600": ""}`
                  }
                  key={btn.sortBy}
                  onClick={() => {
                      setValidSort(btn.sortBy)
                  }}
                >
                  {btn.sortBy}
                </button>
              ))
            }
          </div>
          <div className='flex-1 flex-col flex gap-3'>
            <div className="w-full p-3 bg-zinc-700 rounded-md">
              {JSON.stringify({validDay, validSort})}
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