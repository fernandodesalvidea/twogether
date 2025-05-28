// Updated Dashboard.jsx with animated expand/collapse for lists
import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import { Transition } from '@headlessui/react'

export default function Dashboard({ user }) {
  const [lists, setLists] = useState([])
  const [newListName, setNewListName] = useState('')
  const [expandedListId, setExpandedListId] = useState(null)
  const [todosByList, setTodosByList] = useState({})
  const [newTodo, setNewTodo] = useState('')
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)

  useEffect(() => {
    fetchLists()
  }, [])

  async function fetchLists() {
    const { data, error } = await supabase
      .from('lists')
      .select('*')
      .eq('created_by', user.id)

    if (error) console.error(error)
    else setLists(data)
  }

  async function fetchTodosForList(listId) {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('list_id', listId)

    if (error) console.error(error)
    else setTodosByList((prev) => ({ ...prev, [listId]: data }))
  }

  function toggleList(list) {
    const alreadyOpen = expandedListId === list.id
    setExpandedListId(alreadyOpen ? null : list.id)

    if (!alreadyOpen && !todosByList[list.id]) {
      fetchTodosForList(list.id)
    }
  }

  async function addList(e) {
    e.preventDefault()
    if (!newListName) return

    const { error } = await supabase.from('lists').insert([
      { name: newListName, created_by: user.id },
    ])

    if (!error) {
      setNewListName('')
      fetchLists()
    }
  }

  async function deleteList(listId) {
    await supabase.from('todos').delete().eq('list_id', listId)
    const { error } = await supabase.from('lists').delete().eq('id', listId)
    if (!error) {
      if (expandedListId === listId) setExpandedListId(null)
      setConfirmDeleteId(null)
      fetchLists()
    }
  }

  async function addTodo(listId, e) {
    e.preventDefault()
    if (!newTodo) return

    const { error } = await supabase.from('todos').insert([
      {
        content: newTodo,
        list_id: listId,
        created_by: user.id,
      },
    ])

    if (!error) {
      setNewTodo('')
      fetchTodosForList(listId)
    }
  }

  async function toggleComplete(todo, listId) {
    const { error } = await supabase
      .from('todos')
      .update({ completed: !todo.completed })
      .eq('id', todo.id)

    if (!error) fetchTodosForList(listId)
  }

  async function deleteTodo(todoId, listId) {
    const { error } = await supabase.from('todos').delete().eq('id', todoId)
    if (!error) fetchTodosForList(listId)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 text-slate-800 dark:text-slate-100">
      <h2 className="text-2xl font-bold mb-4 text-center">Your To-Do Lists 📝</h2>

      <form onSubmit={addList} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="New list name"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          className="flex-grow px-4 py-2 border dark:bg-slate-800 border-slate-300 dark:border-slate-700 rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add List
        </button>
      </form>

      {lists.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400">
          <h3 className="text-xl font-semibold mb-2">Welcome to TwoDo 💖</h3>
          <p>You're all set up — now create your first shared list!</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {lists.map((list) => (
            <li key={list.id} className="bg-white dark:bg-slate-800 shadow rounded p-4">
              <div className="flex justify-between items-center">
                <button
                  className="text-lg font-medium text-left flex-grow hover:underline"
                  onClick={() => toggleList(list)}
                >
                  {expandedListId === list.id ? '▼' : '▶'} {list.name}
                </button>
                <button
                  onClick={() => setConfirmDeleteId(list.id)}
                  className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900 p-1 rounded"
                >
                  <span className="text-xl font-bold">−</span>
                </button>
              </div>

              <Transition
                show={expandedListId === list.id}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 max-h-0"
                enterTo="opacity-100 max-h-screen"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 max-h-screen"
                leaveTo="opacity-0 max-h-0"
              >
                <div className="mt-4 overflow-hidden">
                  <form
                    onSubmit={(e) => addTodo(list.id, e)}
                    className="flex gap-2 mb-3"
                  >
                    <input
                      type="text"
                      placeholder="New task"
                      value={newTodo}
                      onChange={(e) => setNewTodo(e.target.value)}
                      className="flex-grow px-3 py-2 border dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Add Task
                    </button>
                  </form>

                  <ul className="space-y-2">
                    {todosByList[list.id]?.map((todo) => (
                      <li key={todo.id} className="flex justify-between items-center">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleComplete(todo, list.id)}
                          />
                          <span
                            className={`$ {
                              todo.completed ? 'line-through text-gray-400' : ''
                            }`}
                          >
                            {todo.content}
                          </span>
                        </label>
                        <button
                          onClick={() => deleteTodo(todo.id, list.id)}
                          className="text-red-400 hover:text-red-600"
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </Transition>

              {confirmDeleteId === list.id && (
                <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 rounded">
                  <p className="mb-2">Are you sure you want to delete this list?</p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => deleteList(list.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Yes, delete
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(null)}
                      className="px-3 py-1 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
