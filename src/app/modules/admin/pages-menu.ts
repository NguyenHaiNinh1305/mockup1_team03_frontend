import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Trang chủ',
    icon: 'home-outline',
    link: '/admin/dashboard',
    home: true,
  },
  {
    title: 'Tính năng',
    group: true,
  },
  {
    title: 'Người dùng',
    icon: 'person-outline',
    link: '/admin/user',
  },
  {
    title: 'Sản phẩm',
    icon: 'globe-2-outline',
    link: '/home/product',
  },
];
