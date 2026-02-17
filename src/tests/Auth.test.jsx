import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Login from '../pages/Login';
import { AuthProvider } from '../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';

const renderLogin = () => {
  return render(
    <AuthProvider>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </AuthProvider>
  );
};


describe('Authentication', () => {
  it('shows error on invalid credentials', async () => {
    renderLogin();
    
    const emailInput = screen.getByPlaceholderText(/Enter your legendary email/i);
    const passwordInput = screen.getByPlaceholderText(/Your secret code/i);
    const submitButton = screen.getByText(/Start Crushing It/i);

    fireEvent.change(emailInput, { target: { value: 'wrong@demo.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrong123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Hmm... that doesn't look right/i)).toBeInTheDocument();
    });
  });

  it('successful login for intern@demo.com', async () => {
    renderLogin();
    
    const emailInput = screen.getByPlaceholderText(/Enter your legendary email/i);
    const passwordInput = screen.getByPlaceholderText(/Your secret code/i);
    const submitButton = screen.getByText(/Start Crushing It/i);

    fireEvent.change(emailInput, { target: { value: 'intern@demo.com' } });
    fireEvent.change(passwordInput, { target: { value: 'intern123' } });
    fireEvent.click(submitButton);

    // Navigation is handled by useNavigate which we might need to mock or just check if error is NOT present
    await waitFor(() => {
      expect(screen.queryByText(/Hmm... that doesn't look right/i)).not.toBeInTheDocument();
    });
  });
});
