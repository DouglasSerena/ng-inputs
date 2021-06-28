import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor() {}

  searchByName(name: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const options = this.option.filter(
          (item: any) => !!item.name.match(name)
        );
        resolve(options);
      }, 1000);
    });
  }
  searchById(id: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const options = this.option.filter(
          (item: any) => !!item.id.toString().match(id)
        );
        resolve(options);
      }, 1000);
    });
  }

  option: any = [
    {
      id: 1,
      name: 'douglas',
      company: {
        people: {
          corporateName: 'douglas serena',
        },
      },
    },
    {
      id: 2,
      name: 'amanada',
      company: {
        people: {
          corporateName: 'amanada serena',
        },
      },
    },
    {
      id: 3,
      name: 'jose',
      company: {
        people: {
          corporateName: 'jose serena',
        },
      },
    },
    {
      id: 4,
      name: 'clair',
      company: {
        people: {
          corporateName: 'clair serena',
        },
      },
    },
    {
      id: 5,
      name: 'rafa',
      company: {
        people: {
          corporateName: 'rafa serena',
        },
      },
    },
    {
      id: 6,
      name: 'joão',
      company: {
        people: {
          corporateName: 'joão serena',
        },
      },
    },
    {
      id: 7,
      name: 'carlos',
      company: {
        people: {
          corporateName: 'carlos serena',
        },
      },
    },
    {
      id: 7,
      name: 'carlos',
      company: {
        people: {
          corporateName: 'carlos serena',
        },
      },
    },
    {
      id: 7,
      name: 'carlos',
      company: {
        people: {
          corporateName: 'carlos serena',
        },
      },
    },
    {
      id: 7,
      name: 'carlos',
      company: {
        people: {
          corporateName: 'carlos serena',
        },
      },
    },
    {
      id: 7,
      name: 'carlos',
      company: {
        people: {
          corporateName: 'carlos serena',
        },
      },
    },
    {
      id: 7,
      name: 'carlos',
      company: {
        people: {
          corporateName: 'carlos serena',
        },
      },
    },
    {
      id: 7,
      name: 'carlos',
      company: {
        people: {
          corporateName: 'carlos serena',
        },
      },
    },
    {
      id: 7,
      name: 'carlos',
      company: {
        people: {
          corporateName: 'carlos serena',
        },
      },
    },
    {
      id: 7,
      name: 'carlos',
      company: {
        people: {
          corporateName: 'carlos serena',
        },
      },
    },
    {
      id: 7,
      name: 'carlos',
      company: {
        people: {
          corporateName: 'carlos serena',
        },
      },
    },
    {
      id: 7,
      name: 'carlos',
      company: {
        people: {
          corporateName: 'carlos serena',
        },
      },
    },
    {
      id: 7,
      name: 'carlos',
      company: {
        people: {
          corporateName: 'carlos serena',
        },
      },
    },
    {
      id: 7,
      name: 'carlos',
      company: {
        people: {
          corporateName: 'carlos serena',
        },
      },
    },
    {
      id: 7,
      name: 'carlos',
      company: {
        people: {
          corporateName: 'carlos serena',
        },
      },
    },
    {
      id: 7,
      name: 'carlos',
      company: {
        people: {
          corporateName: 'carlos serena',
        },
      },
    },
    {
      id: 7,
      name: 'carlos',
      company: {
        people: {
          corporateName: 'carlos serena',
        },
      },
    },
    {
      id: 7,
      name: 'carlos',
      company: {
        people: {
          corporateName: 'carlos serena',
        },
      },
    },
  ];
}
