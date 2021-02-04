import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { ZorroSharperModule } from "zorro-sharper";
import { ZorroSharperModule } from '../../../../projects/zorro-sharper/src/lib/zorro-sharper.module';

import { DirectiveDemoRoutingModule } from './directive-demo-routing.module';
import { AutoHeightCardDemoComponent } from './auto-height/auto-height-card-demo.component';
import { AutoHeightTableDemoComponent } from './auto-height/auto-height-table-demo.component';
import { CommonModule } from '@angular/common';
import { SelectAsyncDsComponent } from './select/select-async-ds.component';
import { SelectTextFieldComponent } from './select/select-text-field.component';
import { FormErrorTipComponent } from './form/form-error-tip.component';
import { AutoHeightTabsetDemoComponent } from './auto-height/auto-height-tabset-demo.component';
import { FormAutoFeedBackComponent } from './form/form-auto-feedback.componnet';
import { FlipCardDemoComponent } from './flip/flip-card-demo.component';
import { SlideoutDemoComponent } from './slideout/slideout-demo.component';
import { SlideoutContentComponent } from './slideout/slideout-content.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DirectiveDemoRoutingModule,
    ZorroSharperModule,
    NzGridModule,
    NzInputModule,
    NzCardModule,
    NzTableModule,
    NzTabsModule,
    NzListModule,
    NzFormModule,
    NzSelectModule,
    NzButtonModule,
    NzIconModule,
  ],
  declarations: [
    AutoHeightCardDemoComponent,
    AutoHeightTableDemoComponent,
    SelectAsyncDsComponent,
    SelectTextFieldComponent,
    FormErrorTipComponent,
    AutoHeightTabsetDemoComponent,
    FormAutoFeedBackComponent,
    FlipCardDemoComponent,
    SlideoutDemoComponent,
    SlideoutContentComponent,
  ],
})
export class DirectiveDemoModule {}
