import { MiContextoProvider } from './components/context'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DoTasks',
  description: 'Sitio Web destinado a la creación de usuarios, y tareas.',
}

export default function RootLayout({ children }) {
  return (
    <MiContextoProvider>
    <html lang="en">
      <body>{children}</body>
    </html>
      </MiContextoProvider>
  )
}
