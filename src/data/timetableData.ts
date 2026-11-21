export type ClassType = 'gi' | 'nogi' | 'openmat' | 'kids';

export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface ClassSession {
  id: string;
  day: DayOfWeek;
  startTime: string; // "06:00" or "18:00"
  endTime: string;   // "07:00" or "20:30"
  displayTime: string; // "6:00am – 7:00am"
  title: string;
  type: ClassType;
  level: string;
  location?: string;
  description?: string;
}

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const DAY_ABBREVIATIONS: Record<DayOfWeek, string> = {
  Monday: 'Mon',
  Tuesday: 'Tue',
  Wednesday: 'Wed',
  Thursday: 'Thu',
  Friday: 'Fri',
  Saturday: 'Sat',
  Sunday: 'Sun',
};

export const CLASS_TYPE_META: Record<
  ClassType,
  {
    label: string;
    description: string;
    badgeStyle: string;
    borderStyle: string;
    dotColor: string;
  }
> = {
  gi: {
    label: 'Gi Jiu Jitsu',
    description: 'Traditional uniform (kimono) training focusing on grips, leverage, and guard retention.',
    badgeStyle: 'bg-accent/15 text-accent border-accent/40',
    borderStyle: 'border-l-accent',
    dotColor: 'bg-accent',
  },
  nogi: {
    label: 'No-Gi Grappling',
    description: 'Fast-paced submission wrestling in rashguard & shorts. Wrestling takedowns and leg locks.',
    badgeStyle: 'bg-zinc-800 text-zinc-200 border-zinc-600',
    borderStyle: 'border-l-zinc-300',
    dotColor: 'bg-zinc-300',
  },
  openmat: {
    label: 'Open Mat',
    description: 'Unstructured mat time for members to drill techniques, roll, or ask questions at their own pace.',
    badgeStyle: 'bg-zinc-900 text-zinc-400 border-zinc-700',
    borderStyle: 'border-l-zinc-500',
    dotColor: 'bg-zinc-500',
  },
  kids: {
    label: 'Kids Class',
    description: 'Age-appropriate discipline, coordination, anti-bullying fundamentals, and fun grappling drills.',
    badgeStyle: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
    borderStyle: 'border-l-amber-400',
    dotColor: 'bg-amber-400',
  },
};

