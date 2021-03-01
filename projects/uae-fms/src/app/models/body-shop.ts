export interface IJobCard {
  id: number,
  issue: string,
  tasks: string[],
  endDate: string,
  startDate: string,
  locationThirdPartyIds: string[],
  cost: number,
  approveStatus: string
}

export interface IRequest {
  id: number,
  issue: string,
  reportedBy: string,
  creator: {
    "id": number,
    "firstName": string,
    "lastName": string
  },
  createdAt: string,
  accidentType: string
}

export interface ITechnician {
  id: number,
  user: {
    id: number,
    firstName: string,
    lastName: string
  },
  payPerHour: number,
  skillTags: string[],
  emails: string[],
  phoneNumbers: string[],
  numOfTasks: number,
  isAvailable: boolean
}
