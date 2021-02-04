import { Component, OnInit } from '@angular/core';
import { SelectAsyncDs } from 'projects/zorro-sharper/src/public-api';
// import { SelectAsyncDs } from "zorro-sharper";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { zip } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-select-text-field',
  templateUrl: './select-text-field.component.html'
})
export class SelectTextFieldComponent implements OnInit {
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  formGroup: FormGroup;
  submitJson = ''; // 提交的表单数据，演示用

  // 用户下拉框数据源
  userDs = new SelectAsyncDs((pageNum, pageSize, query) =>
    this.getUserList(pageNum, pageSize, query)
  );

  randomUserUrl = 'https://api.randomuser.me/?results=10';

  /**
   * 性别选项列表数据源
   */
  sexOptions = [
    {
      id: '1',
      text: '男'
    },
    {
      id: '2',
      text: '女'
    }
  ];

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      id: ['', []],
      userId: ['', []],
      userText: ['', []],
      sexId: ['', []],
      sexText: ['', []]
    });

    // 模拟编辑表单时加载表单数据
    zip(this.loadFormData(), this.userDs.reload()).subscribe(([formData, userOptions]) => {
      this.formGroup.patchValue(formData);
      this.userDs.appendOption(
        {
          name: {
            title: formData.userText
          },
          login: {
            uuid: formData.userId
          }
        },
        d => d.login.uuid
      );
    });
  }

  // 模拟编辑表单时加载表单数据
  loadFormData(): Observable<any> {
    return Observable.create(function(observer) {
      observer.next({
        id: 'e101',
        userId: 'u11',
        userText: '王老五',
        sexId: '2',
        sexText: '女'
      });
    });
  }

  submit() {
    this.submitJson = JSON.stringify(this.formGroup.value, null, 4);
  }

  getUserList(pageNum, pageSize, query): Observable<string[]> {
    return this.http.get(`${this.randomUserUrl}`).pipe(map((res: any) => res.results));
  }
}
