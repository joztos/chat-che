import { useEffect, useState } from "react"

export interface ModelInputProps {
  onUpdate: (props: any) => void
}

export default function ModelInput(props: ModelInputProps) {
  const [title, setTitle] = useState<string | undefined>(undefined)
  const [description, setDescription] = useState<string | undefined>(undefined)

  useEffect(() => {
    props.onUpdate({title, description})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description])

  return (
    <div>
      <div className="mt-5 md:col-span-2 md:mt-0">
        <div className="grid grid-cols-3 gap-6">

          <div className="col-span-3 sm:col-span-2">
            <label htmlFor="story-title" className="block text-sm font-medium leading-6 text-gray-900">
              Story Title
            </label>
            <div className="mt-2 flex rounded-md shadow-sm">
              <input
                type="text"
                name="story-title"
                id="story-title"
                onChange={(e) => { setTitle(e.target.value) } }
                className="block w-full flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-3 sm:col-span-2">
            <label htmlFor="story-description" className="block text-sm font-medium leading-6 text-gray-900">
              Story Description
            </label>
            <div className="mt-2 flex rounded-md shadow-sm">
              <textarea
                rows={4}
                name="story-description"
                id="story-description"
                onChange={(e) => { setDescription(e.target.value) } }
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                defaultValue={''}
              />
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}