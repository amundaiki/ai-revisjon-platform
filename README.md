# AI Revisjon Platform

En komplett løsning for å gjennomføre AI-revisjoner basert på Liam Ottleys rammeverk for AI Transformation Partners.

## 🚀 Funksjoner

### 📋 Dashboard
- Oversikt over alle prosjekter
- Fremgangssporing
- Prosjektstyring

### 🎤 Intervju-modul
- **Stakeholder intervjuer** - 30,000-fots perspektiv
- **Sluttbruker intervjuer** - Operasjonelt perspektiv
- Forhåndsdefinerte spørsmål basert på beste praksis
- Strukturert datainnsamling

### 🗺️ Prosess Mapping (Ops Canvas)
- Visuell kartlegging av bedriftens kjerneprosesser
- Tre hovedmotorer: Anskaffelse, Levering, Støtte
- Identifisering av tidssink og kvalitetsrisiko
- Grunnlag for AI-mulighetsidentifisering

### 📊 AI Mulighetsmatrise
- Impact vs Innsats visualisering
- Fire kvadranter:
  - 🌟 **Hurtige Gevinster** (Høy impact, lav innsats)
  - 🚀 **Store Satsinger** (Høy impact, høy innsats) 
  - 👍 **Nice-to-Have** (Lav impact, lav innsats)
  - 🚫 **Deprioritér** (Lav impact, høy innsats)
- Drag-and-drop funksjonalitet
- Prioriteringsverktøy

### 💰 ROI Kalkulator
- Automatisk beregning av:
  - Direkte kostnadsbesparelser
  - Potensielle inntektsøkninger
  - ROI-prosent
  - Payback-periode
- "Money Slide" generering
- Justerbare parametere

### 📑 Presentasjonsgenerator
- Automatisk sammenstilling av alle funn
- 6 nøkkelslides:
  1. Prosjektomfang & Målsettinger
  2. Kartleggingsfunn fra Intervjuer
  3. Ops Canvas - Prosess Analyse
  4. AI Mulighetsmatrise
  5. Implementeringsplan - Roadmap
  6. ROI Analyse - "Money Slide"
- Eksport til PDF/Print

## 🛠️ Installasjon

### Forutsetninger
- Node.js (versjon 16 eller nyere)
- npm eller yarn

### Trinn-for-trinn installasjon

1. **Klon eller last ned prosjektet**
   ```bash
   # Hvis du har git
   git clone <repository-url>
   cd ai-revisjon
   ```

2. **Installer avhengigheter**
   ```bash
   npm install
   ```

3. **Start utviklingsserveren**
   ```bash
   npm start
   ```

4. **Åpne nettleseren**
   Appen kjører på `http://localhost:3000`

## 📖 Bruksanvisning

### 1. Opprett et nytt prosjekt
- Gå til Dashboard
- Klikk "Nytt Prosjekt"
- Fyll inn prosjektnavn og klientnavn

### 2. Gjennomfør intervjuer
- Naviger til "Intervjuer" fanen
- Velg mellom Stakeholder eller Sluttbruker intervjuer
- Opprett nytt intervju med deltaker-informasjon
- Besvar spørsmålene strukturert
- Lagre notater og observasjoner

### 3. Kartlegg prosesser
- Gå til "Prosess Mapping"
- Legg til prosesstrinn for hver av de tre motorene:
  - **Akkvisisjonsmotor**: Hvordan finner og signerer dere kunder?
  - **Leveransemotor**: Hvordan leverer dere produktet/tjenesten?
  - **Støttemotor**: Hvordan håndterer dere kundesupport?
- Marker prosesstrinn som tidssink eller kvalitetsrisiko

### 4. Identifiser AI-muligheter
- Naviger til "Mulighetsmatrise"
- Legg til AI-muligheter basert på identifiserte problemer
- Plasser dem på matrisen etter impact og innsats
- Fokuser på "Hurtige Gevinster" kvadranten først

### 5. Beregn ROI
- Gå til "ROI Kalkulator"
- Juster globale parametere (timelønn, omallokering, etc.)
- Beregn ROI for hver AI-mulighet
- Generer "Money Slide" oversikt

### 6. Generer presentasjon
- Naviger til "Presentasjon"
- Se automatisk sammenstilt rapport
- Eksporter til PDF eller skriv ut
- Bruk i klientpresentasjoner

## 🎯 Metodikk

Denne appen implementerer Liam Ottleys 3-trinns AI Audit rammeverk:

### Trinn 1: Kartleggingsintervjuer
- **Stakeholder intervjuer**: Forståelse av mål, strukturer og strategiske utfordringer
- **Sluttbruker intervjuer**: Praktiske, daglige arbeidsflyter og smertepunkter

### Trinn 2: Kartlegg og identifiser muligheter  
- **Ops Canvas**: Visuell prosessmodellering
- **AI Mulighetsmatrise**: Prioritering basert på impact vs innsats

### Trinn 3: Presenter funn og ROI
- **Databasert forretninscase**: ROI-kalkulasjoner og implementeringsplan
- **Profesjonell presentasjon**: Klar til klientlevering

## 💾 Datalagring

Appen bruker nettleserens lokale lagring (localStorage) for å bevare data mellom økter. Data lagres lokalt på din maskin og sendes ikke til eksterne servere.

### Eksport/Import (Fremtidig funksjonalitet)
- Eksporter prosjektdata til JSON
- Importer eksisterende prosjekter
- Del data mellom teammedlemmer

## 🔧 Teknisk arkitektur

- **Frontend**: React 18 med TypeScript
- **UI-bibliotek**: Material-UI (MUI)
- **Routing**: React Router
- **Grafer**: Chart.js med react-chartjs-2
- **PDF-eksport**: jsPDF og html2canvas
- **Drag-and-drop**: react-beautiful-dnd

## 📊 Eksempel på bruk

### Typisk arbeidsflyt (2-3 uker):

**Uke 1: Kartlegging**
- 3-5 stakeholder intervjuer (30-45 min hver)
- 5-10 sluttbruker intervjuer (30-45 min hver)
- Prosess mapping basert på funn

**Uke 2: Analyse** 
- Identifiser AI-muligheter
- Plasser på mulighetsmatrise
- Beregn ROI for prioriterte løsninger

**Uke 3: Presentasjon**
- Generer fullstendig rapport
- Forbered klientpresentasjon
- Lever anbefaling med prising

### Typisk pris: 10.000 USD for første engasjement

## 🤝 Bidrag

Dette er et verktøy basert på Liam Ottleys offentlige rammeverk. For forbedringer eller feilrapporter, vennligst opprett en issue.

## 📝 Lisens

MIT License - Se LICENSE filen for detaljer.

## 🙏 Takk til

- **Liam Ottley** for det omfattende AI Audit rammeverket
- Morningside AI for metodikk og beste praksis
- AI community for kontinuerlig læring og utvikling

---

**Lykke til med dine AI-revisjoner! 🚀**

> "Framtiden tilhører ikke de som kan bygge AI, men de som kan identifisere hvor den skal brukes." - Liam Ottley