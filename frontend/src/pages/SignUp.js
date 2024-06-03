import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import loginIcons from "../assest/signin.gif";
import { imageTobase64 } from "../helpers/imageTobase64";

const SignUp = () => {
  const [shadowPassword, setshadowPassword] = useState(false);
  const [shadowConfirmPassword, setshadowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    ConfirmPassword: "",
    name: "",
    profilepic: "",
  });

  const hendelOnechange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const hendleUplodepic = async (e) => {
    const file = e.target.files[0];
    const imagepic = await imageTobase64(file);

    setData((preve) => {
      return {
        ...preve,
        profilepic: imagepic,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  console.log(data);
  return (
    <section id="signUp">
      <div className=" mx-auto container p-4 ">
        <div className="bg-white  p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilepic || loginIcons} alt="Login icom" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-80 pb-4 pt-2 cursor-pointer bg-slate-200 py-4 text-center absolute bottom-0 w-full">
                  uplode photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={hendleUplodepic}
                />
              </label>
            </form>
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name:</label>
              <div className="bg-slate-100 p-2">
                <input
                  onChange={hendelOnechange}
                  name="name"
                  value={data.name}
                  type="name"
                  required
                  placeholder="enter Name"
                  className="w-full h-full outline-none bg-transparent"
                ></input>
              </div>
            </div>
            <div className="grid">
              <label>email:</label>
              <div className="bg-slate-100 p-2">
                <input
                  onChange={hendelOnechange}
                  name="email"
                  value={data.email}
                  type="email"
                  required
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
                  required
                  className="w-full h-full outline-none bg-transparent"
                ></input>
                <div
                  className="cursor-pointer text-lg"
                  onClick={() => setshadowPassword((preve) => !preve)}
                >
                  <span>{shadowPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <div>
              <label>ConfirmPassword:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={shadowConfirmPassword ? "text" : "password"}
                  placeholder="enter ConfirmPassword"
                  onChange={hendelOnechange}
                  name="ConfirmPassword"
                  value={data.ConfirmPassword}
                  required
                  className="w-full h-full outline-none bg-transparent"
                ></input>
                <div
                  className="cursor-pointer text-lg"
                  onClick={() => setshadowConfirmPassword((preve) => !preve)}
                >
                  <span>
                    {shadowConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <button className="bg-red-600 text-white px-6  py-2 max-w-[150px] : rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-700">
              sign up
            </button>
          </form>
          <p className="my-4">
            Already have account ?
            <Link
              to={"/login"}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
