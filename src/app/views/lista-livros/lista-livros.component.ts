import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, filter, map, switchMap } from 'rxjs';
import { Livro } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  campoBusca = new FormControl;

  constructor(private service: LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    filter((valorDigitado) => valorDigitado.length > 3),
    switchMap((valorDigitaCompleto)=> this.service.buscar(valorDigitaCompleto)),
    map((itens) =>
      this.livrosResultadoParaLivros(itens)
    )
  )

  livrosResultadoParaLivros(items): LivroVolumeInfo[] {
    return items.map((item: any) => new LivroVolumeInfo(item))
  }
}



