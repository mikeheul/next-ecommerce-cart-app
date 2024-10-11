"use client";

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // Vérifie les préférences utilisateur pour le thème au démarrage
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        } else {
            setTheme('light');
        }
    }, []);

    const toggleTheme = () => {
        if (theme === 'light') {
            document.documentElement.classList.add('dark');
            setTheme('dark');
        } else {
            document.documentElement.classList.remove('dark');
            setTheme('light');
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded-md transition duration-300"
        >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
    );
}
