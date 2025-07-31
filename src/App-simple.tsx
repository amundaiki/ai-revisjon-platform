import React, { useState } from 'react';

const SimpleApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'interviews':
        return <Interviews />;
      case 'process':
        return <ProcessMapping />;
      case 'matrix':
        return <OpportunityMatrix />;
      case 'roi':
        return <ROICalculator />;
      case 'presentation':
        return <Presentation />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0 }}>
      <header style={{ backgroundColor: '#1976d2', color: 'white', padding: '1rem' }}>
        <h1>AI Revisjon Platform</h1>
      </header>
      
      <nav style={{ backgroundColor: '#f5f5f5', padding: '0.5rem', borderBottom: '1px solid #ddd' }}>
        {[
          { id: 'dashboard', label: '📋 Dashboard' },
          { id: 'interviews', label: '🎤 Intervjuer' },
          { id: 'process', label: '🗺️ Prosess Mapping' },
          { id: 'matrix', label: '📊 Mulighetsmatrise' },
          { id: 'roi', label: '💰 ROI Kalkulator' },
          { id: 'presentation', label: '📑 Presentasjon' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              margin: '0 0.5rem',
              padding: '0.5rem 1rem',
              border: 'none',
              backgroundColor: activeTab === tab.id ? '#1976d2' : 'white',
              color: activeTab === tab.id ? 'white' : '#333',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      
      <main style={{ padding: '2rem' }}>
        {renderContent()}
      </main>
    </div>
  );
};

const Dashboard = () => (
  <div>
    <h2>📋 Dashboard</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
      <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
        <h3>Prosjektoversikt</h3>
        <p>Opprett og administrer AI revisjon prosjekter</p>
        <button style={{ backgroundColor: '#4caf50', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
          Nytt Prosjekt
        </button>
      </div>
      <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
        <h3>Fremgang</h3>
        <p>Spor fremgang gjennom AI audit prosessen</p>
        <div style={{ backgroundColor: '#e0e0e0', height: '10px', borderRadius: '5px' }}>
          <div style={{ backgroundColor: '#2196f3', height: '100%', width: '40%', borderRadius: '5px' }}></div>
        </div>
        <small>40% fullført</small>
      </div>
    </div>
    
    <h3>Kom i gang</h3>
    <ol>
      <li>Start med <strong>Intervjuer</strong> for å samle data fra stakeholders og sluttbrukere</li>
      <li>Bruk <strong>Prosess Mapping</strong> til å kartlegge bedriftens kjerneprosesser</li>
      <li>Identifiser AI-muligheter i <strong>Mulighetsmatrise</strong></li>
      <li>Beregn ROI med <strong>ROI Kalkulatoren</strong></li>
      <li>Generer ferdig rapport i <strong>Presentasjon</strong></li>
    </ol>
  </div>
);

const Interviews = () => (
  <div>
    <h2>🎤 Intervju Modul</h2>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
        <h3>👥 Stakeholder Intervjuer</h3>
        <p>30,000-fots perspektiv fra ledelse</p>
        <div style={{ marginBottom: '1rem' }}>
          <h4>Nøkkelspørsmål:</h4>
          <ul>
            <li>Kan du beskrive din rolle og teamets hovedansvar?</li>
            <li>Hva er de viktigste målene eller KPI-ene?</li>
            <li>Hvor ser du de største flaskehalser i arbeidsflyt?</li>
            <li>Hva er de største frustrasjonene med teknologistakken?</li>
          </ul>
        </div>
        <button style={{ backgroundColor: '#2196f3', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
          Nytt Stakeholder Intervju
        </button>
      </div>
      
      <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
        <h3>👤 Sluttbruker Intervjuer</h3>
        <p>Operasjonelt perspektiv fra de som gjør arbeidet</p>
        <div style={{ marginBottom: '1rem' }}>
          <h4>Nøkkelspørsmål:</h4>
          <ul>
            <li>Kan du ta meg gjennom en typisk arbeidsdag?</li>
            <li>Hva er de mest manuelle og repetitive oppgavene?</li>
            <li>Hvilken del av prosessen tar mest tid?</li>
            <li>Hvis du hadde en assistent, hvilke oppgaver ville du gitt dem?</li>
          </ul>
        </div>
        <button style={{ backgroundColor: '#2196f3', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
          Nytt Sluttbruker Intervju
        </button>
      </div>
    </div>
  </div>
);

const ProcessMapping = () => (
  <div>
    <h2>🗺️ Prosess Mapping - Ops Canvas</h2>
    <p>Kartlegg bedriftens kjerneprosesser i de tre hovedmotorene</p>
    
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
      <div style={{ border: '2px solid #4caf50', padding: '1rem', borderRadius: '8px' }}>
        <h3>🎯 Akkvisisjonsmotor</h3>
        <p><em>Hvordan finner og signerer dere nye kunder?</em></p>
        <div style={{ marginTop: '1rem' }}>
          <div style={{ backgroundColor: '#fff3cd', padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '4px' }}>
            ⚠️ Manuell leadkvalifisering (Tidssink)
          </div>
          <div style={{ backgroundColor: '#f8f9fa', padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '4px' }}>
            CRM oppdatering
          </div>
        </div>
        <button style={{ backgroundColor: '#4caf50', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}>
          + Legg til prosess
        </button>
      </div>
      
      <div style={{ border: '2px solid #ff9800', padding: '1rem', borderRadius: '8px' }}>
        <h3>🔧 Leveransemotor</h3>
        <p><em>Hvordan leverer dere produktet eller tjenesten?</em></p>
        <div style={{ marginTop: '1rem' }}>
          <div style={{ backgroundColor: '#ffebee', padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '4px' }}>
            ⚠️ Manuell rapportgenerering (Kvalitetsrisiko)
          </div>
          <div style={{ backgroundColor: '#f8f9fa', padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '4px' }}>
            Prosjektstatus oppdatering
          </div>
        </div>
        <button style={{ backgroundColor: '#ff9800', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}>
          + Legg til prosess
        </button>
      </div>
      
      <div style={{ border: '2px solid #2196f3', padding: '1rem', borderRadius: '8px' }}>
        <h3>🛟 Støttemotor</h3>
        <p><em>Hvordan håndterer dere kundesupport og oppfølging?</em></p>
        <div style={{ marginTop: '1rem' }}>
          <div style={{ backgroundColor: '#fff3cd', padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '4px' }}>
            ⚠️ E-post sortering (Tidssink)
          </div>
          <div style={{ backgroundColor: '#f8f9fa', padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '4px' }}>
            Kundeoppfølging
          </div>
        </div>
        <button style={{ backgroundColor: '#2196f3', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}>
          + Legg til prosess
        </button>
      </div>
    </div>
    
    <div style={{ backgroundColor: '#e3f2fd', padding: '1rem', borderRadius: '8px' }}>
      <h4>💡 Tips:</h4>
      <p>Marker prosesstrinn som <strong>Tidssink</strong> (gul) hvis de er manuelle, repetitive og tidkrevende. 
      Marker som <strong>Kvalitetsrisiko</strong> (rød) hvis de er utsatt for menneskelige feil.</p>
    </div>
  </div>
);

const OpportunityMatrix = () => (
  <div>
    <h2>📊 AI Mulighetsmatrise</h2>
    <p>Plasser AI-muligheter basert på forretningsimpact vs implementeringsinnsats</p>
    
    <div style={{ border: '2px solid #ddd', width: '600px', height: '400px', position: 'relative', margin: '2rem auto', background: 'linear-gradient(45deg, #ffebee 0%, #e8f5e8 100%)' }}>
      <div style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', fontWeight: 'bold' }}>
        HØY IMPACT
      </div>
      <div style={{ position: 'absolute', bottom: '-30px', left: '50%', transform: 'translateX(-50%)', fontWeight: 'bold' }}>
        LAV IMPACT
      </div>
      <div style={{ position: 'absolute', left: '-80px', top: '50%', transform: 'translateY(-50%) rotate(-90deg)', fontWeight: 'bold' }}>
        LAV INNSATS
      </div>
      <div style={{ position: 'absolute', right: '-80px', top: '50%', transform: 'translateY(-50%) rotate(90deg)', fontWeight: 'bold' }}>
        HØY INNSATS
      </div>
      
      {/* Quadrant labels */}
      <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'rgba(76, 175, 80, 0.8)', color: 'white', padding: '5px', borderRadius: '4px', fontSize: '12px' }}>
        🌟 HURTIGE GEVINSTER
      </div>
      <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(33, 150, 243, 0.8)', color: 'white', padding: '5px', borderRadius: '4px', fontSize: '12px' }}>
        🚀 STORE SATSINGER
      </div>
      <div style={{ position: 'absolute', bottom: '10px', left: '10px', backgroundColor: 'rgba(255, 152, 0, 0.8)', color: 'white', padding: '5px', borderRadius: '4px', fontSize: '12px' }}>
        👍 NICE-TO-HAVE
      </div>
      <div style={{ position: 'absolute', bottom: '10px', right: '10px', backgroundColor: 'rgba(244, 67, 54, 0.8)', color: 'white', padding: '5px', borderRadius: '4px', fontSize: '12px' }}>
        🚫 DEPRIORITÉR
      </div>
      
      {/* Center lines */}
      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', backgroundColor: '#666', opacity: 0.3 }}></div>
      <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', backgroundColor: '#666', opacity: 0.3 }}></div>
      
      {/* Example opportunities */}
      <div style={{ position: 'absolute', left: '20%', top: '25%', backgroundColor: '#4caf50', color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' }}>
        CRM Automatisering
      </div>
      <div style={{ position: 'absolute', left: '75%', top: '20%', backgroundColor: '#2196f3', color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' }}>
        AI Chatbot
      </div>
    </div>
    
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '2rem' }}>
      <div style={{ textAlign: 'center', padding: '1rem', border: '1px solid #4caf50', borderRadius: '8px' }}>
        <h3 style={{ color: '#4caf50' }}>🌟 Hurtige Gevinster</h3>
        <div style={{ fontSize: '2rem', color: '#4caf50' }}>3</div>
        <p>Høy impact, lav innsats - Start her!</p>
      </div>
      <div style={{ textAlign: 'center', padding: '1rem', border: '1px solid #2196f3', borderRadius: '8px' }}>
        <h3 style={{ color: '#2196f3' }}>🚀 Store Satsinger</h3>
        <div style={{ fontSize: '2rem', color: '#2196f3' }}>2</div>
        <p>Transformative prosjekter</p>
      </div>
      <div style={{ textAlign: 'center', padding: '1rem', border: '1px solid #ff9800', borderRadius: '8px' }}>
        <h3 style={{ color: '#ff9800' }}>👍 Nice-to-Have</h3>
        <div style={{ fontSize: '2rem', color: '#ff9800' }}>1</div>
        <p>Når tid tillater</p>
      </div>
      <div style={{ textAlign: 'center', padding: '1rem', border: '1px solid #f44336', borderRadius: '8px' }}>
        <h3 style={{ color: '#f44336' }}>🚫 Deprioritér</h3>
        <div style={{ fontSize: '2rem', color: '#f44336' }}>0</div>
        <p>Unngå disse</p>
      </div>
    </div>
  </div>
);

const ROICalculator = () => (
  <div>
    <h2>💰 ROI Kalkulator</h2>
    <p>Beregn returen på investering for AI-løsninger</p>
    
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
      <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
        <h3>Total Investering</h3>
        <div style={{ fontSize: '1.5rem', color: '#1976d2' }}>750.000 NOK</div>
      </div>
      <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#e8f5e8', borderRadius: '8px' }}>
        <h3>Årlig Besparelse</h3>
        <div style={{ fontSize: '1.5rem', color: '#388e3c' }}>1.200.000 NOK</div>
      </div>
      <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#fff3e0', borderRadius: '8px' }}>
        <h3>ROI</h3>
        <div style={{ fontSize: '1.5rem', color: '#f57c00' }}>160%</div>
      </div>
      <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#fce4ec', borderRadius: '8px' }}>
        <h3>Payback</h3>
        <div style={{ fontSize: '1.5rem', color: '#c2185b' }}>7.5 mnd</div>
      </div>
    </div>
    
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f5f5f5' }}>
          <tr>
            <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid #ddd' }}>AI-løsning</th>
            <th style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid #ddd' }}>Investering</th>
            <th style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid #ddd' }}>Årlig besparelse</th>
            <th style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid #ddd' }}>ROI</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>CRM Automatisering</td>
            <td style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid #eee' }}>250.000 NOK</td>
            <td style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid #eee' }}>480.000 NOK</td>
            <td style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid #eee' }}>
              <span style={{ backgroundColor: '#4caf50', color: 'white', padding: '2px 8px', borderRadius: '12px' }}>192%</span>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>Rapport Automatisering</td>
            <td style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid #eee' }}>300.000 NOK</td>
            <td style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid #eee' }}>420.000 NOK</td>
            <td style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid #eee' }}>
              <span style={{ backgroundColor: '#4caf50', color: 'white', padding: '2px 8px', borderRadius: '12px' }}>140%</span>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>E-post Klassifisering</td>
            <td style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid #eee' }}>200.000 NOK</td>
            <td style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid #eee' }}>300.000 NOK</td>
            <td style={{ padding: '1rem', textAlign: 'right', borderBottom: '1px solid #eee' }}>
              <span style={{ backgroundColor: '#ff9800', color: 'white', padding: '2px 8px', borderRadius: '12px' }}>150%</span>
            </td>
          </tr>
          <tr style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
            <td style={{ padding: '1rem' }}>TOTALT</td>
            <td style={{ padding: '1rem', textAlign: 'right' }}>750.000 NOK</td>
            <td style={{ padding: '1rem', textAlign: 'right' }}>1.200.000 NOK</td>
            <td style={{ padding: '1rem', textAlign: 'right' }}>
              <span style={{ backgroundColor: '#4caf50', color: 'white', padding: '2px 8px', borderRadius: '12px' }}>160%</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const Presentation = () => (
  <div>
    <h2>📑 Presentasjonsgenerator</h2>
    <p>Automatisk sammenstilling av alle funn til klientpresentasjon</p>
    
    <div style={{ marginBottom: '2rem' }}>
      <button style={{ backgroundColor: '#4caf50', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', marginRight: '1rem' }}>
        📄 Eksporter PDF
      </button>
      <button style={{ backgroundColor: '#2196f3', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>
        🖨️ Skriv ut
      </button>
    </div>
    
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '2rem', backgroundColor: 'white' }}>
      <h3>AI Revisjon Presentasjon - 6 Nøkkelslides</h3>
      
      <div style={{ marginBottom: '2rem' }}>
        <h4>Slide 1: Prosjektomfang & Målsettinger</h4>
        <ul>
          <li>✅ 8 intervjuer gjennomført</li>
          <li>✅ 12 prosesstrinn kartlagt</li>
          <li>✅ 6 AI-muligheter identifisert</li>
          <li>✅ 3 problemområder funnet</li>
        </ul>
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h4>Slide 2: Kartleggingsfunn</h4>
        <p>Viktigste funn fra stakeholder og sluttbruker intervjuer...</p>
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h4>Slide 3: Ops Canvas - Prosess Analyse</h4>
        <p>Visuell fremstilling av de tre motorene med identifiserte problemområder...</p>
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h4>Slide 4: AI Mulighetsmatrise</h4>
        <p>Impact vs innsats med prioriterte anbefalinger...</p>
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h4>Slide 5: Implementeringsplan</h4>
        <p>Roadmap med faser og timeline...</p>
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h4>Slide 6: ROI Analyse - "Money Slide"</h4>
        <p>Komplett finansiell analyse med 160% ROI og 7.5 måneder payback...</p>
      </div>
      
      <div style={{ backgroundColor: '#e8f5e8', padding: '1rem', borderRadius: '8px', marginTop: '2rem' }}>
        <h4>🎯 Anbefalte neste steg:</h4>
        <ol>
          <li>Godkjenn prioriterte løsninger (Hurtige Gevinster)</li>
          <li>Etabler prosjektteam og tildel ressurser</li>
          <li>Start implementering av CRM automatisering (Q1)</li>
          <li>Planlegg fase 2 prosjekter (Q2-Q3)</li>
        </ol>
      </div>
    </div>
  </div>
);

export default SimpleApp;