'use strict';

/**
 * UTILITY FUNCTIONS
 * Security, validation, and helper functions
 */

/**
 * Sanitize HTML to prevent XSS attacks
 * @param {string} str - String to sanitize
 * @returns {string} - Sanitized string safe for textContent
 */
function sanitizeText(str) {
  if (typeof str !== 'string') return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.textContent || div.innerText || '';
}

/**
 * Escape HTML special characters
 * @param {string} str - String to escape
 * @returns {string} - Escaped string
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return str.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

/**
 * Validate phone number (basic validation)
 * @param {string} phone - Phone to validate
 * @returns {boolean} - True if valid
 */
function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');
  // Check if has at least 10 digits
  return digits.length >= 10 && digits.length <= 15;
}

/**
 * Safe localStorage get with error handling
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if not found or error
 * @returns {*} - Stored value or default
 */
function safeGetStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return defaultValue;
  }
}

/**
 * Safe localStorage set with error handling
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 * @returns {boolean} - True if successful
 */
function safeSetStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.error('Storage quota exceeded');
      alert('Storage limit exceeded. Please clear some data or contact support.');
    } else {
      console.error(`Error writing to localStorage (${key}):`, error);
      alert('Failed to save data. Please try again.');
    }
    return false;
  }
}

/**
 * Create DOM element safely
 * @param {string} tag - HTML tag name
 * @param {Object} attributes - Element attributes
 * @param {string|Node} content - Element content
 * @returns {HTMLElement} - Created element
 */
function createElement(tag, attributes = {}, content = '') {
  const element = document.createElement(tag);
  
  // Set attributes
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else if (key === 'textContent') {
      element.textContent = sanitizeText(value);
    } else if (key.startsWith('data-')) {
      element.setAttribute(key, escapeHtml(String(value)));
    } else {
      element.setAttribute(key, escapeHtml(String(value)));
    }
  });
  
  // Set content
  if (content) {
    if (typeof content === 'string') {
      element.textContent = sanitizeText(content);
    } else if (content instanceof Node) {
      element.appendChild(content);
    }
  }
  
  return element;
}

/**
 * Format date for display
 * @param {string|Date} date - Date to format
 * @returns {string} - Formatted date string
 */
function formatDate(date) {
  if (!date) return 'N/A';
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return 'N/A';
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'N/A';
  }
}

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency symbol
 * @returns {string} - Formatted currency string
 */
function formatCurrency(amount, currency = '$') {
  if (typeof amount !== 'number' || isNaN(amount)) return `${currency}0.00`;
  return `${currency}${amount.toFixed(2)}`;
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Check if date is in the past
 * @param {string|Date} date - Date to check
 * @returns {boolean} - True if date is in the past
 */
function isPastDate(date) {
  if (!date) return false;
  try {
    const d = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);
    return d < today;
  } catch (error) {
    return false;
  }
}

/**
 * Check if date is today or in the future
 * @param {string|Date} date - Date to check
 * @returns {boolean} - True if date is valid
 */
function isValidFutureDate(date) {
  if (!date) return false;
  try {
    const d = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    d.setHours(0, 0, 0, 0);
    return d >= today;
  } catch (error) {
    return false;
  }
}

/**
 * Export data as JSON file
 * @param {Object} data - Data to export
 * @param {string} filename - Filename for download
 */
function exportAsJSON(data, filename = 'export.json') {
  try {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Export error:', error);
    alert('Failed to export data. Please try again.');
  }
}

/**
 * Import data from JSON file
 * @param {File} file - File to import
 * @returns {Promise<Object>} - Parsed JSON data
 */
function importFromJSON(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        resolve(data);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

// Export functions for use in other files
if (typeof window !== 'undefined') {
  window.utils = {
    sanitizeText,
    escapeHtml,
    validateEmail,
    validatePhone,
    safeGetStorage,
    safeSetStorage,
    createElement,
    formatDate,
    formatCurrency,
    debounce,
    isPastDate,
    isValidFutureDate,
    exportAsJSON,
    importFromJSON
  };
}

