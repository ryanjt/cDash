import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestingStatsPage } from './testing-stats.page';

describe('TestingStatsPage', () => {
  let component: TestingStatsPage;
  let fixture: ComponentFixture<TestingStatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestingStatsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestingStatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
