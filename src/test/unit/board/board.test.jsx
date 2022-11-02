import React from 'react';
import { render, screen } from '@testing-library/react'
import Board from "../../../components/board"
import { GameProvider } from '../../../Context/GameProvider'

describe('Test Board', () => {
    test('Should Render', () => {
        render(
            <GameProvider>
                <Board/>
            </GameProvider>
        )
        const renderResp = screen.getByText(/Next player/)
        expect(renderResp).toBeDefined()
    })
});
