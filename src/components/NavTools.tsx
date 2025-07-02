import { ToggleTheme } from "./ui/ToggleTheme";

const NavTools = () => {
  return (
    <div className="bg-neutral-light dark:bg-neutral-dark p-4 flex justify-end items-center gap-4">
      <ToggleTheme />
    </div>
  );
};

export default NavTools;
