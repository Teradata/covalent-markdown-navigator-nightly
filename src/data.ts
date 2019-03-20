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
    color: 'cyan-800',
    icon: 'view_agenda',
    route: 'cards',
    title: 'Cards',
    description: 'Card list, grids, & images',
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
