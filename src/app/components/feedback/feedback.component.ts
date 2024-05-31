import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, Renderer2, ViewChildren } from '@angular/core';

@Component({
  selector: 'feedback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css',
})
export class FeedbackComponent {
  @ViewChildren('starIcon') starIcons!: QueryList<ElementRef>;
  private globalClickListener: (() => void) | undefined;

  constructor(private renderer: Renderer2) {}

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

    if (classStar.contains('star-icon') && !classStar.contains('ativo')) {
      this.clearActiveStars();
      this.renderer.addClass(target, 'ativo');
    }
  }

  clearActiveStars() {
    this.starIcons.forEach(star => {
      this.renderer.removeClass(star.nativeElement, 'ativo');
    });
  }
}
