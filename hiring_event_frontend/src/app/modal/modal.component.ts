import { Component, Injectable, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { InterviewRounds } from '../Models/interviewRounds.model';
import { InterviewRoundService } from '../service/interview-round.services';
import { ModalConfig } from './modal.config';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
@Injectable()
export class ModalComponent implements OnInit {
  @Input() public modalConfig: ModalConfig
  @ViewChild('modal') private modalContent: TemplateRef<ModalComponent>
  private modalRef: NgbModalRef
  interviewRounds: InterviewRounds;

  constructor(private modalService: NgbModal, private interviewRoundService : InterviewRoundService) { }

  ngOnInit(): void {
    this.interviewRounds= new InterviewRounds();


    this.interviewRoundService.getInterviewRound(16)
      .subscribe(data => {
        console.log(data)
        this.interviewRounds = data;
      }, error => console.log(error));
   }

//   open() {
//     this.modalRef = this.modalService.open(this.modalContent)
//     this.modalRef.result.then()
//   }

//   close() {
//     this.modalRef.close()
//   }

//   dismiss() {
//     this.modalRef.dismiss()
//   }


open(): Promise<boolean> {
  return new Promise<boolean>(resolve => {
    this.modalRef = this.modalService.open(this.modalContent)
    this.modalRef.result.then(resolve, resolve)
  })
}

async close(): Promise<void> {
  if (this.modalConfig.shouldClose === undefined || (await this.modalConfig.shouldClose())) {
    const result = this.modalConfig.onClose === undefined || (await this.modalConfig.onClose())
    this.modalRef.close(result)
  }
}

async dismiss(): Promise<void> {
  if (this.modalConfig.shouldDismiss === undefined || (await this.modalConfig.shouldDismiss())) {
    const result = this.modalConfig.onDismiss === undefined || (await this.modalConfig.onDismiss())
    this.modalRef.dismiss(result)
  }
}
}
