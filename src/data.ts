export var name: String = "SANDBOX";

export var baseURL = "https://stackblitz.com/github/Teradata/covalent-resources/tree/feat/sandbox";

export var routes: Object[] = [{
  icon: 'home',
  route: '/',
  title: 'Home',
  fullPath: 'overview/overview',
}
];

export var overview: Object[] = [{
  color: 'td-light-blue-700',
  icon: 'extension',
  route: '/patterns',
  title: 'Design Patterns',
  fullPath: 'overview/overview',
}
];

export var patterns: Object[] = [{
  color: 'indigo-700',
  icon: 'add_circle',
  route: '/patterns/creation-flow',
  title: 'Creation Flow',
  fullPath: 'patterns/creation-flow/creation-flow',
}, {
  color: 'indigo-700',
  icon: 'help',
  route: '/patterns/docs',
  title: 'Contextual Docs',
  fullPath: 'patterns/contextual-docs/contextual-docs',
}, {
  color: 'indigo-700',
  icon: 'looks_one',
  route: '/patterns/stepper',
  title: 'Stepper Form',
  fullPath: 'patterns/stepper/stepper',
}, {
  color: 'indigo-700',
  icon: 'view_agenda',
  route: '/patterns/cards',
  title: 'Cards',
  fullPath: 'patterns/cards/cards',
}, {
  color: 'indigo-700',
  icon: 'filter_none',
  route: '/patterns/alerts',
  title: 'Alerts',
  fullPath: 'patterns/alerts/alerts',
}, {
  color: 'indigo-700',
  icon: 'kitchen',
  route: '/patterns/nav-drawer',
  title: 'Nav Drawer',
  fullPath: 'patterns/nav-drawer/nav-drawer',
}, {
  color: 'indigo-700',
  icon: 'swap_horiz',
  route: '/patterns/mini-side-nav',
  title: 'Mini Side Nav',
  fullPath: 'patterns/mini-nav-drawer/mini-nav-drawer',
}, {
  color: 'indigo-700',
  icon: 'space_bar',
  route: '/patterns/empty-state',
  title: 'Empty State',
  fullPath: 'patterns/empty-state/empty-state',
}, {
  color: 'indigo-700',
  icon: 'more_horiz',
  route: '/patterns/breadcrumbs',
  title: 'Breadcrumbs',
  fullPath: 'patterns/breadcrumbs/breadcrumbs',
},
];

export var layouts: Object[] = [
  {
    color: 'light-blue-700',
    icon: 'view_compact',
    route: '/layouts/nav-view',
    title: 'Nav View',
    fullPath: 'layouts/nav-view/nav-view',
  },
  {
    color: 'light-blue-700',
    icon: 'view_list',
    route: '/layouts/manage-list',
    title: 'Management List',
    fullPath: 'layouts/manage-list/manage-list',
  },
  {
    color: 'light-blue-700',
    icon: 'view_quilt',
    route: '/layouts/nav-list',
    title: 'Nav List',
    fullPath: 'layouts/nav-list/nav-list',
  },
  {
    color: 'light-blue-700',
    icon: 'view_day',
    route: '/layouts/card-over',
    title: 'Card Over',
    fullPath: 'layouts/card-over/card-over',
  }
];