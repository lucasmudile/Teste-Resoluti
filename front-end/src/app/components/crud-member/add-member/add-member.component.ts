import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { addPerson, address, contat } from 'src/app/interfaces/Person';
import { PersonService } from 'src/app/services/person/person.service';



@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {




  contactFields: any[] = [];
  addresseis: any[] = [];


  name: string = ""
  surName: string = ""
  birthDate: string = ""
  email: string = ""
  cpf: string = ""
  rg: string = ""
  addresses: address[] = [];
  contats: contat[] = []
  complement: string = ''



  constructor(private _router: Router,
    private personService:PersonService,
    private toastr: ToastrService) {

  }

  ngOnInit(): void { }

  onBack(): void {
    this._router.navigate(['/flexy/home']);
  }

  savePerson() {

    //Validar se todos os campos do contato foram preeenchidos
    const quantityOfProprieties = this.contactFields.map(obj => Object.keys(obj).length);

    for (let index = 0; index < quantityOfProprieties.length; index++) {
      if (quantityOfProprieties[index] !== 3) {
        console.log(quantityOfProprieties[index])
        this.toastr.error("Preenche todos os campos", 'Mensagem');
        return;
      }
    }

    //Validar se todos os campos do endereço foram preeenchidos
    const enderecoQuantityOfProprieties = this.addresseis.map(obj => Object.keys(obj).length);

    for (let index = 0; index < enderecoQuantityOfProprieties.length; index++) {
      if (enderecoQuantityOfProprieties[index] !== 6) {
        console.log(enderecoQuantityOfProprieties[index])
        this.toastr.error("Preenche todos os campos", 'Mensagem');
        return;
      }
    }

    //Adicionar os endereços em lista para enviar na api
    this.addAddressIntoList(this.addresseis);
    //Adicionar os contato em lista para enviar na api
    this.addContatIntoList(this.contactFields);



    if (this.name == "") {
      this.toastr.error("Introduza o nome", 'Mensagem');
      return;
    }

    if (this.surName == "") {
      this.toastr.error("Introduza o Sobre nome", 'Mensagem');
      return;
    }

    if (this.birthDate == "") {
      this.toastr.error("Introduza a data de nascimento", 'Mensagem');
      return;
    }

    if (this.email == "") {
      this.toastr.error("Introduza o email", 'Mensagem');
      return;
    }

    if (this.cpf == "") {
      this.toastr.error("Introduza o cpf", 'Mensagem');
      return;
    }

    if (this.rg == "") {
      this.toastr.error("Introduza o RG", 'Mensagem');
      return;
    }


     const addPerson: addPerson = {
       name: this.name,
       surname:this.surName,
       birthDate:this.birthDate,
       cpf:this.cpf,
       email:this.email,
       rg:this.rg,
       addresses:this.addresses,
       contacts:this.contats,
       userId:localStorage.getItem('id')
     }
 
     this.personService.addPerson(addPerson)
       .subscribe((response) => {
         this.toastr.success(response.message, 'Mensagem!');
         this.desappearAfterAdd();
       },
         (error) => {
          console.log(error)
           this.toastr.error(error.error.Message, 'Messagem !');
         });

  }



  desappearAfterAdd() {
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }



  addField() {
    // Adiciona um novo objeto vazio à lista
    this.contactFields.push({});
  }

  removeField(index: number) {
    // Remove o conjunto de campos com base no índice
    this.contactFields.splice(index, 1);
  }



  addAddress() {
    this.addresseis.push({}); // Adiciona um novo objeto ao array
  }

  removeAddress(index: number) {
    this.addresseis.splice(index, 1); // Remove o endereço pelo índice
  }


  addAddressIntoList(adresses: any) {

    this.addresses=[]
    for (let index = 0; index < adresses.length; index++) {

      const address: address = {
        city: adresses[index].city,
        cep: adresses[index].zipCode,
        complemento: adresses[index].complement,
        number: adresses[index].number,
        state: adresses[index].state,
        street: adresses[index].street
      }

      this.addresses.push(address)
    }

  }

  addContatIntoList(contats: any) {

    this.contats = []
    for (let index = 0; index < contats.length; index++) {

      const contat: contat = {
        name: contats[index].name,
        contactNumber: contats[index].contactNumber,
        type: contats[index].type,
      }
      this.contats.push(contat)
    }
  }

}
