import { memo } from 'react';
import Student from './pages/Student/student';

const App = () => {
  return (
    <div className="App">
      <Student/>
    </div>
  );
};

export default memo(App);