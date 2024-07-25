import { RouterProvider } from 'react-router-dom';
import './App.css';
import { AppRoutes } from './routes/AppRoutes';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
function App() {
  return <RouterProvider router={AppRoutes} fallbackElement={<p>Loading...</p>} />;
}

export default App;
