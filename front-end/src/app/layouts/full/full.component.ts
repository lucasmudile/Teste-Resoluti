import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent {

  search: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private route:Router) { 

  }

  getRoles:any  = localStorage.getItem('roles');
  roles : any = JSON.parse(this.getRoles);
  routerActive: string = "activelink";
  name:string | null = "";
  

  sidebarMenu: sidebarMenu[] = [
    {
      link: "/home",
      icon: "home",
      menu: "Dashboard",
    },
    {
      link: "/add-member",
      icon: "layout",
      menu: "Cadastrar Pessoa",
    },{
      link: "/list-member",
      icon: "file-text",
      menu: "Listar Pessoa",
    },
    {
      link: "/list-user",
      icon: "user",
      menu: "Usuario",
    }
  ]



  //Stating code
  isMenuVisible=false;
  showLoginPage=false;


  ngDoCheck(): void {
    let currentroute = this.route.url;
    if (currentroute == '/login' || currentroute == '/register') {
      this.isMenuVisible = false
      this.showLoginPage = true;
    } else {
      this.isMenuVisible = true
    }

    this.name = localStorage.getItem('userName');

  }

  logOut(){
    localStorage.clear();
    this.route.navigateByUrl('/login');
  }



}
