import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Tabs, 
  Tab, 
  Box,
  Paper
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  RecordVoiceOver as InterviewIcon,
  AccountTree as ProcessIcon,
  GridOn as MatrixIcon,
  CalculateOutlined as ROIIcon,
  Slideshow as PresentationIcon
} from '@mui/icons-material';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: 'Dashboard', value: '/', icon: <DashboardIcon /> },
    { label: 'Intervjuer', value: '/intervjuer', icon: <InterviewIcon /> },
    { label: 'Prosess Mapping', value: '/prosess-mapping', icon: <ProcessIcon /> },
    { label: 'Mulighetsmatrise', value: '/mulighetsmatrise', icon: <MatrixIcon /> },
    { label: 'ROI Kalkulator', value: '/roi-kalkulator', icon: <ROIIcon /> },
    { label: 'Presentasjon', value: '/presentasjon', icon: <PresentationIcon /> },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  return (
    <Paper elevation={1} sx={{ mt: 2, mx: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={location.pathname}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              label={tab.label}
              value={tab.value}
              icon={tab.icon}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Box>
    </Paper>
  );
};

export default Navigation;