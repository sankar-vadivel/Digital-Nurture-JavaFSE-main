import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

function EmployeeCard({ employee }) {
  const { theme } = useTheme();

  const isDark = theme === 'dark';
  const cardStyle = {
    fontFamily: 'Helvetica, Arial, sans-serif',
    background: isDark ? '#2d3748' : '#fafafa',
    color: isDark ? '#edf2f7' : '#1a202c',
    border: `1px solid ${isDark ? '#4a5568' : '#e2e8f0'}`,
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={cardStyle}>
      <h4>{employee.name}</h4>
      <p>Role: {employee.role} | Dept: {employee.department}</p>
      <button style={{
        padding: '6px 12px',
        background: isDark ? '#4299e1' : '#3182ce',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        View Details ({theme.toUpperCase()} Theme)
      </button>
    </div>
  );
}

function EmployeeList() {
  const { theme, toggleTheme } = useTheme();

  const employees = [
    { id: 1, name: 'John Doe', role: 'Full Stack Developer', department: 'Engineering' },
    { id: 2, name: 'Jane Smith', role: 'UI/UX Designer', department: 'Design' },
    { id: 3, name: 'Alice Johnson', role: 'Product Manager', department: 'Product' }
  ];

  return (
    <div style={{
      fontFamily: 'Helvetica, Arial, sans-serif',
      background: theme === 'dark' ? '#1a202c' : '#edf2f7',
      minHeight: '100vh',
      padding: '30px',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Employee Directory (HOL 14)</h2>
          <button onClick={toggleTheme} style={{ padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>
            Switch to {theme === 'light' ? '🌙 Dark' : '☀️ Light'} Mode
          </button>
        </div>

        {employees.map(emp => (
          <EmployeeCard key={emp.id} employee={emp} />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <EmployeeList />
    </ThemeProvider>
  );
}
