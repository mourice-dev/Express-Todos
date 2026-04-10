/** @format */
import { type Dispatch, type SetStateAction, useState } from "react";
import type { Task } from "../types/task";

interface ListsProps {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

export function Lists({ tasks, setTasks }: ListsProps) {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTaskText, setEditedTaskText] = useState<string>("");

  async function toggleChecked(id: number) {
    await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/task/statusTask/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      },
    );

    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  async function deleteHandle(id: number) {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/task/deleteTask/${id}`,
        {
          method: "DELETE",
        },
      );

      const remains = tasks.filter((task) => task.id !== id);
      setTasks(remains);
    }
  }

  function editHandle(task: Task) {
    setEditingTaskId(task.id);
    setEditedTaskText(task.task);
  }

  async function saveHandle(id: number) {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/task/updateTask/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: editedTaskText }),
      },
    );
    const updatedTask = await response.json();
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditedTaskText("");
  }

  return (
    <section className='px-8 pb-8 pt-8 sm:px-10 sm:pb-10'>
      {tasks.length === 0 ? (
        <div className='rounded-[16px] border border-dashed border-slate-200 bg-slate-50 p-10 text-center'>
          <h3 className='text-lg font-medium text-slate-700'>No tasks yet</h3>
          <p className='mt-2 text-sm text-slate-500'>
            Add a new task to get started.
          </p>
        </div>
      ) : (
        <ul className='space-y-4'>
          {tasks.map((task) => {
            const checkboxId = `task-${task.id}`;

            return (
              <li
                key={task.id}
                className='rounded-[16px] border border-slate-200 bg-white px-4 py-4 shadow-[0_4px_10px_rgba(15,23,42,0.03)] transition hover:border-slate-300'>
                <div className='flex items-center'>
                  <label
                    className='relative flex cursor-pointer items-center'
                    htmlFor={checkboxId}>
                    <input
                      id={checkboxId}
                      className='peer sr-only'
                      type='checkbox'
                      checked={task.status}
                      onChange={() => toggleChecked(task.id)}
                    />
                    <span className='flex h-6 w-6 items-center justify-center rounded-[4px] border border-slate-400 bg-white text-white transition peer-checked:border-[#3267e3] peer-checked:bg-[#3267e3]'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4'
                        viewBox='0 0 20 20'
                        fill='currentColor'>
                        <path
                          fillRule='evenodd'
                          d='M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.415 0l-3.2-3.2a1 1 0 111.414-1.42l2.493 2.49 6.493-6.49a1 1 0 011.415 0z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </span>
                  </label>
                  {editingTaskId === task.id ? (
                    <input
                      type='text'
                      value={editedTaskText}
                      onChange={(e) => setEditedTaskText(e.target.value)}
                      className='ml-4 flex-1 rounded-[10px] border border-slate-300 px-2 py-1 text-[1.05rem] font-medium tracking-[-0.02em] text-slate-900 outline-none focus:border-[#9db8ff] focus:ring-4 focus:ring-[#dbe6ff]'
                    />
                  ) : (
                    <label
                      htmlFor={checkboxId}
                      className={`ml-4 block flex-1 text-[1.05rem] font-medium tracking-[-0.02em] ${
                        task.status
                          ? "text-slate-400 line-through decoration-1"
                          : "text-slate-900"
                      }`}>
                      {task.task}
                    </label>
                  )}

                  {editingTaskId === task.id ? (
                    <button
                      onClick={() => saveHandle(task.id)}
                      className='ml-4 rounded-[10px] p-2 text-slate-400 transition hover:bg-slate-100 hover:text-green-500'>
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => editHandle(task)}
                      className='ml-4 rounded-[10px] p-2 text-slate-400 transition hover:bg-slate-100 hover:text-blue-500'>
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => deleteHandle(task.id)}
                    className='ml-2 rounded-[10px] p-2 text-slate-400 transition hover:bg-slate-100 hover:text-red-500'
                    aria-label='Delete task'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      viewBox='0 0 20 20'
                      fill='currentColor'>
                      <path
                        fillRule='evenodd'
                        d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
                    type='button'
                    aria-label={`Delete ${task.task}`}
                    onClick={() => deleteHandle(task.id)}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      viewBox='0 0 20 20'
                      fill='currentColor'>
                      <path
                        fillRule='evenodd'
                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      }
    </section>
  );
}
