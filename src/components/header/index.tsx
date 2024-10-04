import Logo from "/src/assets/logo.svg";
import Moon from "/src/assets/icon-moon.svg";
import Sun from "/src/assets/icon-sun.svg";
import Profile from "/src/assets/image-avatar.jpg";
import clsx from "clsx";

function Header(props: {
  darkMode: boolean;
  setDarkMode: (status: boolean) => void;
}) {
  return (
    <div
      className={clsx(
        props.darkMode ? "bg-[#1E2139]" : "bg-[#373B53]",
        "lg:flex-col lg:h-screen lg:w-[6.5rem] lg:mb-0 lg:pr-0 lg:rounded-r-[1.25rem] lg:pb-[2rem] flex justify-between items-center pr-[1.5rem] mb-[2rem] fixed w-screen z-20"
      )}
    >
      <div className="lg:mr-0 relative h-[4.25rem] mr-[1.5rem]">
        <span className="lg:w-[6.5rem] lg:h-[5.25rem] flex h-[4.25rem] w-[4.5rem] bg-[#7C5DFA] rounded-r-[1.25rem]"></span>
        <img
          src={Logo}
          alt="Logo"
          className="lg:top-[2.2rem] lg:left-[2rem] lg:w-[2.2rem] absolute top-[1.2rem] left-[1.25rem] z-10"
        />
        <span className="lg:w-[6.5rem] lg:h-[3.25rem] flex h-[2.25rem] w-[4.5rem] bg-[#9277FF] rounded-tl-[1.25rem] rounded-br-[1.25rem] translate-y-[-2.25rem]"></span>
      </div>
      <div className="lg:flex-col flex items-center gap-[1.5rem]">
        <img
          onClick={() => {
            props.setDarkMode(!props.darkMode);
          }}
          src={props.darkMode ? Sun : Moon}
          alt="Moon"
          className="cursor-pointer"
        />
        <span className="lg:rotate-90 h-[4.25rem] w-[0.0625rem] bg-[#494E6E]"></span>
        <img
          src={Profile}
          alt="Profile"
          className="rounded-full w-[2rem] h-[2rem]"
        />
      </div>
    </div>
  );
}

export default Header;
