import './App.css';
import { Department } from './components/departments/Department';
import { Departments } from './components/departments/Departments';
// import { DepartmentForm } from './components/departments/DepartmentForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Kennsluskráin</h1>
        <Department slug="hagfraedideild" />
        <Department slug="idnadarverkfraedi-velaverkfraedi-og-tolvunarfraedideild" />
        <Department slug="islensku-og-menningardeild" />
        <Department slug="laeknadeild" />
        <Department slug="salfraedideild" />
        <Department slug="stjornmalafraedi" />
        <Department slug="vidskiptafraedi" />
        <Departments title="Nýjustu deildir" />
      </header>
    </div>
  );
}

export default App;