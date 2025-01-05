import RootLayout from '@/app/layout';
import { getImageJSONData } from '@/lib/groups';
import Image_Box from '@/components/images';

export async function generateStaticParams() {
  // Return a list of possible value for id
  const allImageData = await getImageJSONData();
  return JSON.parse(allImageData).map( (elem: {folder: string}) => { return { "group": elem.folder}});
}

export default async function Page({ params } :
    { params : Promise<{group: string}>}
) {
    const { group } = await params

    const allImageData = await getImageJSONData();
    const ourGroup = JSON.parse(allImageData).filter( (elem: {folder: string, show_captions: boolean, groupdesc: string, files: Array<{filename: string, isSetMember: boolean, name: string}>}) => (elem["folder"] == group))[0];
  
    return (
      <main className="flex min-h-screen flex-col items-center p-24">
        <div className="w-3/4">
          <Image_Box showcaptions={ourGroup["show_captions"]} groupdesc={ourGroup["groupdesc"]}
           groupfolder={ourGroup["folder"]} groupdata={ourGroup["files"].sort(() => Math.random() - 0.5)
          }/>
        </div>
      </main>
    );
  }