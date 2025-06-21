import '@testing-library/jest-dom'

// Полифилл для TextEncoder/TextDecoder в Jest
import { TextEncoder, TextDecoder } from 'util'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// TODO:
// "NODE_ENV" is not recognized as an internal or external command, operable command or batch file
// npm install -g win-node-env