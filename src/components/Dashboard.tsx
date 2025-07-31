import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Chip,
  LinearProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Business as ClientIcon,
  Today as DateIcon
} from '@mui/icons-material';
import { Project } from '../types';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', client: '' });

  useEffect(() => {
    const savedProjects = localStorage.getItem('ai-revisjon-projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  const saveProjects = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    localStorage.setItem('ai-revisjon-projects', JSON.stringify(updatedProjects));
  };

  const handleCreateProject = () => {
    if (newProject.name && newProject.client) {
      const project: Project = {
        id: Date.now().toString(),
        name: newProject.name,
        client: newProject.client,
        startDate: new Date(),
        interviews: [],
        processSteps: [],
        opportunities: [],
        roiCalculations: [],
        status: 'planning'
      };
      
      saveProjects([...projects, project]);
      setNewProject({ name: '', client: '' });
      setOpenDialog(false);
    }
  };

  const handleDeleteProject = (projectId: string) => {
    saveProjects(projects.filter(p => p.id !== projectId));
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'planning': return 'default';
      case 'discovery': return 'primary';
      case 'analysis': return 'secondary';
      case 'presentation': return 'warning';
      case 'completed': return 'success';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: Project['status']) => {
    switch (status) {
      case 'planning': return 'Planlegging';
      case 'discovery': return 'Kartlegging';
      case 'analysis': return 'Analyse';
      case 'presentation': return 'Presentasjon';
      case 'completed': return 'Fullført';
      default: return status;
    }
  };

  const getProjectProgress = (project: Project) => {
    const steps = ['planning', 'discovery', 'analysis', 'presentation', 'completed'];
    const currentIndex = steps.indexOf(project.status);
    return ((currentIndex + 1) / steps.length) * 100;
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          AI Revisjon Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Nytt Prosjekt
        </Button>
      </Box>

      {projects.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Ingen prosjekter ennå
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={3}>
              Kom i gang ved å opprette ditt første AI revisjon prosjekt
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
            >
              Opprett Prosjekt
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid item xs={12} md={6} lg={4} key={project.id}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography variant="h6" component="h2">
                      {project.name}
                    </Typography>
                    <Box>
                      <IconButton size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="center" mb={1}>
                    <ClientIcon sx={{ mr: 1, fontSize: 16 }} />
                    <Typography variant="body2" color="textSecondary">
                      {project.client}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" mb={2}>
                    <DateIcon sx={{ mr: 1, fontSize: 16 }} />
                    <Typography variant="body2" color="textSecondary">
                      {format(new Date(project.startDate), 'dd. MMMM yyyy', { locale: nb })}
                    </Typography>
                  </Box>

                  <Box mb={2}>
                    <Chip 
                      label={getStatusLabel(project.status)}
                      color={getStatusColor(project.status)}
                      size="small"
                    />
                  </Box>

                  <Box mb={2}>
                    <Typography variant="caption" display="block" gutterBottom>
                      Fremgang: {Math.round(getProjectProgress(project))}%
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={getProjectProgress(project)} 
                    />
                  </Box>

                  <List dense>
                    <ListItem>
                      <ListItemText 
                        primary="Intervjuer"
                        secondary={`${project.interviews.length} gjennomført`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Muligheter"
                        secondary={`${project.opportunities.length} identifisert`}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Opprett Nytt Prosjekt</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Prosjektnavn"
            fullWidth
            variant="outlined"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Klient"
            fullWidth
            variant="outlined"
            value={newProject.client}
            onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            Avbryt
          </Button>
          <Button onClick={handleCreateProject} variant="contained">
            Opprett
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;