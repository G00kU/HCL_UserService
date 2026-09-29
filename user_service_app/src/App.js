import "./App.css";
import Button from "./Components/button";
import Login from "./Pages/Login";
import CreateUser from "./User/CreateUser";
import UserList from "./User/UserList";
const users = [
  {
    id: 1,
    name: "Gokul",
    age: 28,
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600001",
  },
  {
    id: 2,
    name: "Arun Kumar",
    age: 32,
    city: "Coimbatore",
    state: "Tamil Nadu",
    pincode: "641001",
  },
];
function App() {
  return (
    <div className="App">
      {/* <Login></Login> */}
      {/* <CreateUser></CreateUser> */}
      <UserList users={users}></UserList>
    </div>
  );
}

export default App;
