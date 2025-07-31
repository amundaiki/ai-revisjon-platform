/**
 * AI Revisjon Platform - Component Logic
 * Spesialisert logikk for individuelle komponenter
 */

/**
 * Dashboard komponent logikk
 */
const Dashboard = {
    /**
     * Oppdaterer statistikk på dashboard
     * @param {Object} stats - Statistikk objekt med verdier
     */
    updateStats(stats) {
        const elements = {
            interviews: document.querySelector('#dashboard .stat-card:nth-child(1) .stat-value'),
            opportunities: document.querySelector('#dashboard .stat-card:nth-child(2) .stat-value'),
            totalROI: document.querySelector('#dashboard .stat-card:nth-child(3) .stat-value'),
            payback: document.querySelector('#dashboard .stat-card:nth-child(4) .stat-value')
        };
        
        if (elements.interviews) elements.interviews.textContent = stats.interviews || '-';
        if (elements.opportunities) elements.opportunities.textContent = stats.opportunities || '-';
        if (elements.totalROI) elements.totalROI.textContent = stats.totalROI || '-';
        if (elements.payback) elements.payback.textContent = stats.payback || '-';
    },
    
    /**
     * Oppdaterer prosjektfremgang
     * @param {number} percentage - Prosent fullført (0-100)
     */
    updateProgress(percentage) {
        const progressBar = document.querySelector('#dashboard .progress-fill');
        const progressText = document.querySelector('#dashboard small');
        
        if (progressBar) {
            progressBar.style.width = percentage + '%';
        }
        if (progressText) {
            progressText.textContent = `Prosjektfremgang: ${percentage}%`;
        }
    }
};

/**
 * Intervju modul logikk
 */
const InterviewModule = {
    /**
     * Legger til nytt intervju
     * @param {string} type - Type intervju ('stakeholder' eller 'enduser')
     * @param {Object} data - Intervju data
     */
    addInterview(type, data) {
        // Implementer logikk for å legge til intervju
        console.log(`Legger til ${type} intervju:`, data);
    },
    
    /**
     * Viser intervju resultater
     */
    displayInterviews() {
        // Implementer visning av gjennomførte intervjuer
        const statusContainer = document.querySelector('#interviews .card:last-child');
        if (statusContainer) {
            // Oppdater med faktiske intervju data
        }
    }
};

/**
 * Prosess mapping logikk
 */
const ProcessMapping = {
    /**
     * Legger til prosess til spesifisert motor
     * @param {string} engine - Motor type ('acquisition', 'delivery', 'support')
     * @param {Object} process - Prosess data
     */
    addProcess(engine, process) {
        console.log(`Legger til prosess i ${engine} motor:`, process);
    },
    
    /**
     * Oppdaterer prosess status (tidssink, kvalitetsrisiko)
     * @param {string} processId - Prosess ID
     * @param {string} status - Status type
     */
    updateProcessStatus(processId, status) {
        console.log(`Oppdaterer prosess ${processId} status: ${status}`);
    }
};

/**
 * Mulighetsmatrise logikk
 */
const OpportunityMatrix = {
    /**
     * Legger til AI-mulighet i matrisen
     * @param {Object} opportunity - Mulighet objekt med impact og effort verdier
     */
    addOpportunity(opportunity) {
        const container = document.querySelector('.matrix-container');
        if (!container) return;
        
        // Beregn posisjon basert på impact (y) og effort (x)
        const x = (opportunity.effort / 10) * 100; // Assuming scale 1-10
        const y = 100 - (opportunity.impact / 10) * 100; // Inverted for visual
        
        const chip = document.createElement('div');
        chip.className = 'opportunity-chip';
        chip.style.left = x + '%';
        chip.style.top = y + '%';
        chip.style.background = this.getQuadrantColor(opportunity.impact, opportunity.effort);
        chip.textContent = opportunity.name;
        
        container.appendChild(chip);
    },
    
    /**
     * Bestemmer farge basert på kvadrant
     * @param {number} impact - Impact verdi (1-10)
     * @param {number} effort - Effort verdi (1-10)
     * @returns {string} CSS farge
     */
    getQuadrantColor(impact, effort) {
        if (impact > 5 && effort <= 5) return '#4caf50'; // Hurtige gevinster
        if (impact > 5 && effort > 5) return '#2196f3';  // Store satsinger
        if (impact <= 5 && effort <= 5) return '#ff9800'; // Nice-to-have
        return '#f44336'; // Deprioritér
    },
    
    /**
     * Oppdaterer kvadrant tellere
     */
    updateQuadrantCounts() {
        // Implementer telling av muligheter per kvadrant
        const chips = document.querySelectorAll('.opportunity-chip');
        // Logic for counting and updating display
    }
};

