import Link from "next/link"

export default function Page() {
    return (<main>
        <h1>Games gallery</h1>
        <Link href="nim">Nim</Link>
        <Link href="image_sort_game">Image sort game</Link>
    </main>)
}