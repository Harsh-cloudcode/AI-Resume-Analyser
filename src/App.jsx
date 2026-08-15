import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './globals.css'
import './App.css'


import { DashboardLayout } from "../components/dashboard-layout";
import AnalysisPage from "../app/analysis/page";
import AnalyticsPage from "../app/analytics/page";
import CandidatesPage from "../app/candidates/page";
import HistoryPage from "../app/history/page";
import QuestionsPage from "../app/questions/page";
import SettingsPage from "../app/settings/page";

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />} />
        {/* <Route path="/admin" element={<DashboardLayout />} />  */}
        <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/candidates" element={<CandidatesPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/settings" element={<SettingsPage />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;