import React, { useContext, useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import summaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context/context";

const Login = () => {
  const [shadowPassword, setshadowPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigat = useNavigate();
  const { fatchUserDeatils } = useContext(Context);

  const hendelOnechange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataRespons = await fetch(summaryApi.signin.url, {
      method: summaryApi.signin.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataRespons.json();
    if (dataApi.success) {
      toast.success(dataApi.message);
      fatchUserDeatils();
      navigat("/");
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <section id="login">
      <div className=" mx-auto container p-4 ">
        <div className="bg-white  p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 p-2 py-5 mx-auto">
            <img src={loginIcons} alt="Login icom" className="rounded-full" />
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>email:</label>
              <div className="bg-slate-100 p-2">
                <input
                  onChange={hendelOnechange}
                  name="email"
                  value={data.email}
                  type="email"
                  placeholder="email"
                  className="w-full h-full outline-none bg-transparent"
                ></input>
              </div>
            </div>
            <div>
              <label>password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={shadowPassword ? "text" : "password"}
                  placeholder="enter password"
                  onChange={hendelOnechange}
                  name="password"
                  value={data.password}
                  className="w-full h-full outline-none bg-transparent"
                ></input>
                <div
                  className="cursor-pointer text-lg"
                  onClick={() => setshadowPassword((preve) => !preve)}
                >
                  <span>{shadowPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-600"
              >
                forgot password
              </Link>
            </div>

            <button className="bg-red-600 text-white px-6  py-2 max-w-[150px] : rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-700">
              Login
            </button>
          </form>
          <p className="my-4">
            Don't have account?
            <Link
              to={"/sign-up"}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