/**
 * ROI Kalkulator logikk
 */
const ROICalculator = {
    /**
     * Beregner ROI for alle muligheter
     * @param {Array} opportunities - Array av AI-muligheter
     * @returns {Object} ROI resultater
     */
    calculateTotal(opportunities) {
        let totalInvestment = 0;
        let annualSavings = 0;
        
        opportunities.forEach(opp => {
            totalInvestment += opp.investment || 0;
            annualSavings += opp.annualSavings || 0;
        });
        
        const roi = annualSavings > 0 ? ((annualSavings - totalInvestment) / totalInvestment * 100) : 0;
        const payback = totalInvestment > 0 ? (totalInvestment / (annualSavings / 12)) : 0;
        
        return {
            totalInvestment,
            annualSavings,
            roi: Math.round(roi),
            payback: Math.round(payback)
        };
    },
    
    /**
     * Oppdaterer ROI display
     * @param {Object} results - ROI resultater
     */
    updateDisplay(results) {
        const elements = {
            investment: document.querySelector('#roi .stat-card:nth-child(1) .stat-value'),
            savings: document.querySelector('#roi .stat-card:nth-child(2) .stat-value'),
            roi: document.querySelector('#roi .stat-card:nth-child(3) .stat-value'),
            payback: document.querySelector('#roi .stat-card:nth-child(4) .stat-value')
        };
        
        if (elements.investment) elements.investment.textContent = this.formatCurrency(results.totalInvestment);
        if (elements.savings) elements.savings.textContent = this.formatCurrency(results.annualSavings);
        if (elements.roi) elements.roi.textContent = results.roi + '%';
        if (elements.payback) elements.payback.textContent = results.payback;
    },
    
    /**
     * Formaterer tall til valuta
     * @param {number} amount - Beløp
     * @returns {string} Formatert valuta string
     */
    formatCurrency(amount) {
        return new Intl.NumberFormat('no-NO', {
            style: 'currency',
            currency: 'NOK',
            minimumFractionDigits: 0
        }).format(amount);
    }
};

/**
 * Presentasjon generator
 */
const PresentationGenerator = {
    /**
     * Genererer komplett presentasjon
     * @returns {Object} Presentasjon data
     */
    generate() {
        // Samle data fra alle moduler
        const data = {
            interviews: InterviewModule.getInterviewData(),
            processes: ProcessMapping.getProcessData(),
            opportunities: OpportunityMatrix.getOpportunityData(),
            roi: ROICalculator.getROIData()
        };
        
        return this.buildPresentation(data);
    },
    
    /**
     * Bygger presentasjons-struktur
     * @param {Object} data - All nødvendig data
     * @returns {Object} Strukturert presentasjon
     */
    buildPresentation(data) {
        return {
            slide1: this.buildSlide1(data),
            slide2: this.buildSlide2(data.interviews),
            slide3: this.buildSlide3(data.processes),
            slide4: this.buildSlide4(data.opportunities),
            slide5: this.buildSlide5(data.opportunities),
            slide6: this.buildSlide6(data.roi)
        };
    },
    
    // Individual slide builders...
    buildSlide1(data) { return {}; },
    buildSlide2(interviews) { return {}; },
    buildSlide3(processes) { return {}; },
    buildSlide4(opportunities) { return {}; },
    buildSlide5(opportunities) { return {}; },
    buildSlide6(roi) { return {}; }
};

