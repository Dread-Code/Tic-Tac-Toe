import React from 'react';
import {render, screen} from '@testing-library/react'
import Square from "../../../components/square";
import Board from "../../../components/board"
import { GameProvider } from '../../../Context/GameProvider'

test('Square should render', () => { 
    render(
        <GameProvider>
            <Board/>
        </GameProvider>
    )
    // expect(asFragment()).toBeTruthy()
})