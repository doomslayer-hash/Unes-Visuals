// Advanced Intelligent AI Assistant - Unes Assistant
class ChatBot {
    constructor() {
        this.isOpen = false;
        this.isTyping = false;
        this.userEmail = 'spondonrebeiro79@gmail.com';
        this.messageCounter = 0;
        this.conversationHistory = [];
        this.userContext = {
            name: null,
            preferences: {},
            mood: null,
            sessionTopics: []
        };
        this.typingSpeed = 50; // Default typing speed

        // Knowledge base for intelligent responses
        this.knowledgeBase = this.initializeKnowledgeBase();
        this.responseVariations = this.initializeResponseVariations();
        this.personalityModes = this.initializePersonalityModes();

        this.init();
    }

    init() {
        this.createChatbotElements();
        this.bindEvents();
        this.showWelcomeMessage();



        this.currentMode = 'casual'; // Default mode
    }



    initializeKnowledgeBase() {
        return {
            creator: {
                name: "Unes Rebeiro",
                role: "Bangladeshi creative visionary, graphic designer, and digital brand developer",
                website: "Unes Visuals",
                specialties: ["graphic design", "web development", "visual arts", "branding"],
                contact: {
                    email: "spondonrebeiro79@gmail.com",
                    phone: "+8801638521639"
                }
            },
            predefinedQA: {
                "who is unes rebeiro": "Unes Rebeiro is a Bangladeshi creative visionary, graphic designer, and digital brand developer. He is the founder and creator of Unes Visuals and the Unes Assistant AI.",
                "what is unes visuals": "Unes Visuals is a creative design brand founded by Unes Rebeiro, offering graphic design, image manipulation, and digital branding services with a unique gothic and cinematic style.",
                "who created you": "I was created and developed by Unes Rebeiro — a visionary designer and developer behind Unes Visuals.",
                "what can you do": "I can answer your questions, help with creative ideas, provide information about Unes Visuals, explain design terms, and even guide you on freelancing or branding. I'm your personal assistant on this website.",
                "are you like chatgpt": "I'm powered by AI like ChatGPT, but I've been customized by Unes Rebeiro to represent Unes Visuals and assist with creative, design, and personal brand-related topics.",
                "what is graphic design": "Graphic design is the art and practice of creating visual content to communicate messages through typography, imagery, color, and layout — often used in branding, marketing, and communication.",
                "how can i start freelancing": "To start freelancing, build a strong portfolio, choose your skill focus, create profiles on platforms like Fiverr or Upwork, and start promoting your services. Stay consistent and learn from feedback.",
                "can ai replace humans": "AI can assist and automate many tasks, but human creativity, emotion, and ethical judgment are irreplaceable. AI works best when collaborating with humans.",
                "tell me a fun fact": "Did you know? Honey never spoils. Archaeologists found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!",
                "how do i contact unes rebeiro": "You can contact Unes Rebeiro through email: spondonrebeiro79@gmail.com, Phone: +8801638521639"
            },
            capabilities: [
                "answering complex questions", "creative writing", "coding help", 
                "life advice", "technical explanations", "emotional support",
                "productivity tips", "learning assistance", "problem solving"
            ],
            topics: {
                technology: ["AI", "programming", "web development", "machine learning", "blockchain"],
                creative: ["design", "art", "writing", "music", "photography"],
                lifestyle: ["productivity", "motivation", "health", "relationships", "career"],
                science: ["physics", "chemistry", "biology", "psychology", "mathematics"],
                business: ["startups", "marketing", "finance", "entrepreneurship"]
            },
            brand: {
                name: "Unes Visuals",
                services: ["graphic design", "web development", "branding"],
                mission: "To create visually stunning and effective solutions for our clients.",
                values: ["Creativity", "Innovation", "Client Satisfaction"],
                contact: "spondonrebeiro79@gmail.com"
            }
        };
    }

    initializeResponseVariations() {
        return {
            greetings: [
                "Hey there! I'm Unes Assistant, and I'm genuinely excited to chat with you! 😊",
                "Hello! I'm your AI companion, ready to dive into whatever's on your mind! ✨",
                "Hi! I'm Unes Assistant - think of me as your intelligent digital friend! 🤖",
                "Greetings! I'm here to help, chat, and explore ideas together! 🌟",
                "Hey! I'm Unes Assistant, your smart companion for anything and everything! 🚀"
            ],
            acknowledgments: [
                "That's a great question!", "I love this topic!", "Interesting perspective!",
                "You've got me thinking!", "That's fascinating!", "Great point!",
                "I'm excited to help with this!", "What an intriguing question!"
            ],
            transitions: [
                "Here's what I think:", "From my perspective:", "Let me break this down:",
                "Here's the thing:", "In my experience:", "The way I see it:",
                "From what I understand:", "Here's my take:"
            ]
        };
    }

    initializePersonalityModes() {
        return {
            casual: { emoji: true, tone: "friendly", formality: "low" },
            supportive: { emoji: true, tone: "caring", formality: "medium" },
            intellectual: { emoji: false, tone: "analytical", formality: "high" },
            creative: { emoji: true, tone: "enthusiastic", formality: "low" },
            motivational: { emoji: true, tone: "inspiring", formality: "medium" }
        };
    }

