import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EMPTY, Subscription, catchError, debounceTime, filter, map, of, switchMap, throwError } from 'rxjs';
import { Livro, LivrosResultado } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

const TEMPOESPERA = 300;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  mensagemErro: string = '';
  campoBusca = new FormControl;
  livrosResultado: LivrosResultado;

  totalDeLivros$ = this.campoBusca.valueChanges
    .pipe(
        debounceTime(TEMPOESPERA),
        filter((valorDigitado) => valorDigitado.length >= 3),
        switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
        map(resultado => this.livrosResultado = resultado),
        catchError(erro => {
            console.log(erro)
            return of()
        })
    )

  constructor(private service: LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(TEMPOESPERA),
    filter((valorDigitado) => valorDigitado.length > 3),
    switchMap((valorDigitaCompleto)=> this.service.buscar(valorDigitaCompleto)),
    map(resultado => this.livrosResultado = resultado),
    map(retorno => retorno.items ?? []),
    map((itens) => this.livrosResultadoParaLivros(itens)),
    catchError((erro) => {
      console.log(erro)
      return throwError(() => new Error(this.mensagemErro ='Ops, ocorreu um erro. Recarregue a aplicação!'))
    })
  )

  livrosResultadoParaLivros(items): LivroVolumeInfo[] {
    return items.map((item: any) => new LivroVolumeInfo(item))
  }
}



