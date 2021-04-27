import { settings } from "cluster";
import { saveAs } from "file-saver";
import * as ExcelJS from 'exceljs';

export class CSVExport {
  private data: any[];
  private settings: CSVExportSettings;

  constructor(data: any[], settings: CSVExportSettings) {
    this.data = data;
    this.settings = settings;
  }

  public export2(fileName?, header?) {
    let outStr = '';
    outStr = header ? header + "\r\n\r\n" : '';
    let d = this.data;
    let s = this.settings.columns;
    for (let i = 0; i < s.length; i++) {
      let t = s[i]
      outStr += t.title;
      outStr += (i < s.length - 1) ? ',' : '\r\n';
    }

    for (let j = 0; j < this.data.length; j++) {
      for (let i = 0; i < s.length; i++) {
        let tt: string = '';
        if (d[j][s[i].field] && typeof d[j][s[i].field] == "object") {
          tt = (d[j][s[i].field].name) ? d[j][s[i].field].name : (d[j][s[i].field].id) ? d[j][s[i].field].id : ''
        }
        else {
          tt = d[j][s[i].field];
        }
        if (tt && s[i].field != 'floatButton') {
          tt += '';
          tt = (tt as any).replaceAll('\r\n', '');
          tt = (tt as any).replaceAll('\r', '');
          tt = (tt as any).replaceAll('\n', ' ');
          outStr += tt;
          outStr += (i < s.length - 1) ? ',' : '\r\n';
        }
        else {
          outStr += (i < s.length - 1) ? ',' : '\r\n';
        }
      }
    }

    var file = new File([outStr], (fileName ? fileName : 'file') + '.csv', { type: "text/plain;charset=utf-8" });
    saveAs(file);
  }

  public export(fileName?, header?) {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Me';
    workbook.lastModifiedBy = 'Her';
    workbook.created = new Date(1985, 8, 30);
    workbook.modified = new Date();
    workbook.lastPrinted = new Date(2016, 9, 27);
    workbook.properties.date1904 = true;
    workbook.calcProperties.fullCalcOnLoad = true;
    workbook.views = [
      {
        x: 0, y: 0, width: 10000, height: 20000,
        firstSheet: 0, activeTab: 1, visibility: 'visible'
      }
    ];
    // Create worksheets with headers and footers
    const sheet = workbook.addWorksheet('My Sheet', {
      headerFooter:{firstHeader: "Hello Exceljs", firstFooter: "Hello World"}
    });
    sheet.columns = this.settings.columns.map(x => {
      return {
        header: x.title, key: x.field, width: 40
      }
    });
    this.data.forEach(x => {
      let row = Object.values(x);
      sheet.addRow(row);
    });
    sheet.getRow(1).font = { family: 4, size: 14, bold: true, color: {argb: '005844'} };
    sheet.insertRow(1, [header]);
    sheet.getRow(1).font = { bold: true, size: 18 };
    sheet.getRow(1).height = 40;
    sheet.getRow(2).height = 30;
    sheet.mergeCells(1, 1, 1, this.settings.columns.length -1);
    sheet.getRow(1).alignment = {
      horizontal: 'center',
      vertical: 'middle'
    }
    sheet.getRow(2).alignment = {
      horizontal: 'center',
      vertical: 'middle'
    }
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `${header}.xlsx`);
    })
  }

}

export interface CSVExportSettings {
  columns: CSVExportColumn[];
}

export interface CSVExportColumn {
  title: string;
  field: string;
}
