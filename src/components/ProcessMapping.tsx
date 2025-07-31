import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Chip,
  IconButton,
  FormControlLabel,
  Checkbox,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Warning as WarningIcon,
  AccessTime as TimeIcon,
  BusinessCenter as AcquisitionIcon,
  Build as DeliveryIcon,
  Support as SupportIcon
} from '@mui/icons-material';
import { ProcessStep } from '../types';

const ProcessMapping: React.FC = () => {
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingStep, setEditingStep] = useState<ProcessStep | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProcessStep['category'] | 'all'>('all');
  const [newStep, setNewStep] = useState({
    name: '',
    description: '',
    category: 'acquisition' as ProcessStep['category'],
    isTimeSink: false,
    isQualityRisk: false,
    timeSpent: 0,
    employeesInvolved: 1,
    tools: ''
  });

  useEffect(() => {
    const savedSteps = localStorage.getItem('ai-revisjon-process-steps');
    if (savedSteps) {
      setProcessSteps(JSON.parse(savedSteps));
    }
  }, []);

  const saveProcessSteps = (updatedSteps: ProcessStep[]) => {
    setProcessSteps(updatedSteps);
    localStorage.setItem('ai-revisjon-process-steps', JSON.stringify(updatedSteps));
  };

  const handleCreateStep = () => {
    if (newStep.name && newStep.description) {
      const step: ProcessStep = {
        id: Date.now().toString(),
        name: newStep.name,
        description: newStep.description,
        category: newStep.category,
        isTimeSink: newStep.isTimeSink,
        isQualityRisk: newStep.isQualityRisk,
        timeSpent: newStep.timeSpent || undefined,
        employeesInvolved: newStep.employeesInvolved || undefined,
        tools: newStep.tools ? newStep.tools.split(',').map(t => t.trim()) : undefined
      };
      
      saveProcessSteps([...processSteps, step]);
      resetForm();
    }
  };

  const handleUpdateStep = () => {
    if (editingStep && newStep.name && newStep.description) {
      const updatedStep: ProcessStep = {
        ...editingStep,
        name: newStep.name,
        description: newStep.description,
        category: newStep.category,
        isTimeSink: newStep.isTimeSink,
        isQualityRisk: newStep.isQualityRisk,
        timeSpent: newStep.timeSpent || undefined,
        employeesInvolved: newStep.employeesInvolved || undefined,
        tools: newStep.tools ? newStep.tools.split(',').map(t => t.trim()) : undefined
      };
      
      const updatedSteps = processSteps.map(step => 
        step.id === editingStep.id ? updatedStep : step
      );
      saveProcessSteps(updatedSteps);
      resetForm();
    }
  };

  const handleEditStep = (step: ProcessStep) => {
    setEditingStep(step);
    setNewStep({
      name: step.name,
      description: step.description,
      category: step.category,
      isTimeSink: step.isTimeSink,
      isQualityRisk: step.isQualityRisk,
      timeSpent: step.timeSpent || 0,
      employeesInvolved: step.employeesInvolved || 1,
      tools: step.tools ? step.tools.join(', ') : ''
    });
    setOpenDialog(true);
  };

  const handleDeleteStep = (stepId: string) => {
    saveProcessSteps(processSteps.filter(step => step.id !== stepId));
  };

  const resetForm = () => {
    setNewStep({
      name: '',
      description: '',
      category: 'acquisition',
      isTimeSink: false,
      isQualityRisk: false,
      timeSpent: 0,
      employeesInvolved: 1,
      tools: ''
    });
    setEditingStep(null);
    setOpenDialog(false);
  };

  const getCategoryIcon = (category: ProcessStep['category']) => {
    switch (category) {
      case 'acquisition': return <AcquisitionIcon />;
      case 'delivery': return <DeliveryIcon />;
      case 'support': return <SupportIcon />;
    }
  };

  const getCategoryLabel = (category: ProcessStep['category']) => {
    switch (category) {
      case 'acquisition': return 'Akkvisisjonsmotor';
      case 'delivery': return 'Leveransemotor';
      case 'support': return 'Støttemotor';
    }
  };

  const getCategoryColor = (category: ProcessStep['category']) => {
    switch (category) {
      case 'acquisition': return 'primary';
      case 'delivery': return 'secondary';
      case 'support': return 'success';
    }
  };

  const getFilteredSteps = () => {
    if (selectedCategory === 'all') return processSteps;
    return processSteps.filter(step => step.category === selectedCategory);
  };

  const getStepsByCategory = (category: ProcessStep['category']) => {
    return processSteps.filter(step => step.category === category);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Prosess Mapping - Ops Canvas
      </Typography>

      <Typography variant="body1" color="textSecondary" paragraph>
        Kartlegg bedriftens kjerneprosesser i de tre hovedmotorene. Marker tidssink og kvalitetsrisiko for å identifisere AI-muligheter.
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Filter kategori</InputLabel>
          <Select
            value={selectedCategory}
            label="Filter kategori"
            onChange={(e) => setSelectedCategory(e.target.value as any)}
          >
            <MenuItem value="all">Alle kategorier</MenuItem>
            <MenuItem value="acquisition">Akkvisisjonsmotor</MenuItem>
            <MenuItem value="delivery">Leveransemotor</MenuItem>
            <MenuItem value="support">Støttemotor</MenuItem>
          </Select>
        </FormControl>
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Nytt Prosesstrinn
        </Button>
      </Box>

      {/* Ops Canvas Oversikt */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {(['acquisition', 'delivery', 'support'] as const).map((category) => (
          <Grid item xs={12} md={4} key={category}>
            <Card sx={{ minHeight: 300 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  {getCategoryIcon(category)}
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {getCategoryLabel(category)}
                  </Typography>
                </Box>
                
                <Typography variant="body2" color="textSecondary" mb={2}>
                  {category === 'acquisition' && 'Hvordan finner og signerer dere nye kunder?'}
                  {category === 'delivery' && 'Hvordan leverer dere produktet eller tjenesten?'}
                  {category === 'support' && 'Hvordan håndterer dere kundesupport og oppfølging?'}
                </Typography>

                <Box>
                  {getStepsByCategory(category).map((step) => (
                    <Box key={step.id} mb={1}>
                      <Chip
                        label={step.name}
                        size="small"
                        color={getCategoryColor(category)}
                        variant="outlined"
                        sx={{ 
                          backgroundColor: step.isTimeSink || step.isQualityRisk ? '#fff3cd' : undefined,
                          borderColor: step.isTimeSink || step.isQualityRisk ? '#ffc107' : undefined
                        }}
                        icon={
                          (step.isTimeSink || step.isQualityRisk) ? 
                          <WarningIcon fontSize="small" /> : undefined
                        }
                        onClick={() => handleEditStep(step)}
                        clickable
                      />
                    </Box>
                  ))}
                  
                  {getStepsByCategory(category).length === 0 && (
                    <Typography variant="body2" color="textSecondary" fontStyle="italic">
                      Ingen prosesstrinn lagt til ennå
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Detaljert Liste */}
      <Typography variant="h5" gutterBottom>
        Detaljert Prosessliste
      </Typography>

      <Grid container spacing={2}>
        {getFilteredSteps().map((step) => (
          <Grid item xs={12} key={step.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Box flex={1}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <Typography variant="h6">
                        {step.name}
                      </Typography>
                      <Box ml={2} display="flex" gap={1}>
                        <Chip
                          size="small"
                          label={getCategoryLabel(step.category)}
                          color={getCategoryColor(step.category)}
                          icon={getCategoryIcon(step.category)}
                        />
                        {step.isTimeSink && (
                          <Chip
                            size="small"
                            label="Tidssink"
                            color="warning"
                            icon={<TimeIcon />}
                          />
                        )}
                        {step.isQualityRisk && (
                          <Chip
                            size="small"
                            label="Kvalitetsrisiko"
                            color="error"
                            icon={<WarningIcon />}
                          />
                        )}
                      </Box>
                    </Box>
                    
                    <Typography variant="body2" color="textSecondary" paragraph>
                      {step.description}
                    </Typography>

                    <Grid container spacing={2}>
                      {step.timeSpent && (
                        <Grid item>
                          <Typography variant="caption" display="block">
                            Tid per uke: {step.timeSpent} timer
                          </Typography>
                        </Grid>
                      )}
                      {step.employeesInvolved && (
                        <Grid item>
                          <Typography variant="caption" display="block">
                            Ansatte involvert: {step.employeesInvolved}
                          </Typography>
                        </Grid>
                      )}
                      {step.tools && step.tools.length > 0 && (
                        <Grid item xs={12}>
                          <Typography variant="caption" display="block" gutterBottom>
                            Verktøy:
                          </Typography>
                          <Box display="flex" gap={0.5} flexWrap="wrap">
                            {step.tools.map((tool, index) => (
                              <Chip key={index} label={tool} size="small" variant="outlined" />
                            ))}
                          </Box>
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                  
                  <Box display="flex" gap={1}>
                    <IconButton onClick={() => handleEditStep(step)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteStep(step.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {processSteps.length === 0 && (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Ingen prosesstrinn kartlagt ennå
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={3}>
              Start med å kartlegge bedriftens kjerneprosesser
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
            >
              Legg til Prosesstrinn
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Dialog for å legge til/redigere prosesstrinn */}
      <Dialog open={openDialog} onClose={resetForm} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingStep ? 'Rediger Prosesstrinn' : 'Nytt Prosesstrinn'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Navn"
                value={newStep.name}
                onChange={(e) => setNewStep({ ...newStep, name: e.target.value })}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Beskrivelse"
                value={newStep.description}
                onChange={(e) => setNewStep({ ...newStep, description: e.target.value })}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Kategori</InputLabel>
                <Select
                  value={newStep.category}
                  label="Kategori"
                  onChange={(e) => setNewStep({ ...newStep, category: e.target.value as any })}
                >
                  <MenuItem value="acquisition">Akkvisisjonsmotor</MenuItem>
                  <MenuItem value="delivery">Leveransemotor</MenuItem>
                  <MenuItem value="support">Støttemotor</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Timer per uke"
                value={newStep.timeSpent}
                onChange={(e) => setNewStep({ ...newStep, timeSpent: Number(e.target.value) })}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Antall ansatte involvert"
                value={newStep.employeesInvolved}
                onChange={(e) => setNewStep({ ...newStep, employeesInvolved: Number(e.target.value) })}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Verktøy (kommaseparert)"
                value={newStep.tools}
                onChange={(e) => setNewStep({ ...newStep, tools: e.target.value })}
                placeholder="Excel, Slack, CRM"
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                Identifiser problemer:
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={newStep.isTimeSink}
                    onChange={(e) => setNewStep({ ...newStep, isTimeSink: e.target.checked })}
                  />
                }
                label="Tidssink (manuell, repetitiv, tidkrevende)"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={newStep.isQualityRisk}
                    onChange={(e) => setNewStep({ ...newStep, isQualityRisk: e.target.checked })}
                  />
                }
                label="Kvalitetsrisiko (utsatt for menneskelige feil)"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetForm}>Avbryt</Button>
          <Button 
            onClick={editingStep ? handleUpdateStep : handleCreateStep} 
            variant="contained"
          >
            {editingStep ? 'Oppdater' : 'Opprett'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProcessMapping;