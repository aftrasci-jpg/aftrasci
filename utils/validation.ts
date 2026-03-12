/**
 * Security validation utilities for input sanitization and validation
 */

// XSS Protection - Remove potentially dangerous scripts
export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  return input
    // Remove script tags
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove event handlers
    .replace(/\s+on\w+="[^"]*"/gi, '')
    .replace(/\s+on\w+='[^']*'/gi, '')
    // Remove javascript: URLs
    .replace(/javascript:/gi, '')
    // Remove data: URLs that aren't images
    .replace(/data:(?!image\/)[^;]+;/gi, '')
    // Remove eval() calls
    .replace(/eval\s*\(/gi, '')
    // Remove dangerous HTML entities
    .replace(/&\s*(#|%23|x)(?:60|lt);/gi, '<')
    .replace(/&\s*(#|%23|x)(?:62|gt);/gi, '>')
    // Trim whitespace
    .trim();
};

// Validate product name
export const validateProductName = (name: string): { isValid: boolean; error?: string } => {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: 'Le nom du produit est requis' };
  }
  
  if (name.length > 200) {
    return { isValid: false, error: 'Le nom du produit ne doit pas dépasser 200 caractères' };
  }
  
  // Check for suspicious patterns
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /eval\s*\(/i,
    /<iframe/i,
    /<object/i,
    /<embed/i
  ];
  
  for (const pattern of dangerousPatterns) {
    if (pattern.test(name)) {
      return { isValid: false, error: 'Nom de produit invalide - caractères non autorisés détectés' };
    }
  }
  
  return { isValid: true };
};

// Validate product description
export const validateProductDescription = (description: string, maxLength: number = 2000): { isValid: boolean; error?: string } => {
  if (!description || description.trim().length === 0) {
    return { isValid: false, error: 'La description est requise' };
  }
  
  if (description.length > maxLength) {
    return { isValid: false, error: `La description ne doit pas dépasser ${maxLength} caractères` };
  }
  
  // Allow basic HTML tags for formatting but block dangerous ones
  const allowedTags = /<(?:p|br|strong|em|ul|li|ol|h[1-6])\b[^>]*>|<\/(?:p|br|strong|em|ul|li|ol|h[1-6])>/gi;
  const dangerousTags = /<(?:script|iframe|object|embed|form|input|textarea|button|select)\b[^>]*>|<\/(?:script|iframe|object|embed|form|input|textarea|button|select)>/gi;
  
  if (dangerousTags.test(description)) {
    return { isValid: false, error: 'Description invalide - balises HTML non autorisées détectées' };
  }
  
  return { isValid: true };
};

// Validate image file
export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!file) {
    return { isValid: false, error: 'Aucun fichier sélectionné' };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Format d\'image non pris en charge. Formats autorisés: JPEG, PNG, WebP' };
  }
  
  if (file.size > maxSize) {
    return { isValid: false, error: 'Taille de l\'image trop grande. Maximum: 5MB' };
  }
  
  return { isValid: true };
};

// Validate email
export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  if (!email) {
    return { isValid: false, error: 'Email requis' };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Format d\'email invalide' };
  }
  
  return { isValid: true };
};

// Validate category selection
export const validateCategory = (category: string, subcategory: string): { isValid: boolean; error?: string } => {
  if (!category || category.trim().length === 0) {
    return { isValid: false, error: 'Catégorie requise' };
  }
  
  // Basic validation for category names
  if (category.length > 100) {
    return { isValid: false, error: 'Catégorie trop longue' };
  }
  
  return { isValid: true };
};

// Rate limiting helper
export const createRateLimiter = (maxAttempts: number, windowMs: number) => {
  const attempts = new Map<string, { count: number; resetTime: number }>();
  
  return (identifier: string): boolean => {
    const now = Date.now();
    const userAttempts = attempts.get(identifier);
    
    if (!userAttempts) {
      attempts.set(identifier, { count: 1, resetTime: now + windowMs });
      return true;
    }
    
    if (now > userAttempts.resetTime) {
      attempts.set(identifier, { count: 1, resetTime: now + windowMs });
      return true;
    }
    
    if (userAttempts.count >= maxAttempts) {
      return false;
    }
    
    userAttempts.count++;
    return true;
  };
};

// Content Security Policy headers (for server-side implementation)
export const getCSPHeaders = () => {
  return {
    'Content-Security-Policy': `
      default-src 'self';
      script-src 'self' 'unsafe-inline' https://www.gstatic.com https://apis.google.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      font-src 'self' https://fonts.gstatic.com;
      img-src 'self' data: https: blob:;
      connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://*.cloudinary.com;
      frame-src 'none';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
    `.replace(/\s+/g, ' ').trim()
  };
};

// Input sanitization for search queries
export const sanitizeSearchQuery = (query: string): string => {
  if (!query) return '';
  
  return query
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/['"]/g, '') // Remove quotes
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .trim()
    .substring(0, 100); // Limit length
};