import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks(type: string) {
    return this.http.get(`${environment.API_URL}/tasks/${type}`);
  }

  getTaskCount() {
    return this.http.get(`${environment.API_URL}/tasks/count`);
  }

  addTask(task: any) {
    return this.http.post(`${environment.API_URL}/tasks`, task);
  }

  editTask(taskID: string, name: string) {
    return this.http.patch(
      `${environment.API_URL}/tasks/${taskID}`,
      new HttpParams().set("name", name)
    );
  }

  removeTask(taskID: string) {
    return this.http.delete(`${environment.API_URL}/tasks/${taskID}`);
  }

  addComment(taskID: string, text: string) {
    return this.http.post(
      `${environment.API_URL}/tasks/${taskID}/comments`,
      new HttpParams().set("text", text)
    );
  }

  editComment(taskID: string, commentID: string, text: string) {
    return this.http.patch(
      `${environment.API_URL}/tasks/${taskID}/comments/${commentID}`,
      new HttpParams().set("text", text)
    );
  }

  removeComment(taskID: string, commentID: string) {
    return this.http.delete(
      `${environment.API_URL}/tasks/${taskID}/comments/${commentID}`
    );
  }
}
