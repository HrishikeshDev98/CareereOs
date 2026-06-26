import type { ReactNode } from 'react'
import { BsSend } from 'react-icons/bs'
import { MdTaskAlt } from 'react-icons/md'
import { TfiBag } from 'react-icons/tfi'

import type { DashboardStatKey } from '@/src/components/dashboard/types'

interface StatConfig {
  id: string
  icon: ReactNode
  stat: DashboardStatKey
  info: string
}

export const statsConfig: StatConfig[] = [
  {
    id: 'total-applications',
    icon: <TfiBag />,
    stat: 'totalApplications',
    info: 'All Time',
  },
  {
    id: 'applied-this-week',
    icon: <BsSend />,
    stat: 'appliedThisWeek',
    info: 'Applied this week',
  },
  {
    id: 'pending-tasks',
    icon: <MdTaskAlt />,
    stat: 'pendingTasks',
    info: 'You have pending tasks',
  },
]
