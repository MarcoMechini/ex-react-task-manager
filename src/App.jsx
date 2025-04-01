import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import AddTaskPage from './pages/AddTaskPage'
import TaskListPage from './pages/TaskListPage'
import { GlobalProvider } from './context/GlobalContext'
import TaskDetail from './pages/TaskDetail'


function App() {

  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path='/' element={<TaskListPage />}></Route>
              <Route path='/AddTask' element={<AddTaskPage />}></Route>
              <Route path='/Task/:id' element={<TaskDetail />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
