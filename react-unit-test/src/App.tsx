import useCounter from './useCounter';

function App() {

  const [count, increment, decrement] = useCounter();

  return (
    <div>
      <div>
        <h3 className="App-link">learn react</h3>
        {count}
      </div>
      <div>
        <button onClick={() => increment(1)}>加一</button>
        <button onClick={() => decrement(2)}>减二</button>
      </div>
    </div>
  );
}

export default App;
