import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import AddTaskPage from './pages/AddTaskPage'
import TaskListPage from './pages/TaskListPage'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path='/' element={<TaskListPage />}></Route>
            <Route path='/AddTask' element={<AddTaskPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
