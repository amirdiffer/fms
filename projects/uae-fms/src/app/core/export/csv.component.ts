import { settings } from "cluster";
import { saveAs } from "file-saver";

export class CSVExport {
  private data: any[];
  private settings: CSVExportSettings;

  constructor(data: any[], settings: CSVExportSettings) {
    this.data = data;
    this.settings = settings;
  }

  public export(fileName?, header?) {
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

    saveAs(new Blob([outStr]), (fileName ? fileName : 'file') + '.csv');
  }
}

export interface CSVExportSettings {
  columns: CSVExportColumn[];
}

export interface CSVExportColumn {
  title: string;
  field: string;
}
