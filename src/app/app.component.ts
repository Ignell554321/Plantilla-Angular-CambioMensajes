import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RespuestaConsulta } from 'src/entidades/respuesta-consulta';
import { CrudService } from 'src/servicios/crud.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  textoNuevo1:String='';
  textoNuevo2:String='';
  canal:String='';
  respuesta:RespuestaConsulta=new RespuestaConsulta();
  ocultarTexto2:boolean=false;
  ocultarResultado:boolean=false;

  constructor(private crudSevice:CrudService, private formBuilder: FormBuilder){}

  public formGroup: FormGroup = this.formBuilder.group({
    evento:['RECARGA',Validators.required],
    campania:['NA',Validators.required],
    canal:['SMS',Validators.required],
    origen:['',Validators.required],
    monto:['',Validators.required],
    estadoWL:['NOWL',Validators.required],
    sistemaOpe:['OTRO',Validators.required],
    horario:['TS',Validators.required],
    dia:['TS',Validators.required],
    feriado:['TS',Validators.required]
  });


  ngOnInit(): void {}

  title = 'APP2';

  buscar(){

    $('#loading').fadeIn('slow');
    const data = this.formGroup?.value;
    console.log(data);
    this.ocultarResultado=false;

    this.crudSevice.buscar(data).subscribe(res=>{
      console.log(res);

      if(res.codResultado===0){

        this.ocultarTexto2=this.canal==='SATMOB'?true:false;
        this.ocultarResultado=!this.ocultarResultado;
        this.respuesta.codPromo=res.codPromo;
        this.respuesta.mensaje1=res.mensaje1;
        this.respuesta.antiguedad=res.antiguedad;
        this.respuesta.mensaje2=res.mensaje2;
        this.respuesta.antiguedad2=res.antiguedad2;

        $('#loading').fadeOut('slow');
      }
      else{

        $('#loading').fadeOut('slow');
          alert("No existen datos");
      }

    })

  }

  actualizar(){

    $('#loading').fadeIn('slow');
    let resultado= confirm("¿Seguro que desea actualizar la informacion?");
   
    //this.form.controls['your form control name'].value

    if(resultado){
    
      let data={
        "codPromo":this.respuesta.codPromo,
        "mensaje1":this.textoNuevo1,
        "antiguedad":this.respuesta.antiguedad,
        "mensaje2": this.textoNuevo2,
        "antiguedad2":this.respuesta.antiguedad2,
        "canal":this.formGroup.controls['canal'].value
      }
     
      this.crudSevice.actualizar(data).subscribe(res=>{

        console.log(res);
      });

      this.ocultarResultado=false;
      this.textoNuevo1='';
      this.textoNuevo2='';
      this.respuesta=new RespuestaConsulta();
      alert("Modificado corectamente");
      $('#loading').fadeOut('slow');

    }else{
      this.cancelar();
    }

  }

  cancelar(){

    this.ocultarResultado=false;
    this.textoNuevo1='';
    this.textoNuevo2='';
    this.respuesta=new RespuestaConsulta();

  }

  evaluarCanal(event:any){

    this.canal=event.target.value;
    
  }

  habilitarUpdate():boolean{

    return (this.formGroup.controls['canal'].value==='SATMOB') ? (this.textoNuevo1==='' || this.textoNuevo2==='') ? true : false  : (this.textoNuevo1==='') ? true : false;


  }


}
