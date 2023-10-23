import LoginForm from "../components/Auth/LoginForm";
import Dashboard from "./Dashboard";
import EventList from "../components/EventList/EventList";

const Home = () => {

  return (
    <>
      {/* <RegisterForm /> */}
      <LoginForm />
      <EventList />
      <Dashboard />
    </>
  );
};

export default Home;
