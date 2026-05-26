/ Chat Assistant
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const voiceBtn = document.getElementById('voiceBtn');
    const chatMessages = document.getElementById('chatMessages');
    const languageSelect = document.getElementById('languageSelect');
    
    // Send message function
    function sendMessage(message) {
        if (!message.trim()) return;
        
        // Add user message
        addMessage(message, 'user');
        
        // Clear input
        chatInput.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const responses = [
                "Thank you for your question! Based on your interest in Jharkhand tourism, I'd recommend visiting Betla National Park for wildlife experiences, Hundru Falls for natural beauty, and the Tribal Museum in Ranchi for cultural insights. Would you like specific details about any of these destinations?",
                "Jharkhand offers incredible cultural experiences! You can participate in traditional Sarhul festivals, stay in authentic tribal homestays, learn tribal crafts, and enjoy local cuisine like dhuska and rugra. The state has over 30 tribal communities, each with unique traditions.",
                "For transportation in Jharkhand, I recommend using our integrated platform for real-time updates. You can book verified taxis, find bus schedules, and get GPS navigation to remote areas. Many locations have helicopter services for scenic routes too!",
                "Local cuisine in Jharkhand is amazing! Try dhuska (fried rice pancakes), rugra (wild mushrooms), bamboo shoot curry, and handia (rice beer). Many tribal homestays offer cooking classes where you can learn traditional recipes."
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, 'assistant');
        }, 1000);
    }
    
    // Add message to chat
    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = ⁠ message ${sender}-message ⁠;
        
        const avatarHTML = `
            <div class="message-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    ${sender === 'user' ? 
                        '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>' :
                        '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>'
                    }
                </svg>
            </div>
        `;
        
        messageDiv.innerHTML = `
            ${avatarHTML}
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Event listeners
    sendBtn.addEventListener('click', () => sendMessage(chatInput.value));
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage(this.value);
        }
    });
    
    // Voice input (mock implementation)
    voiceBtn.addEventListener('click', function() {
        // In a real implementation, this would use Web Speech API
        alert('Voice input feature would be implemented using Web Speech API in a production environment.');
    });
    
    // Language change
    languageSelect.addEventListener('change', function() {
        const language = this.value;
        let greeting = '';
        
        switch(language) {
            case 'hi':
                greeting = 'नमस्ते! मैं आपका झारखंड यात्रा सहायक हूं। मैं आपकी कैसे मदद कर सकता हूं?';
                break;
            case 'bn':
                greeting = 'নমস্কার! আমি আপনার ঝাড়খন্ড ভ্রমণ সহায়ক। আমি কিভাবে আপনাকে সাহায্য করতে পারি?';
                break;
            default:
                greeting = 'Hello! I\'m your Jharkhand travel assistant. How can I help you today?';
        }
        
        chatMessages.innerHTML = `
            <div class="message assistant-message">
                <div class="message-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                </div>
                <div class="message-content">
                    <p>${greeting}</p>
                </div>
            </div>
        `;
    });
});

// Quick action messages
function sendQuickMessage(message) {
    const chatInput = document.getElementById('chatInput');
    chatInput.value = message;
    document.getElementById('sendBtn').click();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);