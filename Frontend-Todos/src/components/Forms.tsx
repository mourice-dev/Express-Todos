/** @format */

import {
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
// import type { Task } from "../types/task";

interface Task {
  id: number;
  task: string;
  status: boolean;
}

interface FormsProps {
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

export function Forms({ setTasks }: FormsProps) {
  async function submitHandle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const task = formData.get("task-input");

    if (typeof task === "string" && task.trim() !== "") {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/task/insertTask`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ task: task, status: false }),
        },
      );
      const newTask = await response.json();
      setTasks((prev) => [...prev, newTask]);

      form.reset();
    }
  }

  return (
    <section className='px-8 pt-8 sm:px-10'>
      <form
        className='flex flex-col gap-3 sm:flex-row sm:items-center'
        onSubmit={submitHandle}>
        <input
          className='h-13 flex-1 rounded-[14px] border border-slate-200 bg-white px-5 text-[1.05rem] text-slate-700 placeholder:text-slate-400 outline-none transition focus:border-[#9db8ff] focus:ring-4 focus:ring-[#dbe6ff]'
          type='text'
          name='task-input'
          placeholder='Add a new task...'
          required
        />
        <button
          className='inline-flex h-13 items-center justify-center gap-2 rounded-[14px] bg-[#93aff7] px-6 text-[1.05rem] font-semibold text-white transition hover:bg-[#7f9ff5] focus:outline-none focus:ring-4 focus:ring-[#dbe6ff] sm:self-auto'
          type='submit'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            viewBox='0 0 20 20'
            fill='currentColor'>
            <path
              fillRule='evenodd'
              d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
              clipRule='evenodd'
            />
          </svg>
          Add
        </button>
      </form>
    </section>
  );
}
