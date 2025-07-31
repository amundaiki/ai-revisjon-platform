import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  List,
  ListItem,
  ListItemText,
  Alert
} from '@mui/material';
import {
  GetApp as ExportIcon,
  Slideshow as PresentationIcon,
  Print as PrintIcon,
  Share as ShareIcon
} from '@mui/icons-material';
import { Interview, ProcessStep, AIOpportunity, ROICalculation } from '../types';

const PresentationGenerator: React.FC = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const [opportunities, setOpportunities] = useState<AIOpportunity[]>([]);
  const [roiCalculations, setROICalculations] = useState<ROICalculation[]>([]);

  useEffect(() => {
    const savedInterviews = localStorage.getItem('ai-revisjon-interviews');
    const savedProcessSteps = localStorage.getItem('ai-revisjon-process-steps');
    const savedOpportunities = localStorage.getItem('ai-revisjon-opportunities');
    const savedROICalculations = localStorage.getItem('ai-revisjon-roi-calculations');
    
    if (savedInterviews) setInterviews(JSON.parse(savedInterviews));
    if (savedProcessSteps) setProcessSteps(JSON.parse(savedProcessSteps));
    if (savedOpportunities) setOpportunities(JSON.parse(savedOpportunities));
    if (savedROICalculations) setROICalculations(JSON.parse(savedROICalculations));
  }, []);

  const handleExportPrint = () => {
    window.print();
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

  const getOpportunitiesByQuadrant = (quadrant: string) => {
    return opportunities.filter(opp => getQuadrant(opp.impact, opp.effort) === quadrant);
  };

  const getProcessStepsByCategory = (category: ProcessStep['category']) => {
    return processSteps.filter(step => step.category === category);
  };

  const getROITotals = () => {
    const totalImplementationCost = roiCalculations.reduce((sum, calc) => sum + calc.implementationCost, 0);
    const totalAnnualSaving = roiCalculations.reduce((sum, calc) => sum + calc.annualCostSaving, 0);
    const totalRevenueUplift = roiCalculations.reduce((sum, calc) => sum + calc.revenueUplift, 0);
    const totalAnnualValue = totalAnnualSaving + totalRevenueUplift;
    const overallROI = totalImplementationCost > 0 ? ((totalAnnualValue - totalImplementationCost) / totalImplementationCost) * 100 : 0;

    return {
      totalImplementationCost,
      totalAnnualSaving,
      totalRevenueUplift,
      totalAnnualValue,
      overallROI
    };
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('no-NO', { style: 'currency', currency: 'NOK', maximumFractionDigits: 0 });
  };

  const completedInterviews = interviews.filter(i => i.status === 'completed');
  const problemSteps = processSteps.filter(step => step.isTimeSink || step.isQualityRisk);
  const quickWins = getOpportunitiesByQuadrant('quick-wins');
  const roiTotals = getROITotals();

  const presentationSteps = [
    'Prosjektomfang',
    'Kartleggingsfunn',
    'Prosess Analyse',
    'Mulighetsmatrise',
    'Implementeringsplan',
    'ROI Analyse'
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          AI Revisjon Presentasjon
        </Typography>
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            startIcon={<PrintIcon />}
            onClick={handleExportPrint}
          >
            Skriv ut
          </Button>
          <Button
            variant="contained"
            startIcon={<ExportIcon />}
          >
            Eksporter PDF
          </Button>
        </Box>
      </Box>

      {/* Progress Overview */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Presentasjonsflyt
          </Typography>
          <Stepper activeStep={5} alternativeLabel>
            {presentationSteps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>

      {/* Slide 1: Prosjektomfang & Målsettinger */}
      <Card sx={{ mb: 4, pageBreakAfter: 'auto' }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={3}>
            <PresentationIcon sx={{ mr: 2, fontSize: 32 }} />
            <Typography variant="h5">
              Slide 1: Prosjektomfang & Målsettinger
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Prosjektomfang
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText primary="Kartlegging av eksisterende prosesser" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Identifisering av AI-muligheter" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="ROI-analyse av potensielle løsninger" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Implementeringsplan med prioritering" />
                </ListItem>
              </List>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Kartleggingsresultater
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="primary">
                      {completedInterviews.length}
                    </Typography>
                    <Typography variant="body2">
                      Intervjuer gjennomført
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="secondary">
                      {processSteps.length}
                    </Typography>
                    <Typography variant="body2">
                      Prosesstrinn kartlagt
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="success.main">
                      {opportunities.length}
                    </Typography>
                    <Typography variant="body2">
                      AI-muligheter identifisert
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="warning.main">
                      {problemSteps.length}
                    </Typography>
                    <Typography variant="body2">
                      Problemområder funnet
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Slide 2: Kartleggingsfunn */}
      <Card sx={{ mb: 4, pageBreakAfter: 'auto' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Slide 2: Kartleggingsfunn fra Intervjuer
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Stakeholder Perspektiv
              </Typography>
              <List dense>
                {completedInterviews
                  .filter(i => i.type === 'stakeholder')
                  .map((interview, index) => (
                    <ListItem key={interview.id}>
                      <ListItemText 
                        primary={`${interview.participantName} - ${interview.participantRole}`}
                        secondary={`${interview.responses.length} svar registrert`}
                      />
                    </ListItem>
                  ))}
              </List>
              
              {completedInterviews.filter(i => i.type === 'stakeholder').length === 0 && (
                <Alert severity="warning">
                  Ingen stakeholder-intervjuer gjennomført ennå
                </Alert>
              )}
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Sluttbruker Perspektiv
              </Typography>
              <List dense>
                {completedInterviews
                  .filter(i => i.type === 'end-user')
                  .map((interview, index) => (
                    <ListItem key={interview.id}>
                      <ListItemText 
                        primary={`${interview.participantName} - ${interview.participantRole}`}
                        secondary={`${interview.responses.length} svar registrert`}
                      />
                    </ListItem>
                  ))}
              </List>
              
              {completedInterviews.filter(i => i.type === 'end-user').length === 0 && (
                <Alert severity="warning">
                  Ingen sluttbruker-intervjuer gjennomført ennå
                </Alert>
              )}
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>
                Viktigste Funn
              </Typography>
              <Typography variant="body1" paragraph>
                • {problemSteps.length} prosesstrinn identifisert som tidssink eller kvalitetsrisiko
              </Typography>
              <Typography variant="body1" paragraph>
                • Potensial for automatisering i alle tre hovedmotorer (anskaffelse, levering, støtte)
              </Typography>
              <Typography variant="body1">
                • Høy grad av manuelle, repetitive oppgaver som påvirker både effektivitet og kvalitet
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Slide 3: Ops Canvas - Prosess Analyse */}
      <Card sx={{ mb: 4, pageBreakAfter: 'auto' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Slide 3: Ops Canvas - Prosess Analyse
          </Typography>
          
          <Grid container spacing={3}>
            {['acquisition', 'delivery', 'support'].map((category) => (
              <Grid item xs={12} md={4} key={category}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {category === 'acquisition' && '🎯 Akkvisisjonsmotor'}
                      {category === 'delivery' && '🔧 Leveransemotor'}
                      {category === 'support' && '🛟 Støttemotor'}
                    </Typography>
                    
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      {category === 'acquisition' && 'Hvordan finner og signerer dere nye kunder?'}
                      {category === 'delivery' && 'Hvordan leverer dere produktet eller tjenesten?'}
                      {category === 'support' && 'Hvordan håndterer dere kundesupport og oppfølging?'}
                    </Typography>

                    <List dense>
                      {getProcessStepsByCategory(category as ProcessStep['category']).map((step) => (
                        <ListItem key={step.id}>
                          <ListItemText 
                            primary={step.name}
                            secondary={
                              <Box display="flex" gap={0.5} mt={0.5}>
                                {step.isTimeSink && (
                                  <Chip label="Tidssink" size="small" color="warning" />
                                )}
                                {step.isQualityRisk && (
                                  <Chip label="Kvalitetsrisiko" size="small" color="error" />
                                )}
                              </Box>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                    
                    {getProcessStepsByCategory(category as ProcessStep['category']).length === 0 && (
                      <Typography variant="body2" color="textSecondary" fontStyle="italic">
                        Ingen prosesstrinn kartlagt
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Slide 4: AI Mulighetsmatrise */}
      <Card sx={{ mb: 4, pageBreakAfter: 'auto' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Slide 4: AI Mulighetsmatrise
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, textAlign: 'center', minHeight: 300 }}>
                <Typography variant="h6" gutterBottom>
                  Impact vs Innsats Matrix
                </Typography>
                
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2, bgcolor: '#e8f5e8', borderLeft: '4px solid #4caf50' }}>
                      <Typography variant="subtitle1" fontWeight="bold" color="#4caf50">
                        🌟 Hurtige Gevinster
                      </Typography>
                      <Typography variant="h4" color="#4caf50">
                        {quickWins.length}
                      </Typography>
                      <Typography variant="caption">
                        Høy impact, lav innsats
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2, bgcolor: '#e3f2fd', borderLeft: '4px solid #2196f3' }}>
                      <Typography variant="subtitle1" fontWeight="bold" color="#2196f3">
                        🚀 Store Satsinger
                      </Typography>
                      <Typography variant="h4" color="#2196f3">
                        {getOpportunitiesByQuadrant('big-swings').length}
                      </Typography>
                      <Typography variant="caption">
                        Høy impact, høy innsats
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2, bgcolor: '#fff3e0', borderLeft: '4px solid #ff9800' }}>
                      <Typography variant="subtitle1" fontWeight="bold" color="#ff9800">
                        👍 Nice-to-Have
                      </Typography>
                      <Typography variant="h4" color="#ff9800">
                        {getOpportunitiesByQuadrant('nice-to-haves').length}
                      </Typography>
                      <Typography variant="caption">
                        Lav impact, lav innsats
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2, bgcolor: '#ffebee', borderLeft: '4px solid #f44336' }}>
                      <Typography variant="subtitle1" fontWeight="bold" color="#f44336">
                        🚫 Deprioritér
                      </Typography>
                      <Typography variant="h4" color="#f44336">
                        {getOpportunitiesByQuadrant('deprioritize').length}
                      </Typography>
                      <Typography variant="caption">
                        Lav impact, høy innsats
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Anbefalte Prioriteringer
              </Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Fase 1: Hurtige Gevinster"
                    secondary="Start med løsninger som gir rask verdi"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Fase 2: Store Satsinger"
                    secondary="Bygge på suksess fra fase 1"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Fase 3: Nice-to-Have"
                    secondary="Når tid og ressurser tillater"
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Slide 5: Implementeringsplan */}
      <Card sx={{ mb: 4, pageBreakAfter: 'auto' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Slide 5: Implementeringsplan - Roadmap
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Anbefalt Implementeringsrekkefølge
              </Typography>
              
              {quickWins.length > 0 && (
                <Card sx={{ mb: 2, bgcolor: '#e8f5e8' }}>
                  <CardContent>
                    <Typography variant="h6" color="success.main" gutterBottom>
                      🌟 Fase 1: Hurtige Gevinster (0-3 måneder)
                    </Typography>
                    <List dense>
                      {quickWins.slice(0, 3).map((opportunity) => (
                        <ListItem key={opportunity.id}>
                          <ListItemText 
                            primary={opportunity.title}
                            secondary={opportunity.description}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              )}
              
              {getOpportunitiesByQuadrant('big-swings').length > 0 && (
                <Card sx={{ mb: 2, bgcolor: '#e3f2fd' }}>
                  <CardContent>
                    <Typography variant="h6" color="primary.main" gutterBottom>
                      🚀 Fase 2: Store Satsinger (3-12 måneder)
                    </Typography>
                    <List dense>
                      {getOpportunitiesByQuadrant('big-swings').slice(0, 3).map((opportunity) => (
                        <ListItem key={opportunity.id}>
                          <ListItemText 
                            primary={opportunity.title}
                            secondary={opportunity.description}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              )}
              
              <Alert severity="info">
                <Typography variant="body2">
                  <strong>Suksessfaktorer:</strong> Start med fase 1 for å bygge momentum og tillit. 
                  Bruk erfaringene fra hurtige gevinster til å forberede større transformasjoner i fase 2.
                </Typography>
              </Alert>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Slide 6: ROI Analyse - "Money Slide" */}
      <Card sx={{ mb: 4, pageBreakAfter: 'auto' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Slide 6: ROI Analyse - "Money Slide"
          </Typography>
          
          {roiCalculations.length > 0 ? (
            <>
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.50' }}>
                    <Typography variant="h4" color="primary.main">
                      {formatCurrency(roiTotals.totalImplementationCost)}
                    </Typography>
                    <Typography variant="body2">
                      Total Investering
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.50' }}>
                    <Typography variant="h4" color="success.main">
                      {formatCurrency(roiTotals.totalAnnualValue)}
                    </Typography>
                    <Typography variant="body2">
                      Årlig Verdi
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'warning.50' }}>
                    <Typography variant="h4" color="warning.main">
                      {roiTotals.overallROI.toFixed(0)}%
                    </Typography>
                    <Typography variant="body2">
                      ROI
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'secondary.50' }}>
                    <Typography variant="h4" color="secondary.main">
                      {(roiTotals.totalImplementationCost > 0 ? roiTotals.totalImplementationCost / (roiTotals.totalAnnualValue / 12) : 0).toFixed(1)}
                    </Typography>
                    <Typography variant="body2">
                      Payback (måneder)
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>AI-løsning</strong></TableCell>
                      <TableCell align="right"><strong>Investering</strong></TableCell>
                      <TableCell align="right"><strong>Årlig besparelse</strong></TableCell>
                      <TableCell align="right"><strong>Inntektsøkning</strong></TableCell>
                      <TableCell align="right"><strong>Total verdi</strong></TableCell>
                      <TableCell align="right"><strong>ROI</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {roiCalculations.map((calculation) => {
                      const opportunity = opportunities.find(opp => opp.id === calculation.opportunityId);
                      const totalValue = calculation.annualCostSaving + calculation.revenueUplift;
                      return (
                        <TableRow key={calculation.opportunityId}>
                          <TableCell>{opportunity?.title || 'Ukjent'}</TableCell>
                          <TableCell align="right">{formatCurrency(calculation.implementationCost)}</TableCell>
                          <TableCell align="right">{formatCurrency(calculation.annualCostSaving)}</TableCell>
                          <TableCell align="right">{formatCurrency(calculation.revenueUplift)}</TableCell>
                          <TableCell align="right"><strong>{formatCurrency(totalValue)}</strong></TableCell>
                          <TableCell align="right">
                            <Chip
                              label={`${calculation.simpleROI.toFixed(0)}%`}
                              color={calculation.simpleROI > 100 ? 'success' : 'warning'}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            <Alert severity="warning">
              Ingen ROI-beregninger er gjennomført ennå. Gå til ROI Kalkulator for å beregne potensiell avkastning.
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Summary & Next Steps */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Sammendrag & Neste Steg
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Viktigste Anbefalinger
              </Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Start med hurtige gevinster"
                    secondary="Implementer løsninger med høy impact og lav innsats først"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Fokuser på automatisering"
                    secondary="Prioriter prosesser som er manuelle og repetitive"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Mål og følg opp resultater"
                    secondary="Etabler KPI-er for å måle suksess"
                  />
                </ListItem>
              </List>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Neste Steg
              </Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Godkjenn prioriterte løsninger"
                    secondary="Beslutt hvilke prosjekter som skal starte først"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Etabler prosjektteam"
                    secondary="Tildel ressurser og definere roller"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Detaljert implementeringsplan"
                    secondary="Utvikle timeline og milepæler"
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PresentationGenerator;