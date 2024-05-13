import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  listaLivros: [];
  campoBusca: string = ''
  subscription: Subscription

  constructor(private service: LivroService) { }


  buscarLivros() {
    this.subscription = this.service.buscar(this.campoBusca).subscribe({
      next: resultado => console.log(),
      error: erro => console.log(erro),
      complete: () => console.log('completado')
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}



