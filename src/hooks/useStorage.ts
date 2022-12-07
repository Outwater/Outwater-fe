const useStorage = (type: 'local' | 'session') => {
  const storage = type === 'local' ? 'localStorage' : 'sessionStorage';

  const setItem = (key: string, value: any) => {
    try {
      window[storage].setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  };

  const getItem = (key: string, defaultValue: any) => {
    try {
      const storedValue = window[storage].getItem(key);
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
      window[storage].removeItem(key);
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

export default useStorage;