/**
 * ROI Calculator Functions
 */
function calculateROI() {
    const developmentCost = parseFloat(document.getElementById('development-cost').value) || 0;
    const implementationCost = parseFloat(document.getElementById('implementation-cost').value) || 0;
    const annualOperationCost = parseFloat(document.getElementById('annual-operation-cost').value) || 0;
    const hoursSaved = parseFloat(document.getElementById('hours-saved').value) || 0;
    const hourlyRate = parseFloat(document.getElementById('hourly-rate').value) || 0;
    const additionalRevenue = parseFloat(document.getElementById('additional-revenue').value) || 0;
    
    // Beregninger
    const totalInitialInvestment = developmentCost + implementationCost;
    const annualTimeSavings = hoursSaved * 52 * hourlyRate; // 52 uker per år
    const annualSavings = annualTimeSavings + additionalRevenue;
    const annualNetSavings = annualSavings - annualOperationCost;
    
    // 3-års analyse
    const threeYearCosts = totalInitialInvestment + (annualOperationCost * 3);
    const threeYearSavings = annualSavings * 3;
    const netSavings = threeYearSavings - threeYearCosts;
    const roi = threeYearCosts > 0 ? ((netSavings / threeYearCosts) * 100) : 0;
    const paybackMonths = annualNetSavings > 0 ? (totalInitialInvestment / (annualNetSavings / 12)) : 0;
    
    // Oppdater display
    document.getElementById('total-investment').textContent = formatCurrency(totalInitialInvestment);
    document.getElementById('annual-savings').textContent = formatCurrency(annualSavings);
    document.getElementById('roi-percentage').textContent = Math.round(roi) + '%';
    document.getElementById('payback-period').textContent = Math.round(paybackMonths);
    
    // Vis detaljert analyse
    showROIResults(threeYearCosts, threeYearSavings, roi, paybackMonths, annualTimeSavings);
}

function showROIResults(costs, savings, roi, payback, timeSavings) {
    const resultsDiv = document.getElementById('roi-results');
    const costBreakdown = document.getElementById('cost-breakdown');
    const savingsBreakdown = document.getElementById('savings-breakdown');
    const recommendation = document.getElementById('roi-recommendation');
    
    // Kostnad breakdown
    costBreakdown.innerHTML = `
        <li>Initial investering: ${formatCurrency(parseFloat(document.getElementById('development-cost').value || 0) + parseFloat(document.getElementById('implementation-cost').value || 0))}</li>
        <li>3 års drift: ${formatCurrency(parseFloat(document.getElementById('annual-operation-cost').value || 0) * 3)}</li>
        <li><strong>Total kostnad: ${formatCurrency(costs)}</strong></li>
    `;
    
    // Besparelse breakdown
    savingsBreakdown.innerHTML = `
        <li>Tidsbesparelser: ${formatCurrency(timeSavings * 3)}</li>
        <li>Ekstra inntekt: ${formatCurrency(parseFloat(document.getElementById('additional-revenue').value || 0) * 3)}</li>
        <li><strong>Total besparelse: ${formatCurrency(savings)}</strong></li>
    `;
    
    // Anbefaling
    let recommendationText = '';
    if (roi > 200) {
        recommendationText = '🌟 Utmerket investering! Høy ROI og rask tilbakebetaling. Anbefales sterkt.';
    } else if (roi > 100) {
        recommendationText = '👍 God investering. Positiv ROI og akseptabel tilbakebetaling.';
    } else if (roi > 0) {
        recommendationText = '⚠️ Moderat investering. Vurder om det finnes bedre alternativer.';
    } else {
        recommendationText = '❌ Ikke lønnsom investering. Anbefales ikke med nåværende parametre.';
    }
    
    recommendation.textContent = recommendationText;
    resultsDiv.style.display = 'block';
}

