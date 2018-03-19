// angular 组建通信 @input 方式
//child
import { Component, Input } from '@angular/core';
import { Hero } from './hero';
@Component({
    selector: 'app-hero-child',
    template: `<h1>{{hero.name}}</h1><p>{{masterName}}</p>`
});
export class HeroChildComponent {
    @Input() hero: Hero;
    @Input('master') masterName: string;
}
//father
import { Component } from '@angular/core';
import { HEROES } from './hero';
@Component({
    selector: 'app-hero-parent',
    template: `<app-hero-child *ngFor='let hero of heroes' [hero]='hero' [master]='master' ></app-hero-child>`
})
export class HeroParentComponent {
    heroes = HEROES;
    master = 'Master';
}