/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // این خط جادویی است که دکمه تم شب ما را فعال می‌کند
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
