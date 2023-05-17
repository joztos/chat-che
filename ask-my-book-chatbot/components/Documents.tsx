import { ListGroup, Alert} from "flowbite-react";
import { useState } from "react";
import {HiOutlineExclamationCircle} from "react-icons/hi"

export default function Documents({ baseUrl }: { baseUrl: string }) {
  const [documents, setDocuments] = useState<String[]|null>(null);
  const [error, setError] = useState<String | undefined>(undefined);

  const fetchDocuments = async () => {
    const response = await fetch(baseUrl + "/documents", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("document response", response)
    if (!response.ok) {
      const {status} = await response.json()
      setError(status.statusMessage)
      return;
    }

    const documents = await response.json();
    console.log("documents", documents)
    setDocuments(documents)

  };

  if (!documents) {
    fetchDocuments()
  }


  return (
    <div>
    {(documents && documents.length !== 0) && (<div >
    <div className="flex flex-row content-center pb-4">
      <HiOutlineExclamationCircle  className="mt-0.5 mr-2 h-5 w-5"/>
      <div>Las respuestas son generadas por OpenAi GPT usando fuentes verificadas de libros: </div>
      </div>
    <ListGroup>

    {documents && documents.map((document) => (
       <ListGroup.Item key={document as string}>
📓 {document}
</ListGroup.Item>

  ))}
<ListGroup.Item key="more_books">
👋 Unete a nuestra comunidad &nbsp;<a href="https://steamship.com/discord" className="font-semibold text-gray-900 underline dark:text-white decoration-sky-500">Edcosystem</a>&nbsp;si te gustaria agregar mas libros
</ListGroup.Item>

  </ListGroup></div>
    )
}

{(documents && documents.length === 0) && (

<Alert
color="failure"
>
<span>
  <span className="font-medium">
    Index incomplete!
  </span>
  {' '}This index is not connected to a book. Please try to upload your book again <a href="https://www.steamship.com/build/ask-my-book-site" className="font-semibold text-gray-900 underline dark:text-white decoration-sky-500">here</a>.
  <br/>
  <br/>

  If this issue persists, please ping us on <a href="https://steamship.com/discord" className="font-semibold text-gray-900 underline dark:text-white decoration-sky-500">Discord</a>. We&apos;re happy to he. 
</span>
</Alert>

    
)}

{ error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p>{error}</p>
              </div>
            </div>
          </div>
      )}
  </div>
  );
}