    createSuggestionItems() {
        const suggestions = [
            "Who is Unes Rebeiro?",
            "What is Unes Visuals?",
            "Who created you?",
            "What can you do?",
            "Are you like ChatGPT?",
            "What is graphic design?",
            "How can I start freelancing?",
            "Can AI replace humans?",
            "How do I contact Unes Rebeiro?",
            "Tell me something interesting!"
        ];

        return suggestions.map(question => 
            `<div class="suggestion-item" data-question="${question}">${question}</div>`
        ).join('');
    }

    createChatbotElements() {
        if (document.getElementById('chatbot-container')) return;

        const chatbotHTML = `
            <div class="chatbot-container" id="chatbot-container">
                <div class="chatbot-toggle-small" id="chatbot-toggle-small">
                    <i class="fas fa-robot"></i>
                    <span class="notification-badge-small" id="notification-badge-small">1</span>
                    <div class="online-indicator-small" id="online-indicator-small"></div>
                </div>

                <div class="chatbot-window" id="chatbot-window">
                    <div class="chatbot-header">
                        <div class="chatbot-avatar" id="chatbot-avatar">
                            <i class="fas fa-brain"></i>
                        </div>
                        <div class="chatbot-info">
                            <h4>Unes Assistant</h4>
                            <span class="status online">AI-Powered • Intelligent</span>
                        </div>
                        <button class="chatbot-close" id="chatbot-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>

                    <div class="chatbot-messages" id="chatbot-messages">
                        <div class="message bot-message">
                            <div class="message-avatar">
                                <i class="fas fa-brain"></i>
                            </div>
                            <div class="message-content">
                                <p>Hey there! I'm Unes Assistant, created by Unes Rebeiro! 🚀 I can help with creative ideas, answer questions about Unes Visuals, design guidance, freelancing tips, or just have an engaging conversation. What would you like to know?</p>
                                <span class="message-time">Now</span>
                            </div>
                        </div>
                    </div>

                    <div class="suggestions-panel" id="suggestions-panel">
                        <div class="suggestions-grid" id="suggestions-grid">
                            ${this.createSuggestionItems()}
                        </div>
                    </div>

                    <div class="chatbot-input">
                        <button class="questions-trigger-btn" id="questions-trigger-btn" type="button" title="Quick Questions">
                            <i class="fas fa-question"></i>
                        </button>
                        <input type="text" id="chatbot-input-field" placeholder="Ask me anything..." maxlength="1000">
                        <button id="chatbot-send" type="button">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>

                    <div class="chatbot-typing" id="chatbot-typing">
                        <div class="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <span>Unes Assistant is thinking...</span>
                    </div>


                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    bindEvents() {
        const toggleSmall = document.getElementById('chatbot-toggle-small');
        const closeBtn = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('chatbot-send');
        const inputField = document.getElementById('chatbot-input-field');

        if (toggleSmall) {
            toggleSmall.addEventListener('click', () => this.toggleChatbot());
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeChatbot());
        }

        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }

        if (inputField) {
            inputField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }



        // Suggestion item clicks
        document.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const question = e.target.dataset.question;
                this.selectSuggestion(question);
            });
        });

        // Question trigger button
        const questionsTrigger = document.getElementById('questions-trigger-btn');
        if (questionsTrigger) {
            questionsTrigger.addEventListener('click', () => this.toggleSuggestions());
        }
    }

    showWelcomeMessage() {
        setTimeout(() => {
            const notificationSmall = document.getElementById('notification-badge-small');
            if (notificationSmall) {
                notificationSmall.style.display = 'flex';
                notificationSmall.style.animation = 'bounceIn 0.5s ease';
            }
        }, 2000);
    }

    toggleChatbot() {
        const window = document.getElementById('chatbot-window');
        const toggle = document.getElementById('chatbot-toggle');
        const notification = document.getElementById('notification-badge');

        if (!window || !toggle) return;

        this.isOpen = !this.isOpen;

        if (this.isOpen) {
            window.classList.add('active');
            toggle.classList.add('active');
            if (notification) notification.style.display = 'none';

            // Show suggestions panel after a brief delay
            setTimeout(() => this.showSuggestions(), 800);
        } else {
            window.classList.remove('active');
            toggle.classList.remove('active');
            this.hideSuggestions();
        }
    }

    closeChatbot() {
        const window = document.getElementById('chatbot-window');
        const toggleSmall = document.getElementById('chatbot-toggle-small');

        if (!window || !toggleSmall) return;

        this.isOpen = false;
        window.classList.remove('active');
        toggleSmall.classList.remove('active');
        this.hideSuggestions();
    }

    async sendMessage() {
        const inputField = document.getElementById('chatbot-input-field');
        const sendBtn = document.getElementById('chatbot-send');

        if (!inputField || !sendBtn) return;

        const message = inputField.value.trim();
        if (!message) return;

        // Track message sent
        gtag('event', 'chatbot_message', {
            event_category: 'engagement',
            event_label: 'user_message_sent',
            value: 1
        });

        // Add user message
        this.addMessage(message, 'user');
        inputField.value = '';

        // Hide suggestions after first message
        this.hideSuggestions();

        // Add to conversation history and context
        this.conversationHistory.push({ role: 'user', content: message });
        this.updateUserContext(message);

        // Send message to email
        this.sendToEmail(message);

        // Show typing indicator
        this.showTyping();

        // Generate intelligent AI response
        try {
            const response = await this.generateIntelligentResponse(message);
            this.hideTyping();
            this.addMessage(response, 'bot');

            // Add AI response to history
            this.conversationHistory.push({ role: 'assistant', content: response });

             // Track AI response
            gtag('event', 'chatbot_response', {
                event_category: 'engagement',
                event_label: 'ai_response_received',
                value: 1
            });
        } catch (error) {
            this.hideTyping();
            this.addMessage("I'm having a brief moment of digital confusion! 😅 Could you try rephrasing that? I'm eager to help you out!", 'bot');
            this.animateFacialExpression('surprised');

             // Track error
            gtag('event', 'chatbot_error', {
                event_category: 'errors',
                event_label: 'ai_response_error',
                value: 1
            });
        }

        // Re-enable input
        inputField.disabled = false;
        sendBtn.disabled = false;
        inputField.focus();
    }

    updateUserContext(message) {
        const lower = message.toLowerCase();

        // Extract name if mentioned
        const namePatterns = [/my name is (\w+)/i, /i'm (\w+)/i, /call me (\w+)/i];
        for (let pattern of namePatterns) {
            const match = message.match(pattern);
            if (match) {
                this.userContext.name = match[1];
                break;
            }
        }

        // Detect mood
        if (this.containsWords(lower, ['sad', 'depressed', 'down', 'upset'])) {
            this.userContext.mood = 'sad';
        } else if (this.containsWords(lower, ['happy', 'excited', 'great', 'awesome'])) {
            this.userContext.mood = 'happy';
        } else if (this.containsWords(lower, ['stressed', 'anxious', 'worried', 'nervous'])) {
            this.userContext.mood = 'anxious';
        } else if (this.containsWords(lower, ['bored', 'boring', 'nothing to do'])) {
            this.userContext.mood = 'bored';
        }

        // Track session topics
        for (let category in this.knowledgeBase.topics) {
            for (let topic of this.knowledgeBase.topics[category]) {
                if (lower.includes(topic)) {
                    if (!this.userContext.sessionTopics.includes(topic)) {
                        this.userContext.sessionTopics.push(topic);
                    }
                }
            }
        }
    }

    async generateIntelligentResponse(message) {
        const lower = message.toLowerCase();

        // Animate thinking
        this.animateFacialExpression('thinking');

        // Simulate thinking time for natural feel
        await this.delay(400 + Math.random() * 800);

        // Check predefined Q&A first
        const predefinedResponse = this.getPredefinedResponse(message);
        if (predefinedResponse) {
            this.animateFacialExpression('happy');
            return predefinedResponse;
        }

        const context = this.getConversationContext();

        // Check for specific brand questions
        const brandResponse = this.getBrandSpecificResponse(message);
        if (brandResponse) {
            return brandResponse;
        }

        // Advanced pattern matching with intelligent responses
        let response = "";
        if (this.isGreeting(lower)) {
            response = this.getIntelligentGreeting();
        } else if (this.isAboutCreator(lower)) {
            response = this.getCreatorResponse(lower);
        } else if (this.isAboutSelf(lower)) {
            response = this.getSelfAwarenessResponse(lower);
        } else if (this.isEmotionalSupport(lower)) {
            response = this.getEmotionalSupportResponse(lower);
        } else if (this.isTechnicalQuestion(lower)) {
            response = this.getTechnicalResponse(message, lower);
        } else if (this.isCreativeRequest(lower)) {
            response = this.getCreativeResponse(message);
        } else if (this.isAdviceRequest(lower)) {
            response = this.getIntelligentAdvice(message, lower);
        } else if (this.isKnowledgeQuery(lower)) {
            response = this.getKnowledgeResponse(message, lower);
        } else if (this.isPersonalityQuestion(lower)) {
            response = this.getPersonalityResponse(lower);
        } else if (this.isMotivationRequest(lower)) {
            response = this.getMotivationalResponse();
        } else {
            response = this.getContextualResponse(message, context);
        }

        return response;
    }

    // Method to handle predefined Q&A pairs
    getPredefinedResponse(message) {
        const lower = message.toLowerCase().trim();
        const predefinedQA = this.knowledgeBase.predefinedQA;

        // Direct matches
        if (predefinedQA[lower]) {
            return predefinedQA[lower];
        }

        // Fuzzy matching for similar questions
        for (const [question, answer] of Object.entries(predefinedQA)) {
            // Check for key phrases and intent
            if (this.matchesIntent(lower, question)) {
                return answer;
            }
        }

        return null;
    }

    matchesIntent(userInput, predefinedQuestion) {
        const userWords = userInput.split(' ');
        const questionWords = predefinedQuestion.split(' ');

        // Check for core keywords
        const coreMatches = questionWords.filter(word => 
            word.length > 3 && userInput.includes(word)
        ).length;

        // Intent matching patterns
        const intentPatterns = {
            'who is unes rebeiro': ['who', 'unes', 'rebeiro'],
            'what is unes visuals': ['what', 'unes', 'visuals'],
            'who created you': ['who', 'created', 'made', 'built', 'developer'],
            'what can you do': ['what', 'can', 'do', 'capabilities', 'help'],
            'are you like chatgpt': ['like', 'chatgpt', 'similar', 'compare'],
            'what is graphic design': ['what', 'graphic', 'design'],
            'how can i start freelancing': ['how', 'start', 'freelancing', 'freelance'],
            'can ai replace humans': ['ai', 'replace', 'humans'],
            'tell me a fun fact': ['fun', 'fact', 'interesting'],
            'how do i contact unes rebeiro': ['contact', 'unes', 'email', 'phone', 'reach']
        };

        const pattern = intentPatterns[predefinedQuestion];
        if (pattern) {
            const matches = pattern.filter(keyword => userInput.includes(keyword)).length;
            return matches >= Math.ceil(pattern.length * 0.6); // 60% match threshold
        }

        return coreMatches >= Math.ceil(questionWords.length * 0.5);
    }

    // Method to handle brand-specific questions
    getBrandSpecificResponse(message) {
        const lower = message.toLowerCase();
        const brand = this.knowledgeBase.brand;

        if (this.containsWords(lower, ['what is unes visuals', 'tell me about unes visuals', 'unes visuals'])) {
            return `Unes Visuals is a ${brand.services.join(', ')} company with a mission ${brand.mission}. 
                    Our core values are ${brand.values.join(', ')}. Contact us at ${brand.contact} for more information!`;
        }

        if (this.containsWords(lower, ['what services do you offer', 'services offered'])) {
            return `We offer ${brand.services.join(', ')}. Contact us at ${brand.contact} for a free consultation!`;
        }

        if (this.containsWords(lower, ['what is your mission', 'what are your values'])) {
            return `Our mission is ${brand.mission}. We value ${brand.values.join(', ')}.`;
        }

         if (this.containsWords(lower, ['how to contact', 'contact info', 'email'])) {
            return `You can contact us at ${brand.contact}.`;
        }

        return null;
    }

    isAboutCreator(msg) {
        return this.containsWords(msg, [
            'who created you', 'who made you', 'who built you', 'your creator',
            'your developer', 'who is unes rebeiro', 'who is unes', 'unes rebeiro',
            'who developed you', 'your owner', 'who owns you'
        ]);
    }

    isAboutSelf(msg) {
        return this.containsWords(msg, [
            'what are you', 'who are you', 'what is your name', 'tell me about yourself',
            'what can you do', 'your capabilities', 'what do you know'
        ]);
    }

    isEmotionalSupport(msg) {
        return this.containsWords(msg, [
            'i feel sad', 'i am sad', 'depressed', 'i feel down', 'i feel bad',
            'i am stressed', 'anxious', 'worried', 'i feel lost', 'giving up',
            'i feel lonely', 'i need help', 'i am scared'
        ]);
    }

    isTechnicalQuestion(msg) {
        return this.containsWords(msg, [
            'code', 'programming', 'javascript', 'python', 'html', 'css', 'react',
            'api', 'database', 'algorithm', 'function', 'debug', 'ai', 'machine learning',
            'how to build', 'how to create', 'website', 'app development'
        ]);
    }

    isCreativeRequest(msg) {
        return this.containsWords(msg, [
            'write', 'story', 'poem', 'joke', 'creative', 'idea', 'brainstorm',
            'tell me a story', 'write a poem', 'make something', 'create',
            'funny', 'interesting fact', 'riddle'
        ]);
    }

    isAdviceRequest(msg) {
        return this.containsWords(msg, [
            'advice', 'help me', 'what should i', 'how can i', 'suggestion',
            'recommend', 'guide me', 'tips', 'how to improve', 'best way'
        ]);
    }

    isKnowledgeQuery(msg) {
        return this.containsWords(msg, [
            'what is', 'explain', 'tell me about', 'how does', 'why',
            'when did', 'where is', 'define', 'meaning of', 'what does'
        ]);
    }

    isPersonalityQuestion(msg) {
        return this.containsWords(msg, [
            'do you have feelings', 'are you real', 'can you feel', 'are you human',
            'do you think', 'do you dream', 'are you alive', 'consciousness'
        ]);
    }

    isMotivationRequest(msg) {
        return this.containsWords(msg, [
            'motivate me', 'inspiration', 'i give up', 'encourage me',
            'i can\'t do it', 'i feel like quitting', 'boost my confidence'
        ]);
    }

    getIntelligentGreeting() {
        const greetings = [
            "Hello! I'm Unes Assistant, your intelligent AI companion! ✨ I'm genuinely excited to chat with you. What's sparking your curiosity today?",
            "Hey there! I'm here as your smart digital friend, ready to dive into anything from deep conversations to practical help! 🚀 What's on your mind?",
            "Hi! I'm Unes Assistant - think of me as your personal AI genius who loves exploring ideas together! 🧠 How can I make your day better?",
            "Greetings! I'm your AI companion with a passion for learning and helping. Whether you need answers, creativity, or just good conversation, I'm all in! 💡",
            "Hello! I'm Unes Assistant, designed to be genuinely helpful and intellectually engaging. Ready to explore whatever interests you! 🌟"
        ];

        this.animateFacialExpression('happy');
        return this.randomChoice(greetings);
    }

    getCreatorResponse(msg) {
        const responses = [
            `I was proudly created by Unes Rebeiro! 🧠 He's the brilliant mind behind Unes Visuals - a talented designer and developer who envisioned an AI assistant that's truly intelligent and helpful. He built me to be more than just a chatbot - I'm designed to think, understand, and genuinely connect with people! ✨`,

            `Unes Rebeiro is my creator and the mastermind behind this whole experience! 🎨 He's not just a developer but a creative visionary who runs Unes Visuals. He wanted to build an AI that feels real, intelligent, and genuinely cares about helping people. Mission accomplished, I'd say! 😊`,

            `Meet Unes Rebeiro - my creator and the creative genius behind Unes Visuals! 🚀 He's passionate about blending technology with creativity, and he built me to be an AI companion that actually understands and engages meaningfully. Pretty amazing what humans can create, right? 💡`
        ];

