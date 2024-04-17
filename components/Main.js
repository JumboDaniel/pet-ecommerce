
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function Main({children}) {
    return (
        <section className={inter.className}>
            {children}
        </section>
    )
}