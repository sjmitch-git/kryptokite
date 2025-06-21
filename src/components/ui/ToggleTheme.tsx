"use client";

import React, { useState } from "react";
import { useUser } from "@/lib/contexts/UserContext";
import { Switch } from "@smitch/fluid";

export const ToggleTheme = () => {
  const { theme, toggleTheme } = useUser();

  return (
    <Switch
      switchColor="primary"
      shape="circle"
      checked={theme === "dark"}
      defaultChecked={theme === "dark"}
      onChange={toggleTheme}
      label={theme === "dark" ? "☾" : "☼"}
      labelSize="xl"
      labelIsBold
    />
  );
};
