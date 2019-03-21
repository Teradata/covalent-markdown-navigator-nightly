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
    color: 'lime-800',
    icon: 'space_bar',
    route: 'empty-state',
    title: 'Empty State',
    description: 'No content to display',
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
