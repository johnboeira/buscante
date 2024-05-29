import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, catchError, debounceTime, filter, map, switchMap, throwError } from 'rxjs';
import { Livro } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

const TEMPOESPERA = 300;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  campoBusca = new FormControl;

  constructor(private service: LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(TEMPOESPERA),
    filter((valorDigitado) => valorDigitado.length > 3),
    switchMap((valorDigitaCompleto)=> this.service.buscar(valorDigitaCompleto)),
    map((itens) =>
      this.livrosResultadoParaLivros(itens)
    ),
    catchError(erro => {
      console.log(erro)
      return throwError(() => new Error('Ops um erro!'))
    }

    )
  )

  livrosResultadoParaLivros(items): LivroVolumeInfo[] {
    return items.map((item: any) => new LivroVolumeInfo(item))
  }
}