function addToOpportunityMatrix() {
    // Get ROI calculation data
    const developmentCost = parseFloat(document.getElementById('development-cost').value) || 0;
    const implementationCost = parseFloat(document.getElementById('implementation-cost').value) || 0;
    const annualOperationCost = parseFloat(document.getElementById('annual-operation-cost').value) || 0;
    const hoursSaved = parseFloat(document.getElementById('hours-saved').value) || 0;
    const hourlyRate = parseFloat(document.getElementById('hourly-rate').value) || 0;
    const additionalRevenue = parseFloat(document.getElementById('additional-revenue').value) || 0;
    
    if (!developmentCost && !implementationCost) {
        alert('Vennligst legg inn kostnadsdata først.');
        return;
    }
    
    // Calculate values
    const totalCost = developmentCost + implementationCost;
    const annualSavings = (hoursSaved * 52 * hourlyRate) + additionalRevenue;
    
    // Estimate impact and effort based on cost and savings
    const impact = Math.min(Math.max(Math.round((annualSavings / 100000) * 2), 1), 10);
    const effort = Math.min(Math.max(Math.round((totalCost / 50000)), 1), 10);
    
    // Create opportunity name
    const opportunityName = `ROI Løsning (${Math.round(annualSavings/1000)}k besparelse)`;
    
    // Add to current project
    if (window.projects && window.currentProject) {
        window.projects[window.currentProject].opportunities.push({
            name: opportunityName,
            impact: impact,
            effort: effort,
            cost: totalCost,
            savings: annualSavings,
            type: 'custom'
        });
        
        // Update dashboard
        if (window.updateDashboard) {
            window.updateDashboard();
        }
    }
    
    alert('Løsningen er lagt til i Mulighetsmatrisen! 🎯');
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('no-NO', {
        style: 'currency',
        currency: 'NOK',
        minimumFractionDigits: 0
    }).format(amount);
}

/**
 * Opportunity Matrix Functions
 */
function addCustomOpportunity() {
    const name = document.getElementById('custom-solution-name').value;
    const impact = document.getElementById('custom-impact').value;
    const effort = document.getElementById('custom-effort').value;
    const cost = document.getElementById('custom-cost').value;
    const savings = document.getElementById('custom-savings').value;
    
    if (!name) {
        alert('Vennligst skriv inn løsningsnavn');
        return;
    }
    
    // Save to current project
    if (window.projects && window.currentProject) {
        window.projects[window.currentProject].opportunities.push({
            name: name,
            impact: parseInt(impact),
            effort: parseInt(effort),
            cost: parseInt(cost) || 0,
            savings: parseInt(savings) || 0,
            type: 'custom'
        });
        
        // Update progress
        window.projects[window.currentProject].progress = Math.min(
            window.projects[window.currentProject].progress + 5, 
            100
        );
        
        // Update dashboard
        if (window.updateDashboard) {
            window.updateDashboard();
        }
    }
    
    // Opprett chip
    const chip = createOpportunityChip(name, impact, effort, cost, savings);
    addChipToMatrix(chip, impact, effort);
    
    // Reset form
    document.getElementById('custom-solution-name').value = '';
    document.getElementById('custom-cost').value = '';
    document.getElementById('custom-savings').value = '';
    
    alert(`AI-mulighet "${name}" lagt til! 🚀`);
}

function createOpportunityChip(name, impact, effort, cost, savings) {
    const chip = document.createElement('div');
    chip.className = 'opportunity-chip';
    chip.textContent = name;
    chip.dataset.impact = impact;
    chip.dataset.effort = effort;
    chip.dataset.cost = cost;
    chip.dataset.savings = savings;
    
    // Bestem farge basert på kvadrant
    chip.style.background = getQuadrantColor(impact, effort);
    
    return chip;
}

