import logo from './logo.svg';
import './App.css';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import HomeScreen from './Pages/Home';
import { Routes,Route } from 'react-router-dom';
import { AuthProvider,useAuth } from './Store/auth';
import { Navigate } from 'react-router-dom';
import QuesAns from './Pages/QuestionAnswer';
import Add from './Pages/Add';
import Edit from './Pages/Edit';
import { Suspense,lazy } from 'react';


const Component1 = lazy(() => import('../src/Pages/QuestionAnswer'));

function App() {
  return (
   
      <AuthProvider>
        <CoustomRoutes />
      </AuthProvider>
   
  );
}

  const CoustomRoutes = () => {
    const { isToken } = useAuth();
 
    return (
        <Routes>
            <Route path="/" element={isToken ? <Navigate to="/Dashboard" /> : <Signup />} />
            <Route path="/login" element={isToken ? <Navigate to="/Dashboard"/> : <Login />} />
            <Route path='/QUesAns' element={ isToken ?<QuesAns/> :<Navigate to="/login"/>}/>
            <Route path="/Dashboard" element={isToken ? <HomeScreen /> : <Navigate to="/login"/>} />
            <Route path="/Add" element={ isToken ? <Add /> : <Navigate to="/login"/>} />
            <Route path="/Edit" element={ isToken ? <Edit/> : <Navigate to="/login"/>} />
        </Routes>
    );
  }


export default App;
