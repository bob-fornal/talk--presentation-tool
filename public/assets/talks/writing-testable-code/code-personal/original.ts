const https = {
  request: (options: any, fn: any) => ({
    on: (...args: Array<any>) => ({}),
    end: () => ({}),
  }),
}
export class DemoKvList {

  public async getKvList(
    hostname: string, returnOriginal: boolean = false
  ): Promise<Array<any> | any> {
    const path: string = this.generatePathList(hostname);
    const urlOptions: any = this.generateUrlOptions('GET', path);

    return new Promise((resolve, reject) => {
      const request = https.request(urlOptions, (response: any) => {
        let body = '';
        response.on('data', (data: any) => body += data);
        response.on('error', reject);
        response.on('end', () => {
          if (response.statusCode >= 200 && response.statusCode <= 299) {
            const resources: any = JSON.parse(body);
            const extracted: Array<any> = this.processKvList(hostname, resources);
            resolve(returnOriginal === false ? { extracted } : { extracted, resources });
          } else {
            reject('Request failed. status: ' + response.statusCode + ', body: ' + body);
          }
        });
      });
      request.on('error', reject);
      request.end();
    });
  }

  generatePathList = (hostname: string) => '';
  generateUrlOptions = (method: string, path: string) => ({});
  processKvList = (hostname: string, resources: any) => ([]);
}