import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZorroSharperComponent } from './zorro-sharper.component';

describe('ZorroSharperComponent', () => {
  let component: ZorroSharperComponent;
  let fixture: ComponentFixture<ZorroSharperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZorroSharperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZorroSharperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
