export class DemoKvList {

  public async getKvList(
    hostname: string, returnOriginal: boolean = false
  ): Promise<Array<any> | any> {
    const path: string = this.generatePathList(hostname);
    const urlOptions: any = this.generateUrlOptions('GET', path);

    try {
      const response: any = await fetch(path, urlOptions);
      const resources: any = await response.json();
      const extracted: Array<any> = this.processKvList(hostname, resources);
      return returnOriginal === false ? { extracted } : { extracted, resources };  
    } catch (error) {
      throw error;
    }
  }

  generatePathList = (hostname: string) => '';
  generateUrlOptions = (method: string, path: string) => ({});
  processKvList = (hostname: string, resources: any) => ([]);
}