import Link from 'next/link';
import { promises as fs } from 'fs';

// next tasks:  implement dynamic URLs (see tutorial at https://nextjs.org/learn-pages-router/basics/dynamic-routes)
// re-factor the props sent to imageBox
// move async function somewhere better

async function get_groups() {
  const file = await fs.readFile(process.cwd() + '/public/images.json', 'utf8');
  return file;
}

function PageLinkBox( {name, description, first_image_url} : {name: string, description: string, first_image_url: string} ) {
  return (<Link href={"image_sort_game/" + name}>
    <div className={"bg-[url('public/" + name + "/" + first_image_url + "')] h-24 p-4"}>
      <h2 className="text-xl text-center w-full">{name}</h2>
      <p>{description}</p>
    </div>
  </Link>)
}

export default async function Home() {
  // const [group, setGroup] = useState(0);
  const group_string = await(get_groups());
  const groups = JSON.parse(group_string);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="w-3/4">
        <h1 className="text-3xl text-center w-full">Image Sort Game</h1>
        <p>Inspired by my grandmother's claim that she can tell my cousins apart (I cannot),
        this game tests your ability to identify members of other, better-known sets.</p>
        <div className="grid grid-flow-row grid-cols-4">
          {groups.map( (elem: {folder: string, files: Array<{filename: string}>, groupdesc: string}, index: number) => 
            (<PageLinkBox key={index} name={elem["folder"]} description={elem["groupdesc"]} first_image_url={elem["files"][0]["filename"]}></PageLinkBox>))}
        </div>
      </div>
    </main>
  );
}
