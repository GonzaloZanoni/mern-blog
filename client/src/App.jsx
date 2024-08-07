import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
// import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import PostPage from './pages/PostPage'
import ScrollToTop from './components/ScrollToTop'
import Search from './pages/Search'
import Header1 from './components/Header1'
import ConectarteArte from './pages/ConectarteArte'
import ConectarteCiencia from './pages/ConectarteCiencia'
import ConectarteProgramacion from './pages/ConectarteProgramacion'
// import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import OnlyEmployedPrivateRoute from './components/OnlyEmployedPrivateRoute'


export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* <Header /> */}
      <Header1 />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/search' element={<Search />} />
        <Route path='/conectarte-arte' element={<ConectarteArte />} />
        <Route path='/conectarte-ciencia' element={<ConectarteCiencia />} />
        <Route path='/conectarte-programacion' element={<ConectarteProgramacion />} />

        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>

        {/* <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route> */}

        <Route element={<OnlyEmployedPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>

        <Route path='/projects' element={<Projects />} />
        <Route path='/post/:postSlug' element={<PostPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
