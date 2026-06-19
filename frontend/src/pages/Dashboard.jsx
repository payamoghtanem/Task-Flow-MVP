import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import TaskCard from '../components/TaskCard';
import CreateTaskModal from '../components/CreateTaskModal';

const FILTER_TABS = [
  { value: 'all', label: 'All' },
  { value: 'PERSONAL', label: 'Personal' },
  { value: 'PROFESSIONAL', label: 'Professional' },
];

const STATUS_ORDER = ['TODO', 'IN_PROGRESS', 'DONE'];
const STATUS_LABELS = { TODO: 'TODO', IN_PROGRESS: 'IN PROGRESS', DONE: 'DONE' };

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);

  const addTaskBtnRef = useRef(null);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get('/tasks');
      setTasks(data);
    } catch (err) {
      if (err.status === 401) {
        logout();
        navigate('/login', { state: { expired: true } });
      } else {
        setError(err.message || 'Failed to load tasks. Please refresh.');
      }
    } finally {
      setLoading(false);
    }
  }, [logout, navigate]);

  useEffect(() => { loadTasks(); }, [loadTasks]);

  async function handleLogout() {
    try { await api.post('/auth/logout', {}); } catch { /* stateless — ignore errors */ }
    logout();
    navigate('/login');
  }

  function handleTaskCreated(newTask) {
    setTasks((prev) => [newTask, ...prev]);
    setShowModal(false);
    setTimeout(() => addTaskBtnRef.current?.focus(), 0);
  }

  function handleStatusUpdate(updatedTask) {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? { ...t, ...updatedTask } : t))
    );
  }

  function handleDelete(taskId) {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  }

  const filtered =
    activeFilter === 'all' ? tasks : tasks.filter((t) => t.category === activeFilter);

  const grouped = STATUS_ORDER.reduce((acc, status) => {
    acc[status] = filtered.filter((t) => t.status === status);
    return acc;
  }, {});

  const counts = {
    all: tasks.length,
    PERSONAL: tasks.filter((t) => t.category === 'PERSONAL').length,
    PROFESSIONAL: tasks.filter((t) => t.category === 'PROFESSIONAL').length,
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <span className="dashboard-logo">TaskFlow</span>
        <div className="header-actions">
          {user && <span className="user-email">{user.email}</span>}
          <button
            className="btn btn--ghost btn--sm"
            onClick={handleLogout}
            aria-label="Log out"
          >
            Log Out
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="section-header">
          <h1 className="section-title">My Tasks</h1>
          <button
            ref={addTaskBtnRef}
            className="btn btn--primary"
            onClick={() => setShowModal(true)}
          >
            + Add Task
          </button>
        </div>

        <div role="tablist" aria-label="Filter tasks by category" className="filter-tabs">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.value}
              role="tab"
              aria-selected={activeFilter === tab.value}
              className={`filter-tab${activeFilter === tab.value ? ' filter-tab--active' : ''}`}
              onClick={() => setActiveFilter(tab.value)}
            >
              {tab.label} ({counts[tab.value] ?? 0})
            </button>
          ))}
        </div>

        {loading && <p className="loading-text">Loading tasks…</p>}

        {error && (
          <div role="alert" className="api-error">
            {error}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon" aria-hidden="true">📋</div>
            <p className="empty-state-title">No tasks yet.</p>
            <p className="empty-state-body">Add your first task to get started.</p>
            <button className="btn btn--primary" onClick={() => setShowModal(true)}>
              + Add your first task
            </button>
          </div>
        )}

        {!loading &&
          !error &&
          filtered.length > 0 &&
          STATUS_ORDER.map((status) => {
            const group = grouped[status];
            if (!group.length) return null;
            return (
              <section key={status} className="status-section">
                <h2 className="status-heading">
                  {STATUS_LABELS[status]} ({group.length})
                </h2>
                <ul className="task-list">
                  {group.map((task) => (
                    <li key={task.id}>
                      <TaskCard
                        task={task}
                        onStatusUpdate={handleStatusUpdate}
                        onDelete={handleDelete}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
      </main>

      {showModal && (
        <CreateTaskModal
          onClose={() => {
            setShowModal(false);
            setTimeout(() => addTaskBtnRef.current?.focus(), 0);
          }}
          onCreated={handleTaskCreated}
        />
      )}
    </div>
  );
}
