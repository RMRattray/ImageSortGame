'use client';
import { useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

function IdentImage( { source, name, isSetMember, showCaptions, guessed, guess, i }:
    { source: string, name: string, isSetMember: boolean, showCaptions: boolean, guessed: boolean[], guess: Function, i: number }
 ) {

    return(
    <div className="w-full display: inline-block p-2">
        <Image alt="Mystery image" src={source} width = "861" height = "757" onClick = { () => guess(i, isSetMember) }/><br/>
        <div className={clsx('h-8 text-white', {'bg-green-500': isSetMember && guessed[i], 'bg-red-500': !isSetMember && guessed[i], 'bg-gray-500': !guessed[i] })}>
          <h2 className="text-white text-center">
              {guessed[i] || showCaptions ? name : ""}
          </h2>
        </div>
    </div>
    );
  }

export default function Image_Box( { groupdesc, groupdata, groupfolder, showcaptions }:
    { groupdesc: string, groupdata: {filename: string, name: string, isSetMember: boolean}[], groupfolder: string, showcaptions: boolean }
 ) {

    const [guessed, setGuessed] = useState([false, false, false, false, false, false, false, false, false, false, false, false])
    const [score, setScore] = useState(0);

    function guess(index: number, correct: boolean) {
      if (!guessed[index]) {
        setGuessed(guessed.map( (val, ind) => ind == index ? true : val));
        setScore(score + (correct ? 1 : -1));
      }
    }
  
    return (
      <div>
        <h1 className="text-3xl text-center w-full">{groupdesc}</h1>
        <div className="grid grid-flow-row grid-cols-4">
          { groupdata.map( (imgstat, index) => { return(
            <IdentImage key={index} source={"/" + groupfolder + "/" + imgstat["filename"]} name={imgstat["name"]}
              isSetMember={imgstat["isSetMember"]} showCaptions={showcaptions} guessed={guessed} guess={guess} i={index}
            />
          ) })}
        </div>
        <h2 className="text-xl text-center w-full">Your score: {score}</h2>
      </div>
    );
  }