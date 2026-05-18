import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

/**
 * Minimal geometric line-icon set referenced by name.
 * Used by Service cards. Strokes inherit currentColor.
 */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault],
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <ng-container [ngSwitch]="name">
        <g *ngSwitchCase="'chart'">
          <rect x="6" y="6" width="36" height="36" rx="1"></rect>
          <path d="M12 32 L20 24 L26 28 L36 16"></path>
          <circle cx="12" cy="32" r="1.2" fill="currentColor"></circle>
          <circle cx="20" cy="24" r="1.2" fill="currentColor"></circle>
          <circle cx="26" cy="28" r="1.2" fill="currentColor"></circle>
          <circle cx="36" cy="16" r="1.2" fill="currentColor"></circle>
        </g>
        <g *ngSwitchCase="'compass'">
          <circle cx="24" cy="24" r="18"></circle>
          <path d="M18 30 L26 22 L30 18 L22 26 Z"></path>
          <circle cx="24" cy="24" r="1.5" fill="currentColor"></circle>
        </g>
        <g *ngSwitchCase="'search'">
          <circle cx="21" cy="21" r="13"></circle>
          <path d="M31 31 L42 42"></path>
          <path d="M17 21 H25 M21 17 V25" opacity="0.6"></path>
        </g>
        <g *ngSwitchCase="'document'">
          <path d="M12 6 H30 L36 12 V42 H12 Z"></path>
          <path d="M30 6 V12 H36"></path>
          <path d="M18 22 H30 M18 28 H30 M18 34 H24"></path>
        </g>
        <g *ngSwitchCase="'calendar'">
          <rect x="6" y="10" width="36" height="32" rx="1"></rect>
          <path d="M6 18 H42"></path>
          <path d="M16 6 V14 M32 6 V14"></path>
          <rect x="14" y="24" width="4" height="4"></rect>
          <rect x="22" y="24" width="4" height="4"></rect>
          <rect x="30" y="24" width="4" height="4"></rect>
          <rect x="14" y="32" width="4" height="4"></rect>
          <rect x="22" y="32" width="4" height="4"></rect>
        </g>
        <g *ngSwitchCase="'sparkle'">
          <path d="M24 6 L26 20 L40 24 L26 28 L24 42 L22 28 L8 24 L22 20 Z"></path>
          <path d="M38 8 L39 12 L43 13 L39 14 L38 18 L37 14 L33 13 L37 12 Z" opacity="0.6"></path>
        </g>
        <g *ngSwitchDefault>
          <circle cx="24" cy="24" r="18"></circle>
          <path d="M16 24 H32 M24 16 V32"></path>
        </g>
      </ng-container>
    </svg>
  `,
})
export class IconComponent {
  @Input({ required: true }) name: string = '';
  @Input() size: number = 36;
}
