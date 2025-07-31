/**
 * AI Revisjon Platform - Main JavaScript
 * Hovedfunksjonalitet for navigasjon og generell interaktivitet
 */

/**
 * Viser spesifisert seksjon og skjuler andre
 * @param {string} sectionId - ID til seksjonen som skal vises
 */
function showSection(sectionId) {
    // Skjul alle seksjoner
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Fjern active klasse fra alle nav-knapper
    const buttons = document.querySelectorAll('.nav-button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Vis valgt seksjon
    document.getElementById(sectionId).classList.add('active');
    
    // Legg til active klasse på klikket knapp
    event.target.classList.add('active');
}

/**
 * Initialiserer applikasjonen når DOM er lastet
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeProgressBars();
    initializeCardInteractions();
    initializeOpportunityChips();
});

/**
 * Animerer progress bars ved lasting
 */
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

/**
 * Legger til hover og klikk-effekter på kort
 */
function initializeCardInteractions() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Kun hvis man klikker på kortet selv, ikke knapper inni
            if (e.target === this || e.target.tagName === 'H3' || e.target.tagName === 'P') {
                this.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
}

/**
 * Legger til klikk-håndtering for AI-mulighet chips
 */
function initializeOpportunityChips() {
    const chips = document.querySelectorAll('.opportunity-chip');
    chips.forEach(chip => {
        chip.addEventListener('click', function() {
            alert('AI-mulighet: ' + this.textContent + '\\n\\nKlikk for å redigere detaljer og ROI-beregninger.');
        });
    });
}

// Eksporter funksjoner for bruk i andre moduler
window.AIRevisjon = {
    showSection,
    initializeProgressBars,
    initializeCardInteractions,
    initializeOpportunityChips
};