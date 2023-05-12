import type { NextApiRequest, NextApiResponse } from 'next'
import { getSteamshipPackage } from '@steamship/steamship-nextjs'
import {Task, TaskStatus} from "@steamship/client";
import { ImageResults } from '../../util/datamodel';

const decode = (str: string):string => Buffer.from(str, 'base64').toString('binary');

/*
 * Returns a Task<ImageResults> object
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  const errorResponse = (message: string) => {
    return res.json({ 
      state: 'failed', 
      statusMessage: message
    })
  }

  /*
   * This is the input structure for processing a job.
   */
  const {
     title,
     description
  } = req.body as any;

  if (!title) { return errorResponse("Please enter a title.") }
  if (!description) { return errorResponse("Please enter a description.") }

  try {
    // Fetch a stub to the Steamship-hosted backend.
    // Use a different workspace name per-user to provide data isolation.
    const uniqueUserToken = "user-103";
    const packageHandle = process.env.STEAMSHIP_PACKAGE_HANDLE as string;
    const workspace = `${packageHandle}-${uniqueUserToken}`;

    const pkg = await getSteamshipPackage({
      workspace: workspace,
      pkg: packageHandle
    })

    // Invoke a method on the package defined in steamship/api.py. Full syntax: pkg.invoke("method", {args}, "POST" | "GET")
    // Since we use invokeAsync here, the result will be a task that we can poll. This guarantees the Vercel function
    // can return quickly without having the paid plan.
    const resp: Task<any> = await pkg.invokeAsync('generate', {title, description})
    await resp.wait()
    const task = JSON.parse(decode(resp.output)) as any;

    const taskId = task.taskId;

    if (!taskId) {
      return res.json({ 
        state: 'failed',
        statusMessage: "No taskId was returned from Steamship"}
      );
    } else {
      return res.json({
          taskId, 
          workspace
      });
    }
  } catch (ex) {
    console.log(ex)
    const awaitedEx = (await ex) as any;

    if (awaitedEx?.response?.data?.status?.statusMessage) {
      return res.json({ state: 'failed', statusMessage: awaitedEx?.response?.data?.status?.statusMessage })
    }

    console.log(typeof awaitedEx)
    console.log(awaitedEx)

    return res.json({ state: 'failed', statusMessage: `There was an error responding to your message.` })
  }

}
