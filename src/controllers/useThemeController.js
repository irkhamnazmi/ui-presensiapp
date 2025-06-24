import { fetchTheme } from "@/services/themeService";
import { useEffect, useState } from "react";

export const useThemeController = () => {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const data = await fetchTheme();
      // console.log(data);

      setThemes(data);
    } catch (err) {
      setError(`Failed to fetch themes ${err}}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { themes, loading, error, refetch: load };
};
