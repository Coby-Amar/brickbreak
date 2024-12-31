import './style.css'

import { Loader } from './loader';
import { GameBoard } from './gameBoard';
import { EventListeners } from './events';

EventListeners.addEvents()

const loader = new Loader()
await loader.start()
await GameBoard.render()
loader.stop()
