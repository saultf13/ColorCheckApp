import { createHashRouter } from 'react-router-dom'
import { ColorCheckApp } from './ColorCheckApp'

export const appRouter = createHashRouter([
    {
        path: '/',
        element: <ColorCheckApp />,
        index: true
    }
])
