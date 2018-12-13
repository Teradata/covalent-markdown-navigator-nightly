export let name: String = 'SANDBOX';

export let baseURL: String = 'https://stackblitz.com/github/Teradata/covalent-resources/tree/feat/sandbox/?view=editor&file=src/app';

export let routes: Object[] = [{
  icon: 'home',
  route: '/',
  title: 'Home',
},
];

export let overview: Object[] = [{
  color: 'td-orange-700',
  icon: 'extension',
  route: '/',
  title: 'Design Patterns',
},
];

export let patterns: Object[] = [{
  color: 'indigo-800',
  icon: 'add_circle',
  route: 'creation-flow',
  title: 'Creation Flow',
  description: 'Adding new items',
}, {
  color: 'blue-800',
  icon: 'help',
  route: 'contextual-docs',
  title: 'Contextual Docs',
  description: 'Inline documentation',
}, {
  color: 'light-blue-800',
  icon: 'looks_one',
  route: 'stepper',
  title: 'Stepper Form',
  description: 'Great for wizards',
}, {
  color: 'cyan-800',
  icon: 'view_agenda',
  route: 'cards',
  title: 'Cards',
  description: 'Card list, grids, & images',
}, {
  color: 'teal-800',
  icon: 'filter_none',
  route: 'alerts',
  title: 'Alerts',
  description: 'Dialogs, toasts, & inline errors ',
}, {
  color: 'green-800',
  icon: 'kitchen',
  route: 'nav-drawer',
  title: 'Nav Drawer',
  description: 'Application primary navigation',
}, {
  color: 'light-green-800',
  icon: 'swap_horiz',
  route: 'mini-side-nav',
  title: 'Mini Side Nav',
  description: 'Collapsible navigation',
}, {
  color: 'lime-800',
  icon: 'space_bar',
  route: 'empty-state',
  title: 'Empty State',
  description: 'No content to display',
}, {
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
    title: 'Nav View',
    description: 'Best for dashboards',
  },
  {
    color: 'pink-800',
    icon: 'view_list',
    route: 'manage-list',
    title: 'Management List',
    description: 'Management list or sub-dashboards',
  },
  {
    color: 'purple-800',
    icon: 'view_quilt',
    route: 'nav-list',
    title: 'Nav List',
    description: 'Category views, documentation, & lists',
  },
  {
    color: 'deep-purple-800',
    icon: 'view_day',
    route: 'card-over',
    title: 'Card Over',
    description: 'Detail views, forms, & blogs',
  },
];
