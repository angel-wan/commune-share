import Login from "../components/Auth/Login";
import LoginForm from "../components/Auth/LoginForm";
import Dashboard from "./Dashboard";
import EventList from "../components/EventList/EventList";

const Home = () => {
  return (
    <>
    <Login />
      {/* <RegisterForm /> */}
      {/* <LoginForm /> */}
      <EventList />
      {/* <Dashboard /> */}
    </>
  );
};

export default Home;
