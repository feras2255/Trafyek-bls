"use client";

import { supabase } from "@/lib/supabaseClient";
import { createContext, useContext, useEffect, useState } from "react";

const SiteSettingsContext = createContext();

export const SiteSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const getSettings = async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .single();

      if (!error) setSettings(data);
    };
    getSettings();
  }, []);

  return (
    <SiteSettingsContext.Provider value={{ settings }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => useContext(SiteSettingsContext);
