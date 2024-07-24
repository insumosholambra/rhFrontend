import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import {
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  CollapseModule,
  DropdownModule,
  GridModule,
  NavbarModule,
  NavModule
} from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../../../icons/icon-subset';
import { DocsComponentsModule } from '../../../../components';
import { PlasticoseTelasComponent } from './plasticoseTelas.component';

describe('DropdownsComponent', () => {
  let component: PlasticoseTelasComponent;
  let fixture: ComponentFixture<PlasticoseTelasComponent>;
  let iconSetService: IconSetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlasticoseTelasComponent],
      imports: [ButtonModule, DropdownModule, CollapseModule, NoopAnimationsModule, GridModule, CardModule, DocsComponentsModule, RouterTestingModule, NavModule, NavbarModule, ButtonGroupModule],
      providers: [IconSetService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(PlasticoseTelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
