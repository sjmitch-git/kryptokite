"use client";

import { useUser } from "@/lib/contexts/UserContext";
import { Switch } from "@smitch/fluid";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useUser();

  return (
    <Switch
      switchColor="primary"
      shape="circle"
      checked={theme === "dark"}
      defaultChecked={theme === "dark"}
      onChange={toggleTheme}
      className="toggle-theme"
    />
  );
};

export default ToggleTheme;
