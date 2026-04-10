/** @format */

import { useState, useEffect } from "react";
// import axios from "axios";
import { Header } from "./components/Header";
import { Forms } from "./components/Forms";
import { Lists } from "./components/Lists";
import type { Task } from "./types/task";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/task/getAllTask`)
      .then((res) => res.json())
      .then((data: Task[]) => {
        setTasks(data.map((t) => ({ ...t, status: Boolean(t.status) })));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <main className='min-h-screen bg-[#f7f8fb] px-4 py-14 sm:px-6'>
      <div className='mx-auto w-full max-w-[36rem] overflow-hidden rounded-[22px] border border-slate-200/80 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.08)]'>
        <Header />
        <Forms setTasks={setTasks} />
        {loading ? (
          <div className='p-10 text-center'>
            <p className='text-lg text-slate-500'>Loading tasks...</p>
          </div>
        ) : (
          <Lists tasks={tasks} setTasks={setTasks} />
        )}
      </div>
    </main>
  );
}

export default App;
