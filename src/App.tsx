import { useRoutes } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Detail from './pages/Detail';
import NotFound from './pages/NotFound';
import Register from './pages/Register'
import Login from './pages/Login'
import Create from './pages/Create';
import Edit from './pages/Edit';

const routeConfigs = [
  {
    path: '/',
    element: <Home/>,
  },
  {
    path: '/detail/:id',
    element: <Detail/>,
  },
  {//router register
    path: '/register',
    element: <Register/>,
  },
  {//router login
    path: '/login',
    element: <Login/>,
  },
  {//router add
    path: '/create',
    element: <Create/>,
  },
  {//router add
    path: '/edit/:id',
    element: <Edit/>,
  },
  {
    path: '*',
    element: <NotFound/>,
  }
]

function App() {
  const routes = useRoutes(routeConfigs);

  return <div>{routes}
  </div>;
}

export default App