function addChipToMatrix(chip, impact, effort) {
    const matrix = document.querySelector('.matrix-container');
    
    // Beregn posisjon (effort = x, impact = y invertert)
    const x = (effort / 10) * 90 + 5; // 5-95% av bredden
    const y = (1 - impact / 10) * 90 + 5; // Invertert for visual
    
    chip.style.position = 'absolute';
    chip.style.left = x + '%';
    chip.style.top = y + '%';
    chip.style.transform = 'translate(-50%, -50%)';
    
    matrix.appendChild(chip);
}

function getQuadrantColor(impact, effort) {
    if (impact > 5 && effort <= 5) return '#4caf50'; // Hurtige gevinster
    if (impact > 5 && effort > 5) return '#2196f3';  // Store satsinger
    if (impact <= 5 && effort <= 5) return '#ff9800'; // Nice-to-have
    return '#f44336'; // Deprioritér
}

// Range slider oppdatering
document.addEventListener('DOMContentLoaded', function() {
    const impactSlider = document.getElementById('custom-impact');
    const effortSlider = document.getElementById('custom-effort');
    const impactValue = document.getElementById('impact-value');
    const effortValue = document.getElementById('effort-value');
    
    if (impactSlider) {
        impactSlider.addEventListener('input', function() {
            impactValue.textContent = this.value;
        });
    }
    
    if (effortSlider) {
        effortSlider.addEventListener('input', function() {
            effortValue.textContent = this.value;
        });
    }
    
    // Drag and drop for populære løsninger
    initializeDragAndDrop();
});

function initializeDragAndDrop() {
    const solutionChips = document.querySelectorAll('.solution-chip');
    const matrixContainer = document.querySelector('.matrix-container');
    
    solutionChips.forEach(chip => {
        chip.addEventListener('dragstart', function(e) {
            this.classList.add('dragging');
            e.dataTransfer.setData('text/plain', '');
        });
        
        chip.addEventListener('dragend', function() {
            this.classList.remove('dragging');
        });
    });
    
    if (matrixContainer) {
        matrixContainer.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('drag-over');
        });
        
        matrixContainer.addEventListener('dragleave', function() {
            this.classList.remove('drag-over');
        });
        
        matrixContainer.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            
            const draggingChip = document.querySelector('.solution-chip.dragging');
            if (draggingChip) {
                const rect = this.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                // Beregn impact og effort basert på posisjon
                const effort = Math.round((x / 100) * 10);
                const impact = Math.round((1 - y / 100) * 10);
                
                // Save to current project
                if (window.projects && window.currentProject) {
                    window.projects[window.currentProject].opportunities.push({
                        name: draggingChip.textContent,
                        impact: impact,
                        effort: effort,
                        cost: parseInt(draggingChip.dataset.cost) || 0,
                        savings: parseInt(draggingChip.dataset.savings) || 0,
                        type: 'popular'
                    });
                    
                    // Update progress
                    window.projects[window.currentProject].progress = Math.min(
                        window.projects[window.currentProject].progress + 5, 
                        100
                    );
                    
                    // Update dashboard
                    if (window.updateDashboard) {
                        window.updateDashboard();
                    }
                }
                
                // Opprett ny chip i matrisen
                const newChip = createOpportunityChip(
                    draggingChip.textContent,
                    impact,
                    effort,
                    draggingChip.dataset.cost,
                    draggingChip.dataset.savings
                );
                
                newChip.style.position = 'absolute';
                newChip.style.left = x + '%';
                newChip.style.top = y + '%';
                newChip.style.transform = 'translate(-50%, -50%)';
                
                this.appendChild(newChip);
                
                alert(`${draggingChip.textContent} lagt til i matrisen! 🎯`);
            }
        });
    }
}

// Eksporter moduler
window.AIRevisjonComponents = {
    Dashboard,
    InterviewModule,
    ProcessMapping,
    OpportunityMatrix,
    ROICalculator,
    PresentationGenerator
};

// Eksporter funksjoner globalt
window.calculateROI = calculateROI;
window.addToOpportunityMatrix = addToOpportunityMatrix;
window.addCustomOpportunity = addCustomOpportunity;