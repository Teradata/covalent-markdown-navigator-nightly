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
  },
];
