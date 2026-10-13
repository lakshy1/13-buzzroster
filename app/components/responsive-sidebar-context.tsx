"use client";

import { createContext, useContext } from "react";

type ResponsiveSidebarContextValue = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
};

const ResponsiveSidebarContext = createContext<ResponsiveSidebarContextValue | null>(null);

export function ResponsiveSidebarProvider({
  value,
  children,
}: {
  value: ResponsiveSidebarContextValue;
  children: React.ReactNode;
}) {
  return <ResponsiveSidebarContext.Provider value={value}>{children}</ResponsiveSidebarContext.Provider>;
}

export function useResponsiveSidebar() {
  return useContext(ResponsiveSidebarContext);
}