export const TIMETABLE_DATA: ClassSession[] = [
  // Monday
  {
    id: 'mon-1',
    day: 'Monday',
    startTime: '06:00',
    endTime: '07:00',
    displayTime: '6:00am – 7:00am',
    title: 'Sparring No-Gi',
    type: 'nogi',
    level: 'All Levels',
    description: 'Early morning positional sparring and rounds before the workday.',
  },
  {
    id: 'mon-2',
    day: 'Monday',
    startTime: '18:00',
    endTime: '19:00',
    displayTime: '6:00pm – 7:00pm',
    title: 'Open Mat',
    type: 'openmat',
    level: 'All Levels',
    description: 'Free mat time for drilling, rolling, and technique refinement.',
  },
  {
    id: 'mon-3',
    day: 'Monday',
    startTime: '19:00',
    endTime: '20:30',
    displayTime: '7:00pm – 8:30pm',
    title: 'Jiu Jitsu Gi',
    type: 'gi',
    level: 'All Levels',
    description: 'Fundamental and advanced Gi technique followed by structured situational sparring.',
  },

  // Tuesday
  {
    id: 'tue-1',
    day: 'Tuesday',
    startTime: '06:00',
    endTime: '07:00',
    displayTime: '6:00am – 7:00am',
    title: 'Jiu Jitsu Gi',
    type: 'gi',
    level: 'All Levels',
    description: 'Morning technical Gi session focusing on guard passing and defense.',
  },
  {
    id: 'tue-2',
    day: 'Tuesday',
    startTime: '09:00',
    endTime: '10:30',
    displayTime: '9:00am – 10:30am',
    title: 'Sparring No-Gi',
    type: 'nogi',
    level: 'Intermediate / Advanced',
    description: 'Mid-morning competition-paced sparring rounds in No-Gi attire.',
  },
  {
    id: 'tue-3',
    day: 'Tuesday',
    startTime: '17:45',
    endTime: '18:30',
    displayTime: '5:45pm – 6:30pm',
    title: 'Kids Class',
    type: 'kids',
    level: 'Youth (Ages 5–14)',
    description: 'Fun, disciplined martial arts movement and beginner self-defense for children.',
  },
  {
    id: 'tue-4',
    day: 'Tuesday',
    startTime: '19:00',
    endTime: '20:30',
    displayTime: '7:00pm – 8:30pm',
    title: 'Jiu Jitsu No-Gi',
    type: 'nogi',
    level: 'All Levels',
    description: 'Evening submission grappling, wrestling transitions, and live sparring.',
  },

  // Wednesday
  {
    id: 'wed-1',
    day: 'Wednesday',
    startTime: '06:00',
    endTime: '07:00',
    displayTime: '6:00am – 7:00am',
    title: 'Sparring No-Gi',
    type: 'nogi',
    level: 'All Levels',
    description: 'Rise-and-shine rounds for conditioned conditioning and live positional work.',
  },
  {
    id: 'wed-2',
    day: 'Wednesday',
    startTime: '11:00',
    endTime: '12:00',
    displayTime: '11:00am – 12:00pm',
    title: 'Jiu Jitsu Gi',
    type: 'gi',
    level: 'All Levels',
    description: 'Midday technical class covering core grips, submissions, and sweeps.',
  },
  {
    id: 'wed-3',
    day: 'Wednesday',
    startTime: '17:30',
    endTime: '19:00',
    displayTime: '5:30pm – 7:00pm',
    title: 'No-Gi Grappling',
    type: 'nogi',
    level: 'All Levels',
    description: 'Comprehensive No-Gi system: takedowns, front headlocks, and guard passes.',
  },
  {
    id: 'wed-4',
    day: 'Wednesday',
    startTime: '19:00',
    endTime: '20:30',
    displayTime: '7:00pm – 8:30pm',
    title: 'Jiu Jitsu Gi',
    type: 'gi',
    level: 'All Levels',
    description: 'Prime evening Gi class with deep technical curriculum and partner drilling.',
  },

  // Thursday
  {
    id: 'thu-1',
    day: 'Thursday',
    startTime: '06:00',
    endTime: '07:00',
    displayTime: '6:00am – 7:00am',
    title: 'Jiu Jitsu No-Gi',
    type: 'nogi',
    level: 'All Levels',
    description: 'Fast-paced early morning No-Gi drills and live situational sparring.',
  },
  {
    id: 'thu-2',
    day: 'Thursday',
    startTime: '13:00',
    endTime: '14:00',
    displayTime: '1:00pm – 2:00pm',
    title: 'Jiu Jitsu No-Gi',
    type: 'nogi',
    level: 'All Levels',
    description: 'Lunchtime grappling workout. Quick warmup, technical focus, and active rolls.',
  },
  {
    id: 'thu-3',
    day: 'Thursday',
    startTime: '18:00',
    endTime: '19:00',
    displayTime: '6:00pm – 7:00pm',
    title: 'Open Mat',
    type: 'openmat',
    level: 'All Levels',
    description: 'Community open mat. Drill techniques from earlier in the week or get extra rounds.',
  },
  {
    id: 'thu-4',
    day: 'Thursday',
    startTime: '19:00',
    endTime: '20:30',
    displayTime: '7:00pm – 8:30pm',
    title: 'Jiu Jitsu No-Gi',
    type: 'nogi',
    level: 'All Levels',
    description: 'Evening No-Gi wrestling and submission defense under Coach Nick.',
  },

  // Friday
  {
    id: 'fri-1',
    day: 'Friday',
    startTime: '06:00',
    endTime: '07:00',
    displayTime: '6:00am – 7:00am',
    title: 'Sparring Gi',
    type: 'gi',
    level: 'All Levels',
    description: 'Early morning Gi sparring to kick off Friday with intense training rounds.',
  },
  {
    id: 'fri-2',
    day: 'Friday',
    startTime: '10:00',
    endTime: '12:00',
    displayTime: '10:00am – 12:00pm',
    title: 'No-Gi Grappling',
    type: 'nogi',
    level: 'All Levels',
    description: 'Extended 2-hour morning session with thorough technique and positional sparring.',
  },
  {
    id: 'fri-3',
    day: 'Friday',
    startTime: '18:00',
    endTime: '19:00',
    displayTime: '6:00pm – 7:00pm',
    title: 'Open Mat',
    type: 'openmat',
    level: 'All Levels',
    description: 'Pre-weekend open floor for members to unwind, drill, and spar.',
  },
  {
    id: 'fri-4',
    day: 'Friday',
    startTime: '19:00',
    endTime: '20:30',
    displayTime: '7:00pm – 8:30pm',
    title: 'Jiu Jitsu No-Gi',
    type: 'nogi',
    level: 'All Levels',
    description: 'Friday night submission grappling session followed by social cooldown.',
  },

  // Saturday
  {
    id: 'sat-1',
    day: 'Saturday',
    startTime: '11:00',
    endTime: '12:00',
    displayTime: '11:00am – 12:00pm',
    title: 'Gi - Longton',
    type: 'gi',
    level: 'All Levels',
    location: 'Longton Satellite',
    description: 'Weekend technical Gi session hosted at our Longton location.',
  },

  // Sunday
  {
    id: 'sun-1',
    day: 'Sunday',
    startTime: '13:00',
    endTime: '14:00',
    displayTime: '1:00pm – 2:00pm',
    title: 'Sparring No-Gi',
    type: 'nogi',
    level: 'All Levels',
    description: 'Sunday afternoon No-Gi sparring rounds to close out the training week.',
  },
];

export function getClassesByDay(
  day: DayOfWeek,
  filterType: ClassType | 'all' = 'all'
): ClassSession[] {
  return TIMETABLE_DATA.filter((session) => {
    const dayMatches = session.day === day;
    const typeMatches = filterType === 'all' || session.type === filterType;
    return dayMatches && typeMatches;
  });
}

export function getTotalClassCount(): number {
  return TIMETABLE_DATA.length;
}

export function getCountForType(type: ClassType): number {
  return TIMETABLE_DATA.filter((c) => c.type === type).length;
}
