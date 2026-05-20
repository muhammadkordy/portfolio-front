import { Component, Input } from '@angular/core';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

@Component({
  selector: 'app-gallery-placeholder',
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault],
  template: `
    <div class="ph" [ngSwitch]="type">

      <!-- DASHBOARD -->
      <ng-container *ngSwitchCase="'dashboard'">
        <svg viewBox="0 0 340 176" xmlns="http://www.w3.org/2000/svg" class="ph-svg">
          <!-- bg -->
          <rect width="340" height="176" fill="#0E1B35"/>
          <!-- gold accent bar -->
          <rect width="340" height="3" fill="#C8A96E"/>
          <!-- grid lines -->
          <line x1="0" y1="50" x2="340" y2="50" stroke="#ffffff" stroke-opacity=".05"/>
          <line x1="0" y1="90" x2="340" y2="90" stroke="#ffffff" stroke-opacity=".05"/>
          <line x1="0" y1="130" x2="340" y2="130" stroke="#ffffff" stroke-opacity=".05"/>
          <!-- header row -->
          <rect x="14" y="12" width="90" height="7" rx="2" fill="#ffffff" fill-opacity=".12"/>
          <rect x="14" y="23" width="55" height="5" rx="2" fill="#C8A96E" fill-opacity=".5"/>
          <!-- KPI cards -->
          <rect x="14" y="38" width="72" height="42" rx="2" fill="#ffffff" fill-opacity=".05" stroke="#ffffff" stroke-opacity=".08"/>
          <rect x="20" y="44" width="28" height="4" rx="1" fill="#ffffff" fill-opacity=".25"/>
          <rect x="20" y="52" width="44" height="12" rx="1" fill="#C8A96E" fill-opacity=".7"/>
          <rect x="20" y="68" width="36" height="3" rx="1" fill="#ffffff" fill-opacity=".15"/>

          <rect x="96" y="38" width="72" height="42" rx="2" fill="#ffffff" fill-opacity=".05" stroke="#ffffff" stroke-opacity=".08"/>
          <rect x="102" y="44" width="28" height="4" rx="1" fill="#ffffff" fill-opacity=".25"/>
          <rect x="102" y="52" width="44" height="12" rx="1" fill="#ffffff" fill-opacity=".6"/>
          <rect x="102" y="68" width="36" height="3" rx="1" fill="#ffffff" fill-opacity=".15"/>

          <rect x="178" y="38" width="72" height="42" rx="2" fill="#ffffff" fill-opacity=".05" stroke="#ffffff" stroke-opacity=".08"/>
          <rect x="184" y="44" width="28" height="4" rx="1" fill="#ffffff" fill-opacity=".25"/>
          <rect x="184" y="52" width="44" height="12" rx="1" fill="#ffffff" fill-opacity=".6"/>
          <rect x="184" y="68" width="36" height="3" rx="1" fill="#ffffff" fill-opacity=".15"/>

          <!-- chart label -->
          <rect x="14" y="95" width="80" height="4" rx="1" fill="#ffffff" fill-opacity=".2"/>
          <!-- bars -->
          <rect x="30"  y="140" width="18" height="22" rx="1" fill="#ffffff" fill-opacity=".18"/>
          <rect x="58"  y="125" width="18" height="37" rx="1" fill="#ffffff" fill-opacity=".3"/>
          <rect x="86"  y="112" width="18" height="50" rx="1" fill="#ffffff" fill-opacity=".42"/>
          <rect x="114" y="100" width="18" height="62" rx="1" fill="#ffffff" fill-opacity=".55"/>
          <rect x="142" y="109" width="18" height="53" rx="1" fill="#C8A96E" fill-opacity=".85"/>
          <!-- line chart area (right panel) -->
          <rect x="200" y="95" width="126" height="70" rx="2" fill="#ffffff" fill-opacity=".04" stroke="#ffffff" stroke-opacity=".07"/>
          <polyline points="208,152 228,138 254,130 278,118 306,110 318,105" fill="none" stroke="#C8A96E" stroke-width="1.5" stroke-opacity=".75"/>
          <circle cx="228" cy="138" r="2.5" fill="#C8A96E"/>
          <circle cx="278" cy="118" r="2.5" fill="#C8A96E"/>
          <circle cx="318" cy="105" r="3" fill="#C8A96E"/>
          <!-- CONFIDENTIAL watermark -->
          <text x="170" y="174" text-anchor="middle" font-family="monospace" font-size="7" fill="#ffffff" fill-opacity=".12" letter-spacing="3">CONFIDENTIAL · ANONYMISED</text>
        </svg>
      </ng-container>

      <!-- REPORT -->
      <ng-container *ngSwitchCase="'report'">
        <svg viewBox="0 0 340 176" xmlns="http://www.w3.org/2000/svg" class="ph-svg">
          <rect width="340" height="176" fill="#F7F5F0"/>
          <!-- header band -->
          <rect width="340" height="32" fill="#0E1B35"/>
          <rect x="14" y="10" width="100" height="7" rx="1" fill="#ffffff" fill-opacity=".7"/>
          <rect x="14" y="21" width="60" height="4" rx="1" fill="#C8A96E" fill-opacity=".8"/>
          <!-- gold top accent -->
          <rect width="340" height="3" fill="#C8A96E"/>
          <!-- body text lines -->
          <rect x="14" y="42" width="60" height="4" rx="1" fill="#0E1B35" fill-opacity=".35"/>
          <rect x="14" y="50" width="220" height="3" rx="1" fill="#0E1B35" fill-opacity=".12"/>
          <rect x="14" y="57" width="200" height="3" rx="1" fill="#0E1B35" fill-opacity=".12"/>
          <rect x="14" y="64" width="240" height="3" rx="1" fill="#0E1B35" fill-opacity=".12"/>
          <rect x="14" y="71" width="180" height="3" rx="1" fill="#0E1B35" fill-opacity=".12"/>
          <!-- divider -->
          <line x1="14" y1="81" x2="326" y2="81" stroke="#0E1B35" stroke-opacity=".1"/>
          <!-- section 2 -->
          <rect x="14" y="88" width="70" height="4" rx="1" fill="#0E1B35" fill-opacity=".3"/>
          <rect x="14" y="97" width="100" height="58" rx="2" fill="#0E1B35" fill-opacity=".05" stroke="#0E1B35" stroke-opacity=".1"/>
          <!-- mini bar chart inside box -->
          <rect x="24" y="133" width="10" height="15" rx="1" fill="#0E1B35" fill-opacity=".2"/>
          <rect x="38" y="125" width="10" height="23" rx="1" fill="#0E1B35" fill-opacity=".3"/>
          <rect x="52" y="118" width="10" height="30" rx="1" fill="#0E1B35" fill-opacity=".4"/>
          <rect x="66" y="121" width="10" height="27" rx="1" fill="#C8A96E" fill-opacity=".7"/>
          <rect x="80" y="113" width="10" height="35" rx="1" fill="#C8A96E" fill-opacity=".5"/>

          <rect x="124" y="97" width="202" height="4" rx="1" fill="#0E1B35" fill-opacity=".12"/>
          <rect x="124" y="105" width="180" height="3" rx="1" fill="#0E1B35" fill-opacity=".09"/>
          <rect x="124" y="112" width="200" height="3" rx="1" fill="#0E1B35" fill-opacity=".09"/>
          <rect x="124" y="119" width="150" height="3" rx="1" fill="#0E1B35" fill-opacity=".09"/>
          <rect x="124" y="126" width="190" height="3" rx="1" fill="#0E1B35" fill-opacity=".09"/>
          <rect x="124" y="133" width="160" height="3" rx="1" fill="#0E1B35" fill-opacity=".09"/>
          <!-- footer -->
          <line x1="14" y1="162" x2="326" y2="162" stroke="#0E1B35" stroke-opacity=".1"/>
          <text x="14" y="172" font-family="monospace" font-size="6.5" fill="#0E1B35" fill-opacity=".25" letter-spacing="1.5">CONFIDENTIAL · CLIENT DATA ABSTRACTED</text>
        </svg>
      </ng-container>

      <!-- PRESENTATION -->
      <ng-container *ngSwitchCase="'presentation'">
        <svg viewBox="0 0 340 176" xmlns="http://www.w3.org/2000/svg" class="ph-svg">
          <rect width="340" height="176" fill="#111827"/>
          <rect width="340" height="3" fill="#C8A96E"/>
          <!-- slide frame -->
          <rect x="20" y="14" width="300" height="148" rx="2" fill="#0E1B35" stroke="#ffffff" stroke-opacity=".08"/>
          <!-- slide top accent line -->
          <rect x="20" y="14" width="300" height="2" fill="#C8A96E" fill-opacity=".5"/>
          <!-- eyebrow -->
          <rect x="36" y="26" width="48" height="3" rx="1" fill="#C8A96E" fill-opacity=".7"/>
          <!-- title lines -->
          <rect x="36" y="33" width="190" height="9" rx="1" fill="#ffffff" fill-opacity=".7"/>
          <rect x="36" y="46" width="140" height="9" rx="1" fill="#ffffff" fill-opacity=".5"/>
          <!-- divider -->
          <rect x="36" y="61" width="40" height="2" fill="#C8A96E" fill-opacity=".6"/>
          <!-- body content cols -->
          <rect x="36"  y="72" width="86" height="68" rx="2" fill="#ffffff" fill-opacity=".05" stroke="#ffffff" stroke-opacity=".1"/>
          <rect x="44"  y="79" width="50" height="4"  rx="1" fill="#C8A96E" fill-opacity=".5"/>
          <rect x="44"  y="87" width="70" height="3"  rx="1" fill="#ffffff" fill-opacity=".2"/>
          <rect x="44"  y="93" width="65" height="3"  rx="1" fill="#ffffff" fill-opacity=".2"/>
          <rect x="44"  y="99" width="72" height="3"  rx="1" fill="#ffffff" fill-opacity=".2"/>
          <rect x="44" y="110" width="60" height="22" rx="1" fill="#C8A96E" fill-opacity=".12" stroke="#C8A96E" stroke-opacity=".25"/>

          <rect x="134" y="72" width="86" height="68" rx="2" fill="#ffffff" fill-opacity=".05" stroke="#ffffff" stroke-opacity=".1"/>
          <rect x="142" y="79" width="50" height="4"  rx="1" fill="#ffffff" fill-opacity=".4"/>
          <rect x="142" y="87" width="70" height="3"  rx="1" fill="#ffffff" fill-opacity=".2"/>
          <rect x="142" y="93" width="65" height="3"  rx="1" fill="#ffffff" fill-opacity=".2"/>
          <rect x="142" y="99" width="72" height="3"  rx="1" fill="#ffffff" fill-opacity=".2"/>
          <!-- mini donut ring -->
          <circle cx="168" cy="124" r="14" fill="none" stroke="#ffffff" stroke-opacity=".15" stroke-width="8"/>
          <circle cx="168" cy="124" r="14" fill="none" stroke="#C8A96E" stroke-opacity=".7" stroke-width="8" stroke-dasharray="44 44" stroke-dashoffset="11"/>

          <rect x="232" y="72" width="86" height="68" rx="2" fill="#ffffff" fill-opacity=".05" stroke="#ffffff" stroke-opacity=".1"/>
          <rect x="240" y="79" width="50" height="4"  rx="1" fill="#ffffff" fill-opacity=".4"/>
          <!-- mini bars -->
          <rect x="244" y="121" width="10" height="14" rx="1" fill="#ffffff" fill-opacity=".2"/>
          <rect x="258" y="112" width="10" height="23" rx="1" fill="#ffffff" fill-opacity=".35"/>
          <rect x="272" y="105" width="10" height="30" rx="1" fill="#C8A96E" fill-opacity=".7"/>
          <rect x="286" y="109" width="10" height="26" rx="1" fill="#ffffff" fill-opacity=".2"/>
          <!-- slide number -->
          <text x="310" y="158" font-family="monospace" font-size="7" fill="#ffffff" fill-opacity=".2">01 / 12</text>
        </svg>
      </ng-container>

      <!-- BUDGET -->
      <ng-container *ngSwitchCase="'budget'">
        <svg viewBox="0 0 340 176" xmlns="http://www.w3.org/2000/svg" class="ph-svg">
          <rect width="340" height="176" fill="#FAFAF7"/>
          <rect width="340" height="3" fill="#C8A96E"/>
          <!-- header row -->
          <rect width="340" height="26" y="3" fill="#F0EDE6"/>
          <rect x="14" y="10" width="70" height="5" rx="1" fill="#0E1B35" fill-opacity=".5"/>
          <rect x="258" y="10" width="70" height="5" rx="1" fill="#C8A96E" fill-opacity=".7"/>
          <!-- col headers -->
          <rect x="14"  y="32" width="80" height="4" rx="1" fill="#0E1B35" fill-opacity=".3"/>
          <rect x="120" y="32" width="45" height="4" rx="1" fill="#0E1B35" fill-opacity=".3"/>
          <rect x="184" y="32" width="45" height="4" rx="1" fill="#0E1B35" fill-opacity=".3"/>
          <rect x="248" y="32" width="45" height="4" rx="1" fill="#0E1B35" fill-opacity=".3"/>
          <line x1="14" y1="40" x2="326" y2="40" stroke="#0E1B35" stroke-opacity=".12"/>
          <!-- rows -->
          <rect x="14"  y="46" width="80" height="3" rx="1" fill="#0E1B35" fill-opacity=".18"/>
          <rect x="120" y="46" width="45" height="3" rx="1" fill="#0E1B35" fill-opacity=".12"/>
          <rect x="184" y="46" width="45" height="3" rx="1" fill="#0E1B35" fill-opacity=".12"/>
          <rect x="248" y="46" width="45" height="3" rx="1" fill="#C8A96E" fill-opacity=".6"/>
          <line x1="14" y1="54" x2="326" y2="54" stroke="#0E1B35" stroke-opacity=".07"/>

          <rect x="14"  y="60" width="75" height="3" rx="1" fill="#0E1B35" fill-opacity=".18"/>
          <rect x="120" y="60" width="45" height="3" rx="1" fill="#0E1B35" fill-opacity=".12"/>
          <rect x="184" y="60" width="45" height="3" rx="1" fill="#0E1B35" fill-opacity=".12"/>
          <rect x="248" y="60" width="45" height="3" rx="1" fill="#0E1B35" fill-opacity=".12"/>
          <line x1="14" y1="68" x2="326" y2="68" stroke="#0E1B35" stroke-opacity=".07"/>

          <rect x="14"  y="74" width="85" height="3" rx="1" fill="#0E1B35" fill-opacity=".18"/>
          <rect x="120" y="74" width="45" height="3" rx="1" fill="#0E1B35" fill-opacity=".12"/>
          <rect x="184" y="74" width="45" height="3" rx="1" fill="#0E1B35" fill-opacity=".12"/>
          <rect x="248" y="74" width="45" height="3" rx="1" fill="#C8A96E" fill-opacity=".4"/>
          <line x1="14" y1="82" x2="326" y2="82" stroke="#0E1B35" stroke-opacity=".07"/>

          <rect x="14"  y="88" width="68" height="3" rx="1" fill="#0E1B35" fill-opacity=".18"/>
          <rect x="120" y="88" width="45" height="3" rx="1" fill="#0E1B35" fill-opacity=".12"/>
          <rect x="184" y="88" width="45" height="3" rx="1" fill="#0E1B35" fill-opacity=".12"/>
          <rect x="248" y="88" width="45" height="3" rx="1" fill="#0E1B35" fill-opacity=".12"/>
          <line x1="14" y1="96" x2="326" y2="96" stroke="#0E1B35" stroke-opacity=".12"/>
          <!-- totals row -->
          <rect x="0" y="96" width="340" height="22" fill="#0E1B35" fill-opacity=".05"/>
          <rect x="14"  y="103" width="50" height="4" rx="1" fill="#0E1B35" fill-opacity=".4"/>
          <rect x="248" y="103" width="60" height="4" rx="1" fill="#C8A96E" fill-opacity=".8"/>
          <!-- waterfall mini chart -->
          <rect x="14"  y="128" width="30" height="36" rx="1" fill="#0E1B35" fill-opacity=".15"/>
          <rect x="52"  y="136" width="30" height="28" rx="1" fill="#0E1B35" fill-opacity=".22"/>
          <rect x="90"  y="120" width="30" height="44" rx="1" fill="#C8A96E" fill-opacity=".6"/>
          <rect x="128" y="130" width="30" height="34" rx="1" fill="#0E1B35" fill-opacity=".15"/>
          <rect x="166" y="115" width="30" height="49" rx="1" fill="#C8A96E" fill-opacity=".4"/>
          <text x="258" y="174" font-family="monospace" font-size="6.5" fill="#0E1B35" fill-opacity=".2" letter-spacing="1">FIGURES ABSTRACTED</text>
        </svg>
      </ng-container>

      <!-- STRATEGY -->
      <ng-container *ngSwitchCase="'strategy'">
        <svg viewBox="0 0 340 176" xmlns="http://www.w3.org/2000/svg" class="ph-svg">
          <rect width="340" height="176" fill="#0A1428"/>
          <rect width="340" height="3" fill="#C8A96E"/>
          <!-- radial glow -->
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stop-color="#C8A96E" stop-opacity=".14"/>
            <stop offset="100%" stop-color="#C8A96E" stop-opacity="0"/>
          </radialGradient>
          <ellipse cx="170" cy="100" rx="130" ry="80" fill="url(#glow)"/>
          <!-- header -->
          <rect x="14" y="12" width="100" height="6" rx="1" fill="#ffffff" fill-opacity=".2"/>
          <rect x="14" y="22" width="60" height="4" rx="1" fill="#C8A96E" fill-opacity=".5"/>
          <!-- central node -->
          <circle cx="170" cy="100" r="18" fill="#0E1B35" stroke="#C8A96E" stroke-opacity=".5" stroke-width="1.5"/>
          <rect x="160" y="97" width="20" height="3" rx="1" fill="#C8A96E" fill-opacity=".8"/>
          <rect x="163" y="103" width="14" height="2" rx="1" fill="#ffffff" fill-opacity=".4"/>
          <!-- spokes -->
          <line x1="170" y1="82" x2="170" y2="50" stroke="#C8A96E" stroke-opacity=".3" stroke-width="1"/>
          <line x1="155" y1="89" x2="100" y2="70" stroke="#C8A96E" stroke-opacity=".2" stroke-width="1"/>
          <line x1="152" y1="107" x2="100" y2="128" stroke="#C8A96E" stroke-opacity=".2" stroke-width="1"/>
          <line x1="170" y1="118" x2="170" y2="148" stroke="#C8A96E" stroke-opacity=".3" stroke-width="1"/>
          <line x1="185" y1="107" x2="240" y2="128" stroke="#C8A96E" stroke-opacity=".2" stroke-width="1"/>
          <line x1="185" y1="89" x2="240" y2="70" stroke="#C8A96E" stroke-opacity=".2" stroke-width="1"/>
          <!-- satellite nodes -->
          <circle cx="170" cy="44" r="10" fill="#0E1B35" stroke="#C8A96E" stroke-opacity=".3" stroke-width="1"/>
          <circle cx="92"  cy="64" r="9"  fill="#0E1B35" stroke="#ffffff" stroke-opacity=".15" stroke-width="1"/>
          <circle cx="92"  cy="134" r="9" fill="#0E1B35" stroke="#ffffff" stroke-opacity=".15" stroke-width="1"/>
          <circle cx="170" cy="154" r="10" fill="#0E1B35" stroke="#C8A96E" stroke-opacity=".3" stroke-width="1"/>
          <circle cx="248" cy="134" r="9" fill="#0E1B35" stroke="#ffffff" stroke-opacity=".15" stroke-width="1"/>
          <circle cx="248" cy="64" r="9"  fill="#0E1B35" stroke="#C8A96E" stroke-opacity=".3" stroke-width="1"/>
          <!-- node labels -->
          <rect x="163" y="41" width="14" height="3" rx="1" fill="#C8A96E" fill-opacity=".6"/>
          <rect x="85"  y="62" width="14" height="2" rx="1" fill="#ffffff" fill-opacity=".25"/>
          <rect x="85"  y="132" width="14" height="2" rx="1" fill="#ffffff" fill-opacity=".25"/>
          <rect x="163" y="152" width="14" height="3" rx="1" fill="#C8A96E" fill-opacity=".6"/>
          <rect x="241" y="132" width="14" height="2" rx="1" fill="#ffffff" fill-opacity=".25"/>
          <rect x="241" y="62" width="14" height="2" rx="1" fill="#C8A96E" fill-opacity=".4"/>
        </svg>
      </ng-container>

      <ng-container *ngSwitchDefault>
        <svg viewBox="0 0 340 176" xmlns="http://www.w3.org/2000/svg" class="ph-svg">
          <rect width="340" height="176" fill="#F7F5F0"/>
          <rect width="340" height="3" fill="#C8A96E"/>
        </svg>
      </ng-container>

    </div>
  `,
  styles: [`
    :host { display: block; width: 100%; height: 100%; }
    .ph { width: 100%; height: 100%; }
    .ph-svg { display: block; width: 100%; height: 100%; }
  `],
})
export class GalleryPlaceholderComponent {
  @Input() type: string = 'dashboard';
}
