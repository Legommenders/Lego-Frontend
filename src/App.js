import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';
import EvaluationsPage from './pages/EvaluationsPage';
import EvaluationDetailPage from './pages/EvaluationDetailPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/evaluations" />} />
                <Route path="/evaluations" element={<EvaluationsPage />} />
                <Route path="/evaluations/:signature" element={<EvaluationDetailPage />} />
            </Routes>
        </Router>
    );
}

export default App;
