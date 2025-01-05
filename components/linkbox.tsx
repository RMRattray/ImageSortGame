import Link from 'next/link';

export function PageLinkBox( {name, description, first_image_url} : {name: string, description: string, first_image_url: string} ) {
    return (<Link href={"/games/image_sort_game/" + name}>
      <div className={"bg-[url('sort_game_images/" + name + "/" + first_image_url + "')] bg-green-800 p-2 m-2 rounded-lg"}>
        <h2 className="text-xl text-center w-full">{name}</h2>
        <p>{description}</p>
      </div>
    </Link>)
  }