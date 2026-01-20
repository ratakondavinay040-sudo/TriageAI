// Chatbot Logic
document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('send-btn');
    const chatInput = document.getElementById('chat-input');
    const chatBody = document.getElementById('chat-body');

    if (sendBtn && chatInput) {
        sendBtn.addEventListener('click', handleSendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSendMessage();
        });
    }

    function handleSendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        // Add User Message
        addMessage(text, 'user-message');
        chatInput.value = '';

        // Simulate AI "Typing"
        showTypingIndicator();

        // Simulate Delay and Response
        setTimeout(() => {
            removeTypingIndicator();
            const response = generateMockResponse(text);
            addMessage(response.text, 'bot-message', response.isHtml);
        }, 1500);
    }

    function addMessage(content, className, isHtml = false) {
        const div = document.createElement('div');
        div.classList.add('message', className);
        if (isHtml) {
            div.innerHTML = content;
        } else {
            div.innerText = content;
        }
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Voice Input Simulation
    const micBtn = document.getElementById('mic-btn');
    if (micBtn) {
        micBtn.addEventListener('click', () => {
            if (micBtn.classList.contains('listening')) return;

            // Start Listening UI
            micBtn.classList.add('listening');
            micBtn.innerHTML = '<i class="ph-fill ph-microphone"></i>';
            micBtn.style.color = 'var(--status-high)';
            micBtn.style.animation = 'pulse 1.5s infinite';
            chatInput.placeholder = "Listening...";

            // Simulate processing delay then "Speech to Text"
            setTimeout(() => {
                micBtn.classList.remove('listening');
                micBtn.innerHTML = '<i class="ph ph-microphone"></i>';
                micBtn.style.color = '';
                micBtn.style.animation = '';
                chatInput.placeholder = "Type your symptoms...";

                // Typing effect
                const simulatedText = "I have a sharp pain in my left arm.";
                typeWriter(simulatedText);
            }, 2000);
        });
    }

    function typeWriter(text, i = 0) {
        if (i < text.length) {
            chatInput.value += text.charAt(i);
            setTimeout(() => typeWriter(text, i + 1), 50);
        } else {
            // Auto send after typing
            setTimeout(() => handleSendMessage(), 500);
        }
    }

    function generateMockResponse(input) {
        const lowerInput = input.toLowerCase();

        // Symptom: High Fever
        if (lowerInput.includes('fever') || lowerInput.includes('temperature') || lowerInput.includes('104')) {
            if (lowerInput.includes('high') || lowerInput.includes('104') || lowerInput.includes('40')) {
                return {
                    text: `
                        <div class="result-box high-urgency">
                            <div class="urgency-label"><i class="ph-fill ph-warning"></i> High Urgency</div>
                            <p><strong>Possible Condition:</strong> Severe Hyperpyrexia</p>
                            <p>Your temperature indicates a potentially dangerous fever.</p>
                        </div>
                        <p>Please visit an Emergency Room immediately or consult a doctor now.</p>
                        <div class="chat-actions">
                            <button class="btn-xs btn-primary"><i class="ph ph-video-camera"></i> Connect to Doctor</button>
                            <button class="btn-xs btn-outline">Find ER Nearby</button>
                        </div>
                    `,
                    isHtml: true
                };
            }
            return {
                text: "I see you have a fever. How long have you been experiencing this? Is it above 38°C (100.4°F)?",
                isHtml: false
            };
        }

        // Symptom: Headache
        if (lowerInput.includes('headache') || lowerInput.includes('head pain')) {
            return {
                text: `
                    <div class="result-box medium-urgency">
                        <div class="urgency-label"><i class="ph-fill ph-info"></i> Medium Urgency</div>
                        <p><strong>Possible Condition:</strong> Migraine / Tension Headache</p>
                    </div>
                    <p>Have you been sensitive to light or sound recently?</p>
                `,
                isHtml: true
            };
        }

        // Symptom: Chest Pain
        if (lowerInput.includes('chest') || lowerInput.includes('heart')) {
            return {
                text: `
                    <div class="result-box high-urgency">
                        <div class="urgency-label"><i class="ph-fill ph-warning-octagon"></i> Critical</div>
                        <p><strong>Warning:</strong> Chest pain can be serious.</p>
                        <p>Medical recommendation: <strong>Emergency Care</strong>.</p>
                    </div>
                    <div class="chat-actions">
                         <button class="btn-xs btn-danger">Call Emergency Services</button>
                    </div>
                `,
                isHtml: true
            };
        }

        return {
            text: "Thank you. I'm analyzing that. Could you provide more details about how long you've felt this way?",
            isHtml: false
        };
    }

    function showTypingIndicator() {
        const div = document.createElement('div');
        div.id = 'typing-indicator';
        div.classList.add('message', 'bot-message', 'typing');
        div.innerText = 'Analyzing...';
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function removeTypingIndicator() {
        const typing = document.getElementById('typing-indicator');
        if (typing) typing.remove();
    }
});
