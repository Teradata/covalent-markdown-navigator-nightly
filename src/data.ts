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
    color: 'pink-800',
    icon: 'view_list',
    route: 'manage-list',
    title: 'Management List',
    description: 'Management list or sub-dashboards',
  }, {
    color: 'purple-800',
    icon: 'view_quilt',
    route: 'nav-list',
    title: 'Nav List',
    description: 'Category views, documentation, & lists',
  }, {
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
