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

    return new Promise((resolve, reject) =>
      this.handleGetKvListPromise.bind(
        this, resolve, reject, hostname, returnOriginal, urlOptions
      ));
  }

  handleGetKvListPromise = (
    resolve: any, reject: any, hostname: string, returnOriginal: boolean, urlOptions: any
  ) => {
    const request = https.request(urlOptions, (response: any) =>
      this.handleHttpsRequest.bind(
        this, response, resolve, reject, hostname, returnOriginal
      ));
    request.on('error', reject);
    request.end();
  };

  handleHttpsRequest = (
    response: any, resolve: any, reject: any, hostname: string, returnOriginal: boolean
  ) => {
    let body = '';
    response.on('data', (data: any) => body += data);
    response.on('error', reject);
    response.on('end', this.handleHttpsRequestOnEnd.bind(
      this, response, resolve, reject, hostname, returnOriginal, body
    ));
  };

  handleHttpsRequestOnEnd = (
    response: any, resolve: any, reject: any, hostname: string, returnOriginal: boolean, body: any
  ) => {
    if (response.statusCode >= 200 && response.statusCode <= 299) {
      const resources: any = JSON.parse(body);
      const extracted: Array<any> = this.processKvList(hostname, resources);
      resolve(returnOriginal === false ? { extracted } : { extracted, resources });
    } else {
      reject('Request failed. status: ' + response.statusCode + ', body: ' + body);
    }
  }

  generatePathList = (hostname: string) => '';
  generateUrlOptions = (method: string, path: string) => ({});
  processKvList = (hostname: string, resources: any) => ([]);
}