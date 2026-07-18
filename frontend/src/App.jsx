import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import SectionView from './pages/SectionView';
import ResetPassword from './pages/ResetPassword';
import SharedView from './pages/SharedView';

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '12px',
            background: '#1f2937',
            color: '#f9fafb',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#6366f1', secondary: '#fff' } },
        }}
      />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          <Route path="/share/:token" element={<SharedView />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="notes" element={<SectionView sectionName="Notes" />} />
            <Route path="videos" element={<SectionView sectionName="Video Links" />} />
            <Route path="questions" element={<SectionView sectionName="Question Banks" />} />
            <Route path="reports" element={<SectionView sectionName="Reports" />} />
            <Route path="ppts" element={<SectionView sectionName="PPTs" />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
