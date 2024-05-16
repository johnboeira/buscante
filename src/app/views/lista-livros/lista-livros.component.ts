import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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
  campoBusca: string = ''
  subscription: Subscription
  livro: Livro

  constructor(private service: LivroService) { }


  buscarLivros() {
    this.subscription = this.service.buscar(this.campoBusca).subscribe({
      next: (resultado) => { this.listaLivros = this.livrosResultadoParaLivros(resultado)  },
      error: erro => console.log(erro),
      complete: () => console.log('completado')
    })
  }

  livrosResultadoParaLivros(items): LivroVolumeInfo[] {

    return items.map((item: any) => new LivroVolumeInfo(item))

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}



