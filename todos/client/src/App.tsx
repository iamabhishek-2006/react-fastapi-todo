import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/SignUp'
import Todos from './pages/Todos'
import SignIn from './pages/SignIn'
import Notfound from './pages/Notfound'
import Header from './components/Header'
import Row from './pages/Row'
import Profile from './pages/Profile'

const App = () => {
  return (
    <div>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Todos />} />
            <Route path="/signUp" element={<Signup />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/row" element={<Row/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="*" element={<Notfound />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App