import React from 'react';

function Navbar({ currentView, setCurrentView }) {
  return (
    <nav className="navbar">

      <h2>Complaint Management System</h2>

      <div className="nav-buttons">

        <button
          data-testid="nav-list"
          className={
            currentView === 'list'
              ? 'btn-primary'
              : 'btn-secondary'
          }
          onClick={() => setCurrentView('list')}
        >
          View Complaints
        </button>

        <button
          data-testid="nav-add"
          className={
            currentView === 'form'
              ? 'btn-primary'
              : 'btn-secondary'
          }
          onClick={() => setCurrentView('form')}
        >
          Add Complaint
        </button>

      </div>

    </nav>
  );
}

export default Navbar;