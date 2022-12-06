const useLocalStorage = () => {
  const setItem = (key: string, value: any) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  };

  const getItem = (key: string, defaultValue: any) => {
    try {
      const storedValue = window.localStorage.getItem(key);
      if (storedValue) {
        return JSON.parse(storedValue);
      }
      return defaultValue;
    } catch (e) {
      console.error(e);
      return defaultValue;
    }
  };

  const removeItem = (key: string) => {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    getItem,
    setItem,
    removeItem,
  };
};

export default useLocalStorage;
