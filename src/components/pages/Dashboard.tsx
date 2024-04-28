import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../utilities/api";
import { useUser } from "../utilities/UserContext";
import { useEffect, useState, useCallback } from "react";
import MyFlows from "../sections/MyFlows";
import { FlowType } from "../sections/MyFlows";
import { showAllFlowsAPI } from "../utilities/api";
import Builder from "../sections/Builder";
import Preview from "../sections/Preview";

export default function Dashboard() {
  const navigate = useNavigate();
  const { authState, dispatch } = useUser();
  const [pageState, setPageState] = useState("all-flows");
  const [flows, setFlows] = useState<FlowType[]>([]);

  // Display all flows
  const showAllFlows = useCallback(() => {
    // API call to fetch flows
    showAllFlowsAPI(authState, setFlows);
  }, [authState]);

  useEffect(() => {
    if (!authState.dataLoading && authState.isLoggedIn) {
      showAllFlows();
    }
  }, [authState.dataLoading, authState.isLoggedIn, showAllFlows]);

  function handleHomeLink() {
    navigate("/");
  }

  function handleLogout() {
    logout(dispatch);
  }

  function handleDesigningClick() {
    setPageState("designing");
  }

  function handleFlowsClick() {
    setPageState("all-flows");
  }

  function handleMovingClick() {
    setPageState("moving");
  }

  function handlePreferencesClick() {
    setPageState("preferences");
  }

  function handleThemeClick() {
    setPageState("theme");
  }

  function handleCatalogClick() {
    setPageState("catalog");
  }

  useEffect(() => {
    if (!authState.dataLoading && !authState.isLoggedIn) {
      navigate("/sign-in");
    }
  }, [authState, navigate]);

  return (
    <div className="flex h-full">
      <div
        className=" hide-scrollbar h-full w-64 overflow-auto border-r-[1px] border-[#323232]"
        id="sidebar"
      >
        <div className=" flex h-12 max-h-12 items-center justify-start border-b-[1px] border-[#323232] pl-4">
          <Link
            className=" flex h-full w-[100px] items-center justify-center text-[25px] font-bold text-[#6ccc93]  hover:text-[#6ccc93]"
            to="/"
            onClick={handleHomeLink}
          >
            YoGato
          </Link>
        </div>
        <nav>
          <ul>
            <div className="border-b-[1px] border-[#323232] px-6 py-5">
              <div className="mb-3">
                {" "}
                <p className="text-start text-sm font-medium text-[#7e7e7e]">
                  Practice
                </p>
              </div>
              <ul className="flex w-full flex-col space-y-2">
                <div className="flex items-center justify-start">
                  {" "}
                  <p
                    onClick={handleFlowsClick}
                    className="w-full text-start text-sm font-medium text-[#a0a0a0] hover:cursor-pointer hover:text-[white]"
                  >
                    All flows
                  </p>
                </div>
                <div className="flex items-center justify-start">
                  {" "}
                  <p
                    onClick={handleDesigningClick}
                    className="w-full text-start text-sm font-medium text-[#a0a0a0] hover:cursor-pointer hover:text-[white]"
                  >
                    Designing
                  </p>
                </div>

                <div className="flex w-full items-center justify-start">
                  {" "}
                  <p
                    onClick={handleMovingClick}
                    className="w-full text-start text-sm font-medium text-[#a0a0a0] hover:cursor-pointer hover:text-[white]"
                  >
                    Moving
                  </p>
                </div>
              </ul>
            </div>
            <div className="border-b-[1px] border-[#323232] px-6 py-5">
              <div className="mb-3">
                {" "}
                <p className=" text-start text-sm font-medium text-[#7e7e7e]">
                  Account
                </p>
              </div>
              <ul className="space-y-2">
                <div className="flex items-center justify-start">
                  {" "}
                  <p
                    onClick={handlePreferencesClick}
                    className="w-full text-start text-sm font-medium text-[#a0a0a0] hover:cursor-pointer hover:text-[white]"
                  >
                    Preferences
                  </p>
                </div>
                <div className="flex items-center justify-start">
                  {" "}
                  <p
                    onClick={handleThemeClick}
                    className="w-full text-start text-sm font-medium text-[#a0a0a0] hover:cursor-pointer hover:text-[white]"
                  >
                    Theme
                  </p>
                </div>
              </ul>
            </div>
            <div className="border-b-[1px] border-[#323232] px-6 py-5">
              <div className="mb-3">
                {" "}
                <p className=" text-start text-sm font-medium text-[#7e7e7e]">
                  Library
                </p>
              </div>
              <ul className="space-y-2">
                <div className="flex items-center justify-start">
                  {" "}
                  <p
                    onClick={handleCatalogClick}
                    className=" w-full text-start text-sm font-medium text-[#a0a0a0] hover:cursor-pointer hover:text-[white]"
                  >
                    Catalog of poses
                  </p>
                </div>
                <div className="flex items-center justify-start">
                  {" "}
                  <p className=" w-full text-start text-sm font-medium text-[#a0a0a0] hover:cursor-pointer hover:text-[white]">
                    Blogs
                  </p>
                </div>
              </ul>
            </div>
            <div className="border-b-[1px] border-[#323232] px-6 py-5">
              <div className="flex items-center justify-start">
                {" "}
                <p
                  className="flex w-full items-center justify-start gap-[4px] text-start text-sm font-medium text-[#a0a0a0] hover:cursor-pointer hover:text-[white]"
                  onClick={handleLogout}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    logout
                  </span>
                  Log out
                </p>
              </div>
            </div>
          </ul>
        </nav>
      </div>
      <div className="flex-1  overflow-auto" id="canvas">
        <div className="flex h-12 max-h-12 items-center justify-start border-b-[1px] border-[#323232] pl-4">
          <p>breadcrumbs placeholder</p>
        </div>
        <Wrapper>
          {pageState === "all-flows" ? (
            <>
              <MyFlows
                showAllFlows={showAllFlows}
                flows={flows}
                handleDesigningClick={handleDesigningClick}
                handleMovingClick={handleMovingClick}
              />
            </>
          ) : pageState === "designing" ? (
            <>
              <Builder
                showAllFlows={showAllFlows}
                handleMovingClick={handleMovingClick}
              ></Builder>
            </>
          ) : pageState === "moving" ? (
            <>
              <Preview handleDesigningClick={handleDesigningClick}></Preview>
            </>
          ) : pageState === "preferences" ? (
            <>
              <p>preferences</p>
            </>
          ) : pageState === "theme" ? (
            <>
              <p>theme</p>
            </>
          ) : pageState === "catalog" ? (
            <>
              <p>catalog</p>
            </>
          ) : (
            <>
              <p>no such page</p>
            </>
          )}
        </Wrapper>
      </div>
    </div>
  );
}

function Wrapper({ children }) {
  return (
    <div className="ml-auto mr-auto flex w-full max-w-screen-2xl justify-center overflow-auto p-6">
      <div className="w-full">{children}</div>
    </div>
  );
}
