import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { PlaygroundComponent } from './components/playground/playground.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MessageAreaComponent } from './components/message-area/message-area.component';
import { SwitchComponent } from './components/switch/switch.component';
import { EditQubitComponent } from './components/edit-qubit/edit-qubit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IconButtonComponent,
    PlaygroundComponent,
    SidebarComponent,
    MessageAreaComponent,
    SwitchComponent,
    EditQubitComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
