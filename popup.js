
class CyberInject {
  constructor() {
    this.init();
  }

  init() {
    this.setupTabNavigation();
    this.setupPayloadCopy();
    this.setupKeyboardShortcuts();
    this.updatePayloadCounts();
  }


  setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const payloadSections = document.querySelectorAll('.payload-section');

    tabButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        tabButtons.forEach(tab => tab.classList.remove('active'));
        payloadSections.forEach(section => section.classList.remove('active'));

        button.classList.add('active');

        const categoryId = button.getAttribute('data-category');
        const targetSection = document.getElementById(categoryId);
        
        if (targetSection) {
          targetSection.classList.add('active');
          
          const contentArea = document.querySelector('.content-area');
          contentArea.scrollTop = 0;
        }

        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
          button.style.transform = '';
        }, 150);
      });
    });
  }

  setupPayloadCopy() {
    const payloadCards = document.querySelectorAll('.payload-card');

    payloadCards.forEach(card => {
      card.addEventListener('click', async (e) => {
        e.preventDefault();
        
        const payload = card.getAttribute('data-payload');
        const copyButton = card.querySelector('.copy-button');
        const payloadName = card.querySelector('.payload-name').textContent;

        try {
          await this.copyToClipboard(payload);
          
          this.showCopySuccess(card, copyButton, payloadName);
          
          console.log(`Copied payload: ${payloadName}`);
          
        } catch (error) {
          console.error('Copy failed:', error);
          this.showCopyError(card, copyButton);
        }
      });

      card.addEventListener('mouseenter', () => {
        const copyButton = card.querySelector('.copy-button');
        copyButton.textContent = '📋';
      });

      card.addEventListener('mouseleave', () => {
        const copyButton = card.querySelector('.copy-button');
        if (!card.classList.contains('copied')) {
          copyButton.textContent = '📋';
        }
      });
    });
  }


  async copyToClipboard(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
      }
    } catch (error) {
      console.warn('Clipboard API failed, using fallback:', error);
    }

    return this.fallbackCopyToClipboard(text);
  }


  fallbackCopyToClipboard(text) {
    return new Promise((resolve, reject) => {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          resolve();
        } else {
          reject(new Error('execCommand copy failed'));
        }
      } catch (error) {
        document.body.removeChild(textArea);
        reject(error);
      }
    });
  }

  showCopySuccess(card, copyButton, payloadName) {
    card.classList.add('copied');
    
    copyButton.textContent = '✅';
    copyButton.style.transform = 'scale(1.2)';
    
    this.showTemporaryMessage(`Copied: ${payloadName}`, 'success');
    
    setTimeout(() => {
      card.classList.remove('copied');
      copyButton.textContent = '📋';
      copyButton.style.transform = '';
    }, 2000);
  }


  showCopyError(card, copyButton) {
    card.style.borderColor = '#ef4444';
    copyButton.textContent = '❌';
    
    this.showTemporaryMessage('Copy failed. Please try again.', 'error');
    
    setTimeout(() => {
      card.style.borderColor = '';
      copyButton.textContent = '📋';
    }, 2000);
  }


  showTemporaryMessage(message, type = 'info') {

    const existingMessages = document.querySelectorAll('.temp-message');
    existingMessages.forEach(msg => msg.remove());

    const messageEl = document.createElement('div');
    messageEl.className = `temp-message temp-message-${type}`;
    messageEl.textContent = message;
    
    Object.assign(messageEl.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
      color: 'white',
      padding: '8px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '500',
      zIndex: '10000',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      animation: 'slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s forwards'
    });

    document.body.appendChild(messageEl);

    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.remove();
      }
    }, 3000);
  }


  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {

      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      if (e.key >= '1' && e.key <= '5') {
        const tabIndex = parseInt(e.key) - 1;
        const tabs = document.querySelectorAll('.tab-button');
        
        if (tabs[tabIndex]) {
          tabs[tabIndex].click();
        }
      }

      if (e.key === 'Escape') {
        console.log('Escape pressed - could close popup');
      }
    });
  }

  updatePayloadCounts() {
    const sections = document.querySelectorAll('.payload-section');
    
    sections.forEach(section => {
      const payloadCards = section.querySelectorAll('.payload-card');
      const countElement = section.querySelector('.payload-count');
      
      if (countElement) {
        const count = payloadCards.length;
        countElement.textContent = `${count} payload${count !== 1 ? 's' : ''}`;
      }
    });
  }

  getStats() {
    const sections = document.querySelectorAll('.payload-section');
    let totalPayloads = 0;
    const categoryStats = {};

    sections.forEach(section => {
      const categoryId = section.id;
      const payloadCount = section.querySelectorAll('.payload-card').length;
      
      categoryStats[categoryId] = payloadCount;
      totalPayloads += payloadCount;
    });

    return {
      totalPayloads,
      categories: Object.keys(categoryStats).length,
      categoryStats
    };
  }
}

const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
  console.log('🛡️ CyberInject Security Testing Toolkit Loaded');
  
  const cyberInject = new CyberInject();
  
  const stats = cyberInject.getStats();
  console.log('📊 Extension Stats:', stats);
  
  window.cyberInject = cyberInject;
});

if (typeof chrome !== 'undefined' && chrome.runtime) {
  chrome.runtime.onSuspend.addListener(() => {
    console.log('🔄 CyberInject extension suspending');
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CyberInject;
}