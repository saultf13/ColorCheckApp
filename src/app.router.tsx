import { createBrowserRouter } from 'react-router'
import { ColorCheckApp } from './ColorCheckApp'

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <ColorCheckApp />,
        index: true
    }
])
