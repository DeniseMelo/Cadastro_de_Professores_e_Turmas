import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  botao100 : boolean = true
  botao50 : boolean = true
  botao0 : boolean = true
  constructor() { }

  ngOnInit(): void {
    this.reload()
  }
  clickBotao100(): void {
      if (this.botao100 == false){
        this.botao100 = true
      }else{
        this.botao100 = false
      }
      }
  clickBotao50(): void {
    if (this.botao50 == false){
      this.botao50 = true
    }else{
      this.botao50 = false
    }
    console.log(this.botao50)
      }
  clickBotao0(): void {
    if (this.botao0 == false){
      this.botao0 = true
    }else{
      this.botao0 = false
    }
      }

      reload(){
        if(localStorage.getItem("reload") == "true"){
          localStorage.setItem("reload", "false");
          document.location.reload();
        }
      }


}
