export type Language = 'ENG' | 'हिंदी';

export interface Judge {
  name: string;
  title: string;
  experience: string;
  avatarUrl: string;
  videoUrl?: string;
}

export interface CompetitionDates {
  registerBefore: string | Date;
  submissionStarts: string | Date;
  submissionEnds: string | Date;
  resultDate: string | Date;
}

export interface PreviousWinner {
  _id?: string;
  name: string;
  rank: number;
  photoUrl: string;
  videoUrl?: string;
}

export interface Reward {
  rank: number;
  prize: number;
}

export interface CompetitionTabs {
  about: string;
  judgingParameters: string;
  rules: string;
}

export interface Competition {
  _id: string;
  title: string;
  category: string;
  tags: string[];
  prizePool: number;
  entryFee: number;
  totalSpots: number;
  bookedSpots: number;
  judge: Judge;
  dates: CompetitionDates;
  previousWinners: PreviousWinner[];
  tabs: CompetitionTabs;
  rewards: Reward[];
  status: 'upcoming' | 'open' | 'closed' | 'evaluating' | 'completed';
  isUserRegistered?: boolean;
  spotsLeft?: number;
}
