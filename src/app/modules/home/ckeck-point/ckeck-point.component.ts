import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'ngx-ckeck-point',
  templateUrl: './ckeck-point.component.html',
  styleUrls: ['./ckeck-point.component.scss']
})
export class CkeckPointComponent implements OnInit {
  reviewForm: FormGroup

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
  }

  initForm() {
    this.reviewForm = this.fb.group({
      // Thời gian hoàn thành công việc
      completionTime: ["", [Validators.required, Validators.maxLength(200)]],
      // Chất lượng hoàn thành công việc
      performanceEvaluation: ["", [Validators.required, Validators.maxLength(200)]],
      // Báo cáo trong dự án
      projectReport: ['', Validators.required],
      // Báo cáo trong dự án
      report: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }
}
