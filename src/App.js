
  // src/App.js
  import React, { useState, useEffect } from 'react';
  import './App.css';
  
  function App() {
    const [tasks, setTasks] = useState({});
    const [currentTask, setCurrentTask] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [newTaskName, setNewTaskName] = useState('');
    const [elapsedTime, setElapsedTime] = useState(0);
  
    useEffect(() => {
      let interval;
      if (currentTask && startTime) {
        interval = setInterval(() => {
          setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);
      }
      return () => clearInterval(interval);
    }, [currentTask, startTime]);
  
    const startTask = () => {
      if (currentTask) stopTask();
      if (newTaskName.trim() === '') return;
      setCurrentTask(newTaskName);
      setStartTime(Date.now());
      setNewTaskName('');
    };
  
    const stopTask = () => {
      if (!currentTask) return;
      const duration = Math.floor((Date.now() - startTime) / 1000);
      setTasks(prev => ({
        ...prev,
        [currentTask]: (prev[currentTask] || 0) + duration
      }));
      setCurrentTask(null);
      setStartTime(null);
      setElapsedTime(0);
    };
  
    const formatTime = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
  
    return (
      <div className="App">
        <h1>Time Tracker</h1>
        <div className="current-task">
          <h2>Current Task</h2>
          <p>{currentTask || 'No active task'}</p>
          <p>{formatTime(elapsedTime)}</p>
        </div>
        <div className="task-input">
          <input
            type="text"
            placeholder="Enter task name"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
          <button onClick={startTask} disabled={currentTask !== null}>Start</button>
          <button onClick={stopTask} disabled={currentTask === null}>Stop</button>
        </div>
        <div className="task-report">
          <h2>Task Report</h2>
          {Object.entries(tasks).map(([task, duration]) => (
            <div key={task}>
              <span>{task}: </span>
              <span>{formatTime(duration)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default App;