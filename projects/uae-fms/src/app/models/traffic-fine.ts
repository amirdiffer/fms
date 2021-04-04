export interface ITrafficFine {
  id: number,
  tcCode: number,
  type: string,
  department: {
    id: number,
    name: string,
    organizationId: number,
    organizationName: string
  },
  operator: {
    id: number,
    firstName: string,
    lastName: string
  },
  plateNumber: string,
  missionStatus: string,
  date: string,
  duration: number,
  status: string,
  userStatus: string,
  amount: number
}

export interface IAssetTrafficFine {
  id: number,
  asset: {
    id: number,
    dpd: string
  },
  dpd: string,
  ownershipId: number,
  plateNumber: string,
  type: string,
  operator: {
    id: number,
    firstName: string,
    lastName: string
  },
  status: string,
  businessCategoryId: number,
  totalFines: number,
  amount: number
}
