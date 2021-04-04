import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'anms-add-role-and-permission',
  templateUrl: './add-role-and-permission.component.html',
  styleUrls: ['./add-role-and-permission.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddRoleAndPermissionComponent
  implements OnInit, AfterViewInit, AfterContentChecked {
  form: FormGroup;

  middleCheckboxLabelArray = [
    { name: 'registration' },
    { name: 'customization' },
    { name: 'sub_asset' },
    { name: 'accessory' },
    { name: 'operator' },
    { name: 'organization' },
    { name: 'movement' }
  ];

  middleDropDownLabelArray = [
    { name: 'registration' },
    { name: 'customization' },
    { name: 'sub_asset' },
    { name: 'accessory' },
    { name: 'operator' },
    { name: 'organization' },
    { name: 'movement' }
  ];

  translations = {
    'configuration.role_permission.registration': '',
    'configuration.role_permission.customization': '',
    'configuration.role_permission.sub_asset': '',
    'configuration.role_permission.accessory': '',
    'configuration.role_permission.operator': '',
    'configuration.role_permission.organization': '',
    'configuration.role_permission.movement': ''
  };

  getTranslations() {
    const translationLabels = Object.keys(this.translations);
    this.translationService.get(translationLabels).subscribe((translation) => {
      this.translations = translation;
      this.middleCheckboxLabelArray = [];
      Object.keys(translation).forEach((key) => {
        this.middleCheckboxLabelArray.push({ name: translation[key] });
      });
    });
  }

  bottomCheckboxLabelArray = ['fuel_management', 'traffic_fine'];

  switchesList = [
    { label: 'view', value: false, visible: true },
    { label: 'edit', value: false, visible: true },
    { label: 'create', value: false, visible: true },
    { label: 'archive', value: false, visible: true },
    { label: 'approval', value: false, visible: true }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private translationService: TranslateService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.updateMiddleArray();
  }

  ngAfterViewInit(): void {
    this.updateMiddleArray();
  }

  ngAfterContentChecked() {
    this.getTranslations();
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
    for (const middleDropDownLabelArrayElement of this
      .middleDropDownLabelArray) {
      const group = this.formBuilder.group({
        checkboxLabel: middleDropDownLabelArrayElement.name,
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

  activeGroup = 'fleet';
  toggleGroup(group: string): void {
    this.activeGroup == group
      ? (this.activeGroup = 'root')
      : (this.activeGroup = group);
  }

  selectParent(control: string, e: Event): void {
    let checkBox = e.target['checked'];
    if (checkBox) {
      switch (control) {
        case 'fleet': {
          this.form.get('fleet.fleetCheckbox').patchValue(true);
          break;
        }
      }
    }
  }

  submit() {}
}
