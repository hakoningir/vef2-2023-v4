import { useState, useEffect } from 'react';
import { generateApiUrl } from '../../utils/generateApiUrl';
import { DepartmentForm } from './DepartmentForm';
export function Departments({ title, description }) {
  // type State = 'empty' | 'data' | 'error' | 'loading'
  const [state, setState] = useState('empty');
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await fetchDepartments();
    }
    fetchData();
  }, []);

  async function fetchDepartments() {
    setState('loading');
    try {
      // await sleep(2)
      // const response = await fetch(generateApiUrl('/Departments/'));
      const response = await fetch(generateApiUrl("https://hus.onrender.com"));
      if (!response.ok) {
        throw new Error('not ok');
      }
      const json = await response.json();
      console.log(json)
      setDepartments(json);
      setState('data');
    } catch (e) {
      setState('error');
      console.log(e);
    }
  }

  return (
    <section>
      <h2>{title}</h2>
      {state === 'empty' && <p>Engar deildir</p>}
      {state === 'error' && <p>Villa við að sækja deildir</p>}
      {state === 'loading' && <p>Sæki deildir...</p>}
      <ul>
        {state === 'data' &&
          departments.map((department, i) => {
            return <li key={i}>{department.title}</li>;
          })}
      </ul>
      <button onClick={() => DepartmentForm}>Ný deild</button>
    </section>
  );
}