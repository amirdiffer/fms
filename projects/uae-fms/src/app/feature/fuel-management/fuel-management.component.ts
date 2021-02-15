import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FilterCardSetting } from '@core/filter';
import {
  FuelCardTableColumnDefinition,
  FuelCardTableData,
  FuelDataType,
  FuelTableSettings
} from './fuel-card-table/fuel-card-table.component';
import {
  AssetUsageDataType,
  AssetUsageTableColumnDefinition,
  AssetUsageTableData,
  AssetUsageTableSettings
} from './asset-usage-table/asset-usage-table.component';
import { FuelCardsFacade } from '../fuel-management/+state/fuel-cards';
import { AssetUsageFacade } from './+state/asset-usage';
import { Router } from '@angular/router';

@Component({
  selector: 'anms-fuel-management',
  templateUrl: './fuel-management.component.html',
  styleUrls: ['./fuel-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuelManagementComponent implements OnInit {
  downloadBtn = 'assets/icons/download-solid.svg';
  searchIcon = 'assets/icons/search-solid.svg';
  filterSetting: FilterCardSetting[] = [
    {
      filterTitle: 'Total',
      filterTagColor: '#B892FF',
      filterCount: '2456',
      onActive(index: number): void { }
    },
    {
      filterTitle: 'Available',
      filterTagColor: '#EF7A85',
      filterCount: '356',
      onActive(index: number): void { }
    },
    {
      filterTitle: 'Assigned',
      filterTagColor: '#709775',
      filterCount: '124',
      onActive(index: number): void { }
    }
  ];

  fuelCardsColumns: FuelCardTableColumnDefinition[] = [
    {
      title: 'Tag No',
      dataFieldKey: FuelDataType.tagNo
    },
    {
      title: 'Used',
      dataFieldKey: FuelDataType.used
    },
    {
      title: 'Usage Limit',
      dataFieldKey: FuelDataType.usageLimit
    },
    {
      title: 'Asset',
      dataFieldKey: FuelDataType.asset
    },
    {
      title: 'Card Type',
      dataFieldKey: FuelDataType.cardType
    },
    {
      title: 'Expire Date',
      dataFieldKey: FuelDataType.expireDate
    }
  ];

  fuelCardsTableData: FuelCardTableData[] = [
    {
      tagNo: '0550505050',
      used: '100 Litters',
      usageLimit: '400 Litters',
      asset: 'Item no 123456',
      cardType: 'RFID-ENOC',
      expireDate: '02/02/2020',
      rowSubData: ['50 Litters', '10 KM', 'Saturday 02/02/2020 at 2:00 PM'],
      isExpanded: false
    },
    {
      tagNo: '0550505050',
      used: '100 Litters',
      usageLimit: '400 Litters',
      asset: 'Item no 123456',
      cardType: 'RFID-ENOC',
      expireDate: '02/02/2020',
      rowSubData: ['50 Litters', '10 KM', 'Saturday 02/02/2020 at 2:00 PM'],
      isExpanded: false
    },
    {
      tagNo: '0550505050',
      used: '100 Litters',
      usageLimit: '400 Litters',
      asset: 'Item no 123456',
      cardType: 'RFID-ENOC',
      expireDate: '02/02/2020',
      rowSubData: ['50 Litters', '10 KM', 'Saturday 02/02/2020 at 2:00 PM'],
      isExpanded: false
    },
    {
      tagNo: '0550505050',
      used: '100 Litters',
      usageLimit: '400 Litters',
      asset: 'Item no 123456',
      cardType: 'RFID-ENOC',
      expireDate: '02/02/2020',
      rowSubData: ['50 Litters', '10 KM', 'Saturday 02/02/2020 at 2:00 PM'],
      isExpanded: false
    }
  ];

  assetUsageColumns: AssetUsageTableColumnDefinition[] = [
    {
      title: 'Asset',
      dataFieldKey: AssetUsageDataType.asset
    },
    {
      title: 'Plate Number',
      dataFieldKey: AssetUsageDataType.plateNumber
    },
    {
      title: 'Tag No',
      dataFieldKey: AssetUsageDataType.tagNo
    },
    {
      title: 'Date',
      dataFieldKey: AssetUsageDataType.date
    },
    {
      title: 'Amount',
      dataFieldKey: AssetUsageDataType.amount
    },
    {
      title: 'Mileage',
      dataFieldKey: AssetUsageDataType.mileage
    },
    {
      title: 'Total Usage',
      dataFieldKey: AssetUsageDataType.totalUsage
    },
    {
      title: 'Cost',
      dataFieldKey: AssetUsageDataType.cost
    },
    {
      title: 'Card Type',
      dataFieldKey: AssetUsageDataType.cardType
    }
  ];

  assetUsageTableData: AssetUsageTableData[] = [
    {
      asset: 'Asset Name',
      assetSubData: {
        dpdNumber: 'DPD 0000001',
        status: 'Owned',
        statusColor: '#FCB614'
      },
      date: '00/00/0000 00:00',
      plateNumber: '123456789',
      tagNo: '123456789',
      amount: '27 Litters',
      mileage: '100 Km',
      totalUsage: '654327 Litters',
      cost: '000 AED',
      cardType: 'RFID-ENOC'
    },
    {
      asset: 'Asset Name',
      assetSubData: {
        dpdNumber: 'DPD 0000001',
        status: 'Owned',
        statusColor: '#FCB614'
      },
      date: '00/00/0000 00:00',
      plateNumber: '123456789',
      tagNo: '123456789',
      amount: '27 Litters',
      mileage: '100 Km',
      totalUsage: '654327 Litters',
      cost: '000 AED',
      cardType: 'RFID-ENOC'
    },
    {
      asset: 'Asset Name',
      assetSubData: {
        dpdNumber: 'DPD 0000001',
        status: 'Owned',
        statusColor: '#FCB614'
      },
      date: '00/00/0000 00:00',
      plateNumber: '123456789',
      tagNo: '123456789',
      amount: '27 Litters',
      mileage: '100 Km',
      totalUsage: '654327 Litters',
      cost: '000 AED',
      cardType: 'RFID-ENOC'
    },
    {
      asset: 'Asset Name',
      assetSubData: {
        dpdNumber: 'DPD 0000001',
        status: 'Owned',
        statusColor: '#FCB614'
      },
      date: '00/00/0000 00:00',
      plateNumber: '123456789',
      tagNo: '123456789',
      amount: '27 Litters',
      mileage: '100 Km',
      totalUsage: '654327 Litters',
      cost: '000 AED',
      cardType: 'RFID-ENOC'
    },
    {
      asset: 'Asset Name',
      assetSubData: {
        dpdNumber: 'DPD 0000001',
        status: 'Owned',
        statusColor: '#FCB614'
      },
      date: '00/00/0000 00:00',
      plateNumber: '123456789',
      tagNo: '123456789',
      amount: '27 Litters',
      mileage: '100 Km',
      totalUsage: '654327 Litters',
      cost: '000 AED',
      cardType: 'RFID-ENOC'
    },
    {
      asset: 'Asset Name',
      assetSubData: {
        dpdNumber: 'DPD 0000001',
        status: 'Owned',
        statusColor: '#FCB614'
      },
      date: '00/00/0000 00:00',
      plateNumber: '123456789',
      tagNo: '123456789',
      amount: '27 Litters',
      mileage: '100 Km',
      totalUsage: '654327 Litters',
      cost: '000 AED',
      cardType: 'RFID-ENOC'
    }
  ];

  fuelCardsTableSetting: FuelTableSettings = {
    columns: this.fuelCardsColumns,
    data: this.fuelCardsTableData
  };

  assetUsageTableSetting: AssetUsageTableSettings = {
    columns: this.assetUsageColumns,
    data: this.assetUsageTableData
  };

  constructor(private _facadeFuelCard: FuelCardsFacade, private _facadeAssetUsage: AssetUsageFacade, private _router: Router) { }

  selectedTab;
  ngOnInit(): void {
    this._facadeFuelCard.loadAll();
    this._facadeAssetUsage.loadAll();
  }
  addClicked(e: Event) {
    console.log(this._router.navigate(['add-fuel-card']))

    switch (this.selectedTab) {
      case 'Fuel Cards':
        this._router.navigate(['fuel-management/add-fuel-card']);
        break;
      case 'Asset Usage':
        this._router.navigate(['fuel-management/add-asset-usage']);
        break;
      default:
        this._router.navigate(['fuel-management/add-fuel-card']);
        break;
    }
  }
}
