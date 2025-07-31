import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Divider,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  TrendingUp as ROIIcon,
  Calculate as CalculateIcon,
  AttachMoney as MoneyIcon,
  Schedule as TimeIcon,
  Business as RevenueIcon
} from '@mui/icons-material';
import { AIOpportunity, ROICalculation } from '../types';

const ROICalculator: React.FC = () => {
  const [opportunities, setOpportunities] = useState<AIOpportunity[]>([]);
  const [roiCalculations, setROICalculations] = useState<ROICalculation[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<AIOpportunity | null>(null);
  const [calculationData, setCalculationData] = useState({
    implementationCost: 0,
    averageHourlyRate: 600, // NOK per time
    reallocationPercentage: 50, // % av spart tid som kan brukes til inntektsgenerering
    revenuePerHour: 2000 // NOK per time for inntektsgenererende aktiviteter
  });

  useEffect(() => {
    const savedOpportunities = localStorage.getItem('ai-revisjon-opportunities');
    const savedROICalculations = localStorage.getItem('ai-revisjon-roi-calculations');
    
    if (savedOpportunities) {
      setOpportunities(JSON.parse(savedOpportunities));
    }
    if (savedROICalculations) {
      setROICalculations(JSON.parse(savedROICalculations));
    }
  }, []);

  const saveROICalculations = (updatedCalculations: ROICalculation[]) => {
    setROICalculations(updatedCalculations);
    localStorage.setItem('ai-revisjon-roi-calculations', JSON.stringify(updatedCalculations));
  };

  const calculateROI = (opportunity: AIOpportunity, implementationCost: number) => {
    // Direkte kostnadsbesparelser
    const weeklyHoursSaved = opportunity.estimatedTimeSaved;
    const annualHoursSaved = weeklyHoursSaved * 52;
    const annualCostSaving = annualHoursSaved * calculationData.averageHourlyRate;
    
    // Inntektsøkning fra omallokerte timer
    const revenueGeneratingHours = (weeklyHoursSaved * calculationData.reallocationPercentage / 100) * 52;
    const revenueUplift = revenueGeneratingHours * calculationData.revenuePerHour;
    
    // Total årlig verdi
    const totalAnnualValue = annualCostSaving + revenueUplift;
    
    // ROI beregninger
    const simpleROI = implementationCost > 0 ? ((totalAnnualValue - implementationCost) / implementationCost) * 100 : 0;
    const paybackPeriod = implementationCost > 0 ? (implementationCost / (totalAnnualValue / 12)) : 0;

    return {
      annualCostSaving,
      revenueUplift,
      totalAnnualValue,
      simpleROI,
      paybackPeriod
    };
  };

  const handleCreateROICalculation = () => {
    if (selectedOpportunity) {
      const roiResult = calculateROI(selectedOpportunity, calculationData.implementationCost);
      
      const calculation: ROICalculation = {
        opportunityId: selectedOpportunity.id,
        implementationCost: calculationData.implementationCost,
        annualCostSaving: roiResult.annualCostSaving,
        revenueUplift: roiResult.revenueUplift,
        simpleROI: roiResult.simpleROI,
        paybackPeriod: roiResult.paybackPeriod
      };

      const existingIndex = roiCalculations.findIndex(calc => calc.opportunityId === selectedOpportunity.id);
      let updatedCalculations;
      
      if (existingIndex >= 0) {
        updatedCalculations = [...roiCalculations];
        updatedCalculations[existingIndex] = calculation;
      } else {
        updatedCalculations = [...roiCalculations, calculation];
      }

      saveROICalculations(updatedCalculations);
      setOpenDialog(false);
      setSelectedOpportunity(null);
    }
  };

  const getOpportunityName = (opportunityId: string) => {
    const opportunity = opportunities.find(opp => opp.id === opportunityId);
    return opportunity ? opportunity.title : 'Ukjent mulighet';
  };

  const getOpportunityById = (opportunityId: string) => {
    return opportunities.find(opp => opp.id === opportunityId);
  };

  const handleOpenCalculator = (opportunity: AIOpportunity) => {
    setSelectedOpportunity(opportunity);
    const existingCalculation = roiCalculations.find(calc => calc.opportunityId === opportunity.id);
    
    if (existingCalculation) {
      setCalculationData({
        ...calculationData,
        implementationCost: existingCalculation.implementationCost
      });
    }
    
    setOpenDialog(true);
  };

  const getTotalROISummary = () => {
    const totalImplementationCost = roiCalculations.reduce((sum, calc) => sum + calc.implementationCost, 0);
    const totalAnnualSaving = roiCalculations.reduce((sum, calc) => sum + calc.annualCostSaving, 0);
    const totalRevenueUplift = roiCalculations.reduce((sum, calc) => sum + calc.revenueUplift, 0);
    const totalAnnualValue = totalAnnualSaving + totalRevenueUplift;
    const overallROI = totalImplementationCost > 0 ? ((totalAnnualValue - totalImplementationCost) / totalImplementationCost) * 100 : 0;
    const overallPayback = totalImplementationCost > 0 ? (totalImplementationCost / (totalAnnualValue / 12)) : 0;

    return {
      totalImplementationCost,
      totalAnnualSaving,
      totalRevenueUplift,
      totalAnnualValue,
      overallROI,
      overallPayback
    };
  };

  const summary = getTotalROISummary();

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('no-NO', { style: 'currency', currency: 'NOK', maximumFractionDigits: 0 });
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const formatMonths = (months: number) => {
    if (months < 12) {
      return `${months.toFixed(1)} måneder`;
    } else {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      return `${years} år${remainingMonths > 0 ? ` ${remainingMonths.toFixed(1)} måneder` : ''}`;
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        ROI Kalkulator
      </Typography>

      <Typography variant="body1" color="textSecondary" paragraph>
        Beregn returen på investering for AI-løsninger basert på tid spart og potensielle inntektsøkninger.
      </Typography>

      {/* Summary Cards */}
      {roiCalculations.length > 0 && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <MoneyIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h4" color="primary">
                  {formatCurrency(summary.totalImplementationCost)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total Implementeringskostnad
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <TimeIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                <Typography variant="h4" color="success.main">
                  {formatCurrency(summary.totalAnnualSaving)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Årlig Kostnadsbesparelse
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <RevenueIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
                <Typography variant="h4" color="secondary.main">
                  {formatCurrency(summary.totalRevenueUplift)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Potensiell Inntektsøkning
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <ROIIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                <Typography variant="h4" color="warning.main">
                  {formatPercentage(summary.overallROI)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total ROI
                </Typography>
                <Typography variant="caption" display="block">
                  Payback: {formatMonths(summary.overallPayback)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Global Parameters */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Globale Beregningsparametere
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                type="number"
                label="Gjennomsnittlig timelønn (NOK)"
                value={calculationData.averageHourlyRate}
                onChange={(e) => setCalculationData({ ...calculationData, averageHourlyRate: Number(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                type="number"
                label="Omallokering til inntekt (%)"
                value={calculationData.reallocationPercentage}
                onChange={(e) => setCalculationData({ ...calculationData, reallocationPercentage: Number(e.target.value) })}
                inputProps={{ min: 0, max: 100 }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                type="number"
                label="Inntekt per time (NOK)"
                value={calculationData.revenuePerHour}
                onChange={(e) => setCalculationData({ ...calculationData, revenuePerHour: Number(e.target.value) })}
              />
            </Grid>
          </Grid>
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Omallokering til inntekt:</strong> Prosent av spart tid som kan brukes til inntektsgenererende aktiviteter (salg, klientarbeid, etc.)
            </Typography>
          </Alert>
        </CardContent>
      </Card>

      {/* Opportunities without ROI Calculations */}
      {opportunities.filter(opp => !roiCalculations.some(calc => calc.opportunityId === opp.id)).length > 0 && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Muligheter uten ROI-beregning
            </Typography>
            <Grid container spacing={2}>
              {opportunities
                .filter(opp => !roiCalculations.some(calc => calc.opportunityId === opp.id))
                .map((opportunity) => (
                  <Grid item xs={12} md={6} key={opportunity.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                          {opportunity.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                          Timer spart per uke: {opportunity.estimatedTimeSaved}
                        </Typography>
                        <Button
                          variant="outlined"
                          startIcon={<CalculateIcon />}
                          onClick={() => handleOpenCalculator(opportunity)}
                          fullWidth
                        >
                          Beregn ROI
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* ROI Calculations Table */}
      {roiCalculations.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              ROI Beregninger - "Money Slide"
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>AI-løsning</strong></TableCell>
                    <TableCell align="right"><strong>Timer/uke spart</strong></TableCell>
                    <TableCell align="right"><strong>Implementeringskost</strong></TableCell>
                    <TableCell align="right"><strong>Årlig besparelse</strong></TableCell>
                    <TableCell align="right"><strong>Inntektsøkning</strong></TableCell>
                    <TableCell align="right"><strong>Total årlig verdi</strong></TableCell>
                    <TableCell align="right"><strong>ROI</strong></TableCell>
                    <TableCell align="right"><strong>Payback</strong></TableCell>
                    <TableCell align="center"><strong>Handlinger</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roiCalculations.map((calculation) => {
                    const opportunity = getOpportunityById(calculation.opportunityId);
                    const totalValue = calculation.annualCostSaving + calculation.revenueUplift;
                    return (
                      <TableRow key={calculation.opportunityId}>
                        <TableCell>{getOpportunityName(calculation.opportunityId)}</TableCell>
                        <TableCell align="right">
                          {opportunity ? opportunity.estimatedTimeSaved : 0}
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(calculation.implementationCost)}
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(calculation.annualCostSaving)}
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(calculation.revenueUplift)}
                        </TableCell>
                        <TableCell align="right">
                          <strong>{formatCurrency(totalValue)}</strong>
                        </TableCell>
                        <TableCell align="right">
                          <Chip
                            label={formatPercentage(calculation.simpleROI)}
                            color={calculation.simpleROI > 100 ? 'success' : calculation.simpleROI > 50 ? 'warning' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="right">
                          {formatMonths(calculation.paybackPeriod)}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            size="small"
                            onClick={() => opportunity && handleOpenCalculator(opportunity)}
                          >
                            Rediger
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell><strong>TOTALT</strong></TableCell>
                    <TableCell align="right">-</TableCell>
                    <TableCell align="right">
                      <strong>{formatCurrency(summary.totalImplementationCost)}</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>{formatCurrency(summary.totalAnnualSaving)}</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>{formatCurrency(summary.totalRevenueUplift)}</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>{formatCurrency(summary.totalAnnualValue)}</strong>
                    </TableCell>
                    <TableCell align="right">
                      <Chip
                        label={formatPercentage(summary.overallROI)}
                        color={summary.overallROI > 100 ? 'success' : summary.overallROI > 50 ? 'warning' : 'default'}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <strong>{formatMonths(summary.overallPayback)}</strong>
                    </TableCell>
                    <TableCell align="center">-</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {opportunities.length === 0 && (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <CalculateIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Ingen AI-muligheter å beregne ROI for
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Gå til Mulighetsmatrise for å identifisere AI-muligheter først
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* ROI Calculator Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          ROI Kalkulator - {selectedOpportunity?.title}
        </DialogTitle>
        <DialogContent>
          {selectedOpportunity && (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Alert severity="info">
                    <Typography variant="body2">
                      <strong>Timer spart per uke:</strong> {selectedOpportunity.estimatedTimeSaved} timer
                    </Typography>
                  </Alert>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Implementeringskostnad (NOK)"
                    value={calculationData.implementationCost}
                    onChange={(e) => setCalculationData({ ...calculationData, implementationCost: Number(e.target.value) })}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Beregnet ROI
                  </Typography>
                </Grid>

                {calculationData.implementationCost > 0 && (
                  <>
                    {(() => {
                      const roiResult = calculateROI(selectedOpportunity, calculationData.implementationCost);
                      return (
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <Card variant="outlined">
                              <CardContent>
                                <Typography variant="subtitle2" gutterBottom>
                                  Direkte Kostnadsbesparelser
                                </Typography>
                                <Typography variant="h6" color="success.main">
                                  {formatCurrency(roiResult.annualCostSaving)} /år
                                </Typography>
                                <Typography variant="caption" display="block">
                                  {selectedOpportunity.estimatedTimeSaved * 52} timer × {calculationData.averageHourlyRate} NOK/time
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Card variant="outlined">
                              <CardContent>
                                <Typography variant="subtitle2" gutterBottom>
                                  Potensiell Inntektsøkning
                                </Typography>
                                <Typography variant="h6" color="secondary.main">
                                  {formatCurrency(roiResult.revenueUplift)} /år
                                </Typography>
                                <Typography variant="caption" display="block">
                                  {((selectedOpportunity.estimatedTimeSaved * calculationData.reallocationPercentage / 100) * 52).toFixed(0)} timer × {calculationData.revenuePerHour} NOK/time
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Card variant="outlined" sx={{ bgcolor: 'primary.50' }}>
                              <CardContent>
                                <Typography variant="subtitle2" gutterBottom>
                                  Total Årlig Verdi
                                </Typography>
                                <Typography variant="h5" color="primary.main">
                                  {formatCurrency(roiResult.totalAnnualValue)}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <Card variant="outlined" sx={{ bgcolor: 'warning.50' }}>
                              <CardContent>
                                <Typography variant="subtitle2" gutterBottom>
                                  ROI & Payback
                                </Typography>
                                <Typography variant="h5" color="warning.main">
                                  {formatPercentage(roiResult.simpleROI)}
                                </Typography>
                                <Typography variant="caption" display="block">
                                  Payback: {formatMonths(roiResult.paybackPeriod)}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        </Grid>
                      );
                    })()}
                  </>
                )}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            Avbryt
          </Button>
          <Button onClick={handleCreateROICalculation} variant="contained">
            Lagre Beregning
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ROICalculator;