import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithClient } from '../../test/utils';
import { AddTaskForm } from './AddTaskForm';
import { boardApi } from './api';

// Mock the network layer so the form test never hits fetch.
vi.mock('./api', () => ({
  boardApi: {
    create: vi.fn().mockResolvedValue({ id: 't-x', title: 'ok', status: 'todo', priority: 'medium' }),
  },
}));

describe('AddTaskForm', () => {
  beforeEach(() => vi.clearAllMocks());

  it('shows a validation error for a short title and does not call the API', async () => {
    const user = userEvent.setup();
    renderWithClient(<AddTaskForm />);

    await user.type(screen.getByLabelText('Title'), 'ab');
    await user.click(screen.getByRole('button', { name: 'Add' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Title must be at least 3 characters',
    );
    expect(boardApi.create).not.toHaveBeenCalled();
  });

  it('submits a valid task to the API', async () => {
    const user = userEvent.setup();
    renderWithClient(<AddTaskForm />);

    await user.type(screen.getByLabelText('Title'), 'Wire up the login form');
    await user.click(screen.getByRole('button', { name: 'Add' }));

    await waitFor(() =>
      expect(boardApi.create).toHaveBeenCalledWith({
        title: 'Wire up the login form',
        priority: 'medium',
      }),
    );
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
