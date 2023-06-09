import { useState } from 'react';

const URL = 'http://localhost:4000/departments';

export function DepartmentForm() {
  const [state, setState] = useState('empty');
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');

  async function createDepartment(name) {
    setState('loading');
    try {
      const body = {
        title: name,
      };
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        if (response.status >= 400 && response.status < 500) {
          const responseJson = await response.json();
          console.log("responeJson",responseJson);
          setState('error');
          setErrors(responseJson.errors);
        }
      } else {
        const json = await response.json();
        console.log("json",json)
        setState('success');
      }
    } catch (e) {
      setState('error');
      console.log(e);
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    console.log('halló frá formi');
    console.log('senda:', name);

    createDepartment(name);
  };

  const onInputChange = (e) => {
    setName(e.target.value);
  };

  console.log("name",name);

  return (
    <>
      <h2>Ný deild</h2>
      <form onSubmit={onSubmitHandler}>
        <div>
          <label for="name">Nafn</label>
          <input
            id="name"
            type="text"
            value={name}
            defaultValue=""
            onChange={onInputChange}
          />
        </div>
        <button onClick={createDepartment(name)}>Búa til nýja deild</button>
      </form>
      {state === 'empty' && <p>Engar deildir</p>}
      {state === 'error' && (
        <>
          <p>Villa við að búa til deild</p>
          <p>Villur:</p>
          <ul>
            {errors.map((error, i) => {
              return <li key={i}>{error.msg}</li>;
            })}
          </ul>
        </>
      )}
      {state === 'loading' && <p>Bý til deild...</p>}
      {state === 'success' && <p>Bjó til deild!</p>}
    </>
  );
}
