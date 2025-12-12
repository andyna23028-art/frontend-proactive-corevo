// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home'; 

import PenilaianKinerja from './pages/PenilaianKinerja';
import PrivateRoute from './components/PrivateRoute';

import FunSession from './pages/FunSession'; 

import FunSessionEmployee from './pages/FunSessionEmployee'; // Untuk Employee
import FunSessionWelcome from './pages/FunSessionWelcome'; // Halaman Mood/Welcome
import FunSessionWelcomeHRD from './pages/FunSessionWelcomeHRD'; // Halaman Mood/Welcome untuk HRD

import PerformanceEmployee from "./pages/PerformanceEmployee";
import Reward from './pages/Reward';
import RewardEmployee from './pages/RewardEmployee';

import TrainingReport from './pages/TrainingReport';
import ReportLayout from './components/ReportLayout';
import ReportEmployeePage from "./pages/ReportEmployee";

import ProfileIP from './pages/ProfileIP';
import "./App.css";



function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes (menggunakan PrivateRoute) */}

        {/* Home */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* Fun Session (HR dan Employee) */}
        {/* Rute ini tidak menggunakan PrivateRoute, jadi ditempatkan di sini. */}
        {/* Jika rute ini seharusnya diproteksi, bungkus element-nya dengan <PrivateRoute> */}
        
        {/* Rute untuk HR (Admin/Create Session) */}
        <Route path="/funsession" element={ <FunSession /> } /> 

        {/* Rute untuk Employee (Join Session) */}
        <Route path="/funsession-employee" element={ <FunSessionEmployee /> } /> 
        
        {/* Rute setelah klik Join Session */}
        <Route path="/funsession/welcome" element={ <FunSessionWelcome /> } /> 

        <Route path="/funsession/hrd-dashboard" element={<FunSessionWelcomeHRD />} />
        <Route path="/funsession" element={<FunSession />} /> {/* Route untuk FunSession.js yang berisi SessionCard */}
        {/* ... tambahkan route lain yang diperlukan, misalnya: */}
        <Route path="/funsession/employee-view" element={<FunSessionWelcome />} />


        {/* Performance / Penilaian Kinerja */}
        <Route
          path="/performance"
          element={
            <PrivateRoute>
              <PenilaianKinerja />
            </PrivateRoute>
          }
        />

        {/* Performance Employee */}
        <Route
          path="/performance-employee"
          element={
            <PrivateRoute>
              <PerformanceEmployee />
            </PrivateRoute>
          }
        />

        {/* Reward */}
        <Route
          path="/reward"
          element={
            <PrivateRoute>
              <Reward />
            </PrivateRoute>
          }
        />

        <Route
          path="/reward-employee"
          element={
            <PrivateRoute>
              <RewardEmployee />
            </PrivateRoute>
          }
        />

        {/* Training Report */}
        <Route
          path="/training-report"
          element={
            <PrivateRoute>
              <ReportLayout />
            </PrivateRoute>
          }
        />

        {/* Employee Report */}
        <Route
          path="/employee-report"
          element={
            <PrivateRoute>
              <ReportEmployeePage />
            </PrivateRoute>
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfileIP />
            </PrivateRoute>
          }
        />

        {/* 404 fallback */}
        <Route
          path="*"
          element={<h3 className="text-center mt-5">404 Not Found</h3>}
        />
      </Routes>
    </Router>
  );
}

export default App;