import { Link } from "react-router-dom";
import { LogInForm } from "../sections/LoginPopUp";
import { useUser } from "../utilities/UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function SignIn() {
  const { authState } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.isLoggedIn) {
      navigate("/builder");
    }
  }, [authState.isLoggedIn, navigate]);

  return (
    <>
      <div className="flex h-full w-full">
        <div className="flex w-4/12 min-w-[400px] flex-1 shrink-0 flex-col border-r-[0.5px] border-[#323232] bg-[#1c1c1c] ">
          <div className="h-[60px] p-5">
            <Link
              className=" flex h-full w-[100px] items-center justify-center text-[25px] font-bold text-[#6ccc93]  hover:text-[#6ccc93]"
              to="/"
            >
              YoGato
            </Link>
          </div>
          <div className="mb-auto mt-auto">
            <LogInForm type="page"></LogInForm>
          </div>
          <div className="">
            {" "}
            <p className=" pb-2 pt-2 text-[10px] font-normal text-[#c9c9c9]">
              YoGato @ 2024
            </p>
          </div>
        </div>
        <div className="flex w-8/12 items-center justify-center bg-[#161616]">
          <div className="flex w-[400px] flex-col items-start">
            <blockquote className="text-start text-[30px]  italic">
              &ldquo;To the degree that we look clearly and compassionately at
              ourselves, we feel confident and fearless about looking into
              someone else's eyes&rdquo;
            </blockquote>
            <p className="self-end">Pema Chödrön</p>
          </div>
        </div>
      </div>
    </>
  );
}