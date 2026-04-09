/** @format */

import { useState, useEffect } from "react";
// import axios from "axios";
import { Header } from "./components/Header";
import { Forms } from "./components/Forms";
import { Lists } from "./components/Lists";


function App() {
  interface Task {
    id: number;
    task: string;
    status: boolean;
  }
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/task/getAllTask`)
      .then((res) => res.json())
      .then((data: Task[]) =>
        setTasks(data.map((t) => ({ ...t, status: Boolean(t.status) })))
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className='min-h-screen bg-[#f7f8fb] px-4 py-14 sm:px-6'>
      <div className='mx-auto w-full max-w-[36rem] overflow-hidden rounded-[22px] border border-slate-200/80 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]'>
        <Header />
        <Forms setTasks={setTasks} />
        <Lists tasks={tasks} setTasks={setTasks} />
      </div>
    </main>
  );
}

export default App;
