import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  emailUsuarioLogado = localStorage.getItem("emailUsuarioLogado");


  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  EfetuarLogout():void{
    localStorage.clear();
    this.router.navigate(['usuario/loginusuario']);
  }


}
