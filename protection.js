/**
 * Copyright (c) 2024 Balaji S. All rights reserved.
 * This protection script is part of a private portfolio and may not be copied, modified, or distributed.
 * Unauthorized use is strictly prohibited.
 */

// Protection measures for the portfolio
(function() {
  'use strict';
  
  // Disable right-click context menu
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showProtectionMessage();
  });
  
  // Disable keyboard shortcuts for developer tools
  document.addEventListener('keydown', function(e) {
    // Disable F12
    if (e.key === 'F12') {
      e.preventDefault();
      showProtectionMessage();
    }
    
    // Disable Ctrl+Shift+I (Developer Tools)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
      e.preventDefault();
      showProtectionMessage();
    }
    
    // Disable Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.key === 'J') {
      e.preventDefault();
      showProtectionMessage();
    }
    
    // Disable Ctrl+U (View Source)
    if (e.ctrlKey && e.key === 'u') {
      e.preventDefault();
      showProtectionMessage();
    }
  });
  
  // Disable text selection
  document.addEventListener('selectstart', function(e) {
    e.preventDefault();
  });
  
  // Disable drag and drop
  document.addEventListener('dragstart', function(e) {
    e.preventDefault();
  });
  
  // Show protection message
  function showProtectionMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 20px;
      border-radius: 10px;
      z-index: 10000;
      font-family: Arial, sans-serif;
      text-align: center;
      max-width: 300px;
    `;
    message.innerHTML = `
      <h3>⚠️ Protected Content</h3>
      <p>This portfolio is protected by copyright law.</p>
      <p>© 2024 Balaji S. All rights reserved.</p>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
      if (message.parentNode) {
        message.parentNode.removeChild(message);
      }
    }, 3000);
  }
  
  // Add watermark to all images
  function addImageWatermarks() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.style.position = 'relative';
      img.addEventListener('load', function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        
        // Draw original image
        ctx.drawImage(img, 0, 0);
        
        // Add watermark
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.font = '20px Arial';
        ctx.fillText('© Balaji S 2024', 10, canvas.height - 10);
        
        // Replace image with watermarked version
        img.src = canvas.toDataURL();
      });
    });
  }
  
  // Initialize protection
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addImageWatermarks);
  } else {
    addImageWatermarks();
  }
  
  // Console warning
  console.log('%c⚠️ STOP!', 'color: red; font-size: 30px; font-weight: bold;');
  console.log('%cThis portfolio is protected by copyright law.', 'color: red; font-size: 16px;');
  console.log('%c© 2024 Balaji S. All rights reserved.', 'color: red; font-size: 16px;');
  console.log('%cUnauthorized copying or modification is prohibited.', 'color: red; font-size: 16px;');
  
})(); 