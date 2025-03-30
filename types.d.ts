interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  coverColor: string;
  coverUrl: string;
  totalCopies: number;
  availableCopies: number;
  rating: number;
  videoUrl: string;
  isLoanedBook?: boolean;
  summary: string;
}

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}
