import { useContext, useState, FC, createContext, PropsWithChildren, useCallback, memo } from 'react'

import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DummyProvider>
          <NoUseContextComponent />
          <UseContextComponent />
          <MemoComponent />
          <MemoContextComponent />
          <Handler />
        </DummyProvider>
      </header>
    </div>
  )
}

interface ChildComponentProps {
  name: string
}
const ChildComponent: FC<ChildComponentProps> = ({ name }) => {
  console.log(name)
  return <h3>{name}</h3>
}

const NoUseContextComponent: FC = () => {
  console.log('NoUseContextComponent')
  return (
    <div>
      <h3>
        Not using <code>useContext</code>
      </h3>
      <ChildComponent name="Child Of Memo Context Component" />
    </div>
  )
}

const UseContextComponent: FC = () => {
  console.log('UseContextComponent')
  const { count } = useContext<IDummyContext>(DummyContext)
  return (
    <div>
      <h3>{count}</h3>
      <ChildComponent name="Child of Use Context Component" />
    </div>
  )
}

const MemoComponent: FC = memo(() => {
  console.log('MemoComponent')
  return (
    <div>
      <h3>Memo</h3>
      <ChildComponent name="Child of Memo Component" />
    </div>
  )
})

const MemoContextComponent: FC = memo(() => {
  console.log('MemoContextComponent')
  const { count } = useContext<IDummyContext>(DummyContext)
  return (
    <div>
      <h3>{count}</h3>
      <ChildComponent name="Child Of Memo Context Component" />
    </div>
  )
})

const Handler: FC = () => {
  console.log('Handler')
  const { increment, decrement } = useContext<IDummyContext>(DummyContext)
  return (
    <div style={{ display: 'flex' }}>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  )
}

interface IDummyContext {
  count: number
  increment: () => void
  decrement: () => void
}
const DummyContext = createContext<IDummyContext>({} as IDummyContext)

const DummyProvider: FC<PropsWithChildren> = ({ children }) => {
  const [count, setCount] = useState<number>(0)
  const increment = useCallback(() => {
    setCount((currentCount) => currentCount + 1)
  }, [])
  const decrement = useCallback(() => {
    setCount((currentCount) => currentCount - 1)
  }, [])

  return <DummyContext.Provider value={{ count, increment, decrement }}>{children}</DummyContext.Provider>
}

export default App
