
// Floating Features JavaScript

class FloatingFeatures {
    constructor() {
        this.isVoiceRecording = false;
        this.recognition = null;
        this.init();
    }

    init() {
        this.createThemeToggle();
        this.createAssistantIndicator();
        this.createVoiceInput();
        this.initializeTheme();
        this.bindEvents();
    }

    

    createThemeToggle() {
        const toggleHTML = `
            <button class="theme-toggle" id="theme-toggle" title="Switch Theme">
                <i class="fas fa-moon"></i>
            </button>
        `;
        document.body.insertAdjacentHTML('beforeend', toggleHTML);
    }

    createAssistantIndicator() {
        const indicatorHTML = `
            <div class="assistant-online-indicator" id="assistant-indicator" title="Unes Assistant is online"></div>
        `;
        document.body.insertAdjacentHTML('beforeend', indicatorHTML);
    }

    

    createVoiceInput() {
        const chatbotInput = document.querySelector('.chatbot-input');
        if (chatbotInput) {
            const voiceButtonHTML = `
                <button class="voice-input-btn" id="voice-input-btn" title="Voice Input">
                    <i class="fas fa-microphone"></i>
                </button>
            `;
            chatbotInput.insertAdjacentHTML('beforeend', voiceButtonHTML);
        }
    }

    bindEvents() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        

        // Voice input
        const voiceBtn = document.getElementById('voice-input-btn');
        if (voiceBtn) {
            voiceBtn.addEventListener('click', () => this.toggleVoiceInput());
        }

        // Initialize speech recognition
        this.initSpeechRecognition();
    }

    

    initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        const themeToggle = document.getElementById('theme-toggle');
        
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            if (themeToggle) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        }
    }

    toggleTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
        
        themeToggle.classList.add('rotating');
        
        setTimeout(() => {
            const newTheme = body.classList.contains('light-theme') ? 'dark' : 'light';
            
            if (body.classList.contains('light-theme')) {
                // Switch to dark
                body.classList.remove('light-theme');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                // Switch to light
                body.classList.add('light-theme');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'light');
            }
            
            // Track theme change
            gtag('event', 'theme_change', {
                event_category: 'customization',
                event_label: `theme_${newTheme}`,
                value: 1
            });
            
            setTimeout(() => {
                themeToggle.classList.remove('rotating');
            }, 150);
        }, 150);
    }

    

    initSpeechRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            
            this.recognition.continuous = false;
            this.recognition.interimResults = true;
            this.recognition.lang = 'en-US';

            this.recognition.onstart = () => {
                const voiceBtn = document.getElementById('voice-input-btn');
                if (voiceBtn) {
                    voiceBtn.classList.add('recording');
                    voiceBtn.innerHTML = '<i class="fas fa-stop"></i>';
                }
            };

            this.recognition.onresult = (event) => {
                const inputField = document.getElementById('chatbot-input-field');
                if (inputField && event.results.length > 0) {
                    const transcript = event.results[0][0].transcript;
                    inputField.value = transcript;
                }
            };

            this.recognition.onend = () => {
                const voiceBtn = document.getElementById('voice-input-btn');
                const inputField = document.getElementById('chatbot-input-field');
                
                if (voiceBtn) {
                    voiceBtn.classList.remove('recording');
                    voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
                }
                
                this.isVoiceRecording = false;
                
                // Auto-send if there's content
                if (inputField && inputField.value.trim()) {
                    // Trigger the chatbot's send message function
                    const sendBtn = document.getElementById('chatbot-send');
                    if (sendBtn) {
                        sendBtn.click();
                    }
                }
            };

            this.recognition.onerror = (event) => {
                console.log('Speech recognition error:', event.error);
                this.stopVoiceInput();
            };
        }
    }

    toggleVoiceInput() {
        if (!this.recognition) {
            alert('Voice recognition not supported in this browser.');
            return;
        }

        if (this.isVoiceRecording) {
            this.stopVoiceInput();
        } else {
            this.startVoiceInput();
        }
    }

    startVoiceInput() {
        if (this.recognition && !this.isVoiceRecording) {
            this.isVoiceRecording = true;
            const inputField = document.getElementById('chatbot-input-field');
            if (inputField) {
                inputField.value = ''; // Clear existing text
            }
            this.recognition.start();
        }
    }

    stopVoiceInput() {
        if (this.recognition && this.isVoiceRecording) {
            this.recognition.stop();
            this.isVoiceRecording = false;
            
            const voiceBtn = document.getElementById('voice-input-btn');
            if (voiceBtn) {
                voiceBtn.classList.remove('recording');
                voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
            }
        }
    }
}

// Force immediate initialization for deployment compatibility
(function() {
    let initAttempts = 0;
    const maxAttempts = 5;
    
    function forceInitialize() {
        initAttempts++;
        
        if (window.floatingFeaturesInitialized || document.querySelector('.theme-toggle')) {
            return;
        }
        
        try {
            new FloatingFeatures();
            window.floatingFeaturesInitialized = true;
            console.log('Floating features initialized successfully');
        } catch (error) {
            if (initAttempts < maxAttempts) {
                setTimeout(forceInitialize, 500 * initAttempts);
            }
        }
    }
    
    // Multiple initialization triggers
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceInitialize);
    } else {
        forceInitialize();
    }
    
    window.addEventListener('load', forceInitialize);
    
    // Fallback initialization after 2 seconds
    setTimeout(forceInitialize, 2000);
    
    // Emergency fallback after 5 seconds
    setTimeout(() => {
        if (!window.floatingFeaturesInitialized && !document.querySelector('.theme-toggle')) {
            forceInitialize();
        }
    }, 5000);
})();

// Legacy support
function initializeFloatingFeatures() {
    if (!window.floatingFeaturesInitialized && !document.querySelector('.theme-toggle')) {
        try {
            new FloatingFeatures();
            window.floatingFeaturesInitialized = true;
        } catch (error) {
            console.log('Floating features fallback failed');
        }
    }
}
