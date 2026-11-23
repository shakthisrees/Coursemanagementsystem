import React, { useState } from "react";
import CourseList from "./components/CourseList";
import CourseForm from "./components/CourseForm";

function App() {
  const [currentView, setCurrentView] = useState("list");

  return (
    <div className="app-container">
      <header>
        <h1>Course Management System</h1>

        <nav>
          <button
            data-testid="nav-list"
            onClick={() => setCurrentView("list")}
            className="btn-secondary"
          >
            View Courses
          </button>

          <button
            data-testid="nav-add"
            onClick={() => setCurrentView("add")}
            className="btn-primary"
          >
            Add Course
          </button>
        </nav>
      </header>

      <main>
        {currentView === "list" ? <CourseList /> : <CourseForm />}
      </main>
    </div>
  );
}

export default App;														