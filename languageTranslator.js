import { translations } from './translation.js';

// Change all text and placeholders
export function changeLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);

    document.querySelectorAll("[data-translate]").forEach(el => {
        const key = el.getAttribute("data-translate");
        el.textContent = (translations[lang] && translations[lang][key]) || key;
    });

    document.querySelectorAll("[data-translate-placeholder]").forEach(el => {
        const key = el.getAttribute("data-translate-placeholder");
        if (translations[lang] && translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    const dropdown = document.getElementById('languageDropdown');
    if (dropdown) dropdown.classList.remove('active');

    updateTypewriterText(lang);
}

// Load saved or default language
export function loadLanguage() {
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    changeLanguage(savedLang);
}

// Called when clicking a language button
export function selectLanguage(lang) {
    changeLanguage(lang);
}

// Close dropdown when clicking outside
export function setupDropdownClickOutside() {
    document.addEventListener('click', function(event) {
        const dropdown = document.getElementById('languageDropdown');
        const menuIcon = document.querySelector('.menu-icon');
        if (dropdown && !dropdown.contains(event.target) && (!menuIcon || !menuIcon.contains(event.target))) {
            dropdown.classList.remove('active');
        }
    });
}

// Update welcome text animation
function updateTypewriterText(lang) {
    const typedTextElement = document.getElementById('typed-text');
    if (typedTextElement && translations[lang] && translations[lang].welcomeBack) {
        const text = translations[lang].welcomeBack;
        let i = 0;
        typedTextElement.textContent = '';
        function typeWriter() {
            if (i < text.length) {
                typedTextElement.textContent = text.substring(0, i + 1);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        setTimeout(typeWriter, 300);
    }
}

// Detect browser language
export function detectBrowserLanguage() {
    const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || 'en';
    const langMap = {
        'en': 'en', 'en-US': 'en', 'en-GB': 'en',
        'bn': 'bn', 'bn-BD': 'bn', 'bn-IN': 'bn',
        'ne': 'ne', 'ne-NP': 'ne',
        'ja': 'ja', 'ja-JP': 'ja'
    };
    return langMap[browserLang] || langMap[browserLang.split('-')[0]] || 'en';
}

// Init with browser detection or saved language
export function initializeWithDetection() {
    let selectedLang = localStorage.getItem('selectedLanguage') || detectBrowserLanguage();
    localStorage.setItem('selectedLanguage', selectedLang);
    changeLanguage(selectedLang);
    setupDropdownClickOutside();
    return selectedLang;
}

// Optional: expose to HTML onclick
// Remove this if you use only addEventListener in JS
window.selectLanguage = selectLanguage;

export function translateElement(element) {
    const lang = localStorage.getItem('selectedLanguage') || 'en';
    
    element.querySelectorAll("[data-translate]").forEach(el => {
        const key = el.getAttribute("data-translate");
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    element.querySelectorAll("[data-translate-placeholder]").forEach(el => {
        const key = el.getAttribute("data-translate-placeholder");
        if (translations[lang] && translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });
}