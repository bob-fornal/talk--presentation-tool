import { BehaviorSubject } from "rxjs"

import { Structure } from "../../core/interfaces/structure";
import { Talks } from "../../core/interfaces/talks"

const mockTalks: BehaviorSubject<Talks> = new BehaviorSubject<Talks>({ STYLE: [], TAGS: [], TALKS: []});
const mockStructure: BehaviorSubject<Structure> = new BehaviorSubject<Structure>({ ORDER: [], STYLE: [] });

export const MockCodeService: any = {
  talks: mockTalks,
  structure: mockStructure,

  init: async () => ({}),
  getStructure: async (folder: string) => ({}),
  getStructureImmediate: async (folder: string) => ({}),
  getCode: async (filepath: string) => ({}),
  checkLink: async (url: string) => ({}),
}