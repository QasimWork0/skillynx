import React from "react";
import ChatComponent from "ui/components/pages/home/ChatComponent";
import useScreenSize from "hooks/ScreenSize";
import { MobileWidth } from "entities/constants";
import ChatComponentMobile from "ui/components/mobile/home/ChatComponentMobile";
import Header from "ui/components/shared/Header";

const Home = () => {
  const { width } = useScreenSize();
  return (
    <>
      {width > MobileWidth ?
        (
          <>
            <Header />
            <ChatComponent />
          </>
        ) :
        <ChatComponentMobile />}
    </>
  );
};

export default Home;
