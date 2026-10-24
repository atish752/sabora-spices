/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern European Luxury Obsidian Emerald & Jewel-Toned System
        obsidian: {
          950: '#020C08', // Deep midnight obsidian base
          900: '#041A12', // Rich royal imperial emerald base
          850: '#062419',
          800: '#082E20',
          700: '#0D422E',
          600: '#12573D',
          500: '#177351',
          400: '#239368',
        },
        botanical: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
          950: '#041A12',
        },
        brand: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          950: '#041A12',
        },
        // Modern crisp surfaces (replacing dull washed-out oatmeal)
        linen: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        // Radiant 24K European Merchant Gold & Champagne
        brass: {
          50: '#FFFDF5',
          100: '#FEF9C3',
          200: '#FEF08A',
          300: '#FDE047',
          400: '#FACC15',
          500: '#F59E0B', // Radiant metallic gold
          600: '#D97706', // Rich amber gold
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        gold: {
          50: '#FFFDF5',
          100: '#FEF9C3',
          200: '#FEF08A',
          300: '#FDE047',
          400: '#FACC15',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        terracotta: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        turmeric: {
          DEFAULT: '#F59E0B',
          warm: '#D97706',
          light: '#FFFBEB',
        },
        cardamom: {
          DEFAULT: '#059669',
          dark: '#041A12',
          light: '#ECFDF5',
        },
        mint: {
          DEFAULT: '#10B981',
          light: '#ECFDF5',
        },
        charcoal: {
          DEFAULT: '#0F172A',
          dark: '#020617',
          soft: '#1E293B',
          muted: '#64748B',
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          luminous: '#F9FBFA',
          subtle: '#F1F5F3',
          soft: '#FFFFFF',
          warm: '#F8FAFC',
          sage: '#E8F4EE',
          paper: '#FFFFFF',
          parchment: '#F9FBFA',
        }
      },
      fontFamily: {
        sans: ['"Outfit"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Fraunces"', 'Georgia', 'serif'],
        heading: ['"Fraunces"', 'Georgia', 'serif'],
        display: ['"Fraunces"', 'Georgia', 'serif'],
        hand: ['"Caveat"', 'cursive'],
        cinzel: ['"Fraunces"', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(4, 26, 18, 0.05), 0 2px 6px -1px rgba(4, 26, 18, 0.03)',
        'card': '0 10px 30px -4px rgba(4, 26, 18, 0.08), 0 4px 10px -2px rgba(4, 26, 18, 0.04)',
        'lift': '0 25px 50px -12px rgba(4, 26, 18, 0.22)',
        'brass': '0 4px 25px -2px rgba(245, 158, 11, 0.45)',
        'pedestal': '0 30px 70px -15px rgba(4, 26, 18, 0.25), 0 0 45px -10px rgba(16, 185, 129, 0.22)',
        'emerald-glow': '0 0 35px -5px rgba(16, 185, 129, 0.45)',
        'gold-glow': '0 0 35px -5px rgba(245, 158, 11, 0.45)',
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'marquee-fast': 'marquee 18s linear infinite',
        'marquee-mobile': 'marquee 22s linear infinite',
        'float': 'softFloat 5s ease-in-out infinite',
        'shimmer': 'subtleShimmer 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        softFloat: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-6px) rotate(0.3deg)' },
        },
        subtleShimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
