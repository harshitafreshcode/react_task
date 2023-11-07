// imports
import Employees from './components/Employees';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewEmployee from './components/ViewEmployee';
import AddOrEdit from './components/AddOrEdit';


const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route index element={<Employees />} />
          <Route path='/add' element={<AddOrEdit actionType="Add" />} />
          <Route path='/view/:employeeId' element={<ViewEmployee />} />
          <Route path='/edit/:employeeId' element={<AddOrEdit actionType="Edit" />} />
        </Routes>
      </Router>
    </div>
  )
};

export default App;
