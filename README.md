
# Project Title

A brief description of what this project does and who it's for

# 📊 Financial Dashboard 

Welcome to the **Financial Dashboard **! 

If you've ever felt overwhelmed by clunky spreadsheet templates or boring finance apps, this project was built for you. I wanted to create a personal finance tracker that doesn't just store data, but actually feels amazing to use. It’s designed with a premium, modern aesthetic, packs some seriously smart analytics, and is incredibly smooth thanks to slick animations.

---

## ✨ The Features

Here is a deep dive into what makes this application tick, feature by feature.

### 🎨 The "Glassmorphism" Design & Theming
You know that sleek, frosted-glass look you see on modern macOS or iOS interfaces? That’s the core design language of this app. 
* **Light & Dark Mode:** Instead of just swapping black and white backgrounds, the entire app recalculates its colors. In Light mode, it feels crisp and clean like frosted white glass. In Dark mode, it shifts to deep, glowing neon-emerald accents.
* **Fluid Animations:** Every time you open a modal, filter a list, or switch pages, things don't just "snap" into place. They glide, pop, and stagger smoothly using Framer Motion. 

### 🏠 The Dashboard (Your Command Center)
When you first log in, you need to know exactly where your money is at a single glance.
* **Summary Cards:** Big, bold numbers showing your Total Balance, Income, and Expenses. 
* **The Cash Flow Gauge:** I built a custom, animated half-circle gauge that visually weighs your income against your expenses. It's a great quick-check to see if you are operating in the green or the red.
* **Balance & Category Charts:** Interactive charts that break down your spending over the last 5 months, and a pie chart showing exactly *where* your money went (Rent, Food, etc.).

### 💳 Transactions & The "Smart" Filter
Nobody likes sifting through hundreds of rows of data to find that one grocery bill.
* **The Smart Search & Filter Panel:** You can type to search, sort by amount or date, and filter by specific categories. The coolest part? As you apply filters, the stats on the page (like "Filtered Income") recalculate in real-time.
* **Smooth Data Tables:** The table paginates perfectly (showing 7 items at a time), and when you delete or filter items, the rows smoothly slide out of the way.
* **Export to CSV:** Need to do taxes or send a report to an accountant? You can export your data to a CSV file. You can grab everything, just this month, the last 3 months, or pick a custom date range.

### 🧠 Intelligent Insights
This is where the app goes from being a "tracker" to a "financial assistant." Instead of just giving you raw numbers, the Insights page translates your data into human-readable advice.
* **Savings Rate & MoM:** It calculates the percentage of your income you managed to save and compares your spending to last month (Month-over-Month).
* **Automated Observations Feed:** The app analyzes your data and generates smart feed messages. For example:
  * *Income vs Expense Ratio:* "Great job! Your income is covering your expenses with room to spare."
  * *Spending Spikes:* "Warning: Your spending is up 15% compared to last month. Check your 'Rent' category."
  * *Category Dominance:* Tells you exactly what percentage your biggest expense takes up.

### 🔐 Role-Based Access (Admin vs. User)
I built a "Role Switcher" into the header so you can test how different users experience the app.
* **Regular Users:** Can view all the beautiful charts, insights, and tables, but they can't mess with the data.
* **Admins:** Instantly unlock the ability to Add, Edit, and Delete transactions. Admin dashboards also get an extra stat card showing total transaction volume.

---

## 🛠️ The Tech Stack (What powers it)

I chose these tools specifically to make the app fast, reliable, and visually stunning:

* **React 18 & TypeScript:** The foundation. TypeScript ensures the code is bug-free and data types (like Transactions) are strictly defined.
* **Vite:** Makes the development environment incredibly fast compared to old-school tools like Create React App.
* **Zustand:** A lightweight state management tool. It remembers things like your current theme (Light/Dark), your user role, and your transaction data without making the code overly complex.
* **Tailwind CSS v4:** Used for styling. It allowed me to build the complex "frosted glass" effects and dark mode toggles very quickly.
* **Framer Motion:** The secret sauce behind all the buttery-smooth animations, page transitions, and staggered lists.
* **Recharts:** Used to draw the beautiful, interactive bar and pie charts.
* **Zod:** A validation library. When an Admin adds a new transaction, Zod checks to make sure they didn't accidentally type text into the "Amount" field before saving it.

---

## 📂 How the Code is Organized

If you want to poke around the code, here is a quick map of how things are structured (using Feature-Sliced Design):

* `/components`: Universal building blocks (like Date Pickers or standard Buttons).
* `/features`: The meat of the app. It is broken down logically into `dashboard`, `transactions`, `insights`, etc. Each feature has its own components and custom hooks.
* `/store`: Where the Zustand global state lives (Theme, Role, Transactions).
* `/layouts`: The structural stuff (Sidebar, Header, Bottom Nav for mobile).

---
## 📂 Project Structure

This project follows a scalable, Feature-Sliced Design (FSD) architecture:

```text
├── public/                 # Static assets (Logos)
├── src/
│   ├── assets/             # Global assets
│   ├── components/         # Shared/Reusable UI components
│   │   └── ui/             # Modals, Custom Pickers, Metric Cards
│   ├── data/               # Mock data & initial states
│   ├── features/           # Feature-based module grouping
│   │   ├── dashboard/      # Dashboard overview, charts, and summary
│   │   ├── insights/       # Analytics, category breakdowns, automated feeds
│   │   ├── role/           # Role switching logic
│   │   └── transactions/   # Tables, filters, pagination, export, CRUD modals
│   ├── layouts/            # Page wrappers, Header, Sidebar, Bottom Nav
│   ├── lib/                # Utility functions and helpers
│   ├── pages/              # Top-level route components
│   ├── schemas/            # Zod validation schemas
│   ├── store/              # Zustand global state slices
│   ├── types/              # TypeScript interface definitions
│   ├── App.tsx             # Root application component & Routing
│   ├── main.tsx            # Entry point
│   └── index.css           # Global Tailwind & Custom CSS
├── eslint.config.js        # Linter configuration
├── vercel.json             # Deployment configuration
├── vite.config.ts          # Bundler configuration
└── package.json            # Dependencies and scripts
```
## 🚀 Want to run it locally?

It's super easy to get this project running on your machine.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/karthikch2630/Financial-Dashboard.git
cd Financial-Dashboard 
```
### 2️⃣ Install Dependencies
```bash
npm install
```
### 3️⃣ Start Development Server
```bash
npm run dev
```
### 🌐 Open in Browser
```bash
Go to: 
http://localhost:5173
```
 ### 👨‍💻 About the Developer

Built with ❤️ by Chittibomma Karthik Sai

I’m a Frontend / Full-Stack Developer focused on building applications that not only perform well but also deliver an exceptional user experience.

### 🔗 Connect with Me
## 💼 LinkedIn: https://www.linkedin.com/in/karthikch2630 
## 💻 GitHub: https://github.com/karthikch2630