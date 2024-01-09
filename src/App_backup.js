import ShipRender from './components/ships/ShipRender';
import UserInfo from './components/user/UserInfo';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <UserInfo/>
        <ShipRender />
      </header>
    </div>
  );
}

export default App;
