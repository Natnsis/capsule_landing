import Link from "next/link"

const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <div style={{ backgroundColor: "#678280" }}>
        logo
      </div>
      <nav>
        <Link href="/notion">Notion</Link>
        <Link href="/pick and drop">Notion</Link>
        <Link href="/hover image">Notion</Link>
      </nav>
      <div>
        <button>tehehe</button>
      </div>
    </header>
  )
}

export default Header
