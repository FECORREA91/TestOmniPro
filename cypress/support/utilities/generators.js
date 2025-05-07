// cypress/support/utilities/generators.js

function generateRandomEmail(domain = "test.com", usernameLength = 5) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let username = '';
    
    for (let i = 0; i < usernameLength; i++) {
      username += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return `${username}@${domain}`;
  }
  
  function generateRandomPassword(length = 8) {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let chars = lowercase + uppercase + numbers + symbols;
    let password = '';
    
    // Aseguramos al menos un caracter de cada tipo
    password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
    password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    password += symbols.charAt(Math.floor(Math.random() * symbols.length));
    
    // Completamos el resto
    for (let i = 4; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Mezclamos los caracteres
    return password.split('').sort(() => 0.5 - Math.random()).join('');
  }
  
  module.exports = {
    generateRandomEmail,
    generateRandomPassword
  };