class CyberInject {
  constructor() {
    this.customPayloads = [];
    this.history = [];
    this.init();
  }

  async init() {
    this.addDynamicStyles();
    await this.loadCustomPayloads();
    await this.loadHistory();
    this.setupTabNavigation();
    this.setupPayloadCopy();
    this.setupKeyboardShortcuts();
    this.setupSettings();
    this.setupTools();
    this.setupHistory();
    this.renderCustomPayloads();
    this.updatePayloadCounts();
    this.setupScrollFades();
  }

  setupScrollFades() {
    const tabNavigation = document.querySelector('.tab-navigation');
    if (!tabNavigation) return;

    function updateScrollFades() {
      const scrollLeft = tabNavigation.scrollLeft;
      const scrollWidth = tabNavigation.scrollWidth;
      const clientWidth = tabNavigation.clientWidth;
      
      // Show left fade if scrolled right
      if (scrollLeft > 10) {
        tabNavigation.classList.add('fade-left');
      } else {
        tabNavigation.classList.remove('fade-left');
      }
      
      // Show right fade if not scrolled all the way right
      if (scrollLeft < scrollWidth - clientWidth - 10) {
        tabNavigation.classList.add('fade-right');
      } else {
        tabNavigation.classList.remove('fade-right');
      }
    }

    // Update on scroll
    tabNavigation.addEventListener('scroll', updateScrollFades);

    // Update on page load and resize
    window.addEventListener('load', updateScrollFades);
    window.addEventListener('resize', updateScrollFades);
    
    // Initial update
    setTimeout(updateScrollFades, 100);
  }

  setupTools() {
    // URL Encode/Decode
    const urlEncode = document.getElementById('urlEncode');
    const urlDecode = document.getElementById('urlDecode');
    const urlInput = document.getElementById('urlInput');
    const urlResult = document.getElementById('urlResult');

    if (urlEncode) {
      urlEncode.addEventListener('click', () => {
        const text = urlInput.value;
        if (text) {
          urlResult.textContent = encodeURIComponent(text);
          urlResult.style.display = 'block';
        }
      });
    }

    if (urlDecode) {
      urlDecode.addEventListener('click', () => {
        const text = urlInput.value;
        if (text) {
          try {
            urlResult.textContent = decodeURIComponent(text);
            urlResult.style.display = 'block';
          } catch (e) {
            urlResult.textContent = 'Error: Invalid URL encoding';
            urlResult.style.display = 'block';
          }
        }
      });
    }

    // Base64 Encode/Decode
    const base64Encode = document.getElementById('base64Encode');
    const base64Decode = document.getElementById('base64Decode');
    const base64Input = document.getElementById('base64Input');
    const base64Result = document.getElementById('base64Result');

    if (base64Encode) {
      base64Encode.addEventListener('click', () => {
        const text = base64Input.value;
        if (text) {
          base64Result.textContent = btoa(text);
          base64Result.style.display = 'block';
        }
      });
    }

    if (base64Decode) {
      base64Decode.addEventListener('click', () => {
        const text = base64Input.value;
        if (text) {
          try {
            base64Result.textContent = atob(text);
            base64Result.style.display = 'block';
          } catch (e) {
            base64Result.textContent = 'Error: Invalid Base64 string';
            base64Result.style.display = 'block';
          }
        }
      });
    }

    // HTML Entity Encode
    const htmlEncode = document.getElementById('htmlEncode');
    const htmlInput = document.getElementById('htmlInput');
    const htmlResult = document.getElementById('htmlResult');

    if (htmlEncode) {
      htmlEncode.addEventListener('click', () => {
        const text = htmlInput.value;
        if (text) {
          htmlResult.textContent = this.htmlEntityEncode(text);
          htmlResult.style.display = 'block';
        }
      });
    }

    // Hex Encode/Decode
    const hexEncode = document.getElementById('hexEncode');
    const hexDecode = document.getElementById('hexDecode');
    const hexInput = document.getElementById('hexInput');
    const hexResult = document.getElementById('hexResult');

    if (hexEncode) {
      hexEncode.addEventListener('click', () => {
        const text = hexInput.value;
        if (text) {
          let hex = '';
          for (let i = 0; i < text.length; i++) {
            hex += text.charCodeAt(i).toString(16);
          }
          hexResult.textContent = hex;
          hexResult.style.display = 'block';
        }
      });
    }

    if (hexDecode) {
      hexDecode.addEventListener('click', () => {
        const text = hexInput.value;
        if (text) {
          try {
            let str = '';
            for (let i = 0; i < text.length; i += 2) {
              str += String.fromCharCode(parseInt(text.substr(i, 2), 16));
            }
            hexResult.textContent = str;
            hexResult.style.display = 'block';
          } catch (e) {
            hexResult.textContent = 'Error: Invalid hex string';
            hexResult.style.display = 'block';
          }
        }
      });
    }

    // Payload Variation Generator
    const generateVariations = document.getElementById('generateVariations');
    const variationInput = document.getElementById('variationInput');
    const variationResult = document.getElementById('variationResult');

    if (generateVariations) {
      generateVariations.addEventListener('click', () => {
        const payload = variationInput.value;
        if (payload) {
          const variations = this.generatePayloadVariations(payload);
          variationResult.innerHTML = variations.map(v => `<div style="margin-bottom: 8px;">${this.escapeHtml(v)}</div>`).join('');
          variationResult.style.display = 'block';
        }
      });
    }

    // Character Counter
    const countChars = document.getElementById('countChars');
    const counterInput = document.getElementById('counterInput');
    const counterResult = document.getElementById('counterResult');

    if (countChars) {
      countChars.addEventListener('click', () => {
        const text = counterInput.value;
        const chars = text.length;
        const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
        const lines = text.split('\n').length;
        
        counterResult.innerHTML = `
          <div>Characters: ${chars}</div>
          <div>Words: ${words}</div>
          <div>Lines: ${lines}</div>
        `;
        counterResult.style.display = 'block';
      });
    }
  }

