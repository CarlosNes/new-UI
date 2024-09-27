
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SneakerManager from './SneakerManager';
import axios from 'axios';

jest.mock('axios');

describe('SneakerManager CRUD Operations', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Create a new sneaker', async () => {
        axios.get.mockResolvedValueOnce({ data: { data: { sneakers: [] } } });
        axios.post.mockResolvedValueOnce({ data: { data: { id: 1, nombre: 'Nike Air Max', serie: 'AM2023', precio: 129.99 } } });

        render(<SneakerManager />);
        fireEvent.change(screen.getByPlaceholderText(/Nombre/i), { target: { value: 'Nike Air Max' } });
        fireEvent.change(screen.getByPlaceholderText(/Serie/i), { target: { value: 'AM2023' } });
        fireEvent.change(screen.getByPlaceholderText(/Precio/i), { target: { value: '129.99' } });
        fireEvent.click(screen.getByText(/Agregar/i));

        await waitFor(() => {
            expect(screen.getByText(/Nike Air Max/i)).toBeInTheDocument(); 
        });
    });
});
