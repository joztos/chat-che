import type { NextApiRequest, NextApiResponse } from 'next'
import {getTask} from '@steamship/steamship-nextjs'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { taskId, workspace } = req.body as any;
  const outer_task = await getTask({taskId, workspace});
  return res.json(outer_task)
}

