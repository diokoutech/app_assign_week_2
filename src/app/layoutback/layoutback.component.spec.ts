import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutbackComponent } from './layoutback.component';

describe('LayoutbackComponent', () => {
  let component: LayoutbackComponent;
  let fixture: ComponentFixture<LayoutbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
