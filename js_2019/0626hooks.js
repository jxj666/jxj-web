import { useState, useEffect } from 'react';

function Example () {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });
  return (
    <p> {count} </p>
    <button onClick={() => setCount(count + 1)}>
      Click me
      </button>
  );
}