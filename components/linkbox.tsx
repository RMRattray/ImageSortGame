import Link from 'next/link';

export function PageLinkBox( {name, description, first_image_url} : {name: string, description: string, first_image_url: string} ) {
    return (<Link href={"image_sort_game/" + name}>
      <div className={"bg-[url('public/" + name + "/" + first_image_url + "')] h-24 p-4"}>
        <h2 className="text-xl text-center w-full">{name}</h2>
        <p>{description}</p>
      </div>
    </Link>)
  }