export class Project {
  id: number;
  name: string | null;
  startDate: Date | null;
  endDate: Date | null;

  constructor (id: number, name: string | null, startDate: Date | null, endDate: Date | null) {
    this.id = id;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
