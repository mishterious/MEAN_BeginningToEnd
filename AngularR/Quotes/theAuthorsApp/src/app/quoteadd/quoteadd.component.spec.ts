import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteaddComponent } from './quoteadd.component';

describe('QuoteaddComponent', () => {
  let component: QuoteaddComponent;
  let fixture: ComponentFixture<QuoteaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
