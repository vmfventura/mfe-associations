export interface AssociationInterface {
  associationId: number;
  projectName: string;
  colaboratorName: string;
  startDate: Date | null;
  endDate: Date | null;
  fundamental: boolean;
}
