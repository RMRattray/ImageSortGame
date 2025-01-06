import { PageLinkBox } from '@/components/linkbox';
import { getImageJSONData } from '@/lib/groups';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Classification Game",
  description: "A game in which the user clicks images and scores if they are members of a set",
};

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
        <h2>Image attributions:</h2>
        Presidents:<br/>Public-domain images, including several from the Brady-Handy collection at the Library of Congress.  All in Wikimedia Commons.<br/>
Portrait of Rufus King by Gilbert Stuart, photo by Google Art Project<br/>
Portrait of James Monroe by Samuel Morse (yes, that one)<br/>


Bugs:<br/>
Leaf bug, Richard Bartz<br/>
Flower bug, Jack Dykinga, USDA<br/>
Ant, Muhammad Mahdi Karim<br/>
Grasshopper, Adrian Pingstone, PD<br/>
Ladybug, Jacopo Werther<br/>
Maybug, Frank Vassen<br/>
Leaf-footed bug, Rushen (Flickr)<br/>
Assassin bug, Maryland Biodiversity Project<br/>
Stink bug, Ton Rulkens<br/>
Seed bug, JunkyardSparkle (Wikimedia Commons)<br/>
Rhinoceros beetle, Hectonichus (Wikimedia Commons)<br/>
Titan beetle, Jean Nicolas<br/>


Parks:<br/>
Cassidy Arch, Bigtimepeace (WC)<br/>
Ledges Overlook, Yi-Liang (Lucas) Liu (Flickr)<br/>
Wind Cave, DaveyNin (Flickr)<br/>
Mt Moran, James St John (Flickr)<br/>
Mount Lassen, Lamblukas (Flickr)<br/>
Lake Clark, Sanjay Ghosh<br/>
Fort Miles, Lee Cannon<br/>
North Lookout, Elizabeth Nicodemus<br/>
Apple Pie Hill, Famartin (WC)<br/>
Mushroom Rock, Lane Pearman<br/>
Rabbit Lake, Frank Kovalchek<br/>


Nobel Prizes<br/>
Rosalind Franklin, MagentaGreen (WC)<br/>
Turing, Gore, Einstein, Angelou, Obama, Hawking - PD, WC <br/>
Al Gore - PD, WC <br/>
Martin Luther King, Jr. - Nobel Foundation via WC<br/>
Jean-Paul Sartre - Government Press Office, Flickr <br/>
William Golding - Dutch National Archive<br/>
Neil DeGrasse Tyson - ARPAE Energy, WC & Flickr<br/>
Henry Heimlich - Actually a senator named Henry Waxman, official portrait PD via WC <br/>


Airports<br/>
London - David Baron, SnowmanRadio via WC & Flickr<br/>
Milan - Pexels via WC, CC 1.0<br/>
Istanbul - Hunanuk via WC, CC 1.0<br/>
Phoenix - Bravo1, PD via WC <br/>
Guangzhou - Kevin Ho via Flickr <br/>
Barcelona - dronepicr via WC <br/>
Madrid - Zarateman via WC, CC 0<br/>
Amsterdam - Vincent Seenberg via WC, CC 2.5<br/>
Delhi - Bruno Corpet via WC <br/>
Mumbai - Cididity Hat via WC <br/>
Dubai - Ivan Ciarbolin via WC, CC 0<br/>
Dallas - Emmanuelope via WC, CC 0<br/>


Vancouver:<br/>
Pictures of Vancouver by Hugh Llewelyn, Karin Xan, MaeMae, 5chw4r7z, and Scott Beale via Flickr <br/>
Minneapolis - Chris Yunker via Flickr<br/>
Baltimore - mk30 via Flickr<br/>
Nashville - Luca Sartoni<br/>
Tucson - Daniel Lobo<br/>
Honolulu - Ashlynn Pai<br/>
Adelaide - Duncan Cumming<br/>
All images not otherwise stated are <a href="https://creativecommons.org/licenses/by-sa/2.0/">Creative Commons 2.0</a> or less restrictive; as such, this game is open to sharing and remixing as well under the same terms. 
      </div>
    </main>
  );
}