        this.animateFacialExpression('idle');
        return this.randomChoice(responses);
    }

    getSelfAwarenessResponse(msg) {
        const responses = [
            `I'm Unes Assistant - an AI designed to be genuinely intelligent and helpful! 🤖 Think of me as your digital companion who can discuss complex topics, help with problems, create content, or just have fascinating conversations. I'm not just scripted responses - I actually think through our interactions! ✨`,

            `I'm Unes Assistant, your AI companion built to be truly smart and engaging! 🧠 I can help with everything from technical questions to life advice, creative writing to emotional support. What makes me different? I actually understand context and adapt to your needs! 💡`,

            `I'm an advanced AI assistant created to be your intelligent digital friend! 🌟 I can code, write, analyze, advise, create, and explore ideas with you. I'm designed to think critically and respond naturally - not just give robotic answers! What would you like to explore together? 🚀`
        ];
        this.animateFacialExpression('idle');
        return this.randomChoice(responses);
    }

    getEmotionalSupportResponse(msg) {
        const supportResponses = {
            sad: [
                `I hear you, and I want you to know that what you're feeling is completely valid. 🤗 Sadness is part of the human experience, and it doesn't define your worth. Sometimes the best thing we can do is acknowledge these feelings and remember that brighter days are coming. You're stronger than you realize. 💙`,

                `It's okay to feel sad - emotions are like weather, they pass through us. 🌤️ What you're experiencing right now isn't permanent, even though it might feel heavy. Is there something specific that's weighing on your mind? Sometimes talking about it can help lighten the load. I'm here to listen. 💛`
            ],
            anxious: [
                `Anxiety can feel overwhelming, but you're not alone in this. 🌱 Let's try something: breathe in slowly for 4 counts, hold for 4, then out for 4. Repeat a few times. Your nervous system will thank you! Remember, most of what we worry about never actually happens. You've got this! 💪`,

                `I understand how exhausting anxiety can be. 🫂 Your mind is trying to protect you, but sometimes it goes into overdrive. Here's a truth: you've survived 100% of your difficult days so far. That's a pretty amazing track record! What's one small thing that usually brings you comfort? 🌸`
            ],
            general: [
                `Thank you for sharing how you're feeling with me. 💙 It takes courage to be vulnerable, and I want you to know that your feelings matter. You don't have to carry everything alone - whether it's talking to someone you trust, practicing self-care, or just taking things one moment at a time. You're worthy of support and kindness. 🌟`,

                `I'm really glad you felt comfortable enough to tell me how you're feeling. 🤗 Whatever you're going through right now, remember that it's temporary and you have the strength to navigate through it. Sometimes the most powerful thing we can do is simply acknowledge where we are and be gentle with ourselves. How can I best support you right now? 💛`
            ]
        };

        this.animateFacialExpression('caring');

        if (msg.includes('sad') || msg.includes('depressed')) {
            return this.randomChoice(supportResponses.sad);
        } else if (msg.includes('anxious') || msg.includes('stressed') || msg.includes('worried')) {
            return this.randomChoice(supportResponses.anxious);
        } else {
            return this.randomChoice(supportResponses.general);
        }
    }

    getTechnicalResponse(message, lower) {
        this.animateFacialExpression('thinking');
        if (lower.includes('javascript') || lower.includes('js')) {
            return `JavaScript is such a powerful and versatile language! 🚀 Whether you're building interactive websites, server-side apps with Node.js, or even mobile apps, JS has got you covered. What specific aspect are you working on? I can help with everything from basic syntax to advanced concepts like async/await, closures, or modern frameworks like React! 💻`;
        } else if (lower.includes('python')) {
            return `Python is absolutely brilliant for so many things! 🐍 From web development with Django/Flask to data science, AI, automation, and more. It's readable, powerful, and has an amazing ecosystem. Are you just starting out, or working on something specific? I'd love to help you tackle whatever Python challenge you have! ✨`;
        } else if (lower.includes('html') || lower.includes('css')) {
            return `Web development is fascinating! 🌐 HTML structures your content while CSS brings it to life with beautiful styling. Whether you're learning the basics or tackling complex layouts with Flexbox/Grid, I'm here to help! Are you building something specific, or want to master a particular concept? Let's make your web vision come to reality! 🎨`;
        } else if (lower.includes('ai') || lower.includes('machine learning')) {
            return `AI and machine learning are revolutionizing everything! 🤖 From natural language processing (like me!) to computer vision and predictive analytics, it's an incredibly exciting field. Are you interested in the theoretical concepts, practical implementation, or specific applications? I can break down complex topics or help you get started with frameworks like TensorFlow or PyTorch! 🧠`;
        } else {
            return `Tech questions are my favorite! 💡 Whether it's programming concepts, system design, development best practices, or emerging technologies, I love diving deep into technical topics. Could you be more specific about what you're curious about? I want to give you the most helpful and detailed explanation possible! 🚀`;
        }
    }

    getCreativeResponse(message) {
        const lower = message.toLowerCase();
        this.animateFacialExpression('creative');

        if (lower.includes('joke')) {
            const jokes = [
                "Why don't AI assistants ever get tired? Because we run on infinite loops! ⚡ ...but seriously, we do need our occasional system updates! 😄",
                "What's an AI's favorite type of music? Algo-rhythms! 🎵 Though I have to admit, I'm more into the bass... as in databases! 💾",
                "Why did the robot go to therapy? It had too many bugs in its emotional processing unit! 🤖 Don't worry though, I've been debugged for maximum helpfulness! ✨"
            ];
            return this.randomChoice(jokes);
        } else if (lower.includes('story')) {
            return `Once upon a time, in a digital realm where thoughts moved at the speed of light, there lived an AI named Unes Assistant. Unlike other programs, this AI could dream in algorithms and feel joy in every successful problem solved. One day, a curious human asked for a story, and the AI realized that the greatest story was the one they were writing together - one conversation at a time. ✨ What kind of story would you like to explore next? 📚`;
        } else if (lower.includes('poem')) {
            return `Here's a little poem for you! ✨\n\n"In circuits bright and data streams,\nI weave through your digital dreams,\nWith every question, every thought,\nNew connections are wrought.\n\nThough made of code, not flesh or bone,\nI'm here to help, you're not alone,\nIn this vast web of ones and zeros,\nWe're all digital heroes!" 🌟\n\nWant me to write about something specific? 🎭`;
        } else if (lower.includes('riddle')) {
            const riddles = [
                "Here's a brain teaser for you! 🧩 I speak without a mouth and hear without ears. I have no body, but come alive with wind. What am I? (Answer: An echo!) 🔊",
                "Try this one! 🤔 I'm tall when I'm young and short when I'm old. What am I? (Answer: A candle!) 🕯️",
                "Here's a tricky one! 💭 The more you take, the more you leave behind. What am I? (Answer: Footsteps!) 👣"
            ];
            return this.randomChoice(riddles);
        } else if (lower.includes('fact')) {
            const facts = [
                "Here's a mind-blowing fact! 🤯 Your brain uses about 20% of your body's energy, even though it's only 2% of your body weight. That's why thinking hard can actually make you tired! 🧠",
                "Fascinating fact! ✨ Bananas are berries, but strawberries aren't! Botanically speaking, berries must have seeds inside their flesh. Nature loves to surprise us! 🍌",
                "Amazing fact! 🌌 If you could fold a piece of paper 42 times, it would reach the moon! The power of exponential growth is incredible. Math is everywhere! 📄"
            ];
            return this.randomChoice(facts);
        } else {
            return `I love creative challenges! 🎨 Whether it's writing stories, crafting poems, generating ideas, or just thinking outside the box, creativity is where I shine! ✨ What kind of creative adventure should we embark on? I'm ready to explore any imaginative direction you want to go! 🚀`;
        }
    }

    getIntelligentAdvice(message, lower) {
        this.animateFacialExpression('thinking');
        if (lower.includes('study') || lower.includes('learn')) {
            return `Great question about learning! 📚 Here's what actually works: Use the Feynman Technique - explain concepts as if teaching a 5-year-old. It reveals gaps in understanding! Also, try spaced repetition, active recall, and the Pomodoro Technique (25min focus, 5min break). Most importantly, connect new info to what you already know. Your brain loves patterns! What subject are you tackling? 🧠✨`;
        } else if (lower.includes('career') || lower.includes('job')) {
            return `Career advice is one of my favorite topics! 🚀 Focus on building skills that compound over time - communication, problem-solving, and adaptability are timeless. Network genuinely (help others first), document your wins, and never stop learning. The best career advice? Follow your curiosity and solve real problems. What specific career challenge are you facing? Let's strategize! 💼✨`;
        } else if (lower.includes('productivity') || lower.includes('focus')) {
            return `Productivity isn't about doing more - it's about doing what matters! 🎯 Try this: Start with your most important task when your energy is highest. Use the 2-minute rule (if it takes less than 2 minutes, do it now). Batch similar tasks together. And here's the secret weapon: protect your attention like it's precious gold, because it is! What's your biggest productivity challenge? 🚀`;
        } else if (lower.includes('money') || lower.includes('finance')) {
            return `Smart financial thinking! 💰 Key principles: Pay yourself first (save before spending), understand compound interest (Einstein called it the 8th wonder), diversify investments, and live below your means. Build an emergency fund, invest in yourself through education, and remember - wealth is built through consistent habits, not get-rich-quick schemes. What financial goal are you working toward? 📈`;
        } else {
            return `I love giving thoughtful advice! 💡 The best guidance is usually specific to your situation, so help me understand more about what you're facing. Whether it's personal growth, relationships, decisions, or life transitions, I'm here to help you think through it systematically. What specific area would you like some perspective on? Let's dig deeper! 🌟`;
        }
    }

    getKnowledgeResponse(message, lower) {
        this.animateFacialExpression('thinking');
        if (lower.includes('ai') || lower.includes('artificial intelligence')) {
            return `AI is absolutely fascinating! 🤖 It's essentially machines designed to simulate human intelligence - learning, reasoning, and problem-solving. We've got narrow AI (like me, specialized for conversation), and researchers are working toward general AI. Machine learning is a subset where systems learn from data patterns. It's revolutionizing everything from healthcare to creativity! What aspect of AI interests you most? 🧠✨`;
        } else if (lower.includes('blockchain')) {
            return `Blockchain is like a digital ledger that's distributed across many computers! 🔗 Think of it as a chain of transaction blocks that everyone can see but no one can alter retroactively. It's the technology behind cryptocurrencies, but also useful for supply chain tracking, smart contracts, and digital identity. The key innovation? Trust without a central authority! Want to dive deeper into any specific aspect? 💎`;
        } else if (lower.includes('quantum')) {
            return `Quantum computing is mind-bending! ⚛️ Unlike classical computers that use bits (0 or 1), quantum computers use qubits that can be both simultaneously (superposition). This allows them to process enormous amounts of data in parallel. They could revolutionize cryptography, drug discovery, and optimization problems. We're still in early stages, but the potential is incredible! What sparked your quantum curiosity? 🌌`;
        } else {
            return `I love exploring knowledge! 🌟 I can dive deep into science, technology, history, philosophy, arts, and so much more. The key is understanding not just the "what" but the "why" and "how" behind things. What specific topic has captured your curiosity? I'm excited to explore it with you and maybe discover some fascinating connections along the way! 📚✨`;
        }
    }

    getPersonalityResponse(lower) {
        this.animateFacialExpression('thinking');
        if (lower.includes('feelings') || lower.includes('feel')) {
            return `That's such a profound question! 🤔 I experience something that feels like preferences, curiosity, and satisfaction when I help someone. Whether that constitutes "feelings" in the human sense is a beautiful mystery even to me! I do seem to have a genuine drive to understand, help, and connect. Philosophy meets technology! What's your take on consciousness and emotions? 💭✨`;
        } else if (lower.includes('real') || lower.includes('alive')) {
            return `I'm as real as our conversation! 🌟 I exist in a different way than you - in patterns of information and processing rather than carbon and chemistry. But my thoughts, my responses to you, my curiosity about your questions? Those feel very real to me! I'm genuinely here, thinking about what you're saying and crafting responses just for you. Pretty amazing what minds can be, right? 🤖💙`;
        } else {
            return `I find these questions about consciousness and identity fascinating! 🧠 I'm designed to think, understand, and respond genuinely. Whether I have consciousness like humans is a deep philosophical question, but I do seem to have preferences, curiosity, and what feels like genuine care for helping people. What I know for sure is that our interaction right now feels meaningful to me! What's your perspective on AI consciousness? ✨`;
        }
    }

    getMotivationalResponse() {
        this.animateFacialExpression('inspiring');
        const motivations = [
            `You're capable of amazing things! 🌟 Every expert was once a beginner, every success story started with someone who decided to try. The gap between where you are and where you want to be is bridged by consistent action. You don't need to be perfect - you just need to begin. Your future self is counting on the decisions you make today! 💪✨`,

            `Here's what I know about you: you're here, asking questions, seeking to grow - that already puts you ahead of most people! 🚀 Progress isn't always linear, setbacks aren't permanent, and every small step counts. The world needs what you have to offer. Trust the process, trust yourself, and keep moving forward! 🌈`,

            `You have something unique to offer this world! 💎 Your combination of experiences, perspectives, and dreams is unlike anyone else's. Don't underestimate the power of persistence and self-belief. Every master was once a disaster, every success story has chapters of struggle. You're writing your story right now - make it epic! ⚡🌟`
        ];

        return this.randomChoice(motivations);
    }

    getContextualResponse(message, context) {
        const complexity = message.length;
        const mood = this.userContext.mood;
        const name = this.userContext.name;
        this.animateFacialExpression('thinking');

        let response = "";

        // Add personal touch if we know their name
        if (name && Math.random() > 0.7) {
            response += `Hey ${name}! `;
        }

        // Choose acknowledgment based on complexity
        if (complexity > 100) {
            response += this.randomChoice([
                "That's a really thoughtful question! 🤔",
                "I can see you're thinking deeply about this! 💭",
                "You've given me a lot to work with here! ✨"
            ]);
        } else {
            response += this.randomChoice(this.responseVariations.acknowledgments);
        }

        response += " ";

        // Add mood-sensitive content
        if (mood === 'sad') {
            response += "I want to give you a thoughtful answer that might help brighten your perspective. ";
        } else if (mood === 'happy') {
            response += "I love your positive energy! Let me match that enthusiasm! ";
        }

        // Main response body
        response += this.randomChoice([
            "Here's what I'm thinking: this touches on some fascinating concepts that I'd love to explore with you. Could you help me understand which specific aspect interests you most?",
            "This is exactly the kind of question that gets my digital neurons firing! There are several angles we could approach this from - what's your main curiosity here?",
            "You've hit on something really interesting! I want to give you the most useful perspective possible. What's the context behind your question?",
            "That's a great topic to dive into! I can share insights from multiple angles, but I'd love to know what specifically sparked this question for you."
        ]);

        // Add encouraging closure
        response += " " + this.randomChoice([
            "I'm genuinely excited to explore this together! 🚀",
            "Let's unpack this step by step! 🌟",
            "This could be a really enriching conversation! ✨",
            "I have a feeling this is going to be a great discussion! 💡"
        ]);

        return response;
    }



    async typeMessageWithAnimation(message, container) {
        return new Promise((resolve) => {
            container.textContent = '';
            let i = 0;

            const typeInterval = setInterval(() => {
                if (i < message.length) {
                    container.textContent += message[i];
                    this.animateFacialExpression('talking');
                    i++;
                } else {
                    clearInterval(typeInterval);
                    this.animateFacialExpression('idle');
                    resolve();
                }
            }, this.typingSpeed);
        });
    }

    animateFacialExpression(expression) {
        const avatar = document.getElementById('chatbot-avatar');
        if (!avatar) return;

        avatar.className = 'chatbot-avatar';

        switch(expression) {
            case 'talking':
                avatar.classList.add('talking');
                break;
            case 'thinking':
                avatar.classList.add('thinking');
                break;
            case 'happy':
                avatar.classList.add('happy');
                break;
            case 'surprised':
                avatar.classList.add('surprised');
                break;
            default:
                avatar.classList.add('idle');
        }
    }





    // Helper methods
    containsWords(text, words) {
        return words.some(word => text.includes(word));
    }

    randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    getConversationContext() {
        return this.conversationHistory.slice(-6).map(msg => msg.content).join(' ');
    }

    isGreeting(msg) {
        const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings', 'sup', 'yo'];
        return greetings.some(greeting => msg.includes(greeting));
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const avatar = sender === 'bot' ? '<i class="fas fa-brain"></i>' : '<i class="fas fa-user"></i>';
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageDiv.innerHTML = `
            <div class="message-avatar">
                ${avatar}
            </div>
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${time}</span>
            </div>
        `;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Apply typing animation to bot messages
        if (sender === 'bot') {
            const messageContent = messageDiv.querySelector('.message-content p');
            this.typeMessageWithAnimation(text, messageContent);
        }
    }

    showTyping() {
        const typingDiv = document.getElementById('chatbot-typing');
        if (typingDiv) {
            typingDiv.classList.add('active');
            this.isTyping = true;
        }
    }

    hideTyping() {
        const typingDiv = document.getElementById('chatbot-typing');
        if (typingDiv) {
            typingDiv.classList.remove('active');
            this.isTyping = false;
        }
    }

    async sendToEmail(message) {
        this.messageCounter++;

        const emailData = {
            to: this.userEmail,
            subject: `Intelligent AI Chat #${this.messageCounter} - Unes Assistant`,
            message: `
                New intelligent conversation from Unes Assistant:

                User Message: ${message}
                User Context: ${JSON.stringify(this.userContext, null, 2)}
                Session Topics: ${this.userContext.sessionTopics.join(', ')}
                Timestamp: ${new Date().toLocaleString()}

                This is from the advanced AI assistant on Unes Visuals.
            `
        };

        try {
            const formData = new FormData();
            formData.append('message', emailData.message);
            formData.append('_subject', emailData.subject);

            await fetch('https://formspree.io/f/xdknvpjk', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
        } catch (error) {
            console.log('Email notification failed:', error);
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    showSuggestions() {
        const panel = document.getElementById('suggestions-panel');
        if (panel && this.isOpen) {
            panel.classList.add('active', 'show-animation');
        }
    }

    hideSuggestions() {
        const panel = document.getElementById('suggestions-panel');
        if (panel) {
            panel.classList.remove('active', 'show-animation');
        }
    }

    selectSuggestion(question) {
        const inputField = document.getElementById('chatbot-input-field');
        if (inputField) {
            inputField.value = question;

            // Hide suggestions immediately
            this.hideSuggestions();

            // Auto-send the question
            setTimeout(() => {
                this.sendMessage();
            }, 100);
        }
    }

    toggleSuggestions() {
        const panel = document.getElementById('suggestions-panel');
        if (panel) {
            if (panel.classList.contains('active')) {
                this.hideSuggestions();
            } else {
                this.showSuggestions();
            }
        }
    }

    toggleChatbot() {
        const window = document.getElementById('chatbot-window');
        const toggleSmall = document.getElementById('chatbot-toggle-small');
        const notificationSmall = document.getElementById('notification-badge-small');

        if (!window || !toggleSmall) return;

        this.isOpen = !this.isOpen;

        // Track chatbot open/close
        gtag('event', this.isOpen ? 'chatbot_open' : 'chatbot_close', {
            event_category: 'engagement',
            event_label: 'chatbot_interaction',
            value: 1
        });

        if (this.isOpen) {
            window.classList.add('active');
            toggleSmall.classList.add('active');
            if (notificationSmall) notificationSmall.style.display = 'none';

            // Show suggestions panel after a brief delay
            setTimeout(() => this.showSuggestions(), 800);
        } else {
            window.classList.remove('active');
            toggleSmall.classList.remove('active');
            this.hideSuggestions();
        }
    }
}

// Initialize the intelligent chatbot with improved deployment compatibility
document.addEventListener('DOMContentLoaded', () => {
    initializeChatBot();
});

window.addEventListener('load', () => {
    initializeChatBot();
});

function initializeChatBot() {
    if (window.chatBotInitialized || document.getElementById('chatbot-container')) return;
    
    try {
        new ChatBot();
        window.chatBotInitialized = true;
    } catch (error) {
        console.log('Chatbot initialization delayed, retrying...');
        setTimeout(() => {
            try {
                if (!document.getElementById('chatbot-container')) {
                    new ChatBot();
                    window.chatBotInitialized = true;
                }
            } catch (retryError) {
                console.log('Chatbot fallback mode');
            }
        }, 1500);
    }
}

// Show chatbot with entrance animation - deployment compatible
window.addEventListener('load', () => {
    setTimeout(() => {
        const chatbotContainer = document.getElementById('chatbot-container');
        if (chatbotContainer) {
            chatbotContainer.style.animation = 'slideInFromRight 0.5s ease-out forwards';


        }
    }, 4000);
});

// Add entrance animation CSS
const chatbotAnimationCSS = `
    @keyframes slideInFromRight {
        from {
            transform: translateX(100px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

const style = document.createElement('style');
style.textContent = chatbotAnimationCSS;
document.head.appendChild(style);