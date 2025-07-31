import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
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
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  RecordVoiceOver as InterviewIcon,
  Business as StakeholderIcon,
  Person as UserIcon
} from '@mui/icons-material';
import { Interview, InterviewQuestion, InterviewResponse } from '../types';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';

const InterviewModule: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [newInterview, setNewInterview] = useState({
    type: 'stakeholder' as 'stakeholder' | 'end-user',
    participantName: '',
    participantRole: ''
  });

  const stakeholderQuestions: InterviewQuestion[] = [
    {
      id: 'sh1',
      question: 'Kan du beskrive din rolle og teamets hovedansvar?',
      category: 'Rolle & Team Oversikt',
      required: true
    },
    {
      id: 'sh2',
      question: 'Hva er de viktigste målene eller KPI-ene teamet ditt er ansvarlig for dette kvartalet/året?',
      category: 'Rolle & Team Oversikt',
      required: true
    },
    {
      id: 'sh3',
      question: 'Kan du ta meg gjennom teamets struktur? Hvem rapporterer til hvem?',
      category: 'Rolle & Team Oversikt',
      required: false
    },
    {
      id: 'sh4',
      question: 'Fra et høyt nivå, hva er de mest kritiske prosessene teamet ditt håndterer?',
      category: 'Kjerneprosesser & Arbeidsflyt',
      required: true
    },
    {
      id: 'sh5',
      question: 'Hvor ser du de største flaskehalser eller forsinkelser i teamets arbeidsflyt?',
      category: 'Kjerneprosesser & Arbeidsflyt',
      required: true
    },
    {
      id: 'sh6',
      question: 'Hvilke oppgaver ser ut til å konsumere mest ressurser eller arbeidstimer?',
      category: 'Kjerneprosesser & Arbeidsflyt',
      required: true
    },
    {
      id: 'sh7',
      question: 'Hva er de viktigste programvaresystemene eller verktøyene teamet ditt er avhengig av?',
      category: 'Verktøy & Teknologi',
      required: true
    },
    {
      id: 'sh8',
      question: 'Hva er de største frustrasjonene med din nåværende teknologistakk?',
      category: 'Verktøy & Teknologi',
      required: true
    },
    {
      id: 'sh9',
      question: 'Er det viktige prosesser som skjer utenfor hovedprogramvaren (f.eks. i regneark, e-post, manuelle dokumenter)?',
      category: 'Verktøy & Teknologi',
      required: false
    },
    {
      id: 'sh10',
      question: 'Hva er de største utfordringene teamet ditt står overfor akkurat nå?',
      category: 'Smertepunkter & Strategiske Utfordringer',
      required: true
    },
    {
      id: 'sh11',
      question: 'Hvis du hadde en tryllestav, hva er det ene problemet du ville løst for teamet ditt over natten?',
      category: 'Smertepunkter & Strategiske Utfordringer',
      required: true
    },
    {
      id: 'sh12',
      question: 'Hva føler du hindrer teamet ditt i å være mer effektivt eller virkningsfullt?',
      category: 'Smertepunkter & Strategiske Utfordringer',
      required: true
    },
    {
      id: 'sh13',
      question: 'Hvor ser du de største mulighetene for forbedring i avdelingen din?',
      category: 'Fremtidig Visjon',
      required: true
    },
    {
      id: 'sh14',
      question: 'Hvordan reagerer teamet ditt generelt på ny teknologi? Hva ville gjøre et nytt verktøy vellykket versus sannsynligvis møte motstand?',
      category: 'Fremtidig Visjon',
      required: false
    }
  ];

  const endUserQuestions: InterviewQuestion[] = [
    {
      id: 'eu1',
      question: 'Kan du ta meg gjennom en typisk dag eller uke i din rolle?',
      category: 'Daglig Rolle & Ansvar',
      required: true
    },
    {
      id: 'eu2',
      question: 'Hva er de 1-3 mest vanlige oppgavene du utfører hver dag?',
      category: 'Daglig Rolle & Ansvar',
      required: true
    },
    {
      id: 'eu3',
      question: 'Hvor mye av dagen din brukes på kjerneansvar versus administrative eller repetitive oppgaver?',
      category: 'Daglig Rolle & Ansvar',
      required: true
    },
    {
      id: 'eu4',
      question: 'Kan du ta meg gjennom de eksakte trinnene du tar for å fullføre [en spesifikk, vanlig oppgave]?',
      category: 'Steg-for-Steg Prosess Dybdedykk',
      required: true
    },
    {
      id: 'eu5',
      question: 'Hvilken del av den prosessen er mest manuell eller tar mest tid?',
      category: 'Steg-for-Steg Prosess Dybdedykk',
      required: true
    },
    {
      id: 'eu6',
      question: 'Hvilken informasjon trenger du å finne eller referere til for å fullføre denne oppgaven, og hvor får du den fra?',
      category: 'Steg-for-Steg Prosess Dybdedykk',
      required: true
    },
    {
      id: 'eu7',
      question: 'Hvilken programvare bruker du mest av dagen?',
      category: 'Verktøy & Frustrasjoner',
      required: true
    },
    {
      id: 'eu8',
      question: 'Hva synes du er mest frustrerende med verktøyene du må bruke?',
      category: 'Verktøy & Frustrasjoner',
      required: true
    },
    {
      id: 'eu9',
      question: 'Er det noen dobbel-innlegging av data eller kopiering-og-liming du må gjøre mellom forskjellige systemer?',
      category: 'Verktøy & Frustrasjoner',
      required: true
    },
    {
      id: 'eu10',
      question: 'Hva er den mest kjedelige eller repetitive delen av jobben din?',
      category: 'Smertepunkter & Ønskeliste',
      required: true
    },
    {
      id: 'eu11',
      question: 'Hvis du hadde en assistent, hvilke oppgaver ville du gitt dem umiddelbart?',
      category: 'Smertepunkter & Ønskeliste',
      required: true
    },
    {
      id: 'eu12',
      question: 'Hvordan sporer du arbeidet ditt eller rapporterer om fremgangen din?',
      category: 'Smertepunkter & Ønskeliste',
      required: false
    }
  ];

  useEffect(() => {
    const savedInterviews = localStorage.getItem('ai-revisjon-interviews');
    if (savedInterviews) {
      setInterviews(JSON.parse(savedInterviews));
    }
  }, []);

  const saveInterviews = (updatedInterviews: Interview[]) => {
    setInterviews(updatedInterviews);
    localStorage.setItem('ai-revisjon-interviews', JSON.stringify(updatedInterviews));
  };

  const handleCreateInterview = () => {
    if (newInterview.participantName && newInterview.participantRole) {
      const interview: Interview = {
        id: Date.now().toString(),
        type: newInterview.type,
        participantName: newInterview.participantName,
        participantRole: newInterview.participantRole,
        date: new Date(),
        responses: [],
        status: 'planned'
      };
      
      saveInterviews([...interviews, interview]);
      setNewInterview({ type: 'stakeholder', participantName: '', participantRole: '' });
      setOpenDialog(false);
    }
  };

  const handleStartInterview = (interview: Interview) => {
    const updatedInterview = { ...interview, status: 'in-progress' as const };
    const updatedInterviews = interviews.map(i => i.id === interview.id ? updatedInterview : i);
    saveInterviews(updatedInterviews);
    setSelectedInterview(updatedInterview);
  };

  const handleSaveResponse = (questionId: string, answer: string, notes?: string) => {
    if (!selectedInterview) return;

    const response: InterviewResponse = {
      questionId,
      answer,
      notes,
      timestamp: new Date()
    };

    const existingResponseIndex = selectedInterview.responses.findIndex(r => r.questionId === questionId);
    let updatedResponses;
    
    if (existingResponseIndex >= 0) {
      updatedResponses = [...selectedInterview.responses];
      updatedResponses[existingResponseIndex] = response;
    } else {
      updatedResponses = [...selectedInterview.responses, response];
    }

    const updatedInterview = { ...selectedInterview, responses: updatedResponses };
    const updatedInterviews = interviews.map(i => i.id === selectedInterview.id ? updatedInterview : i);
    
    saveInterviews(updatedInterviews);
    setSelectedInterview(updatedInterview);
  };

  const handleCompleteInterview = () => {
    if (!selectedInterview) return;

    const updatedInterview = { ...selectedInterview, status: 'completed' as const };
    const updatedInterviews = interviews.map(i => i.id === selectedInterview.id ? updatedInterview : i);
    
    saveInterviews(updatedInterviews);
    setSelectedInterview(null);
  };

  const getStatusColor = (status: Interview['status']) => {
    switch (status) {
      case 'planned': return 'default';
      case 'in-progress': return 'primary';
      case 'completed': return 'success';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: Interview['status']) => {
    switch (status) {
      case 'planned': return 'Planlagt';
      case 'in-progress': return 'Pågår';
      case 'completed': return 'Fullført';
      default: return status;
    }
  };

  const getCurrentQuestions = () => {
    return tabValue === 0 ? stakeholderQuestions : endUserQuestions;
  };

  const getFilteredInterviews = () => {
    const type = tabValue === 0 ? 'stakeholder' : 'end-user';
    return interviews.filter(i => i.type === type);
  };

  if (selectedInterview) {
    return <InterviewForm 
      interview={selectedInterview}
      questions={selectedInterview.type === 'stakeholder' ? stakeholderQuestions : endUserQuestions}
      onSaveResponse={handleSaveResponse}
      onComplete={handleCompleteInterview}
      onBack={() => setSelectedInterview(null)}
    />;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Intervju Modul
      </Typography>

      <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ mb: 3 }}>
        <Tab 
          label="Stakeholder Intervjuer" 
          icon={<StakeholderIcon />} 
          iconPosition="start"
        />
        <Tab 
          label="Sluttbruker Intervjuer" 
          icon={<UserIcon />} 
          iconPosition="start"
        />
      </Tabs>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6">
          {tabValue === 0 ? 'Stakeholder Intervjuer' : 'Sluttbruker Intervjuer'}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Nytt Intervju
        </Button>
      </Box>

      <Grid container spacing={3}>
        {getFilteredInterviews().map((interview) => (
          <Grid item xs={12} md={6} key={interview.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Typography variant="h6">
                    {interview.participantName}
                  </Typography>
                  <Chip 
                    label={getStatusLabel(interview.status)}
                    color={getStatusColor(interview.status)}
                    size="small"
                  />
                </Box>
                
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {interview.participantRole}
                </Typography>
                
                <Typography variant="body2" color="textSecondary" mb={2}>
                  {format(new Date(interview.date), 'dd. MMMM yyyy', { locale: nb })}
                </Typography>

                <Typography variant="body2" mb={2}>
                  Svar: {interview.responses.length} / {getCurrentQuestions().length}
                </Typography>

                <Box display="flex" gap={1}>
                  {interview.status === 'planned' && (
                    <Button 
                      variant="contained" 
                      size="small"
                      onClick={() => handleStartInterview(interview)}
                    >
                      Start Intervju
                    </Button>
                  )}
                  {interview.status === 'in-progress' && (
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => setSelectedInterview(interview)}
                    >
                      Fortsett
                    </Button>
                  )}
                  {interview.status === 'completed' && (
                    <Button 
                      variant="text" 
                      size="small"
                      onClick={() => setSelectedInterview(interview)}
                    >
                      Se Svar
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Nytt Intervju</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mb: 2, mt: 1 }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={newInterview.type}
              label="Type"
              onChange={(e) => setNewInterview({ ...newInterview, type: e.target.value as any })}
            >
              <MenuItem value="stakeholder">Stakeholder</MenuItem>
              <MenuItem value="end-user">Sluttbruker</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            margin="dense"
            label="Deltaker Navn"
            fullWidth
            variant="outlined"
            value={newInterview.participantName}
            onChange={(e) => setNewInterview({ ...newInterview, participantName: e.target.value })}
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="dense"
            label="Rolle"
            fullWidth
            variant="outlined"
            value={newInterview.participantRole}
            onChange={(e) => setNewInterview({ ...newInterview, participantRole: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Avbryt</Button>
          <Button onClick={handleCreateInterview} variant="contained">Opprett</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

interface InterviewFormProps {
  interview: Interview;
  questions: InterviewQuestion[];
  onSaveResponse: (questionId: string, answer: string, notes?: string) => void;
  onComplete: () => void;
  onBack: () => void;
}

const InterviewForm: React.FC<InterviewFormProps> = ({
  interview,
  questions,
  onSaveResponse,
  onComplete,
  onBack
}) => {
  const [currentAnswers, setCurrentAnswers] = useState<Record<string, { answer: string; notes?: string }>>({});

  useEffect(() => {
    const answers: Record<string, { answer: string; notes?: string }> = {};
    interview.responses.forEach(response => {
      answers[response.questionId] = {
        answer: response.answer,
        notes: response.notes
      };
    });
    setCurrentAnswers(answers);
  }, [interview.responses]);

  const handleAnswerChange = (questionId: string, answer: string, notes?: string) => {
    setCurrentAnswers(prev => ({
      ...prev,
      [questionId]: { answer, notes }
    }));
    onSaveResponse(questionId, answer, notes);
  };

  const getQuestionsGroupedByCategory = () => {
    const grouped: Record<string, InterviewQuestion[]> = {};
    questions.forEach(question => {
      if (!grouped[question.category]) {
        grouped[question.category] = [];
      }
      grouped[question.category].push(question);
    });
    return grouped;
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" component="h1">
            Intervju: {interview.participantName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {interview.participantRole} - {interview.type === 'stakeholder' ? 'Stakeholder' : 'Sluttbruker'}
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Button onClick={onBack}>
            Tilbake
          </Button>
          <Button variant="contained" onClick={onComplete}>
            Fullfør Intervju
          </Button>
        </Box>
      </Box>

      {Object.entries(getQuestionsGroupedByCategory()).map(([category, categoryQuestions]) => (
        <Accordion key={category} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{category}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {categoryQuestions.map((question) => (
              <Box key={question.id} mb={3}>
                <Typography variant="subtitle1" gutterBottom>
                  {question.question}
                  {question.required && <span style={{ color: 'red' }}> *</span>}
                </Typography>
                
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  variant="outlined"
                  placeholder="Svar..."
                  value={currentAnswers[question.id]?.answer || ''}
                  onChange={(e) => handleAnswerChange(
                    question.id, 
                    e.target.value, 
                    currentAnswers[question.id]?.notes
                  )}
                  sx={{ mb: 1 }}
                />
                
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  variant="outlined"
                  placeholder="Notater (valgfritt)..."
                  value={currentAnswers[question.id]?.notes || ''}
                  onChange={(e) => handleAnswerChange(
                    question.id, 
                    currentAnswers[question.id]?.answer || '', 
                    e.target.value
                  )}
                />
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default InterviewModule;