  htmlEntityEncode(text) {
    const textarea = document.createElement('textarea');
    textarea.textContent = text;
    return textarea.innerHTML.replace(/&/g, '&amp;')
                              .replace(/</g, '&lt;')
                              .replace(/>/g, '&gt;')
                              .replace(/"/g, '&quot;')
                              .replace(/'/g, '&#39;');
  }

  generatePayloadVariations(payload) {
    const variations = [];
    
    // Original
    variations.push(payload);
    
    // Case variations
    variations.push(payload.toUpperCase());
    variations.push(payload.toLowerCase());
    
    // URL encoded
    variations.push(encodeURIComponent(payload));
    
    // Double URL encoded
    variations.push(encodeURIComponent(encodeURIComponent(payload)));
    
    // HTML entities
    variations.push(this.htmlEntityEncode(payload));
    
    // With null bytes
    variations.push(payload + '%00');
    
    if (payload.includes("'") || payload.includes('"')) {
      variations.push(payload + '/**/');
      variations.push(payload + '--');
    }
    
    return variations;
  }

  setupHistory() {
    const clearHistory = document.getElementById('clearHistory');
    
    if (clearHistory) {
      clearHistory.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all history?')) {
          this.history = [];
          this.saveHistory();
          this.renderHistory();
          this.showTemporaryMessage('History cleared', 'success');
        }
      });
    }
    
