// 🦖 AIKI Common JavaScript - Shared utilities and functions 🔫

/**
 * AIKI Common Utilities
 * Provides shared functionality across all AIKI applications
 */

// Global AIKI namespace
window.AIKI = window.AIKI || {};

// Configuration
AIKI.config = {
    version: '1.0.0',
    debug: true,
    animations: true,
    sounds: false,
    theme: 'light'
};

/**
 * Utility Functions
 */
AIKI.utils = {
    
    /**
     * Format Norwegian currency
     * @param {number} number - The number to format
     * @returns {string} Formatted currency string
     */
    formatNOK: function(number) {
        if (isNaN(number)) return '0 kr';
        return new Intl.NumberFormat('nb-NO', {
            style: 'currency',
            currency: 'NOK',
            maximumFractionDigits: 0
        }).format(number);
    },

    /**
     * Format large numbers with Norwegian formatting
     * @param {number} number - The number to format
     * @returns {string} Formatted number string
     */
    formatNumber: function(number) {
        if (isNaN(number)) return '0';
        return new Intl.NumberFormat('nb-NO').format(number);
    },

    /**
     * Format percentage
     * @param {number} number - The number to format as percentage
     * @param {number} decimals - Number of decimal places (default: 1)
     * @returns {string} Formatted percentage string
     */
    formatPercent: function(number, decimals = 1) {
        if (isNaN(number)) return '0%';
        return number.toFixed(decimals) + '%';
    },

    /**
     * Create delay/sleep function
     * @param {number} ms - Milliseconds to delay
     * @returns {Promise} Promise that resolves after delay
     */
    delay: function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Debounce function calls
     * @param {Function} func - Function to debounce
     * @param {number} wait - Milliseconds to wait
     * @returns {Function} Debounced function
     */
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Generate random ID
     * @param {number} length - Length of ID (default: 8)
     * @returns {string} Random ID string
     */
    generateId: function(length = 8) {
        return Math.random().toString(36).substr(2, length).toUpperCase();
    },

    /**
     * Validate Norwegian organization number
     * @param {string} orgnr - Organization number to validate
     * @returns {boolean} True if valid
     */
    validateOrgnr: function(orgnr) {
        if (!orgnr || orgnr.length !== 9) return false;
        const weights = [3, 2, 7, 6, 5, 4, 3, 2];
        let sum = 0;
        
        for (let i = 0; i < 8; i++) {
            sum += parseInt(orgnr[i]) * weights[i];
        }
        
        const remainder = sum % 11;
        const checkDigit = remainder < 2 ? remainder : 11 - remainder;
        
        return checkDigit === parseInt(orgnr[8]);
    }
};

/**
 * DOM Utilities
 */
AIKI.dom = {
    
    /**
     * Safe query selector
     * @param {string} selector - CSS selector
     * @param {Element} parent - Parent element (optional)
     * @returns {Element|null} Found element or null
     */
    $: function(selector, parent = document) {
        return parent.querySelector(selector);
    },

    /**
     * Safe query selector all
     * @param {string} selector - CSS selector
     * @param {Element} parent - Parent element (optional)
     * @returns {NodeList} Found elements
     */
    $$: function(selector, parent = document) {
        return parent.querySelectorAll(selector);
    },

    /**
     * Add event listener with automatic cleanup
     * @param {Element} element - Element to add listener to
     * @param {string} event - Event name
     * @param {Function} handler - Event handler
     * @param {Object} options - Event options
     */
    on: function(element, event, handler, options = {}) {
        if (!element) return;
        element.addEventListener(event, handler, options);
        
        // Store for cleanup
        if (!element._aikiListeners) element._aikiListeners = [];
        element._aikiListeners.push({ event, handler, options });
    },

    /**
     * Create element with attributes and content
     * @param {string} tag - HTML tag name
     * @param {Object} attributes - Element attributes
     * @param {string|Element} content - Element content
     * @returns {Element} Created element
     */
    create: function(tag, attributes = {}, content = '') {
        const element = document.createElement(tag);
        
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'dataset') {
                Object.entries(value).forEach(([dataKey, dataValue]) => {
                    element.dataset[dataKey] = dataValue;
                });
            } else {
                element.setAttribute(key, value);
            }
        });
        
        if (typeof content === 'string') {
            element.innerHTML = content;
        } else if (content instanceof Element) {
            element.appendChild(content);
        }
        
        return element;
    }
};

