import { Component } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  public files: NgxFileDropEntry[] = [];
  datainfo=[];
  settings = {
    parts : [
        {title : "Departamento", id : 1},
        {title : "Provincia", id : 2},
        {title : "Distrito", id : 3}
      ]
   };
  result=[];
  arrayDepa=[];
  listProv = [];
  listDepa = [];
  listDist = [];
  ubigeo=[];
  
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          var read = new FileReader();
          read.onloadend = (e) => {
            let data=read.result.toString();
            console.log("Data de archivo:",data);
            let linesAll = data.split("\n");
            console.log("Todas las lineas",linesAll);
            let lines=linesAll.map((e) => e.substring(2, e.length-2));
            console.log("Lineas: ",lines);
            this.datainfo = lines.map( (line) => {
            //  let lin=line.toString();
              let resultLine = line.split("/");
              let list = [];
              console.log("Resultado linea separado por (/):",resultLine);
                  for(let element of resultLine){
                      if (element.trim()!= ""){
                        list.push(element.trim());
                      } 
                  }
              return list;
             });
          console.log("Data limpia:",this.datainfo);
            this.ubigeo = this.settings.parts.map( (part) => {
              let datitos=this.datainfo.filter( (element) => {
                  return element.length == part.id;
                })
                return datitos;
            });
           console.log("DATOS:", this.ubigeo);
            this.departament(this.ubigeo[0]);
            this.province(this.ubigeo[1]);
            this.district(this.ubigeo[2]);  
         };
         read.readAsText(file);
          console.log("Nombre del archivo",droppedFile.relativePath);
          console.log("Archivo:",file);
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
 
public departament(ubigeo){
    let depacod = ubigeo.map( (depa) => {
         let part=depa[0].substring(0,1)
          return part;
         });
    let depanom = ubigeo.map( (depa) => {
        let part=depa[0].substring(1,depa[0].length)
          return part;
    });
    for (var i = 0; i < depacod.length; i++) {
            this.listDepa.push({
            "codigo":'0'+depacod[i],
            "nombre": depanom[i],
            "codpadre": '-',
            "despadre": '-'
          });
      };
    console.log("arreglo de departamentos", this.listDepa);
  }

public province(ubigeo){
  let procod = ubigeo.map( (prov) => {
       let part=prov[1].substring(0,2)
        return part;
       });
  let pronom= ubigeo.map( (prov) => {
       let part=prov[1].substring(2,prov[1].length)
       return part;
       });
  let procodpadre = ubigeo.map( (prov) => {
   let part=prov[0].substring(0,1)
       return part;
       });
  let pronompadre= ubigeo.map( (prov) => {
   let part=prov[0].substring(1,prov[1].length)
       return part;
      });

  for (var i = 0; i < procod.length; i++) {
          this.listProv.push({
          "codigo": procod[i],
          "nombre": pronom[i],
          "codpadre":'0'+ procodpadre[i],
          "despadre": pronompadre[i]
        });
    };
  console.log("arreglo de provincias", this.listProv);
}

public district(ubigeo){
  let discod = ubigeo.map( (dis) => {
       let part=dis[2].substring(0,3)
        return part;
       });
  let disnom= ubigeo.map( (dis) => {
       let part=dis[2].substring(3,dis[2].length)
       return part;
       });
  let discodpadre = ubigeo.map( (dis) => {
   let part=dis[1].substring(0,2)
       return part;
       });
  let disnompadre= ubigeo.map( (dis) => {
   let part=dis[1].substring(2,dis[1].length)
       return part;
      });
  for (var i = 0; i < discod.length; i++) {
          this.listDist.push({
          "codigo": discod[i],
          "nombre": disnom[i],
          "codpadre": discodpadre[i],
          "despadre": disnompadre[i]
        });
    };
 console.log("arreglo de distritos", this.listDist);
}
  // public fileOver(event){
  //   console.log(event);
  // }
 
  // public fileLeave(event){
  //   console.log(event);
  // }
}
