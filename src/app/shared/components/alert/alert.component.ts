import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Alert } from '../../models/alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit{
  alert: Alert = {
    title: 'Success!',
    description: 'Saved with success!',
    btnSuccess: 'Save', 
    btnCancel: 'Cancel', 
    colorBtnSuccess: 'accent',
    colorBtnCancel: 'warn',
    hasCloseButton: false
  }

  constructor(public dialogRef: MatDialogRef<AlertComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}
  
  ngOnInit(): void {
    this.alert.title = this.data.title ?? this.alert.title;
    this.alert.description = this.data.description ?? this.alert.description;
    this.alert.btnSuccess = this.data.btnSuccess ?? this.alert.btnSuccess;
    this.alert.btnCancel = this.data.btnCancel ?? this.alert.btnCancel;
    this.alert.colorBtnSuccess = this.data.colorBtnSuccess ?? this.alert.colorBtnSuccess;
    this.alert.colorBtnCancel = this.data.colorBtnCancel ?? this.alert.colorBtnCancel;
    this.alert.hasCloseButton = this.data.hasCloseButton ?? this.alert.hasCloseButton;
  }
}
