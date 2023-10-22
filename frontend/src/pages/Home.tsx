import RegisterForm from "../components/Auth/RegisterForm";
import LoginForm from "../components/Auth/LoginForm";
import Dashboard from "./Dashboard";
const Home = () => {

  return (
    <>
      <RegisterForm />
      <LoginForm />
      <Dashboard />
    </>
  );
};

export default Home;
