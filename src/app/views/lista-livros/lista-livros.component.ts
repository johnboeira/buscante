import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, map, switchMap } from 'rxjs';
import { Livro } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  listaLivros: Livro[] = [];
  campoBusca = new FormControl;
  subscription: Subscription
  livro: Livro

  constructor(private service: LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    switchMap((valorDigitaCompleto)=> this.service.buscar(valorDigitaCompleto)),
    map((itens) =>{
      this.listaLivros = this.livrosResultadoParaLivros(itens)
    })
  )

  // buscarLivros() {
  //   this.subscription = this.service.buscar(this.campoBusca).subscribe({
  //     next: (resultado) => { this.listaLivros = this.livrosResultadoParaLivros(resultado)  },
  //     error: erro => console.log(erro),
  //     complete: () => console.log('completado')
  //   })
  // }

  livrosResultadoParaLivros(items): LivroVolumeInfo[] {

    return items.map((item: any) => new LivroVolumeInfo(item))

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}



