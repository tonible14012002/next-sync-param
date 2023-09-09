# param-sync-hook

## useSyncState
This hook for creating a state that already sync to the url params
### Usage
```tsx
 // Specify set of valid value

const [ filter, setFilter ] = useSyncState({
    // key: string[]  First element is Default value
    category: ['Big', 'Small', 'Medium'], // Default: 'Big'
    price: ['100-200', '200-400', '400-500'] // Default:  '100-200'
})
// Use: 
// Url: localhost?category=Big&price=100-200
console.log(filter.category) // Big
console.log(filter.category) // 100-200
// SetParams

setFilter({category: 'Medium'})
setFilter({category: 'Medm'}) // typecsript error, value not included in valid values.

```