import Image from "next/image"
import styles from "./Header.module.css"
import UserMenu from "./UserMenu"

export default function Header() {
    return (
        <header className={styles.header}>
            <Image className={styles.logo} src="/images/logo-white.png" alt="Spybee Logo" width={384} height={179} />
           <UserMenu fallbackRole="Administrador" />
        </header>
    )
}