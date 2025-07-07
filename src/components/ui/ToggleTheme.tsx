"use client";

import { useUser } from "@/lib/contexts/UserContext";
import { Switch } from "@smitch/fluid";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useUser();

  return (
    <Switch
      switchOffColor="info"
      switchOffContent="☼"
      switchOnColor="primary"
      switchOnContent="☾"
      shape="circle"
      checked={theme === "dark"}
      defaultChecked={theme === "dark"}
      onChange={toggleTheme}
      className="text-dark dark:text-light"
    />
  );
};

export default ToggleTheme;
