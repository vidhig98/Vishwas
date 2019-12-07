import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class RecruitmentService {
  constructor(private http: HttpClient) {}

  getJob(jobID: string) {
    return this.http.get(`${environment.API_URL}/jobs/${jobID}`);
  }

  getJobs() {
    return this.http.get(`${environment.API_URL}/jobs`);
  }

  addJob(job: any) {
    return this.http.post(`${environment.API_URL}/jobs`, job);
  }

  updateJob(jobID: string, job: Position) {
    return this.http.put(`${environment.API_URL}/jobs/${jobID}`, job);
  }
}
