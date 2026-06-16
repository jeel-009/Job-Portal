
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Log from './components/auth/Log'
import Sign from './components/auth/Sign'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Company from './components/recruiter/company'
import CompanyCreate from './components/recruiter/CompanyTable'
import CreateComapny from './components/recruiter/CreateComapny'
import CompanySetup from './components/recruiter/CompanySetup'
import AdminJob from './components/recruiter/AdminJob'
import PostJob from './components/recruiter/PostJob'
import Applicants from './components/recruiter/Applicants'
import RouterProtect from './components/recruiter/RouterProtect'
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>
  },
  {
    path: '/Log',
    element: <Log></Log>
  },
  {
    path: '/Sign',
    element: <Sign></Sign>
  },
  {
    path: '/jobs',
    element: <Jobs />
  },
  {
    path: '/jobdescription/:id',
    element: <JobDescription />
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  //recruites(admin) side
  {
    path: '/admin/companies',
    element:<RouterProtect><Company /></RouterProtect> 
  },
  {
    path: '/admin/companies/create',
    element: <CreateComapny />
  },
  {
    path: '/admin/companies/:id',
    element: <CompanySetup />
  },
  {
    path: '/admin/jobs',
    element: <AdminJob />
  },
  {
    path: '/admin/job/create',
    element: <PostJob />
  },
  {
    path:'/admin/jobs/:id/applicants',
    element:<Applicants/>

  }

])

function App() {

  return (
    <>
      <RouterProvider router={appRouter}></RouterProvider>
    </>
  )
}

export default App
