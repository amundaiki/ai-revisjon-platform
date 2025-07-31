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
  Grid,
  Chip,
  Paper,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
  Rocket as RocketIcon,
  ThumbUp as NiceIcon,
  Block as DeprioritizeIcon
} from '@mui/icons-material';
import { AIOpportunity, ProcessStep } from '../types';

const OpportunityMatrix: React.FC = () => {
  const [opportunities, setOpportunities] = useState<AIOpportunity[]>([]);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState<AIOpportunity | null>(null);
  // Removed drag and drop for simplicity
  
  const [newOpportunity, setNewOpportunity] = useState({
    title: '',
    description: '',
    processStepId: '',
    impact: 3,
    effort: 3,
    estimatedTimeSaved: 0,
    estimatedCostSaving: 0,
    implementation: ''
  });

  useEffect(() => {
    const savedOpportunities = localStorage.getItem('ai-revisjon-opportunities');
    const savedProcessSteps = localStorage.getItem('ai-revisjon-process-steps');
    
    if (savedOpportunities) {
      setOpportunities(JSON.parse(savedOpportunities));
    }
    if (savedProcessSteps) {
      setProcessSteps(JSON.parse(savedProcessSteps));
    }
  }, []);

  const saveOpportunities = (updatedOpportunities: AIOpportunity[]) => {
    setOpportunities(updatedOpportunities);
    localStorage.setItem('ai-revisjon-opportunities', JSON.stringify(updatedOpportunities));
  };

  const handleCreateOpportunity = () => {
    if (newOpportunity.title && newOpportunity.description) {
      const opportunity: AIOpportunity = {
        id: Date.now().toString(),
        title: newOpportunity.title,
        description: newOpportunity.description,
        impact: newOpportunity.impact,
        effort: newOpportunity.effort,
        processStepId: newOpportunity.processStepId,
        estimatedTimeSaved: newOpportunity.estimatedTimeSaved,
        estimatedCostSaving: newOpportunity.estimatedCostSaving,
        implementation: newOpportunity.implementation,
        status: 'identified'
      };
      
      saveOpportunities([...opportunities, opportunity]);
      resetForm();
    }
  };

  const handleUpdateOpportunity = () => {
    if (editingOpportunity && newOpportunity.title && newOpportunity.description) {
      const updatedOpportunity: AIOpportunity = {
        ...editingOpportunity,
        title: newOpportunity.title,
        description: newOpportunity.description,
        impact: newOpportunity.impact,
        effort: newOpportunity.effort,
        processStepId: newOpportunity.processStepId,
        estimatedTimeSaved: newOpportunity.estimatedTimeSaved,
        estimatedCostSaving: newOpportunity.estimatedCostSaving,
        implementation: newOpportunity.implementation
      };
      
      const updatedOpportunities = opportunities.map(opp => 
        opp.id === editingOpportunity.id ? updatedOpportunity : opp
      );
      saveOpportunities(updatedOpportunities);
      resetForm();
    }
  };

  const handleEditOpportunity = (opportunity: AIOpportunity) => {
    setEditingOpportunity(opportunity);
    setNewOpportunity({
      title: opportunity.title,
      description: opportunity.description,
      processStepId: opportunity.processStepId,
      impact: opportunity.impact,
      effort: opportunity.effort,
      estimatedTimeSaved: opportunity.estimatedTimeSaved,
      estimatedCostSaving: opportunity.estimatedCostSaving,
      implementation: opportunity.implementation
    });
    setOpenDialog(true);
  };

  const handleDeleteOpportunity = (opportunityId: string) => {
    saveOpportunities(opportunities.filter(opp => opp.id !== opportunityId));
  };

  const resetForm = () => {
    setNewOpportunity({
      title: '',
      description: '',
      processStepId: '',
      impact: 3,
      effort: 3,
      estimatedTimeSaved: 0,
      estimatedCostSaving: 0,
      implementation: ''
    });
    setEditingOpportunity(null);
    setOpenDialog(false);
  };

  const getQuadrant = (impact: number, effort: number) => {
    if (impact >= 4 && effort <= 2) return 'quick-wins';
    if (impact >= 4 && effort >= 4) return 'big-swings';
    if (impact <= 2 && effort <= 2) return 'nice-to-haves';
    if (impact <= 2 && effort >= 4) return 'deprioritize';
    return 'middle';
  };

  const getQuadrantLabel = (quadrant: string) => {
    switch (quadrant) {
      case 'quick-wins': return 'Hurtige Gevinster';
      case 'big-swings': return 'Store Satsinger';
      case 'nice-to-haves': return 'Nice-to-Have';
      case 'deprioritize': return 'Deprioritér';
      default: return 'Middels';
    }
  };

  const getQuadrantIcon = (quadrant: string) => {
    switch (quadrant) {
      case 'quick-wins': return <StarIcon />;
      case 'big-swings': return <RocketIcon />;
      case 'nice-to-haves': return <NiceIcon />;
      case 'deprioritize': return <DeprioritizeIcon />;
      default: return null;
    }
  };

  const getQuadrantColor = (quadrant: string) => {
    switch (quadrant) {
      case 'quick-wins': return '#4caf50';
      case 'big-swings': return '#2196f3';
      case 'nice-to-haves': return '#ff9800';
      case 'deprioritize': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  const getOpportunitiesByQuadrant = (quadrant: string) => {
    return opportunities.filter(opp => getQuadrant(opp.impact, opp.effort) === quadrant);
  };

  // Simplified without drag and drop for now
  const handleMatrixClick = (opportunity: AIOpportunity) => {
    handleEditOpportunity(opportunity);
  };

  const getProcessStepName = (processStepId: string) => {
    const step = processSteps.find(s => s.id === processStepId);
    return step ? step.name : 'Ukjent prosess';
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        AI Mulighetsmatrise
      </Typography>

      <Typography variant="body1" color="textSecondary" paragraph>
        Plasser AI-muligheter på matrisen basert på forretningsimpact (Y-akse) og implementeringsinnsats (X-akse).
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6">
          {opportunities.length} muligheter identifisert
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Ny Mulighet
        </Button>
      </Box>

      {/* Matrix Visualization */}
      <Box sx={{ mb: 4 }}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom textAlign="center">
            Impact vs Innsats Matrise
          </Typography>
          
          <Box 
            sx={{ 
              position: 'relative', 
              width: '100%', 
              height: 500,
              background: 'linear-gradient(to right, #ffebee 0%, #e8f5e8 100%), linear-gradient(to bottom, #e8f5e8 0%, #ffebee 100%)',
              border: '2px solid #ddd',
              borderRadius: 1
            }}
          >
            {/* Axis Labels */}
            <Typography 
              variant="body2" 
              sx={{ 
                position: 'absolute', 
                top: -25, 
                left: '50%', 
                transform: 'translateX(-50%)',
                fontWeight: 'bold'
              }}
            >
              HØY IMPACT
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                position: 'absolute', 
                bottom: -25, 
                left: '50%', 
                transform: 'translateX(-50%)',
                fontWeight: 'bold'
              }}
            >
              LAV IMPACT
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                position: 'absolute', 
                left: -80, 
                top: '50%', 
                transform: 'translateY(-50%) rotate(-90deg)',
                fontWeight: 'bold'
              }}
            >
              LAV INNSATS
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                position: 'absolute', 
                right: -80, 
                top: '50%', 
                transform: 'translateY(-50%) rotate(90deg)',
                fontWeight: 'bold'
              }}
            >
              HØY INNSATS
            </Typography>

            {/* Quadrant Lines */}
            <Box sx={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, bgcolor: '#666', opacity: 0.3 }} />
            <Box sx={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, bgcolor: '#666', opacity: 0.3 }} />

            {/* Quadrant Labels */}
            <Box sx={{ position: 'absolute', top: 10, left: 10, bgcolor: 'rgba(76, 175, 80, 0.1)', p: 1, borderRadius: 1 }}>
              <Typography variant="caption" fontWeight="bold" color="#4caf50">
                🌟 HURTIGE GEVINSTER
              </Typography>
            </Box>
            <Box sx={{ position: 'absolute', top: 10, right: 10, bgcolor: 'rgba(33, 150, 243, 0.1)', p: 1, borderRadius: 1 }}>
              <Typography variant="caption" fontWeight="bold" color="#2196f3">
                🚀 STORE SATSINGER
              </Typography>
            </Box>
            <Box sx={{ position: 'absolute', bottom: 10, left: 10, bgcolor: 'rgba(255, 152, 0, 0.1)', p: 1, borderRadius: 1 }}>
              <Typography variant="caption" fontWeight="bold" color="#ff9800">
                👍 NICE-TO-HAVE
              </Typography>
            </Box>
            <Box sx={{ position: 'absolute', bottom: 10, right: 10, bgcolor: 'rgba(244, 67, 54, 0.1)', p: 1, borderRadius: 1 }}>
              <Typography variant="caption" fontWeight="bold" color="#f44336">
                🚫 DEPRIORITÉR
              </Typography>
            </Box>

            {/* Opportunities */}
            {opportunities.map((opportunity) => {
              const x = ((opportunity.effort - 1) / 4) * 100;
              const y = ((5 - opportunity.impact) / 4) * 100;
              const quadrant = getQuadrant(opportunity.impact, opportunity.effort);
              
              return (
                <Box
                  key={opportunity.id}
                  sx={{
                    position: 'absolute',
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                    zIndex: 1
                  }}
                >
                  <Chip
                    label={opportunity.title}
                    size="small"
                    sx={{
                      backgroundColor: getQuadrantColor(quadrant),
                      color: 'white',
                      fontWeight: 'bold',
                      maxWidth: 120,
                      '&:hover': {
                        opacity: 0.8
                      }
                    }}
                    onClick={() => handleEditOpportunity(opportunity)}
                  />
                </Box>
              );
            })}
          </Box>
        </Paper>
      </Box>

      {/* Quadrant Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {['quick-wins', 'big-swings', 'nice-to-haves', 'deprioritize'].map((quadrant) => (
          <Grid item xs={12} md={3} key={quadrant}>
            <Card sx={{ height: '100%', borderLeft: `4px solid ${getQuadrantColor(quadrant)}` }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  {getQuadrantIcon(quadrant)}
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {getQuadrantLabel(quadrant)}
                  </Typography>
                </Box>
                
                <Typography variant="h4" color={getQuadrantColor(quadrant)} gutterBottom>
                  {getOpportunitiesByQuadrant(quadrant).length}
                </Typography>
                
                <Typography variant="body2" color="textSecondary">
                  {quadrant === 'quick-wins' && 'Start her! Lav innsats, høy verdi.'}
                  {quadrant === 'big-swings' && 'Langsiktige, transformative prosjekter.'}
                  {quadrant === 'nice-to-haves' && 'Enkle forbedringer når tid tillater.'}
                  {quadrant === 'deprioritize' && 'Unngå disse prosjektene.'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Detailed Opportunity List */}
      <Typography variant="h5" gutterBottom>
        Detaljert Mulighets-liste
      </Typography>

      <Grid container spacing={2}>
        {opportunities.map((opportunity) => {
          const quadrant = getQuadrant(opportunity.impact, opportunity.effort);
          return (
            <Grid item xs={12} key={opportunity.id}>
              <Card sx={{ borderLeft: `4px solid ${getQuadrantColor(quadrant)}` }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Box flex={1}>
                      <Box display="flex" alignItems="center" mb={1}>
                        <Typography variant="h6">
                          {opportunity.title}
                        </Typography>
                        <Box ml={2}>
                          <Chip
                            size="small"
                            label={getQuadrantLabel(quadrant)}
                            sx={{ 
                              backgroundColor: getQuadrantColor(quadrant),
                              color: 'white'
                            }}
                            icon={getQuadrantIcon(quadrant)}
                          />
                        </Box>
                      </Box>
                      
                      <Typography variant="body2" color="textSecondary" paragraph>
                        {opportunity.description}
                      </Typography>

                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <Typography variant="caption" display="block">
                            Impact: {opportunity.impact}/5
                          </Typography>
                        </Grid>
                        <Grid item xs={6} md={3}>
                          <Typography variant="caption" display="block">
                            Innsats: {opportunity.effort}/5
                          </Typography>
                        </Grid>
                        {opportunity.estimatedTimeSaved > 0 && (
                          <Grid item xs={6} md={3}>
                            <Typography variant="caption" display="block">
                              Tid spart: {opportunity.estimatedTimeSaved}t/uke
                            </Typography>
                          </Grid>
                        )}
                        {opportunity.estimatedCostSaving > 0 && (
                          <Grid item xs={6} md={3}>
                            <Typography variant="caption" display="block">
                              Kostnadsbesparelse: {opportunity.estimatedCostSaving.toLocaleString('no-NO')} NOK/år
                            </Typography>
                          </Grid>
                        )}
                        {opportunity.processStepId && (
                          <Grid item xs={12}>
                            <Typography variant="caption" display="block">
                              Relatert prosess: {getProcessStepName(opportunity.processStepId)}
                            </Typography>
                          </Grid>
                        )}
                      </Grid>
                    </Box>
                    
                    <Box display="flex" gap={1}>
                      <IconButton onClick={() => handleEditOpportunity(opportunity)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteOpportunity(opportunity.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {opportunities.length === 0 && (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Ingen AI-muligheter identifisert ennå
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={3}>
              Start med å kartlegge prosesser, deretter identifiser AI-muligheter
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
            >
              Legg til Mulighet
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Dialog for å legge til/redigere muligheter */}
      <Dialog open={openDialog} onClose={resetForm} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingOpportunity ? 'Rediger AI-mulighet' : 'Ny AI-mulighet'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tittel"
                value={newOpportunity.title}
                onChange={(e) => setNewOpportunity({ ...newOpportunity, title: e.target.value })}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Beskrivelse"
                value={newOpportunity.description}
                onChange={(e) => setNewOpportunity({ ...newOpportunity, description: e.target.value })}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Relatert prosesstrinn</InputLabel>
                <Select
                  value={newOpportunity.processStepId}
                  label="Relatert prosesstrinn"
                  onChange={(e) => setNewOpportunity({ ...newOpportunity, processStepId: e.target.value })}
                >
                  <MenuItem value="">Ikke spesifisert</MenuItem>
                  {processSteps.map((step) => (
                    <MenuItem key={step.id} value={step.id}>
                      {step.name} ({step.category})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                Matrise Plassering:
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography gutterBottom>
                Forretningsimpact: {newOpportunity.impact}/5
              </Typography>
              <Slider
                value={newOpportunity.impact}
                min={1}
                max={5}
                step={1}
                marks
                valueLabelDisplay="auto"
                onChange={(e, value) => setNewOpportunity({ ...newOpportunity, impact: value as number })}
              />
              <Typography variant="caption" color="textSecondary">
                1 = Lav impact, 5 = Høy impact
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography gutterBottom>
                Implementeringsinnsats: {newOpportunity.effort}/5
              </Typography>
              <Slider
                value={newOpportunity.effort}
                min={1}
                max={5}
                step={1}
                marks
                valueLabelDisplay="auto"
                onChange={(e, value) => setNewOpportunity({ ...newOpportunity, effort: value as number })}
              />
              <Typography variant="caption" color="textSecondary">
                1 = Lav innsats, 5 = Høy innsats
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom>
                Estimerte gevinster:
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Timer spart per uke"
                value={newOpportunity.estimatedTimeSaved}
                onChange={(e) => setNewOpportunity({ ...newOpportunity, estimatedTimeSaved: Number(e.target.value) })}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Kostnadsbesparelse per år (NOK)"
                value={newOpportunity.estimatedCostSaving}
                onChange={(e) => setNewOpportunity({ ...newOpportunity, estimatedCostSaving: Number(e.target.value) })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Implementeringsbeskrivelse"
                value={newOpportunity.implementation}
                onChange={(e) => setNewOpportunity({ ...newOpportunity, implementation: e.target.value })}
                placeholder="Beskrivelse av hvordan denne løsningen kan implementeres..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetForm}>Avbryt</Button>
          <Button 
            onClick={editingOpportunity ? handleUpdateOpportunity : handleCreateOpportunity} 
            variant="contained"
          >
            {editingOpportunity ? 'Oppdater' : 'Opprett'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OpportunityMatrix;