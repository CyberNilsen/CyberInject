class CyberInject {
  constructor() {
    this.customPayloads = this.loadCustomPayloads();
    this.init();
  }

  init() {
    this.setupTabNavigation();
    this.setupPayloadCopy();
    this.setupKeyboardShortcuts();
    this.setupSettings();
    this.updatePayloadCounts();
    this.renderCustomPayloads();
    this.addDynamicStyles();
  }

  addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* Additional CSS for header controls and settings */
      .header-controls {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .settings-button {
        background: rgba(255, 255, 255, 0.15);
        border: none;
        padding: 8px;
        border-radius: 6px;
        cursor: pointer;
        color: white;
        font-size: 16px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(4px);
      }

      .settings-button:hover {
        background: rgba(255, 255, 255, 0.25);
        transform: rotate(180deg) scale(1.05);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      /* Settings Modal */
      .settings-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(15, 23, 42, 0.8);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        backdrop-filter: blur(8px);
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .settings-modal.active {
        display: flex;
        opacity: 1;
      }

      .settings-content {
        background: #ffffff;
        border-radius: 12px;
        padding: 24px;
        width: 90vw;
        max-width: 500px;
        max-height: 80vh;
        overflow-y: auto;
        border: 1px solid #e2e8f0;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        transform: scale(0.95);
        transition: transform 0.3s ease;
      }

      .settings-modal.active .settings-content {
        transform: scale(1);
      }

      .settings-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        border-bottom: 2px solid #dc2626;
        padding-bottom: 12px;
      }

      .settings-title {
        font-size: 18px;
        font-weight: 700;
        color: #0f172a;
      }

      .close-button {
        background: none;
        border: none;
        color: #64748b;
        font-size: 20px;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: all 0.2s ease;
      }

      .close-button:hover {
        color: #dc2626;
        background: #fef2f2;
      }

      .form-group {
        margin-bottom: 16px;
      }

      .form-label {
        display: block;
        font-size: 12px;
        font-weight: 600;
        color: #0f172a;
        margin-bottom: 6px;
      }

      .form-input, .form-select, .form-textarea {
        width: 100%;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        padding: 10px 12px;
        color: #0f172a;
        font-size: 13px;
        box-sizing: border-box;
        transition: all 0.2s ease;
      }

      .form-input:focus, .form-select:focus, .form-textarea:focus {
        outline: none;
        border-color: #dc2626;
        background: #ffffff;
        box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
      }

      .form-textarea {
        resize: vertical;
        min-height: 60px;
        font-family: 'Monaco', 'Consolas', monospace;
      }

      .button-group {
        display: flex;
        gap: 8px;
        margin-top: 20px;
      }

      .btn {
        padding: 10px 16px;
        border: none;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .btn-primary {
        background: #dc2626;
        color: white;
        border: none;
      }

      .btn-primary:hover {
        background: #b91c1c;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
      }

      .btn-secondary {
        background: #f8fafc;
        color: #475569;
        border: 1px solid #e2e8f0;
      }

      .btn-secondary:hover {
        background: #f1f5f9;
        border-color: #cbd5e1;
      }

      .custom-payloads-list {
        margin-top: 20px;
      }

      .custom-payload-item {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        padding: 12px;
        margin-bottom: 8px;
        position: relative;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        border-left: 3px solid #dc2626;
      }

      .custom-payload-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
      }

      .custom-payload-name {
        font-size: 12px;
        font-weight: 600;
        color: #0f172a;
      }

      .delete-button {
        background: #dc2626;
        border: none;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 10px;
        cursor: pointer;
        transition: all 0.2s ease;
        font-weight: 500;
      }

      .delete-button:hover {
        background: #b91c1c;
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(220, 38, 38, 0.4);
      }

      .custom-payload-code {
        font-family: 'Monaco', 'Consolas', monospace;
        font-size: 10px;
        color: #06b6d4;
        background: #0f172a;
        padding: 8px 10px;
        border-radius: 6px;
        word-break: break-all;
        border: 1px solid #1e293b;
      }

      .custom-payload {
        border-left: 3px solid #dc2626;
      }

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
  }

  setupSettings() {
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettings = document.getElementById('closeSettings');
    const cancelAdd = document.getElementById('cancelAdd');
    const payloadForm = document.getElementById('payloadForm');

    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => {
        settingsModal.classList.add('active');
        this.renderCustomPayloadsInSettings();
      });
    }

    if (closeSettings) {
      closeSettings.addEventListener('click', () => {
        settingsModal.classList.remove('active');
      });
    }

    if (cancelAdd) {
      cancelAdd.addEventListener('click', () => {
        settingsModal.classList.remove('active');
      });
    }

    if (settingsModal) {
      settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
          settingsModal.classList.remove('active');
        }
      });
    }

    if (payloadForm) {
      payloadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.addCustomPayload();
      });
    }
  }

  addCustomPayload() {
    const name = document.getElementById('payloadName').value.trim();
    const category = document.getElementById('payloadCategory').value;
    const code = document.getElementById('payloadCode').value.trim();
    const description = document.getElementById('payloadDescription').value.trim();

    if (!name || !category || !code || !description) {
      this.showTemporaryMessage('Please fill in all fields', 'error');
      return;
    }

    const payload = {
      id: Date.now().toString(),
      name,
      category,
      code,
      description,
      custom: true
    };

    this.customPayloads.push(payload);
    this.saveCustomPayloads();
    this.renderCustomPayloads();
    this.updatePayloadCounts();
    
    document.getElementById('payloadForm').reset();
    this.renderCustomPayloadsInSettings();
    this.showTemporaryMessage(`Added custom payload: ${name}`, 'success');
  }

  deleteCustomPayload(id) {
    this.customPayloads = this.customPayloads.filter(payload => payload.id !== id);
    this.saveCustomPayloads();
    this.renderCustomPayloads();
    this.renderCustomPayloadsInSettings();
    this.updatePayloadCounts();
    this.showTemporaryMessage('Custom payload deleted', 'success');
  }

  renderCustomPayloads() {
    this.customPayloads.forEach(payload => {
      const section = document.getElementById(payload.category);
      if (!section) return;

      const payloadGrid = section.querySelector('.payload-grid');
      
      const existing = payloadGrid.querySelector(`[data-custom-id="${payload.id}"]`);
      if (existing) {
        existing.remove();
      }

      const payloadCard = document.createElement('div');
      payloadCard.className = 'payload-card custom-payload';
      payloadCard.setAttribute('data-payload', payload.code);
      payloadCard.setAttribute('data-custom-id', payload.id);
      
      payloadCard.innerHTML = `
        <div class="payload-header">
          <h3 class="payload-name">${this.escapeHtml(payload.name)}</h3>
          <div class="copy-button">📋</div>
        </div>
        <code class="payload-code">${this.escapeHtml(payload.code)}</code>
        <div class="payload-description">${this.escapeHtml(payload.description)}</div>
      `;

      this.setupPayloadCardEvents(payloadCard);
      payloadGrid.appendChild(payloadCard);
    });
  }

  renderCustomPayloadsInSettings() {
    const container = document.getElementById('customPayloadsContainer');
    if (!container) return;

    container.innerHTML = '';

    if (this.customPayloads.length === 0) {
      container.innerHTML = '<p style="color: #64748b; font-size: 12px; text-align: center; padding: 20px;">No custom payloads yet. Add your first one above!</p>';
      return;
    }

    this.customPayloads.forEach(payload => {
      const payloadItem = document.createElement('div');
      payloadItem.className = 'custom-payload-item';
      
      payloadItem.innerHTML = `
        <div class="custom-payload-header">
          <span class="custom-payload-name">${this.escapeHtml(payload.name)} (${payload.category.toUpperCase()})</span>
          <button class="delete-button" data-id="${payload.id}">Delete</button>
        </div>
        <div class="custom-payload-code">${this.escapeHtml(payload.code)}</div>
      `;

      const deleteBtn = payloadItem.querySelector('.delete-button');
      deleteBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this custom payload?')) {
          this.deleteCustomPayload(payload.id);
        }
      });

      container.appendChild(payloadItem);
    });
  }

  setupPayloadCardEvents(card) {
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
  }

  loadCustomPayloads() {
    try {
      // Use in-memory storage instead of localStorage for Claude.ai compatibility
      return window.customPayloadsData || [];
    } catch (error) {
      console.warn('Failed to load custom payloads:', error);
      return [];
    }
  }

  saveCustomPayloads() {
    try {
      // Use in-memory storage instead of localStorage for Claude.ai compatibility
      window.customPayloadsData = this.customPayloads;
    } catch (error) {
      console.warn('Failed to save custom payloads:', error);
      this.showTemporaryMessage('Failed to save custom payload', 'error');
    }
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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
      this.setupPayloadCardEvents(card);
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
        const modal = document.getElementById('settingsModal');
        if (modal && modal.classList.contains('active')) {
          modal.classList.remove('active');
        }
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
      categoryStats,
      customPayloads: this.customPayloads.length
    };
  }
}

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