/**
 * Animation Utilities
 */
AIKI.animations = {
    
    /**
     * Animate number value with easing
     * @param {Element} element - Element to animate
     * @param {number} start - Start value
     * @param {number} end - End value
     * @param {number} duration - Animation duration in ms
     * @param {Function} formatter - Value formatter function
     */
    animateValue: function(element, start, end, duration = 1000, formatter = null) {
        if (!element || !AIKI.config.animations) {
            if (element) element.textContent = formatter ? formatter(end) : end;
            return;
        }

        const startTime = performance.now();
        const change = end - start;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out-cubic)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = start + (change * easeOut);
            
            element.textContent = formatter ? formatter(current) : Math.round(current);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    },

    /**
     * Shake element animation
     * @param {Element} element - Element to shake
     * @param {number} duration - Animation duration in ms
     */
    shake: function(element, duration = 500) {
        if (!element || !AIKI.config.animations) return;
        
        element.style.animation = `aiki-shake ${duration}ms ease-in-out`;
        
        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    },

    /**
     * Pulse element animation
     * @param {Element} element - Element to pulse
     * @param {number} duration - Animation duration in ms
     */
    pulse: function(element, duration = 1000) {
        if (!element || !AIKI.config.animations) return;
        
        element.style.animation = `aiki-pulse ${duration}ms ease-in-out`;
        
        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    },

    /**
     * Glow effect animation
     * @param {Element} element - Element to add glow to
     * @param {number} duration - Animation duration in ms
     */
    glow: function(element, duration = 2000) {
        if (!element || !AIKI.config.animations) return;
        
        element.style.animation = `aiki-glow ${duration}ms ease-in-out`;
        
        setTimeout(() => {
            element.style.animation = '';
        }, duration);
    }
};

/**
 * Storage Utilities
 */
AIKI.storage = {
    
    /**
     * Set item in localStorage with error handling
     * @param {string} key - Storage key
     * @param {*} value - Value to store
     */
    set: function(key, value) {
        try {
            localStorage.setItem(`aiki_${key}`, JSON.stringify(value));
        } catch (e) {
            console.error('AIKI Storage Error:', e);
        }
    },

    /**
     * Get item from localStorage with error handling
     * @param {string} key - Storage key
     * @param {*} defaultValue - Default value if not found
     * @returns {*} Stored value or default
     */
    get: function(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(`aiki_${key}`);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('AIKI Storage Error:', e);
            return defaultValue;
        }
    },

    /**
     * Remove item from localStorage
     * @param {string} key - Storage key
     */
    remove: function(key) {
        try {
            localStorage.removeItem(`aiki_${key}`);
        } catch (e) {
            console.error('AIKI Storage Error:', e);
        }
    }
};

/**
 * Logger Utilities
 */
AIKI.logger = {
    
    /**
     * Debug log (only if debug enabled)
     * @param {...*} args - Arguments to log
     */
    debug: function(...args) {
        if (AIKI.config.debug) {
            console.log('🦖 AIKI DEBUG:', ...args);
        }
    },

    /**
     * Info log
     * @param {...*} args - Arguments to log
     */
    info: function(...args) {
        console.info('🦖 AIKI INFO:', ...args);
    },

    /**
     * Warning log
     * @param {...*} args - Arguments to log
     */
    warn: function(...args) {
        console.warn('🔫 AIKI WARNING:', ...args);
    },

    /**
     * Error log
     * @param {...*} args - Arguments to log
     */
    error: function(...args) {
        console.error('💥 AIKI ERROR:', ...args);
    },

    /**
     * Success log
     * @param {...*} args - Arguments to log
     */
    success: function(...args) {
        console.log('✅ AIKI SUCCESS:', ...args);
    }
};

/**
 * Initialize AIKI Common
 */
AIKI.init = function() {
    AIKI.logger.info('Initializing AIKI Common v' + AIKI.config.version);
    
    // Load saved theme
    const savedTheme = AIKI.storage.get('theme', 'light');
    AIKI.config.theme = savedTheme;
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            AIKI.logger.debug('DOM Content Loaded');
        });
    }
    
    AIKI.logger.success('AIKI Common initialized! Ready for AI action! 🦖💥');
};

// Auto-initialize when script loads
AIKI.init();

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIKI;
}