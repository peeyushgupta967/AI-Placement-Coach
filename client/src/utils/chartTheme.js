export const getChartTheme = (darkMode) => ({
    tooltip: {
        backgroundColor: darkMode ? "#0F172A" : "#FFFFFF",
        border: `1px solid ${darkMode ? "#334155" : "#CBD5E1"}`,
        borderRadius: "12px",
        color: darkMode ? "#FFFFFF" : "#000000",
    },

    text: darkMode ? "#FFFFFF" : "#0F172A",

    grid: darkMode ? "#334155" : "#E2E8F0",

    axis: darkMode ? "#CBD5E1" : "#475569",
});

