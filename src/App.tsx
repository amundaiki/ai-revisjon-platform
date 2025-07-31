import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import Dashboard from './components/Dashboard';
import InterviewModule from './components/InterviewModule';
import ProcessMapping from './components/ProcessMapping';
import OpportunityMatrix from './components/OpportunityMatrix';
import ROICalculator from './components/ROICalculator';
import PresentationGenerator from './components/PresentationGenerator';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI Revisjon Platform
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Navigation />
      
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/intervjuer" element={<InterviewModule />} />
          <Route path="/prosess-mapping" element={<ProcessMapping />} />
          <Route path="/mulighetsmatrise" element={<OpportunityMatrix />} />
          <Route path="/roi-kalkulator" element={<ROICalculator />} />
          <Route path="/presentasjon" element={<PresentationGenerator />} />
        </Routes>
      </Container>
    </Box>
  );
};

export default App;