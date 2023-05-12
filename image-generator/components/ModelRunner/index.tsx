import { useState } from "react";
import LoadingDots from "../LoadingDots";
import ModelInput from "./ModelInput"
import ModelOutput, { IModelOutput } from "./ModelOutput"

const FAKE_OUTPUT = {
  images: [
    {
      imageUrl: 'https://picsum.photos/200'
    },
    {
      imageUrl: 'https://picsum.photos/200'
    },
    {
      imageUrl: 'https://picsum.photos/200'
    }
  ]
}


export default function ModelRunner() {
  let [output, setOutput] = useState<IModelOutput | undefined>(undefined);
  let [error, setError] = useState<any>(undefined);
  let [running, setRunning] = useState(false);
  let [payload, setPayload] = useState({});

  const onPropUpdate = (payload: any) => {
    setPayload(payload)
  }

  const pollMessage = async (taskId: string, workspace: string) => {
    console.log("Polling", taskId, workspace)
    const response = await fetch('/api/check_job', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({taskId, workspace})
    })

    if (!response.ok) {
      setRunning(false);
      setError(response.statusText);
      return;
    }

    const {state, statusMessage, output} = await response.json()

    if (state == 'succeeded') {
      setRunning(false);
      setOutput(output);
    } else if (state == 'failed') {
      setRunning(false);
      setError(statusMessage);
      return;
    } else {
      setTimeout(async () => {
        pollMessage(taskId, workspace)
      }, 300);
    }
  }

  const runModelSync = async () => {
    setRunning(true);
    setOutput(undefined);

    const response = await fetch('/api/submit_job', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      setRunning(false);
      setError(response.statusText);
      return;
    }

    const {taskId, workspace, error} = await response.json()

    if (error) {
      setRunning(false);
      setError(error)
    } else {
      pollMessage(taskId, workspace)
    }
    
  }  

  return (
    <div className="z-10">
      <ModelInput onUpdate={onPropUpdate}></ModelInput>

      <button
        type="button"
        className="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={runModelSync}
      >
        Submit
      </button>

      <div className="mt-20">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-800 mb-20">Output</h2>
      </div>

      {running && (
        <div className="prose center text-center">
          <LoadingDots />
          <p>Running...</p>
        </div>
      )}
      {error && (
        <div className="prose center text-center">
        <p>Error: {error}</p>
      </div>
    )}
      {output && (
        <ModelOutput output={output}></ModelOutput>
      )}

    </div>
  )
}