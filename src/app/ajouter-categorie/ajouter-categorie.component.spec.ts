import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterCategorieComponent } from './ajouter-categorie.component';

describe('AjouterCategorieComponent', () => {
  let component: AjouterCategorieComponent;
  let fixture: ComponentFixture<AjouterCategorieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterCategorieComponent]
    });
    fixture = TestBed.createComponent(AjouterCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
