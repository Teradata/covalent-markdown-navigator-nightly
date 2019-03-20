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

export let overview: Object[] = [
  {
    color: 'td-orange-700',
    icon: 'extension',
    route: '/',
    title: 'Design Patterns',
  },
];

export let patterns: Object[] = [
  {
    color: 'indigo-800',
    icon: 'add_circle',
    route: 'creation-flow',
    title: 'Creation Flow',
    description: 'Adding new items',
  },
];

export let layouts: Object[] = [
  {
    color: 'red-800',
    icon: 'view_compact',
    route: 'nav-view',
    title: 'Dummy Layout',
    description: 'Placeholder for layout',
  },
];
