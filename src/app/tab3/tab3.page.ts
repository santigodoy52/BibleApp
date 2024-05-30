import { Component, OnInit } from '@angular/core';
import { AppFontSizeService } from '../services/fontSize.service';
import { DataService } from '../services/data.service';
import { ThemeService } from '../services/theme.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  public darkTheme = false;

  constructor(private fontSizeService: AppFontSizeService,private dataService: DataService,private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.isDarkTheme.subscribe(isDark => this.darkTheme = isDark);
  }

  seleccionarGrosorLetra(event:any) {
    const valorSeleccionado = event.detail.value;
    
    if(valorSeleccionado === "grande"){
      this.increaseFontSize();
    }
    if(valorSeleccionado === "normal"){
      this.decreaseFontSize();
    }
  }

  increaseFontSize() {
    this.fontSizeService.changeFontSize(this.getCurrentFontSize() + 10);
  }

  decreaseFontSize() {
    this.fontSizeService.changeFontSize(this.getCurrentFontSize() - 10);
  }

  private getCurrentFontSize(): number {
    let currentSize: number = 18; // Valor predeterminado
    this.fontSizeService.currentFontSize.subscribe(size => currentSize = size);
    return currentSize;
  }
  
  seleccionarVersion(event:any) {
    const valorSeleccionado = event.detail.value;
    
    if(valorSeleccionado === "rv"){
      this.actualizarVersionEnLocalStorage('rv1960');
    }
    if(valorSeleccionado === "nvi"){
      this.actualizarVersionEnLocalStorage('nvi');
    }
  }

  actualizarVersionEnLocalStorage(nuevaVersion: string) {
    this.dataService.actualizarVersion(nuevaVersion);
  }

  toggleDarkTheme() {
    this.themeService.isDarkTheme.pipe(take(1)).subscribe(isDark => {
      if (isDark) {
        this.themeService.activateLightTheme();
      } else {
        this.themeService.activateDarkTheme();
      }
    });
  }

  changeTheme(event:any) {
    const valorToggle = event.detail.checked;
    console.log('Valor del toggle:', valorToggle);
    if(valorToggle){
      this.toggleDarkTheme();
    }
  }
}
