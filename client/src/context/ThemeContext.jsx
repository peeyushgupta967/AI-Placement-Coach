import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {

        const savedTheme = localStorage.getItem("theme") || "dark";

        setDarkMode(savedTheme === "dark");

        document.documentElement.classList.toggle(
            "dark",
            savedTheme === "dark"
        );

    }, []);

    const toggleTheme = () => {

        const newTheme = !darkMode;

        setDarkMode(newTheme);

        document.documentElement.classList.toggle("dark", newTheme);

        localStorage.setItem(
            "theme",
            newTheme ? "dark" : "light"
        );

    };

    return (
        <ThemeContext.Provider
            value={{ darkMode, toggleTheme }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);