    this.renderHistory();
  }

  addToHistory(payloadName, payloadCode) {
    const historyItem = {
      id: Date.now().toString(),
      name: payloadName,
      code: payloadCode,
      timestamp: new Date().toISOString()
    };
    
    this.history.unshift(historyItem);
    
    if (this.history.length > 50) {
      this.history = this.history.slice(0, 50);
    }
    
    this.saveHistory();
  }

  async loadHistory() {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        const result = await new Promise((resolve) => {
          chrome.storage.local.get(['payloadHistory'], (result) => {
            resolve(result);
          });
        });
        this.history = result.payloadHistory || [];
      } else {
        const stored = localStorage.getItem('cyberInjectHistory');
        this.history = stored ? JSON.parse(stored) : [];
      }
    } catch (error) {
      console.warn('Failed to load history:', error);
      this.history = [];
    }
  }

  async saveHistory() {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        await new Promise((resolve, reject) => {
          chrome.storage.local.set({ payloadHistory: this.history }, () => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
            } else {
              resolve();
            }
          });
        });
      } else {
        localStorage.setItem('cyberInjectHistory', JSON.stringify(this.history));
      }
    } catch (error) {
      console.warn('Failed to save history:', error);
    }
  }

  renderHistory() {
    const historyContainer = document.getElementById('historyContainer');
    if (!historyContainer) return;

    if (this.history.length === 0) {
      historyContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📋</div>
          <div class="empty-state-text">No payloads tested yet. Start testing to see your history here.</div>
        </div>
      `;
      return;
    }

    historyContainer.innerHTML = this.history.map(item => {
      const date = new Date(item.timestamp);
      const timeStr = date.toLocaleTimeString();
      const dateStr = date.toLocaleDateString();
      
      return `
        <div class="payload-card" data-payload="${this.escapeHtml(item.code)}" style="margin-bottom: 10px;">
          <div class="payload-header">
            <h3 class="payload-name">${this.escapeHtml(item.name)}</h3>
            <div class="copy-button">📋</div>
          </div>
          <code class="payload-code">${this.escapeHtml(item.code)}</code>
          <div class="payload-description">Used on ${dateStr} at ${timeStr}</div>
        </div>
      `;
    }).join('');

    const historyCards = historyContainer.querySelectorAll('.payload-card');
    historyCards.forEach(card => {
      this.setupPayloadCardEvents(card);
    });
  }

  addDynamicStyles() {
    var style = document.createElement('style');
    style.textContent = `
      body {
        width: 380px !important;
        height: 500px !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: hidden !important;
      }

      .extension-container {
        width: 380px !important;
        height: 500px !important;
        min-width: 380px !important;
        max-width: 380px !important;
        min-height: 500px !important;
        max-height: 500px !important;
        overflow: hidden !important;
        box-sizing: border-box !important;
        position: relative !important;
      }

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

      .settings-section {
        padding: 20px 0;
        height: calc(100vh - 140px);
        max-height: 400px;
        overflow-y: auto;
        box-sizing: border-box;
      }

      .settings-section .settings-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        border-bottom: 2px solid #dc2626;
        padding-bottom: 12px;
      }

      .settings-section .settings-title {
        font-size: 18px;
        font-weight: 700;
        color: #0f172a;
      }

      .settings-section .close-button {
        background: none;
        border: none;
        color: #64748b;
        font-size: 20px;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: all 0.2s ease;
      }

      .settings-section .close-button:hover {
        color: #dc2626;
        background: #fef2f2;
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
    var settingsBtn = document.getElementById('settingsBtn');

    if (settingsBtn) {
      settingsBtn.addEventListener('click', function() {
        this.showSettingsOverlay();
      }.bind(this));
    }
  }

  showSettingsOverlay() {
    var settingsOverlay = document.createElement('div');
    settingsOverlay.id = 'settingsOverlay';
    settingsOverlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 380px;
      height: 500px;
      background: #ffffff;
      z-index: 10000;
      padding: 16px;
      box-sizing: border-box;
      overflow-y: auto;
      overflow-x: hidden;
    `;

    settingsOverlay.innerHTML = `
      <div class="settings-header">
        <h2 class="settings-title">Custom Payloads</h2>
        <button class="close-button" id="closeSettingsOverlay">&times;</button>
      </div>

      <form id="payloadFormOverlay">
        <div class="form-group">
          <label class="form-label">Payload Name</label>
          <input type="text" class="form-input" id="payloadNameOverlay" placeholder="Enter payload name" required>
        </div>

        <div class="form-group">
          <label class="form-label">Category</label>
          <select class="form-select" id="payloadCategoryOverlay" required>
            <option value="">Select Category</option>
            <option value="xss">Cross-Site Scripting (XSS)</option>
            <option value="sqli">SQL Injection</option>
            <option value="ssrf">Server-Side Request Forgery</option>
            <option value="lfi">Local File Inclusion</option>
            <option value="other">Other Vulnerabilities</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Payload Code</label>
          <textarea class="form-textarea" id="payloadCodeOverlay" placeholder="Enter your payload code" required style="min-height: 40px; max-height: 60px;"></textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Description</label>
          <input type="text" class="form-input" id="payloadDescriptionOverlay" placeholder="Brief description of the payload" required>
        </div>

        <div class="button-group">
          <button type="submit" class="btn btn-primary">Add Payload</button>
          <button type="button" class="btn btn-secondary" id="cancelOverlay">Back to Payloads</button>
        </div>
      </form>

      <div class="custom-payloads-list">
        <h3 style="color: #0f172a; font-size: 14px; margin-bottom: 12px; font-weight: 600;">Your Custom Payloads</h3>
        <div id="customPayloadsContainerOverlay" style="max-height: 100px; overflow-y: auto; overflow-x: hidden;"></div>
      </div>
    `;

    document.querySelector('.extension-container').appendChild(settingsOverlay);

    var closeBtn = document.getElementById('closeSettingsOverlay');
    var cancelBtn = document.getElementById('cancelOverlay');
    var form = document.getElementById('payloadFormOverlay');

    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        this.hideSettingsOverlay();
      }.bind(this));
    }

    if (cancelBtn) {
      cancelBtn.addEventListener('click', function() {
        this.hideSettingsOverlay();
      }.bind(this));
    }

    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        this.addCustomPayloadOverlay();
      }.bind(this));
    }

    this.renderCustomPayloadsOverlay();
  }

    

  hideSettingsOverlay() {
    var overlay = document.getElementById('settingsOverlay');
    
    if (overlay) {
      overlay.remove();
    }
    
    this.renderCustomPayloads();
    this.updatePayloadCounts();
  }

  async addCustomPayloadOverlay() {
    var name = document.getElementById('payloadNameOverlay').value.trim();
    var category = document.getElementById('payloadCategoryOverlay').value;
    var code = document.getElementById('payloadCodeOverlay').value.trim();
    var description = document.getElementById('payloadDescriptionOverlay').value.trim();

    if (!name || !category || !code || !description) {
      this.showTemporaryMessage('Please fill in all fields', 'error');
      return;
    }

    var payload = {
      id: Date.now().toString(),
      name: name,
      category: category,
      code: code,
      description: description,
      custom: true
    };

    this.customPayloads.push(payload);
    await this.saveCustomPayloads();
    
    document.getElementById('payloadFormOverlay').reset();
    this.renderCustomPayloadsOverlay();
    
    this.renderCustomPayloads();
    this.updatePayloadCounts();
    
    this.showTemporaryMessage('Added custom payload: ' + name, 'success');
  }

  renderCustomPayloadsOverlay() {
    var container = document.getElementById('customPayloadsContainerOverlay');
    if (!container) return;

    container.innerHTML = '';

    if (this.customPayloads.length === 0) {
      container.innerHTML = '<p style="color: #64748b; font-size: 14px; text-align: center; padding: 20px;">No custom payloads yet. Add your first one above!</p>';
      return;
    }

    for (var i = 0; i < this.customPayloads.length; i++) {
      var payload = this.customPayloads[i];
      var payloadItem = document.createElement('div');
      payloadItem.className = 'custom-payload-item';
      
      payloadItem.innerHTML = `
        <div class="custom-payload-header">
          <span class="custom-payload-name">${this.escapeHtml(payload.name)} (${payload.category.toUpperCase()})</span>
          <button class="delete-button" data-id="${payload.id}">Delete</button>
        </div>
        <div class="custom-payload-code">${this.escapeHtml(payload.code)}</div>
      `;

      var deleteBtn = payloadItem.querySelector('.delete-button');
      deleteBtn.addEventListener('click', function(e) {
        var id = e.target.getAttribute('data-id');
        if (confirm('Are you sure you want to delete this custom payload?')) {
          this.deleteCustomPayloadOverlay(id);
        }
      }.bind(this));

      container.appendChild(payloadItem);
    }
  }

  async deleteCustomPayloadOverlay(id) {
    this.customPayloads = this.customPayloads.filter(function(payload) {
      return payload.id !== id;
    });
    await this.saveCustomPayloads();
    this.renderCustomPayloadsOverlay();
    
    this.renderCustomPayloads();
    this.updatePayloadCounts();
    
    this.showTemporaryMessage('Custom payload deleted', 'success');
  }

  async addCustomPayload() {
    var name = document.getElementById('payloadName').value.trim();
    var category = document.getElementById('payloadCategory').value;
    var code = document.getElementById('payloadCode').value.trim();
    var description = document.getElementById('payloadDescription').value.trim();

    if (!name || !category || !code || !description) {
      this.showTemporaryMessage('Please fill in all fields', 'error');
      return;
    }

    var payload = {
      id: Date.now().toString(),
      name: name,
      category: category,
      code: code,
      description: description,
      custom: true
    };

    this.customPayloads.push(payload);
    await this.saveCustomPayloads();
    this.renderCustomPayloads();
    this.updatePayloadCounts();
    
    document.getElementById('payloadForm').reset();
    this.renderCustomPayloadsInSettings();
    this.showTemporaryMessage('Added custom payload: ' + name, 'success');
  }

  async deleteCustomPayload(id) {
    this.customPayloads = this.customPayloads.filter(function(payload) {
      return payload.id !== id;
    });
    await this.saveCustomPayloads();
    this.renderCustomPayloads();
    this.renderCustomPayloadsInSettings();
    this.updatePayloadCounts();
    this.showTemporaryMessage('Custom payload deleted', 'success');
  }

  renderCustomPayloads() {
    for (var i = 0; i < this.customPayloads.length; i++) {
      var payload = this.customPayloads[i];
      var section = document.getElementById(payload.category);
      if (!section) continue;

      var payloadGrid = section.querySelector('.payload-grid');
      
      var existing = payloadGrid.querySelector('[data-custom-id="' + payload.id + '"]');
      if (existing) {
        existing.remove();
      }

      var payloadCard = document.createElement('div');
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
    }
  }

  renderCustomPayloadsInSettings() {
    var container = document.getElementById('customPayloadsContainer');
    if (!container) return;

    container.innerHTML = '';

    if (this.customPayloads.length === 0) {
      container.innerHTML = '<p style="color: #64748b; font-size: 12px; text-align: center; padding: 20px;">No custom payloads yet. Add your first one above!</p>';
      return;
    }

    for (var i = 0; i < this.customPayloads.length; i++) {
      var payload = this.customPayloads[i];
      var payloadItem = document.createElement('div');
      payloadItem.className = 'custom-payload-item';
      
      payloadItem.innerHTML = `
        <div class="custom-payload-header">
          <span class="custom-payload-name">${this.escapeHtml(payload.name)} (${payload.category.toUpperCase()})</span>
          <button class="delete-button" data-id="${payload.id}">Delete</button>
        </div>
        <div class="custom-payload-code">${this.escapeHtml(payload.code)}</div>
      `;

      var deleteBtn = payloadItem.querySelector('.delete-button');
      deleteBtn.addEventListener('click', function(e) {
        var id = e.target.getAttribute('data-id');
        if (confirm('Are you sure you want to delete this custom payload?')) {
          this.deleteCustomPayload(id);
        }
      }.bind(this));

      container.appendChild(payloadItem);
    }
  }

  setupPayloadCardEvents(card) {
    var self = this;
    card.addEventListener('click', function(e) {
      e.preventDefault();
      
      var payload = card.getAttribute('data-payload');
      var copyButton = card.querySelector('.copy-button');
      var payloadName = card.querySelector('.payload-name').textContent;

      self.copyToClipboard(payload).then(function() {
        self.showCopySuccess(card, copyButton, payloadName);
        self.addToHistory(payloadName, payload);
        self.renderHistory();
        console.log('Copied payload: ' + payloadName);
      }).catch(function(error) {
        console.error('Copy failed:', error);
        self.showCopyError(card, copyButton);
      });
    });

    card.addEventListener('mouseenter', function() {
      var copyButton = card.querySelector('.copy-button');
      copyButton.textContent = '📋';
    });

    card.addEventListener('mouseleave', function() {
      var copyButton = card.querySelector('.copy-button');
      if (!card.classList.contains('copied')) {
        copyButton.textContent = '📋';
      }
    });
  }

  async loadCustomPayloads() {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
        const result = await new Promise((resolve) => {
          chrome.storage.sync.get(['customPayloads'], (result) => {
            resolve(result);
          });
        });
        this.customPayloads = result.customPayloads || [];
      } else if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        const result = await new Promise((resolve) => {
          chrome.storage.local.get(['customPayloads'], (result) => {
            resolve(result);
          });
        });
        this.customPayloads = result.customPayloads || [];
      } else {
        var stored = localStorage.getItem('cyberInjectCustomPayloads');
        this.customPayloads = stored ? JSON.parse(stored) : [];
      }
      console.log('Loaded custom payloads:', this.customPayloads);
    } catch (error) {
      console.warn('Failed to load custom payloads:', error);
      this.customPayloads = [];
    }
  }

  async saveCustomPayloads() {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
        await new Promise((resolve, reject) => {
          chrome.storage.sync.set({ customPayloads: this.customPayloads }, () => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
            } else {
              resolve();
            }
          });
        });
      } else if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        await new Promise((resolve, reject) => {
          chrome.storage.local.set({ customPayloads: this.customPayloads }, () => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
            } else {
              resolve();
            }
          });
        });
      } else {
        // Fallback to localStorage for non-extension environments
        localStorage.setItem('cyberInjectCustomPayloads', JSON.stringify(this.customPayloads));
      }
      console.log('Saved custom payloads:', this.customPayloads);
    } catch (error) {
      console.warn('Failed to save custom payloads:', error);
      this.showTemporaryMessage('Failed to save custom payload', 'error');
    }
  }

  escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  setupTabNavigation() {
    var tabButtons = document.querySelectorAll('.tab-button');
    var payloadSections = document.querySelectorAll('.payload-section');
    var self = this;

    for (var i = 0; i < tabButtons.length; i++) {
      tabButtons[i].addEventListener('click', function(e) {
        e.preventDefault();
        
        for (var j = 0; j < tabButtons.length; j++) {
          tabButtons[j].classList.remove('active');
        }
        for (var k = 0; k < payloadSections.length; k++) {
          payloadSections[k].classList.remove('active');
        }

        this.classList.add('active');

        var categoryId = this.getAttribute('data-category');
        var targetSection = document.getElementById(categoryId);
        
        if (targetSection) {
          targetSection.classList.add('active');
          
          var contentArea = document.querySelector('.content-area');
          contentArea.scrollTop = 0;
        }

        this.style.transform = 'scale(0.95)';
        setTimeout(function() {
          this.style.transform = '';
        }.bind(this), 150);
      });
    }
  }

  setupPayloadCopy() {
    var payloadCards = document.querySelectorAll('.payload-card');

    for (var i = 0; i < payloadCards.length; i++) {
      this.setupPayloadCardEvents(payloadCards[i]);
    }
  }

  copyToClipboard(text) {
    var self = this;
    return new Promise(function(resolve, reject) {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(resolve).catch(function(error) {
            console.warn('Clipboard API failed, using fallback:', error);
            self.fallbackCopyToClipboard(text).then(resolve).catch(reject);
          });
        } else {
          self.fallbackCopyToClipboard(text).then(resolve).catch(reject);
        }
      } catch (error) {
        console.warn('Clipboard API failed, using fallback:', error);
        self.fallbackCopyToClipboard(text).then(resolve).catch(reject);
      }
    });
  }

  fallbackCopyToClipboard(text) {
    return new Promise(function(resolve, reject) {
      var textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        var successful = document.execCommand('copy');
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
    var self = this;
    card.classList.add('copied');
    
    copyButton.textContent = '✅';
    copyButton.style.transform = 'scale(1.2)';
    
    this.showTemporaryMessage('Copied: ' + payloadName, 'success');
    
    setTimeout(function() {
      card.classList.remove('copied');
      copyButton.textContent = '📋';
      copyButton.style.transform = '';
    }, 2000);
  }

  showCopyError(card, copyButton) {
    var self = this;
    card.style.borderColor = '#ef4444';
    copyButton.textContent = '❌';
    
    this.showTemporaryMessage('Copy failed. Please try again.', 'error');
    
    setTimeout(function() {
      card.style.borderColor = '';
      copyButton.textContent = '📋';
    }, 2000);
  }

  showTemporaryMessage(message, type) {
    type = type || 'info';
    var existingMessages = document.querySelectorAll('.temp-message');
    for (var i = 0; i < existingMessages.length; i++) {
      existingMessages[i].remove();
    }

    var messageEl = document.createElement('div');
    messageEl.className = 'temp-message temp-message-' + type;
    messageEl.textContent = message;
    
    messageEl.style.position = 'fixed';
    messageEl.style.top = '20px';
    messageEl.style.right = '20px';
    messageEl.style.background = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
    messageEl.style.color = 'white';
    messageEl.style.padding = '8px 12px';
    messageEl.style.borderRadius = '6px';
    messageEl.style.fontSize = '12px';
    messageEl.style.fontWeight = '500';
    messageEl.style.zIndex = '10000';
    messageEl.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    messageEl.style.animation = 'slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s forwards';

    document.body.appendChild(messageEl);

    setTimeout(function() {
      if (messageEl.parentNode) {
        messageEl.remove();
      }
    }, 3000);
  }

  setupKeyboardShortcuts() {
    var self = this;
    document.addEventListener('keydown', function(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      if (e.key >= '1' && e.key <= '8') {
        var tabIndex = parseInt(e.key) - 1;
        var tabs = document.querySelectorAll('.tab-button');
        
        if (tabs[tabIndex]) {
          tabs[tabIndex].click();
        }
      }

      if (e.key === 'Escape') {
        var modal = document.getElementById('settingsModal');
        if (modal && modal.classList.contains('active')) {
          modal.classList.remove('active');
        }
      }
    });
  }

  updatePayloadCounts() {
    var sections = document.querySelectorAll('.payload-section');
    
    for (var i = 0; i < sections.length; i++) {
      var section = sections[i];
      var payloadCards = section.querySelectorAll('.payload-card');
      var countElement = section.querySelector('.payload-count');
      
      if (countElement) {
        var count = payloadCards.length;
        countElement.textContent = count + ' payload' + (count !== 1 ? 's' : '');
      }
    }
  }

  getStats() {
    var sections = document.querySelectorAll('.payload-section');
    var totalPayloads = 0;
    var categoryStats = {};

    for (var i = 0; i < sections.length; i++) {
      var section = sections[i];
      var categoryId = section.id;
      var payloadCount = section.querySelectorAll('.payload-card').length;
      
      categoryStats[categoryId] = payloadCount;
      totalPayloads += payloadCount;
    }

    return {
      totalPayloads: totalPayloads,
      categories: Object.keys(categoryStats).length,
      categoryStats: categoryStats,
      customPayloads: this.customPayloads.length,
      historyItems: this.history.length
    };
  }
}

document.addEventListener('DOMContentLoaded', function() {
  console.log('🛡️ CyberInject Security Testing Toolkit Loaded');
  
  var cyberInject = new CyberInject();
  
  setTimeout(function() {
    var stats = cyberInject.getStats();
    console.log('📊 Extension Stats:', stats);
  }, 1000);

  const tabNav = document.querySelector('.tab-navigation');
  if (tabNav) {
      tabNav.addEventListener('wheel', (e) => {
          if (e.deltaY !== 0) {
              e.preventDefault();
              tabNav.scrollLeft += e.deltaY;
          }
      });
  }
  
  window.cyberInject = cyberInject;
});

if (typeof chrome !== 'undefined' && chrome.runtime) {
  chrome.runtime.onSuspend.addListener(function() {
    console.log('🔄 CyberInject extension suspending');
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CyberInject;
}