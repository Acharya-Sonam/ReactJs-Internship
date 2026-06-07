import { useState } from "react";
import Counter from "./components/Counter";
import LivePreview from "./components/LivePreview";
import TodoList from "./pages/TodoList";
import AllProducts from "./pages/AllProducts";
import Dashboard from "./pages/Dashboard";

const tabs = [
  { label: "Task 1 - Counter",    component: <Counter /> },
  { label: "Task 2 - Live Text",  component: <LivePreview /> },
  { label: "Task 3 - Todo",       component: <TodoList /> },
  { label: "Task 4 - Products",   component: <AllProducts /> },
  { label: "Task 4 - Dashboard",  component: <Dashboard /> },
];

export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navigation */}
      <div className="flex gap-3 px-6 py-4 bg-white border-b border-gray-200 flex-wrap">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition ${
              activeTab === index
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-blue-500 border-blue-300 hover:bg-blue-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Tab Content */}
      <div className="p-6">
        {tabs[activeTab].component}
      </div>

    </div>
  );
}