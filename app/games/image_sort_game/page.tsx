import { PageLinkBox } from '@/components/linkbox';
import { getImageJSONData } from '@/lib/groups';

export default async function Home() {
  // const [group, setGroup] = useState(0);
  const group_string = await(getImageJSONData());
  const groups = JSON.parse(group_string);

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="w-3/4">
        <h1 className="text-3xl text-center w-full">Image Sort Game</h1>
        <p>Inspired by my grandmother&apos;s claim that she can tell my cousins apart (I cannot),
        this game tests your ability to identify members of other, better-known sets.</p>
        <div className="grid grid-flow-row grid-cols-4">
          {groups.map( (elem: {folder: string, files: Array<{filename: string}>, groupdesc: string}, index: number) => 
            (<PageLinkBox key={index} name={elem["folder"]} description={elem["groupdesc"]} first_image_url={elem["files"][0]["filename"]}></PageLinkBox>))}
        </div>
      </div>
    </main>
  );
}
