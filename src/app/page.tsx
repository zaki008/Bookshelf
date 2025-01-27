"use client";
import Filter from "@/components/Filter";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Stats from "@/components/Stats/Stats";
import Table from "@/components/Table";
import Content from "@/ui/Content";
import MainUI from "@/ui/MainUI";
import { useState } from "react";

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toogleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const toogleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className={`${darkMode && "dark"}`}>
      <Header
        darkMode={darkMode}
        toogleDarkMode={toogleDarkMode}
        toogleSidebar={toogleSidebar}
      />
      <Sidebar sidebarOpen={sidebarOpen} />
      <MainUI>
        <Content>
          <Stats darkMode={darkMode} />
          <Filter />
          <Table />
        </Content>
        {/* <Profile /> */}
      </MainUI>
    </div>
  );
};

export default Home;
