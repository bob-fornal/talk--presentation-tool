export const MockActivatedRoute = {
  snapshot: {
    paramMap: {
      get: (type: string) => {
        switch(type) {
          case 'slideKey':
            return 'SLIDE-KEY';
          case 'folder':
            return 'FOLDER';
          default:
            return '';
        }
      }
    }
  }
};
