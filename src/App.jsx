// imports
import Employees from './components/Employees';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewEmployee from './components/ViewEmployee';
import AddOrEdit from './components/AddOrEdit';
import SnackBar from './components/SnackBar';
import { useSelector } from 'react-redux'
import { useEffect } from 'react';

const App = () => {
  const alerts = useSelector(state => state.alerts);

  useEffect(() => {
    console.log('alerts: ', alerts);
  }, [alerts]);

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

      {Boolean(alerts) && (
        <SnackBar status={alerts} />
      )}
    </div>
  )
};

export default App;
