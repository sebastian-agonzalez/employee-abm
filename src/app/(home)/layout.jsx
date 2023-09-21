import { ActionStatsBar, Header, AppLogo, LoadingScreen } from "@/components";
import { AiOutlineRotateLeft } from "react-icons/ai";

export default function HomeLayout({ children }) {

  return (
    <>
      {/*  */}
      <div
        id="portrait-placeholder"
        className={"flex justify-center items-center w-full h-screen"}
      >
        <div className="rotate-90 text-center animate-pulse">
          <AppLogo />
          <div className="my-4"></div>
          <p className="text-xl">
            Rotate screen to use app{" "}
            <AiOutlineRotateLeft className="inline"></AiOutlineRotateLeft>
          </p>
        </div>
      </div>
      {/*  */}
      <div id="app-content" className="flex-col h-screen">
        <Header></Header>
        <main className="flex-1 my-1 bg-gradient-to-r from-pink-200 to-blue-200 flex flex-col">
          <section className="bg-white">
            <ActionStatsBar></ActionStatsBar>
          </section>
          <section className="grid-bg flex-1">
            <div className="my-6"></div>
            <div className="pb-10">{children}</div>
          </section>
        </main>
      </div>
      {/*  */}
      <LoadingScreen />
    </>
  );
}
