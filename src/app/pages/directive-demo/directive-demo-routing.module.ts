import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutoHeightCardDemoComponent } from './auto-height/auto-height-card-demo.component';
import { AutoHeightTableDemoComponent } from './auto-height/auto-height-table-demo.component';
import { SelectAsyncDsComponent } from './select/select-async-ds.component';
import { SelectTextFieldComponent } from './select/select-text-field.component';
import { FormErrorTipComponent } from './form/form-error-tip.component';
import { AutoHeightTabsetDemoComponent } from './auto-height/auto-height-tabset-demo.component';
import { FormAutoFeedBackComponent } from './form/form-auto-feedback.componnet';
import { FlipCardDemoComponnet } from './flip/flip-card-demo.componnet';
import { SlideoutDemoComponent } from './slideout/slideout-demo.component';

const routes: Routes = [
  { path: 'auto-height-card-demo', component: AutoHeightCardDemoComponent },
  { path: 'auto-height-tabset-demo', component: AutoHeightTabsetDemoComponent },
  { path: 'auto-height-table-demo', component: AutoHeightTableDemoComponent },
  { path: 'select-async-ds', component: SelectAsyncDsComponent },
  { path: 'select-text-field', component: SelectTextFieldComponent },
  { path: 'form-error-tip', component: FormErrorTipComponent },
  { path: 'form-auto-feedback', component: FormAutoFeedBackComponent },
  { path: 'flip-card-demo', component: FlipCardDemoComponnet },
  { path: 'slideout', component: SlideoutDemoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirectiveDemoRoutingModule {}
