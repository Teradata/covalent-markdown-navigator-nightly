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
    color: 'yellow-800',
    icon: 'more_horiz',
    route: 'breadcrumbs',
    title: 'Breadcrumbs',
    description: 'Supplemental navigation',
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
