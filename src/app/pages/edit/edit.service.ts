import { Injectable } from '@angular/core';
import { Structure, StructureType } from '../../core/interfaces/structure';

@Injectable({
  providedIn: 'root'
})
export class EditService {
  structure: Structure = { ORDER: [], STYLE: [] };
  edited: { [key: string]: StructureType } = {};
}
