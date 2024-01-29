import Avatar from "../Components/UI/Avatar";
import LoginForm from "../features/authentication/LoginForm";
import { useScreen } from "../hooks/useScreen";

const Login = () => {
  const { screen } = useScreen();
  return (
    <div
      className={`${
        screen < 400 ? "w-[90%]" : "w-[380px]"
      } sm:w-[400px] md:w-[500px] mx-auto bg-white dark:bg-gray-900 shadow-md my-[100px] md:my-[60px] py-10 px-[2rem] md:px-[3rem] pt-6 rounded-md`}
    >
      <div className="flex justify-center mb-3">
        <Avatar src={"/Logo.png"} width="3rem" height="3rem" />
      </div>
      <h2 className="text-xl sm:text-2xl font-[500] text-center mb-6">
        Login to your Account
      </h2>
      <LoginForm />
    </div>
  );
};

export default Login;
