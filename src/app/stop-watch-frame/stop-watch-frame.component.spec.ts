import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopWatchFrameComponent } from './stop-watch-frame.component';

describe('StopWatchFrameComponent', () => {
  let component: StopWatchFrameComponent;
  let fixture: ComponentFixture<StopWatchFrameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StopWatchFrameComponent]
    });
    fixture = TestBed.createComponent(StopWatchFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
