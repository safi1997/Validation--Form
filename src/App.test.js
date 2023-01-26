import React from 'react';
import { render,screen, waitFor } from '@testing-library/react';
import ParticipantTable from './components/ParticipantTable';

const participants = [{first_name: "John", last_name: "Doe", email: "exampleemail@hicoders.ch",id:1}];

describe('ParticipantTable component', () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(participants)
      })
    );
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  it('should fetch and display the user data', async () => {
    render(<ParticipantTable participants={participants} />);

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
    });
  });
});
