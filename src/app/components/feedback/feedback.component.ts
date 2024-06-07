import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, QueryList, Renderer2, ViewChildren, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnviarFeedbackService } from '../../services/enviar-feedback.service';
import { FeedbackForm } from './../../interface/feedbackform';

@Component({
  selector: 'feedback',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [EnviarFeedbackService],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css',
})
export class FeedbackComponent {
  isModalOpen = signal(false);
  btnConfirma = signal(false);
  valueStar = signal(true);
  closeAvaliacao = signal(false);
  loading = signal(false);
  modalMensagemEnviada = signal(false);
  disableBtnEnviar = false

  @ViewChildren('starIcon') starIcons!: QueryList<ElementRef>;
  private globalClickListener: (() => void) | undefined;

  feedbackForm: FormGroup<FeedbackForm>;

  constructor(private renderer: Renderer2, private enviarFeedbackService: EnviarFeedbackService) {
    this.feedbackForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      comment: new FormControl('', [Validators.required]),
      star: new FormControl('', [Validators.required]),
    });
  }

  criarFeedback() {
    if (this.feedbackForm.valid &&  !this.disableBtnEnviar) {
      this.loading.set(true);
      this.disableBtnEnviar = true//desabilitar o button enviar, quando voce clica
      this.enviarFeedbackService.enviarFeedback(this.feedbackForm.value).subscribe(_ => {
        this.feedbackForm.reset();
        this.loading.set(false);
        this.isModalOpen.set(false);
        this.btnCloseStar();


        this.modalMensagemEnviada.set(true);
        setTimeout(() => {
          this.modalMensagemEnviada.set(false);
        }, 3000);
      });
      
    }
  }

  ngAfterViewInit() {
    this.globalClickListener = this.renderer.listen('document', 'click', event => this.onDocumentClick(event));
  }

  ngOnDestroy() {
    if (this.globalClickListener) {
      this.globalClickListener();
    }
  }

  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const classStar = target.classList;
    const valor = target.getAttribute('value'); //pegando o valor os <li>

    if (valor) {
      this.btnConfirma.set(true);
      this.valueStar.set(true);
    }

    if (classStar.contains('star-icon') && !classStar.contains('ativo')) {
      this.clearActiveStars();
      this.renderer.addClass(target, 'ativo');
    }
    // pegando o valor da star e passando para o formGroup
    if (valor) {
      this.feedbackForm.get('star')?.setValue(valor);
    }
  }

  clearActiveStars() {
    this.starIcons.forEach(star => {
      this.renderer.removeClass(star.nativeElement, 'ativo');
    });
  }

  modalOpen() {
    this.isModalOpen.set(true);
  }
  modalClose() {
    this.isModalOpen.set(false);
    this.btnCloseStar();
  }
  //
  btnOpenStarConfirm() {
    this.btnConfirma.set(false);
    this.valueStar.set(true);
    this.closeAvaliacao.set(true);
  }
  btnCloseStar() {
    this.btnConfirma.set(false);
    this.valueStar.set(false);
    this.closeAvaliacao.set(false);
  }
}
