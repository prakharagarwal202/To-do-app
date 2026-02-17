import { describe, it, expect } from 'vitest';

// Simulating the login logic from AuthContext
const loginLogic = (email, password) => {
  if (email === 'intern@demo.com' && password === 'intern123') {
    return { success: true };
  }
  return { success: false, message: 'Hmm... that doesn\'t look right 😅' };
};

describe('Auth Logic', () => {
  it('validates intern credentials correctly', () => {
    const result = loginLogic('intern@demo.com', 'intern123');
    expect(result.success).toBe(true);
  });

  it('rejects invalid email', () => {
    const result = loginLogic('wrong@demo.com', 'intern123');
    expect(result.success).toBe(false);
  });

  it('rejects invalid password', () => {
    const result = loginLogic('intern@demo.com', 'wrong123');
    expect(result.success).toBe(false);
  });
});
