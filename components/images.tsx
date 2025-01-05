'use client';
import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Link from 'next/link';

function IdentImage( { source, name, isSetMember, showCaptions, guessed, guess, i }:
    { source: string, name: string, isSetMember: boolean, showCaptions: boolean, guessed: boolean[], guess: Function, i: number }
 ) {

    return(
    <div className="w-full display: inline-block p-2">
        <Image alt="Mystery image" width="0" height="0" src={source} className='h-32 w-full object-cover' onClick = { () => guess(i, isSetMember) }/><br/>
        <div className={clsx('place-items-center h-20 text-white flex justify-center items-center', {'bg-green-500': isSetMember && guessed[i], 'bg-red-500': !isSetMember && guessed[i], 'bg-gray-500': !guessed[i] })}>
          <h2 className="text-white text-center" dangerouslySetInnerHTML={ {__html : (guessed[i] || showCaptions ? name : "") } }>
              {}
          </h2>
        </div>
    </div>
    );
  }

function ReturnButton( { guesses } : { guesses: number} ) {
  return(
    <div className='absolute right-2'>
      <Link href="../">
        <button className={clsx('bg-green-500 m-2 p-2', {"hidden" : guesses > 0, "visible" : guesses <= 0 })}>Return home</button>
      </Link>
    </div>
  )
}

export default function Image_Box( { groupdesc, groupdata, groupfolder, showcaptions }:
    { groupdesc: string, groupdata: {filename: string, name: string, isSetMember: boolean}[], groupfolder: string, showcaptions: boolean }
 ) {

    const [guessed, setGuessed] = useState([false, false, false, false, false, false, false, false, false, false, false, false])
    const [score, setScore] = useState(0);
    const [guesses, setGuesses] = useState(6);

    function guess(index: number, correct: boolean) {
      if (!guessed[index] && guesses > 0) {
        setGuessed(guessed.map( (val, ind) => ind == index ? true : val));
        setScore(score + (correct ? 1 : -1));
        setGuesses(guesses - 1);
      }
    }

    return (
      <div className="relative">
        <div className='sticky top-0 bg-black/50 min-h-20 flex items-center'>
          <h1 className={clsx("text-center w-full", { "text-3xl": guesses <= 0, "text-xl" : guesses > 0 } )}>{guesses > 0 ? groupdesc : "Game over"}</h1>
          <ReturnButton guesses={guesses}></ReturnButton>
        </div>
        <div className="grid grid-flow-row grid-cols-4">
          { groupdata.map( (imgstat, index) => { return(
            <IdentImage key={index} source={"/sort_game_images/" + groupfolder + "/" + imgstat["filename"]} name={imgstat["name"]}
              isSetMember={imgstat["isSetMember"]} showCaptions={showcaptions} guessed={guessed} guess={guess} i={index}
            />
          ) })}
        </div>
        <div className='sticky bottom-0 bg-black/50 min-h-16 flex flex-row items-center'>
          <h2 className="text-xl text-center w-50 grow">Guesses remaining:  {guesses}</h2>
          <h2 className="text-xl text-center w-50 grow">Your score:  {score}</h2>
        </div>
      </div>
    );
  }