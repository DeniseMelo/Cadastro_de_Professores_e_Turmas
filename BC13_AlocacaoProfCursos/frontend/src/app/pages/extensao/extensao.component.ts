import { ActivatedRoute } from '@angular/router';
import { ExtensaoService } from './../../services/extensao.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Extensao } from './components/model/extensao';

@Component({
  selector: 'app-extensao',
  templateUrl: './extensao.component.html',
  styleUrls: ['./extensao.component.css']
})
export class ExtensaoComponent implements OnInit {
idExtensao!: number | null
extensao!:Extensao

  constructor(
    private route: ActivatedRoute,
    private extensaoService: ExtensaoService

  ) { }

  ngOnInit(): void {
    this.idExtensao = parseInt(this.route.snapshot.paramMap.get('idExtensao') || '')

    this.extensaoService.getExtensaoById(this.idExtensao)
    .subscribe(
      (element) => {
        this.extensao = element
      }
    )
  }
  }

