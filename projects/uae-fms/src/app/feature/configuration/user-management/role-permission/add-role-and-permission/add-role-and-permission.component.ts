import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'anms-add-role-and-permission',
  templateUrl: './add-role-and-permission.component.html',
  styleUrls: ['./add-role-and-permission.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddRoleAndPermissionComponent implements OnInit, AfterViewInit {
  form: FormGroup;

  middleCheckboxLabelArray = [
    {name:'Registration'},
    {name:'Customization'},
    {name:'Sub Asset'},
    {name:'Accessory'},
    {name:'Operator'},
    {name:'Organization'},
    {name:'Movement'}
  ];

  bottomCheckboxLabelArray = ['Fuel Management', 'Traffic Fine'];

  switchesList = [
    { label: 'View', value: false, visible: true },
    { label: 'Edit', value: false, visible: true },
    { label: 'Create', value: false, visible: true },
    { label: 'Archive', value: false, visible: true },
    { label: 'Approval', value: false, visible: true }
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
    this.updateMiddleArray();
  }

  ngAfterViewInit(): void {
    this.updateMiddleArray();
  }

  middleRowSwitches(index: number) {
    return this.middleArray.at(index).get('switches') as FormArray;
  }

  get fleet() {
    return this.form.get('fleet') as FormGroup;
  }

  get assetMaster() {
    return this.form.get('fleet') as FormGroup;
  }

  get assetConfiguration() {
    return this.form.get('assetConfiguration') as FormGroup;
  }

  get businessCategory() {
    return this.form.get('businessCategory') as FormGroup;
  }

  get middleArray() {
    return this.form.get('middleArray') as FormArray;
  }

  get bottomArray() {
    return this.form.get('bottomArray') as FormArray;
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      fleet: this.formBuilder.group({
        fleetCheckbox: false,
        switches: this.addSwitch()
      }),
      assetMaster: this.formBuilder.group({
        assetMasterCheckBox: false,
        switches: this.addSwitch()
      }),
      assetConfiguration: this.formBuilder.group({
        assetConfigurationSelectList: this.middleCheckboxLabelArray[0],
        switches: this.addSwitch()
      }),
      businessCategory: this.formBuilder.group({
        businessCategorySelectList: this.middleCheckboxLabelArray[0],
        switches: this.addSwitch()
      }),
      middleArray: this.formBuilder.array([
        {
          checkboxLabel: '',
          checkboxValue: false,
          switches: this.addSwitch()
        }
      ]),
      bottomArray: this.formBuilder.array([
        {
          checkboxLabel: '',
          checkboxValue: false,
          switches: this.addSwitch()
        }
      ])
    });

    this.addMiddleArrayCheckBox();
    this.addBottomArrayCheckBox();
  }

  addSwitch(): FormArray {
    const switches: FormArray = new FormArray([]);
    for (const aSwitch of this.switchesList) {
      const control = this.formBuilder.control(aSwitch);
      switches.push(control);
    }
    return switches;
  }

  addMiddleArrayCheckBox() {
    this.middleArray.clear();
    for (const middleCheckboxLabelArrayElement of this
      .middleCheckboxLabelArray) {
      const group = this.formBuilder.group({
        checkboxLabel: middleCheckboxLabelArrayElement.name,
        checkboxValue: false,
        switches: this.addSwitch()
      });

      this.middleArray.push(group);
    }
  }

  addBottomArrayCheckBox() {
    this.bottomArray.clear();
    for (const bottomCheckboxLabelArrayElement of this
      .bottomCheckboxLabelArray) {
      const group = this.formBuilder.group({
        checkboxLabel: bottomCheckboxLabelArrayElement,
        checkboxValue: false,
        switches: this.addSwitch()
      });

      this.bottomArray.push(group);
    }
  }

  updateMiddleArray(): void {
    this.middleRowSwitches(0)
      .at(2)
      .patchValue({ label: 'Create', value: false, visible: false });

    for (let i = 0; i < this.middleArray.length; i++) {
      this.middleRowSwitches(i)
        .at(3)
        .patchValue({ label: 'Archive', value: false, visible: false });
    }
  }

  submit() {}
}
