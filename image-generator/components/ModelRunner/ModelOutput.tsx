/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react"

export interface IModelOutputImage {
  imageUrl: string
}

export interface IModelOutput {
  images: IModelOutputImage[]
}

export interface ModelOutputProps {
  output?: IModelOutput
}

export default function ModelOutput(props: ModelOutputProps) {
  const {output} = props;
  const [imageUrl, setImageUrl] = useState(undefined);

  useEffect(() => {
    if (output && (output as any).blocks) {
      setImageUrl((output as any).blocks[0].contentURL)
    } else {
      setImageUrl(undefined);
    }
  }, [output]);

  let content = <div></div>
  
  if (output) {
    return (
      <div className="w-full grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {imageUrl && (
          [imageUrl].map((url) => (
            <div key={url} className="group relative">
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  src={url}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
            </div>
          ))          
        )}
      </div>
    )
  }
  return null;
}

