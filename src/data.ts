export let name: String = 'SANDBOX';

// TODO: Update after release
export let baseURL: String =
  'https://stackblitz.com/github/Teradata/covalent-resources/tree/feat/demos/?view=editor&file=src/app';

export let routes: Object[] = [
  {
    icon: 'home',
    route: '/',
    title: 'Home',
  },
];

export let patterns: Object[] = [
  {
    color: 'indigo-800',
    icon: 'add_circle',
    route: 'creation-flow',
    title: 'Dummy Pattern',
    description: 'Placeholder for pattern',
  },
];

export let layouts: Object[] = [
  {
    color: 'red-800',
    icon: 'view_compact',
    route: 'nav-view',
    title: 'Nav View',
    description: 'Best for dashboards',
  }, {
    color: 'deep-purple-800',
    icon: 'view_day',
    route: 'card-over',
    title: 'Card Over',
    description: 'Detail views, forms, & blogs',
  },
];
