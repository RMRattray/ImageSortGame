import Link from "next/link"

export default function Page() {
    return (<main>
        <h1>Games gallery</h1>
        <Link href="games/nim">Nim</Link>
        <Link href="games/image_sort_game">Image sort game</Link>
    </main>)
}