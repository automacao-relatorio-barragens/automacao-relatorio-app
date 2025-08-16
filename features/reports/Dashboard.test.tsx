import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Dashboard from './Dashboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

const seedData = [
  { id: '1', title: 'Draft report', status: 'draft' },
  { id: '2', title: 'Completed report', status: 'completed' },
];

describe('Dashboard', () => {
  beforeEach(async () => {
    await AsyncStorage.setItem('reports', JSON.stringify(seedData));
  });

  it('lists draft and completed reports', async () => {
    const { findByText } = render(<Dashboard />);
    expect(await findByText('Draft report')).toBeTruthy();
    expect(await findByText('Completed report')).toBeTruthy();
  });

  it('creates a report offline', async () => {
    const { getByTestId, findByText } = render(<Dashboard />);
    fireEvent.press(getByTestId('create-report'));
    await findByText('Report 3');
    const stored = await AsyncStorage.getItem('reports');
    const reports = JSON.parse(stored || '[]');
    expect(reports).toHaveLength(3);
  });
});
