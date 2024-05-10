export class Association {
  id: number;
  colaboratorId: number;
  projectId: number;
  startDate: Date | null;
  endDate: Date | null;
  fundamental: boolean;
  isSavedInDB: boolean = true;

  constructor(id: number, colaboratorId: number, projectId: number, startDate: Date | null, endDate: Date | null, fundamental: boolean) {
    this.id = id;
    this.colaboratorId = colaboratorId;
    this.projectId = projectId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.fundamental = fundamental;
    this.isSavedInDB = true;
  }
}
