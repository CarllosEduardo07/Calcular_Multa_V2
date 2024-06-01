import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, QueryList, Renderer2, ViewChildren, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EnviarFeedbackService } from '../../services/enviar-feedback.service';
import { DialogComponent } from '../dialog/dialog.component';
import { FeedbackForm } from './../../interface/feedbackform';

@Component({
  selector: 'feedback',
  standalone: true,
  imports: [CommonModule, DialogComponent, ReactiveFormsModule, HttpClientModule],
  providers: [EnviarFeedbackService],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css',
})
export class FeedbackComponent {
  isModalOpen = signal(false);
  btnConfirma = signal(false);
  valueStar = signal(false);
  closeAvaliacao = signal(false);

  @ViewChildren('starIcon') starIcons!: QueryList<ElementRef>;
  private globalClickListener: (() => void) | undefined;

  feedbackForm: FormGroup<FeedbackForm>;
  feedback: Array<FeedbackForm> = [];

  constructor(private renderer: Renderer2, private enviarFeedbackService: EnviarFeedbackService) {
    this.feedbackForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      comment: new FormControl(''),
      star: new FormControl(''),
    });
  }

  criarFeedback() {
    if (this.feedbackForm.valid) {
      this.enviarFeedbackService.enviarFeedback(this.feedbackForm.value).subscribe(_ => {
        this.feedbackForm.reset();
        this.isModalOpen.set(false);
        this.btnCloseStar()
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
    this.btnCloseStar()
  }
  //
  btnOpenStarConfirm() {
    this.btnConfirma.set(false);
    this.valueStar.set(true);
    this.closeAvaliacao.set(true);
  }
  btnCloseStar(){
    this.btnConfirma.set(false);
    this.valueStar.set(false);
    this.closeAvaliacao.set(false);
  }
}
