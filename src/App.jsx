import { useEffect, useState } from 'react';

import './App.css';

function App() {
  // states to hold the data
  const [todos, setTodos] = useState([]);
  const [newText, setNewText] = useState('');
  const [id, setId] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const [loadMore, setLoadMore] = useState(5); // state for paginating the data 5 at a time todo lists
  const url = 'https://jsonplaceholder.typicode.com/todos/';

  // for fetching a data from API endpoint
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const datas = await response.json();
      setTodos(datas);
    }

    fetchData();
  }, []);

  const handleClick = () => {};
  // for toggling a todo
  const toggleTodo = (index) => {
    const toggledTodo = [...todos];
    toggledTodo[index].completed = !toggledTodo[index].completed;
    setTodos(toggledTodo);
  };
  // console.log({datas});

  // for adding a task
  const addTask = () => {
    if (newText.trim() !== '') {
      const newTask = { id: Date.now, text: newText };
      setTodos([...todos, newTask]);
    }
    setNewText('');
  };

  // for removing a todo from the list on checked
  const removeTodo = (index) => {
    if (index > 0 && index < todos.length) {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
    }
    return true;
  };

  return (
    <>
      <div
        className="todo"
        style={{
          border: '2px solid black',
          height: '300px',
          borderRadius: '5px',
          marginRight: '25px',
          overflow: 'hidden',
          display: 'flex',
        }}
      >
        <div
          className="todoIniput"
          style={{ margin: '50px', marginRight: '25px' }}
        >
          <input
            type="number"
            id="input"
            value={newText}
            onChange={(e) => {
              setId(e.target.value);
            }}
            style={{
              border: '2px solid black',
              borderRadius: '5px',
              padding: '4px',
              padding: '6px',
            }}
          />
          <div>
            <button
              onClick={() => fetchData()}
              onClick={() => setIsSubmit(!isSubmit)}
              style={{
                border: '2px solid black',
                margin: '5px',
                backgroundColor: 'blueviolet',
                color: 'white',
                padding: '6px',
                borderRadius: '5px',

                fontSize: '18px',
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="displayTodos" style={{display:'flex', flexDirection:'column' , flexWrap:'nowrap'}}>
        {/* <button onClick={() => setLoadMore((prevCount) => prevCount + 5)}>
          Load More
        </button> */}

        {isSubmit &&
          todos?.map((todo) => (
            <li key={todo.id} style={{ fontFamily: 'sans-serif' , margin:'10px' }}>
              {' '}
              <input type="checkbox" onChange={() => toggleTodo(index)} />{' '}
              {todo.id} -{' '}
              <span style={{ font: 'bold', fontSize: '24px' }}>
                {todo.title}
              </span>
              -{' '}
            </li>
          ))}
      </div>
    </>
  );
}

export default App;
