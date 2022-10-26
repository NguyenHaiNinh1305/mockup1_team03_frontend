import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CheckPoint} from "./check-point.model";
import {BehaviorSubject} from "rxjs";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {AvataServiceService} from "../../../@core/services/avata-service.service";
import {ToastrService} from "ngx-toastr";
import {CheckPointService} from "./check-point.service";

@Component({
  selector: 'ngx-ckeck-point',
  templateUrl: './ckeck-point.component.html',
  styleUrls: ['./ckeck-point.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class CkeckPointComponent implements OnInit {
  reviewForm: FormGroup
  checkpointList: CheckPoint[] = [];
  showSpinner: BehaviorSubject<boolean> = new BehaviorSubject(false);
  checkpointActive: CheckPoint;
  idUser;

  constructor(
    private fb: FormBuilder,
    config: NgbModalConfig,
    private  toastr: ToastrService,
    private modalService: NgbModal,
    private checkPointService: CheckPointService,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.initForm();
    this.idUser = localStorage.getItem("id-user")
    this.checkPointService.getCheckPoints(this.idUser).subscribe(value => {
      this.checkpointList = value.object;
      this.findCheckPointActive()
      if(this.checkpointActive ){
          this.addValueToFormReviewForm();
      }
    }, error => {
    })
  }

  initForm() {
    this.reviewForm = this.fb.group({
      salary: ['', Validators.required],
      // Thời gian hoàn thành công việc
      completionTime: ['', [Validators.required, Validators.maxLength(200)]],
      // Chất lượng hoàn thành công việc
      performanceEvaluation: ["", Validators.required],
      // Báo cáo trong dự án
      projectReport: ['', Validators.required],
//    Kỹ năng chuyên môn
      advancedSkill: ['', Validators.required],
      //    Tinh thần học hỏi và cầu tiến
      studiousSpirit: ['', Validators.required],
      //  Khả năng hiểu nghiệp vụ
      abilityProfession: ['', Validators.required],
      //  Khả năng ứng biến với công việc mới
      abilityImproviseNewWork: ['', Validators.required],
//  Khả năng ứng biến với công việc mới
      adhereTime: ['', Validators.required],
      //  Kỹ năng giao tiếp, trao đổi
      communicationSkills: ['', Validators.required],
      onsite: [false, Validators.required],
      //  Kỹ năng giao tiếp, trao đổi
      customerReviews: ['', Validators.required],
      //  Sẵn sàng onsite
      readyOnsite: [false, Validators.required],
      //  Sẵn sàng nhận dự án
      readyOnProject: [false, Validators.required],
      //  Các điều cần đạt được trong thời gian tới, định hướng bản thân
      selfOrientation: ['', Validators.required],
      //  Góp ý cho dự án, công ty
      feedbackCompany: ['', Validators.required],
    });


  }

  findCheckPointActive(){
    this.checkpointActive = this.checkpointList.find(checkPoint =>{
     return  checkPoint.status.id == 1;
    })
  }

  addValueToCheckPointActive(){
    const value = this.reviewForm.value;
    this.checkpointActive.salary = value.salary,
      this.checkpointActive.completionTime= value.completionTime,
      this.checkpointActive.performanceEvaluation= value.performanceEvaluation,
      this.checkpointActive.projectReport = value.projectReport,
      this.checkpointActive.advancedSkill = value.advancedSkill,
      this.checkpointActive.studiousSpirit = value.studiousSpirit,
      this.checkpointActive.abilityProfession = value.abilityProfession,
      this.checkpointActive.abilityImproviseNewWork = value.abilityImproviseNewWork,
      this.checkpointActive.adhereTime = value.adhereTime,
      this.checkpointActive.communicationSkills = value.communicationSkills,
      this.checkpointActive.onsite = value.onsite,
      this.checkpointActive.customerReviews = value.customerReviews,
      this.checkpointActive.readyOnsite = value.readyOnsite,
      this.checkpointActive.readyOnProject = value.readyOnProject,
      this.checkpointActive.selfOrientation = value.selfOrientation,
      this.checkpointActive.feedbackCompany = value.feedbackCompany
  }

  addValueToFormReviewForm(){
   const value = this.checkpointActive;
      this.reviewForm.patchValue({
        salary: value.salary,
        // Thời gian hoàn thành công việc
        completionTime: value.completionTime,
        // Chất lượng hoàn thành công việc
        performanceEvaluation: value.performanceEvaluation,
        // Báo cáo trong dự án
        projectReport: value.projectReport,
//    Kỹ năng chuyên môn
        advancedSkill: value.advancedSkill,
        //    Tinh thần học hỏi và cầu tiến
        studiousSpirit: value.studiousSpirit,
        //  Khả năng hiểu nghiệp vụ
        abilityProfession: value.abilityProfession,
        //  Khả năng ứng biến với công việc mới
        abilityImproviseNewWork: value.abilityImproviseNewWork,
//  Khả năng ứng biến với công việc mới
        adhereTime: value.adhereTime,
        //  Kỹ năng giao tiếp, trao đổi
        communicationSkills: value.communicationSkills,
        onsite: value.onsite,
        //  Kỹ năng giao tiếp, trao đổi
        customerReviews: value.customerReviews,
        //  Sẵn sàng onsite
        readyOnsite: value.readyOnsite,
        //  Sẵn sàng nhận dự án
        readyOnProject: value.readyOnProject,
        //  Các điều cần đạt được trong thời gian tới, định hướng bản thân
        selfOrientation: value.selfOrientation,
        //  Góp ý cho dự án, công ty
        feedbackCompany: value.feedbackCompany,
      });
  }

  userClick(submit: string, content?: any) {

    if (submit == 'cancel') {
      this.initForm();
      return;
    }
    if (submit = 'submit') {
      this.addValueToCheckPointActive();
      this.checkpointActive.statusUser = {id:10, name:'submit'}
      this.checkpointActive.status = {id:2, name:'checked'}
    }

    if (submit == 'save') {
      this.addValueToCheckPointActive();
      this.checkpointActive.statusUser = {id:3, name:'save'}
      this.checkpointActive.status = {id:1, name:'new'}
    }
    content ? this.modalService.open(content) : "";
  }

  submit(){
    this.checkPointService.saveCheckPoints(this.checkpointActive,this.idUser).subscribe(value => {
      this.toastr.success("Thành công")
    },error => {
      this.toastr.error("Không thành công vui lòng kiểu tra lại")
    })

  }


}
