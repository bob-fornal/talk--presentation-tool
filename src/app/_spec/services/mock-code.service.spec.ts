import { BehaviorSubject } from "rxjs"

import { Structure } from "../../core/interfaces/structure";
import { Talks } from "../../core/interfaces/talks"
import { TemplateType } from "../../core/interfaces/template-type";

const mockStructure: BehaviorSubject<Structure> = new BehaviorSubject<Structure>({ ORDER: [], STYLE: [] });
const mockTalks: BehaviorSubject<Talks> = new BehaviorSubject<Talks>({ STYLE: [], TAGS: [], TALKS: []});
const MockTemplates: BehaviorSubject<{ [key:string]: TemplateType }> = new BehaviorSubject<{ [key:string]: TemplateType }>({});

export const MockCodeService: any = {
  structure: mockStructure,
  talks: mockTalks,
  templates: MockTemplates,

  init: async () => ({}),
  getStructure: async (folder: string) => ({}),
  getStructureImmediate: async (folder: string) => ({}),
  getCode: async (filepath: string) => ({}),
  checkLink: async (url: string) => ({}),
}