import {User} from "../profile/profile.model";
import {Status} from "../../admin/transfers/transfer/transfer.model";

export interface CheckPoint{
  id?:number;
  affectUser?:User;
  createUser?:User;
  checkPointType?:CheckPoint;
  createDate?:Date;
  status?:Status;
  statusUser?:Status;
  note?:string;
  salary?:number;
  reviewCheckPoint?:ReviewCheckPoint;
  successSalary?:number;
  completionTime?:number;
  performanceEvaluation?:string;
  projectReport?:string;
  advancedSkill?:string;
  studiousSpirit?:string;
  abilityProfession?:string;
  abilityImproviseNewWork?:string;
  adhereTime?:string
  communicationSkills?:string;
  onsite?:boolean;
  customerReviews?:string;
  readyOnsite?:boolean;
  readyOnProject?:boolean;
  selfOrientation?:string;
  feedbackCompany?:string


}

export interface CheckPointType{
  id?:number;
  name?:string;
  status?:number;

}

export interface ReviewCheckPoint{
  id?:number;
  divisionManager?:User;
  divisionManagerHr?:User;
  admin?:User;
  authorizeHr?:User;
  adminReviewDay?:Date;
  divisionManagerReviewDay?:Date;
  divisionManagerHrReviewDay?:Date;
  hrReviewDay?:Date;
  divisionManagerCommentCheckpoint?:string;
  divisionManagerHrCommentCheckpoint?:string;
  divisionManagerCommentAffectUser?:string;
  divisionManagerHrCommentAffectUser?:string;
  meetDay?:Date;
  divisionManagerReviewSalary?:number;
  divisionManagerHrReviewSalary?:number;
  hrReviewSalary?:number;
  statusDivisionManager?:Status;
  statusDivisionManagerHr?:Status;
  statusHr?:Status;
  statusAdmin?:Status;
  reasonRefuse?:string;

}
