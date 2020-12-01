import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MainStatsPage } from './main-stats.page';

describe('MainStatsPage', () => {
  let component: MainStatsPage;
  let fixture: ComponentFixture<MainStatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainStatsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MainStatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
