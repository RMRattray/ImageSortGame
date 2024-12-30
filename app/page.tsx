import Image from "next/image";
import Image_Box from "@/app/images";
// import { useState } from 'react';
import { promises as fs } from 'fs';

// next tasks:  implement dynamic URLs (see tutorial at https://nextjs.org/learn-pages-router/basics/dynamic-routes)
// re-factor the props sent to imageBox
// move async function somewhere better

async function get_groups() {
  const file = await fs.readFile(process.cwd() + '/public/images.json', 'utf8');
  return file;
}

export default async function Home() {
  // const [group, setGroup] = useState(0);
  const group = 0;
  const groups = JSON.parse(await get_groups());

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="w-3/4">
        <Image_Box showcaptions={groups[group]["show_captions"]} groupdesc={groups[group]["groupdesc"]}
         groupfolder={groups[group]["folder"]} groupdata={groups[group]["files"].sort(() => Math.random() - 0.5)
        }/>
      </div>
    </main>
  );
}
