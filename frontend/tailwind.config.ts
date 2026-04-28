// tailwind.config.ts
const config = {
   darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0B1F3B",
          teal: "#1BA6A6",
          slate: "#F8FAFC",
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.03)',
        'premium': '0 10px 15px -3px rgba(11, 31, 59, 0.05)',
      }
    },
  },
}