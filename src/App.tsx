import './App.css';
import { List, TList } from './components/productList/productList';
import { Header } from './components/headerComponent/header';
import { useState } from "react";

function App() {
  const [list, setList] = useState<TList[]>([]);

  return (
    <div className="App">
      <div className='Wrrap'>
        <Header list={list} setList={setList} />
        <List list={list} setList={setList} />
      </div>
    </div>
  );
}

export default App;
